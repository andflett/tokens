"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatColorAs } from "@/lib/tokens";
import type {
  ColorScale,
  ColorFormat,
  ExtendedSemanticColor,
  SemanticColorPair,
} from "@/lib/types";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

/**
 * Type guard to check if semantic color is an extended type with scale
 */
function isExtendedSemanticColor(
  color: ExtendedSemanticColor | SemanticColorPair
): color is ExtendedSemanticColor {
  return "subdued" in color;
}

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
            {copied
              ? "Copied!"
              : `${label ? `${label}: ` : ""}${color.toUpperCase()}`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface EditableColorSwatchProps {
  color: string;
  primitiveRef: string;
  colorFormat: ColorFormat;
  isEdited: boolean;
  onColorChange: (color: string) => void;
  onReset: () => void;
  className?: string;
}

/**
 * Editable color swatch with color picker
 */
export function EditableColorSwatch({
  color,
  primitiveRef,
  colorFormat,
  isEdited,
  onColorChange,
  onReset,
  className,
}: EditableColorSwatchProps) {
  const [copiedFormat, setCopiedFormat] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleCopy = async (value: string, format: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 1500);
  };

  const hexColor = formatColorAs(color, "hex");
  const rgbColor = formatColorAs(color, "rgb");
  const oklchColor = formatColorAs(color, "oklch");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "h-10 w-full rounded transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 relative group",
            isEdited && "ring-2 ring-offset-1 ring-primary",
            className
          )}
          style={{ backgroundColor: color }}
        >
          {isEdited && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="space-y-3">
          <HexColorPicker color={color} onChange={onColorChange} />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">#</span>
            <HexColorInput
              color={color}
              onChange={onColorChange}
              className="h-8 w-full rounded-md border border-input bg-background px-2 font-mono text-sm uppercase"
              prefixed={false}
            />
          </div>
          <div className="space-y-2 text-xs">
            <div className="font-medium text-foreground">{primitiveRef}</div>
            <div className="space-y-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(hexColor, "hex");
                }}
                className="flex items-center gap-2 w-full font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-muted-foreground/60 w-10">HEX</span>
                <span>{copiedFormat === "hex" ? "Copied!" : hexColor}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(rgbColor, "rgb");
                }}
                className="flex items-center gap-2 w-full font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-muted-foreground/60 w-10">RGB</span>
                <span>{copiedFormat === "rgb" ? "Copied!" : rgbColor}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(oklchColor, "oklch");
                }}
                className="flex items-center gap-2 w-full font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-muted-foreground/60 w-10">OKLCH</span>
                <span>{copiedFormat === "oklch" ? "Copied!" : oklchColor}</span>
              </button>
            </div>
          </div>
          {isEdited && (
            <Button
              intent="default"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
                setOpen(false);
              }}
              className="h-8 px-2 w-full"
            >
              <ArrowPathIcon className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
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
  const shades = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ] as const;

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-medium capitalize">{name}</h4>
      <div className="flex gap-1">
        {shades.map((shade) => (
          <div key={shade} className="flex-1">
            <ColorSwatch
              color={scale[shade as keyof ColorScale]}
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

interface ColorScalePreviewEditableProps {
  name: string;
  scale: ColorScale;
  colorFormat: ColorFormat;
  onColorEdit: (shade: number, color: string) => void;
  onColorReset: (shade: number) => void;
  isColorEdited: (shade: number) => boolean;
  className?: string;
}

/**
 * Editable color scale preview with primitive references
 */
export function ColorScalePreviewEditable({
  name,
  scale,
  colorFormat,
  onColorEdit,
  onColorReset,
  isColorEdited,
  className,
}: ColorScalePreviewEditableProps) {
  const shades = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ] as const;

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-medium capitalize">{name}</h4>
      <div className="flex gap-1">
        {shades.map((shade) => (
          <div key={shade} className="flex-1">
            <EditableColorSwatch
              color={scale[shade as keyof ColorScale]}
              primitiveRef={`${name}.${shade}`}
              colorFormat={colorFormat}
              isEdited={isColorEdited(shade)}
              onColorChange={(color) => onColorEdit(shade, color)}
              onReset={() => onColorReset(shade)}
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
  palette: Record<string, ColorScale | string>;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Preview an entire color palette
 */
export function PalettePreview({ palette, className }: PalettePreviewProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {Object.entries(palette).map(([name, scale]) => {
        if (typeof scale === "string") return null;
        return <ColorScalePreview key={name} name={name} scale={scale} />;
      })}
    </div>
  );
}

interface PalettePreviewEditableProps {
  palette: Record<string, ColorScale | string>;
  colorFormat: ColorFormat;
  onColorEdit: (colorName: string, shade: number, color: string) => void;
  onColorReset: (colorName: string, shade: number) => void;
  isColorEdited: (colorName: string, shade: number) => boolean;
  className?: string;
}

/**
 * Editable palette preview
 */
export function PalettePreviewEditable({
  palette,
  colorFormat,
  onColorEdit,
  onColorReset,
  isColorEdited,
  className,
}: PalettePreviewEditableProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {Object.entries(palette).map(([name, scale]) => {
        if (typeof scale === "string") return null;
        return (
          <ColorScalePreviewEditable
            key={name}
            name={name}
            scale={scale}
            colorFormat={colorFormat}
            onColorEdit={(shade, color) => onColorEdit(name, shade, color)}
            onColorReset={(shade) => onColorReset(name, shade)}
            isColorEdited={(shade) => isColorEdited(name, shade)}
          />
        );
      })}
    </div>
  );
}

interface SemanticColorPreviewProps {
  /** Semantic color object - supports both extended and simple pair types */
  semantic: ExtendedSemanticColor | SemanticColorPair;
  /** Name of the semantic color */
  name: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Preview semantic color with DEFAULT, foreground, and variants
 */
export function SemanticColorPreview({
  semantic,
  name,
  className,
}: SemanticColorPreviewProps) {
  if (isExtendedSemanticColor(semantic)) {
    return (
      <div className={cn("space-y-2", className)}>
        <h4 className="text-sm font-medium capitalize">{name}</h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <div
              className="flex h-16 items-center justify-center rounded text-xs font-medium"
              style={{
                backgroundColor: semantic.DEFAULT,
                color: semantic.foreground,
              }}
            >
              Default
            </div>
            <p className="text-center font-mono text-xs text-muted-foreground">
              {semantic.DEFAULT}
            </p>
          </div>
          <div className="space-y-1">
            <div
              className="flex h-16 items-center justify-center rounded text-xs font-medium"
              style={{
                backgroundColor: semantic.subdued,
                color: semantic["subdued-foreground"],
              }}
            >
              Subdued
            </div>
            <p className="text-center font-mono text-xs text-muted-foreground">
              {semantic.subdued}
            </p>
          </div>
          <div className="space-y-1">
            <div
              className="flex h-16 items-center justify-center rounded text-xs font-medium"
              style={{
                backgroundColor: semantic.highlight,
                color: semantic["highlight-foreground"],
              }}
            >
              Highlight
            </div>
            <p className="text-center font-mono text-xs text-muted-foreground">
              {semantic.highlight}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Simple color pair (muted, accent)
  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-medium capitalize">{name}</h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <div
            className="flex h-16 items-center justify-center rounded text-xs font-medium"
            style={{
              backgroundColor: semantic.DEFAULT,
              color: semantic.foreground,
            }}
          >
            Default
          </div>
          <p className="text-center font-mono text-xs text-muted-foreground">
            {semantic.DEFAULT}
          </p>
        </div>
        <div className="space-y-1">
          <div
            className="flex h-16 items-center justify-center rounded text-xs font-medium border"
            style={{
              backgroundColor: "transparent",
              color: semantic.foreground,
            }}
          >
            Foreground
          </div>
          <p className="text-center font-mono text-xs text-muted-foreground">
            {semantic.foreground}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SEMANTIC COLOR SCALE PICKER
// ============================================================================

interface SemanticColorEditableProps {
  semantic: ExtendedSemanticColor | SemanticColorPair;
  name: string;
  relevantScale: ColorScale;
  scaleName: string;
  onBaseChange: (color: string) => void;
  className?: string;
}

/**
 * Editable semantic color with scale picker
 * Click to first select from the relevant scale, or customize with color picker
 */
export function SemanticColorEditable({
  semantic,
  name,
  relevantScale,
  scaleName,
  onBaseChange,
  className,
}: SemanticColorEditableProps) {
  const [open, setOpen] = React.useState(false);
  const [showCustomPicker, setShowCustomPicker] = React.useState(false);
  const shades = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ] as const;

  const isExtended = isExtendedSemanticColor(semantic);

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-medium capitalize">{name}</h4>
      <div
        className={cn("grid gap-2", isExtended ? "grid-cols-3" : "grid-cols-2")}
      >
        {/* Default color - clickable to open picker */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="space-y-1 text-left group">
              <div
                className="flex h-16 items-center justify-center rounded text-xs font-medium transition-all group-hover:ring-2 group-hover:ring-primary group-hover:ring-offset-2"
                style={{
                  backgroundColor: semantic.DEFAULT,
                  color: semantic.foreground,
                }}
              >
                Default
              </div>
              <p className="text-center font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">
                Click to edit
              </p>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium mb-2">
                  Select from {scaleName} scale
                </h5>
                <p className="text-xs text-muted-foreground mb-3">
                  Choose a shade from your {scaleName} color scale, or customize
                  below
                </p>
                <div className="flex gap-1">
                  {shades.map((shade) => (
                    <button
                      key={shade}
                      onClick={() => {
                        onBaseChange(relevantScale[shade as keyof ColorScale]);
                        setOpen(false);
                        setShowCustomPicker(false);
                      }}
                      className={cn(
                        "flex-1 h-8 rounded-sm transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring",
                        semantic.DEFAULT ===
                          relevantScale[shade as keyof ColorScale] &&
                          "ring-2 ring-primary ring-offset-1"
                      )}
                      style={{
                        backgroundColor:
                          relevantScale[shade as keyof ColorScale],
                      }}
                      title={`${scaleName}.${shade}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>Light</span>
                  <span>Dark</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <button
                  onClick={() => setShowCustomPicker(!showCustomPicker)}
                  className="text-xs text-primary hover:underline"
                >
                  {showCustomPicker
                    ? "Hide custom picker"
                    : "Need a different color? Use custom picker"}
                </button>

                {showCustomPicker && (
                  <div className="mt-3">
                    <HexColorPicker
                      color={semantic.DEFAULT}
                      onChange={onBaseChange}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Custom color:{" "}
                      <span className="font-mono">{semantic.DEFAULT}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {isExtended ? (
          <>
            {/* Subdued - auto-derived, shown for reference */}
            <div className="space-y-1 opacity-75">
              <div
                className="flex h-16 items-center justify-center rounded text-xs font-medium"
                style={{
                  backgroundColor: semantic.subdued,
                  color: semantic["subdued-foreground"],
                }}
              >
                Subdued
              </div>
              <p className="text-center font-mono text-xs text-muted-foreground">
                Auto-derived
              </p>
            </div>

            {/* Highlight - auto-derived, shown for reference */}
            <div className="space-y-1 opacity-75">
              <div
                className="flex h-16 items-center justify-center rounded text-xs font-medium"
                style={{
                  backgroundColor: semantic.highlight,
                  color: semantic["highlight-foreground"],
                }}
              >
                Highlight
              </div>
              <p className="text-center font-mono text-xs text-muted-foreground">
                Auto-derived
              </p>
            </div>
          </>
        ) : (
          /* Foreground - shown for reference in simple pair */
          <div className="space-y-1 opacity-75">
            <div
              className="flex h-16 items-center justify-center rounded text-xs font-medium border"
              style={{
                backgroundColor: "transparent",
                color: semantic.foreground,
              }}
            >
              Foreground
            </div>
            <p className="text-center font-mono text-xs text-muted-foreground">
              Auto-derived
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
