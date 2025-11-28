"use client";

import { Button } from "@/components/ui/button";
import { Term } from "@/components/term";
import { PageLayout } from "@/components/page-layout";
import TurdLogo from "@/components/turd-logo";
import Link from "next/link";
import {
  ArrowDownCircleIcon,
  BoltIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import {
  SwatchIcon,
  DocumentTextIcon,
  ArrowsPointingOutIcon,
  StopIcon,
  Square3Stack3DIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

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
} from "@/components/home/token-visuals";
import { AnimatedTabsList } from "@/components/ui/tabs";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { ArrowDown, MoveDownIcon } from "lucide-react";
import React from "react";
import { Card } from "@/components/ui/card";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
  const [generatorTab, setGeneratorTab] = React.useState<"web" | "mcp">("web");

  return (
    <PageLayout showGrid>
      {/* Hero */}
      <section className="py-20 md:pt-28 md:pb-8 relative overflow-hidden">
        <div className="mx-auto max-w-2xl text-center relative z-10">
          <h1 className="text-4xl font-black md:text-5xl leading-13">
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
            does my AI generated app look like turd?
          </h1>
          <TokenBadge
            className="absolute mt-[-1rem] ml-[-2rem] inline-block font-light left-full"
            pointer="left"
            pointerLength="2rem"
          >
            spacing.wtf
          </TokenBadge>

          <p className="max-w-2xl px-6 text-lg text-muted-foreground mt-6">
            Most AI-generated apps rely on a standard set of design tokens:{" "}
            <span className="text-muted-foreground font-normal">colors</span>,{" "}
            <span className="text-muted-foreground font-normal">
              typography
            </span>
            , <span className="text-muted-foreground font-normal">spacing</span>
            , <span className="text-muted-foreground font-normal">layout</span>,{" "}
            <span className="text-muted-foreground font-normal">borders</span>,
            and{" "}
            <span className="text-muted-foreground font-normal">shadows</span>.
            Clearly defining these is the key to taking control and avoiding
            design drift.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="pt-6 pb-18">
        <div className="mx-auto max-w-2xl text-center">
          <Tabs
            value={generatorTab}
            onValueChange={(v) => setGeneratorTab(v as "web" | "mcp")}
          >
            <div className="flex justify-center">
              <AnimatedTabsList
                className="border border-border/100 p-2 h-12"
                value={generatorTab}
                onValueChange={(v) => setGeneratorTab(v as "web" | "mcp")}
                items={[
                  {
                    value: "web",
                    label: (
                      <>
                        <ComputerDesktopIcon className="h-4 w-4 mr-1.5 text-purple-500" />
                        Design Tokens on the Web
                      </>
                    ),
                  },
                  {
                    value: "mcp",
                    label: (
                      <>
                        <SparklesIcon className="h-4 w-4 mr-1.5 text-purple-500" />
                        Teach your AI with MCP Tools
                      </>
                    ),
                  },
                ]}
              />
            </div>

            <TabsContent value="web" className="mt-9 space-y-4 text-left">
              <Card>
                <h3 className="text-lg font-semibold">
                  Design tokens in the web UI
                </h3>
                <p className="text-muted-foreground">
                  Manually craft and fine-tune your tokens using the visual
                  generator. Perfect when you want exact control over colors,
                  spacing and typography.
                </p>
                <div>
                  <Button className="shadow-lg shadow-primary/20" asChild>
                    <Link href="/generate">Open Token Designer</Link>
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="mcp" className="mt-9 space-y-4 text-left">
              <Card>
                <h3 className="text-lg font-semibold">Automate with the MCP</h3>
                <p className="text-muted-foreground">
                  Integrate tokens into your AI workflows so generators produce
                  consistent, token-driven UI. Use the MCP to programmatically
                  generate token sets.
                </p>
                <div>
                  <Button className="shadow-lg shadow-primary/20" asChild>
                    <Link href="/docs">Read the MCP docs</Link>
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-lg font-medium text-foreground">
              New to all this? Continue down there to learn how to prompt for
              coherent design
            </p>
            <Link href="#spacing" className="-mb-8">
              <ArrowDown className="h-10 w-10 text-purple-500 animate-bounce" />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center text-center border-t pt-16 pb-0">
        {/* Token Type Visual Indicator */}

        <div className="mb-8 inline-flex items-center gap-1 rounded-full bg-muted/50 p-1.5 shadow-lg ring-1 ring-border/50">
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
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          You and your AI aren't speaking the same design language
        </h2>

        <p className="max-w-3xl text-lg text-primary/70 relative">
          When you generate a web app with AI, it&apos;s probably using{" "}
          <Term term="tailwind">Tailwind CSS</Term> with{" "}
          <Term term="shadcn">shadcn/ui</Term> components. This gives us a solid
          start, but it only holds together if you explicitly direct the model
          to use your design tokens and follow a coherent design language.
          Without that, the more you prompt, the more of a sloppy mess your app
          will become.
        </p>
      </section>

      {/* Token type sections */}
      <TokenSection
        id="spacing"
        title="Spacing Tokens"
        description="Spacing uses a scale where each step is 4 pixels. When you tell your AI 'add some space,' it picks randomly. Be specific about your spacing values and stick to the scale."
        visual={<SpacingVisual />}
        prompt="Add consistent spacing between these cards using our spacing scale (6 units), and set padding inside each card to 8 units"
      />

      <TokenSection
        id="colors"
        title="Color Tokens"
        description="Colors are organized in layers with semantic names. 'background' is your base, 'card' sits on top, 'popover' floats above. Each has a matching foreground color. Tell your AI which semantic color, not which hex code."
        visual={<ColorVisual />}
        prompt="Use the card background color with its foreground for this section, and primary with primary-foreground for the button"
      />

      <TokenSection
        id="typography"
        title="Typography Tokens"
        description="Font sizes use a named scale from extra-small to extra-large. Weights range from normal to bold. Your AI understands these token names better than raw pixel values."
        visual={<TypographyVisual />}
        prompt="Make all headings extra-large and bold, body text should be the base size, and captions should be small with muted color"
      />

      <TokenSection
        id="shadows"
        title="Shadow Tokens"
        description="Shadows use preset levels: small (subtle), medium, and large (pronounced). Don't tell your AI 'add a shadow'—specify which level. Cards usually get small shadows, modals get large."
        visual={<ShadowVisual />}
        prompt="Add a small shadow to cards in their default state, and increase to medium on hover to show interactivity"
      />

      <TokenSection
        id="layout"
        title="Layout Tokens"
        description="Layout tokens define breakpoints for different screen sizes and container widths. Tell your AI which container size to use and when layouts should change, instead of writing custom media queries or arbitrary widths."
        visual={<LayoutVisual />}
        prompt="Set the main content container to our 4xl width token and center it. On tablet and larger, add more horizontal padding"
      />

      <TokenSection
        id="borders"
        title="Border Tokens"
        description="Borders use preset widths (1px, 2px, 4px) and styles (solid, dashed, dotted). Tell your AI which width and style from our token system, not arbitrary values."
        visual={<BorderVisual />}
        prompt="Add a default border to all cards, and use a thicker border with the primary color on the active card to highlight it"
      />

      {/* CTA */}
      <section className="border-t py-16 lg:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to level up your AI generated code?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Design a complete set of tokens then give them to your AI and watch
            it finally understand what you actually want.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="gap-2">
              <Link href="/generate">
                <BoltIcon className="h-4 w-4" />
                Design Your Tokens
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <TurdLogo
              width={20}
              height={20}
              background="var(--foreground)"
              foreground="var(--background)"
              className="shrink-0"
            />
            <span className="text-sm text-muted-foreground">
              © 2025{" "}
              <Link
                href="https://flett.cc"
                className="hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Andrew Flett
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
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
              href="https://www.npmjs.com/package/tokens-mcp"
              className="text-sm text-muted-foreground hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              NPM
            </Link>
            <Link
              href="/legal"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Legal
            </Link>
          </div>
        </div>
      </footer>
    </PageLayout>
  );
}
