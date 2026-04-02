'use client';

import { Citation as CitationType } from '@/types/chat';
import { ExternalLink } from 'lucide-react';

interface CitationProps {
  citation: CitationType;
}

export function Citation({ citation }: CitationProps) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
      <div className="flex-1">
        <p className="text-slate-700">{citation.text}</p>
        {citation.source && <p className="text-xs text-slate-500 mt-1">Source: {citation.source}</p>}
      </div>
      {citation.url && (
        <a
          href={citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-blue-600 hover:text-blue-700 transition-colors"
          aria-label="Open source"
        >
          <ExternalLink size={16} />
        </a>
      )}
    </div>
  );
}
