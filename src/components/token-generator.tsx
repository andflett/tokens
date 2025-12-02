"use client";

import * as React from "react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, AnimatedTabsList } from "@/components/ui/tabs";
import { BrandColorPickers } from "@/components/color-picker";
import {
  PalettePreviewEditable,
  SemanticColorPreview,
  SemanticColorEditable,
} from "@/components/color-preview";
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
} from "@/components/token-editors";
import { PreviewGallery } from "@/components/preview-gallery";
import {
  generateTokens,
  generateSpacingScale,
  generateRadiiScale,
  generateShadowsWithSettings,
  generateLayoutTokens,
  generateTypographyScale,
  generateBorderColors,
} from "@/lib/tokens";
import { config } from "@/lib/config";
import type {
  BrandColors,
  TokenSystem,
  ShadowSettings,
  BorderColors,
  LayoutTokens,
  ColorScale,
} from "@/lib/types";
import type { PrimitivePalette } from "@/lib/tokens/primitives";
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
import { SparkleIcon } from "lucide-react";
import { CopyButton } from "@/components/home/copy-button";

interface TokenGeneratorProps {
  /** Initial brand colors */
  initialColors?: BrandColors;
  /** Callback when tokens are generated */
  onGenerate?: (tokens: TokenSystem) => void;
  /** Additional CSS classes */
  className?: string;
  /** Initial tab to show (from URL parameter) */
  initialTab?: string;
}

// Map semantic color names to their relevant primitive scale
const SEMANTIC_SCALE_MAPPING: Record<string, string> = {
  primary: "primary",
  secondary: "secondary",
  gray: "gray",
  success: "success",
  warning: "warning",
  destructive: "destructive",
};

// LocalStorage keys
const STORAGE_KEYS = {
  BRAND_COLORS: "toke-brand-colors",
  SPACING_BASE: "toke-spacing-base",
  RADII_SETTINGS: "toke-radii-settings",
  BORDER_SETTINGS: "toke-border-settings",
  TYPOGRAPHY_SETTINGS: "toke-typography-settings",
  SHADOW_SETTINGS: "toke-shadow-settings",
  LAYOUT_TOKENS: "toke-layout-tokens",
  COLOR_EDITS: "toke-color-edits",
  // Deprecated keys (for migration)
  BASE_RADIUS: "toke-base-radius",
  TYPOGRAPHY: "toke-typography",
  BORDER_COLORS: "toke-border-colors",
};

// Safe localStorage helpers
const loadFromStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = <T,>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

/**
 * Main token generator component
 * Create a complete, professional design token system for your web applications
 */
export function TokenGenerator({
  initialColors,
  onGenerate,
  className,
  initialTab,
}: TokenGeneratorProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [brandColors, setBrandColors] = React.useState<BrandColors>(
    () =>
      initialColors ||
      loadFromStorage(STORAGE_KEYS.BRAND_COLORS, config.defaultBrandColors)
  );
  const [mode] = React.useState<"light" | "dark" | "both">("both");
  const [tokens, setTokens] = React.useState<TokenSystem | null>(null);
  const [previewMode, setPreviewMode] = React.useState<"light" | "dark">(
    "light"
  );
  const [exportOpen, setExportOpen] = React.useState(false);
  const [generatorTab, setGeneratorTab] = React.useState<
    "web" | "mcp" | "preview"
  >("web");
  const validTabs = [
    "colors",
    "typography",
    "spacing",
    "radii",
    "shadows",
    "borders",
    "layout",
  ];
  const [tokenTab, setTokenTab] = React.useState<string>(
    initialTab && validTabs.includes(initialTab) ? initialTab : "colors"
  );
  const [colorSubTab, setColorSubTab] = React.useState<string>("primitives");

  // Token customization state
  const [spacingBaseUnit, setSpacingBaseUnit] = React.useState(() =>
    loadFromStorage(STORAGE_KEYS.SPACING_BASE, 4)
  );

  const [radiiSettings, setRadiiSettings] = React.useState(() =>
    loadFromStorage(STORAGE_KEYS.RADII_SETTINGS, {
      base: loadFromStorage(STORAGE_KEYS.BASE_RADIUS, 0.25),
      multiplier: 1,
    })
  );

  const [borderSettings, setBorderSettings] = React.useState(() =>
    loadFromStorage(STORAGE_KEYS.BORDER_SETTINGS, {
      width: "1px",
      colors: {},
    })
  );

  const [typographySettings, setTypographySettings] = React.useState(() =>
    loadFromStorage(STORAGE_KEYS.TYPOGRAPHY_SETTINGS, {
      baseFontSize: 1,
      multiplier: 1,
      normalTracking: 0,
      normalLeading: 1.5,
    })
  );

  const [shadowSettings, setShadowSettings] = React.useState<ShadowSettings>(
    () =>
      loadFromStorage(STORAGE_KEYS.SHADOW_SETTINGS, {
        offsetX: 0,
        offsetY: 4,
        blur: 6,
        spread: 0,
        opacity: 0.1,
      })
  );

  // Layout tokens state
  const [layoutTokens, setLayoutTokens] = React.useState<LayoutTokens>(() =>
    loadFromStorage(STORAGE_KEYS.LAYOUT_TOKENS, generateLayoutTokens())
  );

  // Color edits tracking
  const [colorEdits, setColorEdits] = React.useState<
    Record<string, Record<number, string>>
  >(() => loadFromStorage(STORAGE_KEYS.COLOR_EDITS, {}));

  // Persist state changes to localStorage
  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.BRAND_COLORS, brandColors);
  }, [brandColors]);

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.SPACING_BASE, spacingBaseUnit);
  }, [spacingBaseUnit]);

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.RADII_SETTINGS, radiiSettings);
  }, [radiiSettings]);

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.BORDER_SETTINGS, borderSettings);
  }, [borderSettings]);

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.TYPOGRAPHY_SETTINGS, typographySettings);
  }, [typographySettings]);

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.SHADOW_SETTINGS, shadowSettings);
  }, [shadowSettings]);

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.LAYOUT_TOKENS, layoutTokens);
  }, [layoutTokens]);

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.COLOR_EDITS, colorEdits);
  }, [colorEdits]);

  // Sync preview mode with app theme
  React.useEffect(() => {
    if (resolvedTheme === "dark" || resolvedTheme === "light") {
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
      const editedPrimitives = { ...baseTokens.primitives } as PrimitivePalette;
      for (const [colorName, edits] of Object.entries(colorEdits)) {
        if (
          editedPrimitives[colorName] &&
          typeof editedPrimitives[colorName] !== "string"
        ) {
          const scale = { ...(editedPrimitives[colorName] as ColorScale) };
          for (const [shade, color] of Object.entries(edits)) {
            const shadeNum = Number(shade) as keyof typeof scale;
            if (shadeNum in scale) {
              scale[shadeNum] = color;
            }
          }
          editedPrimitives[colorName] = scale;
        }
      }

      // Generate tokens from settings
      const typography = generateTypographyScale(
        typographySettings.baseFontSize,
        typographySettings.multiplier,
        typographySettings.normalTracking,
        typographySettings.normalLeading
      );

      const radii = generateRadiiScale(
        radiiSettings.base,
        radiiSettings.multiplier
      );

      const borderColors = generateBorderColors(editedPrimitives, {
        light: borderSettings.colors,
        dark: borderSettings.colors,
      });

      // Apply customizations
      const customizedTokens: TokenSystem = {
        ...baseTokens,
        primitives: editedPrimitives,
        spacing: generateSpacingScale(spacingBaseUnit),
        typography,
        radii,
        shadows: generateShadowsWithSettings(shadowSettings),
        borderColors,
        borderWidth: borderSettings.width,
        layout: layoutTokens,
      };

      setTokens(customizedTokens);
      onGenerate?.(customizedTokens);
    } catch (error) {
      console.error("Error generating tokens:", error);
      toast.error("Failed to generate tokens");
    }
  }, [
    brandColors,
    mode,
    spacingBaseUnit,
    radiiSettings,
    borderSettings,
    typographySettings,
    shadowSettings,
    layoutTokens,
    colorEdits,
    onGenerate,
  ]);

  const handleColorEdit = (
    colorName: string,
    shade: number,
    newColor: string
  ) => {
    setColorEdits((prev) => ({
      ...prev,
      [colorName]: {
        ...prev[colorName],
        [shade]: newColor,
      },
    }));
  };

  const handleColorReset = (colorName: string, shade: number) => {
    setColorEdits((prev) => {
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

  return (
    <div className={cn("space-y-6", className)}>
      {/* Main Generator Tab (Web vs MCP) */}
      <Tabs
        value={generatorTab}
        onValueChange={(v) => setGeneratorTab(v as "web" | "mcp" | "preview")}
      >
        <AnimatedTabsList
          value={generatorTab}
          onValueChange={(v) => setGeneratorTab(v as "web" | "mcp" | "preview")}
          items={[
            {
              value: "web",
              label: (
                <>
                  <ComputerDesktopIcon className="h-4 w-4" />
                  Web Generator
                </>
              ),
            },
            {
              value: "preview",
              label: (
                <>
                  <ViewColumnsIcon className="h-4 w-4" />
                  Preview
                </>
              ),
            },
            {
              value: "mcp",
              label: (
                <>
                  <CommandLineIcon className="h-4 w-4" />
                  AI MCP Tool
                </>
              ),
            },
          ]}
        />

        <TabsContent value="web" className="mt-6 space-y-6">
          {/* Token Tabs */}
          {tokens && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <CardTitle>Token System</CardTitle>
                  <CardDescription>
                    Configure and preview all your design tokens
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {/* Light/Dark Toggle - sets app theme */}
                  <AnimatedTabsList
                    value={previewMode}
                    onValueChange={(v) =>
                      handlePreviewModeChange(v as "light" | "dark")
                    }
                    items={[
                      {
                        value: "light",
                        label: (
                          <>
                            <SunIcon className="h-4 w-4" />
                          </>
                        ),
                      },
                      {
                        value: "dark",
                        label: (
                          <>
                            <MoonIcon className="h-4 w-4" />
                          </>
                        ),
                      },
                    ]}
                  />
                  <Button onClick={() => setExportOpen(true)}>Export</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={tokenTab}
                  onValueChange={setTokenTab}
                  className="space-y-6"
                >
                  <AnimatedTabsList
                    value={tokenTab}
                    onValueChange={setTokenTab}
                    items={[
                      {
                        value: "colors",
                        label: (
                          <>
                            <SwatchIcon className="h-4 w-4" />
                            Colors
                          </>
                        ),
                      },
                      {
                        value: "typography",
                        label: (
                          <>
                            <DocumentTextIcon className="h-4 w-4" />
                            Typography
                          </>
                        ),
                      },
                      {
                        value: "spacing",
                        label: (
                          <>
                            <ArrowsPointingOutIcon className="h-4 w-4" />
                            Space
                          </>
                        ),
                      },
                      {
                        value: "radii",
                        label: (
                          <>
                            <StopIcon className="h-4 w-4" />
                            Radius
                          </>
                        ),
                      },
                      {
                        value: "shadows",
                        label: (
                          <>
                            <Square3Stack3DIcon className="h-4 w-4" />
                            Shadows
                          </>
                        ),
                      },
                      {
                        value: "borders",
                        label: (
                          <>
                            <ViewColumnsIcon className="h-4 w-4" />
                            Borders
                          </>
                        ),
                      },
                      {
                        value: "layout",
                        label: (
                          <>
                            <Squares2X2Icon className="h-4 w-4" />
                            Layout
                          </>
                        ),
                      },
                    ]}
                    className="flex-wrap"
                  />

                  {/* Colors Tab */}
                  <TabsContent value="colors" className="space-y-6">
                    {/* Brand Color Inputs */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-semibold">
                          Set Your Brand Colors
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Choose your primary and secondary colors. Our smart
                          algorithms will automatically generate complete
                          11-shade color scales and complementary palettes
                          (neutral, success, warning, destructive) using OKLCH
                          color space for perceptually uniform results.
                        </p>
                      </div>
                      <BrandColorPickers
                        primary={brandColors.primary}
                        secondary={brandColors.secondary}
                        onChange={setBrandColors}
                      />
                      <div className="rounded-lg border bg-muted/50 p-3">
                        <p className="text-sm text-muted-foreground">
                          <strong>Tip:</strong> You can fine-tune any color in
                          the scales below, or let the algorithms handle
                          everything for a harmonious design system.
                        </p>
                      </div>
                    </div>

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
                          colorFormat="oklch"
                          onColorEdit={handleColorEdit}
                          onColorReset={handleColorReset}
                          isColorEdited={isColorEdited}
                        />
                      </TabsContent>

                      <TabsContent value="semantic" className="mt-4">
                        <div
                          className="rounded-lg p-6"
                          style={{
                            backgroundColor:
                              previewMode === "light" ? "#ffffff" : "#0a0a0a",
                          }}
                        >
                          <p className="text-xs text-muted-foreground mb-4">
                            Click on any semantic color to select from its
                            related scale or customize with a color picker.
                          </p>
                          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(tokens.semantic[previewMode]).map(
                              ([name, color]) => {
                                const scaleName =
                                  SEMANTIC_SCALE_MAPPING[name] || "primary";
                                const relevantScale =
                                  tokens.primitives[scaleName];

                                if (
                                  relevantScale &&
                                  typeof relevantScale !== "string"
                                ) {
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
                              }
                            )}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Tailwind Usage Example */}
                    <TailwindUsageExample type="colors" />
                  </TabsContent>

                  {/* Typography Tab */}
                  <TabsContent value="typography" className="space-y-6">
                    <div className="border-b pb-6">
                      <TypographyEditor
                        baseFontSize={typographySettings.baseFontSize}
                        onBaseFontSizeChange={(value) =>
                          setTypographySettings((prev) => ({
                            ...prev,
                            baseFontSize: value,
                          }))
                        }
                        multiplier={typographySettings.multiplier}
                        onMultiplierChange={(value) =>
                          setTypographySettings((prev) => ({
                            ...prev,
                            multiplier: value,
                          }))
                        }
                        normalTracking={typographySettings.normalTracking}
                        onNormalTrackingChange={(value) =>
                          setTypographySettings((prev) => ({
                            ...prev,
                            normalTracking: value,
                          }))
                        }
                        normalLeading={typographySettings.normalLeading}
                        onNormalLeadingChange={(value) =>
                          setTypographySettings((prev) => ({
                            ...prev,
                            normalLeading: value,
                          }))
                        }
                      />
                    </div>
                    <TypographyPreview
                      typography={tokens.typography}
                      previewMode={previewMode}
                    />

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

                    {/* Tailwind Usage Example */}
                    <TailwindUsageExample type="spacing" />
                  </TabsContent>

                  {/* Radii Tab */}
                  <TabsContent value="radii" className="space-y-6">
                    <div className="border-b pb-6">
                      <RadiiEditor
                        baseRadius={radiiSettings.base}
                        onBaseRadiusChange={(value) =>
                          setRadiiSettings((prev) => ({ ...prev, base: value }))
                        }
                        multiplier={radiiSettings.multiplier}
                        onMultiplierChange={(value) =>
                          setRadiiSettings((prev) => ({
                            ...prev,
                            multiplier: value,
                          }))
                        }
                      />
                    </div>
                    <RadiiPreview
                      radii={tokens.radii}
                      previewMode={previewMode}
                    />

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

                    {/* Tailwind Usage Example */}
                    <TailwindUsageExample type="shadows" />
                  </TabsContent>

                  {/* Borders Tab */}
                  <TabsContent value="borders" className="space-y-6">
                    <div className="border-b pb-6">
                      <BorderColorsEditor
                        borderColors={
                          tokens.borderColors || {
                            light: { default: "", input: "", ring: "" },
                            dark: { default: "", input: "", ring: "" },
                          }
                        }
                        onBorderColorsChange={(colors) =>
                          setBorderSettings((prev) => ({
                            ...prev,
                            colors: colors[previewMode],
                          }))
                        }
                        borderWidth={borderSettings.width}
                        onBorderWidthChange={(width) =>
                          setBorderSettings((prev) => ({ ...prev, width }))
                        }
                        previewMode={previewMode}
                        primitives={tokens.primitives}
                      />
                    </div>
                    <BordersPreview
                      previewMode={previewMode}
                      borderColors={tokens.borderColors?.[previewMode]}
                      borderWidth={tokens.borderWidth}
                    />

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
                    Use this generator with AI assistants via the Model Context
                    Protocol (MCP)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prompt Example - demonstrating MCP usage */}
              {(() => {
                const mcpExamplePrompt =
                  "Generate a complete design token system for my fintech app with a deep blue primary color (#1e40af) and warm orange secondary (#f97316). Include all color scales, typography, spacing, and shadows. Export as Tailwind v4 CSS variables.";
                return (
                  <div className="space-y-4">
                    <div className="rounded-md border bg-card overflow-hidden shadow-lg">
                      {/* File header */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <SparkleIcon className="h-4 w-4" />
                          <span className="font-mono text-xs">
                            Try something like...
                          </span>
                        </div>
                        <CopyButton text={mcpExamplePrompt} />
                      </div>

                      {/* Chat messages */}
                      <div className="p-4 space-y-4">
                        {/* User message */}
                        <div className="flex justify-end">
                          <div className="max-w-[85%] rounded-2xl bg-neutral-100 px-4 py-2.5 text-foreground/70 text-sm">
                            <div className="leading-relaxed whitespace-pre-wrap">
                              {mcpExamplePrompt}
                            </div>
                          </div>
                        </div>

                        {/* AI thinking indicator */}
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary/60" />
                          </div>
                          <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-muted/50">
                            <div className="flex gap-1">
                              <div
                                className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                                style={{
                                  animationDelay: "0ms",
                                  animationDuration: "1.4s",
                                }}
                              />
                              <div
                                className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                                style={{
                                  animationDelay: "200ms",
                                  animationDuration: "1.4s",
                                }}
                              />
                              <div
                                className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                                style={{
                                  animationDelay: "400ms",
                                  animationDuration: "1.4s",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">What is MCP?</h3>
                <p className="text-muted-foreground">
                  The Model Context Protocol (MCP) allows AI assistants like
                  Claude, GitHub Copilot, and others to connect to external
                  tools and services. This means you can ask your AI assistant
                  to generate design tokens for you directly!
                </p>
              </div>

              {/* Installation Options */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <h4 className="font-medium mb-2">🌐 Hosted Server</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use our hosted MCP server - no installation required. Always
                    up-to-date.
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded block">
                    https://tokens.flett.cc/mcp
                  </code>
                </div>
                <div className="rounded-xl border p-4">
                  <h4 className="font-medium mb-2">📦 NPM Package</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Install locally via npm for offline use and privacy.
                  </p>
                  <Button intent="default" asChild variant="outline" size="sm">
                    <a
                      href="https://www.npmjs.com/package/@flett/design-tokens-mcp-server"
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
                    Add to ~/Library/Application
                    Support/Claude/claude_desktop_config.json (macOS)
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Option 1: Hosted Server
                    </p>
                    <div className="rounded-lg bg-muted p-3">
                      <pre className="text-xs font-mono overflow-x-auto">
                        {`{
  "mcpServers": {
    "tokens": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://tokens.flett.cc/mcp"]
    }
  }
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Option 2: Local NPM Package
                    </p>
                    <p className="text-xs text-muted-foreground">
                      First:{" "}
                      <code className="bg-muted px-1 rounded">
                        npm install -g @flett/design-tokens-mcp-server
                      </code>
                    </p>
                    <div className="rounded-lg bg-muted p-3">
                      <pre className="text-xs font-mono overflow-x-auto">
                        {`{
  "mcpServers": {
    "tokens": {
      "command": "toke-mcp"
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
                  <p className="text-xs text-muted-foreground">
                    Add to settings.json:
                  </p>
                  <div className="rounded-lg bg-muted p-3">
                    <pre className="text-xs font-mono overflow-x-auto">
                      {`{
  "github.copilot.chat.mcp": {
    "servers": {
      "tokens": {
        "url": "https://tokens.flett.cc/mcp"
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
                  <p className="text-xs text-muted-foreground">
                    Add to ~/.cursor/mcp.json:
                  </p>
                  <div className="rounded-lg bg-muted p-3">
                    <pre className="text-xs font-mono overflow-x-auto">
                      {`{
  "tokens": {
    "url": "https://tokens.flett.cc/mcp"
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
                    <p className="text-sm font-medium">
                      &quot;Generate a token system with blue as the primary
                      color&quot;
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm font-medium">
                      &quot;Create dark mode tokens for a fintech app&quot;
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm font-medium">
                      &quot;Make a warm color palette with orange and
                      brown&quot;
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm font-medium">
                      &quot;Export my tokens as Tailwind v4 CSS&quot;
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="mt-6">
          {tokens && <PreviewGallery tokens={tokens} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
