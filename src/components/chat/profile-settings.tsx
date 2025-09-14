'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/lib/types';
import { UserAvatar } from './user-avatar';
import { useToast } from '@/hooks/use-toast';

interface ProfileSettingsProps {
  user: User;
  onUpdateUser: (user: User) => void;
  children: React.ReactNode;
}

export function ProfileSettings({ user, onUpdateUser, children }: ProfileSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const { toast } = useToast();

  const handleSave = () => {
    onUpdateUser({ ...user, name });
    setIsOpen(false);
    toast({
      title: 'Profile Updated',
      description: 'Your name has been successfully updated.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Update your username and display picture.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex flex-col items-center gap-4">
            <UserAvatar user={user} className="h-24 w-24" />
            <Button variant="outline" size="sm">Change Picture</Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
