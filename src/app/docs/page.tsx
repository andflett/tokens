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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to use Tokens with your AI assistant",
};

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header */}
      <section className="max-w-3xl mx-auto text-left pb-6">
        <h1 className="text-4xl md:text-4xl font-serif leading-tight tracking-tight mb-4">
          Documentation
        </h1>
        <p className="text-lg text-foreground/85 leading-relaxed">
          Learn how to use Tokens with your AI assistant
        </p>
      </section>

      <div className="max-w-3xl mx-auto space-y-16">
        {/* Getting Started */}
        <section id="getting-started">
          <h2 className="text-3xl font-serif mb-6">
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
          <h2 className="text-3xl font-serif mb-6">
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
          <h2 className="text-3xl font-serif mb-6">MCP Setup</h2>
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
                <p className="text-sm font-medium">
                  Option 2: Local NPM Package
                </p>
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
                <h3 className="text-xl font-medium">
                  VS Code + GitHub Copilot
                </h3>
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
          <h2 className="text-3xl font-serif mb-6">
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
          <h2 className="text-3xl font-serif mb-6">
            Color Algorithm
          </h2>
          <p className="text-md text-foreground/85 leading-relaxed mb-8">
            Learn how Tokens generates professional, perceptually balanced{" "}
            <Term term="color-scale">color scales</Term> using{" "}
            <Term term="oklch">OKLCH</Term> color space with different
            approaches for chromatic and achromatic colors.
          </p>

          {/* Overview */}
          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-2xl font-serif mb-4">Overview</h3>
              <p className="text-md text-foreground/85 leading-relaxed mb-6">
                Tokens uses a sophisticated dual-algorithm approach to generate{" "}
                <Term term="color-scale">color scales</Term> that are both
                aesthetically pleasing and functionally superior for UI design. The
                system automatically detects whether a color is chromatic (has hue)
                or achromatic (neutral/gray) and applies the appropriate algorithm.
              </p>

              <div className="rounded-xl border p-6 bg-card">
                <h4 className="text-lg font-medium mb-3">Why Two Algorithms?</h4>
                <p className="text-sm text-foreground/75 leading-relaxed mb-3">
                  Different colors have different needs in UI design:
                </p>
                <ul className="space-y-2 text-sm text-foreground/75">
                  <li>
                    <strong>Chromatic colors</strong> (blues, greens, oranges, etc.)
                    benefit from vibrant mid-tones and smooth transitions
                  </li>
                  <li>
                    <strong>Achromatic colors</strong> (grays, neutrals) need subtle
                    light shades for backgrounds and high-contrast dark shades for
                    text
                  </li>
                </ul>
              </div>
            </div>

            <Separator />

            {/* The OKLCH Foundation */}
            <div>
              <h3 className="text-2xl font-serif mb-4">
                The OKLCH Foundation
              </h3>
              <p className="text-foreground/75 mb-4">
                Both algorithms use <Term term="oklch">OKLCH</Term> color space,
                which provides perceptually uniform color manipulation. This means
                equal numeric changes produce equal visual changes—something RGB and
                HSL can&apos;t guarantee.
              </p>

              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">What is OKLCH?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-sm mb-1">L - Lightness (0-1)</p>
                    <p className="text-sm text-foreground/75">
                      Perceived brightness from black (0) to white (1). Unlike HSL,
                      lightness values match human perception.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">C - Chroma (0+)</p>
                    <p className="text-sm text-foreground/75">
                      Colorfulness or saturation. Higher values = more vibrant. Can
                      exceed 0.37 for very saturated colors.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">H - Hue (0-360°)</p>
                    <p className="text-sm text-foreground/75">
                      Color angle: 0° = red, 120° = green, 240° = blue, etc.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <p className="text-sm text-foreground/75">
                Learn more at{" "}
                <a
                  href="https://oklch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  oklch.com
                </a>
              </p>
            </div>

            <Separator />

            {/* APCA Contrast */}
            <div>
              <h3 className="text-2xl font-serif mb-4">
                APCA Contrast for Accessibility
              </h3>
              <p className="text-foreground/75 mb-4">
                We use <Term term="apca">APCA</Term> (Advanced Perceptual Contrast
                Algorithm) to ensure our color scales meet modern accessibility
                standards. Unlike WCAG 2.x contrast ratios, APCA provides
                perceptually accurate, context-aware contrast measurements.
              </p>

              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">Why APCA Over WCAG 2.x?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-sm mb-1">
                      Perceptually Accurate
                    </p>
                    <p className="text-sm text-foreground/75">
                      APCA accounts for how humans actually perceive contrast,
                      including spatial frequency, polarity effects, and ambient
                      lighting conditions.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">
                      Directional Awareness
                    </p>
                    <p className="text-sm text-foreground/75">
                      Unlike WCAG ratios, APCA recognizes that light text on dark
                      backgrounds needs different treatment than dark text on light
                      backgrounds.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">
                      Context-Aware Scoring
                    </p>
                    <p className="text-sm text-foreground/75">
                      APCA Lc values directly relate to use cases: Lc 90 for body
                      text, Lc 75 for large text, Lc 60 for UI elements, Lc 45 for
                      disabled states.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-xl border p-6 bg-card">
                <h4 className="font-semibold mb-2">How We Use APCA</h4>
                <p className="text-sm text-foreground/75 mb-3">
                  When generating color scales, we use APCA to compute optimal
                  lightness values that ensure sufficient contrast for different use
                  cases. This guarantees that:
                </p>
                <ul className="space-y-2 text-sm text-foreground/75 list-disc list-inside">
                  <li>
                    Light shades work for subtle backgrounds without accessibility
                    issues
                  </li>
                  <li>
                    Mid-range shades provide appropriate contrast for interactive
                    elements
                  </li>
                  <li>Dark shades meet standards for body text (Lc 90+)</li>
                  <li>All scales are perceptually uniform and predictable</li>
                </ul>
              </div>
            </div>

            <Separator />

            {/* Chromatic Color Algorithm */}
            <div>
              <h3 className="text-2xl font-serif mb-4">
                Chromatic Color Algorithm
              </h3>
              <p className="text-foreground/75 mb-6">
                For colors with hue (blues, greens, oranges, purples, etc.), we use
                a Radix Colors-inspired approach with smooth easing curves,
                progressive chroma distribution, and constant hue for brand
                consistency.
              </p>

              <div className="space-y-6">
                {/* Lightness Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      1. Adaptive Lightness Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/75 mb-4">
                      Lightness uses adaptive scaling based on available headroom
                      above and below the base color. Smooth easing curves at the
                      light end optimize for UI backgrounds, while larger jumps at
                      the dark end ensure text contrast and accessibility.
                    </p>
                    <div className="rounded-lg bg-muted p-4">
                      <pre className="text-xs font-mono overflow-x-auto">
                        {`Shade  Headroom Usage       Purpose
  25   +98% of available   Nearly white (subtle tint)
  50   +93% of available   Very light background
 100   +86% of available   Light background
 200   +76% of available   Soft background
 300   +62% of available   UI element background
 400   +38% of available   Hover state
 500    0% (exact base)    Base/primary color
 600   -20% of available   Active/pressed state
 700   -38% of available   Borders
 800   -56% of available   Solid backgrounds
 900   -76% of available   High contrast text
 950   -90% of available   Highest contrast`}
                      </pre>
                    </div>
                    <p className="text-sm text-foreground/75 mt-4">
                      This adaptive approach ensures optimal results regardless of
                      your base color&apos;s lightness—whether you start with a light
                      pastel or a dark, rich hue.
                    </p>
                  </CardContent>
                </Card>

                {/* Progressive Chroma Easing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      2. Progressive Chroma Easing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/75 mb-4">
                      Chroma follows a progressive easing curve that creates subtle
                      pastel tints at the light end while maintaining full vibrancy
                      through the interactive range (shades 400-900).
                    </p>
                    <div className="rounded-lg bg-muted p-4 mb-4">
                      <pre className="text-xs font-mono overflow-x-auto">
                        {`Shade Range  Chroma %   Purpose
  25         8-23%      Very subtle hint of color
  50-100     23-55%     Gentle color introduction
  100-200    55-85%     Smooth progression
  200-400    85-100%    Approaching peak
  400-900    100%       Full peak maintained
  900-950    94-100%    Minimal reduction`}
                      </pre>
                    </div>
                    <p className="text-sm text-foreground/75">
                      This distribution ensures light backgrounds feel clean and
                      subtle while interactive elements (buttons, links, badges)
                      remain vibrant and engaging. The extended peak range through
                      shade 900 maintains color presence even in darker UI elements.
                    </p>
                  </CardContent>
                </Card>

                {/* Constant Hue */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      3. Constant Hue Throughout Scale
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/75 mb-4">
                      Unlike some algorithms that apply hue rotation, we maintain
                      constant hue across all shades. This ensures perfect brand
                      color consistency and creates a cohesive, recognizable
                      palette.
                    </p>
                    <div className="rounded-lg bg-muted p-4 mb-4">
                      <pre className="text-xs font-mono">
                        {`Formula: H(n) = H_base (constant)

Example: If base hue = 310.4° (purple)
  Shade 25:  310.4°
  Shade 500: 310.4° (exact base)
  Shade 950: 310.4°`}
                      </pre>
                    </div>
                    <p className="text-sm text-foreground/75">
                      This approach, inspired by Radix Colors, prioritizes brand
                      recognition and visual consistency. Users will immediately
                      recognize your brand color across all shades, from the
                      lightest backgrounds to the darkest text.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-xl border p-6 bg-card mt-6">
                <h4 className="font-semibold mb-2">Reference</h4>
                <p className="text-sm text-foreground/75 mb-2">
                  This approach is inspired by Radix Colors&apos; methodology for
                  creating accessible, beautiful color systems:
                </p>
                <a
                  href="https://www.radix-ui.com/colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Radix Colors Documentation →
                </a>
              </div>
            </div>

            <Separator />

            {/* Achromatic Color Algorithm */}
            <div>
              <h3 className="text-2xl font-serif mb-4">
                Achromatic Color Algorithm
              </h3>
              <p className="text-foreground/75 mb-6">
                For neutral colors (grays with chroma &lt; 0.01), we use a
                distribution pattern inspired by{" "}
                <Term term="tailwind">Tailwind CSS</Term> that prioritizes
                readability and subtle UI backgrounds.
              </p>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Tailwind-Inspired Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/75 mb-4">
                    Neutrals need different behavior than chromatic colors. Light
                    shades must be very subtle (close to white) for card backgrounds
                    and subtle borders, while dark shades need aggressive contrast
                    for readable text.
                  </p>
                  <div className="rounded-lg bg-muted p-4 mb-4">
                    <pre className="text-xs font-mono overflow-x-auto">
                      {`Shade  Offset from base (500)  Step Size  Purpose
  50   +0.429                 0.015      Subtle backgrounds
 100   +0.414                 0.048      Very light UI elements
 200   +0.366                 0.052      Light borders/dividers
 300   +0.314                 0.162      Card backgrounds
 400   +0.152                 ⚡HUGE     Hover states
 500    0.000 (base)          0.117      Base neutral
 600   -0.117                 0.068      Muted text
 700   -0.185                 0.102      Secondary text
 800   -0.287                 0.064      Body text (dark mode)
 900   -0.351                 0.060      Headings
 950   -0.411                           Deep backgrounds`}
                    </pre>
                  </div>
                  <p className="text-sm text-foreground/75">
                    Notice the massive lightness drops between shades 300-500. This
                    creates excellent contrast for text on light backgrounds while
                    keeping the lighter shades subtle and non-distracting.
                  </p>
                </CardContent>
              </Card>

              <div className="rounded-xl border p-6 bg-card">
                <h4 className="font-semibold mb-2">Real-World Validation</h4>
                <p className="text-sm text-foreground/75 mb-2">
                  This distribution closely matches Tailwind CSS&apos;s neutral scale,
                  which has been battle-tested across thousands of production
                  applications:
                </p>
                <div className="rounded-lg bg-muted p-3 mt-3">
                  <pre className="text-xs font-mono overflow-x-auto">
                    {`Tailwind neutral-500 in OKLCH: oklch(0.556 0 0)
Our algorithm at base 0.556:
  50:  0.985 (vs Tailwind 0.985) ✓
  400: 0.708 (vs Tailwind 0.708) ✓
  950: 0.145 (vs Tailwind 0.145) ✓`}
                  </pre>
                </div>
              </div>
            </div>

            <Separator />

            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-serif mb-4">
                Benefits of This Approach
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Perceptually Uniform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/75">
                      OKLCH ensures equal lightness changes produce equal visual
                      changes. Shade 300 looks equally lighter than 400 as 700 looks
                      darker than 600.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Vibrant Mid-Tones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/75">
                      The parabolic chroma curve creates punchy, engaging colors for
                      interactive elements like buttons and links without
                      oversaturating backgrounds.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Excellent Readability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/75">
                      Neutral scales provide high-contrast text options while
                      keeping light shades subtle enough for backgrounds and
                      dividers.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Battle-Tested</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/75">
                      Based on proven approaches from Radix Colors and Tailwind CSS,
                      methodologies used in thousands of production applications and
                      design systems.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Brand Consistent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/75">
                      Constant hue throughout the scale ensures perfect brand color
                      recognition. Your purple stays purple from the lightest tint
                      to the darkest shade.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Harmonious</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/75">
                      Both chromatic and achromatic scales work together seamlessly,
                      ensuring your entire design system feels cohesive.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            {/* Technical Details */}
            <div>
              <h3 className="text-2xl font-serif mb-4">
                Technical Implementation
              </h3>

              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">Detection Threshold</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/75">
                    A color is considered achromatic (neutral) if its chroma value
                    is less than 0.01. This catches pure grays as well as colors
                    that are nearly imperceptible from gray.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">Constraint Preservation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/75">
                    Regardless of algorithm, shade 500 always exactly matches your
                    input color. This ensures your brand color appears precisely as
                    intended in the generated scale.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">View the Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/75 mb-3">
                    The complete implementation is open source and available in our
                    repository:
                  </p>
                  <a
                    href="https://github.com/andflett/toke/blob/main/src/lib/tokens/oklch.ts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View oklch.ts on GitHub →
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Glossary */}
        <section id="glossary">
          <h2 className="text-3xl font-serif mb-6">Glossary</h2>
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
