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
 * Prefers light text unless dark text is significantly better
 */
function findContrastingColor(
  background: string,
  lightColor: string,
  darkColor: string
): string {
  const lightContrast = getContrastRatio(background, lightColor);
  const darkContrast = getContrastRatio(background, darkColor);

  // Prefer light text unless dark text is SIGNIFICANTLY better
  // Dark text must have at least 2x better contrast ratio AND meet WCAG AA
  if (darkContrast >= 4.5 && darkContrast > lightContrast * 2) {
    // Only use dark text if it's much better and accessible
    return darkColor;
  } else {
    // Default to light text (better for vibrant/mid-tone colors)
    return lightColor;
  }
}

/**
 * Create an extended semantic color from a primitive scale
 * Includes DEFAULT, foreground, subdued, highlight variants plus full scale
 */
function createExtendedSemanticColor(
  scale: ColorScale,
  neutral: ColorScale,
  white: string,
  black: string,
  mode: "light" | "dark"
): ExtendedSemanticColor {
  if (mode === "light") {
    // Light mode: DEFAULT uses mid tone, subdued darker, highlight lighter
    const DEFAULT = scale[500];
    const subdued = scale[50];
    const highlight = scale[700];

    return {
      DEFAULT,
      foreground: findContrastingColor(DEFAULT, white, scale[900]),
      subdued,
      "subdued-foreground": scale[700],
      highlight,
      "highlight-foreground": findContrastingColor(
        highlight,
        white,
        scale[900]
      ),
    };
  } else {
    // Dark mode: adjust for dark backgrounds
    const DEFAULT = scale[500];
    const subdued = scale[50];
    const highlight = scale[300];

    return {
      DEFAULT,
      foreground: findContrastingColor(DEFAULT, white, scale[900]),
      subdued,
      "subdued-foreground": scale[700],
      highlight,
      "highlight-foreground": findContrastingColor(
        highlight,
        white,
        scale[950]
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
  const neutral = palette.neutral as ColorScale;
  if (!neutral) {
    throw new Error("Neutral palette not found");
  }

  const black = palette.black;
  const white = palette.white;

  const primary = palette.primary as ColorScale;
  const secondary = palette.secondary as ColorScale;
  const success = palette.success as ColorScale;
  const destructive = palette.destructive as ColorScale;
  const warning = palette.warning as ColorScale;

  if (!primary || !secondary || !success || !destructive || !warning) {
    throw new Error("Required color palettes not found");
  }

  // Create muted color pair from neutral
  const muted: SemanticColorPair =
    mode === "light"
      ? {
          DEFAULT: neutral[100],
          foreground: neutral[500],
        }
      : {
          DEFAULT: neutral[800],
          foreground: neutral[400],
        };

  // Create accent color pair from primary (lighter/softer variant)
  const accent: SemanticColorPair =
    mode === "light"
      ? {
          DEFAULT: neutral[100],
          foreground: neutral[950],
        }
      : {
          DEFAULT: neutral[800],
          foreground: neutral[50],
        };

  return {
    primary: createExtendedSemanticColor(primary, neutral, white, black, mode),
    secondary: createExtendedSemanticColor(
      secondary,
      neutral,
      white,
      black,
      mode
    ),
    neutral: createExtendedSemanticColor(neutral, neutral, white, black, mode),
    success: createExtendedSemanticColor(success, neutral, white, black, mode),
    destructive: createExtendedSemanticColor(
      destructive,
      neutral,
      white,
      black,
      mode
    ),
    warning: createExtendedSemanticColor(warning, neutral, white, black, mode),
    muted,
    accent,
  };
}

/**
 * Generate surface tokens (shadcn-style) from neutral palette
 */
export function generateSurfaceTokens(
  palette: PrimitivePalette,
  mode: "light" | "dark"
): SurfaceTokens {
  const neutral = palette.neutral as ColorScale;
  if (!neutral) {
    throw new Error("Neutral palette not found");
  }

  const black = palette.black;
  const white = palette.white;

  if (mode === "light") {
    return {
      background: white,
      foreground: neutral[950],
      card: white,
      "card-foreground": neutral[950],
      popover: white,
      "popover-foreground": neutral[950],
    };
  } else {
    return {
      background: black,
      foreground: white,
      card: neutral[900],
      "card-foreground": white,
      popover: neutral[900],
      "popover-foreground": white,
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
  const neutral = palette.neutral as ColorScale;
  const primary = palette.primary as ColorScale;

  if (!neutral || !primary) {
    throw new Error("Required palettes not found");
  }

  if (mode === "light") {
    return {
      border: neutral[200],
      input: neutral[200],
      ring: primary[400],
    };
  } else {
    return {
      border: neutral[700],
      input: neutral[700],
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
    "neutral",
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
