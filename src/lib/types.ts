export type User = {
  id: string;
  name: string;
  avatar: string;
  isCurrentUser?: boolean;
};

export type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  category?: string;
  confidence?: number;
};

export type Chat = {
  id: string;
  type: 'private' | 'group';
  name?: string; // for group chats
  participantIds: string[];
  messages: Message[];
};
