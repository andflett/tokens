import { Button } from "@/components/ui/button";
import { SparkleIcon } from "lucide-react";
import { CopyButton } from "@/components/home/copy-button";

export default function MCPPage() {
  const mcpExamplePrompt =
    "Generate a complete design token system for my healthtech app with a deep blue primary color (#1e40af) and warm orange secondary (#f97316). Include all color scales, typography, spacing, and shadows. Export as Tailwind v4 CSS variables.";

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center pb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-medium leading-tight tracking-tight mb-4">
          Token MCP Server
        </h1>
        <p className="text-lg text-foreground/85 leading-relaxed">
          Generate complete design token systems with natural language through
          your AI assistant
        </p>
      </section>

      {/* Example Section */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-serif font-medium mb-3">
            Try it with your AI assistant
          </h2>
          <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
            {/* File header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <SparkleIcon className="h-4 w-4" />
                <span className="font-mono text-xs">Try something like...</span>
              </div>
              <CopyButton text={mcpExamplePrompt} />
            </div>

            {/* Chat messages */}
            <div className="p-6 space-y-4">
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
      </section>

      {/* What is MCP */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-medium mb-4">
            What is MCP?
          </h2>
          <p className="text-md text-foreground/85 leading-relaxed">
            The Model Context Protocol (MCP) allows AI assistants like Claude,
            GitHub Copilot, and others to connect to external tools and
            services. This means you can ask your AI assistant to generate
            design tokens for you directly!
          </p>
        </div>
      </section>

      {/* Installation Options */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif font-medium">Installation</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-6">
              <div className="text-2xl mb-2">🌐</div>
              <h3 className="text-lg font-medium mb-2">Hosted Server</h3>
              <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                Use our hosted MCP server - no installation required. Always
                up-to-date.
              </p>
              <code className="text-xs bg-muted px-3 py-1.5 rounded block font-mono">
                https://tokens.flett.cc/mcp
              </code>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <div className="text-2xl mb-2">📦</div>
              <h3 className="text-lg font-medium mb-2">NPM Package</h3>
              <p className="text-sm text-foreground/75 leading-relaxed mb-4">
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
        </div>
      </section>

      {/* Setup Instructions */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif font-medium">Setup</h2>

          {/* Claude Desktop */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h3 className="text-xl font-medium">Claude Desktop</h3>
            <p className="text-sm text-foreground/75">
              Add to ~/Library/Application
              Support/Claude/claude_desktop_config.json (macOS)
            </p>

            <div className="space-y-3">
              <p className="text-sm font-medium">Option 1: Hosted Server</p>
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
                First:{" "}
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
          </div>

          {/* VS Code */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h3 className="text-xl font-medium">VS Code + GitHub Copilot</h3>
            <p className="text-sm text-foreground/75">Add to settings.json:</p>
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

          {/* Cursor */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h3 className="text-xl font-medium">Cursor</h3>
            <p className="text-sm text-foreground/75">
              Add to ~/.cursor/mcp.json:
            </p>
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
      </section>

      {/* Example Prompts */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif font-medium">Example Prompts</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm leading-relaxed">
                &quot;Generate a token system with blue as the primary
                color&quot;
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm leading-relaxed">
                &quot;Create dark mode tokens for a health tech app&quot;
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm leading-relaxed">
                &quot;Make a warm color palette with orange and brown&quot;
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm leading-relaxed">
                &quot;Export my tokens as Tailwind v4 CSS&quot;
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
