'use client';

import { ToolCall as ToolCallType } from '@/types/chat';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ToolCallProps {
  tool: ToolCallType;
}

export function ToolCall({ tool }: ToolCallProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusIcon = {
    pending: <Loader size={16} className="text-slate-400 animate-spin" />,
    running: <Loader size={16} className="text-blue-500 animate-spin" />,
    completed: <CheckCircle size={16} className="text-green-500" />,
    failed: <AlertCircle size={16} className="text-red-500" />,
  }[tool.status];

  const statusColor = {
    pending: 'bg-slate-50 border-slate-200',
    running: 'bg-blue-50 border-blue-200',
    completed: 'bg-green-50 border-green-200',
    failed: 'bg-red-50 border-red-200',
  }[tool.status];

  return (
    <div className={cn('rounded-lg border ', statusColor)}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 transition-colors rounded-lg"
      >
        {statusIcon}
        <div className="flex-1 text-left">
          <span className="font-semibold text-slate-900">{tool.name}</span>
          {tool.description && <p className="text-xs text-slate-500 mt-0.5">{tool.description}</p>}
        </div>
        {isExpanded ? (
          <ChevronUp size={18} className="text-slate-400" />
        ) : (
          <ChevronDown size={18} className="text-slate-400" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-slate-200 px-4 py-3 space-y-3">
          {/* Input Parameters */}
          {Object.keys(tool.input).length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2">Input</h4>
              <pre className="bg-slate-100 rounded p-2 text-xs overflow-x-auto">
                {JSON.stringify(tool.input, null, 2)}
              </pre>
            </div>
          )}

          {/* Output */}
          {tool.output && (
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2">Output</h4>
              <pre className="bg-slate-100 rounded p-2 text-xs overflow-x-auto max-h-48">
                {typeof tool.output === 'string'
                  ? tool.output
                  : JSON.stringify(tool.output, null, 2)}
              </pre>
            </div>
          )}

          {/* Error */}
          {tool.error && (
            <div className="bg-red-100 border border-red-300 rounded p-2">
              <p className="text-xs font-semibold text-red-700">Error:</p>
              <p className="text-xs text-red-600">{tool.error}</p>
            </div>
          )}

          {/* Duration */}
          {tool.duration && (
            <p className="text-xs text-slate-500">
              Execution time: {tool.duration}ms
            </p>
          )}
        </div>
      )}
    </div>
  );
}
