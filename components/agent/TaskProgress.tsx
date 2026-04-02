'use client';

import { Badge } from '@/components/ui/badge';

interface TaskStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

interface TaskProgressProps {
  steps: TaskStep[];
  currentStep?: string;
}

export function TaskProgress({ steps, currentStep }: TaskProgressProps) {
  return (
    <div className="space-y-3 py-2">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center gap-3">
          {/* Step Number / Status Icon */}
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step.status === 'completed'
                ? 'bg-green-100 text-green-700'
                : step.status === 'failed'
                  ? 'bg-red-100 text-red-700'
                  : step.status === 'running'
                    ? 'bg-blue-100 text-blue-700 animate-pulse'
                    : 'bg-slate-200 text-slate-600'
            }`}
          >
            {step.status === 'completed' ? '✓' : step.status === 'failed' ? '✕' : idx + 1}
          </div>

          {/* Step Name & Status */}
          <div className="flex-1">
            <span className="text-sm font-medium text-slate-900">{step.name}</span>
            {step.status === 'running' && (
              <Badge variant="default" className="ml-2 text-xs">
                Running
              </Badge>
            )}
          </div>

          {/* Connector Line */}
          {idx < steps.length - 1 && (
            <div
              className={`absolute left-4 top-full w-0.5 h-4 ${
                step.status === 'completed'
                  ? 'bg-green-300'
                  : step.status === 'failed'
                    ? 'bg-red-300'
                    : 'bg-slate-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
