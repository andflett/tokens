/**
 * Main token generation function
 * Combines primitives, semantic tokens, spacing, typography, and shadows
 */

import { generatePrimitivePalette } from "./primitives";
import {
  generateSemanticTokens,
  generateSurfaceTokens,
  generateUtilityTokens,
} from "./semantic";
import type {
  BrandColors,
  TokenSystem,
  SemanticTokens,
  ShadowSettings,
  LayoutTokens,
} from "../types";

/**
 * Generate spacing scale from a base unit
 */
export function generateSpacingScale(
  baseUnit: number = 4
): Record<string, string> {
  const multipliers = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20,
    24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
  ];
  const spacing: Record<string, string> = {};

  for (const mult of multipliers) {
    const key = mult === 0 ? "0" : mult.toString();
    const px = mult * baseUnit;
    spacing[key] = px === 0 ? "0" : `${px / 16}rem`;
  }

  return spacing;
}

/**
 * Font weight constants
 */
const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

/**
 * Generate typography scale from base font size and multiplier
 * Also generates tracking and leading scales from normal values
 */
export function generateTypographyScale(
  baseFontSize: number = 1,
  multiplier: number = 1,
  normalTracking: number = 0,
  normalLeading: number = 1.5
): TokenSystem["typography"] {
  const round = (value: number) => Math.round(value * 1000) / 1000;

  // Generate font sizes (just the size, no line heights)
  const scale = (baseSizeRem: number) => {
    const size = round(baseSizeRem * multiplier);
    return `${size}rem`;
  };

  // Generate tracking (letter-spacing) scale based on normal value
  // Standard steps: tighter (-0.05em), tight (-0.025em), normal (0em), wide (0.025em), wider (0.05em), widest (0.1em)
  const tracking = {
    tighter: `${round(normalTracking - 0.05)}em`,
    tight: `${round(normalTracking - 0.025)}em`,
    normal: `${round(normalTracking)}em`,
    wide: `${round(normalTracking + 0.025)}em`,
    wider: `${round(normalTracking + 0.05)}em`,
    widest: `${round(normalTracking + 0.1)}em`,
  };

  // Generate leading (line-height utility) scale based on normal value
  // These are global line-height values applied via utility classes
  // Standard steps: tight (normal - 0.25), snug (normal - 0.125), normal, relaxed (normal + 0.125), loose (normal + 0.5)
  const leading = {
    tight: round(normalLeading - 0.25),
    snug: round(normalLeading - 0.125),
    normal: round(normalLeading),
    relaxed: round(normalLeading + 0.125),
    loose: round(normalLeading + 0.5),
  };

  return {
    fontSize: {
      xs: scale(0.75),
      sm: scale(0.875),
      base: scale(baseFontSize),
      lg: scale(1.125),
      xl: scale(1.25),
      "2xl": scale(1.5),
      "3xl": scale(1.875),
      "4xl": scale(2.25),
      "5xl": scale(3),
      "6xl": scale(3.75),
      "7xl": scale(4.5),
      "8xl": scale(6),
      "9xl": scale(8),
    },
    fontWeight: fontWeights,
    tracking,
    leading,
  };
}

/**
 * Default typography scale
 */
const defaultTypography = generateTypographyScale(1, 1, 0, 1.5);

/**
 * Default border radius scale
 */
const defaultRadii: Record<string, string> = {
  xs: "0.125rem",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  "4xl": "2rem",
};

/**
 * Generate radii scale from a base value and multiplier
 */
export function generateRadiiScale(
  baseRadius: number = 0.25,
  multiplier: number = 1
): Record<string, string> {
  const round = (value: number) => Math.round(value * 1000) / 1000;
  const scale = (factor: number) => {
    const value = round(baseRadius * factor * multiplier);
    // Cap at 10rem to prevent excessive values
    return Math.min(value, 10);
  };

  return {
    xs: `${scale(0.5)}rem`,
    sm: `${scale(1)}rem`,
    md: `${scale(1.5)}rem`,
    lg: `${scale(2)}rem`,
    xl: `${scale(3)}rem`,
    "2xl": `${scale(4)}rem`,
    "3xl": `${scale(6)}rem`,
    "4xl": `${scale(8)}rem`,
  };
}

/**
 * Generate shadow tokens for light and dark modes
 */
function generateShadows(
  _primitives: TokenSystem["primitives"]
): TokenSystem["shadows"] {
  return {
    light: {
      "2xs": `0 1px rgb(0 0 0 / 0.05)`,
      xs: `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
      sm: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`,
      md: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`,
      lg: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`,
      xl: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`,
      "2xl": `0 25px 50px -12px rgb(0 0 0 / 0.25)`,
    },
    dark: {
      "2xs": `0 1px rgb(0 0 0 / 0.05)`,
      xs: `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
      sm: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`,
      md: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`,
      lg: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`,
      xl: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`,
      "2xl": `0 25px 50px -12px rgb(0 0 0 / 0.25)`,
    },
  };
}

/**
 * Generate shadows with adjustable intensity
 */
export function generateShadowsWithIntensity(
  intensity: number = 1
): TokenSystem["shadows"] {
  const lightBase = 0.1 * intensity;
  const darkBase = 0.4 * intensity;

  return {
    light: {
      sm: `0 1px 2px 0 rgba(0, 0, 0, ${(0.05 * intensity).toFixed(2)})`,
      md: `0 4px 6px -1px rgba(0, 0, 0, ${lightBase.toFixed(
        2
      )}), 0 2px 4px -2px rgba(0, 0, 0, ${lightBase.toFixed(2)})`,
      lg: `0 10px 15px -3px rgba(0, 0, 0, ${lightBase.toFixed(
        2
      )}), 0 4px 6px -4px rgba(0, 0, 0, ${lightBase.toFixed(2)})`,
      xl: `0 20px 25px -5px rgba(0, 0, 0, ${lightBase.toFixed(
        2
      )}), 0 8px 10px -6px rgba(0, 0, 0, ${lightBase.toFixed(2)})`,
      "2xl": `0 25px 50px -12px rgba(0, 0, 0, ${(0.25 * intensity).toFixed(
        2
      )})`,
      inner: `inset 0 2px 4px 0 rgba(0, 0, 0, ${(0.05 * intensity).toFixed(
        2
      )})`,
    },
    dark: {
      sm: `0 1px 2px 0 rgba(0, 0, 0, ${(0.3 * intensity).toFixed(2)})`,
      md: `0 4px 6px -1px rgba(0, 0, 0, ${darkBase.toFixed(
        2
      )}), 0 2px 4px -2px rgba(0, 0, 0, ${darkBase.toFixed(2)})`,
      lg: `0 10px 15px -3px rgba(0, 0, 0, ${darkBase.toFixed(
        2
      )}), 0 4px 6px -4px rgba(0, 0, 0, ${darkBase.toFixed(2)})`,
      xl: `0 20px 25px -5px rgba(0, 0, 0, ${darkBase.toFixed(
        2
      )}), 0 8px 10px -6px rgba(0, 0, 0, ${darkBase.toFixed(2)})`,
      "2xl": `0 25px 50px -12px rgba(0, 0, 0, ${(0.5 * intensity).toFixed(2)})`,
      inner: `inset 0 2px 4px 0 rgba(0, 0, 0, ${(0.3 * intensity).toFixed(2)})`,
    },
  };
}

/**
 * Generate shadows with detailed settings
 */
export function generateShadowsWithSettings(
  settings: ShadowSettings
): TokenSystem["shadows"] {
  const { offsetX, offsetY, blur, spread, opacity } = settings;

  // Scale values for each shadow size
  const scales = {
    sm: { y: 0.25, blur: 0.5, spread: 0 },
    md: { y: 1, blur: 1.5, spread: -0.25 },
    lg: { y: 2.5, blur: 3.75, spread: -0.75 },
    xl: { y: 5, blur: 6.25, spread: -1.25 },
    "2xl": { y: 6.25, blur: 12.5, spread: -3 },
  };

  const createShadow = (
    scale: (typeof scales)["sm"],
    mode: "light" | "dark"
  ) => {
    const modeOpacity = mode === "light" ? opacity : opacity * 1.5;
    const x = offsetX * scale.y;
    const y = offsetY * scale.y;
    const b = blur * scale.blur;
    const s = spread * scale.spread;
    return `${x}px ${y}px ${b}px ${s}px rgba(0, 0, 0, ${modeOpacity.toFixed(
      2
    )})`;
  };

  return {
    light: {
      sm: createShadow(scales.sm, "light"),
      md: createShadow(scales.md, "light"),
      lg: createShadow(scales.lg, "light"),
      xl: createShadow(scales.xl, "light"),
      "2xl": createShadow(scales["2xl"], "light"),
      inner: `inset 0 ${offsetY * 0.5}px ${blur * 1}px 0 rgba(0, 0, 0, ${(
        opacity * 0.5
      ).toFixed(2)})`,
    },
    dark: {
      sm: createShadow(scales.sm, "dark"),
      md: createShadow(scales.md, "dark"),
      lg: createShadow(scales.lg, "dark"),
      xl: createShadow(scales.xl, "dark"),
      "2xl": createShadow(scales["2xl"], "dark"),
      inner: `inset 0 ${offsetY * 0.5}px ${blur * 1}px 0 rgba(0, 0, 0, ${(
        opacity * 0.75
      ).toFixed(2)})`,
    },
  };
}

/**
 * Generate default border colors based on primitives
 */
export function generateBorderColors(
  primitives: TokenSystem["primitives"],
  customColors?: {
    light?: { default?: string; input?: string; ring?: string };
    dark?: { default?: string; input?: string; ring?: string };
  }
): TokenSystem["borderColors"] {
  const neutral = primitives.neutral;

  return {
    light: {
      default: customColors?.light?.default ?? neutral[200],
      input: customColors?.light?.input ?? neutral[300],
      ring: customColors?.light?.ring ?? neutral[500],
    },
    dark: {
      default: customColors?.dark?.default ?? neutral[700],
      input: customColors?.dark?.input ?? neutral[600],
      ring: customColors?.dark?.ring ?? neutral[500],
    },
  };
}

/**
 * Generate default layout tokens (breakpoints and containers)
 */
export function generateLayoutTokens(): LayoutTokens {
  return {
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    containers: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  };
}

/**
 * Generate a complete token system from brand colors
 */
export function generateTokens(
  brandColors: BrandColors,
  _mode: "light" | "dark" | "both" = "both"
): TokenSystem {
  // Generate primitive color palette
  const primitives = generatePrimitivePalette(brandColors);

  // Generate semantic tokens for requested mode(s)
  const lightSemantic = generateSemanticTokens(primitives, "light");
  const darkSemantic = generateSemanticTokens(primitives, "dark");

  // Generate surface tokens
  const lightSurface = generateSurfaceTokens(primitives, "light");
  const darkSurface = generateSurfaceTokens(primitives, "dark");

  // Generate utility tokens
  const lightUtility = generateUtilityTokens(primitives, "light");
  const darkUtility = generateUtilityTokens(primitives, "dark");

  // Build the token system
  const tokenSystem: TokenSystem = {
    primitives,
    semantic: {
      light: lightSemantic,
      dark: darkSemantic,
    },
    surface: {
      light: lightSurface,
      dark: darkSurface,
    },
    utility: {
      light: lightUtility,
      dark: darkUtility,
    },
    spacing: {}, // Empty - Tailwind handles spacing
    typography: defaultTypography,
    radii: defaultRadii,
    shadows: generateShadows(primitives),
    borderColors: generateBorderColors(primitives),
    layout: generateLayoutTokens(),
  };

  // If only one mode requested, we still generate both but could optimize later
  return tokenSystem;
}

/**
 * Get semantic tokens for a specific mode
 */
export function getSemanticForMode(
  tokenSystem: TokenSystem,
  mode: "light" | "dark"
): SemanticTokens {
  return tokenSystem.semantic[mode];
}
