/**
 * Core type definitions for Vibe Themes
 */

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface ColorScale {
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  100: string;
}

export interface TokenSystem {
  primitives: {
    [colorName: string]: ColorScale;
  };
  semantic: {
    light: SemanticTokens;
    dark: SemanticTokens;
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
}

export interface SemanticTokens {
  primary: SemanticColor;
  secondary: SemanticColor;
  success: SemanticColor;
  warning: SemanticColor;
  danger: SemanticColor;
}

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
  mode: 'light' | 'dark' | 'both';
}

export interface GenerateTokensAIInput {
  brandColors: BrandColors;
  mode: 'light' | 'dark' | 'both';
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
  mode: 'light' | 'dark' | 'both';
  created_at: string;
  updated_at: string;
}

export interface ThemeInsert {
  name: string;
  brand_colors: BrandColors;
  tokens: TokenSystem;
  mode: 'light' | 'dark' | 'both';
}
