import { Metadata } from "next";
import { Term } from "@/components/term";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ComputerDesktopIcon,
  CpuChipIcon,
  CheckIcon,
  CommandLineIcon,
  CodeBracketIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to use Tokens with your AI assistant",
};

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      {/* Header */}
      <section className="max-w-3xl mx-auto text-center pb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-medium leading-tight tracking-tight mb-4">
          Documentation
        </h1>
        <p className="text-lg text-foreground/85 leading-relaxed">
          Learn how to use Tokens with your AI assistant
        </p>
      </section>

      <div className="max-w-3xl mx-auto space-y-16">
        {/* Getting Started */}
        <section id="getting-started">
          <h2 className="text-3xl font-serif font-medium mb-6">
            Getting Started
          </h2>
          <p className="text-md text-foreground/85 leading-relaxed mb-8">
            Tokens helps you create professional{" "}
            <Term term="design-tokens">design tokens</Term> from your brand
            colors. You can use it directly in your browser, or connect it to
            your <Term term="llm">AI assistant</Term> for a more conversational
            experience.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <ComputerDesktopIcon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-medium">Web Interface</h3>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Pick your colors, preview the generated tokens, and export them
                in your preferred format.
              </p>
              <Button intent="default" asChild>
                <Link href="/generate">Open Generator</Link>
              </Button>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <CpuChipIcon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-medium">MCP Connection</h3>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Add our <Term term="mcp">MCP server</Term> to your AI assistant
                and describe the vibe you want.
              </p>
              <Button intent="default" variant="outline" asChild>
                <Link href="/mcp">Setup Guide</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What are Design Tokens */}
        <section id="design-tokens">
          <h2 className="text-3xl font-serif font-medium mb-6">
            What are Design Tokens?
          </h2>
          <p className="text-md text-foreground/85 leading-relaxed mb-6">
            <Term term="design-tokens">Design tokens</Term> are the smallest
            building blocks of your design system. Instead of using raw values
            like{" "}
            <code className="px-2 py-0.5 rounded bg-muted text-sm">
              #3b82f6
            </code>
            , you use named tokens like{" "}
            <code className="px-2 py-0.5 rounded bg-muted text-sm">
              primary-500
            </code>
            .
          </p>

          <div className="rounded-xl border bg-card p-6 mb-8">
            <h3 className="text-lg font-medium mb-4">Why use tokens?</h3>
            <ul className="space-y-3 text-sm text-foreground/85">
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 mt-0.5 text-success shrink-0" />
                <span className="leading-relaxed">
                  <strong className="font-medium">Consistency:</strong> Every
                  component uses the same colors
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 mt-0.5 text-success shrink-0" />
                <span className="leading-relaxed">
                  <strong className="font-medium">Maintainability:</strong>{" "}
                  Change one token, update everywhere
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 mt-0.5 text-success shrink-0" />
                <span className="leading-relaxed">
                  <strong className="font-medium">Theming:</strong> Easily
                  switch between light and dark modes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 mt-0.5 text-success shrink-0" />
                <span className="leading-relaxed">
                  <strong className="font-medium">Communication:</strong>{" "}
                  Designers and developers speak the same language
                </span>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-medium mb-4">Token Types</h3>

          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-5">
              <h4 className="font-medium mb-2">Primitive Colors</h4>
              <p className="text-sm text-foreground/75 leading-relaxed">
                <Term term="color-scale">Color scales</Term> from 10 (lightest)
                to 100 (darkest) for each brand color. These are the raw colors
                you&apos;ll reference.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h4 className="font-medium mb-2">Semantic Colors</h4>
              <p className="text-sm text-foreground/75 leading-relaxed">
                <Term term="semantic-colors">Semantic colors</Term> named by
                purpose: primary, secondary, success, warning, danger. These
                adapt to light/dark mode.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h4 className="font-medium mb-2">Supporting Tokens</h4>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Spacing, typography, border radius, and shadows that complement
                your colors.
              </p>
            </div>
          </div>
        </section>

        {/* MCP Setup */}
        <section id="mcp-setup">
          <h2 className="text-3xl font-serif font-medium mb-6">MCP Setup</h2>
          <p className="text-md text-foreground/85 leading-relaxed mb-8">
            The <Term term="mcp">Model Context Protocol</Term> allows AI
            assistants to use external tools. There are two ways to use Tokens
            with MCP:
          </p>

          {/* Installation Options */}
          <div className="grid gap-6 sm:grid-cols-2 mb-8">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="text-2xl">🌐</div>
              <div>
                <h3 className="text-lg font-medium mb-2">Hosted Server</h3>
                <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                  Connect directly to our server. Best for quick setup and
                  always up-to-date.
                </p>
                <code className="text-xs bg-muted px-3 py-1.5 rounded block font-mono">
                  https://tokens.flett.cc/mcp
                </code>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="text-2xl">📦</div>
              <div>
                <h3 className="text-lg font-medium mb-2">NPM Package</h3>
                <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                  Run locally using stdio. Best for privacy and offline access.
                </p>
                <Button intent="default" asChild variant="outline" size="sm">
                  <Link
                    href="https://www.npmjs.com/package/@flett/design-tokens-mcp-server"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on NPM →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Claude Desktop */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <CommandLineIcon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-xl font-medium">Claude Desktop</h3>
              </div>
              <p className="text-sm text-foreground/75">
                Add to your <Term term="claude">Claude Desktop</Term> config
                file:
              </p>
              <p className="text-xs text-foreground/60">
                macOS: ~/Library/Application
                Support/Claude/claude_desktop_config.json
              </p>

              <div className="space-y-3">
                <p className="text-sm font-medium">
                  Option 1: Hosted Server (Recommended)
                </p>
                <div className="rounded-lg bg-muted p-4">
                  <pre className="text-xs font-mono overflow-x-auto">
                    {`{
  "mcpServers": {
    "tokens": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://tokens.flett.cc/mcp"]
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Option 2: Local NPM Package</p>
                <p className="text-xs text-foreground/75">
                  First install:{" "}
                  <code className="bg-muted px-2 py-0.5 rounded">
                    npm install -g @flett/design-tokens-mcp-server
                  </code>
                </p>
                <div className="rounded-lg bg-muted p-4">
                  <pre className="text-xs font-mono overflow-x-auto">
                    {`{
  "mcpServers": {
    "tokens": {
      "command": "toke-mcp"
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <p className="text-sm text-foreground/75">
                Restart Claude Desktop and look for the hammer icon in the
                bottom right.
              </p>
            </div>

            {/* VS Code + Copilot */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <CodeBracketIcon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-xl font-medium">VS Code + GitHub Copilot</h3>
              </div>
              <p className="text-sm text-foreground/75">
                Add this to your <Term term="vs-code">VS Code</Term>{" "}
                settings.json:
              </p>

              <div className="space-y-3">
                <p className="text-sm font-medium">Hosted Server</p>
                <div className="rounded-lg bg-muted p-4">
                  <pre className="text-xs font-mono overflow-x-auto">
                    {`{
  "github.copilot.chat.mcp": {
    "servers": {
      "tokens": {
        "url": "https://tokens.flett.cc/mcp"
      }
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <p className="text-sm text-foreground/75">
                Then ask <Term term="copilot">Copilot</Term>: &quot;Generate
                design tokens for a calm, professional brand with blue as the
                primary color&quot;
              </p>
            </div>

            {/* Cursor */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <BoltIcon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-xl font-medium">Cursor</h3>
              </div>
              <p className="text-sm text-foreground/75">
                Add to ~/.cursor/mcp.json:
              </p>

              <div className="space-y-3">
                <p className="text-sm font-medium">Hosted Server</p>
                <div className="rounded-lg bg-muted p-4">
                  <pre className="text-xs font-mono overflow-x-auto">
                    {`{
  "tokens": {
    "url": "https://tokens.flett.cc/mcp"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Available Tools */}
        <section id="tools">
          <h2 className="text-3xl font-serif font-medium mb-6">
            Available Tools
          </h2>
          <p className="text-md text-foreground/85 leading-relaxed mb-8">
            These are the tools your AI assistant can use when connected to
            Tokens:
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-6 space-y-3">
              <h3 className="font-mono text-lg font-medium">generate_tokens</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Generate a complete token system from brand colors.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <pre className="text-xs font-mono">
                  {`Parameters:
- brandColors: { primary, secondary, accent } (hex values)
- mode: "light" | "dark" | "both"`}
                </pre>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-3">
              <h3 className="font-mono text-lg font-medium">analyze_vibe</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Describe a vibe and get suggested brand colors.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <pre className="text-xs font-mono">
                  {`Parameters:
- vibeDescription: "calm and professional" or "bold and energetic"`}
                </pre>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-3">
              <h3 className="font-mono text-lg font-medium">export_tokens</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Export tokens in various formats.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <pre className="text-xs font-mono">
                  {`Parameters:
- tokenSystem: (from generate_tokens)
- format: "css" | "tailwind-v3" | "tailwind-v4" | "json" | "scss"
- mode: "light" | "dark" | "both"`}
                </pre>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 space-y-3">
              <h3 className="font-mono text-lg font-medium">
                generate_component
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Generate a prompt for creating a{" "}
                <Term term="shadcn">shadcn/ui</Term> component using your
                tokens.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <pre className="text-xs font-mono">
                  {`Parameters:
- componentType: "button" | "card" | etc.
- tokenSystem: (from generate_tokens)
- requirements: (optional) "should have hover animation"`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Color Algorithm */}
        <section id="color-algorithm">
          <h2 className="text-3xl font-serif font-medium mb-6">
            Color Algorithm
          </h2>
          <p className="text-md text-foreground/85 leading-relaxed mb-8">
            Learn how Tokens generates professional, perceptually balanced{" "}
            <Term term="color-scale">color scales</Term> using{" "}
            <Term term="oklch">OKLCH</Term> color space with different
            approaches for chromatic and achromatic colors.
          </p>

          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">
                Dual-Algorithm Approach
              </h3>
              <p className="text-sm text-foreground/60">
                Chromatic colors get vibrant mid-tones, neutrals get excellent
                readability
              </p>
            </div>
            <p className="text-sm text-foreground/75 leading-relaxed">
              Our algorithm uses OKLCH color space with parabolic chroma curves
              and Bezold-Brücke hue shift compensation for chromatic colors.
              Neutrals use a Tailwind-inspired distribution pattern spaces
              better UI backgrounds and text contrast.
            </p>
            <Button intent="default" asChild>
              <Link href="/docs/color-algorithm">
                Read Full Documentation →
              </Link>
            </Button>
          </div>
        </section>

        {/* Glossary */}
        <section id="glossary">
          <h2 className="text-3xl font-serif font-medium mb-6">Glossary</h2>
          <p className="text-md text-foreground/85 leading-relaxed mb-8">
            Hover over or tap any underlined term to see its definition. Here
            are some key terms:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-4">
              <Term term="mcp" />
            </div>
            <div className="rounded-xl border bg-card p-4">
              <Term term="design-tokens" />
            </div>
            <div className="rounded-xl border bg-card p-4">
              <Term term="oklch" />
            </div>
            <div className="rounded-xl border bg-card p-4">
              <Term term="tailwind" />
            </div>
            <div className="rounded-xl border bg-card p-4">
              <Term term="css-variables" />
            </div>
            <div className="rounded-xl border bg-card p-4">
              <Term term="semantic-colors" />
            </div>
            <div className="rounded-xl border bg-card p-4">
              <Term term="shadcn" />
            </div>
            <div className="rounded-xl border bg-card p-4">
              <Term term="vibe-coding" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
