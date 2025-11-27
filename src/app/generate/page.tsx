import { Metadata } from "next";
import { TokenGenerator } from "@/components/token-generator";
import { Term } from "@/components/term";
import { PageLayout } from "@/components/page-layout";

export const metadata: Metadata = {
  title: "Generate Tokens",
  description: "Create a complete, professional design token system for your web applications",
};

export default function GeneratorPage() {
  return (
    <PageLayout showGrid>
      <div className="py-10">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Token Generator</h1>
          <p className="text-muted-foreground">
            Create a complete, professional <Term term="design-tokens">design token system</Term> for
            your web applications. Generate colors, typography, spacing, shadows, borders, and
            responsive layout tokens all in one place.
          </p>
        </div>

        <TokenGenerator />
      </div>
    </PageLayout>
  );
}
