"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "./copy-button";

export const SHARED_INSTRUCTIONS = `# Design Tokens

Always use design tokens from our design system. Never use arbitrary values, custom colors, or hardcoded pixels.

## Colors

Use semantic color tokens, not hex values or primitive scales. Follow this hierarchy:

### 1. Semantic Colors (Use First)
Pay close attention to layering and foreground/background relationships:

**Primary Colors:**
- \`primary\`: Primary brand color for buttons, links, focus states
- \`primary-foreground\`: Text on primary backgrounds
- \`primary-subdued\`: Subtle primary backgrounds (e.g., selected items, hover states)
- \`primary-subdued-foreground\`: Text on subdued primary backgrounds
- \`primary-highlight\`: Darker emphasis or active states for primary elements
- \`primary-highlight-foreground\`: Text on highlight primary backgrounds

**Secondary Colors:**
- \`secondary\`: Secondary brand color for less prominent actions
- \`secondary-foreground\`: Text on secondary backgrounds
- \`secondary-subdued\`: Subtle secondary backgrounds
- \`secondary-subdued-foreground\`: Text on subdued secondary backgrounds
- \`secondary-highlight\`: Darker emphasis or active states for secondary elements
- \`secondary-highlight-foreground\`: Text on highlight secondary backgrounds

**Neutral Colors:**
- \`neutral\`: Neutral color for tertiary actions
- \`neutral-foreground\`: Text on neutral backgrounds
- \`neutral-subdued\`: Subtle neutral backgrounds
- \`neutral-subdued-foreground\`: Text on subdued neutral backgrounds
- \`neutral-highlight\`: Darker emphasis for neutral elements
- \`neutral-highlight-foreground\`: Text on highlight neutral backgrounds

**Intent Colors (Use for Status/Feedback):**
- \`success\`, \`success-foreground\`: Positive outcomes, completed states
- \`success-subdued\`, \`success-subdued-foreground\`: Subtle success backgrounds
- \`success-highlight\`, \`success-highlight-foreground\`: Emphasis for success states
- \`destructive\`, \`destructive-foreground\`: Errors, dangerous actions
- \`destructive-subdued\`, \`destructive-subdued-foreground\`: Subtle error backgrounds
- \`destructive-highlight\`, \`destructive-highlight-foreground\`: Emphasis for error states
- \`warning\`, \`warning-foreground\`: Warnings, important notices
- \`warning-subdued\`, \`warning-subdued-foreground\`: Subtle warning backgrounds
- \`warning-highlight\`, \`warning-highlight-foreground\`: Emphasis for warning states

**Surface & Utility Colors:**
- \`background\`: Page background
- \`foreground\`: Primary text color
- \`card\`, \`card-foreground\`: Card/panel backgrounds and text
- \`popover\`, \`popover-foreground\`: Popover/dropdown backgrounds and text
- \`muted\`, \`muted-foreground\`: Muted/disabled backgrounds and secondary text
- \`accent\`, \`accent-foreground\`: Subtle accents (neutral-based, not a brand color)
- \`border\`: Default borders
- \`input\`: Input field borders
- \`ring\`: Focus ring color

### 2. Primitive Scales (Use Sparingly)
Only use primitive color scales when semantic tokens don't fit:
- \`primary-50\` through \`primary-950\`: Full primary color scale
- \`secondary-50\` through \`secondary-950\`: Full secondary color scale
- \`neutral-50\` through \`neutral-950\`: Full neutral color scale
- \`success-50\` through \`success-950\`: Full success color scale
- \`destructive-50\` through \`destructive-950\`: Full destructive color scale
- \`warning-50\` through \`warning-950\`: Full warning color scale
- Use these for custom gradients, illustrations, or unique design needs

**Example:**
❌ Don't: \`bg-primary-500 text-white\`
✅ Do: \`bg-primary text-primary-foreground\`

❌ Don't: \`bg-green-100 text-green-800\`
✅ Do: \`bg-success-subdued text-success-subdued-foreground\`

❌ Don't: \`bg-red-50 text-red-700\`
✅ Do: \`bg-destructive-subdued text-destructive-subdued-foreground\`

## Spacing
- Always use our spacing scale from our tailwind config, never absolute pixel values
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

const CLAUDE_INSTRUCTIONS = SHARED_INSTRUCTIONS;

export const COPILOT_INSTRUCTIONS = `---
applyTo: "**"
---

${SHARED_INSTRUCTIONS}`;

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
          <div className="h-3 w-3 rounded-full bg-red-600" />
          <div className="h-3 w-3 rounded-full bg-yellow-600" />
          <div className="h-3 w-3 rounded-full bg-green-600" />
        </div>

        {/* Tabs */}
        <div className="flex-1 flex items-center justify-center gap-1">
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
      <div className="p-6 h-[350px] bg-neutral-950 relative overflow-hidden">
        {/* Copy button positioned in top right of text area */}
        <div className="absolute top-4 right-4 z-10">
          <CopyButton text={instructions} />
        </div>

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
      </div>
    </div>
  );
}
