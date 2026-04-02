'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import hljs from 'highlight.js';

interface CodeBlockProps {
  code: string;
  language?: string;
  isUser?: boolean;
}

export function CodeBlock({ code, language = 'text', isUser }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const highlightedCode = language
    ? hljs.highlight(code, { language, ignoreIllegals: true }).value
    : hljs.highlightAuto(code).value;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-lg overflow-hidden my-3 ${
        isUser ? 'bg-blue-900 border border-blue-700' : 'bg-slate-900 border border-slate-700'
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 ${
          isUser ? 'bg-blue-800 border-b border-blue-700' : 'bg-slate-800 border-b border-slate-700'
        }`}
      >
        <span className="text-xs font-semibold text-slate-400 uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-4 text-sm font-mono text-slate-100">
        <code
          dangerouslySetInnerHTML={{
            __html: highlightedCode,
          }}
        />
      </pre>
    </div>
  );
}
