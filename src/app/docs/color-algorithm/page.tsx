import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Term } from "@/components/term";

export const metadata: Metadata = {
  title: "Color Algorithm - Documentation",
  description:
    "Learn how Tokens generates professional, perceptually balanced color scales",
};

export default function ColorAlgorithmPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Color Scale Algorithm</h1>
        <p className="text-muted-foreground">
          How Tokens generates professional, perceptually balanced color scales
        </p>
      </div>

      <div className="space-y-12">
        {/* Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground mb-4">
            Tokens uses a sophisticated dual-algorithm approach to generate{" "}
            <Term term="color-scale">color scales</Term> that are both
            aesthetically pleasing and functionally superior for UI design. The
            system automatically detects whether a color is chromatic (has hue)
            or achromatic (neutral/gray) and applies the appropriate algorithm.
          </p>

          <div className="rounded-xl border p-6 bg-card">
            <h3 className="font-semibold mb-3">Why Two Algorithms?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Different colors have different needs in UI design:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
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
        </section>

        <Separator />

        {/* The OKLCH Foundation */}
        <section>
          <h2 className="text-2xl font-bold mb-4">The OKLCH Foundation</h2>
          <p className="text-muted-foreground mb-4">
            Both algorithms use <Term term="oklch">OKLCH</Term> color space,
            which provides perceptually uniform color manipulation. This means
            equal numeric changes produce equal visual changes—something RGB and
            HSL can't guarantee.
          </p>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">What is OKLCH?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium text-sm mb-1">L - Lightness (0-1)</p>
                <p className="text-sm text-muted-foreground">
                  Perceived brightness from black (0) to white (1). Unlike HSL,
                  lightness values match human perception.
                </p>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">C - Chroma (0+)</p>
                <p className="text-sm text-muted-foreground">
                  Colorfulness or saturation. Higher values = more vibrant. Can
                  exceed 0.37 for very saturated colors.
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

        {/* APCA Contrast */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            APCA Contrast for Accessibility
          </h2>
          <p className="text-muted-foreground mb-4">
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
                <p className="text-sm text-muted-foreground">
                  APCA accounts for how humans actually perceive contrast,
                  including spatial frequency, polarity effects, and ambient
                  lighting conditions.
                </p>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">
                  Directional Awareness
                </p>
                <p className="text-sm text-muted-foreground">
                  Unlike WCAG ratios, APCA recognizes that light text on dark
                  backgrounds needs different treatment than dark text on light
                  backgrounds.
                </p>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">
                  Context-Aware Scoring
                </p>
                <p className="text-sm text-muted-foreground">
                  APCA Lc values directly relate to use cases: Lc 90 for body
                  text, Lc 75 for large text, Lc 60 for UI elements, Lc 45 for
                  disabled states.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-xl border p-6 bg-card">
            <h3 className="font-semibold mb-2">How We Use APCA</h3>
            <p className="text-sm text-muted-foreground mb-3">
              When generating color scales, we use APCA to compute optimal
              lightness values that ensure sufficient contrast for different use
              cases. This guarantees that:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
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
        </section>

        <Separator />

        {/* Chromatic Color Algorithm */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Chromatic Color Algorithm</h2>
          <p className="text-muted-foreground mb-6">
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
                <p className="text-sm text-muted-foreground mb-4">
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
                <p className="text-sm text-muted-foreground mt-4">
                  This adaptive approach ensures optimal results regardless of
                  your base color's lightness—whether you start with a light
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
                <p className="text-sm text-muted-foreground mb-4">
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
                <p className="text-sm text-muted-foreground">
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
                <p className="text-sm text-muted-foreground mb-4">
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
                <p className="text-sm text-muted-foreground">
                  This approach, inspired by Radix Colors, prioritizes brand
                  recognition and visual consistency. Users will immediately
                  recognize your brand color across all shades, from the
                  lightest backgrounds to the darkest text.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-xl border p-6 bg-card mt-6">
            <h3 className="font-semibold mb-2">Reference</h3>
            <p className="text-sm text-muted-foreground mb-2">
              This approach is inspired by Radix Colors' methodology for
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
              <p className="text-sm text-muted-foreground">
                Notice the massive lightness drops between shades 300-500. This
                creates excellent contrast for text on light backgrounds while
                keeping the lighter shades subtle and non-distracting.
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
        </section>

        <Separator />

        {/* Benefits */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Benefits of This Approach</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Perceptually Uniform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
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
                <p className="text-sm text-muted-foreground">
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
                <p className="text-sm text-muted-foreground">
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
                <p className="text-sm text-muted-foreground">
                  Both chromatic and achromatic scales work together seamlessly,
                  ensuring your entire design system feels cohesive.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Technical Details */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Technical Implementation</h2>

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
              <CardTitle className="text-lg">Constraint Preservation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
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
              <p className="text-sm text-muted-foreground mb-3">
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
        </section>
      </div>
    </div>
  );
}
