'use client';
import { useEffect, useRef } from 'react';
import { Message, User } from '@/lib/types';
import { MessageBubble } from './message-bubble';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatMessagesProps {
  messages: Message[];
  currentUser: User;
  users: User[];
  chatId: string;
  onCategorizeMessage: (chatId: string, messageId: string, category: string, confidence: number) => void;
}

export function ChatMessages({ messages, currentUser, users, chatId, onCategorizeMessage }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-2">
            {messages.map((message) => (
                <MessageBubble
                key={message.id}
                message={message}
                isCurrentUser={message.senderId === currentUser.id}
                sender={users.find(u => u.id === message.senderId)}
                chatId={chatId}
                onCategorizeMessage={onCategorizeMessage}
                />
            ))}
        </div>
    </ScrollArea>
  );
}
