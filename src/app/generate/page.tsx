import { Metadata } from "next";
import { TokenGenerator } from "@/components/token-generator";
import { Term } from "@/components/term";
import { PageLayout } from "@/components/page-layout";
import { LightBulbIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Generate Tokens",
  description: "Create a complete design token system from your brand colors",
};

export default function GeneratorPage() {
  return (
    <PageLayout showGrid>
      <div className="py-10">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Token Generator</h1>
          <p className="text-muted-foreground">
            Create beautiful, accessible <Term term="design-tokens">design tokens</Term> from
            your brand colors using the <Term term="oklch">OKLCH color space</Term>.
          </p>
        </div>

        <TokenGenerator />

        <div className="mt-12 rounded-xl border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <LightBulbIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-semibold mb-2">Tip: Use with AI Assistants</h2>
              <p className="text-sm text-muted-foreground mb-4">
                This generator is also available as an <Term term="mcp">MCP server</Term>,
                which means you can use it directly from{" "}
                <Term term="claude">Claude</Term>, <Term term="copilot">GitHub Copilot</Term>,
                or other AI assistants. Just configure the MCP URL and you can ask the AI
                to generate tokens for you!
              </p>
              <div className="rounded-lg bg-muted p-3">
                <code className="text-xs font-mono">
                  {`{ "vibe-themes": { "url": "https://vibethemes.flett.cc/mcp" } }`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
