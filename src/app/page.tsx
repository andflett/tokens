"use client";

import { Button } from "@/components/ui/button";
import { Term } from "@/components/term";
import Link from "next/link";
import { BoltIcon } from "@heroicons/react/24/outline";
import { LetterSpacingIcon, LineHeightIcon } from "@radix-ui/react-icons";

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
import { AnimatedTerminal } from "@/components/home/animated-terminal";
import { TokenShowcasePanel } from "@/components/home/token-showcase-panel";
import { FrameworkDiscoveryPanel } from "@/components/home/framework-discovery-panel";
import { SlidersHorizontal } from "@/components/animate-ui/icons/sliders-horizontal";

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState("design");

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero */}
      <section className="pb-6 pt-14 relative flex flex-col items-center gap-4">
        {/* <Badge variant={"ghost"}>
          <Sparkles loop animate className="h-7 w-7 mr-1" />
          Design Tokens for AI
        </Badge> */}
        <div className="max-w-2xl text-center items-center relative flex flex-col gap-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight relative">
            Why does everything I build with AI look like turd?
          </h1>
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
                          animateOnHover
                          className="h-4 w-4 text-primary-subdued-foreground mr-1"
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
                          className="h-4 w-4 text-primary-subdued-foreground mr-1"
                        />
                        Train your AI
                      </>
                    ),
                  },
                ]}
              />
            </div>

            <TabsContent value="design">
              <Card>
                <CardContent className="space-y-6">
                  <div className="grid gap-12 md:grid-cols-[1fr_250px] items-start">
                    <div className="space-y-4">
                      <div className="flex items-start gap-6">
                        <SlidersHorizontal
                          animate
                          animation="default-loop"
                          loop={true}
                          loopDelay={1500}
                          className="h-8 w-8 text-primary flex-shrink-0"
                        />
                        <div className="gap-2 flex flex-col">
                          <h3 className="text-xl font-semibold mb-2">
                            Take control with design tokens
                          </h3>
                          <p className="text-foreground/70">
                            Clearly defining your design foundations – colours,
                            typography, spacing, borders, shadows – as design
                            tokens, and instructing your AI to stick to them, is
                            key to avoiding your app turning into a sloppy mess.
                          </p>
                          <Button intent="default" className="mt-4" asChild>
                            <Link href="/generate">Design your tokens</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <TokenShowcasePanel />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teach">
              <Card>
                <CardContent className="space-y-6">
                  <div className="grid gap-12 md:grid-cols-[1fr_320px] items-start">
                    <div className="space-y-4">
                      <div className="flex items-start gap-6">
                        <TerminalIcon
                          className="h-9 w-9 text-primary flex-shrink-0"
                          animate
                          loop
                        />
                        <div className="flex gap-2 flex-col">
                          <h3 className="text-2xl font-semibold">
                            Train your AI
                          </h3>
                          <p className="text-foreground/70">
                            Integrate tokens into your AI workflows so
                            generators produce consistent, token-driven UI. Use
                            the MCP to programmatically generate token sets.
                          </p>
                          <Button intent="default" className="mt-2" asChild>
                            <Link href="/docs">Read the MCP docs</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <AnimatedTerminal />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="pt-0 pb-0">
        <Card>
          <CardContent className="space-y-6 px-12 py-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
              <div>
                <div className="mt-1">
                  <AIInstructionsDemo />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight ">
                  You and your AI aren&apos;t speaking the same design language
                </h2>
                <p className="text-lg text-foreground leading-relaxed">
                  We've all felt the pain when designs don't translate from
                  Figma to code. Design tokens introduce a shared vocabulary:
                  named values for colors, spacing, typography.
                </p>
                <p className="text-md text-foreground leading-relaxed">
                  The same problem exists with AI.{" "}
                  <Term term="design-tokens">Design tokens</Term> apply semantic
                  names to standardised values – whether in{" "}
                  <Term term="tailwind">Tailwind</Term> classes,{" "}
                  <Term term="css-variables">CSS variables</Term>, or any other
                  format. If your AI isn&apos;t instructed to use those tokens,
                  it may just pick random values.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="space-y-22 mt-20">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-[-6]">
            How to speak to your AI in design tokens
          </h2>
        </div>

        <FrameworkDiscoveryPanel darkBg />

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

        <LetterSpacingIcon />
        <LineHeightIcon />

        <TokenSection
          id="typography"
          title="Typography"
          description="Font sizes use a named scale from extra-small to extra-large. Line-height follows our leading scale (tight, snug, normal, relaxed, loose) and letter spacing follows our tracking scale (tighter through widest) defined in tokens. Weights range from normal to bold. Your AI understands these semantic names better than raw pixel values."
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
      <section className="py-16 lg:py-20">
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
