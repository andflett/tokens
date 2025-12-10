"use client";

import * as React from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  /** Current color value (hex) */
  value: string;
  /** Callback when color changes */
  onChange: (color: string) => void;
  /** Label for the color picker */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Color picker with popover and hex input
 */
export function ColorPicker({
  value,
  onChange,
  label,
  className,
}: ColorPickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className="text-sm font-medium">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            intent="secondary"
            variant="outline"
            className={cn(
              "border-border w-full justify-start gap-2 font-mono text-sm",
              !value && "text-muted-foreground"
            )}
          >
            <div
              className="h-5 w-5 rounded border border-border"
              style={{ backgroundColor: value }}
            />
            <span>{value.toUpperCase()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div className="space-y-3">
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
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface BrandColorPickersProps {
  /** Primary color */
  primary: string;
  /** Secondary color */
  secondary: string;
  /** Callback when any color changes */
  onChange: (colors: { primary: string; secondary: string }) => void;
  /** Color history for quick selection */
  colorHistory?: { primary: string; secondary: string }[];
  /** Callback when selecting from history */
  onSelectFromHistory?: (colors: {
    primary: string;
    secondary: string;
  }) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Two color pickers for brand colors (primary and secondary)
 * Other colors (neutral, success, destructive, warning) are derived automatically
 */
export function BrandColorPickers({
  primary,
  secondary,
  onChange,
  colorHistory,
  onSelectFromHistory,
  className,
}: BrandColorPickersProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      <ColorPicker
        value={primary}
        onChange={(color) => onChange({ primary: color, secondary })}
      />
      <ColorPicker
        value={secondary}
        onChange={(color) => onChange({ primary, secondary: color })}
      />
    </div>
  );
}
