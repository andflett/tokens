"use client";

import * as React from "react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, AnimatedTabsList } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BrandColorPickers } from "@/components/color-picker";
import { PalettePreviewEditable, SemanticColorPreview, SemanticColorEditable } from "@/components/color-preview";
import { ExportDialog } from "@/components/export-dialog";
import {
  SpacingPreview,
  SpacingEditor,
  TypographyPreview,
  TypographyEditor,
  RadiiPreview,
  RadiiEditor,
  ShadowsPreview,
  ShadowsEditorAdvanced,
  BordersPreview,
  BorderColorsEditor,
  LayoutEditor,
  LayoutPreview,
  TailwindUsageExample,
  ComponentPreview,
} from "@/components/token-editors";
import { generateTokens, generateSpacingScale, generateRadiiScale, generateShadowsWithSettings, generateLayoutTokens } from "@/lib/tokens";
import { config } from "@/lib/config";
import type { BrandColors, TokenSystem, ColorFormat, ShadowSettings, BorderColors, LayoutTokens } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  SwatchIcon,
  ArrowsPointingOutIcon,
  DocumentTextIcon,
  Square3Stack3DIcon,
  StopIcon,
  SunIcon,
  MoonIcon,
  Squares2X2Icon,
  CommandLineIcon,
  ComputerDesktopIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";

interface TokenGeneratorProps {
  /** Initial brand colors */
  initialColors?: BrandColors;
  /** Callback when tokens are generated */
  onGenerate?: (tokens: TokenSystem) => void;
  /** Additional CSS classes */
  className?: string;
}

// Map semantic color names to their relevant primitive scale
const SEMANTIC_SCALE_MAPPING: Record<string, string> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
};

/**
 * Main token generator component
 * Create a complete, professional design token system for your web applications
 */
export function TokenGenerator({
  initialColors,
  onGenerate,
  className,
}: TokenGeneratorProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [brandColors, setBrandColors] = React.useState<BrandColors>(
    initialColors || config.defaultBrandColors
  );
  const [mode, setMode] = React.useState<"light" | "dark" | "both">("both");
  const [tokens, setTokens] = React.useState<TokenSystem | null>(null);
  const [previewMode, setPreviewMode] = React.useState<"light" | "dark">("light");
  const [exportOpen, setExportOpen] = React.useState(false);
  const [colorFormat, setColorFormat] = React.useState<ColorFormat>("oklch");
  const [generatorTab, setGeneratorTab] = React.useState<"web" | "mcp">("web");
  const [tokenTab, setTokenTab] = React.useState<string>("colors");
  const [colorSubTab, setColorSubTab] = React.useState<string>("primitives");
  
  // Token customization state
  const [spacingBaseUnit, setSpacingBaseUnit] = React.useState(4);
  const [baseRadius, setBaseRadius] = React.useState(0.25);
  const [shadowSettings, setShadowSettings] = React.useState<ShadowSettings>({
    offsetX: 0,
    offsetY: 4,
    blur: 6,
    spread: 0,
    opacity: 0.1,
  });
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
  
  // Border colors state
  const [borderColors, setBorderColors] = React.useState<{ light: BorderColors; dark: BorderColors }>({
    light: { default: '#e5e7eb', input: '#d1d5db', ring: '#9ca3af' },
    dark: { default: '#374151', input: '#4b5563', ring: '#6b7280' },
  });
  
  // Layout tokens state
  const [layoutTokens, setLayoutTokens] = React.useState<LayoutTokens>(generateLayoutTokens());
  
  // Color edits tracking
  const [colorEdits, setColorEdits] = React.useState<Record<string, Record<number, string>>>({});

  // Sync preview mode with app theme
  React.useEffect(() => {
    if (resolvedTheme === 'dark' || resolvedTheme === 'light') {
      setPreviewMode(resolvedTheme);
    }
  }, [resolvedTheme]);

  // Handle theme toggle change - also sets app theme
  const handlePreviewModeChange = (newMode: "light" | "dark") => {
    setPreviewMode(newMode);
    setTheme(newMode);
  };

  // Generate tokens when colors or mode changes
  React.useEffect(() => {
    try {
      const baseTokens = generateTokens(brandColors, mode);
      
      // Apply color edits to primitives
      const editedPrimitives = { ...baseTokens.primitives };
      for (const [colorName, edits] of Object.entries(colorEdits)) {
        if (editedPrimitives[colorName]) {
          const scale = { ...editedPrimitives[colorName] };
          for (const [shade, color] of Object.entries(edits)) {
            const shadeNum = Number(shade) as keyof typeof scale;
            if (shadeNum in scale) {
              scale[shadeNum] = color;
            }
          }
          editedPrimitives[colorName] = scale;
        }
      }
      
      // Apply customizations
      const customizedTokens: TokenSystem = {
        ...baseTokens,
        primitives: editedPrimitives,
        spacing: generateSpacingScale(spacingBaseUnit),
        typography,
        radii: generateRadiiScale(baseRadius),
        shadows: generateShadowsWithSettings(shadowSettings),
        borderColors,
        layout: layoutTokens,
      };
      
      setTokens(customizedTokens);
      onGenerate?.(customizedTokens);
    } catch (error) {
      console.error("Error generating tokens:", error);
      toast.error("Failed to generate tokens");
    }
  }, [brandColors, mode, spacingBaseUnit, typography, baseRadius, shadowSettings, borderColors, layoutTokens, colorEdits, onGenerate]);

  const handleColorEdit = (colorName: string, shade: number, newColor: string) => {
    setColorEdits(prev => ({
      ...prev,
      [colorName]: {
        ...prev[colorName],
        [shade]: newColor,
      },
    }));
  };

  const handleColorReset = (colorName: string, shade: number) => {
    setColorEdits(prev => {
      const newEdits = { ...prev };
      if (newEdits[colorName]) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [shade]: _, ...rest } = newEdits[colorName];
        if (Object.keys(rest).length === 0) {
          delete newEdits[colorName];
        } else {
          newEdits[colorName] = rest;
        }
      }
      return newEdits;
    });
  };

  const isColorEdited = (colorName: string, shade: number) => {
    return colorEdits[colorName]?.[shade] !== undefined;
  };

  const handleReset = () => {
    setBrandColors(config.defaultBrandColors);
    setSpacingBaseUnit(4);
    setBaseRadius(0.25);
    setShadowSettings({ offsetX: 0, offsetY: 4, blur: 6, spread: 0, opacity: 0.1 });
    setColorEdits({});
    setBorderColors({
      light: { default: '#e5e7eb', input: '#d1d5db', ring: '#9ca3af' },
      dark: { default: '#374151', input: '#4b5563', ring: '#6b7280' },
    });
    setLayoutTokens(generateLayoutTokens());
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
    setColorEdits({});
    toast.success("Colors randomized!");
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Main Generator Tab (Web vs MCP) */}
      <Tabs value={generatorTab} onValueChange={(v) => setGeneratorTab(v as "web" | "mcp")}>
        <AnimatedTabsList
          value={generatorTab}
          onValueChange={(v) => setGeneratorTab(v as "web" | "mcp")}
          items={[
            { value: "web", label: <><ComputerDesktopIcon className="h-4 w-4 mr-1.5" />Web Generator</> },
            { value: "mcp", label: <><CommandLineIcon className="h-4 w-4 mr-1.5" />AI MCP Tool</> },
          ]}
        />

        <TabsContent value="web" className="mt-6 space-y-6">
          {/* Export Button at Top */}
          {tokens && (
            <div className="flex justify-end">
              <Button size="lg" onClick={() => setExportOpen(true)}>
                Export Tokens
              </Button>
            </div>
          )}

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
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handleRandomize}>
                    🎲 Randomize
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Reset All
                  </Button>
                </div>
                
                {/* Color Format Selector */}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-muted-foreground">Format:</span>
                  <Select value={colorFormat} onValueChange={(v) => setColorFormat(v as ColorFormat)}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oklch">OKLCH</SelectItem>
                      <SelectItem value="rgb">RGB</SelectItem>
                      <SelectItem value="hsl">HSL</SelectItem>
                      <SelectItem value="hex">Hex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                {/* Light/Dark Toggle - sets app theme */}
                <AnimatedTabsList
                  value={previewMode}
                  onValueChange={(v) => handlePreviewModeChange(v as "light" | "dark")}
                  items={[
                    { value: "light", label: <><SunIcon className="h-4 w-4" /></> },
                    { value: "dark", label: <><MoonIcon className="h-4 w-4" /></> },
                  ]}
                />
              </CardHeader>
              <CardContent>
                <Tabs value={tokenTab} onValueChange={setTokenTab} className="space-y-6">
                  <AnimatedTabsList
                    value={tokenTab}
                    onValueChange={setTokenTab}
                    items={[
                      { value: "colors", label: <><SwatchIcon className="h-4 w-4" /><span className="hidden sm:inline ml-1.5">Colors</span></> },
                      { value: "typography", label: <><DocumentTextIcon className="h-4 w-4" /><span className="hidden sm:inline ml-1.5">Type</span></> },
                      { value: "spacing", label: <><ArrowsPointingOutIcon className="h-4 w-4" /><span className="hidden sm:inline ml-1.5">Space</span></> },
                      { value: "radii", label: <><StopIcon className="h-4 w-4" /><span className="hidden sm:inline ml-1.5">Radius</span></> },
                      { value: "shadows", label: <><Square3Stack3DIcon className="h-4 w-4" /><span className="hidden sm:inline ml-1.5">Shadows</span></> },
                      { value: "borders", label: <><ViewColumnsIcon className="h-4 w-4" /><span className="hidden sm:inline ml-1.5">Borders</span></> },
                      { value: "layout", label: <><Squares2X2Icon className="h-4 w-4" /><span className="hidden sm:inline ml-1.5">Layout</span></> },
                    ]}
                    className="flex-wrap"
                  />
                  
                  {/* Colors Tab */}
                  <TabsContent value="colors" className="space-y-6">
                    <Tabs value={colorSubTab} onValueChange={setColorSubTab}>
                      <AnimatedTabsList
                        value={colorSubTab}
                        onValueChange={setColorSubTab}
                        items={[
                          { value: "primitives", label: "Color Scales" },
                          { value: "semantic", label: "Semantic" },
                        ]}
                      />
                      
                      <TabsContent value="primitives" className="mt-4">
                        <PalettePreviewEditable 
                          palette={tokens.primitives}
                          colorFormat={colorFormat}
                          onColorEdit={handleColorEdit}
                          onColorReset={handleColorReset}
                          isColorEdited={isColorEdited}
                        />
                      </TabsContent>
                      
                      <TabsContent value="semantic" className="mt-4">
                        <div
                          className="rounded-lg p-6"
                          style={{
                            backgroundColor: previewMode === "light" ? "#ffffff" : "#0a0a0a",
                          }}
                        >
                          <p className="text-xs text-muted-foreground mb-4">
                            Click on any semantic color to select from its related scale or customize with a color picker.
                          </p>
                          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(tokens.semantic[previewMode]).map(([name, color]) => {
                              const scaleName = SEMANTIC_SCALE_MAPPING[name] || 'primary';
                              const relevantScale = tokens.primitives[scaleName];
                              
                              if (relevantScale) {
                                return (
                                  <SemanticColorEditable
                                    key={name}
                                    name={name}
                                    semantic={color}
                                    relevantScale={relevantScale}
                                    scaleName={scaleName}
                                    onBaseChange={() => {
                                      // Show a toast explaining how semantic colors work
                                      toast.info(
                                        `To change ${name} semantic colors, modify the ${scaleName} brand color above.`,
                                        { duration: 3000 }
                                      );
                                    }}
                                  />
                                );
                              }
                              return (
                                <SemanticColorPreview
                                  key={name}
                                  name={name}
                                  semantic={color}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    {/* Component Preview */}
                    <ComponentPreview tokens={tokens} previewMode={previewMode} />
                    
                    {/* Tailwind Usage Example */}
                    <TailwindUsageExample type="colors" />
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
                    
                    {/* Component Preview */}
                    <ComponentPreview tokens={tokens} previewMode={previewMode} />
                    
                    {/* Tailwind Usage Example */}
                    <TailwindUsageExample type="typography" />
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
                    
                    {/* Component Preview */}
                    <ComponentPreview tokens={tokens} previewMode={previewMode} />
                    
                    {/* Tailwind Usage Example */}
                    <TailwindUsageExample type="spacing" />
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
                    
                    {/* Component Preview */}
                    <ComponentPreview tokens={tokens} previewMode={previewMode} />
                    
                    {/* Tailwind Usage Example */}
                    <TailwindUsageExample type="radii" />
                  </TabsContent>
                  
                  {/* Shadows Tab */}
                  <TabsContent value="shadows" className="space-y-6">
                    <div className="border-b pb-6">
                      <ShadowsEditorAdvanced
                        settings={shadowSettings}
                        onSettingsChange={setShadowSettings}
                      />
                    </div>
                    <ShadowsPreview 
                      shadows={tokens.shadows} 
                      previewMode={previewMode}
                    />
                    
                    {/* Component Preview */}
                    <ComponentPreview tokens={tokens} previewMode={previewMode} />
                    
                    {/* Tailwind Usage Example */}
                    <TailwindUsageExample type="shadows" />
                  </TabsContent>
                  
                  {/* Borders Tab */}
                  <TabsContent value="borders" className="space-y-6">
                    <div className="border-b pb-6">
                      <BorderColorsEditor
                        borderColors={borderColors}
                        onBorderColorsChange={setBorderColors}
                        previewMode={previewMode}
                      />
                    </div>
                    <BordersPreview 
                      previewMode={previewMode}
                      borderColors={borderColors[previewMode]}
                    />
                    
                    {/* Component Preview */}
                    <ComponentPreview tokens={tokens} previewMode={previewMode} />
                    
                    {/* Tailwind Usage Example */}
                    <TailwindUsageExample type="borders" />
                  </TabsContent>
                  
                  {/* Layout Tab */}
                  <TabsContent value="layout" className="space-y-6">
                    <div className="border-b pb-6">
                      <LayoutEditor
                        layout={layoutTokens}
                        onLayoutChange={setLayoutTokens}
                      />
                    </div>
                    <LayoutPreview layout={layoutTokens} />
                    
                    {/* Tailwind Usage Example */}
                    <TailwindUsageExample type="layout" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Export Dialog */}
          {tokens && (
            <ExportDialog
              open={exportOpen}
              onOpenChange={setExportOpen}
              tokens={tokens}
              mode={mode}
              colorFormat={colorFormat}
            />
          )}
        </TabsContent>

        {/* MCP Tool Tab */}
        <TabsContent value="mcp" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <CommandLineIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle>AI MCP Tool</CardTitle>
                  <CardDescription>
                    Use this generator with AI assistants via the Model Context Protocol (MCP)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">What is MCP?</h3>
                <p className="text-muted-foreground">
                  The Model Context Protocol (MCP) allows AI assistants like Claude, GitHub Copilot,
                  and others to connect to external tools and services. This means you can ask your
                  AI assistant to generate design tokens for you directly!
                </p>
              </div>

              {/* Installation Options */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <h4 className="font-medium mb-2">🌐 Hosted Server</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use our hosted MCP server - no installation required. Always up-to-date.
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded block">
                    https://vibethemes.flett.cc/mcp
                  </code>
                </div>
                <div className="rounded-xl border p-4">
                  <h4 className="font-medium mb-2">📦 NPM Package</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Install locally via npm for offline use and privacy.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                  >
                    <a
                      href="https://www.npmjs.com/package/vibe-themes-mcp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on NPM →
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Setup Instructions</h3>
                
                {/* Claude Desktop */}
                <div className="rounded-xl border p-4 space-y-3">
                  <h4 className="font-medium">Claude Desktop</h4>
                  <p className="text-xs text-muted-foreground">
                    Add to ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Option 1: Hosted Server</p>
                    <div className="rounded-lg bg-muted p-3">
                      <pre className="text-xs font-mono overflow-x-auto">
{`{
  "mcpServers": {
    "vibe-themes": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://vibethemes.flett.cc/mcp"]
    }
  }
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Option 2: Local NPM Package</p>
                    <p className="text-xs text-muted-foreground">
                      First: <code className="bg-muted px-1 rounded">npm install -g vibe-themes-mcp</code>
                    </p>
                    <div className="rounded-lg bg-muted p-3">
                      <pre className="text-xs font-mono overflow-x-auto">
{`{
  "mcpServers": {
    "vibe-themes": {
      "command": "vibe-themes-mcp"
    }
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* VS Code */}
                <div className="rounded-xl border p-4 space-y-3">
                  <h4 className="font-medium">VS Code + GitHub Copilot</h4>
                  <p className="text-xs text-muted-foreground">Add to settings.json:</p>
                  <div className="rounded-lg bg-muted p-3">
                    <pre className="text-xs font-mono overflow-x-auto">
{`{
  "github.copilot.chat.mcp": {
    "servers": {
      "vibe-themes": {
        "url": "https://vibethemes.flett.cc/mcp"
      }
    }
  }
}`}
                    </pre>
                  </div>
                </div>

                {/* Cursor */}
                <div className="rounded-xl border p-4 space-y-3">
                  <h4 className="font-medium">Cursor</h4>
                  <p className="text-xs text-muted-foreground">Add to ~/.cursor/mcp.json:</p>
                  <div className="rounded-lg bg-muted p-3">
                    <pre className="text-xs font-mono overflow-x-auto">
{`{
  "vibe-themes": {
    "url": "https://vibethemes.flett.cc/mcp"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Example Prompts</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <p className="text-sm font-medium">&quot;Generate a token system with blue as the primary color&quot;</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm font-medium">&quot;Create dark mode tokens for a fintech app&quot;</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm font-medium">&quot;Make a warm color palette with orange and brown&quot;</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm font-medium">&quot;Export my tokens as Tailwind v4 CSS&quot;</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
