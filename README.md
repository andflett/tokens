# Tokens

A design token generator with web UI and MCP server, built for designers learning to code with AI.

## Features

- 🎨 **OKLCH Color Generation** — Perceptually uniform color scales that look balanced
- ♿ **Accessible by Default** — Every color combination meets WCAG contrast requirements
- 🤖 **MCP Ready** — Use directly from Claude, Copilot, or other AI assistants
- 📦 **Multiple Exports** — CSS, Tailwind v3/v4, JSON, SCSS
- 🌗 **Light & Dark** — Generate both modes from the same brand colors
- 📚 **Beginner Friendly** — Jargon popovers explain every technical term

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase project (for auth/database)
- Upstash Redis (for MCP SSE support)

### Environment Variables

Copy `.env.template` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
REDIS_URL=your-upstash-redis-url
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## MCP Integration

The MCP server is available at `/mcp`. Connect with:

```json
{
  "tokens": {
    "url": "http://localhost:3000/mcp"
  }
}
```

### Available Tools

| Tool | Description |
|------|-------------|
| `generate_tokens` | Generate design tokens from brand colors (OKLCH) |
| `generate_tokens_ai` | Generate AI prompt for creative token creation |
| `analyze_vibe` | Analyze a vibe description and suggest colors |
| `export_tokens` | Export tokens to CSS, Tailwind, JSON, or SCSS |
| `generate_component` | Generate AI prompt for shadcn/ui components |

## Database Setup

Run the migration in your Supabase SQL editor:

```sql
-- See supabase/migrations/001_create_themes_table.sql
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui + Radix
- **Auth/DB:** Supabase
- **MCP:** Vercel mcp-handler + Upstash Redis
- **Colors:** culori (OKLCH)

## License

MIT
