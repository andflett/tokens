"use client";

import { SparkleIcon, TerminalIcon, CommandIcon } from "lucide-react";
import { CopyButton } from "@/components/home/copy-button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function PromptDesignsExploration() {
  const examplePrompt = `Generate spacing tokens for a design system that feels modern and spacious. Use a 1.5 scale ratio.`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Prompt Panel Design Exploration
          </h1>
          <p className="text-muted-foreground text-lg">
            Different approaches for the AI prompt interface. Consider how these
            sit alongside descriptive text and visualizations.
          </p>
        </div>

        <div className="space-y-16">
          {/* Option 1: Inline Terminal Style */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                1
              </div>
              <div>
                <h2 className="text-2xl font-bold">Inline Terminal</h2>
                <p className="text-sm text-muted-foreground">
                  Minimal, developer-focused, feels native to the IDE
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Some description text here about spacing tokens and how they
                  work in your design system. This would normally be the
                  context.
                </p>

                <div className="relative group">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                  <div className="relative bg-muted/40 backdrop-blur-sm rounded-lg border border-border/50 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-muted/30">
                      <TerminalIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono">
                        Try this prompt
                      </span>
                      <div className="ml-auto">
                        <CopyButton text={examplePrompt} />
                      </div>
                    </div>
                    <div className="p-4 font-mono text-sm leading-relaxed text-foreground/90">
                      <span className="text-primary/70">$</span> {examplePrompt}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-8 rounded-lg border bg-muted/20">
                <div className="text-center text-muted-foreground text-sm">
                  [Visualization would appear here]
                </div>
              </div>
            </div>
          </section>

          {/* Option 2: Code Editor Style */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                2
              </div>
              <div>
                <h2 className="text-2xl font-bold">Code Editor Window</h2>
                <p className="text-sm text-muted-foreground">
                  Familiar VS Code aesthetic, clear file metaphor
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Some description text here about spacing tokens and how they
                  work in your design system. This would normally be the
                  context.
                </p>

                <div className="relative group">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                  <div className="relative rounded-lg border border-border/50 overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 backdrop-blur-sm">
                    {/* Tabs */}
                    <div className="flex items-center gap-px bg-muted/50 border-b border-border/50">
                      <div className="flex items-center gap-2 px-4 py-2 bg-background/50 border-r border-border/50">
                        <SparkleIcon className="h-3.5 w-3.5 text-primary/70" />
                        <span className="text-xs font-mono text-foreground/80">
                          prompt.txt
                        </span>
                      </div>
                      <div className="flex-1" />
                    </div>

                    {/* Line numbers and content */}
                    <div className="flex">
                      <div className="flex flex-col py-3 px-3 text-xs font-mono text-muted-foreground/40 select-none bg-muted/20 border-r border-border/30">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                      </div>
                      <div className="flex-1 p-3 font-mono text-sm leading-relaxed text-foreground/90">
                        {examplePrompt}
                      </div>
                      <div className="pr-3 pt-3">
                        <CopyButton text={examplePrompt} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-8 rounded-lg border bg-muted/20">
                <div className="text-center text-muted-foreground text-sm">
                  [Visualization would appear here]
                </div>
              </div>
            </div>
          </section>

          {/* Option 3: Floating Command Palette */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                3
              </div>
              <div>
                <h2 className="text-2xl font-bold">Command Palette</h2>
                <p className="text-sm text-muted-foreground">
                  Lovable/v0 style, action-oriented, lightweight
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Some description text here about spacing tokens and how they
                  work in your design system. This would normally be the
                  context.
                </p>

                <div className="relative group py-2">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
                  <div className="relative flex items-start gap-3 px-4 py-3 rounded-xl bg-background/95 backdrop-blur-md border border-border shadow-lg">
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mt-0.5">
                      <CommandIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm leading-relaxed text-foreground/90 break-words">
                        {examplePrompt}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <CopyButton text={examplePrompt} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-8 rounded-lg border bg-muted/20">
                <div className="text-center text-muted-foreground text-sm">
                  [Visualization would appear here]
                </div>
              </div>
            </div>
          </section>

          {/* Option 4: Inline Suggestion */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                4
              </div>
              <div>
                <h2 className="text-2xl font-bold">Inline Suggestion</h2>
                <p className="text-sm text-muted-foreground">
                  Copilot-style, subtle, doesn't break flow
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Some description text here about spacing tokens and how they
                  work in your design system. This would normally be the
                  context.
                </p>

                <div className="relative pl-4 py-1">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50" />
                  <div className="flex items-start gap-3 py-2">
                    <SparkleIcon className="h-4 w-4 text-primary/70 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-muted-foreground/70 mb-1 font-medium">
                        Try this prompt
                      </div>
                      <div className="text-sm leading-relaxed text-foreground/80 font-mono break-words">
                        {examplePrompt}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <CopyButton text={examplePrompt} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-8 rounded-lg border bg-muted/20">
                <div className="text-center text-muted-foreground text-sm">
                  [Visualization would appear here]
                </div>
              </div>
            </div>
          </section>

          {/* Option 5: Glassmorphic Panel */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                5
              </div>
              <div>
                <h2 className="text-2xl font-bold">Glassmorphic Panel</h2>
                <p className="text-sm text-muted-foreground">
                  Modern, slightly elevated, premium feel
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Some description text here about spacing tokens and how they
                  work in your design system. This would normally be the
                  context.
                </p>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-background/60 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
                    <div className="relative p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                          <SparkleIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                            Example Prompt
                          </div>
                          <div className="text-sm leading-relaxed text-foreground/90 break-words">
                            {examplePrompt}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <CopyButton text={examplePrompt} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-8 rounded-lg border bg-muted/20">
                <div className="text-center text-muted-foreground text-sm">
                  [Visualization would appear here]
                </div>
              </div>
            </div>
          </section>

          {/* Option 6: Conversation Thread */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                6
              </div>
              <div>
                <h2 className="text-2xl font-bold">Thread Preview</h2>
                <p className="text-sm text-muted-foreground">
                  Shows context, feels conversational but compact
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Some description text here about spacing tokens and how they
                  work in your design system. This would normally be the
                  context.
                </p>

                <div className="space-y-3">
                  {/* User message */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground mt-0.5">
                      U
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="text-sm leading-relaxed text-foreground/90 break-words">
                        {examplePrompt}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <CopyButton text={examplePrompt} />
                    </div>
                  </div>

                  {/* AI thinking indicator */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary/60" />
                    </div>
                    <div className="flex items-center gap-1.5 pt-1">
                      <div className="flex gap-1">
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce"
                          style={{
                            animationDelay: "0ms",
                            animationDuration: "1.4s",
                          }}
                        />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce"
                          style={{
                            animationDelay: "200ms",
                            animationDuration: "1.4s",
                          }}
                        />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce"
                          style={{
                            animationDelay: "400ms",
                            animationDuration: "1.4s",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-8 rounded-lg border bg-muted/20">
                <div className="text-center text-muted-foreground text-sm">
                  [Visualization would appear here]
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Summary */}
        <div className="mt-16 p-6 rounded-lg border bg-muted/20">
          <h3 className="text-lg font-bold mb-3">Design Notes</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>Option 1 (Terminal):</strong> Most developer-native,
              minimal UI
            </li>
            <li>
              <strong>Option 2 (Code Editor):</strong> Familiar, clear file
              metaphor, slightly heavier
            </li>
            <li>
              <strong>Option 3 (Command Palette):</strong> Modern,
              action-focused, good for quick examples
            </li>
            <li>
              <strong>Option 4 (Inline):</strong> Most subtle, doesn't interrupt
              reading flow
            </li>
            <li>
              <strong>Option 5 (Glass):</strong> Premium feel, stands out more,
              good for emphasis
            </li>
            <li>
              <strong>Option 6 (Thread):</strong> Conversational, shows AI
              interaction, compact
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
