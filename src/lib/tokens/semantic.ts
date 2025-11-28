/**
 * Semantic token generation
 * Maps primitive colors to meaningful semantic roles
 */

import { getContrastRatio, meetsWCAG_AA } from "./oklch";
import type { PrimitivePalette } from "./primitives";
import type {
  SemanticTokens,
  ExtendedSemanticColor,
  SemanticColorPair,
  SurfaceTokens,
  UtilityTokens,
  ColorScale,
} from "../types";

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
 * Create an extended semantic color from a primitive scale
 * Includes DEFAULT, foreground, subdued, highlight variants plus full scale
 */
function createExtendedSemanticColor(
  scale: ColorScale,
  gray: ColorScale,
  mode: "light" | "dark"
): ExtendedSemanticColor {
  if (mode === "light") {
    // Light mode: DEFAULT uses mid tone, subdued darker, highlight lighter
    const DEFAULT = scale[500];
    const subdued = scale[600];
    const highlight = scale[400];

    return {
      DEFAULT,
      foreground: findContrastingColor(DEFAULT, gray[50], gray[950]),
      subdued,
      "subdued-foreground": findContrastingColor(subdued, gray[50], gray[950]),
      highlight,
      "highlight-foreground": findContrastingColor(
        highlight,
        gray[50],
        gray[950]
      ),
    };
  } else {
    // Dark mode: adjust for dark backgrounds
    const DEFAULT = scale[500];
    const subdued = scale[400];
    const highlight = scale[600];

    return {
      DEFAULT,
      foreground: findContrastingColor(DEFAULT, gray[50], gray[950]),
      subdued,
      "subdued-foreground": findContrastingColor(subdued, gray[50], gray[950]),
      highlight,
      "highlight-foreground": findContrastingColor(
        highlight,
        gray[50],
        gray[950]
      ),
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
  const gray = palette.gray;
  if (!gray) {
    throw new Error("Gray palette not found");
  }

  const primary = palette.primary;
  const secondary = palette.secondary;
  const success = palette.success;
  const destructive = palette.destructive;
  const warning = palette.warning;

  if (!primary || !secondary || !success || !destructive || !warning) {
    throw new Error("Required color palettes not found");
  }

  // Create muted color pair from gray
  const muted: SemanticColorPair =
    mode === "light"
      ? {
          DEFAULT: gray[100],
          foreground: gray[500],
        }
      : {
          DEFAULT: gray[800],
          foreground: gray[400],
        };

  // Create accent color pair from primary (lighter/softer variant)
  const accent: SemanticColorPair =
    mode === "light"
      ? {
          DEFAULT: primary[100],
          foreground: primary[500],
        }
      : {
          DEFAULT: primary[800],
          foreground: primary[400],
        };

  return {
    primary: createExtendedSemanticColor(primary, gray, mode),
    secondary: createExtendedSemanticColor(secondary, gray, mode),
    gray: createExtendedSemanticColor(gray, gray, mode),
    success: createExtendedSemanticColor(success, gray, mode),
    destructive: createExtendedSemanticColor(destructive, gray, mode),
    warning: createExtendedSemanticColor(warning, gray, mode),
    muted,
    accent,
  };
}

/**
 * Generate surface tokens (shadcn-style) from gray palette
 */
export function generateSurfaceTokens(
  palette: PrimitivePalette,
  mode: "light" | "dark"
): SurfaceTokens {
  const gray = palette.gray;
  if (!gray) {
    throw new Error("Gray palette not found");
  }

  if (mode === "light") {
    return {
      background: gray[50],
      foreground: gray[950],
      card: gray[50],
      "card-foreground": gray[950],
      popover: gray[50],
      "popover-foreground": gray[950],
    };
  } else {
    return {
      background: gray[950],
      foreground: gray[50],
      card: gray[900],
      "card-foreground": gray[50],
      popover: gray[900],
      "popover-foreground": gray[50],
    };
  }
}

/**
 * Generate utility tokens for borders, rings, inputs
 */
export function generateUtilityTokens(
  palette: PrimitivePalette,
  mode: "light" | "dark"
): UtilityTokens {
  const gray = palette.gray;
  const primary = palette.primary;

  if (!gray || !primary) {
    throw new Error("Required palettes not found");
  }

  if (mode === "light") {
    return {
      border: gray[200],
      input: gray[200],
      ring: primary[500],
    };
  } else {
    return {
      border: gray[700],
      input: gray[700],
      ring: primary[500],
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

  // Check extended semantic colors
  const extendedColors = [
    "primary",
    "secondary",
    "gray",
    "success",
    "destructive",
    "warning",
  ] as const;

  for (const name of extendedColors) {
    const color = tokens[name];

    const ratio = getContrastRatio(color.DEFAULT, color.foreground);
    results[`${name}/default`] = {
      ratio: Math.round(ratio * 100) / 100,
      passesAA: meetsWCAG_AA(ratio),
      passesAAA: ratio >= 7,
    };

    const subduedRatio = getContrastRatio(
      color.subdued,
      color["subdued-foreground"]
    );
    results[`${name}/subdued`] = {
      ratio: Math.round(subduedRatio * 100) / 100,
      passesAA: meetsWCAG_AA(subduedRatio),
      passesAAA: subduedRatio >= 7,
    };

    const highlightRatio = getContrastRatio(
      color.highlight,
      color["highlight-foreground"]
    );
    results[`${name}/highlight`] = {
      ratio: Math.round(highlightRatio * 100) / 100,
      passesAA: meetsWCAG_AA(highlightRatio),
      passesAAA: highlightRatio >= 7,
    };
  }

  // Check simple color pairs
  const mutedRatio = getContrastRatio(
    tokens.muted.DEFAULT,
    tokens.muted.foreground
  );
  results["muted"] = {
    ratio: Math.round(mutedRatio * 100) / 100,
    passesAA: meetsWCAG_AA(mutedRatio),
    passesAAA: mutedRatio >= 7,
  };

  const accentRatio = getContrastRatio(
    tokens.accent.DEFAULT,
    tokens.accent.foreground
  );
  results["accent"] = {
    ratio: Math.round(accentRatio * 100) / 100,
    passesAA: meetsWCAG_AA(accentRatio),
    passesAAA: accentRatio >= 7,
  };

  return results;
}
