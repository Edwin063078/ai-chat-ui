import { Conversation, Message, ToolCall, ReasoningStep, Citation, Artifact } from '@/types/chat';

// Sample conversations with full agent workflow features
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Web Search Query',
    model: 'claude-opus-4-6',
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 300000),
    isPinned: true,
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Can you find information about the latest AI developments?',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content:
          'I found some recent developments in AI. Here are the key highlights:\n\n1. **Multimodal Models**: Latest models can process text, images, and audio\n2. **Efficiency**: Smaller models achieving comparable performance\n3. **Safety**: Improved alignment and safety research\n\nLet me search for more specific information.',
        timestamp: new Date(Date.now() - 3500000),
        reasoning: [
          {
            id: 'step-1',
            type: 'thinking',
            content: 'The user is asking about recent AI developments. I should search for current information.',
            timestamp: new Date(Date.now() - 3500000),
          },
          {
            id: 'step-2',
            type: 'searching',
            content: 'Searching for latest AI news and research papers from 2024-2025...',
            duration: 2340,
            timestamp: new Date(Date.now() - 3490000),
          },
          {
            id: 'step-3',
            type: 'completed',
            content: 'Found relevant information about multimodal models and efficiency improvements.',
            duration: 1200,
            timestamp: new Date(Date.now() - 3480000),
          },
        ],
        citations: [
          {
            text: 'Recent advances in multimodal learning',
            source: 'arXiv.org',
            url: 'https://arxiv.org',
          },
          {
            text: 'New safety alignment techniques',
            source: 'OpenAI Blog',
            url: 'https://openai.com/blog',
          },
        ],
      },
    ],
  },

  {
    id: 'conv-2',
    title: 'Python Code Generation',
    model: 'claude-opus-4-6',
    createdAt: new Date(Date.now() - 7200000),
    updatedAt: new Date(Date.now() - 7200000),
    isPinned: false,
    messages: [
      {
        id: 'msg-3',
        role: 'user',
        content: 'Write a function to calculate fibonacci numbers with memoization',
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content:
          'Here is an efficient Fibonacci function with memoization:\n\n```python\ndef fibonacci(n, memo={}):\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    \n    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)\n    return memo[n]\n\n# Example usage\nprint(fibonacci(50))  # Returns 12586269025\n```\n\nThis function uses memoization to cache results, reducing time complexity from O(2^n) to O(n).',
        timestamp: new Date(Date.now() - 7190000),
        artifacts: [
          {
            id: 'artifact-1',
            type: 'code',
            filename: 'fibonacci.py',
            content: `def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n

    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    return memo[n]

# Example usage
print(fibonacci(50))  # Returns 12586269025`,
            mimeType: 'text/x-python',
          },
        ],
      },
    ],
  },

  {
    id: 'conv-3',
    title: 'API Integration with Tool Calls',
    model: 'claude-opus-4-6',
    createdAt: new Date(Date.now() - 10800000),
    updatedAt: new Date(Date.now() - 10800000),
    isPinned: false,
    messages: [
      {
        id: 'msg-5',
        role: 'user',
        content: 'Get the weather forecast for San Francisco for the next 3 days',
        timestamp: new Date(Date.now() - 10800000),
      },
      {
        id: 'msg-6',
        role: 'assistant',
        content:
          '**San Francisco Weather Forecast**\n\n🌤️ **Today**: Sunny, 72°F\n☁️ **Tomorrow**: Partly Cloudy, 68°F\n🌧️ **Day After**: Rainy, 62°F\n\nBased on the latest forecast data, you should prepare an umbrella for the day after tomorrow.',
        timestamp: new Date(Date.now() - 10700000),
        toolCalls: [
          {
            id: 'tool-1',
            name: 'get_weather',
            description: 'Fetch weather data for a specific location',
            input: {
              location: 'San Francisco, CA',
              days: 3,
            },
            output: JSON.parse(`{
              "forecast": [
                { "date": "2025-04-02", "condition": "Sunny", "temp": 72 },
                { "date": "2025-04-03", "condition": "Partly Cloudy", "temp": 68 },
                { "date": "2025-04-04", "condition": "Rainy", "temp": 62 }
              ]
            }`),
            status: 'completed',
            duration: 234,
          } as ToolCall,
        ],
      },
    ],
  },

  {
    id: 'conv-4',
    title: 'Multi-Step Task with Failures',
    model: 'claude-opus-4-6',
    createdAt: new Date(Date.now() - 14400000),
    updatedAt: new Date(Date.now() - 14400000),
    isPinned: false,
    messages: [
      {
        id: 'msg-7',
        role: 'user',
        content: 'Process this image and extract text from it',
        timestamp: new Date(Date.now() - 14400000),
      },
      {
        id: 'msg-8',
        role: 'assistant',
        content:
          'I attempted to process the image, but encountered an issue. Let me try again with a different approach.',
        timestamp: new Date(Date.now() - 14300000),
        reasoning: [
          {
            id: 'step-4',
            type: 'using_tool',
            content: 'Running OCR on the uploaded image...',
            timestamp: new Date(Date.now() - 14300000),
          },
          {
            id: 'step-5',
            type: 'failed',
            content: 'Initial OCR attempt failed due to image quality',
            duration: 1500,
            timestamp: new Date(Date.now() - 14250000),
          },
          {
            id: 'step-6',
            type: 'thinking',
            content: 'Trying alternative OCR engine with preprocessing...',
            timestamp: new Date(Date.now() - 14240000),
          },
          {
            id: 'step-7',
            type: 'completed',
            content: 'Successfully extracted text using enhanced preprocessing',
            duration: 2100,
            timestamp: new Date(Date.now() - 14200000),
          },
        ],
        toolCalls: [
          {
            id: 'tool-2',
            name: 'ocr_process',
            description: 'Extract text from images using OCR',
            input: {
              image_url: 'image-data-url',
              language: 'en',
            },
            output: 'Extracted text from image...',
            status: 'completed',
            duration: 3600,
          } as ToolCall,
        ],
      },
    ],
  },
];

export const DEFAULT_MOCK_CONVERSATION: Conversation = {
  id: 'conv-welcome',
  title: 'Welcome to Chat',
  model: 'claude-opus-4-6',
  createdAt: new Date(),
  updatedAt: new Date(),
  isPinned: false,
  messages: [
    {
      id: 'msg-welcome',
      role: 'assistant',
      content:
        '👋 Welcome to the AI Chat Assistant!\n\nThis is a modern chat interface with support for:\n\n- **Rich markdown** with code highlighting\n- **Agent workflows** showing tool calls and reasoning\n- **Conversations** that persist in your sidebar\n- **Real-time streaming** responses\n\nTry asking me something or explore the features above!',
      timestamp: new Date(),
    },
  ],
};
