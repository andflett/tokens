import { Metadata } from "next";
import { Term } from "@/components/term";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageLayout } from "@/components/page-layout";
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
    <PageLayout showGrid>
      <div className="py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground">
            Learn how to use Tokens with your AI assistant
          </p>
        </div>

        <div className="space-y-12">
          {/* Getting Started */}
          <section id="getting-started">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <p className="text-muted-foreground mb-6">
              Tokens helps you create professional{" "}
              <Term term="design-tokens">design tokens</Term> from your brand
              colors. You can use it directly in your browser, or connect it to
              your <Term term="llm">AI assistant</Term> for a more
              conversational experience.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ComputerDesktopIcon className="h-5 w-5" />
                    Web Interface
                  </CardTitle>
                  <CardDescription>
                    Use the generator directly in your browser
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pick your colors, preview the generated tokens, and export
                    them in your preferred format.
                  </p>
                  <Button asChild>
                    <Link href="/generate">Open Generator</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CpuChipIcon className="h-5 w-5" />
                    MCP Connection
                  </CardTitle>
                  <CardDescription>
                    Connect to Claude, Copilot, or other AI tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add our <Term term="mcp">MCP server</Term> to your AI
                    assistant and describe the vibe you want.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="#mcp-setup">Setup Guide</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* What are Design Tokens */}
          <section id="design-tokens">
            <h2 className="text-2xl font-bold mb-4">What are Design Tokens?</h2>
            <p className="text-muted-foreground mb-4">
              <Term term="design-tokens">Design tokens</Term> are the smallest
              building blocks of your design system. Instead of using raw values
              like{" "}
              <code className="px-1 py-0.5 rounded bg-muted text-sm">
                #3b82f6
              </code>
              , you use named tokens like{" "}
              <code className="px-1 py-0.5 rounded bg-muted text-sm">
                primary-500
              </code>
              .
            </p>

            <div className="rounded-xl border p-6 bg-card mb-6">
              <h3 className="font-semibold mb-3">Why use tokens?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 mt-0.5 text-emerald-500" />
                  <span>
                    <strong>Consistency:</strong> Every component uses the same
                    colors
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 mt-0.5 text-emerald-500" />
                  <span>
                    <strong>Maintainability:</strong> Change one token, update
                    everywhere
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 mt-0.5 text-emerald-500" />
                  <span>
                    <strong>Theming:</strong> Easily switch between light and
                    dark modes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 mt-0.5 text-emerald-500" />
                  <span>
                    <strong>Communication:</strong> Designers and developers
                    speak the same language
                  </span>
                </li>
              </ul>
            </div>

            <h3 className="font-semibold mb-2">Token Types</h3>
            <p className="text-muted-foreground mb-4">
              Tokens generates several types of tokens:
            </p>

            <div className="space-y-3">
              <div className="rounded-xl border p-4">
                <h4 className="font-medium">Primitive Colors</h4>
                <p className="text-sm text-muted-foreground">
                  <Term term="color-scale">Color scales</Term> from 10
                  (lightest) to 100 (darkest) for each brand color. These are
                  the raw colors you&apos;ll reference.
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <h4 className="font-medium">Semantic Colors</h4>
                <p className="text-sm text-muted-foreground">
                  <Term term="semantic-colors">Semantic colors</Term> named by
                  purpose: primary, secondary, success, warning, danger. These
                  adapt to light/dark mode.
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <h4 className="font-medium">Supporting Tokens</h4>
                <p className="text-sm text-muted-foreground">
                  Spacing, typography, border radius, and shadows that
                  complement your colors.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* MCP Setup */}
          <section id="mcp-setup">
            <h2 className="text-2xl font-bold mb-4">MCP Setup</h2>
            <p className="text-muted-foreground mb-6">
              The <Term term="mcp">Model Context Protocol</Term> allows AI
              assistants to use external tools. There are two ways to use Tokens
              with MCP:
            </p>

            {/* Installation Options */}
            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🌐 Hosted Server</CardTitle>
                  <CardDescription>
                    Use our hosted MCP server - no installation required
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect directly to our server. Best for quick setup and
                    always up-to-date.
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded block">
                    https://tokens.flett.cc/mcp
                  </code>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📦 NPM Package</CardTitle>
                  <CardDescription>
                    Install locally via npm for offline use
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Run locally using stdio. Best for privacy and offline
                    access.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href="https://www.npmjs.com/package/tokens-mcp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on NPM →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Claude Desktop */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CommandLineIcon className="h-5 w-5" />
                    Claude Desktop
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Add to your <Term term="claude">Claude Desktop</Term> config
                    file:
                  </p>
                  <p className="text-xs text-muted-foreground">
                    macOS: ~/Library/Application
                    Support/Claude/claude_desktop_config.json
                  </p>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">
                      Option 1: Hosted Server (Recommended)
                    </p>
                    <div className="rounded-lg bg-muted p-4">
                      <pre className="text-sm font-mono overflow-x-auto">
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
                    <p className="text-sm font-medium">
                      Option 2: Local NPM Package
                    </p>
                    <p className="text-xs text-muted-foreground">
                      First install:{" "}
                      <code className="bg-muted px-1 rounded">
                        npm install -g tokens-mcp
                      </code>
                    </p>
                    <div className="rounded-lg bg-muted p-4">
                      <pre className="text-sm font-mono overflow-x-auto">
                        {`{
  "mcpServers": {
    "tokens": {
      "command": "tokens-mcp"
    }
  }
}`}
                      </pre>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Restart Claude Desktop and look for the hammer icon in the
                    bottom right.
                  </p>
                </CardContent>
              </Card>

              {/* VS Code + Copilot */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CodeBracketIcon className="h-5 w-5" />
                    VS Code + GitHub Copilot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Add this to your <Term term="vs-code">VS Code</Term>{" "}
                    settings.json:
                  </p>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Hosted Server</p>
                    <div className="rounded-lg bg-muted p-4">
                      <pre className="text-sm font-mono overflow-x-auto">
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

                  <p className="text-sm text-muted-foreground">
                    Then ask <Term term="copilot">Copilot</Term>: &quot;Generate
                    design tokens for a calm, professional brand with blue as
                    the primary color&quot;
                  </p>
                </CardContent>
              </Card>

              {/* Cursor */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BoltIcon className="h-5 w-5" />
                    Cursor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Add to ~/.cursor/mcp.json:
                  </p>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Hosted Server</p>
                    <div className="rounded-lg bg-muted p-4">
                      <pre className="text-sm font-mono overflow-x-auto">
                        {`{
  "tokens": {
    "url": "https://tokens.flett.cc/mcp"
  }
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Available Tools */}
          <section id="tools">
            <h2 className="text-2xl font-bold mb-4">Available Tools</h2>
            <p className="text-muted-foreground mb-6">
              These are the tools your AI assistant can use when connected to
              Tokens:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-lg">
                    generate_tokens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Generate a complete token system from brand colors.
                  </p>
                  <div className="rounded-lg bg-muted p-3">
                    <pre className="text-xs font-mono">
                      {`Parameters:
- brandColors: { primary, secondary, accent } (hex values)
- mode: "light" | "dark" | "both"`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-lg">
                    analyze_vibe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Describe a vibe and get suggested brand colors.
                  </p>
                  <div className="rounded-lg bg-muted p-3">
                    <pre className="text-xs font-mono">
                      {`Parameters:
- vibeDescription: "calm and professional" or "bold and energetic"`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-lg">
                    export_tokens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Export tokens in various formats.
                  </p>
                  <div className="rounded-lg bg-muted p-3">
                    <pre className="text-xs font-mono">
                      {`Parameters:
- tokenSystem: (from generate_tokens)
- format: "css" | "tailwind-v3" | "tailwind-v4" | "json" | "scss"
- mode: "light" | "dark" | "both"`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-lg">
                    generate_component
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Generate a prompt for creating a{" "}
                    <Term term="shadcn">shadcn/ui</Term> component using your
                    tokens.
                  </p>
                  <div className="rounded-lg bg-muted p-3">
                    <pre className="text-xs font-mono">
                      {`Parameters:
- componentType: "button" | "card" | etc.
- tokenSystem: (from generate_tokens)
- requirements: (optional) "should have hover animation"`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Color Algorithm */}
          <section id="color-algorithm">
            <h2 className="text-2xl font-bold mb-4">Color Algorithm</h2>
            <p className="text-muted-foreground mb-6">
              Learn how Tokens generates professional, perceptually balanced{" "}
              <Term term="color-scale">color scales</Term> using{" "}
              <Term term="oklch">OKLCH</Term> color space with different
              approaches for chromatic and achromatic colors.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Dual-Algorithm Approach</CardTitle>
                <CardDescription>
                  Chromatic colors get vibrant mid-tones, neutrals get excellent
                  readability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our algorithm uses OKLCH color space with parabolic chroma
                  curves and Bezold-Brücke hue shift compensation for chromatic
                  colors. Neutrals use a Tailwind-inspired distribution pattern
                  for better UI backgrounds and text contrast.
                </p>
                <Button asChild>
                  <Link href="/docs/color-algorithm">
                    Read Full Documentation →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Glossary */}
          <section id="glossary">
            <h2 className="text-2xl font-bold mb-4">Glossary</h2>
            <p className="text-muted-foreground mb-6">
              Hover over or tap any underlined term to see its definition. Here
              are some key terms:
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border p-4">
                <Term term="mcp" />
              </div>
              <div className="rounded-xl border p-4">
                <Term term="design-tokens" />
              </div>
              <div className="rounded-xl border p-4">
                <Term term="oklch" />
              </div>
              <div className="rounded-xl border p-4">
                <Term term="tailwind" />
              </div>
              <div className="rounded-xl border p-4">
                <Term term="css-variables" />
              </div>
              <div className="rounded-xl border p-4">
                <Term term="semantic-colors" />
              </div>
              <div className="rounded-xl border p-4">
                <Term term="shadcn" />
              </div>
              <div className="rounded-xl border p-4">
                <Term term="vibe-coding" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
