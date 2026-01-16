"use client";

import { useState } from "react";
import { TerminalIcon } from "@/components/animate-ui/icons/terminal";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";

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
  animations:
    "Add a fast transition on button hover states, use normal duration for card expand/collapse, and slow duration with spring easing for modal entry",
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
      className={`border border-border/50 rounded-lg bg-background shadow-lg overflow-hidden ${
        className || ""
      }`}
    >
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-card border-b border-border/50">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium">Example prompt</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7">
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
      {/* Input area */}
      <div className="px-4 py-4 flex items-start gap-3 bg-card">
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
    </div>
  );
}
