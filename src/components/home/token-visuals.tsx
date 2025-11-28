"use client";

import { useState, useEffect } from "react";
import { TokenLabel, SpacingOverlay } from "./token-label";

export function ColorVisual() {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[320px]">
      {/* Base background layer */}
      <TokenLabel
        label="bg-background"
        side="right"
        open={activeLayer === 0}
        sideOffset={12}
      >
        <div
          className={`absolute inset-0 rounded-xl bg-background border transition-all duration-500`}
        />
      </TokenLabel>

      {/* Card layer */}
      <div className="absolute inset-4 top-10">
        <TokenLabel
          label="bg-card"
          side="top"
          open={activeLayer === 1}
          sideOffset={8}
        >
          <div
            className={`rounded-lg bg-card border p-4 h-full transition-all duration-500`}
          >
            <div className="mt-4">
              <p className="text-sm font-medium text-card-foreground">
                Dashboard Overview
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Your weekly statistics
              </p>
            </div>

            {/* Primary button */}
            <div className="absolute bottom-4 right-4">
              <TokenLabel
                label="bg-primary"
                side="bottom"
                open={activeLayer === 3}
                sideOffset={8}
              >
                <div className="rounded-md bg-primary px-4 py-2">
                  <span className="text-sm font-medium text-primary-foreground">
                    View All
                  </span>
                </div>
              </TokenLabel>
            </div>
          </div>
        </TokenLabel>
      </div>

      {/* Popover layer */}
      <div className="absolute top-16 right-8">
        <TokenLabel
          label="bg-popover"
          side="left"
          open={activeLayer === 2}
          sideOffset={8}
        >
          <div
            className={`rounded-lg bg-popover border shadow-xl p-3 w-36 transition-all duration-500`}
          >
            <div className="space-y-1.5">
              <div className="text-xs text-popover-foreground hover:bg-muted rounded px-2 py-1 cursor-pointer">
                Edit profile
              </div>
              <div className="text-xs text-popover-foreground hover:bg-muted rounded px-2 py-1 cursor-pointer">
                Settings
              </div>
              <div className="text-xs text-destructive hover:bg-muted rounded px-2 py-1 cursor-pointer">
                Sign out
              </div>
            </div>
          </div>
        </TokenLabel>
      </div>
    </div>
  );
}

export function TypographyVisual() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const items = [
    {
      size: "text-2xl",
      weight: "font-bold",
      text: "Welcome Back",
      label: "text-2xl font-bold",
    },
    {
      size: "text-lg",
      weight: "font-semibold",
      text: "Recent Activity",
      label: "text-lg font-semibold",
    },
    {
      size: "text-base",
      weight: "font-normal",
      text: "Your dashboard shows real-time updates from your team and projects.",
      label: "text-base",
    },
    {
      size: "text-sm",
      weight: "font-normal text-muted-foreground",
      text: "Last updated 2 minutes ago",
      label: "text-sm text-muted-foreground",
    },
  ];

  return (
    <div className="relative min-h-[280px]">
      <div className="rounded-xl border bg-card p-6 space-y-6">
        {items.map((item, i) => (
          <TokenLabel
            key={i}
            label={item.label}
            side="right"
            open={activeIndex === i}
            sideOffset={12}
          >
            <div
              className={`${item.size} ${
                item.weight
              } transition-all duration-300 ${
                activeIndex === i ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {item.text}
            </div>
          </TokenLabel>
        ))}
      </div>
    </div>
  );
}

export function SpacingVisual() {
  const [activeSpace, setActiveSpace] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpace((prev) => (prev + 1) % 3);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[300px]">
      <TokenLabel
        label="p-8"
        side="top"
        open={activeSpace === 0}
        sideOffset={12}
      >
        <div className="rounded-xl border bg-card p-8 relative">
          {/* Padding overlay - Purple */}
          {activeSpace === 0 && (
            <div className="absolute inset-0 rounded-xl pointer-events-none">
              {/* Top padding */}
              <div className="absolute top-0 left-0 right-0 h-8 rounded-t-xl overflow-hidden">
                <SpacingOverlay type="padding" />
              </div>
              {/* Bottom padding */}
              <div className="absolute bottom-0 left-0 right-0 h-8 rounded-b-xl overflow-hidden">
                <SpacingOverlay type="padding" />
              </div>
              {/* Left padding */}
              <div className="absolute top-8 bottom-8 left-0 w-8 overflow-hidden">
                <SpacingOverlay type="padding" />
              </div>
              {/* Right padding */}
              <div className="absolute top-8 bottom-8 right-0 w-8 overflow-hidden">
                <SpacingOverlay type="padding" />
              </div>
            </div>
          )}

          <div className="relative">
            <TokenLabel
              label="gap-4"
              side="top"
              open={activeSpace === 1}
              sideOffset={8}
            >
              <div className="flex items-start gap-4 mb-6 relative">
                {/* Gap overlay between avatar and text - Blue */}
                {activeSpace === 1 && (
                  <div className="absolute left-12 top-0 bottom-0 w-4 overflow-hidden">
                    <SpacingOverlay type="gap" />
                  </div>
                )}
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <div className="w-6 h-6 rounded-full bg-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Project Update</p>
                  <p className="text-sm text-muted-foreground">
                    New features have been deployed
                  </p>
                </div>
              </div>
            </TokenLabel>

            <TokenLabel
              label="space-y-4"
              side="left"
              open={activeSpace === 2}
              sideOffset={12}
            >
              <div className="space-y-4 relative">
                {/* Space-y overlays between items - Green (margin-like) */}
                {activeSpace === 2 && (
                  <>
                    <div className="absolute left-0 right-0 top-[52px] h-4 overflow-hidden">
                      <SpacingOverlay type="margin" />
                    </div>
                    <div className="absolute left-0 right-0 top-[120px] h-4 overflow-hidden">
                      <SpacingOverlay type="margin" />
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm">Frontend</span>
                  <span className="text-xs text-muted-foreground">
                    Completed
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm">Backend</span>
                  <span className="text-xs text-muted-foreground">
                    In Progress
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm">Testing</span>
                  <span className="text-xs text-muted-foreground">Pending</span>
                </div>
              </div>
            </TokenLabel>
          </div>
        </div>
      </TokenLabel>
    </div>
  );
}

export function LayoutVisual() {
  const [activeBreakpoint, setActiveBreakpoint] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBreakpoint((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const breakpoints = [
    { name: "sm", pixels: "640px", widthPercent: 40, color: "bg-blue-400/40", emoji: "📱", label: "Mobile" },
    { name: "md", pixels: "768px", widthPercent: 55, color: "bg-purple-400/40", emoji: "📟", label: "Tablet" },
    { name: "lg", pixels: "1024px", widthPercent: 75, color: "bg-green-400/40", emoji: "🖥️", label: "Desktop" },
  ];

  return (
    <div className="relative min-h-[320px]">
      <div className="rounded-xl border bg-background p-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-medium text-muted-foreground">
            Responsive breakpoints at different screen widths
          </p>
        </div>

        {/* All viewports shown simultaneously */}
        <div className="space-y-4">
          {breakpoints.map((bp, i) => (
            <div key={bp.name} className="relative">
              {/* Viewport mockup */}
              <div 
                className={`relative mx-auto transition-all duration-500 ${
                  activeBreakpoint === i ? "scale-[1.02]" : "scale-100 opacity-70"
                }`}
                style={{ width: `${bp.widthPercent}%` }}
              >
                {/* Browser chrome mini */}
                <div className={`rounded-t-lg border border-b-0 px-2 py-1.5 flex items-center gap-1.5 ${
                  activeBreakpoint === i ? "bg-muted" : "bg-muted/50"
                }`}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex-1 h-4 rounded bg-background/50 flex items-center justify-center">
                    <span className="text-[8px] text-muted-foreground font-mono">
                      {bp.pixels}
                    </span>
                  </div>
                </div>

                {/* Viewport content */}
                <div className={`rounded-b-lg border p-3 ${bp.color} transition-all duration-300`}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm">{bp.emoji}</span>
                    <div className="text-center">
                      <p className="text-[10px] font-semibold">{bp.label}</p>
                      <p className="text-[8px] text-foreground/60 font-mono">@{bp.name}</p>
                    </div>
                  </div>
                </div>

                {/* Token label for active */}
                {activeBreakpoint === i && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full">
                    <div className="border border-purple-300 border-dashed inline-flex items-center rounded-full bg-purple-200 px-2 py-0.5 text-[10px] font-mono whitespace-nowrap text-foreground shadow-lg">
                      --breakpoint-{bp.name}: {bp.pixels}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 pt-2 border-t">
          {breakpoints.map((bp, i) => (
            <button
              key={bp.name}
              onClick={() => setActiveBreakpoint(i)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium transition-all ${
                activeBreakpoint === i
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{bp.emoji}</span>
              <span>{bp.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BorderVisual() {
  const [activeBorder, setActiveBorder] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBorder((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[280px]">
      <div className="rounded-xl border bg-card p-6">
        {/* Input field example */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">
            Email address
          </label>
          <TokenLabel
            label="border-input"
            side="right"
            open={activeBorder === 0}
            sideOffset={8}
          >
            <input
              type="text"
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-md bg-background text-sm border border-input"
              readOnly
            />
          </TokenLabel>
        </div>

        {/* Card with border examples - this section demonstrates different border widths */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { width: "border", label: "border", active: 1 },
            { width: "border-2", label: "border-2", active: 2 },
            { width: "border-4", label: "border-4", active: 3 },
          ].map((item, i) => (
            <TokenLabel
              key={i}
              label={item.label}
              side="bottom"
              open={activeBorder === item.active}
              sideOffset={8}
            >
              <div
                className={`p-4 rounded-lg bg-muted/30 transition-all duration-300 ${
                  item.width
                } ${
                  activeBorder === item.active
                    ? "border-purple-400"
                    : "border-border"
                }`}
              >
                <div className="h-8 w-8 mx-auto rounded bg-primary/20 mb-2" />
                <p className="text-[10px] text-center text-muted-foreground">
                  Item
                </p>
              </div>
            </TokenLabel>
          ))}
        </div>

        {/* Divider example */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Divider using border-t border-border
          </p>
        </div>
      </div>
    </div>
  );
}

export function ShadowVisual() {
  const [activeShadow, setActiveShadow] = useState(0);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovering === null) {
        setActiveShadow((prev) => (prev + 1) % 3);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const shadows = [
    { name: "sm", shadow: "shadow-sm", description: "Subtle depth" },
    { name: "md", shadow: "shadow-md", description: "Medium depth" },
    { name: "lg", shadow: "shadow-lg", description: "Strong depth" },
  ];

  return (
    <div className="relative min-h-[300px]">
      <div className="grid grid-cols-3 gap-4">
        {shadows.map((item, i) => (
          <TokenLabel
            key={i}
            label={`shadow-${item.name}`}
            side="bottom"
            open={activeShadow === i || isHovering === i}
            sideOffset={8}
          >
            <div
              className="relative"
              onMouseEnter={() => setIsHovering(i)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div
                className={`bg-card border rounded-xl p-4 cursor-pointer transition-all duration-500 ${item.shadow}`}
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 mb-3 flex items-center justify-center">
                  <div className="w-4 h-4 rounded bg-primary/60" />
                </div>
                <p className="text-xs font-medium text-center">Card</p>
                <p className="text-[10px] text-muted-foreground text-center mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          </TokenLabel>
        ))}
      </div>

      {/* Shadow comparison bar */}
      <div className="mt-8 flex items-center justify-between px-4">
        <span className="text-[10px] text-muted-foreground">
          Less elevation
        </span>
        <div className="flex-1 mx-4 h-1 bg-gradient-to-r from-muted to-foreground/30 rounded-full" />
        <span className="text-[10px] text-muted-foreground">
          More elevation
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// TOKEN LIST COMPONENTS - For the "Tokens" tab showing actual token values
// ============================================================================

// Spacing token list with scaled bars
const SPACING_BAR_SCALE = 2; // Multiplier for visual bar width
const MAX_SPACING_BAR_WIDTH = 160; // Maximum bar width in pixels

export function SpacingTokenList() {
  const spacingTokens = [
    { name: "1", value: "0.25rem", px: 4 },
    { name: "2", value: "0.5rem", px: 8 },
    { name: "3", value: "0.75rem", px: 12 },
    { name: "4", value: "1rem", px: 16 },
    { name: "6", value: "1.5rem", px: 24 },
    { name: "8", value: "2rem", px: 32 },
    { name: "12", value: "3rem", px: 48 },
    { name: "16", value: "4rem", px: 64 },
  ];

  return (
    <div className="space-y-2">
      {spacingTokens.map((token) => (
        <div key={token.name} className="flex items-center gap-3">
          <div className="w-8 font-mono text-xs text-muted-foreground">
            {token.name}
          </div>
          <div
            className="h-5 bg-primary/30 rounded-sm"
            style={{ width: `${Math.min(token.px * SPACING_BAR_SCALE, MAX_SPACING_BAR_WIDTH)}px` }}
          />
          <div className="font-mono text-xs text-muted-foreground">
            {token.value}{" "}
            <span className="text-muted-foreground/50">({token.px}px)</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Color token list showing semantic colors
export function ColorTokenList() {
  const colorTokens = [
    { name: "background", desc: "Base layer", color: "bg-background" },
    { name: "foreground", desc: "Text on background", color: "bg-foreground" },
    { name: "card", desc: "Card backgrounds", color: "bg-card" },
    { name: "primary", desc: "Brand color", color: "bg-primary" },
    { name: "secondary", desc: "Supporting color", color: "bg-secondary" },
    { name: "muted", desc: "Subtle backgrounds", color: "bg-muted" },
    { name: "accent", desc: "Highlight color", color: "bg-accent" },
    { name: "destructive", desc: "Error/danger", color: "bg-destructive" },
  ];

  return (
    <div className="space-y-2">
      {colorTokens.map((token) => (
        <div key={token.name} className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-md border ${token.color}`} />
          <div className="flex-1">
            <div className="font-mono text-xs">{token.name}</div>
            <div className="text-[10px] text-muted-foreground">{token.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Typography token list
export function TypographyTokenList() {
  const typographyTokens = [
    { name: "text-xs", size: "0.75rem", sample: "Aa" },
    { name: "text-sm", size: "0.875rem", sample: "Aa" },
    { name: "text-base", size: "1rem", sample: "Aa" },
    { name: "text-lg", size: "1.125rem", sample: "Aa" },
    { name: "text-xl", size: "1.25rem", sample: "Aa" },
    { name: "text-2xl", size: "1.5rem", sample: "Aa" },
    { name: "text-3xl", size: "1.875rem", sample: "Aa" },
  ];

  return (
    <div className="space-y-2">
      {typographyTokens.map((token) => (
        <div key={token.name} className="flex items-center gap-3">
          <div className="w-16 font-mono text-xs text-muted-foreground">
            {token.name.replace("text-", "")}
          </div>
          <div style={{ fontSize: token.size }} className="w-12 font-medium">
            {token.sample}
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            {token.size}
          </div>
        </div>
      ))}
    </div>
  );
}

// Shadow token list
export function ShadowTokenList() {
  const shadowTokens = [
    { name: "shadow-sm", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
    { name: "shadow", value: "0 1px 3px 0 rgb(0 0 0 / 0.1)" },
    { name: "shadow-md", value: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
    { name: "shadow-lg", value: "0 10px 15px -3px rgb(0 0 0 / 0.1)" },
    { name: "shadow-xl", value: "0 20px 25px -5px rgb(0 0 0 / 0.1)" },
  ];

  return (
    <div className="space-y-3">
      {shadowTokens.map((token) => (
        <div key={token.name} className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-md bg-card border"
            style={{ boxShadow: token.value }}
          />
          <div className="flex-1">
            <div className="font-mono text-xs">{token.name}</div>
            <div className="text-[10px] text-muted-foreground truncate max-w-[150px]">
              {token.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Layout token list showing breakpoints
const MAX_SCREEN_WIDTH = 1536; // Reference width for calculating bar percentages

export function LayoutTokenList() {
  const layoutTokens = [
    { name: "sm", value: "640px", desc: "Small devices" },
    { name: "md", value: "768px", desc: "Tablets" },
    { name: "lg", value: "1024px", desc: "Laptops" },
    { name: "xl", value: "1280px", desc: "Desktops" },
    { name: "2xl", value: "1536px", desc: "Large screens" },
  ];

  return (
    <div className="space-y-2">
      {layoutTokens.map((token) => (
        <div key={token.name} className="flex items-center gap-3">
          <div className="w-8 font-mono text-xs font-medium">{token.name}</div>
          <div className="flex-1">
            <div
              className="h-4 bg-primary/30 rounded-sm"
              style={{ width: `${(parseInt(token.value) / MAX_SCREEN_WIDTH) * 100}%` }}
            />
          </div>
          <div className="font-mono text-xs text-muted-foreground w-16 text-right">
            {token.value}
          </div>
        </div>
      ))}
    </div>
  );
}

// Border token list
export function BorderTokenList() {
  const borderTokens = [
    { name: "border", value: "1px", style: "solid" },
    { name: "border-2", value: "2px", style: "solid" },
    { name: "border-4", value: "4px", style: "solid" },
    { name: "border-dashed", value: "1px", style: "dashed" },
    { name: "border-dotted", value: "1px", style: "dotted" },
  ];

  return (
    <div className="space-y-3">
      {borderTokens.map((token) => (
        <div key={token.name} className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-md bg-card"
            style={{
              border: `${token.value} ${token.style} currentColor`,
              opacity: 0.5,
            }}
          />
          <div className="flex-1">
            <div className="font-mono text-xs">{token.name}</div>
            <div className="text-[10px] text-muted-foreground">
              {token.value} {token.style}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
