"use client";

import { Button } from "@/components/ui/button";
import { Term } from "@/components/term";
import Link from "next/link";
import { BoltIcon } from "@heroicons/react/24/outline";

// Import home page components
import { TokenBadge } from "@/components/home/token-badge";
import { TokenSection } from "@/components/home/token-section";
import {
  ColorVisual,
  TypographyVisual,
  SpacingVisual,
  LayoutVisual,
  BorderVisual,
  ShadowVisual,
  SpacingTokenList,
  ColorTokenList,
  TypographyTokenList,
  ShadowTokenList,
  LayoutTokenList,
  BorderTokenList,
} from "@/components/home/token-visuals";
import { AnimatedTabsList } from "@/components/ui/tabs";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PaintbrushIcon } from "@/components/animate-ui/icons/paintbrush";
import { TerminalIcon } from "@/components/animate-ui/icons/terminal";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "@/components/animate-ui/icons/sparkles";
import { Brush, BrushIcon } from "@/components/animate-ui/icons/brush";
import { AIInstructionsDemo } from "@/components/home/ai-instructions-demo";

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState("design");

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero */}
      <section className="pb-10 pt-18 relative flex flex-col items-center gap-4">
        <Badge variant={"ghost"}>
          <Sparkles loop animate className="h-7 w-7 mr-1" />
          Design Tokens for AI
        </Badge>
        <div className="max-w-3xl text-center items-center relative flex flex-col gap-6">
          <h1 className="text-6xl font-bold tracking-tight relative">
            Why does my AI-generated UI look like turd?
          </h1>

          <p className="max-w-xl text-xl text-muted-foreground">
            Random colors. Arbitrary spacing. Mismatched typography. Every
            prompt creates new slop. We've all been there.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="pb-18">
        <div className="mx-auto max-w-3xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-11">
              <AnimatedTabsList
                value={activeTab}
                onValueChange={setActiveTab}
                items={[
                  {
                    value: "design",
                    label: (
                      <>
                        <BrushIcon
                          animate
                          loop
                          loopDelay={1000}
                          className="h-4 w-4 text-primary mr-1"
                        />
                        Token Designer
                      </>
                    ),
                  },
                  {
                    value: "teach",
                    label: (
                      <>
                        <TerminalIcon
                          animate
                          loop
                          className="h-4 w-4 text-primary mr-1"
                        />
                        Teach your AI
                      </>
                    ),
                  },
                ]}
              />
            </div>

            <TabsContent value="design">
              <Card>
                <CardContent className="space-y-6 px-8 py-4">
                  <div className="flex flex-row items-start gap-6">
                    <BrushIcon
                      animate
                      loop
                      loopDelay={1000}
                      className="h-10 w-10 text-primary shrink-0"
                    />
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">
                        Take control with design tokens
                      </h3>
                      <p className="text-muted-foreground">
                        Clearly defining your design foundations – colours,
                        typography, spacing, borders, shadows – as design
                        tokens, and instructing your AI to stick to them, is key
                        to avoiding your app turning into a sloppy mess.
                      </p>
                      <div className="pt-4">
                        <Button intent="default" asChild>
                          <Link href="/generate">Design your tokens</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teach">
              <Card>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <TerminalIcon
                      className="h-12 w-12 text-primary"
                      animate
                      loop
                    />
                    <h3 className="text-lg font-semibold">Teach your AI</h3>
                    <p className="text-muted-foreground">
                      Integrate tokens into your AI workflows so generators
                      produce consistent, token-driven UI. Use the MCP to
                      programmatically generate token sets.
                    </p>
                  </div>
                  <div>
                    <Button
                      intent="default"
                      className="shadow-lg shadow-primary/20"
                      asChild
                    >
                      <Link href="/docs">Read the MCP docs</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="pt-0 pb-0">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              You and your AI aren&apos;t speaking the same design language
            </h2>
            <p className="text-lg  text-muted-foreground">
              We've all felt the pain when designs don't translate from Figma to
              code. Design tokens introduce a shared vocabulary: named values
              for colors, spacing, typography.
            </p>
            <p className="text-lg  text-muted-foreground">
              The same problem exists with AI. Your generated UI most likely
              uses <Term term="tailwind">Tailwind CSS</Term> which engineers
              have used as their design language for years, but if your AI isn't
              instructed to use those tokens, it may just pick random values.
            </p>
          </div>

          <div className="pt-2">
            <AIInstructionsDemo />
          </div>
        </div>
      </section>

      <div className="space-y-22 mt-20">
        <h2 className="text-5xl font-bold tracking-tight text-center">
          Talk to your AI about...
        </h2>
        <TokenSection
          id="colors"
          title="Colour"
          description="Colours are organized in layers with semantic names. 'background' is your base, 'card' sits on top, 'popover' floats above. Each has a matching foreground color. Tell your AI which semantic color, not which hex code."
          visual={<ColorVisual />}
          tokenList={<ColorTokenList />}
          prompt="Use the card background color with its foreground for this section, and primary with primary-foreground for the button"
        />

        {/* Token type sections */}
        <TokenSection
          id="spacing"
          title="Spacing"
          description="Spacing uses a scale where each step is 4 pixels. When you tell your AI 'add some space,' it picks randomly. Be specific about your spacing values and stick to the scale."
          visual={<SpacingVisual />}
          tokenList={<SpacingTokenList />}
          prompt="Add consistent spacing between these cards using our spacing scale (6 units), and set padding inside each card to 8 units"
        />

        <TokenSection
          id="typography"
          title="Typography"
          description="Font sizes use a named scale from extra-small to extra-large. Weights range from normal to bold. Your AI understands these token names better than raw pixel values."
          visual={<TypographyVisual />}
          tokenList={<TypographyTokenList />}
          prompt="Make all headings extra-large and bold, body text should be the base size, and captions should be small with muted color"
        />

        <TokenSection
          id="shadows"
          title="Shadows"
          description="Shadows use preset levels: small (subtle), medium, and large (pronounced). Don't tell your AI 'add a shadow'—specify which level. Cards usually get small shadows, modals get large."
          visual={<ShadowVisual />}
          tokenList={<ShadowTokenList />}
          prompt="Add a small shadow to cards in their default state, and increase to medium on hover to show interactivity"
        />

        <TokenSection
          id="layout"
          title="Layout"
          description="Layout tokens define breakpoints for different screen sizes and container widths. Tell your AI which container size to use and when layouts should change, instead of writing custom media queries or arbitrary widths."
          visual={<LayoutVisual />}
          tokenList={<LayoutTokenList />}
          prompt="Set the main content container to our 4xl width token and center it. On tablet and larger, add more horizontal padding"
        />

        <TokenSection
          id="borders"
          title="Borders"
          description="Borders use preset widths (1px, 2px, 4px) and styles (solid, dashed, dotted). Tell your AI which width and style from our token system, not arbitrary values."
          visual={<BorderVisual />}
          tokenList={<BorderTokenList />}
          prompt="Add a default border to all cards, and use a thicker border with the primary color on the active card to highlight it"
        />
      </div>

      {/* CTA */}
      <section className="border-t py-16 lg:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to level up your AI generated code?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Design a complete set of tokens then give them to your AI and watch
            it finally understand what you actually want.
          </p>
          <div className="mt-8">
            <Button intent="default" size="lg" asChild className="gap-2">
              <Link href="/generate">
                <BoltIcon className="h-4 w-4" />
                Design Your Tokens
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
