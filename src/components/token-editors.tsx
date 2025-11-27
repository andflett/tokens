"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ColorPicker } from "@/components/color-picker";
import type { TokenSystem, ShadowSettings, BorderColors, LayoutTokens } from "@/lib/types";

// ============================================================================
// SPACING EDITOR & PREVIEW
// ============================================================================

interface SpacingPreviewProps {
  spacing: Record<string, string>;
  className?: string;
}

export function SpacingPreview({ spacing, className }: SpacingPreviewProps) {
  // Show a subset of commonly used spacing values
  const displayKeys = ['1', '2', '3', '4', '6', '8', '12', '16', '24'];
  
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
                {value} <span className="text-muted-foreground/50">({pxValue}px)</span>
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

export function SpacingEditor({ baseUnit, onBaseUnitChange, className }: SpacingEditorProps) {
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
  typography: TokenSystem['typography'];
  previewMode: 'light' | 'dark';
  className?: string;
}

export function TypographyPreview({ typography, previewMode, className }: TypographyPreviewProps) {
  const bgColor = previewMode === 'light' ? '#ffffff' : '#0a0a0a';
  const textColor = previewMode === 'light' ? '#0a0a0a' : '#fafafa';
  
  return (
    <div 
      className={cn("rounded-lg p-6 space-y-6", className)}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Font Sizes */}
      <div className="space-y-4">
        <h4 className="text-xs font-medium uppercase tracking-wider opacity-50">Font Sizes</h4>
        <div className="space-y-3">
          {Object.entries(typography.fontSize).slice(0, 7).map(([name, [size, { lineHeight }]]) => (
            <div key={name} className="flex items-baseline gap-4">
              <div className="w-12 font-mono text-xs opacity-50">{name}</div>
              <div style={{ fontSize: size, lineHeight }}>
                The quick brown fox
              </div>
              <div className="font-mono text-xs opacity-30">
                {size}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Weights */}
      <div className="space-y-4">
        <h4 className="text-xs font-medium uppercase tracking-wider opacity-50">Font Weights</h4>
        <div className="flex flex-wrap gap-4">
          {['light', 'normal', 'medium', 'semibold', 'bold'].map((weight) => (
            <div 
              key={weight} 
              className="text-lg"
              style={{ fontWeight: typography.fontWeight[weight] }}
            >
              {weight}
            </div>
          ))}
        </div>
      </div>

      {/* Font Families */}
      <div className="space-y-4">
        <h4 className="text-xs font-medium uppercase tracking-wider opacity-50">Font Families</h4>
        <div className="space-y-2">
          <div style={{ fontFamily: typography.fontFamily.sans.join(', ') }}>
            Sans: {typography.fontFamily.sans[0]}
          </div>
          <div style={{ fontFamily: typography.fontFamily.mono.join(', ') }}>
            Mono: {typography.fontFamily.mono[0]}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TypographyEditorProps {
  typography: TokenSystem['typography'];
  onTypographyChange: (typography: TokenSystem['typography']) => void;
  className?: string;
}

export function TypographyEditor({ typography, onTypographyChange, className }: TypographyEditorProps) {
  const updateFontFamily = (type: 'sans' | 'mono', value: string) => {
    onTypographyChange({
      ...typography,
      fontFamily: {
        ...typography.fontFamily,
        [type]: [value, ...typography.fontFamily[type].slice(1)],
      },
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm">Sans Font</Label>
          <Input
            value={typography.fontFamily.sans[0]}
            onChange={(e) => updateFontFamily('sans', e.target.value)}
            placeholder="Inter"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm">Mono Font</Label>
          <Input
            value={typography.fontFamily.mono[0]}
            onChange={(e) => updateFontFamily('mono', e.target.value)}
            placeholder="JetBrains Mono"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Font sizes and weights use a standard scale optimized for readability
      </p>
    </div>
  );
}

// ============================================================================
// BORDER RADIUS EDITOR & PREVIEW
// ============================================================================

interface RadiiPreviewProps {
  radii: Record<string, string>;
  previewMode: 'light' | 'dark';
  className?: string;
}

export function RadiiPreview({ radii, previewMode, className }: RadiiPreviewProps) {
  const bgColor = previewMode === 'light' ? '#ffffff' : '#0a0a0a';
  const boxBg = previewMode === 'light' ? '#e5e7eb' : '#374151';
  const borderColor = previewMode === 'light' ? '#d1d5db' : '#4b5563';
  
  const displayKeys = ['none', 'sm', 'DEFAULT', 'md', 'lg', 'xl', '2xl', 'full'];
  
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
                  {key === 'DEFAULT' ? 'default' : key}
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
  className?: string;
}

export function RadiiEditor({ baseRadius, onBaseRadiusChange, className }: RadiiEditorProps) {
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
            onChange={(e) => onBaseRadiusChange(parseFloat(e.target.value) || 0.25)}
            className="w-20 text-center"
            min={0}
            max={1}
            step={0.05}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          The radius scale is derived from this base value
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// SHADOWS EDITOR & PREVIEW
// ============================================================================

interface ShadowsPreviewProps {
  shadows: TokenSystem['shadows'];
  previewMode: 'light' | 'dark';
  className?: string;
}

export function ShadowsPreview({ shadows, previewMode, className }: ShadowsPreviewProps) {
  const bgColor = previewMode === 'light' ? '#f3f4f6' : '#111827';
  const boxBg = previewMode === 'light' ? '#ffffff' : '#1f2937';
  const modeShadows = shadows[previewMode];
  
  const displayKeys = ['sm', 'DEFAULT', 'md', 'lg', 'xl', '2xl'];
  
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
                {key === 'DEFAULT' ? 'default' : key}
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

export function ShadowsEditor({ shadowIntensity, onShadowIntensityChange, className }: ShadowsEditorProps) {
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
  previewMode: 'light' | 'dark';
  borderColors?: BorderColors;
  className?: string;
}

export function BordersPreview({ previewMode, borderColors, className }: BordersPreviewProps) {
  const bgColor = previewMode === 'light' ? '#ffffff' : '#0a0a0a';
  const defaultBorderColor = borderColors?.default || (previewMode === 'light' ? '#e5e7eb' : '#374151');
  const inputBorderColor = borderColors?.input || (previewMode === 'light' ? '#d1d5db' : '#4b5563');
  const ringColor = borderColors?.ring || (previewMode === 'light' ? '#9ca3af' : '#6b7280');
  
  const widths = [
    { name: '1', value: '1px' },
    { name: '2', value: '2px' },
    { name: '4', value: '4px' },
  ];
  
  const styles = [
    { name: 'solid', value: 'solid' },
    { name: 'dashed', value: 'dashed' },
    { name: 'dotted', value: 'dotted' },
  ];
  
  return (
    <div 
      className={cn("rounded-lg p-6 space-y-6", className)}
      style={{ backgroundColor: bgColor }}
    >
      {/* Border Colors */}
      <div className="space-y-3">
        <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Colors</h4>
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-12 w-12 rounded-md border-2"
              style={{ borderColor: defaultBorderColor }}
            />
            <div className="font-mono text-xs text-muted-foreground">border</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-12 w-12 rounded-md border-2"
              style={{ borderColor: inputBorderColor }}
            />
            <div className="font-mono text-xs text-muted-foreground">input</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-12 w-12 rounded-md"
              style={{ 
                boxShadow: `0 0 0 3px ${ringColor}`,
              }}
            />
            <div className="font-mono text-xs text-muted-foreground">ring</div>
          </div>
        </div>
      </div>
      
      {/* Border Widths */}
      <div className="space-y-3">
        <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Widths</h4>
        <div className="flex gap-4">
          {widths.map(({ name, value }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="h-12 w-12 rounded-md"
                style={{ 
                  borderWidth: value,
                  borderStyle: 'solid',
                  borderColor: defaultBorderColor,
                }}
              />
              <div className="font-mono text-xs text-muted-foreground">{value}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Border Styles */}
      <div className="space-y-3">
        <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Styles</h4>
        <div className="flex gap-4">
          {styles.map(({ name, value }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="h-12 w-12 rounded-md"
                style={{ 
                  borderWidth: '2px',
                  borderStyle: value,
                  borderColor: defaultBorderColor,
                }}
              />
              <div className="font-mono text-xs text-muted-foreground">{name}</div>
            </div>
          ))}
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
        {showEditor && (
          <div className="border-b pb-6">
            {editor}
          </div>
        )}
        <div>
          {preview}
        </div>
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

export function ShadowsEditorAdvanced({ settings, onSettingsChange, className }: ShadowsEditorAdvancedProps) {
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
              onValueChange={([v]) => updateSetting('offsetX', v)}
              min={-20}
              max={20}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={settings.offsetX}
              onChange={(e) => updateSetting('offsetX', parseFloat(e.target.value) || 0)}
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
              onValueChange={([v]) => updateSetting('offsetY', v)}
              min={-20}
              max={20}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={settings.offsetY}
              onChange={(e) => updateSetting('offsetY', parseFloat(e.target.value) || 0)}
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
              onValueChange={([v]) => updateSetting('blur', v)}
              min={0}
              max={50}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={settings.blur}
              onChange={(e) => updateSetting('blur', parseFloat(e.target.value) || 0)}
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
              onValueChange={([v]) => updateSetting('spread', v)}
              min={-20}
              max={20}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={settings.spread}
              onChange={(e) => updateSetting('spread', parseFloat(e.target.value) || 0)}
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
            onValueChange={([v]) => updateSetting('opacity', v / 100)}
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
          Control the shadow appearance by adjusting offset, blur, spread, and opacity
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
  onBorderColorsChange: (colors: { light: BorderColors; dark: BorderColors }) => void;
  previewMode: 'light' | 'dark';
  className?: string;
}

export function BorderColorsEditor({ borderColors, onBorderColorsChange, previewMode, className }: BorderColorsEditorProps) {
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

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-sm text-muted-foreground">
        Customize border colors for {previewMode} mode
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <ColorPicker
          label="Border Color"
          value={currentColors.default}
          onChange={(color) => updateColor('default', color)}
        />
        <ColorPicker
          label="Input Border"
          value={currentColors.input}
          onChange={(color) => updateColor('input', color)}
        />
        <ColorPicker
          label="Ring Color"
          value={currentColors.ring}
          onChange={(color) => updateColor('ring', color)}
        />
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

export function LayoutEditor({ layout, onLayoutChange, className }: LayoutEditorProps) {
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
        Define responsive breakpoints and container max-widths for your design system
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
    <div className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Breakpoints</h4>
        <div className="space-y-2">
          {Object.entries(layout.breakpoints).map(([key, value]) => {
            const pxValue = parseInt(value);
            const barWidth = Math.min((pxValue / 1536) * 100, 100);
            
            return (
              <div key={key} className="flex items-center gap-4">
                <div className="w-10 font-mono text-xs text-muted-foreground">{key}</div>
                <div className="flex-1 h-4 bg-muted rounded-sm overflow-hidden">
                  <div 
                    className="h-full bg-foreground/20 rounded-sm"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <div className="w-16 font-mono text-xs text-muted-foreground text-right">{value}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Containers</h4>
        <div className="space-y-2">
          {Object.entries(layout.containers).map(([key, value]) => {
            const pxValue = parseInt(value);
            const barWidth = Math.min((pxValue / 1536) * 100, 100);
            
            return (
              <div key={key} className="flex items-center gap-4">
                <div className="w-10 font-mono text-xs text-muted-foreground">{key}</div>
                <div className="flex-1 h-4 bg-muted rounded-sm overflow-hidden">
                  <div 
                    className="h-full bg-primary/30 rounded-sm"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <div className="w-16 font-mono text-xs text-muted-foreground text-right">{value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAILWIND USAGE EXAMPLES
// ============================================================================

interface TailwindUsageExampleProps {
  type: 'colors' | 'typography' | 'spacing' | 'radii' | 'shadows' | 'borders' | 'layout';
  className?: string;
}

const usageExamples: Record<TailwindUsageExampleProps['type'], { title: string; code: string; description: string }> = {
  colors: {
    title: 'Using Colors in Tailwind',
    description: 'Apply your color tokens using background, text, and border color classes',
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
    title: 'Using Typography in Tailwind',
    description: 'Apply font sizes, weights, and families to your text',
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
    title: 'Using Spacing in Tailwind',
    description: 'Apply margin and padding using your spacing scale',
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
    title: 'Using Border Radius in Tailwind',
    description: 'Round corners using your radius scale',
    code: `<!-- Border radius -->
<div class="rounded">Default radius</div>
<div class="rounded-lg">Large radius</div>
<div class="rounded-full">Full (pill) radius</div>

<!-- Specific corners -->
<div class="rounded-t-lg">Top corners only</div>
<div class="rounded-l-md">Left corners only</div>`,
  },
  shadows: {
    title: 'Using Shadows in Tailwind',
    description: 'Add depth with your shadow tokens',
    code: `<!-- Box shadows -->
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>

<!-- Inner shadow -->
<div class="shadow-inner">Inset shadow</div>`,
  },
  borders: {
    title: 'Using Borders in Tailwind',
    description: 'Apply border styles using your border tokens',
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
    title: 'Using Layout Tokens in Tailwind',
    description: 'Create responsive layouts with breakpoints and containers',
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

export function TailwindUsageExample({ type, className }: TailwindUsageExampleProps) {
  const example = usageExamples[type];
  
  return (
    <div className={cn("rounded-lg border bg-muted/30 p-4 space-y-3", className)}>
      <div>
        <h4 className="text-sm font-medium">{example.title}</h4>
        <p className="text-xs text-muted-foreground">{example.description}</p>
      </div>
      <pre className="text-xs font-mono bg-muted rounded p-3 overflow-x-auto">
        {example.code}
      </pre>
    </div>
  );
}

// ============================================================================
// COMPONENT PREVIEW (Browser-like window)
// ============================================================================

interface ComponentPreviewProps {
  tokens: TokenSystem;
  previewMode: 'light' | 'dark';
  className?: string;
}

export function ComponentPreview({ tokens, previewMode, className }: ComponentPreviewProps) {
  const bgColor = previewMode === 'light' ? '#f9fafb' : '#111827';
  const cardBg = previewMode === 'light' ? '#ffffff' : '#1f2937';
  const textColor = previewMode === 'light' ? '#111827' : '#f9fafb';
  const mutedText = previewMode === 'light' ? '#6b7280' : '#9ca3af';
  const borderColor = previewMode === 'light' ? '#e5e7eb' : '#374151';
  
  const primaryColor = tokens.primitives.primary[50];
  const secondaryColor = tokens.primitives.secondary[50];
  const shadow = tokens.shadows[previewMode].md;
  const radius = tokens.radii.lg;

  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Preview</h4>
      
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
                  backgroundColor: 'transparent',
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
