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
import { Paintbrush } from "@/components/animate-ui/icons/paintbrush";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Terminal } from "@/components/animate-ui/icons/terminal";

export default function HomePage() {
  const [generatorTab, setGeneratorTab] = React.useState<"web" | "mcp">("web");

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero */}
      <section className="py-20 pt-28 md:pb-8 relative overflow-hidden">
        <div className="mx-auto max-w-2xl text-center relative z-10">
          <h1 className="text-5xl font-bold md:text-5xl md:leading-13">
            <span className="relative inline-block">
              Why
              <TokenBadge
                className="absolute font-light whitespace-nowrap bottom-full left-1/2 -translate-x-1/2 mb-9"
                pointer="bottom"
                pointerLength="1.5rem"
              >
                font-size.random
              </TokenBadge>
            </span>{" "}
            does my AI-generated site look like turd?
          </h1>
          <TokenBadge
            className="absolute mt-[-1rem] ml-[-2rem] inline-block font-light left-full"
            pointer="left"
            pointerLength="2rem"
          >
            spacing.wtf
          </TokenBadge>

          <p className="max-w-2xl px-6 text-lg text-muted-foreground mt-6">
            Clearly defining your design foundations – colours, typography,
            spacing, borders, shadows – and instructing your AI to stick to them
            is key to avoiding your app turning into a sloppy mess.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="pb-18">
        <Card className="mx-auto max-w-2xl text-center">
          <Tabs
            value={generatorTab}
            onValueChange={(v) => setGeneratorTab(v as "web" | "mcp")}
          >
            <div className="flex justify-center">
              <AnimatedTabsList
                value={generatorTab}
                onValueChange={(v) => setGeneratorTab(v as "web" | "mcp")}
                items={[
                  {
                    value: "web",
                    label: (
                      <AnimateIcon
                        animateOnHover
                        className="flex items-center gap-2 pr-1.5"
                      >
                        <Paintbrush className="h-4 w-4 text-purple-500" />
                        Design a theme
                      </AnimateIcon>
                    ),
                  },
                  {
                    value: "mcp",
                    label: (
                      <AnimateIcon
                        animateOnHover
                        className="flex items-center gap-2 pr-1.5"
                      >
                        <Terminal className="h-4 w-4 text-purple-500" />
                        Teach your AI
                      </AnimateIcon>
                    ),
                  },
                ]}
              />
            </div>

            <TabsContent value="web" className="mt-10 space-y-4 text-left">
              <h3 className="text-lg font-semibold">
                Design tokens in the web UI
              </h3>
              <p className="text-muted-foreground">
                Manually craft and fine-tune your tokens using the visual
                generator. Perfect when you want exact control over colors,
                spacing and typography.
              </p>
              <div>
                <Button intent="default" asChild>
                  <Link href="/generate">Open Token Designer</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="mcp" className="mt-10 space-y-4 text-left">
              <h3 className="text-lg font-semibold">Automate with the MCP</h3>
              <p className="text-muted-foreground">
                Integrate tokens into your AI workflows so generators produce
                consistent, token-driven UI. Use the MCP to programmatically
                generate token sets.
              </p>
              <div>
                <Button
                  intent="default"
                  className="shadow-lg shadow-primary/20"
                  asChild
                >
                  <Link href="/docs">Read the MCP docs</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </section>

      <section className="flex flex-col items-start border-t pt-16 pb-0">
        {/* Token Type Visual Indicator */}

        {/*         <div className="mb-6 inline-flex items-center gap-1 rounded-full bg-muted/50 p-1.5 shadow-lg ring-1 ring-border/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <SwatchIcon className="h-5 w-5" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <DocumentTextIcon className="h-5 w-5" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <ArrowsPointingOutIcon className="h-5 w-5" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <StopIcon className="h-5 w-5" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <Square3Stack3DIcon className="h-5 w-5" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <ViewColumnsIcon className="h-5 w-5" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <Squares2X2Icon className="h-5 w-5" />
          </div>
        </div> */}

        <h2 className="text-3xl font-bold mb-4">New to all this?</h2>

        <p className="text-lg relative">
          You and your AI aren&apos;t probably aren't speaking the same design
          language. When you generate a web site with AI, it&apos;s probably
          using <Term term="tailwind">Tailwind CSS</Term> and a component
          library like <Term term="shadcn">shadcn/ui</Term>, depending on the
          underlying <Term term="framework">framework</Term>. This gives us a
          solid start, but it only holds together if you explicitly direct the
          model to use your design tokens and follow a coherent design language.
          Without that, the more you prompt, the more of a sloppy mess your site
          will become.
        </p>
      </section>

      <div className="space-y-22 mt-20">
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
          id="colors"
          title="Colour"
          description="Colours are organized in layers with semantic names. 'background' is your base, 'card' sits on top, 'popover' floats above. Each has a matching foreground color. Tell your AI which semantic color, not which hex code."
          visual={<ColorVisual />}
          tokenList={<ColorTokenList />}
          prompt="Use the card background color with its foreground for this section, and primary with primary-foreground for the button"
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
