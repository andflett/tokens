"use client";

import * as React from "react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { ThemeSwitch } from "@/components/ui/theme-switch";
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
  // TailwindUsageExample,
} from "@/components/token-editors";
import { ExamplePrompt } from "@/components/example-prompt";
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
import {
  BrainCog,
  BrainIcon,
  HistoryIcon,
  SendToBack,
  SparkleIcon,
} from "lucide-react";
import { CopyButton } from "@/components/home/copy-button";
import { Term } from "@/components/term";
import tokenTypes from "@/lib/token-types.json";
import Link from "next/link";
import { Paintbrush } from "./animate-ui/icons/paintbrush";
import { ResetIcon } from "@radix-ui/react-icons";

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
  COLOR_HISTORY: "toke-color-history",
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
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [brandColors, setBrandColors] = React.useState<BrandColors>(
    () =>
      initialColors ||
      loadFromStorage(STORAGE_KEYS.BRAND_COLORS, config.defaultBrandColors)
  );
  const [pendingColors, setPendingColors] = React.useState<BrandColors>(
    () =>
      initialColors ||
      loadFromStorage(STORAGE_KEYS.BRAND_COLORS, config.defaultBrandColors)
  );
  const [colorHistory, setColorHistory] = React.useState<BrandColors[]>(() =>
    loadFromStorage(STORAGE_KEYS.COLOR_HISTORY, [])
  );
  const [mode] = React.useState<"light" | "dark" | "both">("both");
  const [tokens, setTokens] = React.useState<TokenSystem | null>(null);
  const [previewMode, setPreviewMode] = React.useState<"light" | "dark">(
    "light"
  );
  const [exportOpen, setExportOpen] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
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

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.COLOR_HISTORY, colorHistory);
  }, [colorHistory]);

  // Sync preview mode with app theme
  React.useEffect(() => {
    if (resolvedTheme === "dark" || resolvedTheme === "light") {
      setPreviewMode(resolvedTheme);
    }
  }, [resolvedTheme]);

  // Generate tokens function
  const generateTokenSystem = React.useCallback(() => {
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

  // Generate tokens on initial load
  React.useEffect(() => {
    generateTokenSystem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Regenerate when settings change (including colors)
  React.useEffect(() => {
    if (tokens) {
      generateTokenSystem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    brandColors,
    spacingBaseUnit,
    radiiSettings,
    borderSettings,
    typographySettings,
    shadowSettings,
    layoutTokens,
    colorEdits,
  ]);

  const handleGenerateTokens = () => {
    // Add to history (keep last 10 unique)
    const newHistory = [
      pendingColors,
      ...colorHistory.filter(
        (h) =>
          h.primary !== pendingColors.primary ||
          h.secondary !== pendingColors.secondary
      ),
    ].slice(0, 10);
    setColorHistory(newHistory);

    // Update active colors which will trigger token regeneration
    setBrandColors(pendingColors);
    saveToStorage(STORAGE_KEYS.BRAND_COLORS, pendingColors);
    toast.success("Tokens generated!");
  };

  const handleResetColors = () => {
    setPendingColors(config.defaultBrandColors);
    toast.info("Colors reset to defaults");
  };

  const handleSelectFromHistory = (colors: BrandColors) => {
    setPendingColors(colors);
    setBrandColors(colors);
    saveToStorage(STORAGE_KEYS.BRAND_COLORS, colors);
    toast.success("Colors loaded from history!");
  };

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

  // Introduction panel component
  const IntroPanel = ({ type }: { type: keyof typeof tokenTypes }) => {
    const data = tokenTypes[type];
    return (
      <div className="">
        <h2 className="font-bold mb-2 text-2xl">{data.title}</h2>
        <p className="text-foreground/90 mb-4">{data.description}</p>
        <ExamplePrompt type={type} />
      </div>
    );
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Top bar with token type nav (left) and action buttons (right) */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        {tokens && (
          <Tabs value={tokenTab} onValueChange={setTokenTab}>
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
                /* {
                  value: "layout",
                  label: (
                    <>
                      <Squares2X2Icon className="h-4 w-4" />
                      Layout
                    </>
                  ),
                } */
              ]}
              className="flex-wrap"
            />
          </Tabs>
        )}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5"
          >
            <ViewColumnsIcon className="h-4 w-4" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button onClick={() => setExportOpen(true)}>
            Export your tokens
          </Button>
        </div>
      </div>

      {/* Preview Gallery (conditionally shown) */}
      {showPreview && tokens && (
        <Card>
          <CardContent className="pt-6">
            <PreviewGallery tokens={tokens} />
          </CardContent>
        </Card>
      )}

      {/* Token Editor */}
      {tokens && (
        <Tabs
          value={tokenTab}
          onValueChange={setTokenTab}
          className="space-y-6"
        >
          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
              {/* Main Content */}

              <Card>
                <CardContent className="space-y-8">
                  <IntroPanel type="colors" />
                  {/* ExamplePrompt moved to IntroPanel */}
                  <Tabs value={colorSubTab} onValueChange={setColorSubTab}>
                    <div className="flex items-center justify-between gap-4">
                      <AnimatedTabsList
                        value={colorSubTab}
                        onValueChange={setColorSubTab}
                        items={[
                          { value: "primitives", label: "Color Scales" },
                          { value: "semantic", label: "Semantic" },
                        ]}
                      />
                      <ThemeSwitch size="lg" />
                    </div>

                    <TabsContent value="primitives" className="mt-4">
                      <PalettePreviewEditable
                        palette={Object.fromEntries(
                          Object.entries(tokens.primitives).filter(
                            ([key]) => !["green", "red", "yellow"].includes(key)
                          )
                        )}
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
                          Click on any semantic color to select from its related
                          scale or customize with a color picker.
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
                  {/* <TailwindUsageExample type="colors" /> */}
                </CardContent>
              </Card>
              {/* Editor Card */}
              <Card className="w-full lg:w-96">
                <CardHeader className="gap-1">
                  <CardTitle className="text-xl font-bold">
                    Generate your colour tokens
                  </CardTitle>
                  <CardDescription>
                    Select primary and secondary colours to get started. You can
                    fine tune once generated.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <BrandColorPickers
                    primary={pendingColors.primary}
                    secondary={pendingColors.secondary}
                    onChange={setPendingColors}
                    colorHistory={colorHistory}
                    onSelectFromHistory={handleSelectFromHistory}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleGenerateTokens}
                      className="flex-1"
                      disabled={
                        pendingColors.primary === brandColors.primary &&
                        pendingColors.secondary === brandColors.secondary
                      }
                    >
                      <Paintbrush className="h-4 w-4" animateOnHover />
                      Generate
                    </Button>
                    {/*    <Button
                      intent="secondary"
                      variant="outline"
                      onClick={handleResetColors}
                    >
                      Reset
                    </Button> */}
                  </div>
                  {colorHistory.length > 0 && (
                    <div className="flex gap-2 flex-row items-center">
                      <div className="flex flex-wrap ">
                        {colorHistory.slice(0, 6).map((colors, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelectFromHistory(colors)}
                            className="flex items-center gap-1 p-1 rounded hover:bg-primary-subdued cursor-pointer transition-colors"
                            title={`${colors.primary} / ${colors.secondary}`}
                          >
                            <div
                              className="h-5 w-5 rounded shadow-sm  border border-white"
                              style={{ backgroundColor: colors.primary }}
                            />
                            <div
                              className="ml-[-10px] h-5 w-5 rounded shadow-sm border border-white"
                              style={{ backgroundColor: colors.secondary }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <CardDescription className="space-y-2 text-sm text-muted-foreground border-t border-border/60 pt-3 mt-4">
                    <p>
                      We generate color scales and complementary semantic colors
                      using <Term term="oklch">OKLCH</Term> color space and{" "}
                      <Term term="apca">APCA</Term> contrast algorithms
                      beautiful perceptually accurate, accessible color tokens.
                      Learn more in the{" "}
                      <Link
                        href="/docs/color-algorithm"
                        className="text-primary underline"
                      >
                        docs
                      </Link>
                      .
                    </p>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
              {/* Main Content */}
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <IntroPanel type="typography" />
                  {/* ExamplePrompt moved to IntroPanel */}
                  <TypographyPreview
                    typography={tokens.typography}
                    previewMode={previewMode}
                  />
                  {/* <TailwindUsageExample type="typography" /> */}
                </CardContent>
              </Card>
              {/* Editor Card */}
              <Card className="w-full lg:w-96 lg:sticky lg:top-6">
                <CardHeader>
                  <CardTitle>Typography Settings</CardTitle>
                  <CardDescription>
                    Adjust font sizes, scales, and spacing to match your design.
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Spacing Tab */}
          <TabsContent value="spacing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
              {/* Main Content */}
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <IntroPanel type="spacing" />
                  {/* ExamplePrompt moved to IntroPanel */}
                  <SpacingPreview spacing={tokens.spacing} />
                  {/* <TailwindUsageExample type="spacing" /> */}
                </CardContent>
              </Card>
              {/* Editor Card */}
              <Card className="w-full lg:w-96 lg:sticky lg:top-6">
                <CardHeader>
                  <CardTitle>Spacing Settings</CardTitle>
                  <CardDescription>
                    Configure the base unit for your spacing scale.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SpacingEditor
                    baseUnit={spacingBaseUnit}
                    onBaseUnitChange={setSpacingBaseUnit}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Radii Tab */}
          <TabsContent value="radii" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
              {/* Main Content */}
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <IntroPanel type="radii" />
                  {/* ExamplePrompt moved to IntroPanel */}
                  <RadiiPreview
                    radii={tokens.radii}
                    previewMode={previewMode}
                  />
                  {/* <TailwindUsageExample type="radii" /> */}
                </CardContent>
              </Card>
              {/* Editor Card */}
              <Card className="w-full lg:w-96 lg:sticky lg:top-6">
                <CardHeader>
                  <CardTitle>Border Radius Settings</CardTitle>
                  <CardDescription>
                    Adjust the base radius and scale for rounded corners.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadiiEditor
                    baseRadius={radiiSettings.base}
                    onBaseRadiusChange={(value) =>
                      setRadiiSettings((prev) => ({
                        ...prev,
                        base: value,
                      }))
                    }
                    multiplier={radiiSettings.multiplier}
                    onMultiplierChange={(value) =>
                      setRadiiSettings((prev) => ({
                        ...prev,
                        multiplier: value,
                      }))
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Shadows Tab */}
          <TabsContent value="shadows" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
              {/* Main Content */}
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <IntroPanel type="shadows" />
                  {/* ExamplePrompt moved to IntroPanel */}
                  <ShadowsPreview
                    shadows={tokens.shadows}
                    previewMode={previewMode}
                  />
                  {/* <TailwindUsageExample type="shadows" /> */}
                </CardContent>
              </Card>
              {/* Editor Card */}
              <Card className="w-full lg:w-96 lg:sticky lg:top-6">
                <CardHeader>
                  <CardTitle>Shadow Settings</CardTitle>
                  <CardDescription>
                    Fine-tune shadow appearance with offset, blur, and opacity.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ShadowsEditorAdvanced
                    settings={shadowSettings}
                    onSettingsChange={setShadowSettings}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Borders Tab */}
          <TabsContent value="borders" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
              {/* Main Content */}
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <IntroPanel type="borders" />
                  {/* ExamplePrompt moved to IntroPanel */}
                  <BordersPreview
                    previewMode={previewMode}
                    borderColors={tokens.borderColors?.[previewMode]}
                    borderWidth={tokens.borderWidth}
                  />
                  {/* <TailwindUsageExample type="borders" /> */}
                </CardContent>
              </Card>
              {/* Editor Card */}
              <Card className="w-full lg:w-96 lg:sticky lg:top-6">
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
              {/* Main Content */}
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <IntroPanel type="layout" />
                  <LayoutPreview layout={layoutTokens} />
                  {/* <TailwindUsageExample type="layout" /> */}
                </CardContent>
              </Card>
              {/* Editor Card */}
              <Card className="w-full lg:w-96 lg:sticky lg:top-6">
                <CardHeader>
                  <CardTitle>Layout Settings</CardTitle>
                  <CardDescription>
                    Set up container widths and responsive breakpoints.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LayoutEditor
                    layout={layoutTokens}
                    onLayoutChange={setLayoutTokens}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
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
