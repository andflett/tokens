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
import { TokenDesignShowcaseV1 } from "@/components/home/token-design-showcase";
import { ExamplePrompt, TOKEN_PROMPTS } from "@/components/example-prompt";
import tokenTypes from "@/lib/token-types.json";

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState("design");

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero */}
      <section className="max-w-3xl text-center mx-auto pb-8 pt-12 md:pt-22 relative flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.15] tracking-tight relative">
          Why does everything I build with AI look like{" "}
          <span className="text-primary-600">turd</span>?
        </h1>
      </section>

      {/* Next Steps */}
      <section className="pb-18">
        <div className="mx-auto max-w-3xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-9">
              <AnimatedTabsList
                value={activeTab}
                onValueChange={setActiveTab}
                items={[
                  {
                    value: "design",
                    label: (
                      <>
                        <BrushIcon animateOnHover className="h-4 w-4 mr-1" />
                        Token Designer
                      </>
                    ),
                  },
                  {
                    value: "teach",
                    label: (
                      <>
                        <TerminalIcon animate loop className="h-4 w-4 mr-1" />
                        Token MCP Server
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
                          <h3 className="text-2xl font-serif font-medium">
                            Take control with design tokens
                          </h3>
                          <p className="text-foreground/85 text-md leading-6.5">
                            Tokens are the blueprint for every color, spacing
                            value, and corner in your app. Not a theme, but a
                            foundational design layer that keeps things
                            coherent. Without it, your AI's frontend will
                            eventually turn into a sloppy mess.
                          </p>
                          <Button
                            intent="default"
                            asChild
                            className="mt-4 self-start"
                          >
                            <Link href="/generate">
                              <BrushIcon
                                animateOnHover
                                className="h-4 w-4 mr-1"
                              />
                              Design Your AI-Friendly Tokens
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mr-[-6]">
                      {/* <TokenDesignShowcaseV4 /> */}
                      {/* <TokenShowcasePanel /> */}
                      <TokenDesignShowcaseV1 />
                      {/* <TokenDesignShowcaseV2 />
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
                          <h3 className="text-2xl font-medium font-serif mb-1">
                            Train your AI
                          </h3>
                          <p className="text-foreground/85 text-md">
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

      <section className="py-14">
        <div className="flex items-center gap-8 lg:gap-20">
          <div className="shrink-0 w-1/2">
            <AIInstructionsDemo />
          </div>
          <div className="space-y-6 mt-[-0.5rem]">
            <h2 className="text-4xl font-medium font-serif tracking-tight">
              Keep your AI on track
            </h2>
            <p className="text-md text-foreground/85 leading-relaxed">
              Even great AI designs drift over time. Tokens keep things
              consistent, but only if you tell your AI to use them. Once you've
              designed your tokens, instruct your AI to stick to them with our{" "}
              <Term term="claude-skills">Claude Skill</Term> or GitHub{" "}
              <Term term="copilot-instructions">Copilot Instructions</Term>
              to stop your designs from degrading into a sloppy mess.
            </p>
            <p className="text-md text-foreground/85 leading-relaxed">
              Read on to learn more about how modern styling systems use design
              tokens to create consistent, coherent UIs, and how to get your AI
              to do the same.
            </p>
          </div>
        </div>
      </section>

      <div className="space-y-28 mt-20">
        <TokenSection
          id="colors"
          title={tokenTypes.colors.title}
          description={tokenTypes.colors.description}
          visual={<ColorVisual />}
          prompt={TOKEN_PROMPTS.colors}
          index={0}
        />

        {/* Token type sections */}
        <TokenSection
          id="spacing"
          title={tokenTypes.spacing.title}
          description={tokenTypes.spacing.description}
          visual={<SpacingVisual />}
          prompt={TOKEN_PROMPTS.spacing}
          index={1}
        />

        <TokenSection
          id="typography"
          title={tokenTypes.typography.title}
          description={tokenTypes.typography.description}
          visual={<TypographyVisual />}
          prompt={TOKEN_PROMPTS.typography}
          index={2}
        />

        <TokenSection
          id="shadows"
          title={tokenTypes.shadows.title}
          description={tokenTypes.shadows.description}
          visual={<ShadowVisual />}
          prompt={TOKEN_PROMPTS.shadows}
          index={3}
        />

        <TokenSection
          id="borders"
          title={tokenTypes.borders.title}
          description={tokenTypes.borders.description}
          visual={<BorderVisual />}
          prompt={TOKEN_PROMPTS.borders}
          index={4}
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
