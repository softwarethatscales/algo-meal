'use client';

import React from 'react';
import { Menu, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Component() {
  const [messages, setMessages] = React.useState([
    {
      role: 'bot',
      content: "Hello! I'm your AI meal planner. How can I help you today?",
    },
    {
      role: 'user',
      content: 'Can you create a meal plan for me for the next week?',
    },
    {
      role: 'bot',
      content:
        "I'd be happy to create a meal plan for you. Before I do, could you please tell me if you have any dietary restrictions or preferences?",
    },
    {
      role: 'user',
      content: "I'm vegetarian and I prefer high-protein meals.",
    },
    {
      role: 'bot',
      content:
        "Great, thank you for letting me know. I'll create a vegetarian, high-protein meal plan for you for the next week. Here's what I've come up with:",
    },
    {
      role: 'bot',
      content: (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Your Weekly Meal Plan</CardTitle>
            <CardDescription>Vegetarian, High-Protein</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-7">
              {[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ].map((day) => (
                <Card key={day} className="p-2">
                  <CardTitle className="text-sm mb-2">{day}</CardTitle>
                  <CardContent className="p-0 text-xs">
                    <p>
                      <strong>Breakfast:</strong> Greek yogurt with berries and
                      nuts
                    </p>
                    <p>
                      <strong>Lunch:</strong> Quinoa salad with chickpeas and
                      vegetables
                    </p>
                    <p>
                      <strong>Dinner:</strong> Lentil and vegetable curry with
                      brown rice
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              This plan provides a good balance of protein, complex
              carbohydrates, and essential nutrients.
            </p>
          </CardFooter>
        </Card>
      ),
    },
    {
      role: 'user',
      content: 'Can you suggest a high-protein snack for the afternoons?',
    },
    {
      role: 'bot',
      content:
        'Here are some high-protein vegetarian snack ideas for your afternoons:',
    },
    {
      role: 'bot',
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>Edamame (boiled soybeans)</li>
          <li>Hummus with carrot sticks or whole grain crackers</li>
          <li>A handful of mixed nuts (almonds, walnuts, pistachios)</li>
          <li>Greek yogurt with a drizzle of honey and chia seeds</li>
          <li>Roasted chickpeas seasoned with your favorite spices</li>
          <li>
            Protein smoothie made with plant-based protein powder, spinach, and
            fruit
          </li>
          <li>Cottage cheese with sliced tomatoes or cucumber</li>
          <li>Hard-boiled eggs (if you consume eggs as a vegetarian)</li>
        </ul>
      ),
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    const newMessage = input.value.trim();
    if (newMessage) {
      setMessages([...messages, { role: 'user', content: newMessage }]);
      input.value = '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-bold">Algo Meal</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto p-4 h-full flex flex-col">
          <ScrollArea className="flex-1 rounded-lg border bg-white dark:bg-gray-800 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 mb-4 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'bot' && (
                  <Avatar>
                    <AvatarImage src="/ai-avatar.png" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  {typeof message.content === 'string' ? (
                    <p>{message.content}</p>
                  ) : (
                    message.content
                  )}
                </div>
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.png" alt="User" />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="mt-4 flex space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              name="message"
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
