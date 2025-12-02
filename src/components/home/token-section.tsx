"use client";

import { CopyButton } from "./copy-button";
import { AnimatedTokenVisual } from "./animated-token-visual";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";
import { TerminalIcon } from "../animate-ui/icons/terminal";

export function TokenSection({
  id,
  title,
  description,
  visual,
  tokenList,
  prompt,
  generateTab,
}: {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  tokenList?: React.ReactNode;
  prompt: string;
  /** The tab name to link to on the generate page */
  generateTab?: string;
}) {
  // Extract the token type from the title (e.g., "Spacing Tokens" -> "spacing")
  const tokenType = title.toLowerCase().replace(" tokens", "");
  const tabLink = generateTab || id;

  return (
    <section id={id} className="">
      <div className="grid gap-6 md:gap-12 lg:grid-cols-2 lg:gap-18 items-start">
        <div>
          <h2 className="text-3xl font-extrabold mb-4">{title}</h2>
          <p className="mb-6 leading-relaxed">{description}</p>

          {/* Command palette style prompt */}
          <div className="relative flex items-start gap-4 bg-background">
            <div className="flex flex-col gap-2">
              <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mt-0.5">
                <TerminalIcon
                  size={16}
                  className="text-primary"
                  animate
                  animateOnView
                  loop
                />
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <p className="text-sm font-medium">Try a prompt like...</p>
              <div className="text-xs leading-relaxed text-muted-foreground break-words font-mono pr-0 md:pr-8">
                {prompt}
              </div>
            </div>
          </div>
        </div>

        <AnimatedTokenVisual>
          <Card className="relative overflow-hidden p-0">
            {tokenList ? (
              <Tabs defaultValue="visual" className="w-full">
                <div className="border-b bg-muted/30 px-4 py-2">
                  <TabsList className="h-8">
                    <TabsTrigger value="visual" className="text-xs">
                      Visual
                    </TabsTrigger>
                    <TabsTrigger value="tokens" className="text-xs">
                      Tokens
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="visual" className="p-6 mt-0">
                  {visual}
                </TabsContent>
                <TabsContent value="tokens" className="p-6 mt-0">
                  {tokenList}
                </TabsContent>
              </Tabs>
            ) : (
              <div className="p-6">{visual}</div>
            )}
          </Card>
        </AnimatedTokenVisual>
      </div>
    </section>
  );
}
