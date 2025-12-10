"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { TerminalIcon } from "../animate-ui/icons/terminal";
import { Button } from "../ui/button";

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
  const [isInView, setIsInView] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showUI, setShowUI] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Extract the token type from the title
  const tokenType = title.toLowerCase().replace(" tokens", "");
  const tabLink = generateTab || id;

  // Intersection observer to trigger animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  // Typing animation
  useEffect(() => {
    if (!isInView) return;

    let currentIndex = 0;
    const typingSpeed = 30;

    const typingInterval = setInterval(() => {
      if (currentIndex <= prompt.length) {
        setTypedText(prompt.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        // Wait longer to let user read the prompt
        setTimeout(() => {
          setShowUI(true);
        }, 1800);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [isInView, prompt]);

  return (
    <section id={id} ref={ref} className="">
      <Card>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:gap-12 lg:grid-cols-2 items-start">
            <div className="space-y-4 p-4">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="leading-relaxed text-md text-foreground/80">
                {description}
              </p>
              <div className="pt-2">
                <Button variant="link" size="sm" asChild>
                  <Link href={`/generate#${tabLink}`}>
                    Explore {title.toLowerCase()} tokens
                    <ArrowLongRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="border rounded-lg border-border/50">
              {tokenList ? (
                <Tabs defaultValue="visual" className="w-full">
                  <div className="border-b border-border/50 bg-muted px-4 py-2">
                    <TabsList className="h-8">
                      <TabsTrigger value="visual" className="text-xs">
                        Visual
                      </TabsTrigger>
                      <TabsTrigger value="tokens" className="text-xs">
                        Tokens
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent
                    value="visual"
                    className="p-6 mt-0 h-[400px] relative overflow-hidden"
                  >
                    {/* Prompt - starts centered, slides down */}
                    <div
                      className={`absolute inset-x-0 p-6 transition-all duration-700 ease-out ${
                        showUI
                          ? "bottom-0 top-auto"
                          : "inset-y-0 flex items-center justify-center"
                      }`}
                    >
                      <div className="relative flex items-start gap-4 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 w-full">
                        <div className="flex flex-col gap-2">
                          <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mt-0.5">
                            <TerminalIcon
                              size={16}
                              className="text-primary"
                              animate={isInView}
                              loop
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                          <div className="text-xs leading-relaxed text-muted-foreground break-words font-mono">
                            {typedText}
                            {!isTypingComplete && (
                              <span className="inline-block w-1.5 h-3 bg-primary ml-0.5 animate-pulse" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Visual - fades in above */}
                    <div
                      className={`transition-all duration-700 ease-out ${
                        showUI
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      {visual}
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="tokens"
                    className="p-6 mt-0 h-[400px] overflow-y-auto"
                  >
                    {tokenList}
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="p-6 h-[400px] relative overflow-hidden">
                  {/* Prompt - starts centered, slides down */}
                  <div
                    className={`absolute inset-x-0 p-6 transition-all duration-700 ease-out ${
                      showUI
                        ? "bottom-0 top-auto"
                        : "inset-y-0 flex items-center justify-center"
                    }`}
                  >
                    <div className="relative flex items-start gap-4 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 w-full">
                      <div className="flex flex-col gap-2">
                        <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mt-0.5">
                          <TerminalIcon
                            size={16}
                            className="text-primary"
                            animate={isInView}
                            loop
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <p className="text-sm font-medium">
                          Try a prompt like...
                        </p>
                        <div className="text-xs leading-relaxed text-muted-foreground break-words font-mono">
                          {typedText}
                          {!isTypingComplete && (
                            <span className="inline-block w-1.5 h-3 bg-primary ml-0.5 animate-pulse" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual - fades in above */}
                  <div
                    className={`transition-all duration-700 ease-out ${
                      showUI
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {visual}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
