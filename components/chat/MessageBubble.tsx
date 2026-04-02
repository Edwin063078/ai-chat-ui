'use client';

import { Message } from '@/types/chat';
import { Copy, Trash2, RotateCcw, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageContent } from './MessageContent';
import { ToolCall } from '../agent/ToolCall';
import { ReasoningStep } from '../agent/ReasoningStep';
import { Citation } from '../agent/Citation';
import { Artifact } from '../agent/Artifact';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false);
  const { deleteMessage } = useChat();
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`flex gap-3 group ${isUser ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar / Icon */}
      {isAssistant && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-semibold text-sm">
          A
        </div>
      )}

      {/* Message Content */}
      <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'} max-w-2xl`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-slate-100 text-slate-900 rounded-bl-none'
          }`}
        >
          <MessageContent content={message.content} isUser={isUser} />
        </div>

        {/* Tool Calls */}
        {isAssistant && message.toolCalls && message.toolCalls.length > 0 && (
          <div className="w-full space-y-2">
            {message.toolCalls.map((tool) => (
              <ToolCall key={tool.id} tool={tool} />
            ))}
          </div>
        )}

        {/* Reasoning Steps */}
        {isAssistant && message.reasoning && message.reasoning.length > 0 && (
          <div className="w-full space-y-2">
            {message.reasoning.map((step) => (
              <ReasoningStep key={step.id} step={step} />
            ))}
          </div>
        )}

        {/* Citations */}
        {isAssistant && message.citations && message.citations.length > 0 && (
          <div className="w-full space-y-2">
            {message.citations.map((citation, idx) => (
              <Citation key={idx} citation={citation} />
            ))}
          </div>
        )}

        {/* Artifacts */}
        {isAssistant && message.artifacts && message.artifacts.length > 0 && (
          <div className="w-full space-y-2">
            {message.artifacts.map((artifact) => (
              <Artifact key={artifact.id} artifact={artifact} />
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-xs text-slate-400">
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => navigator.clipboard.writeText(message.content)}
            className="p-2 hover:bg-slate-200 rounded transition-colors"
            title="Copy"
          >
            <Copy size={16} className="text-slate-600" />
          </button>

          {isAssistant && (
            <>
              <button className="p-2 hover:bg-slate-200 rounded transition-colors" title="Regenerate">
                <RotateCcw size={16} className="text-slate-600" />
              </button>
              <button className="p-2 hover:bg-slate-200 rounded transition-colors" title="Edit">
                <Edit2 size={16} className="text-slate-600" />
              </button>
            </>
          )}

          {isUser && (
            <button
              onClick={() => deleteMessage(message.id)}
              className="p-2 hover:bg-red-200 rounded transition-colors"
              title="Delete"
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
