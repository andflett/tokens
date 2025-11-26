"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TokenSystem } from "@/lib/types";

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
  className?: string;
}

export function BordersPreview({ previewMode, className }: BordersPreviewProps) {
  const bgColor = previewMode === 'light' ? '#ffffff' : '#0a0a0a';
  const borderColor = previewMode === 'light' ? '#e5e7eb' : '#374151';
  
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
                  borderColor,
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
                  borderColor,
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
