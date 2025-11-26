"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ColorScale } from "@/lib/types";

interface ColorSwatchProps {
  color: string;
  label?: string;
  className?: string;
}

/**
 * Single color swatch with tooltip
 */
export function ColorSwatch({ color, label, className }: ColorSwatchProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopy}
            className={cn(
              "h-10 w-full rounded transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              className
            )}
            style={{ backgroundColor: color }}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-mono text-xs">
            {copied ? "Copied!" : `${label ? `${label}: ` : ""}${color.toUpperCase()}`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ColorScalePreviewProps {
  /** Name of the color (e.g., "primary") */
  name: string;
  /** Color scale object */
  scale: ColorScale;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Preview a complete color scale with all shades
 */
export function ColorScalePreview({
  name,
  scale,
  className,
}: ColorScalePreviewProps) {
  const shades = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const;

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-medium capitalize">{name}</h4>
      <div className="flex gap-1">
        {shades.map((shade) => (
          <div key={shade} className="flex-1">
            <ColorSwatch
              color={scale[shade]}
              label={`${name}-${shade}`}
            />
            <p className="mt-1 text-center text-xs text-muted-foreground">
              {shade}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PalettePreviewProps {
  /** Palette object with named color scales */
  palette: Record<string, ColorScale>;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Preview an entire color palette
 */
export function PalettePreview({ palette, className }: PalettePreviewProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {Object.entries(palette).map(([name, scale]) => (
        <ColorScalePreview key={name} name={name} scale={scale} />
      ))}
    </div>
  );
}

interface SemanticColorPreviewProps {
  /** Semantic color object */
  semantic: {
    base: string;
    muted: string;
    accent: string;
    onBase: string;
    onMuted: string;
    onAccent: string;
  };
  /** Name of the semantic color */
  name: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Preview semantic color with base, muted, and accent variants
 */
export function SemanticColorPreview({
  semantic,
  name,
  className,
}: SemanticColorPreviewProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-medium capitalize">{name}</h4>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <div
            className="flex h-16 items-center justify-center rounded text-xs font-medium"
            style={{
              backgroundColor: semantic.base,
              color: semantic.onBase,
            }}
          >
            Base
          </div>
          <p className="text-center font-mono text-xs text-muted-foreground">
            {semantic.base}
          </p>
        </div>
        <div className="space-y-1">
          <div
            className="flex h-16 items-center justify-center rounded text-xs font-medium"
            style={{
              backgroundColor: semantic.muted,
              color: semantic.onMuted,
            }}
          >
            Muted
          </div>
          <p className="text-center font-mono text-xs text-muted-foreground">
            {semantic.muted}
          </p>
        </div>
        <div className="space-y-1">
          <div
            className="flex h-16 items-center justify-center rounded text-xs font-medium"
            style={{
              backgroundColor: semantic.accent,
              color: semantic.onAccent,
            }}
          >
            Accent
          </div>
          <p className="text-center font-mono text-xs text-muted-foreground">
            {semantic.accent}
          </p>
        </div>
      </div>
    </div>
  );
}
