'use client';

import { useState, useEffect } from 'react';
import { type User, type Chat, type Message } from '@/lib/types';
import { ChatList } from './chat-list';
import { ChatView } from './chat-view';

interface ChatLayoutProps {
  initialUsers: User[];
  initialChats: Chat[];
  currentUser: User;
}

export function ChatLayout({ initialUsers, initialChats, currentUser }: ChatLayoutProps) {
  const [users, setUsers] = useState(initialUsers);
  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  const handleSendMessage = (chatId: string, content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
    };

    setChats(prevChats => {
      const newChats = prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      });
      return newChats;
    });
  };

  const handleCategorizeMessage = (chatId: string, messageId: string, category: string, confidence: number) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.map(message => {
              if (message.id === messageId) {
                return { ...message, category, confidence };
              }
              return message;
            }),
          };
        }
        return chat;
      });
    });
  };
  
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u))
  }

  return (
    <div className="flex h-screen w-full bg-card">
      <ChatList
        chats={chats}
        currentUser={currentUser}
        users={users}
        onSelectChat={setSelectedChatId}
        selectedChatId={selectedChatId}
        onUpdateUser={handleUpdateUser}
      />
      <div className="flex-1 flex flex-col">
        <ChatView
          chat={selectedChat}
          currentUser={currentUser}
          users={users}
          onSendMessage={handleSendMessage}
          onCategorizeMessage={handleCategorizeMessage}
        />
      </div>
    </div>
  );
}
