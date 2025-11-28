/**
 * Core type definitions for Tokens
 */

export interface BrandColors {
  primary: string;
  secondary: string;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ShadowSettings {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  opacity: number;
}

export interface BorderColors {
  default: string;
  input: string;
  ring: string;
}

export interface LayoutTokens {
  breakpoints: Record<string, string>;
  containers: Record<string, string>;
}

export interface TokenSystem {
  primitives: {
    [colorName: string]: ColorScale;
  };
  semantic: {
    light: SemanticTokens;
    dark: SemanticTokens;
  };
  surface: {
    light: SurfaceTokens;
    dark: SurfaceTokens;
  };
  utility: {
    light: UtilityTokens;
    dark: UtilityTokens;
  };
  spacing: Record<string, string>;
  typography: {
    fontFamily: Record<string, string[]>;
    fontSize: Record<string, [string, { lineHeight: string }]>;
    fontWeight: Record<string, number>;
  };
  radii: Record<string, string>;
  shadows: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  borderColors?: {
    light: BorderColors;
    dark: BorderColors;
  };
  layout?: LayoutTokens;
}

export type ColorFormat = "oklch" | "rgb" | "hsl" | "hex";

export interface SemanticTokens {
  primary: ExtendedSemanticColor;
  secondary: ExtendedSemanticColor;
  gray: ExtendedSemanticColor;
  success: ExtendedSemanticColor;
  destructive: ExtendedSemanticColor;
  warning: ExtendedSemanticColor;
  muted: SemanticColorPair;
  accent: SemanticColorPair;
}

/**
 * Extended semantic color with foreground, subdued, highlight variants plus full scale
 */
export interface ExtendedSemanticColor {
  DEFAULT: string;
  foreground: string;
  subdued: string;
  "subdued-foreground": string;
  highlight: string;
  "highlight-foreground": string;
}

/**
 * Simple color pair for muted and accent
 */
export interface SemanticColorPair {
  DEFAULT: string;
  foreground: string;
}

/**
 * Surface tokens derived from gray palette (shadcn-style)
 */
export interface SurfaceTokens {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
}

/**
 * Utility tokens for borders, rings, inputs
 */
export interface UtilityTokens {
  border: string;
  ring: string;
  input: string;
}

/** @deprecated Use ExtendedSemanticColor instead */
export interface SemanticColor {
  base: string;
  muted: string;
  accent: string;
  onBase: string;
  onMuted: string;
  onAccent: string;
}

export interface GenerateTokensInput {
  brandColors: BrandColors;
  mode: "light" | "dark" | "both";
}

export interface GenerateTokensAIInput {
  brandColors: BrandColors;
  mode: "light" | "dark" | "both";
  designContext?: string;
  preferences?: string;
}

export interface GenerateComponentInput {
  componentType: string;
  tokenSystem: TokenSystem;
  requirements?: string;
}

export interface AIPromptResponse {
  prompt: string;
  context: Record<string, unknown>;
}

// Database types
export interface Theme {
  id: string;
  user_id: string;
  name: string;
  brand_colors: BrandColors;
  tokens: TokenSystem;
  mode: "light" | "dark" | "both";
  created_at: string;
  updated_at: string;
}

export interface ThemeInsert {
  name: string;
  brand_colors: BrandColors;
  tokens: TokenSystem;
  mode: "light" | "dark" | "both";
}
