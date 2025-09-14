'use client';
import { Message, User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { UserAvatar } from './user-avatar';
import { CategorizeButton } from './categorize-button';
import { Badge } from '@/components/ui/badge';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  sender?: User;
  chatId: string;
  onCategorizeMessage: (chatId: string, messageId: string, category: string, confidence: number) => void;
}

export function MessageBubble({ message, isCurrentUser, sender, chatId, onCategorizeMessage }: MessageBubbleProps) {
  const messageTime = format(new Date(message.timestamp), 'HH:mm');

  return (
    <div className={cn('group flex items-end gap-2 w-full', isCurrentUser ? 'justify-end' : 'justify-start')}>
      {!isCurrentUser && sender && (
        <UserAvatar user={sender} className="h-8 w-8 self-end" />
      )}
      <div
        className={cn(
          'relative flex flex-col max-w-[70%] rounded-lg px-3 py-2 shadow-sm animate-in fade-in zoom-in-95',
          isCurrentUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-card text-card-foreground rounded-bl-none'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <div className="flex items-end justify-end gap-2 mt-1 self-end">
            {message.category && (
                <Badge variant={isCurrentUser ? "secondary" : "default"} className="text-xs">
                    {message.category}
                </Badge>
            )}
            <span className={cn("text-xs", isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
                {messageTime}
            </span>
            {isCurrentUser && <CheckCheck className="h-4 w-4 text-sky-400" />}
        </div>
        {!isCurrentUser && (
            <div className="absolute top-0 -right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <CategorizeButton message={message} chatId={chatId} onCategorizeMessage={onCategorizeMessage} />
            </div>
        )}
      </div>
    </div>
  );
}
