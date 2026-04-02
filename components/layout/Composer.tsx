'use client';

import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@/hooks/useChat';
import { useRef, useState } from 'react';

export function Composer() {
  const { addMessage, createNewConversation, currentConversation, setLoading } = useChat();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-expand textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Create conversation if needed
    if (!currentConversation) {
      createNewConversation('New Conversation');
    }

    // Add user message
    addMessage({
      role: 'user',
      content: input,
    });

    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate assistant response with a delay
    setIsLoading(true);
    setLoading(true);

    setTimeout(() => {
      const assistantResponses = [
        'I understand. How can I help you with this today?',
        'Interesting! Let me break this down for you...',
        "That's a great question. Here's what I think:",
        'I can help you with that. Let me provide some insights...',
      ];

      const randomResponse = assistantResponses[Math.floor(Math.random() * assistantResponses.length)];

      addMessage({
        role: 'assistant',
        content: randomResponse,
      });

      setIsLoading(false);
      setLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-t border-slate-200 bg-white">
      {/* File upload indicator */}
      <div className="flex gap-2 text-xs text-slate-400"></div>

      {/* Input Area */}
      <div className="flex gap-3">
        {/* Attachments Button */}
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 mt-2"
          aria-label="Attach file"
        >
          <Paperclip size={20} className="text-slate-600" />
        </Button>

        {/* Text Input */}
        <div className="flex-1 flex flex-col gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Shift+Enter for new line)"
            className="resize-none max-h-48 min-h-12 text-sm"
            rows={1}
            disabled={isLoading}
          />

          {/* Bottom Row: Mic & Send */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-600 hover:text-slate-900"
              aria-label="Voice input"
            >
              <Mic size={18} />
            </Button>

            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              <Send size={16} />
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <span>Agent Mode: Normal</span>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Enable
        </button>
      </div>
    </div>
  );
}
