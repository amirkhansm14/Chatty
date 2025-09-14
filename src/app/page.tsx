import { ChatLayout } from '@/components/chat/chat-layout';
import { getUsers, getChats, getCurrentUser } from '@/lib/data';

export default function Home() {
  const users = getUsers();
  const chats = getChats();
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return (
      <main className="flex h-screen items-center justify-center">
        <p>Current user not found. Please check data configuration.</p>
      </main>
    );
  }

  return (
    <main>
      <ChatLayout
        initialUsers={users}
        initialChats={chats}
        currentUser={currentUser}
      />
    </main>
  );
}
