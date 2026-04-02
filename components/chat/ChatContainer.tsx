'use client';

import { useChat } from '@/hooks/useChat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { EmptyState } from '../shared/EmptyState';

export function ChatContainer() {
  const { currentConversation, state } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages.length]);

  if (!currentConversation) {
    return <EmptyState />;
  }

  if (currentConversation.messages.length === 0) {
    return <EmptyState subtitle="No messages yet. Start a conversation!" />;
  }

  return (
    <ScrollArea className="h-full w-full">
      <div ref={scrollRef} className="flex flex-col gap-4 p-4 max-w-4xl mx-auto w-full">
        {currentConversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Loading indicator */}
        {state.isLoading && (
          <div className="flex gap-2 items-center text-slate-500 text-sm py-4">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
            </div>
            <span>Assistant is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
