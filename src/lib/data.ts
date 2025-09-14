import { User, Chat } from './types';

const users: User[] = [
  { id: 'user-1', name: 'Alex', avatar: '1', isCurrentUser: true },
  { id: 'user-2', name: 'Sam', avatar: '2' },
  { id: 'user-3', name: 'Jordan', avatar: '3' },
  { id: 'user-4', name: 'Casey', avatar: '4' },
  { id: 'user-5', name: 'Taylor', avatar: '5' },
];

const chats: Chat[] = [
  {
    id: 'chat-1',
    type: 'private',
    participantIds: ['user-1', 'user-2'],
    messages: [
      { id: 'msg-1', senderId: 'user-2', content: 'Hey! How are you?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
      { id: 'msg-2', senderId: 'user-1', content: 'I am good, thanks! How about you?', timestamp: new Date(Date.now() - 1000 * 60 * 58).toISOString() },
      { id: 'msg-3', senderId: 'user-2', content: 'Doing great. Just working on the new project design. It\'s due tomorrow.', timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
    ],
  },
  {
    id: 'chat-2',
    type: 'private',
    participantIds: ['user-1', 'user-3'],
    messages: [
      { id: 'msg-4', senderId: 'user-3', content: 'Can you send me the report from yesterday?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
      { id: 'msg-5', senderId: 'user-1', content: 'Sure, sending it now.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23.9).toISOString() },
    ],
  },
  {
    id: 'chat-3',
    type: 'group',
    name: 'Project Team',
    participantIds: ['user-1', 'user-4', 'user-5'],
    messages: [
      { id: 'msg-6', senderId: 'user-4', content: 'Team, let\'s sync up at 3 PM today.', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
      { id: 'msg-7', senderId: 'user-5', content: 'Sounds good. I have an update on the travel plans.', timestamp: new Date(Date.now() - 1000 * 60 * 115).toISOString() },
      { id: 'msg-8', senderId: 'user-1', content: 'Perfect, see you both then.', timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString() },
    ],
  },
  {
    id: 'chat-4',
    type: 'private',
    participantIds: ['user-1', 'user-4'],
    messages: [
      { id: 'msg-9', senderId: 'user-4', content: 'Lunch tomorrow?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
    ],
  },
];

export const getUsers = () => users;
export const getChats = () => chats;
export const getCurrentUser = () => users.find(u => u.isCurrentUser);
