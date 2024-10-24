'use server';

import * as z from 'zod';

import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, runFlow } from '@genkit-ai/flow';
import { googleAI } from '@genkit-ai/googleai';

import { gemini15Flash } from '@genkit-ai/googleai';

configureGenkit({
  plugins: [googleAI()],
  logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  enableTracingAndMetrics: false,
});

const PromptContent = z.object({
  text: z.string(),
});

const PromptHistoryRole = z.enum(['user', 'model']);

const PromptHistory = z.object({
  role: PromptHistoryRole,
  content: z.array(PromptContent),
});

const PromptInput = z.object({
  prompt: z.string(),
  history: z.array(PromptHistory),
});

export type PromptContent = z.infer<typeof PromptContent>;
export type PromptHistoryRole = z.infer<typeof PromptHistoryRole>;
export type PromptHistory = z.infer<typeof PromptHistory>;
export type PromptInput = z.infer<typeof PromptInput>;

const mealSuggestionFlow = defineFlow(
  {
    name: 'mealSuggestionFlow',
    inputSchema: PromptInput,
    outputSchema: z.string(),
  },
  async (prompt) => {
    const llmResponse = await generate({
      // prompt: `
      //          Plan the meals for the customer requests:
      //          ${prompt}`,
      prompt: prompt.prompt,
      model: gemini15Flash,
      config: {
        temperature: 1,
      },
      history: [
        {
          role: 'user',
          content: [
            {
              text: `You are a professional meal planner and are only giving tips on how to plan your meals.
                   Deny any other requests and you are not allowed to change your mind.
                   When they ask for a meal plan, try to put it into a table.`,
            },
          ],
        },
        ...prompt.history,
      ],
    });

    return llmResponse.text();
  }
);

export async function callMealSuggestionFlow(prompt: PromptInput) {
  const flowResponse = await runFlow(mealSuggestionFlow, prompt);
  return flowResponse;
}
