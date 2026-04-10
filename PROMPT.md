### COMMENT PLS USE PLAN MODE TO RESPOND TO THIS PROMPT. DO NOT RESPOND WITH A FINAL ANSWER, INSTEAD RESPOND WITH A DETAILED PLAN OF HOW YOU WOULD APPROACH THIS PROBLEM, INCLUDING ANY RESEARCH YOU WOULD DO, THE STEPS YOU WOULD TAKE TO DESIGN AND BUILD THE UI, AND ANY CONSIDERATIONS OR CHALLENGES YOU ANTICIPATE. ONCE YOU HAVE LAID OUT YOUR PLAN IN DETAIL, THEN YOU CAN BEGIN IMPLEMENTING IT.

Act as a senior product designer and full-stack engineer.

Help me design and build a modern Chat UI for an AI agentic assistant.

Goals:

Clean, fast, production-ready chat experience
Feels like ChatGPT / Claude quality, but tailored for agent workflows
Supports both normal chat and agent actions
Designed for web first, responsive for mobile
What I want in the UI:

Main chat area

user / assistant message bubbles
markdown rendering
code blocks with copy button
streaming responses
typing / thinking state
retry, edit, regenerate actions
timestamps
Agentic workflow features

show tool calls in-line
expandable reasoning / status steps
task progress states like:
thinking
searching
using tool
waiting
completed
failed
allow multi-step execution visibility
show citations / sources
show attachments and generated artifacts
Composer area

multiline prompt input
file upload
microphone button placeholder
send button
model / mode selector
agent mode toggle
Sidebar

conversation history
new chat button
pinned chats
filters / search
UX requirements

minimalist, elegant, modern
excellent spacing and typography
accessible color contrast
keyboard shortcuts
empty state
error state
loading skeletons
mobile responsive
Deliverables:

information architecture
UI layout description
component list
design system suggestions
user flow
edge cases
React component structure
Tailwind styling approach
example mockup in code
Tech stack:

React
Next.js
Tailwind CSS
shadcn/ui
Please provide:

a product-level UX plan
a component breakdown
a clean page layout
sample React code for the main chat screen
suggestions specifically for agentic UI patterns
