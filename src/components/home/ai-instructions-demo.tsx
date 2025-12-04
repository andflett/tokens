"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "./copy-button";

const CLAUDE_INSTRUCTIONS = `# Core Principles

- Always use design tokens from our design system
- Never use arbitrary values or custom colors
- Tokens ensure consistency across the application

## Colors

Use semantic color tokens, not hex codes:

- Background layers: \`background\`, \`card\`, \`popover\`
- Text: \`foreground\`, \`muted-foreground\`, \`primary\`
- Borders: \`border\`, \`input\`
- States: \`destructive\`, \`success\`, \`warning\`

## Spacing
Use the spacing scale (4px increments):
- Scale: \`1\` (4px), \`2\` (8px), \`4\` (16px), \`6\` (24px), \`8\` (32px)
- Apply to padding, margins, and gaps
- Example: "Add 6 units of spacing between cards"

## Typography
Use the type scale, not pixel values:
- Sizes: \`xs\`, \`sm\`, \`base\`, \`lg\`, \`xl\`, \`2xl\`, \`3xl\`
- Weights: \`normal\`, \`medium\`, \`semibold\`, \`bold\`
- Example: "Make headings xl and bold"

## Shadows
Use preset shadow levels:
- \`sm\`: Subtle elevation for cards
- \`md\`: Standard elevation for dropdowns  
- \`lg\`: Pronounced elevation for modals

## Layout
Use container and breakpoint tokens:
- Containers: \`sm\`, \`md\`, \`lg\`, \`xl\`, \`2xl\`, \`4xl\`
- Breakpoints: \`tablet\`, \`desktop\`, \`wide\`

## Borders
Use border width tokens:
- Widths: \`default\` (1px), \`md\` (2px), \`lg\` (4px)
- Radius: \`sm\`, \`md\`, \`lg\`, \`full\``;

const COPILOT_INSTRUCTIONS = `---
applyTo: "**"
---

# Design Tokens

Always use design tokens from our design system. Never use arbitrary values, custom colors, or hardcoded pixels.

## Colors
Use semantic color tokens, not hex values:
- Backgrounds: \`background\`, \`card\`, \`popover\`
- Text: \`foreground\`, \`muted-foreground\`
- Borders: \`border\`, \`input\`
- Accents: \`primary\`, \`secondary\`, \`accent\`

## Spacing
Follow the 4px spacing scale:
- Use spacing units: 1, 2, 4, 6, 8, 12, 16, 20, 24
- Example: "Add 6 units between elements" means 24px
- Apply to padding, margins, and gaps consistently

## Typography
Use the type scale tokens:
- Sizes: xs, sm, base, lg, xl, 2xl, 3xl
- Weights: normal, medium, semibold, bold
- Never specify font-size in pixels

## Shadows
Use preset shadow tokens:
- sm: Subtle cards and surfaces
- md: Dropdowns and popovers
- lg: Modals and overlays

## Borders
Use border tokens:
- Widths: default (1px), md (2px), lg (4px)
- Radius: sm, md, lg, full
- Always use \`border\` color token`;

type TabType = "claude" | "copilot";

export function AIInstructionsDemo() {
  const [activeTab, setActiveTab] = useState<TabType>("claude");
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const instructions =
    activeTab === "claude" ? CLAUDE_INSTRUCTIONS : COPILOT_INSTRUCTIONS;
  const filename =
    activeTab === "claude" ? "claude.md" : ".github/copilot-instructions.md";

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    setShowCursor(true);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= instructions.length) {
        setDisplayedText(instructions.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 8);

    return () => clearInterval(interval);
  }, [instructions]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="relative rounded-lg border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between gap-2 border-b border-neutral-800 bg-neutral-900 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-neutral-700" />
          <div className="h-3 w-3 rounded-full bg-neutral-700" />
          <div className="h-3 w-3 rounded-full bg-neutral-700" />
        </div>

        {/* Subtle tabs */}
        <div className="flex-1 flex items-center justify-end gap-1">
          <button
            onClick={() => setActiveTab("claude")}
            className={`px-3 py-1 text-xs font-mono transition-colors ${
              activeTab === "claude"
                ? "text-neutral-200 bg-neutral-800"
                : "text-neutral-500 hover:text-neutral-300"
            } rounded`}
          >
            claude.md
          </button>
          <button
            onClick={() => setActiveTab("copilot")}
            className={`px-3 py-1 text-xs font-mono transition-colors ${
              activeTab === "copilot"
                ? "text-neutral-200 bg-neutral-800"
                : "text-neutral-500 hover:text-neutral-300"
            } rounded`}
          >
            copilot-instructions.md
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-6 h-[280px] bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 p-6 overflow-hidden">
          <pre className="font-mono text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed">
            {!isComplete && displayedText.length === 0 && showCursor && (
              <span className="inline-block w-2 h-4 bg-neutral-400" />
            )}
            {displayedText}
            {!isComplete && displayedText.length > 0 && (
              <span
                className={`inline-block w-2 h-4 ml-0.5 bg-neutral-400 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </pre>
        </div>

        {/* Fade to transparent gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />

        {/* Copy button positioned in bottom right */}
        <div className="absolute bottom-4 right-4">
          <CopyButton text={instructions} />
        </div>
      </div>
    </div>
  );
}
