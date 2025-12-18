"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
            <span className="text-xs font-mono text-foreground">
              {saturation}%
            </span>
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
            <span className="text-xs font-mono text-foreground">
              {lightness}%
            </span>
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
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${Math.max(
                  10,
                  lightness - 30
                )}%)`,
              }}
            />
            <div
              className="h-8 rounded border border-border"
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${Math.max(
                  10,
                  lightness - 15
                )}%)`,
              }}
            />
            <div
              className="h-8 rounded border border-border ring-2 ring-primary/30"
              style={{ backgroundColor: previewColor }}
            />
            <div
              className="h-8 rounded border border-border"
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${Math.min(
                  90,
                  lightness + 15
                )}%)`,
              }}
            />
            <div
              className="h-8 rounded border border-border"
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${Math.min(
                  95,
                  lightness + 30
                )}%)`,
              }}
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
          <span className="text-xs font-mono text-foreground">
            {baseUnit}px
          </span>
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
            <span className="text-xs font-mono text-foreground">
              {baseSize}px
            </span>
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
            <span className="text-xs font-mono text-foreground">
              {scale.toFixed(2)}
            </span>
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
          <span className="text-xs font-mono text-foreground">
            {baseRadius}px
          </span>
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
            <span className="text-xs font-mono text-foreground">
              {spread}px
            </span>
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
                    boxShadow: `0 ${level.offsetY}px ${level.blur}px ${spread}px rgba(0, 0, 0, 0.1)`,
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

// Curve presets
const CURVE_PRESETS = {
  easeOut: [
    { name: "Smooth", curve: { x1: 0, y1: 0, x2: 0.2, y2: 1 } },
    { name: "Snappy", curve: { x1: 0, y1: 0, x2: 0.1, y2: 1 } },
    { name: "Gentle", curve: { x1: 0, y1: 0, x2: 0.4, y2: 1 } },
  ],
  spring: [
    { name: "Bouncy", curve: { x1: 0.34, y1: 1.56, x2: 0.64, y2: 1 } },
    { name: "Soft", curve: { x1: 0.22, y1: 1.2, x2: 0.36, y2: 1 } },
    { name: "Elastic", curve: { x1: 0.68, y1: -0.55, x2: 0.27, y2: 1.55 } },
  ],
};

// Curve preview component
function CurvePreview({
  curve,
  size = 48,
  isActive = false,
}: {
  curve: { x1: number; y1: number; x2: number; y2: number };
  size?: number;
  isActive?: boolean;
}) {
  const padding = 6;
  const graphSize = size - padding * 2;

  const x1 = padding + curve.x1 * graphSize;
  const y1 = padding + graphSize - curve.y1 * graphSize;
  const x2 = padding + curve.x2 * graphSize;
  const y2 = padding + graphSize - curve.y2 * graphSize;

  const startX = padding;
  const startY = padding + graphSize;
  const endX = padding + graphSize;
  const endY = padding;

  return (
    <svg width={size} height={size} className="overflow-visible">
      <rect
        x={padding}
        y={padding}
        width={graphSize}
        height={graphSize}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.1}
        rx={3}
      />
      <path
        d={`M ${startX} ${startY} C ${x1} ${y1}, ${x2} ${y2}, ${endX} ${endY}`}
        fill="none"
        stroke={isActive ? "hsl(var(--primary))" : "currentColor"}
        strokeWidth={2}
        strokeOpacity={isActive ? 1 : 0.6}
      />
      <circle
        cx={x1}
        cy={y1}
        r={2.5}
        fill={isActive ? "hsl(var(--primary))" : "currentColor"}
      />
      <circle
        cx={x2}
        cy={y2}
        r={2.5}
        fill={isActive ? "hsl(var(--primary))" : "currentColor"}
      />
    </svg>
  );
}

// Curve editor with expandable controls
function MiniCurveEditor({
  label,
  curve,
  onChange,
  presets,
}: {
  label: string;
  curve: { x1: number; y1: number; x2: number; y2: number };
  onChange: (curve: { x1: number; y1: number; x2: number; y2: number }) => void;
  presets: typeof CURVE_PRESETS.easeOut;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <div className="space-y-2 border border-border rounded-lg p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <CurvePreview curve={curve} size={40} isActive />
          <div>
            <div className="text-xs font-medium">{label}</div>
            <div className="text-[9px] font-mono text-muted-foreground">
              cubic-bezier({curve.x1}, {curve.y1}, {curve.x2}, {curve.y2})
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] h-6 px-2"
        >
          {expanded ? "Less" : "Edit"}
        </Button>
      </div>

      {expanded && (
        <div className="space-y-3 pt-2">
          {/* Presets */}
          <div className="flex gap-1.5 flex-wrap">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => onChange(preset.curve)}
                className="text-[10px] h-6 px-2"
              >
                {preset.name}
              </Button>
            ))}
          </div>

          {/* Custom controls */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px]">Control Point 1</Label>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-muted-foreground w-3">
                    X
                  </span>
                  <Slider
                    value={[curve.x1 * 100]}
                    onValueChange={([v]) => onChange({ ...curve, x1: v / 100 })}
                    min={0}
                    max={100}
                    step={1}
                    className="flex-1 h-1"
                  />
                  <span className="text-[9px] font-mono w-8">
                    {curve.x1.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-muted-foreground w-3">
                    Y
                  </span>
                  <Slider
                    value={[(curve.y1 + 1) * 50]}
                    onValueChange={([v]) =>
                      onChange({ ...curve, y1: v / 50 - 1 })
                    }
                    min={0}
                    max={150}
                    step={1}
                    className="flex-1 h-1"
                  />
                  <span className="text-[9px] font-mono w-8">
                    {curve.y1.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px]">Control Point 2</Label>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-muted-foreground w-3">
                    X
                  </span>
                  <Slider
                    value={[curve.x2 * 100]}
                    onValueChange={([v]) => onChange({ ...curve, x2: v / 100 })}
                    min={0}
                    max={100}
                    step={1}
                    className="flex-1 h-1"
                  />
                  <span className="text-[9px] font-mono w-8">
                    {curve.x2.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-muted-foreground w-3">
                    Y
                  </span>
                  <Slider
                    value={[(curve.y2 + 1) * 50]}
                    onValueChange={([v]) =>
                      onChange({ ...curve, y2: v / 50 - 1 })
                    }
                    min={0}
                    max={150}
                    step={1}
                    className="flex-1 h-1"
                  />
                  <span className="text-[9px] font-mono w-8">
                    {curve.y2.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview panel */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] text-muted-foreground">
                Preview
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAnimate}
                className="text-[10px] h-5 px-2"
              >
                Test
              </Button>
            </div>
            <div className="bg-muted/30 px-3 py-2.5 rounded">
              <div
                className={cn(
                  "h-3 w-3 bg-primary rounded-sm transition-transform",
                  isAnimating && "translate-x-[100px]"
                )}
                style={{
                  transitionDuration: "400ms",
                  transitionTimingFunction: `cubic-bezier(${curve.x1}, ${curve.y1}, ${curve.x2}, ${curve.y2})`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AnimationEditorMini() {
  const [easeOut, setEaseOut] = useState({ x1: 0, y1: 0, x2: 0.2, y2: 1 });
  const [spring, setSpring] = useState({ x1: 0.34, y1: 1.56, x2: 0.64, y2: 1 });

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card p-3 space-y-2.5">
      <MiniCurveEditor
        label="Ease Out"
        curve={easeOut}
        onChange={setEaseOut}
        presets={CURVE_PRESETS.easeOut}
      />
      <MiniCurveEditor
        label="Spring"
        curve={spring}
        onChange={setSpring}
        presets={CURVE_PRESETS.spring}
      />
    </div>
  );
}
