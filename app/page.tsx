'use client';

import { ChatLayout } from '@/components/layout/ChatLayout';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { Composer } from '@/components/layout/Composer';

export default function Home() {
  return (
    <ChatLayout>
      <div className="flex flex-col h-full">
        {/* Main Chat Area */}
        <div className="flex-1 overflow-hidden">
          <ChatContainer />
        </div>

        {/* Composer */}
        <Composer />
      </div>
    </ChatLayout>
  );
}
