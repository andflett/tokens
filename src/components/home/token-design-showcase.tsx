"use client";

import { useState } from "react";
import {
  FontSizeIcon,
  LetterSpacingIcon,
  LineHeightIcon,
  SpaceEvenlyHorizontallyIcon,
  BorderWidthIcon,
  CornerBottomLeftIcon,
  ShadowIcon,
} from "@radix-ui/react-icons";

/**
 * Variation 1: Compact Grid Layout
 * Shows multiple token types in a clean grid
 */
export function TokenDesignShowcaseV1() {
  return (
    <div className="border border-border shadow-primary-subdued shadow-lg bg-card rounded-xl p-4 space-y-4">
      {/* Color Scale */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-primary-500" />
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Primary
          </span>
        </div>
        <div className="flex gap-1">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div
              key={shade}
              className="h-6 w-full rounded"
              style={{
                backgroundColor: `oklch(${100 - shade / 10}% 0.15 300)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Typography Controls */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Typography</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-muted/50 rounded px-2 py-1.5">
            <LineHeightIcon className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs">1.5</span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 rounded px-2 py-1.5">
            <LetterSpacingIcon className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs">0em</span>
          </div>
        </div>
      </div>

      {/* Spacing & Borders */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">
          Spacing & Borders
        </p>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-2 bg-muted/50 rounded px-2 py-1.5">
            <SpaceEvenlyHorizontallyIcon className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs">4px</span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 rounded px-2 py-1.5">
            <CornerBottomLeftIcon className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs">8px</span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 rounded px-2 py-1.5">
            <BorderWidthIcon className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs">1px</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Variation 2: Vertical Stack with Labels
 * Figma-style property panel
 */
export function TokenDesignShowcaseV2() {
  return (
    <div className="border border-primary/15 shadow-primary/20 bg-card rounded-xl p-3 space-y-3">
      {/* Color Palette */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-primary-500" />
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Primary
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {[100, 300, 500, 700, 900].map((shade) => (
            <div
              key={shade}
              className="h-7 rounded border border-border/50"
              style={{
                backgroundColor: `oklch(${100 - shade / 10}% 0.15 300)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Typography */}
      <div className="space-y-2">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Text
        </span>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between bg-muted/30 rounded px-2 py-1">
            <div className="flex items-center gap-1.5">
              <FontSizeIcon className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Size</span>
            </div>
            <span className="text-xs font-mono">16</span>
          </div>
          <div className="flex items-center justify-between bg-muted/30 rounded px-2 py-1">
            <div className="flex items-center gap-1.5">
              <LineHeightIcon className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Height</span>
            </div>
            <span className="text-xs font-mono">1.5</span>
          </div>
          <div className="flex items-center justify-between bg-muted/30 rounded px-2 py-1">
            <div className="flex items-center gap-1.5">
              <LetterSpacingIcon className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Tracking</span>
            </div>
            <span className="text-xs font-mono">0</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Effects */}
      <div className="space-y-2">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Effects
        </span>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between bg-muted/30 rounded px-2 py-1">
            <div className="flex items-center gap-1.5">
              <CornerBottomLeftIcon className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Radius</span>
            </div>
            <span className="text-xs font-mono">8px</span>
          </div>
          <div className="flex items-center justify-between bg-muted/30 rounded px-2 py-1">
            <div className="flex items-center gap-1.5">
              <ShadowIcon className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Shadow</span>
            </div>
            <span className="text-xs font-mono">md</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Variation 3: Interactive Card Grid
 * Shows token categories as interactive cards
 */
export function TokenDesignShowcaseV3() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const tokenCategories = [
    {
      id: "colors",
      icon: (
        <div className="flex gap-0.5">
          {[300, 500, 700].map((shade) => (
            <div
              key={shade}
              className="h-3 w-3 rounded-sm"
              style={{
                backgroundColor: `oklch(${100 - shade / 10}% 0.15 300)`,
              }}
            />
          ))}
        </div>
      ),
      label: "Colors",
    },
    {
      id: "type",
      icon: <FontSizeIcon className="h-3.5 w-3.5" />,
      label: "Type",
    },
    {
      id: "space",
      icon: <SpaceEvenlyHorizontallyIcon className="h-3.5 w-3.5" />,
      label: "Space",
    },
    {
      id: "radius",
      icon: <CornerBottomLeftIcon className="h-3.5 w-3.5" />,
      label: "Radius",
    },
    {
      id: "borders",
      icon: <BorderWidthIcon className="h-3.5 w-3.5" />,
      label: "Borders",
    },
    {
      id: "shadows",
      icon: <ShadowIcon className="h-3.5 w-3.5" />,
      label: "Shadows",
    },
  ];

  return (
    <div className="border border-primary/15 shadow-primary/20 bg-card rounded-xl p-3">
      <div className="grid grid-cols-2 gap-2">
        {tokenCategories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center gap-1.5 bg-muted/30 hover:bg-muted/50 rounded-lg p-3 transition-colors cursor-pointer"
            onMouseEnter={() => setHoveredCard(category.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="text-muted-foreground">{category.icon}</div>
            <span className="text-[10px] font-medium text-muted-foreground">
              {category.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Variation 4: Detailed Inspector Panel
 * Most comprehensive, shows actual token values
 */
export function TokenDesignShowcaseV4() {
  return (
    <div className="border border-border/60 shadow-lg shadow-primary-subdued bg-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-muted/30 px-3 py-2 border-b border-border/50">
        <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider">
          Design Tokens
        </p>
      </div>

      <div className="p-5 space-y-3">
        {/* Color Scale Preview */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary-500" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Primary
            </span>
          </div>
          <div className="grid grid-cols-10 gap-0.5">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
              <div
                key={shade}
                className="h-5 rounded-sm border border-border/30"
                style={{
                  backgroundColor: `oklch(${100 - shade / 10}% 0.15 300)`,
                }}
                title={`${shade}`}
              />
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-1.5">
          <p className="text-[10px] text-muted-foreground font-medium">
            Typography
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between bg-primary-25/60 rounded px-2 py-1">
              <div className="flex items-center gap-1.5">
                <LineHeightIcon className="h-3 w-3 text-foreground" />
                <span className="text-xs text-muted-foreground">
                  Line Height
                </span>
              </div>
              <span className="text-xs font-mono">1.5</span>
            </div>
            <div className="flex items-center justify-between bg-primary-25/60 rounded px-2 py-1">
              <div className="flex items-center gap-1.5">
                <LetterSpacingIcon className="h-3 w-3 text-foreground" />
                <span className="text-xs text-muted-foreground">
                  Letter Spacing
                </span>
              </div>
              <span className="text-xs font-mono">0</span>
            </div>
          </div>
        </div>

        {/* Effects */}
        <div className="space-y-1.5">
          <p className="text-[10px] text-muted-foreground font-medium">
            Borders
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between bg-primary-25/60 rounded px-2 py-1">
              <div className="flex items-center gap-1.5">
                <CornerBottomLeftIcon className="h-3 w-3 text-foreground" />
                <span className="text-xs text-muted-foreground">Radius</span>
              </div>
              <span className="text-xs font-mono">8px</span>
            </div>
            <div className="flex items-center justify-between bg-primary-25/60 rounded px-2 py-1">
              <div className="flex items-center gap-1.5">
                <ShadowIcon className="h-3 w-3 text-foreground" />
                <span className="text-xs text-muted-foreground">Shadow</span>
              </div>
              <span className="text-xs font-mono">md</span>
            </div>
          </div>
        </div>

        {/* Spacing Scale */}
        {/*  <div className="space-y-1.5">
          <p className="text-[10px] text-muted-foreground font-medium">
            Spacing
          </p>
          <div className="flex gap-1">
            {[12, 8, 6, 4, 2, 1].map((value) => (
              <div
                key={value}
                className="flex-1 bg-primary-subdued rounded-sm"
                style={{ height: `${value * 2}px` }}
                title={`${value * 4}px`}
              />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
