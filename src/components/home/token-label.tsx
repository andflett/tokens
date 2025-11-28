"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

// Token label using Radix Tooltip for positioning with collision avoidance
export function TokenLabel({
  children,
  label,
  side = "top",
  sideOffset = 8,
  open,
  className,
}: {
  children: React.ReactNode;
  label: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  open?: boolean;
  className?: string;
}) {
  // Calculate line position based on side
  const getLineStyles = (side: string) => {
    switch (side) {
      case "top":
        return {
          line: "w-px h-3 bg-purple-400 absolute left-1/2 -translate-x-1/2 -bottom-3",
          dot: "w-1.5 h-1.5 rounded-full bg-purple-400 absolute left-1/2 -translate-x-1/2 -bottom-[15px]",
        };
      case "bottom":
        return {
          line: "w-px h-3 bg-purple-400 absolute left-1/2 -translate-x-1/2 -top-3",
          dot: "w-1.5 h-1.5 rounded-full bg-purple-400 absolute left-1/2 -translate-x-1/2 -top-[15px]",
        };
      case "left":
        return {
          line: "h-px w-3 bg-purple-400 absolute top-1/2 -translate-y-1/2 -right-3",
          dot: "w-1.5 h-1.5 rounded-full bg-purple-400 absolute top-1/2 -translate-y-1/2 -right-[15px]",
        };
      case "right":
        return {
          line: "h-px w-3 bg-purple-400 absolute top-1/2 -translate-y-1/2 -left-3",
          dot: "w-1.5 h-1.5 rounded-full bg-purple-400 absolute top-1/2 -translate-y-1/2 -left-[15px]",
        };
      default:
        return { line: "", dot: "" };
    }
  };

  const lineStyles = getLineStyles(side);

  // Only render tooltip content when explicitly open
  if (!open) {
    return <div className={cn("relative", className)}>{children}</div>;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <TooltipPrimitive.Root open={true}>
        <TooltipPrimitive.Trigger asChild>
          <div className={cn("relative", className)}>{children}</div>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={sideOffset + 16}
            collisionPadding={12}
            avoidCollisions={true}
            className="z-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          >
            <div className="relative">
              <div className="border border-purple-300 border-dashed inline-flex items-center rounded-full bg-purple-200 px-3 py-1 text-xs font-mono whitespace-nowrap text-foreground shadow-lg">
                {label}
              </div>
              {/* Line pointer with dot */}
              <div className={lineStyles.line} />
              <div className={lineStyles.dot} />
            </div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

// Spacing overlay variants for different types
export type SpacingType = "padding" | "gap" | "margin";

// Different colored overlays for different spacing types
export function SpacingOverlay({
  className,
  type = "padding",
}: {
  className?: string;
  type?: SpacingType;
}) {
  // Different colors for different spacing types
  const colors = {
    padding: {
      bg: "rgba(168, 85, 247, 0.08)", // Purple - padding
      border: "rgba(168, 85, 247, 0.4)",
      dot: "rgba(168, 85, 247, 0.15)",
    },
    gap: {
      bg: "rgba(59, 130, 246, 0.08)", // Blue - gap
      border: "rgba(59, 130, 246, 0.4)",
      dot: "rgba(59, 130, 246, 0.15)",
    },
    margin: {
      bg: "rgba(34, 197, 94, 0.08)", // Green - margin
      border: "rgba(34, 197, 94, 0.4)",
      dot: "rgba(34, 197, 94, 0.15)",
    },
  };

  const c = colors[type];

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundColor: c.bg,
        border: `0px dashed ${c.border}`,
        backgroundImage: `radial-gradient(circle, ${c.dot} 1px, transparent 1px)`,
        backgroundSize: "8px 8px",
      }}
    />
  );
}

// Wrapper component that shows spacing with overlay
export function SpacingIndicator({
  children,
  label,
  active,
  side = "top",
  padding,
}: {
  children: React.ReactNode;
  label: string;
  active: boolean;
  side?: "top" | "bottom" | "left" | "right";
  padding?: string;
}) {
  return (
    <TokenLabel label={label} side={side} open={active} sideOffset={12}>
      <div className="relative">
        {active && padding && (
          <>
            <SpacingOverlay className="rounded-xl" type="padding" />
          </>
        )}
        {children}
      </div>
    </TokenLabel>
  );
}
