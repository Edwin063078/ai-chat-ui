'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';

interface MessageContentProps {
  content: string;
  isUser?: boolean;
}

export function MessageContent({ content, isUser }: MessageContentProps) {
  return (
    <div className={`prose prose-sm max-w-none break-words ${
      isUser ? 'prose-invert' : ''
    }`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ children, className, ...props }) {
            const language = className?.replace('language-', '') || '';
            const code = String(children).replace(/\n$/, '');

            // Inline code
            if (!className) {
              return (
                <code
                  className={`px-1.5 py-0.5 rounded bg-slate-200 text-slate-900 font-mono text-sm ${
                    isUser ? 'bg-blue-700 text-blue-100' : ''
                  }`}
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // Code block
            return <CodeBlock language={language} code={code} isUser={isUser} />;
          },
          pre({ children }) {
            return <div className="my-2">{children}</div>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
