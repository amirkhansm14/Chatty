'use client';

import { User, Chat } from '@/lib/types';
import { ChatHeader } from './chat-header';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { MessageSquare } from 'lucide-react';

interface ChatViewProps {
  chat: Chat | undefined;
  currentUser: User;
  users: User[];
  onSendMessage: (chatId: string, content: string) => void;
  onCategorizeMessage: (chatId: string, messageId: string, category: string, confidence: number) => void;
}

export function ChatView({ chat, currentUser, users, onSendMessage, onCategorizeMessage }: ChatViewProps) {
  if (!chat) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground bg-secondary/40">
        <MessageSquare className="h-20 w-20 mb-4" />
        <h2 className="text-2xl font-semibold">Welcome to Chatty!</h2>
        <p>Select a chat to start messaging.</p>
      </div>
    );
  }

  const getChatInfo = () => {
    if (chat.type === 'private') {
      const partnerId = chat.participantIds.find(id => id !== currentUser.id);
      const partner = users.find(user => user.id === partnerId);
      return {
        name: partner?.name || 'Unknown User',
        avatarUser: partner,
      };
    } else {
      return {
        name: chat.name || 'Group Chat',
        avatarUser: {id: chat.id, name: chat.name || "G", avatar: chat.id}
      };
    }
  };

  const { name, avatarUser } = getChatInfo();

  return (
    <div className="flex flex-col h-screen bg-secondary/40">
      <ChatHeader name={name} avatarUser={avatarUser} />
      <ChatMessages
        messages={chat.messages}
        currentUser={currentUser}
        users={users}
        chatId={chat.id}
        onCategorizeMessage={onCategorizeMessage}
      />
      <ChatInput onSendMessage={(content) => onSendMessage(chat.id, content)} />
    </div>
  );
}
