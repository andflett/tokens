"use client";

import { TerminalIcon } from "@/components/animate-ui/icons/terminal";
import { CopyButton } from "@/components/home/copy-button";

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

  if (!promptText) return null;

  return (
    <div
      className={`flex items-start gap-4 border shadow-lg shadow-primary-subdued rounded-lg p-4 ${
        className || ""
      }`}
    >
      <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mt-0.5">
        <TerminalIcon size={16} className="text-primary" animate loop />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="text-xs leading-relaxed text-muted-foreground break-words font-mono">
          {promptText}
        </div>
      </div>
      <CopyButton text={promptText} className="flex-shrink-0" />
    </div>
  );
}
