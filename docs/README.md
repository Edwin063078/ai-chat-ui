# Chat UI for AI Agentic Assistant

A production-ready, modern chat interface designed for conversational AI with advanced agentic capabilities. Built with React, Next.js, Tailwind CSS, and shadcn/ui.

## Features

### Core Chat Features
- 💬 **Message bubbles** with user/assistant distinction
- 📝 **Markdown rendering** with GitHub-flavored markdown support
- 💻 **Code blocks** with syntax highlighting and copy-to-clipboard
- ⚡ **Real-time streaming** responses with typing indicators
- 🎯 **Message actions** - copy, delete, regenerate (edit ready)

### Agentic Workflow Features
- 🔧 **Tool calls** - Expandable panel showing tool execution with input/output parameters
- 🧠 **Reasoning steps** - Visual step-by-step reasoning with status indicators (thinking, searching, using tool, waiting, completed, failed)
- 📚 **Citations** - Source references with links
- 🎨 **Artifacts** - Generated code, images, documents, files with download capability
- 📊 **Task progress** - Multi-step task progress visualization

### Conversation Management
- 💾 **Conversation history** in persistent sidebar
- 📌 **Pin/unpin** conversations for quick access
- 🔍 **Search and filter** conversations
- ➕ **New chat** button with empty state suggestions
- 🗑️ **Delete** conversations with confirmation

### UI/UX
- 📱 **Responsive design** - Mobile, tablet, and desktop optimized
- 🎨 **Elegant styling** - Modern, clean interface with proper spacing and typography
- ⌨️ **Keyboard shortcuts** - Tab navigation, Shift+Enter for newline
- ♿ **Accessibility** - ARIA labels, high contrast, focus states
- 🌙 **Light mode** - Optimized for readability (dark mode coming soon)

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Quick Start

```bash
# Clone and navigate
cd session-1-ai-chat

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
session-1-ai-chat/
├── app/
│   ├── page.tsx              # Main chat page
│   ├── layout.tsx            # Root layout with providers
│   ├── providers.tsx         # Chat context and state management
│   └── globals.css           # Global styles
├── components/
│   ├── layout/               # Layout components
│   │   ├── ChatLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ChatHeader.tsx
│   │   └── Composer.tsx
│   ├── chat/                 # Message components
│   │   ├── ChatContainer.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageContent.tsx
│   │   └── CodeBlock.tsx
│   ├── agent/                # Agent workflow components
│   │   ├── ToolCall.tsx
│   │   ├── ReasoningStep.tsx
│   │   ├── Citation.tsx
│   │   ├── Artifact.tsx
│   │   └── TaskProgress.tsx
│   ├── shared/               # Shared utilities
│   │   └── EmptyState.tsx
│   └── ui/                   # shadcn/ui components
├── hooks/
│   └── useChat.ts            # Chat state management hook
├── types/
│   └── chat.ts               # TypeScript type definitions
└── lib/
    ├── mock-data.ts          # Sample mock conversations
    └── utils.ts              # Utility functions
```

## Architecture

### State Management
Uses **React Context + useReducer** for predictable state management:
- `ChatContext` - Global chat state
- `useChat()` hook - Easy access to state and dispatch

### Type Safety
Full TypeScript support with comprehensive type definitions:
- `Message`, `Conversation` - Core types
- `ToolCall`, `ReasoningStep` - Agent workflow types
- `Citation`, `Artifact` - Extended message features

### Styling
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for consistent components
- **Custom CSS** for animations and special effects
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## Key Components

### MessageBubble
Renders a single message with:
- User/assistant styling
- Markdown content rendering
- Tool calls, reasoning steps, citations, artifacts
- Action buttons (copy, delete, regenerate, edit)

### ToolCall
Expandable panel showing:
- Tool name and status (pending, running, completed, failed)
- Input parameters
- Output/result
- Error messages if applicable
- Execution duration

### ReasoningStep
Visual representation of reasoning steps:
- Status badges (thinking, searching, using_tool, waiting, completed, failed)
- Collapsible content
- Timeline-like presentation
- Execution duration

### ChatContainer
Manages the message list:
- Auto-scrolls to latest message
- Displays loading state
- Shows empty state when no messages
- Handles scroll area

### Composer
Message input area:
- Auto-expanding textarea
- Multiline support (Shift+Enter)
- Send button with loading state
- File upload (button ready)
- Microphone button (placeholder)

## Mock Data

The app comes pre-loaded with sample conversations showcasing all features:

1. **Web Search Query** - Shows reasoning steps and citations
2. **Python Code Generation** - Shows code artifacts
3. **API Integration** - Shows tool calls with input/output
4. **Multi-Step Task** - Shows failed step recovery

Access these by clicking conversations in the sidebar.

## Customization

### Change Color Palette
Edit `tailwind.config.js` or create CSS variables in `app/globals.css`

### Modify Typography
Update font imports in `app/layout.tsx` and `tailwind.config.js`

### Add New Message Types
1. Create new type in `types/chat.ts`
2. Add component in `components/agent/`
3. Import and display in `MessageBubble.tsx`

### Connect to Real API
Replace mock responses in `Composer.tsx`:
```typescript
// Replace setTimeout mock with actual API call
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message: input })
});
```

## Performance Tips

- **Code splitting** - Automatic with Next.js App Router
- **Lazy loading** - Components load on demand
- **Memoization** - Components use callbacks and memo for efficiency
- **Scroll optimization** - Virtualization ready with ScrollArea
- **Build size** - ~400KB gzipped with dependencies

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Accessibility

- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation (Tab/Shift+Tab)
- ✅ Focus indicators visible
- ✅ Color contrast WCAG AA
- ✅ Semantic HTML
- ✅ Screen reader friendly

## Future Enhancements

- [ ] Dark mode support
- [ ] Voice input/output
- [ ] Conversation export (PDF, JSON)
- [ ] File attachments
- [ ] Image upload and preview
- [ ] Collaborative chat
- [ ] Plugin system
- [ ] Custom themes
- [ ] Message search
- [ ] Analytics

## Dependencies

- `react@18` - UI framework
- `next@16+` - React framework
- `tailwindcss@4` - Utility CSS
- `shadcn/ui@0.8+` - Component library
- `react-markdown@8+` - Markdown rendering
- `highlight.js@11+` - Code syntax highlighting
- `lucide-react@latest` - Icon library
- `date-fns@2+` - Date formatting

## Development

### Run Tests
```bash
npm run test
```

### Run Linter
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

## License

MIT - Feel free to use this in your projects!

## Support

For issues, questions, or contributions, please visit the GitHub repository or create an issue.

---

**Built with ❤️ for conversational AI excellence**
