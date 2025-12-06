import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import { SparkleIcon } from "lucide-react";
import { CopyButton } from "@/components/home/copy-button";

export default function MCPPage() {
  const mcpExamplePrompt =
    "Generate a complete design token system for my healthtech app with a deep blue primary color (#1e40af) and warm orange secondary (#f97316). Include all color scales, typography, spacing, and shadows. Export as Tailwind v4 CSS variables.";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">AI MCP Tool</h1>
        <p className="text-lg text-muted-foreground">
          Use this design token generator with AI assistants via the Model
          Context Protocol (MCP)
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <CommandLineIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <CardTitle>Try it with your AI assistant</CardTitle>
              <CardDescription>
                Generate complete design token systems with natural language
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Prompt Example */}
          <div className="space-y-4">
            <div className="rounded-md border bg-card overflow-hidden shadow-lg">
              {/* File header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <SparkleIcon className="h-4 w-4" />
                  <span className="font-mono text-xs">
                    Try something like...
                  </span>
                </div>
                <CopyButton text={mcpExamplePrompt} />
              </div>

              {/* Chat messages */}
              <div className="p-4 space-y-4">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl bg-neutral-100 px-4 py-2.5 text-foreground/70 text-sm">
                    <div className="leading-relaxed whitespace-pre-wrap">
                      {mcpExamplePrompt}
                    </div>
                  </div>
                </div>

                {/* AI thinking indicator */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary/60" />
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-muted/50">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                        style={{
                          animationDelay: "0ms",
                          animationDuration: "1.4s",
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                        style={{
                          animationDelay: "200ms",
                          animationDuration: "1.4s",
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                        style={{
                          animationDelay: "400ms",
                          animationDuration: "1.4s",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">What is MCP?</h3>
            <p className="text-muted-foreground">
              The Model Context Protocol (MCP) allows AI assistants like Claude,
              GitHub Copilot, and others to connect to external tools and
              services. This means you can ask your AI assistant to generate
              design tokens for you directly!
            </p>
          </div>

          {/* Installation Options */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <h4 className="font-medium mb-2">🌐 Hosted Server</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Use our hosted MCP server - no installation required. Always
                up-to-date.
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded block">
                https://tokens.flett.cc/mcp
              </code>
            </div>
            <div className="rounded-xl border p-4">
              <h4 className="font-medium mb-2">📦 NPM Package</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Install locally via npm for offline use and privacy.
              </p>
              <Button intent="default" asChild variant="outline" size="sm">
                <a
                  href="https://www.npmjs.com/package/@flett/design-tokens-mcp-server"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on NPM →
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Setup Instructions</h3>

            {/* Claude Desktop */}
            <div className="rounded-xl border p-4 space-y-3">
              <h4 className="font-medium">Claude Desktop</h4>
              <p className="text-xs text-muted-foreground">
                Add to ~/Library/Application
                Support/Claude/claude_desktop_config.json (macOS)
              </p>

              <div className="space-y-2">
                <p className="text-sm font-medium">Option 1: Hosted Server</p>
                <div className="rounded-lg bg-muted p-3">
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

              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Option 2: Local NPM Package
                </p>
                <p className="text-xs text-muted-foreground">
                  First:{" "}
                  <code className="bg-muted px-1 rounded">
                    npm install -g @flett/design-tokens-mcp-server
                  </code>
                </p>
                <div className="rounded-lg bg-muted p-3">
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
            </div>

            {/* VS Code */}
            <div className="rounded-xl border p-4 space-y-3">
              <h4 className="font-medium">VS Code + GitHub Copilot</h4>
              <p className="text-xs text-muted-foreground">
                Add to settings.json:
              </p>
              <div className="rounded-lg bg-muted p-3">
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

            {/* Cursor */}
            <div className="rounded-xl border p-4 space-y-3">
              <h4 className="font-medium">Cursor</h4>
              <p className="text-xs text-muted-foreground">
                Add to ~/.cursor/mcp.json:
              </p>
              <div className="rounded-lg bg-muted p-3">
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Example Prompts</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">
                  &quot;Generate a token system with blue as the primary
                  color&quot;
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">
                  &quot;Create dark mode tokens for a health tech app&quot;
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">
                  &quot;Make a warm color palette with orange and brown&quot;
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">
                  &quot;Export my tokens as Tailwind v4 CSS&quot;
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
