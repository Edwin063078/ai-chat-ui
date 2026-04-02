# Design System & Architecture

## Overview

This chat UI is built on a scalable, component-driven architecture with clear separation of concerns:

- **State**: React Context + useReducer for deterministic state management
- **Components**: Modular, single-responsibility components
- **Styling**: Tailwind CSS utility-first with shadcn/ui components
- **Types**: Full TypeScript for type safety

## Design Principles

1. **Simplicity** - Minimal, intuitive interface
2. **Clarity** - Clear visual hierarchy and information structure
3. **Consistency** - Unified design patterns across all components
4. **Accessibility** - WCAG AA compliant, keyboard-navigable
5. **Performance** - Optimized rendering, efficient state updates

## Color System

### Palette

**Neutral Scale** (Primary text, backgrounds, borders)
```
slate-50   - Backgrounds, light panels
slate-100  - Hover states, secondary backgrounds
slate-200  - Borders, dividers
slate-400  - Disabled text
slate-600  - Secondary text
slate-700  - Primary text
slate-900  - Headings, emphasis
```

**Semantic Colors**
```
blue-600   - Primary actions, links, user messages
green-500  - Success states, completed tasks
amber-500  - Warning states, thinking
red-500    - Error states, failed tasks
purple-500 - Tool calls, agent features
```

### Usage

- **Backgrounds**: slate-50, slate-100
- **Text**: slate-700 (primary), slate-600 (secondary), slate-400 (disabled)
- **Borders**: slate-200
- **Accents**: blue-600 (primary action), green-500 (success)
- **User messages**: blue-600 background, white text
- **Assistant messages**: slate-100 background, slate-900 text

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
             "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
             "Droid Sans", "Helvetica Neue", sans-serif;
```

### Scale
- **Display**: 32px / 2rem, font-semibold
- **Heading H2**: 24px / 1.5rem, font-semibold
- **Heading H3**: 20px / 1.25rem, font-semibold
- **Body**: 14px / 0.875rem, font-regular
- **Small**: 12px / 0.75rem, font-regular
- **Code**: 13px / 0.8125rem, font-mono

### Line Heights
- Headings: 1.2 (compact)
- Body: 1.6 (readable)
- Code: 1.4 (balanced)

## Spacing System

Follows 8px base grid for consistency:

```
px-1  = 4px    (micro element spacing)
px-2  = 8px    (small spacing)
px-3  = 12px   (tight spacing)
px-4  = 16px   (base spacing)
px-6  = 24px   (loose spacing)
px-8  = 32px   (large spacing)
px-12 = 48px   (section spacing)
```

### Common Spacing Patterns
- **Button padding**: px-4 py-2 (horizontal-vertical)
- **Card padding**: p-4 or p-6
- **Message bubble**: px-4 py-3
- **Section gap**: gap-4 between major sections
- **Message gap**: gap-3 between messages

## Component Hierarchy

```
ChatLayout
├── Sidebar
│   ├── New Chat Button
│   ├── Pinned Conversations
│   └── Recent Conversations
├── ChatHeader
│   ├── Menu Toggle
│   ├── Page Title
│   └── Model Selector
└── Main Content
    ├── ChatContainer
    │   ├── Message List
    │   │   ├── MessageBubble
    │   │   │   ├── Avatar/Icon
    │   │   │   ├── Message Content
    │   │   │   ├── ToolCall (optional)
    │   │   │   ├── ReasoningStep (optional)
    │   │   │   ├── Citation (optional)
    │   │   │   ├── Artifact (optional)
    │   │   │   ├── Timestamp
    │   │   │   └── Action Buttons
    │   │   └── Loading Indicator
    │   └── Scroll Area
    └── Composer
        ├── Text Input
        ├── File Upload
        ├── Send Button
        └── Mode Toggle
```

## State Management

### ChatState Structure
```typescript
{
  conversations: Conversation[]  // All conversations
  currentConversationId: string  // Selected conversation
  isLoading: boolean            // Message loading state
  error: string | null          // Error messages
}
```

### Actions
```typescript
CREATE_CONVERSATION   // New conversation
SELECT_CONVERSATION   // Switch to conversation
ADD_MESSAGE          // Add new message
UPDATE_MESSAGE       // Edit existing message
DELETE_MESSAGE       // Remove message
DELETE_CONVERSATION  // Remove conversation
PIN_CONVERSATION     // Pin/unpin
SET_LOADING          // Loading state
SET_ERROR            // Error handling
```

## Responsive Design

### Breakpoints
```
Mobile:    < 640px   (sm)
Tablet:    640px+    (md)
Desktop:   1024px+   (lg)
Wide:      1280px+   (xl)
```

### Layout Changes
| Screen | Sidebar | Width | Columns |
|--------|---------|-------|---------|
| Mobile | Hidden (drawer on click) | Full | 1 |
| Tablet | 100% height, fixed | Full | 1 |
| Desktop | 256px sidebar | Flexible | 2+ |

### Component Adaptations
- **Messages**: Full width on mobile, max-w-2xl on desktop
- **Composer**: Expands across width on mobile
- **Sidebar**: Drawer modal on mobile
- **Buttons**: Larger touch targets on mobile (44px+)

## Interactions & Animations

### Transitions
```css
transition-colors     /* Hover/focus color changes */
transition-opacity    /* Fade in/out */
transition-all        /* General smooth changes */
duration-200         /* 200ms default */
duration-300         /* For larger animations */
```

### Animations
- **Typing dots**: `animate-bounce` with staggered delay
- **Loading spinner**: `animate-spin`
- **Pulse**: `animate-pulse` for thinking state
- **Fade in**: Custom animation on message load

### States
- **Hover**: `hover:bg-slate-100` opacity increase
- **Focus**: `ring-2 ring-blue-500 ring-offset-2`
- **Active**: Font weight increase, color 700
- **Disabled**: `opacity-50 cursor-not-allowed`

## Component APIs

### MessageBubble
```tsx
<MessageBubble message={message} />
```
**Props:**
- `message: Message` - Full message object

**Features:**
- Auto-renders all content types
- Action buttons on hover
- Timestamp display
- Agent features (tools, reasoning, etc.)

### ToolCall
```tsx
<ToolCall tool={toolCall} />
```
**Props:**
- `tool: ToolCall` - Tool call object

**Features:**
- Expandable/collapsible
- Status indicators
- Input/output display
- Error handling

### Composer
```tsx
<Composer />
```
**Features:**
- Auto-expanding textarea
- Multiline support (Shift+Enter)
- Send button with loading state
- File upload button
- Model selector

## Accessibility

### ARIA Labels
```tsx
aria-label="Send message"
aria-label="Delete conversation"
role="button"
role="tab"
aria-expanded="true"
aria-disabled="true"
```

### Keyboard Navigation
- `Tab` - Navigate forward
- `Shift+Tab` - Navigate backward
- `Enter` - Send message (Shift+Enter for newline)
- `Escape` - Close modals/expanded sections
- `Ctrl+K` - Focus search (future)

### Focus Management
- Always visible focus ring
- Logical tab order
- Focus returns to trigger after close

### Color Contrast
- Text on background: ≥ 4.5:1 (AA)
- UI components: ≥ 3:1 (AA)
- Verified with accessibility tools

## Performance Optimizations

### Code Splitting
- Next.js automatic code splitting
- Route-based splitting
- Component lazy loading (ready)

### Rendering
- `useCallback` for stable callbacks
- Memo for expensive components (ready)
- Virtualization for long lists (ready)

### Bundle Size
- Tree-shaking enabled
- CSS purging with Tailwind
- Unused dependencies removed
- Target: < 500KB gzipped

## Browser Compatibility

### Supported Browsers
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

### Features Used
- CSS Grid & Flexbox
- CSS Custom Properties
- ES2020+ JavaScript
- Intersection Observer (ready)

## Dark Mode (Future)

### Color Mapping
```
slate-50 → slate-950
slate-100 → slate-900
slate-900 → slate-50
blue-600 → blue-500
```

### Implementation
```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

## Design Checkpoints

- [ ] All components follow spacing guidelines
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works throughout
- [ ] Mobile responsive across all breakpoints
- [ ] Loading states show everywhere needed
- [ ] Error states graceful and helpful
- [ ] Animations smooth and performant
- [ ] Component APIs consistent
- [ ] TypeScript types complete
- [ ] No console warnings/errors

---

**Design System v1.0** - Built for clarity, consistency, and accessibility
