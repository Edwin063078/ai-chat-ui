'use client';

import { Plus, Trash2, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/hooks/useChat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { state, currentConversation, createNewConversation, selectConversation, deleteConversation, pinConversation } = useChat();

  const pinnedConversations = state.conversations.filter((c) => c.isPinned);
  const unpinnedConversations = state.conversations.filter((c) => !c.isPinned);

  return (
    <div className="flex flex-col h-full">
      {/* New Chat Button */}
      <div className="p-4 border-b border-slate-200">
        <Button
          onClick={() => createNewConversation()}
          className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus size={18} />
          New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Pinned Section */}
          {pinnedConversations.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-semibold text-slate-500 px-2 mb-2">Pinned</div>
              <div className="space-y-1">
                {pinnedConversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isActive={currentConversation?.id === conv.id}
                    onSelect={() => selectConversation(conv.id)}
                    onDelete={() => deleteConversation(conv.id)}
                    onPin={() => pinConversation(conv.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recent Section */}
          {unpinnedConversations.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-500 px-2 mb-2">Recent</div>
              <div className="space-y-1">
                {unpinnedConversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isActive={currentConversation?.id === conv.id}
                    onSelect={() => selectConversation(conv.id)}
                    onDelete={() => deleteConversation(conv.id)}
                    onPin={() => pinConversation(conv.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {state.conversations.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs mt-2">Start a new chat to begin</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface ConversationItemProps {
  conversation: any;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onPin: () => void;
}

function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
  onPin,
}: ConversationItemProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors',
        isActive ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-200 text-slate-700'
      )}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{conversation.title}</p>
        <p className="text-xs text-slate-400 truncate">
          {conversation.messages.length} messages
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPin();
          }}
          className="p-1 hover:bg-slate-300 rounded transition-colors"
          aria-label="Pin conversation"
        >
          <Pin size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 hover:bg-red-200 rounded transition-colors"
          aria-label="Delete conversation"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
