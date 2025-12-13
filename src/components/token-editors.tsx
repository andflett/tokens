"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { LetterSpacingIcon, LineHeightIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { HexColorPicker, HexColorInput } from "react-colorful";
import type {
  TokenSystem,
  ShadowSettings,
  BorderColors,
  LayoutTokens,
  ColorScale,
} from "@/lib/types";

// ============================================================================
// PALETTE COLOR PICKER COMPONENT
// ============================================================================

interface PaletteColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  onReset: () => void;
  primitives: TokenSystem["primitives"];
  className?: string;
}

/**
 * Color picker with palette tabs (Primary/Secondary/Neutral) + Custom hex editor
 */
function PaletteColorPicker({
  label,
  value,
  onChange,
  onReset,
  primitives,
  className,
}: PaletteColorPickerProps) {
  const [open, setOpen] = React.useState(false);

  const renderPaletteGrid = (palette: ColorScale) => {
    const shades = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    return (
      <div className="grid grid-cols-12 gap-1">
        {shades.map((shade) => {
          const color = palette[shade as keyof ColorScale];
          return (
            <button
              key={shade}
              type="button"
              onClick={() => {
                onChange(color);
                setOpen(false);
              }}
              className="h-6 w-4 cursor-pointer rounded-sm hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              title={`${shade}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Reset
        </Button>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            intent="secondary"
            variant="outline"
            className="w-full justify-start gap-2 font-mono text-sm"
          >
            <div
              className="h-5 w-5 rounded border border-border"
              style={{ backgroundColor: value }}
            />
            <span>{value.toUpperCase()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3" align="start">
          <Tabs defaultValue="primary" className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="primary">Tokens</TabsTrigger>
              <TabsTrigger value="custom">Manual</TabsTrigger>
            </TabsList>
            <TabsContent
              value="primary"
              className="mt-1 px-2 gap-3 flex flex-col"
            >
              <div className="space-y-1">
                <p className="text-xs font-medium">Primary</p>
                {renderPaletteGrid(primitives.primary as ColorScale)}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium">Secondary</p>
                {renderPaletteGrid(primitives.secondary as ColorScale)}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium">Neutral</p>
                {renderPaletteGrid(primitives.neutral as ColorScale)}
              </div>
            </TabsContent>
            <TabsContent value="custom" className="mt-3 space-y-3">
              <HexColorPicker color={value} onChange={onChange} />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">#</span>
                <HexColorInput
                  color={value}
                  onChange={onChange}
                  className="h-8 w-full rounded-md border border-input bg-background px-2 font-mono text-sm uppercase"
                  prefixed={false}
                />
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ============================================================================
// SPACING EDITOR & PREVIEW
// ============================================================================

interface SpacingPreviewProps {
  spacing: Record<string, string>;
  className?: string;
}

export function SpacingPreview({ spacing, className }: SpacingPreviewProps) {
  // Show a subset of commonly used spacing values
  const displayKeys = ["1", "2", "3", "4", "6", "8", "12", "16", "24"];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-3">
        {displayKeys.map((key) => {
          const value = spacing[key];
          if (!value) return null;

          // Parse rem to px for display
          const remMatch = value.match(/([\d.]+)rem/);
          const pxValue = remMatch ? parseFloat(remMatch[1]) * 16 : 0;

          return (
            <div key={key} className="flex items-center gap-4">
              <div className="w-12 font-mono text-xs text-muted-foreground">
                {key}
              </div>
              <div
                className="h-6 bg-foreground/20 rounded-sm transition-all"
                style={{ width: `${Math.min(pxValue * 2, 200)}px` }}
              />
              <div className="font-mono text-xs text-muted-foreground">
                {value}{" "}
                <span className="text-muted-foreground/50">({pxValue}px)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface SpacingEditorProps {
  baseUnit: number;
  onBaseUnitChange: (value: number) => void;
  className?: string;
}

export function SpacingEditor({
  baseUnit,
  onBaseUnitChange,
  className,
}: SpacingEditorProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label className="text-sm">Base Unit (px)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[baseUnit]}
            onValueChange={([v]) => onBaseUnitChange(v)}
            min={2}
            max={8}
            step={1}
            className="flex-1"
          />
          <Input
            type="number"
            value={baseUnit}
            onChange={(e) => onBaseUnitChange(parseInt(e.target.value) || 4)}
            className="w-16 text-center"
            min={2}
            max={8}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Spacing scale is calculated as multiples of the base unit
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// TYPOGRAPHY EDITOR & PREVIEW
// ============================================================================

interface TypographyPreviewProps {
  typography: TokenSystem["typography"];
  previewMode: "light" | "dark";
  className?: string;
}

export function TypographyPreview({
  typography,
  previewMode,
  className,
}: TypographyPreviewProps) {
  const bgColor = previewMode === "light" ? "#ffffff" : "#0a0a0a";
  const textColor = previewMode === "light" ? "#0a0a0a" : "#fafafa";

  const sizeKeys = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"];

  return (
    <div
      className={cn("rounded-lg p-6 space-y-6", className)}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Font Sizes */}
      <div className="space-y-4">
        <h4 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Font Sizes (xs - 9xl)
        </h4>
        <div className="space-y-3">
          {sizeKeys.map((name) => {
            const size = typography.fontSize[name];
            if (!size) return null;
            return (
              <div key={name} className="flex items-center gap-4">
                <div className="w-12 font-mono text-xs opacity-50 shrink-0">
                  {name}
                </div>
                <div className="flex-1" style={{ fontSize: size }}>
                  The quick brown fox
                </div>
                <div className="font-mono text-xs opacity-30 shrink-0">
                  {size}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Font Weights */}
      <div className="space-y-4">
        <h4 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Font Weights (All Standard Values)
        </h4>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {Object.entries(typography.fontWeight).map(([name, value]) => (
            <div key={name} className="space-y-1">
              <div className="text-lg" style={{ fontWeight: value }}>
                Aa
              </div>
              <div className="text-xs opacity-50">{name}</div>
              <div className="font-mono text-[10px] opacity-30">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking & Leading */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <h4 className="text-xs font-medium uppercase tracking-wider opacity-50">
            Tracking (Letter Spacing)
          </h4>
          <div className="space-y-1 text-sm">
            {Object.entries(typography.tracking).map(([name, value]) => (
              <div key={name} style={{ letterSpacing: value }}>
                {name}: {value}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-medium uppercase tracking-wider opacity-50">
            Leading (Line Height Utilities)
          </h4>
          <div className="space-y-1 text-sm">
            {Object.entries(typography.leading).map(([name, value]) => (
              <div key={name}>
                {name}: {value}
              </div>
            ))}
          </div>
          <p className="text-xs opacity-30 mt-2">
            Note: Each font size has its own calculated line-height shown above
          </p>
        </div>
      </div>
    </div>
  );
}

interface TypographyEditorProps {
  baseFontSize: number;
  onBaseFontSizeChange: (value: number) => void;
  multiplier: number;
  onMultiplierChange: (value: number) => void;
  normalTracking: number;
  onNormalTrackingChange: (value: number) => void;
  normalLeading: number;
  onNormalLeadingChange: (value: number) => void;
  className?: string;
}

export function TypographyEditor({
  baseFontSize,
  onBaseFontSizeChange,
  multiplier,
  onMultiplierChange,
  normalTracking,
  onNormalTrackingChange,
  normalLeading,
  onNormalLeadingChange,
  className,
}: TypographyEditorProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="">
        <div className="space-y-2">
          <Label className="text-sm">Base Font Size (rem)</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[baseFontSize * 16]}
              onValueChange={([v]) => onBaseFontSizeChange(v / 16)}
              min={14}
              max={18}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={baseFontSize}
              onChange={(e) =>
                onBaseFontSizeChange(parseFloat(e.target.value) || 1)
              }
              className="w-20 text-center"
              min={0.875}
              max={1.125}
              step={0.0625}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Base text size (1rem = 16px by default)
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Scale Multiplier</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[multiplier * 10]}
              onValueChange={([v]) => onMultiplierChange(v / 10)}
              min={8}
              max={15}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={multiplier}
              onChange={(e) =>
                onMultiplierChange(parseFloat(e.target.value) || 1)
              }
              className="w-20 text-center"
              min={0.8}
              max={1.5}
              step={0.05}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Scales all typography sizes uniformly
          </p>
        </div>
      </div>

      <div className="">
        <div className="space-y-2">
          <Label className="text-sm">Normal Tracking (letter-spacing)</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[normalTracking * 100]}
              onValueChange={([v]) => onNormalTrackingChange(v / 100)}
              min={-10}
              max={10}
              step={1}
              className="flex-1"
            />
            <LetterSpacingIcon />
            <Input
              type="number"
              value={normalTracking ?? 0}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onNormalTrackingChange(isNaN(val) ? 0 : val);
              }}
              className="w-20 text-center"
              min={-0.1}
              max={0.1}
              step={0.005}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Generates tracking scale (0em default)
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">
            Normal Leading (line-height utility)
          </Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[normalLeading * 10]}
              onValueChange={([v]) => onNormalLeadingChange(v / 10)}
              min={10}
              max={25}
              step={1}
              className="flex-1"
            />
            <LineHeightIcon />

            <Input
              type="number"
              value={normalLeading ?? 1.5}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onNormalLeadingChange(isNaN(val) ? 1.5 : val);
              }}
              className="w-20 text-center"
              min={1}
              max={2.5}
              step={0.05}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Generates leading scale (1.5 default, separate from per-size
            line-heights)
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// BORDER RADIUS EDITOR & PREVIEW
// ============================================================================

interface RadiiPreviewProps {
  radii: Record<string, string>;
  previewMode: "light" | "dark";
  className?: string;
}

export function RadiiPreview({
  radii,
  previewMode,
  className,
}: RadiiPreviewProps) {
  const bgColor = previewMode === "light" ? "#ffffff" : "#0a0a0a";
  const boxBg = previewMode === "light" ? "#e5e7eb" : "#374151";
  const borderColor = previewMode === "light" ? "#d1d5db" : "#4b5563";

  const displayKeys = [
    "none",
    "sm",
    "DEFAULT",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "full",
  ];

  return (
    <div
      className={cn("rounded-lg p-6", className)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-wrap gap-4">
        {displayKeys.map((key) => {
          const value = radii[key];
          if (!value) return null;

          return (
            <div key={key} className="flex flex-col items-center gap-2">
              <div
                className="h-14 w-14"
                style={{
                  backgroundColor: boxBg,
                  borderRadius: value,
                  border: `2px solid ${borderColor}`,
                }}
              />
              <div className="text-center">
                <div className="font-mono text-xs text-muted-foreground">
                  {key === "DEFAULT" ? "default" : key}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground/50">
                  {value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface RadiiEditorProps {
  baseRadius: number;
  onBaseRadiusChange: (value: number) => void;
  multiplier: number;
  onMultiplierChange: (value: number) => void;
  className?: string;
}

export function RadiiEditor({
  baseRadius,
  onBaseRadiusChange,
  multiplier,
  onMultiplierChange,
  className,
}: RadiiEditorProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label className="text-sm">Base Radius (rem)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[baseRadius * 100]}
            onValueChange={([v]) => onBaseRadiusChange(v / 100)}
            min={0}
            max={100}
            step={5}
            className="flex-1"
          />
          <Input
            type="number"
            value={baseRadius}
            onChange={(e) =>
              onBaseRadiusChange(parseFloat(e.target.value) || 0.25)
            }
            className="w-20 text-center"
            min={0}
            max={1}
            step={0.05}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Base value used as sm (1x multiplier)
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-sm">Scale Multiplier</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[multiplier * 10]}
            onValueChange={([v]) => onMultiplierChange(v / 10)}
            min={5}
            max={20}
            step={1}
            className="flex-1"
          />
          <Input
            type="number"
            value={multiplier}
            onChange={(e) =>
              onMultiplierChange(parseFloat(e.target.value) || 1)
            }
            className="w-20 text-center"
            min={0.5}
            max={2}
            step={0.1}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Scales all radius values (capped at 10rem)
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// SHADOWS EDITOR & PREVIEW
// ============================================================================

interface ShadowsPreviewProps {
  shadows: TokenSystem["shadows"];
  previewMode: "light" | "dark";
  className?: string;
}

export function ShadowsPreview({
  shadows,
  previewMode,
  className,
}: ShadowsPreviewProps) {
  const bgColor = previewMode === "light" ? "#f3f4f6" : "#111827";
  const boxBg = previewMode === "light" ? "#ffffff" : "#1f2937";
  const modeShadows = shadows[previewMode];

  const displayKeys = ["sm", "DEFAULT", "md", "lg", "xl", "2xl"];

  return (
    <div
      className={cn("rounded-lg p-6", className)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {displayKeys.map((key) => {
          const value = modeShadows[key];
          if (!value) return null;

          return (
            <div key={key} className="flex flex-col items-center gap-2">
              <div
                className="h-14 w-14 rounded-lg"
                style={{
                  backgroundColor: boxBg,
                  boxShadow: value,
                }}
              />
              <div className="font-mono text-xs text-muted-foreground">
                {key === "DEFAULT" ? "default" : key}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ShadowsEditorProps {
  shadowIntensity: number;
  onShadowIntensityChange: (value: number) => void;
  className?: string;
}

export function ShadowsEditor({
  shadowIntensity,
  onShadowIntensityChange,
  className,
}: ShadowsEditorProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label className="text-sm">Shadow Intensity</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[shadowIntensity * 100]}
            onValueChange={([v]) => onShadowIntensityChange(v / 100)}
            min={0}
            max={200}
            step={10}
            className="flex-1"
          />
          <div className="w-16 text-center font-mono text-sm">
            {Math.round(shadowIntensity * 100)}%
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Adjust the overall intensity of shadow effects
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// BORDERS EDITOR & PREVIEW
// ============================================================================

interface BordersPreviewProps {
  previewMode: "light" | "dark";
  borderColors?: BorderColors;
  borderWidth?: string;
  className?: string;
}

export function BordersPreview({
  previewMode,
  borderColors,
  borderWidth = "1px",
  className,
}: BordersPreviewProps) {
  const bgColor = previewMode === "light" ? "#ffffff" : "#0a0a0a";
  const textColor = previewMode === "light" ? "#0a0a0a" : "#fafafa";
  const mutedTextColor = previewMode === "light" ? "#6b7280" : "#9ca3af";
  const defaultBorderColor =
    borderColors?.default || (previewMode === "light" ? "#e5e7eb" : "#374151");
  const inputBorderColor =
    borderColors?.input || (previewMode === "light" ? "#d1d5db" : "#4b5563");
  const ringColor =
    borderColors?.ring || (previewMode === "light" ? "#3b82f6" : "#60a5fa");

  return (
    <div
      className={cn("rounded-lg p-6 space-y-8", className)}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Border Colors Swatches */}
      <div className="space-y-3">
        <h4 className="text-xs font-mediumr">Border Color Tokens</h4>
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-12 w-12 rounded-md border-2"
              style={{ borderColor: defaultBorderColor }}
            />
            <div
              className="font-mono text-xs"
              style={{ color: mutedTextColor }}
            >
              --border
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-12 w-12 rounded-md border-2"
              style={{ borderColor: inputBorderColor }}
            />
            <div
              className="font-mono text-xs"
              style={{ color: mutedTextColor }}
            >
              --input
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-12 w-12 rounded-md"
              style={{
                boxShadow: `0 0 0 3px ${ringColor}`,
              }}
            />
            <div
              className="font-mono text-xs"
              style={{ color: mutedTextColor }}
            >
              --ring
            </div>
          </div>
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="space-y-3">
        <h4
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: mutedTextColor }}
        >
          Form Elements Preview
        </h4>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Input field */}
          <div className="space-y-2">
            <label
              className="text-xs font-medium"
              style={{ color: mutedTextColor }}
            >
              Text Input
            </label>
            <div
              className="h-10 px-3 rounded-md border flex items-center text-sm"
              style={{ borderColor: inputBorderColor }}
            >
              <span style={{ color: mutedTextColor }}>Enter text...</span>
            </div>
          </div>

          {/* Focused input */}
          <div className="space-y-2">
            <label
              className="text-xs font-medium"
              style={{ color: mutedTextColor }}
            >
              Focused Input
            </label>
            <div
              className="h-10 px-3 rounded-md border flex items-center text-sm"
              style={{
                borderColor: ringColor,
                boxShadow: `0 0 0 2px ${ringColor}40`,
              }}
            >
              <span>Typing here...</span>
            </div>
          </div>

          {/* Card with border */}
          <div className="space-y-2">
            <label
              className="text-xs font-medium"
              style={{ color: mutedTextColor }}
            >
              Card Border
            </label>
            <div
              className="p-3 rounded-lg border"
              style={{ borderColor: defaultBorderColor }}
            >
              <div className="text-sm font-medium">Card Title</div>
              <div className="text-xs" style={{ color: mutedTextColor }}>
                Card content here
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="space-y-2">
            <label
              className="text-xs font-medium"
              style={{ color: mutedTextColor }}
            >
              Divider
            </label>
            <div className="space-y-2">
              <div className="text-sm">Content above</div>
              <div
                className="h-px"
                style={{ backgroundColor: defaultBorderColor }}
              />
              <div className="text-sm">Content below</div>
            </div>
          </div>
        </div>
      </div>

      {/* Button with ring focus state */}
      <div className="space-y-3">
        <h4
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: mutedTextColor }}
        >
          Focus Ring Example
        </h4>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 rounded-md text-sm font-medium"
            style={{
              backgroundColor: previewMode === "light" ? "#f3f4f6" : "#374151",
              boxShadow: `0 0 0 2px ${ringColor}`,
            }}
          >
            Focused Button
          </button>
          <button
            className="px-4 py-2 rounded-md border text-sm font-medium"
            style={{
              borderColor: defaultBorderColor,
            }}
          >
            Default Button
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMBINED TOKEN CARD COMPONENT
// ============================================================================

interface TokenSectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  editor: React.ReactNode;
  preview: React.ReactNode;
  showEditor?: boolean;
  className?: string;
}

export function TokenSectionCard({
  title,
  description,
  icon,
  editor,
  preview,
  showEditor = true,
  className,
}: TokenSectionCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showEditor && <div className="border-b pb-6">{editor}</div>}
        <div>{preview}</div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// ADVANCED SHADOWS EDITOR
// ============================================================================

interface ShadowsEditorAdvancedProps {
  settings: ShadowSettings;
  onSettingsChange: (settings: ShadowSettings) => void;
  className?: string;
}

export function ShadowsEditorAdvanced({
  settings,
  onSettingsChange,
  className,
}: ShadowsEditorAdvancedProps) {
  const updateSetting = (key: keyof ShadowSettings, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Offset X */}
        <div className="space-y-2">
          <Label className="text-sm">Offset X (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[settings.offsetX]}
              onValueChange={([v]) => updateSetting("offsetX", v)}
              min={-20}
              max={20}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={settings.offsetX}
              onChange={(e) =>
                updateSetting("offsetX", parseFloat(e.target.value) || 0)
              }
              className="w-16 text-center"
            />
          </div>
        </div>

        {/* Offset Y */}
        <div className="space-y-2">
          <Label className="text-sm">Offset Y (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[settings.offsetY]}
              onValueChange={([v]) => updateSetting("offsetY", v)}
              min={-20}
              max={20}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={settings.offsetY}
              onChange={(e) =>
                updateSetting("offsetY", parseFloat(e.target.value) || 0)
              }
              className="w-16 text-center"
            />
          </div>
        </div>

        {/* Blur */}
        <div className="space-y-2">
          <Label className="text-sm">Blur (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[settings.blur]}
              onValueChange={([v]) => updateSetting("blur", v)}
              min={0}
              max={50}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={settings.blur}
              onChange={(e) =>
                updateSetting("blur", parseFloat(e.target.value) || 0)
              }
              className="w-16 text-center"
            />
          </div>
        </div>

        {/* Spread */}
        <div className="space-y-2">
          <Label className="text-sm">Spread (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[settings.spread]}
              onValueChange={([v]) => updateSetting("spread", v)}
              min={-20}
              max={20}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={settings.spread}
              onChange={(e) =>
                updateSetting("spread", parseFloat(e.target.value) || 0)
              }
              className="w-16 text-center"
            />
          </div>
        </div>
      </div>

      {/* Opacity */}
      <div className="space-y-2">
        <Label className="text-sm">Opacity</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[settings.opacity * 100]}
            onValueChange={([v]) => updateSetting("opacity", v / 100)}
            min={0}
            max={100}
            step={5}
            className="flex-1"
          />
          <div className="w-16 text-center font-mono text-sm">
            {Math.round(settings.opacity * 100)}%
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Control the shadow appearance by adjusting offset, blur, spread, and
          opacity
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// BORDER COLORS EDITOR
// ============================================================================

interface BorderColorsEditorProps {
  borderColors: { light: BorderColors; dark: BorderColors };
  onBorderColorsChange: (colors: {
    light: BorderColors;
    dark: BorderColors;
  }) => void;
  borderWidth: string;
  onBorderWidthChange: (width: string) => void;
  previewMode: "light" | "dark";
  primitives: TokenSystem["primitives"];
  className?: string;
}

export function BorderColorsEditor({
  borderColors,
  onBorderColorsChange,
  borderWidth,
  onBorderWidthChange,
  previewMode,
  primitives,
  className,
}: BorderColorsEditorProps) {
  const currentColors = borderColors[previewMode];

  const updateColor = (key: keyof BorderColors, value: string) => {
    onBorderColorsChange({
      ...borderColors,
      [previewMode]: {
        ...currentColors,
        [key]: value,
      },
    });
  };

  const resetColor = (key: keyof BorderColors) => {
    // Reset to undefined so it uses Tailwind defaults
    const newColors = { ...borderColors };
    delete (newColors[previewMode] as any)[key];
    onBorderColorsChange(newColors);
  };

  // Parse border width to number for slider
  const widthPx = parseFloat(borderWidth) || 1;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Border Width */}
      <div className="space-y-2">
        <Label className="text-sm">Default Border Width</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[widthPx * 2]}
            onValueChange={([v]) => onBorderWidthChange(`${v / 2}px`)}
            min={0}
            max={10}
            step={1}
            className="flex-1"
          />
          <Input
            type="text"
            value={borderWidth}
            onChange={(e) => onBorderWidthChange(e.target.value || "1px")}
            className="w-20 text-center"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Base width for borders (usually 1px)
        </p>
      </div>

      {/* Border Colors */}
      <div className="space-y-4">
        <Label className="text-sm">Border Colors ({previewMode} mode)</Label>
        <div className="grid gap-4">
          <PaletteColorPicker
            label="Border (--border)"
            value={currentColors.default}
            onChange={(color) => updateColor("default", color)}
            onReset={() => resetColor("default")}
            primitives={primitives}
          />
          <PaletteColorPicker
            label="Input Border (--input)"
            value={currentColors.input}
            onChange={(color) => updateColor("input", color)}
            onReset={() => resetColor("input")}
            primitives={primitives}
          />
          <PaletteColorPicker
            label="Focus Ring (--ring)"
            value={currentColors.ring}
            onChange={(color) => updateColor("ring", color)}
            onReset={() => resetColor("ring")}
            primitives={primitives}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LAYOUT EDITOR & PREVIEW
// ============================================================================

interface LayoutEditorProps {
  layout: LayoutTokens;
  onLayoutChange: (layout: LayoutTokens) => void;
  className?: string;
}

export function LayoutEditor({
  layout,
  onLayoutChange,
  className,
}: LayoutEditorProps) {
  const updateBreakpoint = (key: string, value: string) => {
    onLayoutChange({
      ...layout,
      breakpoints: { ...layout.breakpoints, [key]: value },
    });
  };

  const updateContainer = (key: string, value: string) => {
    onLayoutChange({
      ...layout,
      containers: { ...layout.containers, [key]: value },
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Breakpoints</h4>
        <div className="grid gap-3 sm:grid-cols-5">
          {Object.entries(layout.breakpoints).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <Label className="text-xs">{key}</Label>
              <Input
                value={value}
                onChange={(e) => updateBreakpoint(key, e.target.value)}
                placeholder="768px"
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Container Max-Widths</h4>
        <div className="grid gap-3 sm:grid-cols-5">
          {Object.entries(layout.containers).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <Label className="text-xs">{key}</Label>
              <Input
                value={value}
                onChange={(e) => updateContainer(key, e.target.value)}
                placeholder="768px"
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Define responsive breakpoints and container max-widths for your design
        system
      </p>
    </div>
  );
}

interface LayoutPreviewProps {
  layout: LayoutTokens;
  className?: string;
}

export function LayoutPreview({ layout, className }: LayoutPreviewProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Breakpoints Section */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium">Breakpoints</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Screen width thresholds for responsive design. Use these with
            Tailwind&apos;s responsive prefixes (sm:, md:, lg:, xl:, 2xl:).
          </p>
        </div>

        {/* Visual representation */}
        <div className="relative border rounded-lg p-4 bg-muted/30">
          <div className="text-xs text-muted-foreground mb-3">
            Screen widths visualization
          </div>
          <div className="space-y-2">
            {Object.entries(layout.breakpoints).map(([key, value]) => {
              const pxValue = parseInt(value);
              const barWidth = Math.min((pxValue / 1536) * 100, 100);

              const descriptions: Record<string, string> = {
                sm: "Small devices (phones landscape)",
                md: "Medium devices (tablets)",
                lg: "Large devices (laptops)",
                xl: "Extra large (desktops)",
                "2xl": "Wide screens",
              };

              return (
                <div key={key} className="group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 font-mono text-xs font-medium">
                      {key}
                    </div>
                    <div className="flex-1 h-6 bg-muted rounded-sm overflow-hidden relative">
                      <div
                        className="h-full bg-primary/40 rounded-sm flex items-center justify-end pr-2"
                        style={{ width: `${barWidth}%` }}
                      >
                        <span className="text-[10px] font-mono text-primary-foreground/70">
                          {value}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-14 text-[10px] text-muted-foreground">
                    {descriptions[key]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Usage example */}
        <div className="bg-muted/50 rounded-md p-3 font-mono text-xs">
          <div className="text-muted-foreground mb-1">
            {"/* Example: Hide on mobile, show on tablet+ */"}
          </div>
          <div>
            &lt;div className=&quot;hidden{" "}
            <span className="text-primary">md:block</span>
            &quot;&gt;...&lt;/div&gt;
          </div>
        </div>
      </div>

      {/* Containers Section */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium">Container Widths</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Maximum widths for centered content containers at each breakpoint.
            These ensure content doesn&apos;t stretch too wide on large screens.
          </p>
        </div>

        {/* Visual representation */}
        <div className="relative border rounded-lg p-4 bg-muted/30">
          <div className="text-xs text-muted-foreground mb-3">
            Container max-widths at each breakpoint
          </div>
          <div className="space-y-2">
            {Object.entries(layout.containers).map(([key, value]) => {
              const pxValue = parseInt(value);
              const barWidth = Math.min((pxValue / 1536) * 100, 100);

              return (
                <div key={key} className="flex items-center gap-4">
                  <div className="w-10 font-mono text-xs font-medium">
                    {key}
                  </div>
                  <div className="flex-1 h-6 bg-muted rounded-sm overflow-hidden relative">
                    <div
                      className="h-full bg-secondary/40 rounded-sm flex items-center justify-end pr-2"
                      style={{ width: `${barWidth}%` }}
                    >
                      <span className="text-[10px] font-mono text-secondary-foreground/70">
                        {value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Usage example */}
        <div className="bg-muted/50 rounded-md p-3 font-mono text-xs">
          <div className="text-muted-foreground mb-1">
            {"/* Centered container with max-width */"}
          </div>
          <div>
            &lt;div className=&quot;
            <span className="text-primary">container mx-auto</span>
            &quot;&gt;...&lt;/div&gt;
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAILWIND USAGE EXAMPLES
// ============================================================================

interface TailwindUsageExampleProps {
  type:
    | "colors"
    | "typography"
    | "spacing"
    | "radii"
    | "shadows"
    | "borders"
    | "layout";
  className?: string;
}

const usageExamples: Record<
  TailwindUsageExampleProps["type"],
  { title: string; code: string; description: string }
> = {
  colors: {
    title: "Using Colors in Tailwind",
    description:
      "Apply your color tokens using background, text, and border color classes",
    code: `<!-- Background colors -->
<div class="bg-primary">Primary background</div>
<div class="bg-primary-50">Light primary</div>

<!-- Text colors -->
<p class="text-primary">Primary text</p>
<p class="text-secondary-70">Secondary shade</p>

<!-- Border colors -->
<div class="border border-accent">Accent border</div>`,
  },
  typography: {
    title: "Using Typography in Tailwind",
    description: "Apply font sizes, weights, and families to your text",
    code: `<!-- Font sizes -->
<h1 class="text-4xl">Large heading</h1>
<p class="text-base">Body text</p>
<small class="text-sm">Small text</small>

<!-- Font weights -->
<p class="font-bold">Bold text</p>
<p class="font-medium">Medium weight</p>

<!-- Font families -->
<p class="font-sans">Sans-serif text</p>
<code class="font-mono">Monospace code</code>`,
  },
  spacing: {
    title: "Using Spacing in Tailwind",
    description: "Apply margin and padding using your spacing scale",
    code: `<!-- Padding -->
<div class="p-4">All sides padding</div>
<div class="px-6 py-2">Horizontal & vertical</div>

<!-- Margin -->
<div class="m-4">All sides margin</div>
<div class="mt-8 mb-4">Top & bottom margin</div>

<!-- Gap (flexbox/grid) -->
<div class="flex gap-4">Flex with gap</div>`,
  },
  radii: {
    title: "Using Border Radius in Tailwind",
    description: "Round corners using your radius scale",
    code: `<!-- Border radius -->
<div class="rounded">Default radius</div>
<div class="rounded-lg">Large radius</div>
<div class="rounded-full">Full (pill) radius</div>

<!-- Specific corners -->
<div class="rounded-t-lg">Top corners only</div>
<div class="rounded-l-md">Left corners only</div>`,
  },
  shadows: {
    title: "Using Shadows in Tailwind",
    description: "Add depth with your shadow tokens",
    code: `<!-- Box shadows -->
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>

<!-- Inner shadow -->
<div class="shadow-inner">Inset shadow</div>`,
  },
  borders: {
    title: "Using Borders in Tailwind",
    description: "Apply border styles using your border tokens",
    code: `<!-- Border width -->
<div class="border">1px border</div>
<div class="border-2">2px border</div>
<div class="border-4">4px border</div>

<!-- Border style -->
<div class="border-dashed">Dashed border</div>
<div class="border-dotted">Dotted border</div>

<!-- Focus ring -->
<button class="ring-2 ring-offset-2">Button with ring</button>`,
  },
  layout: {
    title: "Using Layout Tokens in Tailwind",
    description: "Create responsive layouts with breakpoints and containers",
    code: `<!-- Responsive breakpoints -->
<div class="w-full md:w-1/2 lg:w-1/3">
  Responsive width
</div>

<!-- Container -->
<div class="container mx-auto px-4">
  Centered container
</div>

<!-- Responsive visibility -->
<div class="hidden sm:block">
  Visible on small screens and up
</div>`,
  },
};

/**
 * Token highlight component - displays token information in a popover
 * @param token - The Tailwind token/class name (e.g., "bg-primary")
 * @param description - Human-readable description of what the token does
 * @param example - Optional CSS example showing the actual value
 * @param children - The content to display (usually the token name)
 */
interface TokenHighlightProps {
  token: string;
  description: string;
  example?: string;
  children: React.ReactNode;
}

function TokenHighlight({
  token,
  description,
  example,
  children,
}: TokenHighlightProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="text-primary hover:text-primary/80 bg-primary/10 px-1 rounded cursor-pointer transition-colors font-mono"
          aria-label={`View details for ${token}`}
        >
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="start">
        <div className="space-y-2">
          <div className="font-mono text-sm font-medium text-primary">
            {token}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
          {example && (
            <div className="bg-muted rounded p-2 font-mono text-xs">
              {example}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function TailwindUsageExample({
  type,
  className,
}: TailwindUsageExampleProps) {
  const example = usageExamples[type];

  // Render interactive code with token highlights
  const renderInteractiveCode = () => {
    switch (type) {
      case "colors":
        return (
          <div className="text-xs font-mono space-y-1">
            <div className="text-muted-foreground">
              {"<!-- Background colors -->"}
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="bg-primary"
                description="Sets the background to your primary brand color (primary.50)"
                example="--color-primary-50: oklch(0.55 0.18 240)"
              >
                bg-primary
              </TokenHighlight>
              &quot;&gt;Primary background&lt;/div&gt;
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="bg-primary-50"
                description="Sets the background to a specific shade of primary (50 = base shade)"
                example="Maps to --color-primary-50"
              >
                bg-primary-50
              </TokenHighlight>
              &quot;&gt;Light primary&lt;/div&gt;
            </div>
            <div className="text-muted-foreground mt-2">
              {"<!-- Text colors -->"}
            </div>
            <div>
              &lt;p class=&quot;
              <TokenHighlight
                token="text-primary"
                description="Sets text color to primary brand color"
                example="color: var(--color-primary)"
              >
                text-primary
              </TokenHighlight>
              &quot;&gt;Primary text&lt;/p&gt;
            </div>
            <div>
              &lt;p class=&quot;
              <TokenHighlight
                token="text-secondary-70"
                description="Sets text to secondary color at shade 70 (darker)"
                example="color: var(--color-secondary-70)"
              >
                text-secondary-70
              </TokenHighlight>
              &quot;&gt;Secondary shade&lt;/p&gt;
            </div>
            <div className="text-muted-foreground mt-2">
              {"<!-- Border colors -->"}
            </div>
            <div>
              &lt;div class=&quot;border
              <TokenHighlight
                token="border-accent"
                description="Sets border color to your accent color"
                example="border-color: var(--color-accent)"
              >
                border-accent
              </TokenHighlight>
              &quot;&gt;Accent border&lt;/div&gt;
            </div>
          </div>
        );
      case "typography":
        return (
          <div className="text-xs font-mono space-y-1">
            <div className="text-muted-foreground">{"<!-- Font sizes -->"}</div>
            <div>
              &lt;h1 class=&quot;
              <TokenHighlight
                token="text-4xl"
                description="Sets font size to 2.25rem (36px) with line-height 2.5rem"
                example="font-size: 2.25rem"
              >
                text-4xl
              </TokenHighlight>
              &quot;&gt;Large heading&lt;/h1&gt;
            </div>
            <div>
              &lt;p class=&quot;
              <TokenHighlight
                token="text-base"
                description="Base font size, typically 1rem (16px)"
                example="font-size: 1rem"
              >
                text-base
              </TokenHighlight>
              &quot;&gt;Body text&lt;/p&gt;
            </div>
            <div className="text-muted-foreground mt-2">
              {"<!-- Font weights -->"}
            </div>
            <div>
              &lt;p class=&quot;
              <TokenHighlight
                token="font-bold"
                description="Sets font weight to 700 (bold)"
                example="font-weight: 700"
              >
                font-bold
              </TokenHighlight>
              &quot;&gt;Bold text&lt;/p&gt;
            </div>
            <div className="text-muted-foreground mt-2">
              {"<!-- Font families -->"}
            </div>
            <div>
              &lt;code class=&quot;
              <TokenHighlight
                token="font-mono"
                description="Uses your monospace font family"
                example="font-family: var(--font-mono)"
              >
                font-mono
              </TokenHighlight>
              &quot;&gt;Monospace code&lt;/code&gt;
            </div>
          </div>
        );
      case "spacing":
        return (
          <div className="text-xs font-mono space-y-1">
            <div className="text-muted-foreground">{"<!-- Padding -->"}</div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="p-4"
                description="Padding on all sides. Value = base unit × 4 (e.g., 16px)"
                example="padding: var(--spacing-4)"
              >
                p-4
              </TokenHighlight>
              &quot;&gt;All sides padding&lt;/div&gt;
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="px-6"
                description="Horizontal padding (left & right). Value = base × 6"
                example="padding-left/right: var(--spacing-6)"
              >
                px-6
              </TokenHighlight>{" "}
              <TokenHighlight
                token="py-2"
                description="Vertical padding (top & bottom). Value = base × 2"
                example="padding-top/bottom: var(--spacing-2)"
              >
                py-2
              </TokenHighlight>
              &quot;&gt;H & V&lt;/div&gt;
            </div>
            <div className="text-muted-foreground mt-2">
              {"<!-- Margin -->"}
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="mt-8"
                description="Top margin only. Value = base unit × 8"
                example="margin-top: var(--spacing-8)"
              >
                mt-8
              </TokenHighlight>{" "}
              <TokenHighlight
                token="mb-4"
                description="Bottom margin only. Value = base unit × 4"
                example="margin-bottom: var(--spacing-4)"
              >
                mb-4
              </TokenHighlight>
              &quot;&gt;Top & bottom margin&lt;/div&gt;
            </div>
            <div className="text-muted-foreground mt-2">
              {"<!-- Gap (flexbox/grid) -->"}
            </div>
            <div>
              &lt;div class=&quot;flex
              <TokenHighlight
                token="gap-4"
                description="Gap between flex/grid items. Value = base × 4"
                example="gap: var(--spacing-4)"
              >
                gap-4
              </TokenHighlight>
              &quot;&gt;Flex with gap&lt;/div&gt;
            </div>
          </div>
        );
      case "radii":
        return (
          <div className="text-xs font-mono space-y-1">
            <div className="text-muted-foreground">
              {"<!-- Border radius -->"}
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="rounded"
                description="Default border radius from your scale"
                example="border-radius: var(--radius)"
              >
                rounded
              </TokenHighlight>
              &quot;&gt;Default radius&lt;/div&gt;
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="rounded-lg"
                description="Large border radius, good for cards"
                example="border-radius: var(--radius-lg)"
              >
                rounded-lg
              </TokenHighlight>
              &quot;&gt;Large radius&lt;/div&gt;
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="rounded-full"
                description="Fully rounded corners (9999px), creates pill shapes"
                example="border-radius: 9999px"
              >
                rounded-full
              </TokenHighlight>
              &quot;&gt;Full (pill) radius&lt;/div&gt;
            </div>
          </div>
        );
      case "shadows":
        return (
          <div className="text-xs font-mono space-y-1">
            <div className="text-muted-foreground">
              {"<!-- Box shadows -->"}
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="shadow-sm"
                description="Small subtle shadow for slight elevation"
                example="box-shadow: var(--shadow-sm)"
              >
                shadow-sm
              </TokenHighlight>
              &quot;&gt;Small shadow&lt;/div&gt;
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="shadow"
                description="Default shadow for cards and elevated elements"
                example="box-shadow: var(--shadow)"
              >
                shadow
              </TokenHighlight>
              &quot;&gt;Default shadow&lt;/div&gt;
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="shadow-lg"
                description="Large shadow for modals and dropdowns"
                example="box-shadow: var(--shadow-lg)"
              >
                shadow-lg
              </TokenHighlight>
              &quot;&gt;Large shadow&lt;/div&gt;
            </div>
          </div>
        );
      case "borders":
        return (
          <div className="text-xs font-mono space-y-1">
            <div className="text-muted-foreground">
              {"<!-- Border width -->"}
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="border"
                description="1px border with your border color token"
                example="border: 1px solid var(--border)"
              >
                border
              </TokenHighlight>
              &quot;&gt;1px border&lt;/div&gt;
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="border-2"
                description="2px border for more emphasis"
                example="border-width: 2px"
              >
                border-2
              </TokenHighlight>
              &quot;&gt;2px border&lt;/div&gt;
            </div>
            <div className="text-muted-foreground mt-2">
              {"<!-- Focus ring -->"}
            </div>
            <div>
              &lt;button class=&quot;
              <TokenHighlight
                token="ring-2"
                description="Focus ring with your ring color token"
                example="box-shadow: 0 0 0 2px var(--ring)"
              >
                ring-2
              </TokenHighlight>{" "}
              <TokenHighlight
                token="ring-offset-2"
                description="Offset between element and ring"
                example="--ring-offset-width: 2px"
              >
                ring-offset-2
              </TokenHighlight>
              &quot;&gt;Button&lt;/button&gt;
            </div>
          </div>
        );
      case "layout":
        return (
          <div className="text-xs font-mono space-y-1">
            <div className="text-muted-foreground">
              {"<!-- Responsive breakpoints -->"}
            </div>
            <div>
              &lt;div class=&quot;w-full
              <TokenHighlight
                token="md:w-1/2"
                description="Width becomes 50% at medium breakpoint (768px+)"
                example="@media (min-width: 768px) { width: 50% }"
              >
                md:w-1/2
              </TokenHighlight>{" "}
              <TokenHighlight
                token="lg:w-1/3"
                description="Width becomes 33% at large breakpoint (1024px+)"
                example="@media (min-width: 1024px) { width: 33% }"
              >
                lg:w-1/3
              </TokenHighlight>
              &quot;&gt;
            </div>
            <div className="text-muted-foreground mt-2">
              {"<!-- Container -->"}
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="container"
                description="Centers content with max-width at each breakpoint"
                example="max-width: var(--container-md) at md breakpoint"
              >
                container
              </TokenHighlight>{" "}
              <TokenHighlight
                token="mx-auto"
                description="Centers the container horizontally"
                example="margin-left: auto; margin-right: auto"
              >
                mx-auto
              </TokenHighlight>
              &quot;&gt;Centered&lt;/div&gt;
            </div>
            <div className="text-muted-foreground mt-2">
              {"<!-- Responsive visibility -->"}
            </div>
            <div>
              &lt;div class=&quot;
              <TokenHighlight
                token="hidden"
                description="Hidden by default (mobile)"
                example="display: none"
              >
                hidden
              </TokenHighlight>{" "}
              <TokenHighlight
                token="sm:block"
                description="Becomes visible at small breakpoint (640px+)"
                example="@media (min-width: 640px) { display: block }"
              >
                sm:block
              </TokenHighlight>
              &quot;&gt;Visible on sm+&lt;/div&gt;
            </div>
          </div>
        );
      default:
        return <pre className="text-xs font-mono">{example.code}</pre>;
    }
  };

  return (
    <div
      className={cn("rounded-lg border bg-muted/30 p-4 space-y-3", className)}
    >
      <div>
        <h4 className="text-sm font-medium">{example.title}</h4>
        <p className="text-xs text-muted-foreground">{example.description}</p>
        <p className="text-xs text-primary mt-1">
          Click on highlighted tokens to see details
        </p>
      </div>
      <div className="bg-muted rounded p-3 overflow-x-auto">
        {renderInteractiveCode()}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT PREVIEW (Browser-like window)
// ============================================================================

interface ComponentPreviewProps {
  tokens: TokenSystem;
  previewMode: "light" | "dark";
  className?: string;
}

export function ComponentPreview({
  tokens,
  previewMode,
  className,
}: ComponentPreviewProps) {
  const bgColor = previewMode === "light" ? "#f9fafb" : "#111827";
  const cardBg = previewMode === "light" ? "#ffffff" : "#1f2937";
  const textColor = previewMode === "light" ? "#111827" : "#f9fafb";
  const mutedText = previewMode === "light" ? "#6b7280" : "#9ca3af";
  const borderColor = previewMode === "light" ? "#e5e7eb" : "#374151";

  const primaryColor = tokens.primitives.primary[50];
  const secondaryColor = tokens.primitives.secondary[50];
  const shadow = tokens.shadows[previewMode].md;
  const radius = tokens.radii.lg;

  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Preview
      </h4>

      {/* Browser-like window */}
      <div className="rounded-lg border overflow-hidden">
        {/* Browser chrome */}
        <div className="bg-muted px-4 py-2 flex items-center gap-2 border-b">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground max-w-xs">
              yourapp.com/dashboard
            </div>
          </div>
        </div>

        {/* Preview content */}
        <div
          className="p-6"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Stats Card */}
            <div
              className="p-4"
              style={{
                backgroundColor: cardBg,
                borderRadius: radius,
                boxShadow: shadow,
              }}
            >
              <div className="text-xs font-medium" style={{ color: mutedText }}>
                Total Revenue
              </div>
              <div className="text-2xl font-bold mt-1">$45,231</div>
              <div className="text-xs mt-1" style={{ color: primaryColor }}>
                +20.1% from last month
              </div>
            </div>

            {/* Stats Card 2 */}
            <div
              className="p-4"
              style={{
                backgroundColor: cardBg,
                borderRadius: radius,
                boxShadow: shadow,
              }}
            >
              <div className="text-xs font-medium" style={{ color: mutedText }}>
                Active Users
              </div>
              <div className="text-2xl font-bold mt-1">2,350</div>
              <div className="text-xs mt-1" style={{ color: secondaryColor }}>
                +180 new this week
              </div>
            </div>

            {/* Button Card */}
            <div
              className="p-4 flex flex-col gap-3"
              style={{
                backgroundColor: cardBg,
                borderRadius: radius,
                boxShadow: shadow,
              }}
            >
              <button
                className="px-4 py-2 text-sm font-medium text-white w-full"
                style={{
                  backgroundColor: primaryColor,
                  borderRadius: tokens.radii.md,
                }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 text-sm font-medium w-full"
                style={{
                  backgroundColor: "transparent",
                  borderRadius: tokens.radii.md,
                  border: `1px solid ${borderColor}`,
                  color: textColor,
                }}
              >
                Secondary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
