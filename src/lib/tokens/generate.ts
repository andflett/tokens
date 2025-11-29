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
 * Default typography scale
 */
const defaultTypography = {
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "monospace"],
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }] as [string, { lineHeight: string }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }] as [
      string,
      { lineHeight: string }
    ],
    base: ["1rem", { lineHeight: "1.5rem" }] as [
      string,
      { lineHeight: string }
    ],
    lg: ["1.125rem", { lineHeight: "1.75rem" }] as [
      string,
      { lineHeight: string }
    ],
    xl: ["1.25rem", { lineHeight: "1.75rem" }] as [
      string,
      { lineHeight: string }
    ],
    "2xl": ["1.5rem", { lineHeight: "2rem" }] as [
      string,
      { lineHeight: string }
    ],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }] as [
      string,
      { lineHeight: string }
    ],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }] as [
      string,
      { lineHeight: string }
    ],
    "5xl": ["3rem", { lineHeight: "1" }] as [string, { lineHeight: string }],
    "6xl": ["3.75rem", { lineHeight: "1" }] as [string, { lineHeight: string }],
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
};

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
 * Generate radii scale from a base value
 */
export function generateRadiiScale(
  baseRadius: number = 0.25
): Record<string, string> {
  const round = (value: number) => Math.round(value * 1000) / 1000;
  return {
    xs: `${round(baseRadius * 0.5)}rem`,
    sm: `${round(baseRadius)}rem`,
    md: `${round(baseRadius * 1.5)}rem`,
    lg: `${round(baseRadius * 2)}rem`,
    xl: `${round(baseRadius * 3)}rem`,
    "2xl": `${round(baseRadius * 4)}rem`,
    "3xl": `${round(baseRadius * 6)}rem`,
    "4xl": `${round(baseRadius * 8)}rem`,
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
  primitives: TokenSystem["primitives"]
): TokenSystem["borderColors"] {
  const neutral = primitives.neutral;

  return {
    light: {
      default: neutral[200],
      input: neutral[300],
      ring: neutral[500],
    },
    dark: {
      default: neutral[700],
      input: neutral[600],
      ring: neutral[500],
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
