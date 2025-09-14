import { Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';
import { UserAvatar } from './user-avatar';

interface ChatHeaderProps {
  name: string;
  avatarUser: User | undefined;
}

export function ChatHeader({ name, avatarUser }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-card shadow-sm">
      <div className="flex items-center gap-3">
        {avatarUser && <UserAvatar user={avatarUser} className="h-10 w-10" />}
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
