import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Term } from "@/components/term";
import { PageLayout } from "@/components/page-layout";
import Link from "next/link";
import {
  SwatchIcon,
  CheckBadgeIcon,
  CpuChipIcon,
  ArrowDownTrayIcon,
  SunIcon,
  BookOpenIcon,
  ArrowRightIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

// Token visualization showing different token types
function TokenShowcase() {
  return (
    <div className="mx-auto mt-12 max-w-2xl">
      <div className="relative rounded-xl border bg-card/50 p-6 backdrop-blur-sm">
        {/* Token categories */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Color tokens */}
          <div className="space-y-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Color
            </div>
            <div className="flex gap-1.5">
              {["#6366f1", "#8b5cf6", "#ec4899", "#22c55e", "#f59e0b"].map((color, i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded-md ring-1 ring-foreground/5"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              --color-primary-50...900
            </div>
          </div>

          {/* Spacing tokens */}
          <div className="space-y-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Spacing
            </div>
            <div className="flex items-end gap-1">
              {[4, 8, 12, 16, 24, 32].map((size, i) => (
                <div
                  key={i}
                  className="bg-foreground/10 rounded-sm"
                  style={{ width: 6, height: size }}
                />
              ))}
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              --space-1...12
            </div>
          </div>

          {/* Typography tokens */}
          <div className="space-y-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Typography
            </div>
            <div className="space-y-0.5">
              <div className="text-lg font-semibold leading-tight">Heading</div>
              <div className="text-sm text-muted-foreground">Body text</div>
              <div className="font-mono text-xs text-muted-foreground/70">mono</div>
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              --font-size-sm...2xl
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-dashed" />

        {/* Additional token types */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Border radius */}
          <div className="space-y-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Radius
            </div>
            <div className="flex items-center gap-2">
              {[0, 4, 8, 12, 9999].map((radius, i) => (
                <div
                  key={i}
                  className="h-6 w-6 border-2 border-foreground/20"
                  style={{ borderRadius: radius }}
                />
              ))}
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              --radius-none...full
            </div>
          </div>

          {/* Shadow tokens */}
          <div className="space-y-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Shadow
            </div>
            <div className="flex items-center gap-2">
              {[
                "0 1px 2px rgba(0,0,0,0.05)",
                "0 2px 4px rgba(0,0,0,0.1)",
                "0 4px 8px rgba(0,0,0,0.1)",
              ].map((shadow, i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded-md bg-background"
                  style={{ boxShadow: shadow }}
                />
              ))}
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              --shadow-sm...lg
            </div>
          </div>

          {/* Border tokens */}
          <div className="space-y-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Border
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 4].map((width, i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded-md"
                  style={{ border: `${width}px solid var(--foreground)`, opacity: 0.2 + i * 0.2 }}
                />
              ))}
              <div className="h-6 w-6 rounded-md border-2 border-dashed border-foreground/30" />
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              --border-width-1...4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature card
function FeatureCard({
  icon: Icon,
  title,
  description,
  tags,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <div className="group rounded-xl border bg-card p-5 transition-colors hover:border-foreground/20">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>

      <h3 className="mb-1.5 font-semibold tracking-tight">{title}</h3>
      <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-[10px] font-normal">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <PageLayout showGrid>
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">MCP support for AI assistants</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Design tokens for vibe coders
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
            Generate beautiful, accessible{" "}
            <Term term="design-tokens">design tokens</Term> from your brand colors.
            Perfect for designers learning to code with{" "}
            <Term term="llm">AI assistants</Term>.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/generate">
                <BoltIcon className="h-4 w-4" />
                Start Generating
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">Read the Docs</Link>
            </Button>
          </div>
        </div>

        {/* Token showcase */}
        <TokenShowcase />
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Everything you need for consistent design systems
          </h2>
          <p className="mt-3 text-muted-foreground">
            From color science to accessibility, we handle the complexity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={SwatchIcon}
            title="OKLCH Color Science"
            description="Generate perceptually uniform color scales where each step looks equally different to the human eye."
            tags={["oklch", "perceptual", "uniform"]}
          />

          <FeatureCard
            icon={CheckBadgeIcon}
            title="Accessible by Default"
            description="Every color combination meets WCAG contrast requirements. We handle the math so you don't have to."
            tags={["WCAG AA", "contrast", "a11y"]}
          />

          <FeatureCard
            icon={CpuChipIcon}
            title="MCP Ready"
            description="Connect via Model Context Protocol and let your AI assistant generate tokens while you describe the vibe."
            tags={["claude", "copilot", "cursor"]}
          />

          <FeatureCard
            icon={ArrowDownTrayIcon}
            title="Multiple Exports"
            description="Export to CSS custom properties, Tailwind v3 config, Tailwind v4, JSON, or SCSS variables."
            tags={["CSS", "tailwind", "SCSS"]}
          />

          <FeatureCard
            icon={SunIcon}
            title="Light & Dark Modes"
            description="Generate semantic tokens that adapt beautifully between light and dark modes from the same brand colors."
            tags={["theming", "dark mode", "semantic"]}
          />

          <FeatureCard
            icon={BookOpenIcon}
            title="Beginner Friendly"
            description="Every technical term has a tooltip explanation. No prior coding knowledge required to get started."
            tags={["tooltips", "education", "jargon-free"]}
          />
        </div>
      </section>

      {/* How it works */}
      <section className="border-t py-16 lg:py-20">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Three colors. Infinite possibilities.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Pick your colors",
              description:
                "Choose your primary, secondary, and accent brand colors using our color picker.",
            },
            {
              step: "02",
              title: "Generate tokens",
              description:
                "We create complete color scales, semantic tokens, and supporting variables automatically.",
            },
            {
              step: "03",
              title: "Export & use",
              description:
                "Copy to clipboard or download in your preferred format. Drop into your project and go.",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-xl border bg-card p-5">
              <div className="mb-3 font-mono text-3xl font-bold text-muted-foreground/20">
                {item.step}
              </div>
              <h3 className="mb-1.5 font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-16 lg:py-20">
        <div className="mx-auto max-w-xl text-center">
          <Badge variant="secondary" className="mb-4">
            Free & Open Source
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to create your vibe?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Pick three colors and let us handle the color science, accessibility,
            and code generation.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/generate">
                Get Started Free
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href="https://github.com/andflett/design-tokens-mcp"
                target="_blank"
                rel="noopener"
              >
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-foreground text-[10px] font-bold text-background">
              V
            </div>
            <span className="text-sm text-muted-foreground">
              © 2025 Vibe Themes. Open source under MIT.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="/generate"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Generator
            </Link>
            <Link
              href="https://github.com/andflett/design-tokens-mcp"
              className="text-sm text-muted-foreground hover:text-foreground"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </PageLayout>
  );
}
