"use client";

import { Button } from "@/components/ui/button";
import { Term } from "@/components/term";
import Link from "next/link";
import { BoltIcon } from "@heroicons/react/24/outline";

// Import home page components
import { TokenSection } from "@/components/home/token-section";
import {
  ColorVisual,
  TypographyVisual,
  SpacingVisual,
  BorderVisual,
  ShadowVisual,
  SpacingTokenList,
  ColorTokenList,
  TypographyTokenList,
  ShadowTokenList,
  BorderTokenList,
} from "@/components/home/token-visuals";
import { AnimatedTabsList } from "@/components/ui/tabs";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TerminalIcon } from "@/components/animate-ui/icons/terminal";
import { BrushIcon } from "@/components/animate-ui/icons/brush";
import { AIInstructionsDemo } from "@/components/home/ai-instructions-demo";
import { AnimatedTerminal } from "@/components/home/animated-terminal";
import { TokenShowcasePanel } from "@/components/home/token-showcase-panel";
import {
  TokenDesignShowcaseV1,
  TokenDesignShowcaseV2,
  TokenDesignShowcaseV3,
  TokenDesignShowcaseV4,
} from "@/components/home/token-design-showcase";
import { ExamplePrompt, TOKEN_PROMPTS } from "@/components/example-prompt";
import tokenTypes from "@/lib/token-types.json";

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState("design");

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero */}
      <section className="max-w-2xl text-center mx-auto pb-7 pt-10 md:pt-14 relative flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight relative">
          Why does everything I build with AI look like turd?
        </h1>
      </section>

      {/* Next Steps */}
      <section className="pb-18">
        <div className="mx-auto max-w-3xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-10">
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
                <CardContent className="space-y-6 pt-2 pb-1 px-10">
                  <div className="grid gap-12 md:grid-cols-[1fr_225px] items-start">
                    <div className="space-y-4">
                      <div className="flex flex-col items-start gap-6">
                        <div className="gap-3 flex flex-col">
                          <h3 className="text-2xl font-semibold">
                            Take control with design tokens
                          </h3>
                          <p className="text-foreground/95 text-md leading-6.25">
                            Tokens are the blueprint for every color, spacing
                            value, and corner in your app. Not a theme, but a
                            foundational design layer that keeps things
                            coherent. Without it, your AI's just going to design
                            a sloppy mess.
                          </p>
                          <Button
                            intent="default"
                            asChild
                            className="mt-2.5 self-start"
                          >
                            <Link href="/generate">
                              <BrushIcon
                                animateOnHover
                                className="h-4 w-4 mr-1"
                              />
                              Token Designer
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      {/*   <TokenDesignShowcaseV4 />
                       */}
                      {/* Alternate versions - kept for reference */}
                      {/*  <TokenShowcasePanel /> */}
                      <TokenDesignShowcaseV1 />
                      {/*  <TokenDesignShowcaseV2 />
                      <TokenDesignShowcaseV3 /> */}
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
                      <div className="flex flex-col items-start gap-6">
                        <div className="gap-2 flex flex-col">
                          <h3 className="text-2xl font-semibold mb-1">
                            Train your AI
                          </h3>
                          <p className="text-foreground/80 text-md">
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
                    <div className="">
                      <AnimatedTerminal />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="pt-2 pb-0">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mt-1">
              <AIInstructionsDemo />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight ">
              Speak the same language as your AI
            </h2>
            <p className="text-md text-foreground leading-relaxed">
              Once you've built your tokens, teach your AI to actually use them.
              Copy these rules into your IDE or AI chat, and watch your
              generated code stick to your system instead of making things up.
            </p>
            <p className="text-md leading-relaxed text-foreground">
              Examples below use <Term term="tailwind">Tailwind CSS</Term> and{" "}
              <Term term="shadcn">shadcn/ui</Term> (the defaults for most AI
              tools), but the same principles work with any{" "}
              <Term term="styling-system">styling system</Term>.
            </p>
            <p className="text-foreground/90 text-md">
              Design your token system, integrate it into your AI workflow, or
              read on to see how AI-generated code already uses tokens under the
              hood.
            </p>
            <ExamplePrompt
              prompt={
                "What frontend framework and styling system are you using? "
              }
            />
          </div>
        </div>
      </section>

      <div className="space-y-22 mt-20">
        <TokenSection
          id="colors"
          title={tokenTypes.colors.title}
          description={tokenTypes.colors.description}
          visual={<ColorVisual />}
          tokenList={<ColorTokenList />}
          prompt={TOKEN_PROMPTS.colors}
        />

        {/* Token type sections */}
        <TokenSection
          id="spacing"
          title={tokenTypes.spacing.title}
          description={tokenTypes.spacing.description}
          visual={<SpacingVisual />}
          tokenList={<SpacingTokenList />}
          prompt={TOKEN_PROMPTS.spacing}
        />

        <TokenSection
          id="typography"
          title={tokenTypes.typography.title}
          description={tokenTypes.typography.description}
          visual={<TypographyVisual />}
          tokenList={<TypographyTokenList />}
          prompt={TOKEN_PROMPTS.typography}
        />

        <TokenSection
          id="shadows"
          title={tokenTypes.shadows.title}
          description={tokenTypes.shadows.description}
          visual={<ShadowVisual />}
          tokenList={<ShadowTokenList />}
          prompt={TOKEN_PROMPTS.shadows}
        />

        {/* <TokenSection
          id="layout"
          title="Layout"
          description="Layout tokens define breakpoints for different screen sizes and container widths. Tell your AI which container size to use and when layouts should change, instead of writing custom media queries or arbitrary widths."
          visual={<LayoutVisual />}
          tokenList={<LayoutTokenList />}
          prompt={TOKEN_PROMPTS.layout}
        /> */}

        <TokenSection
          id="borders"
          title={tokenTypes.borders.title}
          description={tokenTypes.borders.description}
          visual={<BorderVisual />}
          tokenList={<BorderTokenList />}
          prompt={TOKEN_PROMPTS.borders}
        />
      </div>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-4xl leading-tight tracking-tight font-bold sm:text-3xl">
            Ready to level up your AI generated code?
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
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
