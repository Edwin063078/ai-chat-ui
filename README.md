# AI Chat UI

A modern chat interface for agent-style AI experiences, built with Next.js 16, React 19, TypeScript, Tailwind CSS, and shadcn/ui components.

## Highlights

- Clean multi-panel chat layout with responsive behavior.
- Markdown message rendering with syntax-highlighted code blocks.
- Agent workflow UI elements:
	- Reasoning steps
	- Tool calls
	- Citations
	- Artifacts
	- Task progress
- Conversation sidebar with search and organization.
- Mock chat data and reusable typed models for fast iteration.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- shadcn/ui primitives
- react-markdown + remark-gfm
- highlight.js

## Project Structure

```text
app/                    Next.js app entry, pages, providers, and API routes
components/             UI components (chat, agent, layout, shared, ui)
hooks/                  Reusable hooks
lib/                    Utilities and mock data
types/                  Type definitions
docs/                   Design and deployment docs
public/                 Static assets
```

## Quick Start

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev     # start development server
npm run build   # build for production
npm run start   # run production build
npm run lint    # run ESLint
```

## Deployment

- Vercel configuration is included in `vercel.json`.
- Additional setup notes are available in `HOSTING.md` and `docs/DEPLOYMENT.md`.

## Notes

- This project is currently configured as a UI-focused chat client with mock data.
- Replace mock flows with your real backend in `app/api/chat` and chat state hooks/components.

## License

Private project.
