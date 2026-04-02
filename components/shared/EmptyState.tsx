'use client';

import { MessageSquare } from 'lucide-react';

interface EmptyStateProps {
  subtitle?: string;
}

export function EmptyState({ subtitle }: EmptyStateProps) {
  const suggestions = [
    'How can I help you today?',
    'Explain a complex topic',
    'Write code in Python',
    'Help me brainstorm ideas',
    'Analyze this document',
    'Create a detailed plan',
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-4">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
        <MessageSquare size={32} className="text-blue-600" />
      </div>

      {/* Title & Subtitle */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Welcome to Chat</h2>
        <p className="text-slate-500">
          {subtitle || 'Select a conversation or start a new one'}
        </p>
      </div>

      {/* Suggestions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            className="px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
