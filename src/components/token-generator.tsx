"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BrandColorPickers } from "@/components/color-picker";
import { PalettePreview, SemanticColorPreview } from "@/components/color-preview";
import { ExportDialog } from "@/components/export-dialog";
import {
  SpacingPreview,
  SpacingEditor,
  TypographyPreview,
  TypographyEditor,
  RadiiPreview,
  RadiiEditor,
  ShadowsPreview,
  ShadowsEditor,
  BordersPreview,
} from "@/components/token-editors";
import { generateTokens, generateSpacingScale, generateRadiiScale, generateShadowsWithIntensity } from "@/lib/tokens";
import { config } from "@/lib/config";
import type { BrandColors, TokenSystem } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  SwatchIcon,
  ArrowsPointingOutIcon,
  DocumentTextIcon,
  Square3Stack3DIcon,
  StopIcon,
} from "@heroicons/react/24/outline";

interface TokenGeneratorProps {
  /** Initial brand colors */
  initialColors?: BrandColors;
  /** Callback when tokens are generated */
  onGenerate?: (tokens: TokenSystem) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Main token generator component
 * Allows users to pick colors and generate a complete design token system
 */
export function TokenGenerator({
  initialColors,
  onGenerate,
  className,
}: TokenGeneratorProps) {
  const [brandColors, setBrandColors] = React.useState<BrandColors>(
    initialColors || config.defaultBrandColors
  );
  const [mode, setMode] = React.useState<"light" | "dark" | "both">("both");
  const [tokens, setTokens] = React.useState<TokenSystem | null>(null);
  const [previewMode, setPreviewMode] = React.useState<"light" | "dark">("light");
  const [exportOpen, setExportOpen] = React.useState(false);
  
  // Token customization state
  const [spacingBaseUnit, setSpacingBaseUnit] = React.useState(4);
  const [baseRadius, setBaseRadius] = React.useState(0.25);
  const [shadowIntensity, setShadowIntensity] = React.useState(1);
  const [typography, setTypography] = React.useState<TokenSystem['typography']>({
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'base': ['1rem', { lineHeight: '1.5rem' }],
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  });

  // Generate tokens when colors or mode changes
  React.useEffect(() => {
    try {
      const baseTokens = generateTokens(brandColors, mode);
      
      // Apply customizations
      const customizedTokens: TokenSystem = {
        ...baseTokens,
        spacing: generateSpacingScale(spacingBaseUnit),
        typography,
        radii: generateRadiiScale(baseRadius),
        shadows: generateShadowsWithIntensity(shadowIntensity),
      };
      
      setTokens(customizedTokens);
      onGenerate?.(customizedTokens);
    } catch (error) {
      console.error("Error generating tokens:", error);
      toast.error("Failed to generate tokens");
    }
  }, [brandColors, mode, spacingBaseUnit, typography, baseRadius, shadowIntensity, onGenerate]);

  const handleReset = () => {
    setBrandColors(config.defaultBrandColors);
    setSpacingBaseUnit(4);
    setBaseRadius(0.25);
    setShadowIntensity(1);
    setTypography({
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
    });
    toast.success("All tokens reset to defaults");
  };

  const handleRandomize = () => {
    const randomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    setBrandColors({
      primary: randomColor(),
      secondary: randomColor(),
      accent: randomColor(),
    });
    toast.success("Colors randomized!");
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Color Inputs */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <SwatchIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>
                Choose your primary, secondary, and accent colors. The generator will
                create a complete color palette from these.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <BrandColorPickers
            primary={brandColors.primary}
            secondary={brandColors.secondary}
            accent={brandColors.accent}
            onChange={setBrandColors}
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleRandomize}>
              🎲 Randomize
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Output Mode</CardTitle>
          <CardDescription>
            Choose which color modes to include in your token output.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="both">Both (Light & Dark)</SelectItem>
              <SelectItem value="light">Light Only</SelectItem>
              <SelectItem value="dark">Dark Only</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Token Tabs */}
      {tokens && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Token System</CardTitle>
              <CardDescription>
                Configure and preview all your design tokens
              </CardDescription>
            </div>
            <Tabs value={previewMode} onValueChange={(v) => setPreviewMode(v as "light" | "dark")}>
              <TabsList>
                <TabsTrigger value="light">Light</TabsTrigger>
                <TabsTrigger value="dark">Dark</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="colors" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
                <TabsTrigger value="colors" className="gap-1.5">
                  <SwatchIcon className="h-4 w-4 hidden sm:block" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="typography" className="gap-1.5">
                  <DocumentTextIcon className="h-4 w-4 hidden sm:block" />
                  Type
                </TabsTrigger>
                <TabsTrigger value="spacing" className="gap-1.5">
                  <ArrowsPointingOutIcon className="h-4 w-4 hidden sm:block" />
                  Space
                </TabsTrigger>
                <TabsTrigger value="radii" className="gap-1.5">
                  <StopIcon className="h-4 w-4 hidden sm:block" />
                  Radius
                </TabsTrigger>
                <TabsTrigger value="shadows" className="gap-1.5">
                  <Square3Stack3DIcon className="h-4 w-4 hidden sm:block" />
                  Shadows
                </TabsTrigger>
                <TabsTrigger value="borders" className="gap-1.5">
                  <StopIcon className="h-4 w-4 hidden sm:block" />
                  Borders
                </TabsTrigger>
              </TabsList>
              
              {/* Colors Tab */}
              <TabsContent value="colors" className="space-y-6">
                <Tabs defaultValue="primitives">
                  <TabsList>
                    <TabsTrigger value="primitives">Color Scales</TabsTrigger>
                    <TabsTrigger value="semantic">Semantic</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="primitives" className="mt-4">
                    <PalettePreview palette={tokens.primitives} />
                  </TabsContent>
                  
                  <TabsContent value="semantic" className="mt-4">
                    <div
                      className="rounded-lg p-6"
                      style={{
                        backgroundColor: previewMode === "light" ? "#ffffff" : "#0a0a0a",
                      }}
                    >
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(tokens.semantic[previewMode]).map(([name, color]) => (
                          <SemanticColorPreview
                            key={name}
                            name={name}
                            semantic={color}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              {/* Typography Tab */}
              <TabsContent value="typography" className="space-y-6">
                <div className="border-b pb-6">
                  <TypographyEditor
                    typography={typography}
                    onTypographyChange={setTypography}
                  />
                </div>
                <TypographyPreview 
                  typography={tokens.typography} 
                  previewMode={previewMode}
                />
              </TabsContent>
              
              {/* Spacing Tab */}
              <TabsContent value="spacing" className="space-y-6">
                <div className="border-b pb-6">
                  <SpacingEditor
                    baseUnit={spacingBaseUnit}
                    onBaseUnitChange={setSpacingBaseUnit}
                  />
                </div>
                <SpacingPreview spacing={tokens.spacing} />
              </TabsContent>
              
              {/* Radii Tab */}
              <TabsContent value="radii" className="space-y-6">
                <div className="border-b pb-6">
                  <RadiiEditor
                    baseRadius={baseRadius}
                    onBaseRadiusChange={setBaseRadius}
                  />
                </div>
                <RadiiPreview 
                  radii={tokens.radii} 
                  previewMode={previewMode}
                />
              </TabsContent>
              
              {/* Shadows Tab */}
              <TabsContent value="shadows" className="space-y-6">
                <div className="border-b pb-6">
                  <ShadowsEditor
                    shadowIntensity={shadowIntensity}
                    onShadowIntensityChange={setShadowIntensity}
                  />
                </div>
                <ShadowsPreview 
                  shadows={tokens.shadows} 
                  previewMode={previewMode}
                />
              </TabsContent>
              
              {/* Borders Tab */}
              <TabsContent value="borders" className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Border tokens follow standard width and style conventions.
                </p>
                <BordersPreview previewMode={previewMode} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Export Button */}
      {tokens && (
        <div className="flex justify-center">
          <Button size="lg" onClick={() => setExportOpen(true)}>
            Export Tokens
          </Button>
        </div>
      )}

      {/* Export Dialog */}
      {tokens && (
        <ExportDialog
          open={exportOpen}
          onOpenChange={setExportOpen}
          tokens={tokens}
          mode={mode}
        />
      )}
    </div>
  );
}
