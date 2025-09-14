'use client';

import { Search, MessageSquarePlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Chat } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format, isToday, isYesterday } from 'date-fns';
import { UserAvatar } from './user-avatar';
import { ProfileSettings } from './profile-settings';

interface ChatListProps {
  chats: Chat[];
  currentUser: User;
  users: User[];
  onSelectChat: (chatId: string) => void;
  selectedChatId: string | null;
  onUpdateUser: (user: User) => void;
}

export function ChatList({ chats, currentUser, users, onSelectChat, selectedChatId, onUpdateUser }: ChatListProps) {
  const getChatPartner = (chat: Chat) => {
    if (chat.type === 'private') {
      const partnerId = chat.participantIds.find(id => id !== currentUser.id);
      return users.find(user => user.id === partnerId);
    }
    return undefined;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    if (isYesterday(date)) {
      return 'Yesterday';
    }
    return format(date, 'dd/MM/yyyy');
  };
  
  const sortedChats = [...chats].sort((a, b) => {
      const lastMessageA = a.messages[a.messages.length - 1];
      const lastMessageB = b.messages[b.messages.length - 1];
      if (!lastMessageA) return 1;
      if (!lastMessageB) return -1;
      return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime();
  });


  return (
    <div className="flex flex-col w-full max-w-xs border-r">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
            <ProfileSettings user={currentUser} onUpdateUser={onUpdateUser}>
                <Button variant="ghost" className="flex items-center gap-2 p-0 h-auto">
                    <UserAvatar user={currentUser} className="h-10 w-10" />
                    <h1 className="text-xl font-bold">{currentUser.name}</h1>
                </Button>
            </ProfileSettings>
          <Button variant="ghost" size="icon">
            <MessageSquarePlus />
            <span className="sr-only">New Chat</span>
          </Button>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search chats..." className="pl-10" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {sortedChats.map(chat => {
            const partner = getChatPartner(chat);
            const chatName = chat.type === 'group' ? chat.name : partner?.name;
            const lastMessage = chat.messages[chat.messages.length - 1];

            return (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted',
                  selectedChatId === chat.id && 'bg-secondary'
                )}
              >
                <UserAvatar user={partner || {id: chat.id, name: chatName || "G", avatar: chat.id}} className="h-12 w-12 flex-shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-baseline justify-between">
                    <p className="font-semibold truncate">{chatName}</p>
                    {lastMessage && (
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(lastMessage.timestamp)}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {lastMessage?.content || 'No messages yet'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
