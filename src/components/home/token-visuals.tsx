"use client";

import { useState } from "react";

function TokenLabel({ label, visible }: { label: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
      <div className="inline-flex items-center rounded bg-foreground px-2 py-1 text-[10px] font-mono text-background border border-border whitespace-nowrap shadow-md">
        {label}
      </div>
    </div>
  );
}

export function ColorVisual() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered || "background";

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="relative">
          {/* Background layer */}
          <div
            className={`relative bg-background border rounded-lg p-3 transition-all ${
              active === "background"
                ? "border-primary ring-2 ring-primary/20"
                : "border-border"
            }`}
            onMouseEnter={() => setHovered("background")}
            onMouseLeave={() => setHovered(null)}
          >
            <TokenLabel
              label="bg-background"
              visible={active === "background"}
            />

            {/* Card layer */}
            <div
              className={`relative bg-card border rounded-lg p-3 shadow-sm transition-all ${
                active === "card"
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              }`}
              onMouseEnter={() => setHovered("card")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel label="bg-card" visible={active === "card"} />

              {/* Intent color examples */}
              <div className="space-y-2 mb-3">
                <div
                  className={`relative rounded bg-success-subdued border px-2 py-1 text-[10px] text-success-subdued-foreground transition-all cursor-pointer ${
                    active === "success"
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-success"
                  }`}
                  onMouseEnter={() => setHovered("success")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <TokenLabel
                    label="bg-success-subdued"
                    visible={active === "success"}
                  />
                  Deploy completed successfully
                </div>
                <div
                  className={`relative rounded bg-warning-subdued border px-2 py-1 text-[10px] text-warning-subdued-foreground transition-all cursor-pointer ${
                    active === "warning"
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-warning"
                  }`}
                  onMouseEnter={() => setHovered("warning")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <TokenLabel
                    label="bg-warning-subdued"
                    visible={active === "warning"}
                  />
                  API rate limit approaching
                </div>
                <div
                  className={`relative rounded bg-destructive-subdued border px-2 py-1 text-[10px] text-destructive-subdued-foreground transition-all cursor-pointer ${
                    active === "destructive"
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-destructive"
                  }`}
                  onMouseEnter={() => setHovered("destructive")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <TokenLabel
                    label="bg-destructive-subdued"
                    visible={active === "destructive"}
                  />
                  Database connection failed
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  className={`relative px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs font-medium transition-all ${
                    active === "primary" ? "ring-2 ring-primary/50" : ""
                  }`}
                  onMouseEnter={() => setHovered("primary")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <TokenLabel
                    label="bg-primary"
                    visible={active === "primary"}
                  />
                  Primary
                </button>
                <button
                  className={`relative px-3 py-1.5 bg-muted text-muted-foreground rounded text-xs font-medium border transition-all ${
                    active === "muted"
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border"
                  }`}
                  onMouseEnter={() => setHovered("muted")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <TokenLabel label="bg-muted" visible={active === "muted"} />
                  Secondary
                </button>
              </div>
            </div>

            {/* Popover layer */}
            <div
              className={`absolute top-6 right-3 bg-popover border rounded-lg shadow-lg p-2 w-28 transition-all ${
                active === "popover"
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              }`}
              onMouseEnter={() => setHovered("popover")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel label="bg-popover" visible={active === "popover"} />
              <div className="space-y-0.5">
                <div className="text-[10px] text-popover-foreground rounded px-1.5 py-0.5 bg-accent">
                  Selected
                </div>
                <div className="text-[10px] text-popover-foreground rounded px-1.5 py-0.5">
                  Option
                </div>
                <div className="text-[10px] text-destructive rounded px-1.5 py-0.5">
                  Delete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TypographyVisual() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered || "2xl";

  return (
    <div className="flex items-center justify-center rounded-xl">
      <div className="w-full max-w-sm">
        <div className="">
          {/* Page title */}
          <div
            className={`relative mb-4 p-2 -m-2 rounded transition-all cursor-pointer ${
              active === "2xl" ? "bg-primary/5 ring-2 ring-primary/20" : ""
            }`}
            onMouseEnter={() => setHovered("2xl")}
            onMouseLeave={() => setHovered(null)}
          >
            <TokenLabel label="text-2xl font-bold" visible={active === "2xl"} />
            <span className="text-2xl font-bold text-card-foreground">
              Project Update
            </span>
          </div>

          {/* Section heading */}
          <div
            className={`relative mb-3 p-2 -m-2 rounded transition-all cursor-pointer ${
              active === "lg" ? "bg-primary/5 ring-2 ring-primary/20" : ""
            }`}
            onMouseEnter={() => setHovered("lg")}
            onMouseLeave={() => setHovered(null)}
          >
            <TokenLabel
              label="text-lg font-semibold"
              visible={active === "lg"}
            />
            <span className="text-lg font-semibold text-card-foreground">
              Q4 Milestones
            </span>
          </div>

          {/* Body text */}
          <div
            className={`relative mb-3 p-2 -m-2 rounded transition-all cursor-pointer ${
              active === "base" ? "bg-primary/5 ring-2 ring-primary/20" : ""
            }`}
            onMouseEnter={() => setHovered("base")}
            onMouseLeave={() => setHovered(null)}
          >
            <TokenLabel label="text-base" visible={active === "base"} />
            <span className="text-base text-card-foreground leading-relaxed">
              We shipped 3 major features this quarter.
            </span>
          </div>

          {/* Small text */}
          <div
            className={`relative mb-3 p-2 -m-2 rounded transition-all cursor-pointer ${
              active === "sm" ? "bg-primary/5 ring-2 ring-primary/20" : ""
            }`}
            onMouseEnter={() => setHovered("sm")}
            onMouseLeave={() => setHovered(null)}
          >
            <TokenLabel
              label="text-sm text-muted-foreground"
              visible={active === "sm"}
            />
            <span className="text-sm text-muted-foreground">
              Updated 2 hours ago by the team
            </span>
          </div>

          {/* Extra small / caption */}
          <div className="border-t border-border pt-3">
            <div
              className={`relative p-2 -m-2 rounded transition-all cursor-pointer ${
                active === "xs" ? "bg-primary/5 ring-2 ring-primary/20" : ""
              }`}
              onMouseEnter={() => setHovered("xs")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel label="text-xs" visible={active === "xs"} />
              <span className="text-xs text-muted-foreground">12 comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpacingVisual() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered || "p-4";

  return (
    <div className="flex items-center justify-center rounded-xl">
      <div className="w-full max-w-sm">
        <div className="bg-card border border-border rounded-lg shadow-sm">
          {/* Header with p-4 */}
          <div
            className={`relative p-4 border-b border-border transition-all cursor-pointer ${
              active === "p-4"
                ? "bg-primary/5 ring-2 ring-inset ring-primary/20"
                : ""
            }`}
            onMouseEnter={() => setHovered("p-4")}
            onMouseLeave={() => setHovered(null)}
          >
            <TokenLabel label="p-4" visible={active === "p-4"} />
            <div className="text-sm font-medium">Delete Account</div>
            <div className="text-xs text-muted-foreground mt-1">
              This action cannot be undone
            </div>
          </div>

          {/* Content with space-y-3 */}
          <div className="p-4">
            <div
              className={`relative space-y-3 transition-all cursor-pointer rounded ${
                active === "space-y"
                  ? "bg-primary/5 ring-2 ring-primary/20 p-2 -m-2"
                  : ""
              }`}
              onMouseEnter={() => setHovered("space-y")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel label="space-y-3" visible={active === "space-y"} />
              <div className="text-xs text-muted-foreground">
                Type your username to confirm:
              </div>
              <input
                type="text"
                placeholder="username"
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
                readOnly
              />
            </div>
          </div>

          {/* Footer with gap-3 */}
          <div className="border-t border-border p-4">
            <div
              className={`relative flex gap-3 transition-all cursor-pointer rounded ${
                active === "gap"
                  ? "bg-primary/5 ring-2 ring-primary/20 p-2 -m-2"
                  : ""
              }`}
              onMouseEnter={() => setHovered("gap")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel label="gap-3" visible={active === "gap"} />
              <button className="flex-1 px-3 py-2 bg-muted text-foreground rounded-md text-xs font-medium border border-border">
                Cancel
              </button>
              <button className="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded-md text-xs font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LayoutVisual() {
  const breakpoints = [
    {
      name: "sm",
      pixels: "640px",
      widthPercent: 40,
      color: "bg-blue-400/40",
      label: "Mobile",
    },
    {
      name: "md",
      pixels: "768px",
      widthPercent: 55,
      color: "bg-purple-400/40",
      label: "Tablet",
    },
    {
      name: "lg",
      pixels: "1024px",
      widthPercent: 75,
      color: "bg-green-400/40",
      label: "Desktop",
    },
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
          {breakpoints.map((bp) => (
            <div key={bp.name} className="relative">
              {/* Viewport mockup */}
              <div
                className="relative mx-auto"
                style={{ width: `${bp.widthPercent}%` }}
              >
                {/* Browser chrome mini */}
                <div className="rounded-t-lg border border-b-0 px-2 py-1.5 flex items-center gap-1.5 bg-muted">
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
                <div className={`rounded-b-lg border p-3 ${bp.color}`}>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-[10px] font-semibold">{bp.label}</p>
                      <p className="text-[8px] text-foreground/60 font-mono">
                        @{bp.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Token label */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[9px] font-mono text-foreground border border-primary/20 whitespace-nowrap">
                    @{bp.name}: {bp.pixels}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BorderVisual() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered || "input";

  return (
    <div className="flex items-center justify-center rounded-xl min-h-[320px]">
      <div className="w-full max-w-sm">
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="text-sm font-medium text-card-foreground mb-3">
            Account Settings
          </div>

          {/* Input with border-input */}
          <div className="mb-4">
            <label className="text-xs text-muted-foreground mb-1.5 block">
              Email
            </label>
            <div
              className={`relative transition-all cursor-pointer rounded ${
                active === "input" ? "ring-2 ring-primary/20 p-1 -m-1" : ""
              }`}
              onMouseEnter={() => setHovered("input")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel label="border-input" visible={active === "input"} />
              <input
                type="text"
                placeholder="you@example.com"
                className="w-full px-3 py-1.5 rounded-md bg-background text-sm border border-input"
                readOnly
              />
            </div>
          </div>

          {/* Divider */}
          <div
            className={`relative mb-4 py-2 transition-all cursor-pointer rounded ${
              active === "divider" ? "bg-primary/5 ring-2 ring-primary/20" : ""
            }`}
            onMouseEnter={() => setHovered("divider")}
            onMouseLeave={() => setHovered(null)}
          >
            <TokenLabel label="border-border" visible={active === "divider"} />
            <div className="border-t border-border"></div>
          </div>

          {/* Border width examples */}
          <div className="text-xs text-muted-foreground mb-2">
            Border widths
          </div>
          <div className="space-y-2">
            <div
              className={`relative p-2 rounded bg-muted/30 border border-border text-xs text-center transition-all cursor-pointer ${
                active === "border" ? "ring-2 ring-primary/20" : ""
              }`}
              onMouseEnter={() => setHovered("border")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel label="border (1px)" visible={active === "border"} />
              Default
            </div>
            <div
              className={`relative p-2 rounded bg-muted/30 border-2 border-primary text-xs text-center transition-all cursor-pointer ${
                active === "border-2" ? "ring-2 ring-primary/20" : ""
              }`}
              onMouseEnter={() => setHovered("border-2")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel
                label="border-2 (2px)"
                visible={active === "border-2"}
              />
              Emphasized
            </div>
            <div
              className={`relative p-2 rounded bg-muted/30 border-4 border-primary text-xs text-center transition-all cursor-pointer ${
                active === "border-4" ? "ring-2 ring-primary/20" : ""
              }`}
              onMouseEnter={() => setHovered("border-4")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel
                label="border-4 (4px)"
                visible={active === "border-4"}
              />
              Strong
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShadowVisual() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered || "none";

  return (
    <div className="flex items-center justify-center rounded-xl min-h-[320px]">
      <div className="w-full max-w-sm">
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="text-sm font-medium text-foreground mb-3">
            Elevation Hierarchy
          </div>

          <div className="space-y-3">
            {/* Flat - no shadow */}
            <div
              className={`relative bg-card border border-border rounded-lg p-3 transition-all cursor-pointer ${
                active === "none" ? "ring-2 ring-primary/20" : ""
              }`}
              onMouseEnter={() => setHovered("none")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel label="shadow-none" visible={active === "none"} />
              <div className="text-xs font-medium text-card-foreground">
                Flat Card
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                No elevation
              </div>
            </div>

            {/* Small shadow */}
            <div
              className={`relative bg-card border border-border rounded-lg p-3 shadow-sm transition-all cursor-pointer ${
                active === "sm" ? "ring-2 ring-primary/20" : ""
              }`}
              onMouseEnter={() => setHovered("sm")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel label="shadow-sm" visible={active === "sm"} />
              <div className="text-xs font-medium text-card-foreground">
                Raised Card
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Subtle lift
              </div>
            </div>

            {/* Medium shadow */}
            <div
              className={`relative bg-card border border-border rounded-lg p-3 shadow-md transition-all cursor-pointer ${
                active === "md" ? "ring-2 ring-primary/20" : ""
              }`}
              onMouseEnter={() => setHovered("md")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel label="shadow-md" visible={active === "md"} />
              <div className="text-xs font-medium text-card-foreground">
                Dropdown
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Floating UI
              </div>
            </div>

            {/* Large shadow */}
            <div
              className={`relative bg-card border border-border rounded-lg p-3 shadow-lg transition-all cursor-pointer ${
                active === "lg" ? "ring-2 ring-primary/20" : ""
              }`}
              onMouseEnter={() => setHovered("lg")}
              onMouseLeave={() => setHovered(null)}
            >
              <TokenLabel label="shadow-lg" visible={active === "lg"} />
              <div className="text-xs font-medium text-card-foreground">
                Modal Dialog
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Top layer
              </div>
            </div>
          </div>
        </div>
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
            style={{
              width: `${Math.min(
                token.px * SPACING_BAR_SCALE,
                MAX_SPACING_BAR_WIDTH
              )}px`,
            }}
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
            <div className="text-[10px] text-muted-foreground">
              {token.desc}
            </div>
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
              style={{
                width: `${(parseInt(token.value) / MAX_SCREEN_WIDTH) * 100}%`,
              }}
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
