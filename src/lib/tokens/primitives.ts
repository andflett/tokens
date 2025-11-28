/**
 * Primitive color palette generation using OKLCH
 */

import { generateColorScale, parseToOklch, oklchToHex } from "./oklch";
import type { BrandColors, ColorScale } from "../types";
import type { Oklch } from "culori";

export type PrimitivePalette = {
  [colorName: string]: ColorScale;
};

/**
 * Derive a complementary color for a given base color
 * Uses color theory to generate harmonious colors
 */
function deriveComplementaryColor(baseColor: string, hueShift: number): string {
  const base = parseToOklch(baseColor);
  const newHue = ((base.h || 0) + hueShift) % 360;
  const derived: Oklch = {
    mode: "oklch",
    l: base.l,
    c: base.c,
    h: newHue < 0 ? newHue + 360 : newHue,
  };
  return oklchToHex(derived);
}

/**
 * Derive a success green that complements the primary color
 */
function deriveSuccessColor(primaryColor: string): string {
  const primary = parseToOklch(primaryColor);
  // Green hue range: 120-160
  // Adjust to complement primary while staying green
  const baseGreenHue = 145;
  const primaryHue = primary.h || 0;

  // Slight adjustment based on primary to create harmony
  const hueAdjust = ((primaryHue - 180) / 360) * 15;
  const finalHue = baseGreenHue + hueAdjust;

  const success: Oklch = {
    mode: "oklch",
    l: 0.65,
    c: Math.max(0.12, (primary.c || 0.1) * 0.9),
    h: finalHue,
  };
  return oklchToHex(success);
}

/**
 * Derive a destructive red that complements the primary color
 */
function deriveDestructiveColor(primaryColor: string): string {
  const primary = parseToOklch(primaryColor);
  // Red hue range: 0-30 or 330-360
  const baseRedHue = 25;
  const primaryHue = primary.h || 0;

  // Slight adjustment based on primary to create harmony
  const hueAdjust = ((primaryHue - 180) / 360) * 10;
  const finalHue = baseRedHue + hueAdjust;

  const destructive: Oklch = {
    mode: "oklch",
    l: 0.55,
    c: Math.max(0.15, (primary.c || 0.1) * 1.1),
    h: finalHue < 0 ? finalHue + 360 : finalHue,
  };
  return oklchToHex(destructive);
}

/**
 * Derive a warning yellow/amber that complements the primary color
 */
function deriveWarningColor(primaryColor: string): string {
  const primary = parseToOklch(primaryColor);
  // Yellow/amber hue range: 45-75
  const baseYellowHue = 60;
  const primaryHue = primary.h || 0;

  // Slight adjustment based on primary to create harmony
  const hueAdjust = ((primaryHue - 180) / 360) * 15;
  const finalHue = baseYellowHue + hueAdjust;

  const warning: Oklch = {
    mode: "oklch",
    l: 0.75,
    c: Math.max(0.13, (primary.c || 0.1) * 0.95),
    h: finalHue,
  };
  return oklchToHex(warning);
}

/**
 * Generate a gray scale
 * Slightly cool/slate-toned for a modern feel
 */
function generateGrayScale(): ColorScale {
  // Slate gray with very slight blue undertone
  return generateColorScale("#64748b");
}

/**
 * Generate a complete primitive palette from brand colors
 * Now only requires primary and secondary - other colors are derived
 */
export function generatePrimitivePalette(
  brandColors: BrandColors,
  additionalColors: string[] = []
): PrimitivePalette {
  const palette: PrimitivePalette = {};

  // Generate scales for brand colors
  palette.primary = generateColorScale(brandColors.primary);
  palette.secondary = generateColorScale(brandColors.secondary);

  // Generate gray scale (slate/cool gray by default)
  palette.gray = generateGrayScale();

  // Generate derived semantic color scales
  const successScale = generateColorScale(
    deriveSuccessColor(brandColors.primary)
  );
  const destructiveScale = generateColorScale(
    deriveDestructiveColor(brandColors.primary)
  );
  const warningScale = generateColorScale(
    deriveWarningColor(brandColors.primary)
  );

  // Semantic names
  palette.success = successScale;
  palette.destructive = destructiveScale;
  palette.warning = warningScale;

  // Friendly color aliases
  palette.green = successScale;
  palette.red = destructiveScale;
  palette.yellow = warningScale;

  // Generate additional color scales if provided
  additionalColors.forEach((color, index) => {
    palette[`custom${index + 1}`] = generateColorScale(color);
  });

  return palette;
}

/**
 * Get a specific shade from a color scale
 */
export function getShade(
  palette: PrimitivePalette,
  colorName: string,
  shade: keyof ColorScale
): string {
  const scale = palette[colorName];
  if (!scale) {
    throw new Error(`Color "${colorName}" not found in palette`);
  }
  return scale[shade];
}
