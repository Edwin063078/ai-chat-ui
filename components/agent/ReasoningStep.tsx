'use client';

import { ReasoningStep as ReasoningStepType } from '@/types/chat';
import { ChevronDown, ChevronUp, Lightbulb, Search, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ReasoningStepProps {
  step: ReasoningStepType;
}

export function ReasoningStep({ step }: ReasoningStepProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeIcon = {
    thinking: <Lightbulb size={16} className="text-amber-500" />,
    searching: <Search size={16} className="text-blue-500" />,
    using_tool: <Loader size={16} className="text-purple-500" />,
    waiting: <Loader size={16} className="text-slate-400 animate-spin" />,
    completed: <CheckCircle size={16} className="text-green-500" />,
    failed: <AlertCircle size={16} className="text-red-500" />,
  }[step.type];

  const backgroundColor = {
    thinking: 'bg-amber-50 border-amber-200',
    searching: 'bg-blue-50 border-blue-200',
    using_tool: 'bg-purple-50 border-purple-200',
    waiting: 'bg-slate-50 border-slate-200',
    completed: 'bg-green-50 border-green-200',
    failed: 'bg-red-50 border-red-200',
  }[step.type];

  const typeLabel = {
    thinking: 'Thinking',
    searching: 'Searching',
    using_tool: 'Using Tool',
    waiting: 'Waiting',
    completed: 'Completed',
    failed: 'Failed',
  }[step.type];

  return (
    <div className={cn('rounded-lg border ', backgroundColor)}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 px-4 py-2 hover:opacity-80 transition-opacity rounded-lg"
      >
        {typeIcon}
        <span className="text-xs font-semibold text-slate-700 uppercase">{typeLabel}</span>
        {step.duration && <span className="text-xs text-slate-500 ml-auto">{step.duration}ms</span>}
        {isExpanded ? (
          <ChevronUp size={16} className="text-slate-400" />
        ) : (
          <ChevronDown size={16} className="text-slate-400" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-current border-opacity-20 px-4 py-2.5 text-sm text-slate-700 leading-relaxed">
          {step.content}
        </div>
      )}
    </div>
  );
}
