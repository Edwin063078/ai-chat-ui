# Components Documentation

Complete API reference for all components in the Chat UI.

## Layout Components

### ChatLayout
Main layout wrapper that manages sidebar and chat area.

```tsx
<ChatLayout>
  <ChatContainer />
  <Composer />
</ChatLayout>
```

**Props:**
- `children: ReactNode` - Content to display

**Features:**
- Responsive sidebar (hidden on mobile, drawer mode)
- Desktop/mobile menu toggles
- Fixed header with model selector

---

### ChatHeader
Top navigation bar with model selector and settings.

```tsx
<ChatHeader
  sidebarOpen={true}
  onSidebarToggle={() => {}}
  onMobileMenuToggle={() => {}}
  mobileMenuOpen={false}
/>
```

**Props:**
- `sidebarOpen: boolean` - Sidebar visibility
- `onSidebarToggle: () => void` - Sidebar toggle handler
- `onMobileMenuToggle: () => void` - Mobile menu toggle
- `mobileMenuOpen: boolean` - Mobile menu visibility

---

### Sidebar
Conversation history panel with search and actions.

```tsx
<Sidebar />
```

**Features:**
- New chat button
- Pinned conversations section
- Recent conversations list
- Pin/delete actions on hover
- Empty state message

---

### Composer
Message input area with file upload and send.

```tsx
<Composer />
```

**Features:**
- Auto-expanding textarea
- Multiline support (Shift+Enter)
- File upload button (ready)
- Microphone button (placeholder)
- Model selector
- Agent mode toggle
- Loading state handling

## Chat Components

### ChatContainer
Message list with auto-scroll and loading state.

```tsx
<ChatContainer />
```

**Features:**
- Auto-scrolls to latest message
- Loading indicator with animation
- Empty state when no messages
- ScrollArea with smooth scrolling

---

### MessageBubble
Single message with all content and actions.

```tsx
<MessageBubble message={message} />
```

**Props:**
- `message: Message` - Message object

**Features:**
- User/assistant styling
- Markdown rendering
- Code blocks with copy button
- Tool calls (expandable)
- Reasoning steps (expandable)
- Citations (linked)
- Artifacts (preview + download)
- Action buttons (copy, delete, regenerate, edit)
- Timestamp display
- Hover state transitions

---

### MessageContent
Renders markdown with syntax highlighting.

```tsx
<MessageContent content="# Hello" isUser={false} />
```

**Props:**
- `content: string` - Markdown string
- `isUser?: boolean` - User message styling

**Features:**
- GitHub-flavored markdown
- Syntax highlighting with highlight.js
- Inline code styling
- Code block rendering
- Lists, tables, blockquotes
- Links with target="_blank"

---

### CodeBlock
Code snippet with language highlighting and copy button.

```tsx
<CodeBlock language="python" code="print('hello')" />
```

**Props:**
- `code: string` - Code content
- `language?: string` - Language for highlighting
- `isUser?: boolean` - User message styling

**Features:**
- Syntax highlighting
- Copy to clipboard button with confirmation
- Language label
- Scrollable overflow
- Dark theme with light text

## Agent Components

### ToolCall
Tool execution display with input/output.

```tsx
<ToolCall tool={toolCall} />
```

**Props:**
- `tool: ToolCall` - Tool call object

**ToolCall Interface:**
```typescript
{
  id: string
  name: string
  description?: string
  input: Record<string, unknown>
  output?: Record<string, unknown> | string
  status: 'pending' | 'running' | 'completed' | 'failed'
  error?: string
  duration?: number
}
```

**Features:**
- Status icon with color coding
- Expandable/collapsible header
- JSON.stringify for input/output display
- Error display with red highlight
- Execution duration badge

---

### ReasoningStep
Single reasoning/status step in workflow.

```tsx
<ReasoningStep step={reasoningStep} />
```

**Props:**
- `step: ReasoningStep` - Step object

**ReasoningStep Interface:**
```typescript
{
  id: string
  type: 'thinking' | 'searching' | 'using_tool' | 'waiting' | 'completed' | 'failed'
  content: string
  duration?: number
  timestamp: Date
}
```

**Features:**
- Type-specific icons and colors
- Expandable content
- Duration badge
- Status labels
- Timeline presentation

---

### Citation
Source reference with link.

```tsx
<Citation citation={citation} />
```

**Props:**
- `citation: Citation` - Citation object

**Citation Interface:**
```typescript
{
  text: string
  url?: string
  source?: string
}
```

**Features:**
- Citation text display
- Source attribution
- External link button
- Compact design

---

### Artifact
Generated content display (code, image, document).

```tsx
<Artifact artifact={artifact} />
```

**Props:**
- `artifact: Artifact` - Artifact object

**Artifact Interface:**
```typescript
{
  id: string
  type: 'file' | 'code' | 'image' | 'document'
  filename: string
  content?: string
  url?: string
  mimeType?: string
}
```

**Features:**
- Type-specific icon
- Filename display
- Type badge
- Download button
- Code preview (for code type)
- Image preview (for image type)
- MIME type display

---

### TaskProgress
Multi-step task progress visualization.

```tsx
<TaskProgress steps={steps} currentStep="step-2" />
```

**Props:**
- `steps: TaskStep[]` - Array of task steps
- `currentStep?: string` - Current step ID

**TaskStep Interface:**
```typescript
{
  id: string
  name: string
  status: 'pending' | 'running' | 'completed' | 'failed'
}
```

**Features:**
- Step-by-step progress display
- Status indicators per step
- Connector lines between steps
- Animated pulse for running steps
- Visual completion status

## Shared Components

### EmptyState
Placeholder shown when no messages exist.

```tsx
<EmptyState subtitle="No messages yet" />
```

**Props:**
- `subtitle?: string` - Optional subtitle text

**Features:**
- Icon display
- Title and subtitle
- Suggestion buttons grid
- Centered layout

---

### Badge
Status/label badge component (from shadcn/ui).

```tsx
<Badge variant="default">Completed</Badge>
```

**Variants:**
- `default` - Primary styling
- `secondary` - Secondary styling
- `destructive` - Error styling
- `outline` - Outline styling

## Utility Components (shadcn/ui)

### Button
```tsx
<Button variant="primary" size="lg">Click me</Button>
```

**Variants:** default, destructive, outline, secondary, ghost, link
**Sizes:** default, sm, lg, icon

### Input
```tsx
<Input placeholder="Enter text..." />
```

### Textarea
```tsx
<Textarea placeholder="Type message..." rows={3} />
```

### ScrollArea
```tsx
<ScrollArea className="h-full">
  {/* Long content */}
</ScrollArea>
```

### Tabs
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>
```

### Card
```tsx
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## Hook: useChat

Complete chat state management hook.

```tsx
const {
  state,
  currentConversation,
  createNewConversation,
  selectConversation,
  addMessage,
  updateMessage,
  deleteMessage,
  deleteConversation,
  pinConversation,
  setLoading,
  setError,
} = useChat();
```

**Return Value:**
```typescript
{
  state: ChatState                      // Full state object
  currentConversation?: Conversation    // Current selected
  createNewConversation: (title?) => void
  selectConversation: (id: string) => void
  addMessage: (message) => Message
  updateMessage: (id, updates) => Message
  deleteMessage: (id: string) => void
  deleteConversation: (id: string) => void
  pinConversation: (id: string) => void
  setLoading: (boolean) => void
  setError: (error: string | null) => void
}
```

## Usage Examples

### Basic Message Flow
```tsx
const { addMessage, state } = useChat();

// Add user message
addMessage({
  role: 'user',
  content: 'Hello!',
});

// Add assistant response
addMessage({
  role: 'assistant',
  content: 'Hi there! How can I help?',
});
```

### Message with Tool Call
```tsx
addMessage({
  role: 'assistant',
  content: 'Let me search for that information...',
  toolCalls: [
    {
      id: '1',
      name: 'web_search',
      input: { query: 'AI developments 2024' },
      status: 'completed',
      output: { results: [...] },
    },
  ],
});
```

### Message with Reasoning
```tsx
addMessage({
  role: 'assistant',
  content: 'Here are the results...',
  reasoning: [
    {
      id: '1',
      type: 'thinking',
      content: 'User asked about search',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'searching',
      content: 'Searching databases...',
      duration: 1500,
      timestamp: new Date(),
    },
  ],
});
```

### In a React Component
```tsx
import { useChat } from '@/hooks/useChat';

export function ChatDemo() {
  const { currentConversation, addMessage } = useChat();

  return (
    <div>
      {currentConversation?.messages.map(msg => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
```

---

**Last Updated:** April 2025
**Version:** 1.0
