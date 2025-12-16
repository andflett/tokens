"use client";

import { useState } from "react";
import { TerminalIcon } from "@/components/animate-ui/icons/terminal";
import { Button } from "./ui/button";

export const TOKEN_PROMPTS: Record<string, string> = {
  colors:
    "Use the card background color with its foreground for this section, and primary with primary-foreground for the button",
  spacing:
    "Add consistent spacing between these cards using our spacing scale (6 units), and set padding inside each card to 8 units",
  typography:
    "Make all headings extra-large and bold, body text should be the base size, and captions should be small with muted color",
  radii:
    "Use the medium radius for cards and buttons, and large radius for the main container",
  shadows:
    "Add a small shadow to cards in their default state, and increase to medium on hover to show interactivity",
  borders:
    "Add a default border to all cards, and use a thicker border with the primary color on the active card to highlight it",
  layout:
    "Set the main content container to our 4xl width token and center it. On tablet and larger, add more horizontal padding",
};

interface ExamplePromptProps {
  type?: keyof typeof TOKEN_PROMPTS;
  prompt?: string;
  className?: string;
}

export function ExamplePrompt({ type, prompt, className }: ExamplePromptProps) {
  const promptText = prompt || (type ? TOKEN_PROMPTS[type] : undefined);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!promptText) return;
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!promptText) return null;

  return (
    <div
      className={`border border-border/50 rounded-lg bg-card shadow-lg overflow-hidden ${
        className || ""
      }`}
    >
      {/* Input area */}
      <div className="px-4 py-4 flex items-start gap-3">
        <TerminalIcon
          size={16}
          className="text-primary mt-1 shrink-0"
          animate
          loop
        />
        <p className="text-sm text-foreground/90 italic leading-relaxed">
          {promptText}
        </p>
      </div>
      {/* Bottom toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-t border-border/50">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium">Example prompt</span>
        </div>
        <Button
          variant={"ghost"}
          size="sm"
          intent={"secondary"}
          onClick={handleCopy}
          className={`transition-all flex items-center ${
            copied
              ? "bg-success-500 text-white hover:bg-success-500 hover:text-white focus:bg-success-500 focus:text-white"
              : ""
          }`}
        >
          {copied ? (
            <>
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                />
              </svg>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
