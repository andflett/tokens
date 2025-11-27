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
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatColorAs } from "@/lib/tokens";
import type { ColorScale, ColorFormat } from "@/lib/types";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

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
  className 
}: EditableColorSwatchProps) {
  const [copied, setCopied] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(primitiveRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const formattedColor = formatColorAs(color, colorFormat);

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
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs">
              <div className="font-medium text-foreground">{primitiveRef}</div>
              <button 
                onClick={handleCopy}
                className="font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? "Copied!" : formattedColor}
              </button>
            </div>
            {isEdited && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onReset();
                  setOpen(false);
                }}
                className="h-8 px-2"
              >
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                Reset
              </Button>
            )}
          </div>
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
  const shades = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const;

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-medium capitalize">{name}</h4>
      <div className="flex gap-1">
        {shades.map((shade) => (
          <div key={shade} className="flex-1">
            <EditableColorSwatch
              color={scale[shade]}
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

interface PalettePreviewEditableProps {
  palette: Record<string, ColorScale>;
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
  className 
}: PalettePreviewEditableProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {Object.entries(palette).map(([name, scale]) => (
        <ColorScalePreviewEditable 
          key={name} 
          name={name} 
          scale={scale}
          colorFormat={colorFormat}
          onColorEdit={(shade, color) => onColorEdit(name, shade, color)}
          onColorReset={(shade) => onColorReset(name, shade)}
          isColorEdited={(shade) => isColorEdited(name, shade)}
        />
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

// ============================================================================
// SEMANTIC COLOR SCALE PICKER
// ============================================================================

interface SemanticColorEditableProps {
  semantic: {
    base: string;
    muted: string;
    accent: string;
    onBase: string;
    onMuted: string;
    onAccent: string;
  };
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
  const shades = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const;

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-medium capitalize">{name}</h4>
      <div className="grid grid-cols-3 gap-2">
        {/* Base color - clickable to open picker */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="space-y-1 text-left group">
              <div
                className="flex h-16 items-center justify-center rounded text-xs font-medium transition-all group-hover:ring-2 group-hover:ring-primary group-hover:ring-offset-2"
                style={{
                  backgroundColor: semantic.base,
                  color: semantic.onBase,
                }}
              >
                Base
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
                  Choose a shade from your {scaleName} color scale, or customize below
                </p>
                <div className="flex gap-1">
                  {shades.map((shade) => (
                    <button
                      key={shade}
                      onClick={() => {
                        onBaseChange(relevantScale[shade]);
                        setOpen(false);
                        setShowCustomPicker(false);
                      }}
                      className={cn(
                        "flex-1 h-8 rounded-sm transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring",
                        semantic.base === relevantScale[shade] && "ring-2 ring-primary ring-offset-1"
                      )}
                      style={{ backgroundColor: relevantScale[shade] }}
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
                  {showCustomPicker ? 'Hide custom picker' : 'Need a different color? Use custom picker'}
                </button>
                
                {showCustomPicker && (
                  <div className="mt-3">
                    <HexColorPicker 
                      color={semantic.base} 
                      onChange={onBaseChange} 
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Custom color: <span className="font-mono">{semantic.base}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Muted - auto-derived, shown for reference */}
        <div className="space-y-1 opacity-75">
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
            Auto-derived
          </p>
        </div>

        {/* Accent - auto-derived, shown for reference */}
        <div className="space-y-1 opacity-75">
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
            Auto-derived
          </p>
        </div>
      </div>
    </div>
  );
}
