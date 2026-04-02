'use client';

import { ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { ChatHeader } from './ChatHeader';
import { cn } from '@/lib/utils';

interface ChatLayoutProps {
  children: ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Desktop */}
      <div
        className={cn(
          'hidden md:flex md:w-64 md:flex-col border-r border-slate-200 bg-slate-50 transition-all duration-300',
          sidebarOpen ? 'md:w-64' : 'md:w-0 md:border-r-0'
        )}
      >
        {sidebarOpen && <Sidebar />}
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/50">
          <div className="w-64 h-screen bg-slate-50 border-r border-slate-200 flex flex-col">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <ChatHeader
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
          mobileMenuOpen={mobileOpen}
        />

        {/* Chat Container */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
