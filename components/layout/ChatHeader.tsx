'use client';

import { Menu, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  onMobileMenuToggle: () => void;
  mobileMenuOpen: boolean;
}

export function ChatHeader({
  sidebarOpen,
  onSidebarToggle,
  onMobileMenuToggle,
  mobileMenuOpen,
}: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between h-16 px-4 border-b border-slate-200 bg-white">
      {/* Left: Menu & Title */}
      <div className="flex items-center gap-4">
        {/* Desktop Sidebar Toggle */}
        <button
          onClick={onSidebarToggle}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <Menu size={20} className="text-slate-600" />
          ) : (
            <Menu size={20} className="text-slate-600" />
          )}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X size={20} className="text-slate-600" />
          ) : (
            <Menu size={20} className="text-slate-600" />
          )}
        </button>

        <h1 className="text-lg font-semibold text-slate-900">Chat</h1>
      </div>

      {/* Right: Model Selector & Settings */}
      <div className="flex items-center gap-2">
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white hover:bg-slate-50 cursor-pointer transition-colors">
          <option value="claude-opus-4-6">Claude 3.5 Opus</option>
          <option value="claude-sonnet-4-6">Claude 3.5 Sonnet</option>
          <option value="claude-haiku-4-5">Claude 3.5 Haiku</option>
        </select>

        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          aria-label="Settings"
        >
          <Settings size={20} />
        </Button>
      </div>
    </header>
  );
}
