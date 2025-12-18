"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ============================================================================
// COLOR EDITOR MINI
// ============================================================================

export function ColorEditorMini() {
  const [hue, setHue] = useState(220);
  const [saturation, setSaturation] = useState(80);
  const [lightness, setLightness] = useState(50);

  const previewColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card p-4 space-y-3">
      {/* Controls */}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Hue</Label>
            <span className="text-xs font-mono text-foreground">{hue}°</span>
          </div>
          <Slider
            value={[hue]}
            onValueChange={([v]) => setHue(v)}
            min={0}
            max={360}
            step={1}
            className="h-1.5"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Saturation</Label>
            <span className="text-xs font-mono text-foreground">{saturation}%</span>
          </div>
          <Slider
            value={[saturation]}
            onValueChange={([v]) => setSaturation(v)}
            min={0}
            max={100}
            step={1}
            className="h-1.5"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Lightness</Label>
            <span className="text-xs font-mono text-foreground">{lightness}%</span>
          </div>
          <Slider
            value={[lightness]}
            onValueChange={([v]) => setLightness(v)}
            min={0}
            max={100}
            step={1}
            className="h-1.5"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="pt-2">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Preview</Label>
          <div className="grid grid-cols-5 gap-1.5">
            <div 
              className="h-8 rounded border border-border"
              style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${Math.max(10, lightness - 30)}%)` }}
            />
            <div 
              className="h-8 rounded border border-border"
              style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${Math.max(10, lightness - 15)}%)` }}
            />
            <div 
              className="h-8 rounded border border-border ring-2 ring-primary/30"
              style={{ backgroundColor: previewColor }}
            />
            <div 
              className="h-8 rounded border border-border"
              style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${Math.min(90, lightness + 15)}%)` }}
            />
            <div 
              className="h-8 rounded border border-border"
              style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${Math.min(95, lightness + 30)}%)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SPACING EDITOR MINI
// ============================================================================

export function SpacingEditorMini() {
  const [baseUnit, setBaseUnit] = useState(4);

  const spacingValues = [1, 2, 4, 6, 8, 12, 16];

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card p-4 space-y-3">
      {/* Control */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Base Unit</Label>
          <span className="text-xs font-mono text-foreground">{baseUnit}px</span>
        </div>
        <Slider
          value={[baseUnit]}
          onValueChange={([v]) => setBaseUnit(v)}
          min={2}
          max={8}
          step={1}
          className="h-1.5"
        />
      </div>

      {/* Preview */}
      <div className="pt-2">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Preview</Label>
          <div className="space-y-1.5">
            {spacingValues.map((multiplier) => {
              const value = baseUnit * multiplier;
              return (
                <div key={multiplier} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground w-8">
                    {multiplier}
                  </span>
                  <div 
                    className="h-4 bg-primary/60 rounded-sm"
                    style={{ width: `${Math.min(value * 2, 120)}px` }}
                  />
                  <span className="text-xs font-mono text-muted-foreground">
                    {value}px
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TYPOGRAPHY EDITOR MINI
// ============================================================================

export function TypographyEditorMini() {
  const [scale, setScale] = useState(1.2);
  const [baseSize, setBaseSize] = useState(16);

  const sizes = [
    { name: "xs", multiplier: Math.pow(scale, -2) },
    { name: "sm", multiplier: Math.pow(scale, -1) },
    { name: "base", multiplier: 1 },
    { name: "lg", multiplier: scale },
    { name: "xl", multiplier: Math.pow(scale, 2) },
  ];

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card p-4 space-y-3">
      {/* Controls */}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Base Size</Label>
            <span className="text-xs font-mono text-foreground">{baseSize}px</span>
          </div>
          <Slider
            value={[baseSize]}
            onValueChange={([v]) => setBaseSize(v)}
            min={12}
            max={20}
            step={1}
            className="h-1.5"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Scale Ratio</Label>
            <span className="text-xs font-mono text-foreground">{scale.toFixed(2)}</span>
          </div>
          <Slider
            value={[scale]}
            onValueChange={([v]) => setScale(v)}
            min={1.1}
            max={1.4}
            step={0.05}
            className="h-1.5"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="pt-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Preview</Label>
          <div className="space-y-1">
            {sizes.map((size) => {
              const fontSize = Math.round(baseSize * size.multiplier);
              return (
                <div key={size.name} className="flex items-baseline gap-2">
                  <span className="text-xs font-mono text-muted-foreground w-10">
                    {size.name}
                  </span>
                  <span 
                    className="font-medium text-foreground"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    Aa
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {fontSize}px
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// BORDER RADIUS EDITOR MINI
// ============================================================================

export function BorderRadiusEditorMini() {
  const [baseRadius, setBaseRadius] = useState(8);

  const radiusValues = [
    { name: "sm", multiplier: 0.5 },
    { name: "md", multiplier: 1 },
    { name: "lg", multiplier: 1.5 },
    { name: "xl", multiplier: 2 },
  ];

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card p-4 space-y-3">
      {/* Control */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Base Radius</Label>
          <span className="text-xs font-mono text-foreground">{baseRadius}px</span>
        </div>
        <Slider
          value={[baseRadius]}
          onValueChange={([v]) => setBaseRadius(v)}
          min={2}
          max={16}
          step={1}
          className="h-1.5"
        />
      </div>

      {/* Preview */}
      <div className="pt-2">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Preview</Label>
          <div className="grid grid-cols-4 gap-2">
            {radiusValues.map((radius) => {
              const value = baseRadius * radius.multiplier;
              return (
                <div key={radius.name} className="space-y-1">
                  <div 
                    className="h-12 w-full bg-primary/60 border border-border"
                    style={{ borderRadius: `${value}px` }}
                  />
                  <div className="text-center">
                    <div className="text-xs font-mono text-muted-foreground">
                      {radius.name}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground/60">
                      {value}px
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SHADOW EDITOR MINI
// ============================================================================

export function ShadowEditorMini() {
  const [blur, setBlur] = useState(16);
  const [spread, setSpread] = useState(0);

  const shadowLevels = [
    { name: "sm", offsetY: 2, blur: blur * 0.25 },
    { name: "md", offsetY: 4, blur: blur * 0.5 },
    { name: "lg", offsetY: 8, blur: blur },
  ];

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card p-4 space-y-3">
      {/* Controls */}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Blur Radius</Label>
            <span className="text-xs font-mono text-foreground">{blur}px</span>
          </div>
          <Slider
            value={[blur]}
            onValueChange={([v]) => setBlur(v)}
            min={4}
            max={32}
            step={2}
            className="h-1.5"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Spread</Label>
            <span className="text-xs font-mono text-foreground">{spread}px</span>
          </div>
          <Slider
            value={[spread]}
            onValueChange={([v]) => setSpread(v)}
            min={-4}
            max={4}
            step={1}
            className="h-1.5"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="pt-2">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Preview</Label>
          <div className="bg-muted/30 p-4 rounded-md space-y-3">
            {shadowLevels.map((level) => (
              <div key={level.name} className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-8">
                  {level.name}
                </span>
                <div 
                  className="flex-1 h-8 bg-card rounded border border-border"
                  style={{ 
                    boxShadow: `0 ${level.offsetY}px ${level.blur}px ${spread}px rgba(0, 0, 0, 0.1)`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ANIMATION EDITOR MINI
// ============================================================================

export function AnimationEditorMini() {
  const [duration, setDuration] = useState(300);
  const [selectedCurve, setSelectedCurve] = useState("ease-out");
  const [isAnimating, setIsAnimating] = useState(false);

  const curves = [
    { name: "ease-out", value: "cubic-bezier(0, 0, 0.2, 1)" },
    { name: "ease-in-out", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
    { name: "spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    { name: "linear", value: "linear" },
  ];

  const handleAnimate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), duration + 50);
  };

  const currentCurve = curves.find((c) => c.name === selectedCurve)?.value || curves[0].value;

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card p-4 space-y-3">
      {/* Controls */}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Duration</Label>
            <span className="text-xs font-mono text-foreground">{duration}ms</span>
          </div>
          <Slider
            value={[duration]}
            onValueChange={([v]) => setDuration(v)}
            min={100}
            max={600}
            step={50}
            className="h-1.5"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Easing Curve</Label>
          <div className="grid grid-cols-2 gap-1.5">
            {curves.map((curve) => (
              <button
                key={curve.name}
                onClick={() => setSelectedCurve(curve.name)}
                className={cn(
                  "px-2 py-1.5 rounded text-xs font-medium border transition-colors",
                  selectedCurve === curve.name
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
                )}
              >
                {curve.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="pt-2">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Preview</Label>
            <button
              onClick={handleAnimate}
              className="text-xs px-2 py-0.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Animate
            </button>
          </div>
          <div className="bg-muted/30 p-4 rounded-md">
            <div className="flex gap-2">
              <div
                className={cn(
                  "h-8 w-8 bg-primary rounded",
                  isAnimating && "translate-x-[120px]"
                )}
                style={{
                  transition: `transform ${duration}ms ${currentCurve}`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
