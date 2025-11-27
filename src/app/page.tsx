import { Button } from "@/components/ui/button";
import { Term } from "@/components/term";
import { PageLayout } from "@/components/page-layout";
import Link from "next/link";
import { ArrowDownIcon, BoltIcon } from "@heroicons/react/24/outline";

// Token visualization showing different token types
function TokenShowcase() {
  return (
    <div className="mx-auto mt-12 max-w-2xl">
      <div className="relative rounded border bg-card/50 p-6 backdrop-blur-sm shadow-lg">
        {/* Token categories */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Color tokens */}
          <div className="space-y-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Color
            </div>
            <div className="flex gap-1.5">
              {["#6366f1", "#8b5cf6", "#ec4899", "#22c55e", "#f59e0b"].map(
                (color, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-md ring-1 ring-foreground/5"
                    style={{ backgroundColor: color }}
                  />
                )
              )}
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
              <div className="font-mono text-xs text-muted-foreground/70">
                mono
              </div>
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
                  style={{
                    border: `${width}px solid var(--foreground)`,
                    opacity: 0.2 + i * 0.2,
                  }}
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

// Token type section with visual example and AI prompts
function TokenSection({
  id,
  title,
  description,
  visual,
  prompts,
}: {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  prompts: string[];
}) {
  return (
    <section id={id} className="py-16 lg:py-20 border-t">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {description}
          </p>

          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Try prompting your AI with:
            </p>
            {prompts.map((prompt, i) => (
              <div
                key={i}
                className="rounded-lg bg-muted/50 border px-4 py-3 text-sm font-mono"
              >
                &ldquo;{prompt}&rdquo;
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card/50 p-6 backdrop-blur-sm">
          {visual}
        </div>
      </div>
    </section>
  );
}

// Visual demos for each token type
function ColorVisual() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Primary Scale
        </div>
        <div className="flex gap-1">
          {[
            "#eff6ff",
            "#dbeafe",
            "#bfdbfe",
            "#93c5fd",
            "#60a5fa",
            "#3b82f6",
            "#2563eb",
            "#1d4ed8",
            "#1e40af",
            "#1e3a8a",
          ].map((color, i) => (
            <div
              key={i}
              className="h-10 flex-1 first:rounded-l-md last:rounded-r-md"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>50</span>
          <span>500</span>
          <span>950</span>
        </div>
      </div>
      <div className="pt-2 border-t border-dashed">
        <div className="text-xs text-muted-foreground mb-2">
          Used for buttons, links, and focus states
        </div>
        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
          bg-primary text-primary-foreground
        </code>
      </div>
    </div>
  );
}

function TypographyVisual() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="text-4xl font-bold tracking-tight">Display</div>
        <div className="text-2xl font-semibold">Heading</div>
        <div className="text-base">Body text that&apos;s easy to read</div>
        <div className="text-sm text-muted-foreground">
          Small text for captions
        </div>
        <div className="font-mono text-sm bg-muted px-2 py-1 rounded inline-block">
          Monospace for code
        </div>
      </div>
      <div className="pt-4 border-t border-dashed">
        <div className="text-xs text-muted-foreground mb-2">
          Font sizes from xs to 4xl
        </div>
        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
          text-sm font-medium tracking-tight
        </code>
      </div>
    </div>
  );
}

function SpacingVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        {[1, 2, 3, 4, 6, 8, 12, 16].map((space) => (
          <div key={space} className="flex flex-col items-center gap-1">
            <div
              className="bg-primary/20 border border-primary/30 rounded"
              style={{ width: space * 4, height: space * 4 }}
            />
            <span className="text-[10px] font-mono text-muted-foreground">
              {space}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-dashed">
        <div className="text-xs text-muted-foreground mb-2">
          Consistent spacing creates rhythm
        </div>
        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
          p-4 gap-6 space-y-8
        </code>
      </div>
    </div>
  );
}

function RadiusVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {[
          { radius: 0, label: "none" },
          { radius: 4, label: "sm" },
          { radius: 8, label: "md" },
          { radius: 12, label: "lg" },
          { radius: 9999, label: "full" },
        ].map(({ radius, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div
              className="h-12 w-12 bg-primary/20 border-2 border-primary/40"
              style={{ borderRadius: radius }}
            />
            <span className="text-[10px] font-mono text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-dashed">
        <div className="text-xs text-muted-foreground mb-2">
          Sharp vs soft defines your brand personality
        </div>
        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
          rounded-lg rounded-full
        </code>
      </div>
    </div>
  );
}

function ShadowVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 py-4">
        {[
          { shadow: "none", label: "none" },
          { shadow: "0 1px 2px rgba(0,0,0,0.05)", label: "sm" },
          { shadow: "0 4px 6px rgba(0,0,0,0.1)", label: "md" },
          { shadow: "0 10px 15px rgba(0,0,0,0.15)", label: "lg" },
          { shadow: "0 20px 25px rgba(0,0,0,0.2)", label: "xl" },
        ].map(({ shadow, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div
              className="h-12 w-12 bg-background rounded-lg"
              style={{ boxShadow: shadow }}
            />
            <span className="text-[10px] font-mono text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-dashed">
        <div className="text-xs text-muted-foreground mb-2">
          Shadows create depth and hierarchy
        </div>
        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
          shadow-sm shadow-lg
        </code>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <PageLayout showGrid>
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
            Why does my AI generated app look like
            <span
              className="design-select inline-block pl-3 pr-2 py-0 mx-1 text-purple-700"
              tabIndex={0}
            >
              <span aria-hidden className="handle tl" />
              <span aria-hidden className="handle tr" />
              <span aria-hidden className="handle bl" />
              <span aria-hidden className="handle br" />
              turd?
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Remember that time you handed designs over to an engineer and got
            back... something that technically matched the specs but felt
            totally off? Same energy. You and your AI aren&apos;t speaking the
            same language yet.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            We&apos;re here to help you learn the lingo—or just give you the
            shortcuts to generate professional{" "}
            <Term term="design-tokens">design tokens</Term> that&apos;ll make
            your AI-generated code actually look good.
          </p>
          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/generate">
                <BoltIcon className="h-4 w-4" />
                Generate Tokens
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <a href="#what-are-tokens">
                Learn More
                <ArrowDownIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <TokenShowcase />
        </div>
      </section>

      {/* What are tokens */}
      <section id="what-are-tokens" className="py-16 lg:py-20 border-t">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
            So... what are design tokens anyway?
          </h2>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Design tokens are basically named values—like calling a specific
              blue &ldquo;primary&rdquo; instead of remembering{" "}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                #3b82f6
              </code>{" "}
              every time. They&apos;re the building blocks that keep your
              colors, spacing, typography, and other design decisions consistent
              across your entire app.
            </p>

            <p>
              Here&apos;s the thing: when you vibe code with AI, it&apos;s
              probably using <Term term="tailwind">Tailwind CSS</Term> with{" "}
              <Term term="shadcn">shadcn/ui</Term> and{" "}
              <Term term="radix">Radix</Term> components. These are great! But
              they come with default design tokens that make every app look...
              the same. That generic, &ldquo;I definitely used a starter
              template&rdquo; vibe.
            </p>

            <p className="text-foreground font-medium">
              The fix? Give your AI better tokens to work with. Once you
              understand how they work (or just generate good ones), you can
              tell your AI exactly what you want—and it&apos;ll actually
              understand.
            </p>
          </div>
        </div>
      </section>

      {/* Token type sections */}
      <TokenSection
        id="colors"
        title="Color Tokens"
        description="Colors are organized into scales (50-950) that go from light to dark. Each scale has 10-11 shades, and semantic tokens like 'primary' or 'destructive' point to specific shades. This is why telling AI 'make the button blue' gives you different blues everywhere—it doesn't know which blue you mean."
        visual={<ColorVisual />}
        prompts={[
          "Change the primary color to use the blue-600 shade from Tailwind",
          "Make the destructive/error color less aggressive, use red-500 instead of red-600",
          "Update the muted-foreground to slate-500 for better contrast",
        ]}
      />

      <TokenSection
        id="typography"
        title="Typography Tokens"
        description="Font sizes, weights, line heights, and letter spacing are all tokens. Most frameworks use a scale from 'xs' to '4xl' or similar. When your AI generates inconsistent text sizes, it's because it's picking random values instead of using the system."
        visual={<TypographyVisual />}
        prompts={[
          "Use text-sm with font-medium for all button labels",
          "Set headings to use tracking-tight for that modern feel",
          "Make body text text-base with leading-relaxed for better readability",
        ]}
      />

      <TokenSection
        id="spacing"
        title="Spacing Tokens"
        description="Spacing in Tailwind uses a scale where 1 = 4px. So p-4 is 16px of padding. Consistent spacing creates visual rhythm—when elements have random gaps, your design feels off even if you can't explain why."
        visual={<SpacingVisual />}
        prompts={[
          "Use consistent gap-4 between form fields",
          "Set card padding to p-6 throughout the app",
          "Use space-y-8 between major page sections",
        ]}
      />

      <TokenSection
        id="radius"
        title="Border Radius Tokens"
        description="Border radius defines how rounded your corners are. Sharp corners (radius-none) feel professional and serious. Rounded corners (radius-lg, radius-full) feel friendly and approachable. Mixing different radii randomly makes your app look inconsistent."
        visual={<RadiusVisual />}
        prompts={[
          "Use rounded-lg consistently for all cards and buttons",
          "Make avatar images use rounded-full",
          "Set the global --radius variable to 0.5rem for slightly softer corners",
        ]}
      />

      <TokenSection
        id="shadows"
        title="Shadow Tokens"
        description="Shadows create depth and help users understand what's clickable or elevated. Too many different shadows = visual chaos. Most apps only need 2-3 shadow levels: subtle (sm), medium (md), and pronounced (lg)."
        visual={<ShadowVisual />}
        prompts={[
          "Use shadow-sm for cards and shadow-lg for modals/dropdowns",
          "Remove shadows from buttons, just use background color changes on hover",
          "Add shadow-md to the navbar when scrolled",
        ]}
      />

      {/* CTA */}
      <section className="border-t py-16 lg:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to level up your vibe code?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Generate a complete set of design tokens from your brand colors.
            Then give them to your AI and watch it finally understand what you
            actually want.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="gap-2">
              <Link href="/generate">
                <BoltIcon className="h-4 w-4" />
                Generate Your Tokens
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
