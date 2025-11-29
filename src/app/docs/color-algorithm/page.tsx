import { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Term } from "@/components/term";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Color Algorithm - Documentation",
  description:
    "Learn how Tokens generates professional, perceptually balanced color scales",
};

export default function ColorAlgorithmPage() {
  return (
    <PageLayout showGrid>
      <div className="py-10">
        {/* Back button */}
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Documentation
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Color Scale Algorithm
          </h1>
          <p className="text-muted-foreground">
            How Tokens generates professional, perceptually balanced color
            scales
          </p>
        </div>

        <div className="space-y-12">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground mb-4">
              Tokens uses a sophisticated dual-algorithm approach to generate{" "}
              <Term term="color-scale">color scales</Term> that are both
              aesthetically pleasing and functionally superior for UI design.
              The system automatically detects whether a color is chromatic (has
              hue) or achromatic (neutral/gray) and applies the appropriate
              algorithm.
            </p>

            <div className="rounded-xl border p-6 bg-card">
              <h3 className="font-semibold mb-3">Why Two Algorithms?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Different colors have different needs in UI design:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong>Chromatic colors</strong> (blues, greens, oranges,
                  etc.) benefit from vibrant mid-tones and smooth transitions
                </li>
                <li>
                  <strong>Achromatic colors</strong> (grays, neutrals) need
                  subtle light shades for backgrounds and high-contrast dark
                  shades for text
                </li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* The OKLCH Foundation */}
          <section>
            <h2 className="text-2xl font-bold mb-4">The OKLCH Foundation</h2>
            <p className="text-muted-foreground mb-4">
              Both algorithms use <Term term="oklch">OKLCH</Term> color space,
              which provides perceptually uniform color manipulation. This means
              equal numeric changes produce equal visual changes—something RGB
              and HSL can't guarantee.
            </p>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">What is OKLCH?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-sm mb-1">
                    L - Lightness (0-1)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Perceived brightness from black (0) to white (1). Unlike
                    HSL, lightness values match human perception.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">C - Chroma (0+)</p>
                  <p className="text-sm text-muted-foreground">
                    Colorfulness or saturation. Higher values = more vibrant.
                    Can exceed 0.37 for very saturated colors.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">H - Hue (0-360°)</p>
                  <p className="text-sm text-muted-foreground">
                    Color angle: 0° = red, 120° = green, 240° = blue, etc.
                  </p>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
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
          </section>

          <Separator />

          {/* Chromatic Color Algorithm */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Chromatic Color Algorithm
            </h2>
            <p className="text-muted-foreground mb-6">
              For colors with hue (blues, greens, oranges, purples, etc.), we
              use a three-part approach inspired by Matt Ström's WCAG-driven
              color palette generation.
            </p>

            <div className="space-y-6">
              {/* Lightness Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    1. Smooth Lightness Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Lightness steps are calibrated to provide visually even
                    progression from light to dark, optimized for UI elements
                    like buttons, cards, and badges.
                  </p>
                  <div className="rounded-lg bg-muted p-4">
                    <pre className="text-xs font-mono overflow-x-auto">
                      {`Shade  Offset from base (500)
  50   +0.33 (much lighter)
 100   +0.28
 200   +0.22
 300   +0.15
 400   +0.07
 500    0.00 (exact base color)
 600   -0.10
 700   -0.20
 800   -0.28
 900   -0.34
 950   -0.38`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Parabolic Chroma Curve */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    2. Parabolic Chroma Curve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chroma follows a parabolic curve that peaks at shade 500,
                    creating vibrant mid-tones while reducing saturation at
                    extremes for natural-looking lighter and darker shades.
                  </p>
                  <div className="rounded-lg bg-muted p-4 mb-4">
                    <pre className="text-xs font-mono">
                      {`Formula: C(n) = -4(max-min)n² + 4(max-min)n + min
Where n = normalized position (0-1)
      max = 1.1 (10% boost at peak)
      min = 0.3 (70% reduction at extremes)`}
                    </pre>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This ensures colors remain vibrant where they matter most
                    (buttons, links, accents) while preventing oversaturation in
                    backgrounds and dark UI elements.
                  </p>
                </CardContent>
              </Card>

              {/* Bezold-Brücke Hue Shift */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    3. Bezold-Brücke Hue Shift Compensation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Lighter colors appear to shift hue perceptually—a phenomenon
                    called the Bezold-Brücke effect. We compensate by slightly
                    rotating hue in lighter shades.
                  </p>
                  <div className="rounded-lg bg-muted p-4 mb-4">
                    <pre className="text-xs font-mono">
                      {`Formula: H(n) = H_base + 5(1 - n)
Where n = normalized position (0-1)

Example: If base hue = 210° (blue)
  Shade 50:  215° (slightly warmer)
  Shade 500: 210° (exact base)
  Shade 950: 210° (stays true)`}
                    </pre>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This subtle adjustment (±5°) keeps colors looking consistent
                    across the entire scale, preventing the "muddy" or "off"
                    appearance common in naive algorithms.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-xl border p-6 bg-card mt-6">
              <h3 className="font-semibold mb-2">Reference</h3>
              <p className="text-sm text-muted-foreground mb-2">
                This approach is inspired by Matt Ström's article on generating
                WCAG-compliant color palettes for Stripe:
              </p>
              <a
                href="https://mattstromawn.com/writing/generating-color-palettes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Generating Color Palettes →
              </a>
            </div>
          </section>

          <Separator />

          {/* Achromatic Color Algorithm */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Achromatic Color Algorithm
            </h2>
            <p className="text-muted-foreground mb-6">
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
                <p className="text-sm text-muted-foreground mb-4">
                  Neutrals need different behavior than chromatic colors. Light
                  shades must be very subtle (close to white) for card
                  backgrounds and subtle borders, while dark shades need
                  aggressive contrast for readable text.
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
                <p className="text-sm text-muted-foreground">
                  Notice the massive lightness drops between shades 300-500.
                  This creates excellent contrast for text on light backgrounds
                  while keeping the lighter shades subtle and non-distracting.
                </p>
              </CardContent>
            </Card>

            <div className="rounded-xl border p-6 bg-card">
              <h3 className="font-semibold mb-2">Real-World Validation</h3>
              <p className="text-sm text-muted-foreground mb-2">
                This distribution closely matches Tailwind CSS's neutral scale,
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

            <div className="rounded-xl border p-6 bg-card mt-6">
              <h3 className="font-semibold mb-2">Reference</h3>
              <p className="text-sm text-muted-foreground mb-2">
                This approach is based on analysis of Tailwind CSS's color
                system:
              </p>
              <a
                href="https://designerup.co/blog/how-to-build-a-tailwind-ready-color-system-in-figma-that-developers-love/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Building a Tailwind-Ready Color System →
              </a>
            </div>
          </section>

          <Separator />

          {/* Benefits */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Benefits of This Approach
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Perceptually Uniform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    OKLCH ensures equal lightness changes produce equal visual
                    changes. Shade 300 looks equally lighter than 400 as 700
                    looks darker than 600.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Vibrant Mid-Tones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The parabolic chroma curve creates punchy, engaging colors
                    for interactive elements like buttons and links without
                    oversaturating backgrounds.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Excellent Readability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
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
                  <p className="text-sm text-muted-foreground">
                    Based on proven approaches from Tailwind CSS and Matt
                    Ström's work at Stripe, used in thousands of production
                    applications.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Natural-Looking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Hue shift compensation prevents the "muddy" or "off"
                    appearance common in algorithmically generated scales.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Harmonious</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Both chromatic and achromatic scales work together
                    seamlessly, ensuring your entire design system feels
                    cohesive.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Technical Details */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Technical Implementation
            </h2>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Detection Threshold</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A color is considered achromatic (neutral) if its chroma value
                  is less than 0.01. This catches pure grays as well as colors
                  that are nearly imperceptible from gray.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">
                  Constraint Preservation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Regardless of algorithm, shade 500 always exactly matches your
                  input color. This ensures your brand color appears precisely
                  as intended in the generated scale.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">View the Source</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  The complete implementation is open source and available in
                  our repository:
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
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
