/**
 * Semantic token generation
 * Maps primitive colors to meaningful semantic roles
 */

import { getContrastRatio, meetsWCAG_AA } from "./oklch";
import type { PrimitivePalette } from "./primitives";
import type { SemanticTokens, SemanticColor } from "../types";

/**
 * Find the best contrasting text color for a background
 */
function findContrastingColor(
  background: string,
  lightColor: string,
  darkColor: string
): string {
  const lightContrast = getContrastRatio(background, lightColor);
  const darkContrast = getContrastRatio(background, darkColor);

  return lightContrast > darkContrast ? lightColor : darkColor;
}

/**
 * Create a semantic color from a primitive scale
 */
function createSemanticColor(
  palette: PrimitivePalette,
  colorName: string,
  mode: "light" | "dark"
): SemanticColor {
  const scale = palette[colorName];
  if (!scale) {
    throw new Error(`Color "${colorName}" not found in palette`);
  }

  const neutral = palette.neutral;
  if (!neutral) {
    throw new Error("Neutral palette not found");
  }

  if (mode === "light") {
    const base = scale[50];
    const muted = scale[90];
    const accent = scale[40];

    return {
      base,
      muted,
      accent,
      onBase: findContrastingColor(base, neutral[100], neutral[10]),
      onMuted: findContrastingColor(muted, neutral[100], neutral[10]),
      onAccent: findContrastingColor(accent, neutral[100], neutral[10]),
    };
  } else {
    // Dark mode: invert the scale
    const base = scale[50];
    const muted = scale[20];
    const accent = scale[60];

    return {
      base,
      muted,
      accent,
      onBase: findContrastingColor(base, neutral[100], neutral[10]),
      onMuted: findContrastingColor(muted, neutral[100], neutral[10]),
      onAccent: findContrastingColor(accent, neutral[100], neutral[10]),
    };
  }
}

/**
 * Generate semantic tokens for a specific mode
 */
export function generateSemanticTokens(
  palette: PrimitivePalette,
  mode: "light" | "dark"
): SemanticTokens {
  return {
    primary: createSemanticColor(palette, "primary", mode),
    secondary: createSemanticColor(palette, "secondary", mode),
    success: createSemanticColor(palette, "success", mode),
    warning: createSemanticColor(palette, "warning", mode),
    danger: createSemanticColor(palette, "danger", mode),
  };
}

/**
 * Generate surface and background tokens
 */
export function generateSurfaceTokens(
  palette: PrimitivePalette,
  mode: "light" | "dark"
): Record<string, string> {
  const neutral = palette.neutral;

  if (mode === "light") {
    return {
      background: neutral[100],
      foreground: neutral[10],
      surface: neutral[100],
      surfaceSecondary: neutral[90],
      surfaceTertiary: neutral[80],
      border: neutral[80],
      borderSubtle: neutral[90],
      muted: neutral[70],
      mutedForeground: neutral[40],
    };
  } else {
    return {
      background: neutral[10],
      foreground: neutral[100],
      surface: neutral[20],
      surfaceSecondary: neutral[30],
      surfaceTertiary: neutral[40],
      border: neutral[40],
      borderSubtle: neutral[30],
      muted: neutral[40],
      mutedForeground: neutral[70],
    };
  }
}

/**
 * Check contrast compliance for all semantic colors
 */
export function checkSemanticContrast(
  tokens: SemanticTokens
): Record<string, { ratio: number; passesAA: boolean; passesAAA: boolean }> {
  const results: Record<
    string,
    { ratio: number; passesAA: boolean; passesAAA: boolean }
  > = {};

  for (const [name, color] of Object.entries(tokens)) {
    const ratio = getContrastRatio(color.base, color.onBase);
    results[`${name}/base`] = {
      ratio: Math.round(ratio * 100) / 100,
      passesAA: meetsWCAG_AA(ratio),
      passesAAA: ratio >= 7,
    };

    const mutedRatio = getContrastRatio(color.muted, color.onMuted);
    results[`${name}/muted`] = {
      ratio: Math.round(mutedRatio * 100) / 100,
      passesAA: meetsWCAG_AA(mutedRatio),
      passesAAA: mutedRatio >= 7,
    };

    const accentRatio = getContrastRatio(color.accent, color.onAccent);
    results[`${name}/accent`] = {
      ratio: Math.round(accentRatio * 100) / 100,
      passesAA: meetsWCAG_AA(accentRatio),
      passesAAA: accentRatio >= 7,
    };
  }

  return results;
}
