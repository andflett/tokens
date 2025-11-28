# Tokens — LLM Context Document

> This document provides context for future LLM coding sessions. It captures the architecture, key decisions, technical choices, and planned improvements for this project.

**Last Updated:** November 2025  
**Primary Author:** Built collaboratively with Claude (Opus 4.5)

---

## 📋 Project Overview

**Tokens** is a design token generator built for **designers learning to code with AI assistants**. It provides:

1. **Web UI** — A visual token generator at `/generate`
2. **MCP Server** — AI-accessible tools at `/mcp` for Claude, Copilot, Cursor, etc.
3. **Documentation** — Educational docs with jargon popovers at `/docs`

The target audience is **non-technical designers and product managers** who are starting to code with AI assistants and LLMs. Every technical term has tooltip explanations.

### Audience & Tone

**Target Audience:**
- Non-technical people (designers, product managers, etc.)
- Just getting into AI coding (Claude, Cursor, Copilot, etc.)
- Unfamiliar with underlying tech (Tailwind, React, Next.js, design tokens, etc.)

**Tone Guidelines:**
- Friendly and approachable, not patronizing
- Use dry humour where appropriate
- Avoid jargon or explain technical terms inline
- Focus on "why" and practical benefits, not just "what"
- Speak in terms of design outcomes, not implementation details

---

## 🏗️ Architecture

### Current Structure (Monorepo)

```
design-tokens-mcp/
├── src/                    # Standalone MCP server (legacy, for local dev)
│   ├── mcp.ts             # Stdio/SSE MCP server
│   ├── api/server.ts      # Express REST API
│   └── lib/               # Token generation logic
│
├── web/                    # Next.js app (MAIN APPLICATION)
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   │   ├── page.tsx   # Landing page (Figma-style design)
│   │   │   ├── generate/  # Token generator UI
│   │   │   ├── docs/      # Documentation
│   │   │   ├── login/     # Supabase magic link auth
│   │   │   └── mcp/       # MCP API route handler
│   │   ├── components/    # React components
│   │   │   ├── ui/        # shadcn/ui components
│   │   │   ├── term.tsx   # Jargon popover component
│   │   │   ├── token-generator.tsx
│   │   │   ├── color-picker.tsx
│   │   │   └── export-dialog.tsx
│   │   └── lib/           # Shared utilities
│   │       ├── types.ts   # Core type definitions
│   │       ├── config.ts  # App configuration
│   │       ├── glossary.ts # Technical term definitions
│   │       ├── tokens/    # Token generation logic
│   │       ├── export/    # Multi-format exporters
│   │       ├── prompts/   # AI prompt templates
│   │       └── supabase/  # Auth & database
│   └── supabase/
│       └── migrations/    # Database schema
```

### Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js App Router** | Modern React patterns, server components, API routes in same deploy |
| **MCP in Next.js API route** | Single deployment to Vercel, no separate server to manage |
| **Vercel `mcp-handler`** | Official Vercel MCP package handles SSE on serverless (with Redis) |
| **Upstash Redis** | Required for SSE connections on Vercel's serverless functions |
| **OKLCH color space** | Perceptually uniform—each step in a scale looks equally different |
| **culori library** | Best-in-class color manipulation, great OKLCH support |
| **Supabase** | Magic link auth (no passwords for beginners), PostgreSQL for themes |
| **shadcn/ui + Radix** | Accessible, customizable components that match our token system |
| **Tailwind v4** | Native CSS layers, OKLCH support, modern approach |

---

## 🎨 Token System Design

### Color Scale Structure

We generate **10-step color scales** (10-100) for each brand color:

```typescript
interface ColorScale {
  10: string;   // Lightest
  20: string;
  30: string;
  40: string;
  50: string;   // Base (often the input color)
  60: string;
  70: string;
  80: string;
  90: string;
  100: string;  // Darkest
}
```

### Generated Scales

From 3 brand colors (primary, secondary, accent), we generate:

- **Primary** — Main brand color scale
- **Secondary** — Supporting color scale
- **Accent** — Highlight/CTA color scale
- **Neutral** — Grayscale derived from primary hue
- **Success** — Green (fixed hue, adjusted for brand)
- **Warning** — Yellow/orange (fixed hue)
- **Danger** — Red (fixed hue)
- **Info** — Blue (fixed hue)

### Semantic Tokens

Semantic tokens map primitives to UI purposes and adapt to light/dark:

```typescript
interface SemanticColor {
  base: string;     // Background or main use
  muted: string;    // Subtle variant
  accent: string;   // Emphasis
  onBase: string;   // Text on base
  onMuted: string;  // Text on muted
  onAccent: string; // Text on accent
}
```

### Why OKLCH?

HSL color scales look uneven—yellow appears brighter than blue at the same lightness. OKLCH (Oklab Lightness, Chroma, Hue) is **perceptually uniform**:

- Same lightness value = same perceived brightness
- Chroma adjusts naturally at extremes (very light/dark colors can't be as saturated)
- Modern browsers support `oklch()` natively

---

## 🔧 MCP Server Implementation

### Location

`web/src/app/mcp/[transport]/route.ts`

Uses Vercel's `mcp-handler` package with dynamic route segment for transport type.

### Available Tools

| Tool | Purpose |
|------|---------|
| `generate_tokens` | Deterministic token generation from brand colors |
| `generate_tokens_ai` | Generates prompt for AI to create tokens with context |
| `generate_component` | Generates prompt for creating shadcn/ui components |
| `export_tokens` | Converts tokens to CSS, Tailwind v3/v4, JSON, SCSS |
| `analyze_vibe` | Takes a vibe description, suggests brand colors |

### SSE on Vercel

Vercel's serverless functions don't natively support long-lived SSE connections. The `mcp-handler` package uses **Upstash Redis** as a message broker to work around this:

1. Client connects to `/mcp/sse`
2. Handler uses Redis pub/sub for message passing
3. Responses are chunked through Redis

**Required env var:** `REDIS_URL` (Upstash Redis URL)

---

## 🗄️ Database Schema

### Themes Table

```sql
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand_colors JSONB NOT NULL,
  tokens JSONB NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('light', 'dark', 'both')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

Row Level Security ensures users can only access their own themes.

---

## 📦 Export Formats

The export system (`web/src/lib/export/index.ts`) supports:

| Format | Output |
|--------|--------|
| `css` | CSS custom properties (`:root` and `.dark`) |
| `tailwind-v3` | `tailwind.config.js` theme extension |
| `tailwind-v4` | `@theme` block with CSS variable mappings |
| `json` | Raw JSON of token system |
| `scss` | SCSS variables with maps |

---

## 🎯 Design Decisions & Trade-offs

### Why combine MCP + Web UI in one app?

**Pros:**
- Single deployment to Vercel
- Shared token generation logic
- No CORS issues
- Simpler infrastructure

**Cons:**
- Heavier Next.js bundle includes MCP deps
- Can't scale MCP independently
- Cold starts affect MCP response time

### Why Supabase for auth?

- **Magic links** = no passwords, great for beginners
- Built-in Row Level Security
- Generous free tier
- PostgreSQL for future features (theme sharing, collections)

### Why Tailwind v4?

- Native CSS layers (`@layer`)
- OKLCH color functions built-in
- Smaller runtime
- Future-proof

---

## 🚧 Known Issues & Limitations

### Current Limitations

1. **Supabase required for full functionality** — App works without it but no auth/save
2. **Redis required for MCP SSE** — Without Upstash, only stdio mode works
3. **Cold starts on Vercel** — First MCP request after idle may be slow
4. **No theme sharing yet** — Themes are private to user

### Technical Debt

1. **Middleware deprecation warning** — Next.js 16 warns about middleware, suggests "proxy"
2. **Dual lockfiles** — Both `/` and `/web` have `package-lock.json`, causes warnings
3. **Legacy `/src` server** — Original standalone MCP server, now mostly superseded by `/web`

---

## 🔮 Future Improvements

### Discussed but not implemented:

#### 1. Split MCP Server from Web UI

**Problem:** MCP server is bundled with Next.js, adding latency and complexity.

**Solution:** Deploy MCP server separately:
- Option A: Cloudflare Workers (fast cold starts, global edge)
- Option B: Fly.io (persistent connections, no Redis needed)
- Option C: Railway/Render (simple Node.js hosting)

Keep web UI on Vercel, MCP on separate service.

#### 2. Theme Marketplace

Allow users to:
- Publish themes publicly
- Browse community themes
- Fork and customize others' themes
- One-click import to their account

#### 3. Figma Plugin

Export tokens directly to Figma variables:
- Sync brand colors from Figma
- Push generated tokens back as Figma variables
- Real-time preview in Figma

#### 4. VS Code Extension

- Generate tokens without leaving editor
- Preview color scales inline
- Auto-insert CSS/Tailwind config

#### 5. CLI Tool

```bash
npx tokens generate --primary "#3b82f6" --format tailwind-v4
```

#### 6. More Token Types

- Typography scales (fluid type)
- Spacing scales (consistent rhythm)
- Animation tokens (durations, easings)
- Shadow tokens (elevation system)

#### 7. Accessibility Checker

- Show WCAG contrast ratios for all combinations
- Suggest alternatives when contrast fails
- Simulate color blindness

---

## 🧪 Testing Strategy

### Current State

No formal tests yet. Recommended approach:

1. **Unit tests** for token generation (`lib/tokens/`)
2. **Integration tests** for MCP tools
3. **E2E tests** with Playwright for critical flows
4. **Visual regression** for color scale previews

### Key Test Cases

- Token generation produces valid OKLCH values
- All color scales have 10 steps
- Semantic tokens maintain contrast ratios
- Export formats are valid (parseable CSS, JSON, etc.)
- MCP tools return expected response structure

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm
- Supabase project (optional, for auth)
- Upstash Redis (optional, for MCP SSE)

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
REDIS_URL=your-upstash-redis-url
```

### Commands

```bash
cd web
npm install
npm run dev      # Start dev server on :3000
npm run build    # Production build
npm run lint     # ESLint
```

### MCP Testing

Connect Claude Desktop or VS Code Copilot to:
```json
{
  "tokens": {
    "url": "http://localhost:3000/mcp"
  }
}
```

---

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `web/src/lib/types.ts` | Core TypeScript interfaces |
| `web/src/lib/tokens/oklch.ts` | OKLCH color utilities |
| `web/src/lib/tokens/generate.ts` | Main token generation |
| `web/src/lib/export/index.ts` | Multi-format exporters |
| `web/src/app/mcp/[transport]/route.ts` | MCP API handler |
| `web/src/components/token-generator.tsx` | Main UI component |
| `web/src/lib/glossary.ts` | Jargon definitions for Term component |
| `web/src/lib/supabase/themes.ts` | Database queries |

---

## 💡 Coding Conventions

### TypeScript

- Strict mode enabled
- Prefer `interface` over `type` for objects
- Export types from `lib/types.ts`
- Use Zod for runtime validation (MCP tools)

### React

- Server components by default
- `"use client"` only when needed (interactivity, hooks)
- Colocate components with their pages when single-use

### Styling

- Tailwind utility classes
- CSS variables for tokens
- shadcn/ui for components
- Avoid inline styles

### File Naming

- `kebab-case` for files
- `PascalCase` for components
- `camelCase` for functions/variables

---

## 🤝 Contributing Context

When working on this codebase:

1. **Read `lib/types.ts` first** — Understand the data structures
2. **Token generation is in `lib/tokens/`** — OKLCH math lives here
3. **MCP tools are self-contained** — Each tool in the route handler is independent
4. **UI state is client-side** — Token generator uses React state, no server state
5. **Auth is optional** — App degrades gracefully without Supabase config

### Common Tasks

**Add a new MCP tool:**
1. Add to `web/src/app/mcp/[transport]/route.ts`
2. Define Zod schema for inputs
3. Implement handler function
4. Add to docs page

**Add a new export format:**
1. Add to `ExportFormat` type in `lib/export/index.ts`
2. Implement `toNewFormat()` function
3. Add case to `exportTokens()` switch
4. Update UI select options

**Add a glossary term:**
1. Add to `glossary` object in `lib/glossary.ts`
2. Use `<Term term="key">text</Term>` in content

---

## 📖 Session History

This project was built collaboratively across sessions covering:

1. **Initial MCP server** — Standalone Express + SSE server
2. **Debugging SSE issues** — Fixed event stream formatting, CORS
3. **Pivot to Next.js** — Combined web UI + MCP in single app
4. **Token system design** — OKLCH scales, semantic tokens
5. **UI implementation** — shadcn/ui, color pickers, export dialog
6. **Documentation** — Docs page with Term components
7. **Homepage redesign** — Figma-style aesthetic with grids, badges

---

*This document should be included in context for future LLM sessions working on this codebase.*
