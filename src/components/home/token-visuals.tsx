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
    { name: "sm", width: "40rem", pixels: "640px", containerWidth: "100%" },
    {
      name: "md",
      width: "48rem",
      pixels: "768px",
      containerWidth: "max-w-3xl",
    },
    {
      name: "lg",
      width: "64rem",
      pixels: "1024px",
      containerWidth: "max-w-5xl",
    },
  ];

  return (
    <div className="relative min-h-[300px]">
      <div className="rounded-xl border bg-background p-4 space-y-4">
        {/* Browser chrome mockup */}
        <div className="flex items-center gap-2 pb-3 border-b">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 h-6 rounded bg-muted flex items-center px-3">
            <span className="text-[10px] text-muted-foreground font-mono">
              myapp.com
            </span>
          </div>
        </div>

        {/* Viewport visualization */}
        <div className="relative">
          {breakpoints.map((bp, i) => (
            <div
              key={bp.name}
              className={`transition-all duration-700 ${
                i === activeBreakpoint
                  ? "opacity-100"
                  : "opacity-0 absolute inset-0"
              }`}
              style={{ display: i === activeBreakpoint ? "block" : "none" }}
            >
              {/* Breakpoint indicator */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    Viewport:
                  </span>
                  <span className="text-sm font-semibold">{bp.pixels}</span>
                </div>
                <div className="border border-purple-300 border-dashed inline-flex items-center rounded-full bg-purple-200 px-3 py-1 text-xs font-mono whitespace-nowrap text-foreground shadow-lg">
                  --breakpoint-{bp.name}: {bp.width}
                </div>
              </div>

              {/* Container visualization */}
              <div className="relative h-32 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30 flex items-center justify-center">
                <TokenLabel
                  label={`--container-${
                    i === 0 ? "full" : i === 1 ? "3xl" : "5xl"
                  }`}
                  side="bottom"
                  open={i === activeBreakpoint}
                  sideOffset={8}
                >
                  <div
                    className={`h-24 bg-card border rounded-lg shadow-sm flex items-center justify-center transition-all duration-500 ${
                      i === 0 ? "w-full" : i === 1 ? "w-4/5" : "w-3/5"
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-xs font-medium">Content Container</p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {bp.containerWidth}
                      </p>
                    </div>
                  </div>
                </TokenLabel>
              </div>

              {/* Screen size label */}
              <div className="mt-3 text-center">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    i === 0
                      ? "bg-blue-100 text-blue-700"
                      : i === 1
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {i === 0 ? "📱 Mobile" : i === 1 ? "📟 Tablet" : "🖥️ Desktop"}
                </span>
              </div>
            </div>
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
