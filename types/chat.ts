export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    tokens?: number;
    model?: string;
    stopped_reason?: string;
  };
  toolCalls?: ToolCall[];
  reasoning?: ReasoningStep[];
  citations?: Citation[];
  artifacts?: Artifact[];
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
}

export interface ToolCall {
  id: string;
  name: string;
  description?: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown> | string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  error?: string;
  duration?: number;
}

export interface ReasoningStep {
  id: string;
  type: 'thinking' | 'searching' | 'using_tool' | 'waiting' | 'completed' | 'failed';
  content: string;
  duration?: number;
  timestamp: Date;
}

export interface Citation {
  text: string;
  url?: string;
  source?: string;
}

export interface Artifact {
  id: string;
  type: 'file' | 'code' | 'image' | 'document';
  filename: string;
  content?: string;
  url?: string;
  mimeType?: string;
}
