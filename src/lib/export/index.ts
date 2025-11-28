/**
 * Export utilities for design tokens
 * Converts token system to CSS variables, Tailwind config, etc.
 */

import type { TokenSystem, ColorScale, ColorFormat } from '../types';
import { formatColorAs } from '../tokens';

/**
 * Convert a color to the target format
 */
function formatColor(color: string, format: ColorFormat): string {
  return formatColorAs(color, format);
}

/**
 * Convert a color scale to CSS custom properties
 */
function colorScaleToCssVars(name: string, scale: ColorScale, colorFormat: ColorFormat = 'hex'): string[] {
  return Object.entries(scale).map(
    ([shade, color]) => `  --color-${name}-${shade}: ${formatColor(color, colorFormat)};`
  );
}

/**
 * Export tokens as CSS custom properties
 */
export function exportToCss(
  tokens: TokenSystem,
  mode: 'light' | 'dark' | 'both' = 'both',
  colorFormat: ColorFormat = 'hex'
): string {
  const lines: string[] = [];
  
  // Root variables (primitives - always available)
  lines.push(':root {');
  lines.push('  /* Primitive Colors */');
  
  for (const [name, scale] of Object.entries(tokens.primitives)) {
    lines.push(...colorScaleToCssVars(name, scale, colorFormat));
  }
  
  lines.push('');
  lines.push('  /* Spacing */');
  for (const [name, value] of Object.entries(tokens.spacing)) {
    lines.push(`  --spacing-${name}: ${value};`);
  }
  
  lines.push('');
  lines.push('  /* Border Radius */');
  for (const [name, value] of Object.entries(tokens.radii)) {
    const varName = name === 'DEFAULT' ? 'radius' : `radius-${name}`;
    lines.push(`  --${varName}: ${value};`);
  }
  
  lines.push('');
  lines.push('  /* Typography */');
  for (const [name, fonts] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`  --font-${name}: ${fonts.join(', ')};`);
  }
  
  lines.push('}');
  
  // Light mode semantic tokens
  if (mode === 'light' || mode === 'both') {
    lines.push('');
    lines.push('/* Light Mode Semantic Colors */');
    const lightSelector = mode === 'both' ? ':root, [data-theme="light"]' : ':root';
    lines.push(`${lightSelector} {`);
    
    for (const [name, color] of Object.entries(tokens.semantic.light)) {
      lines.push(`  --${name}: ${formatColor(color.base, colorFormat)};`);
      lines.push(`  --${name}-muted: ${formatColor(color.muted, colorFormat)};`);
      lines.push(`  --${name}-accent: ${formatColor(color.accent, colorFormat)};`);
      lines.push(`  --on-${name}: ${formatColor(color.onBase, colorFormat)};`);
      lines.push(`  --on-${name}-muted: ${formatColor(color.onMuted, colorFormat)};`);
      lines.push(`  --on-${name}-accent: ${formatColor(color.onAccent, colorFormat)};`);
    }
    
    lines.push('');
    lines.push('  /* Light Mode Shadows */');
    for (const [name, value] of Object.entries(tokens.shadows.light)) {
      const varName = name === 'DEFAULT' ? 'shadow' : `shadow-${name}`;
      lines.push(`  --${varName}: ${value};`);
    }
    
    lines.push('}');
  }
  
  // Dark mode semantic tokens
  if (mode === 'dark' || mode === 'both') {
    lines.push('');
    lines.push('/* Dark Mode Semantic Colors */');
    const darkSelector = mode === 'both' ? '[data-theme="dark"]' : ':root';
    lines.push(`${darkSelector} {`);
    
    for (const [name, color] of Object.entries(tokens.semantic.dark)) {
      lines.push(`  --${name}: ${formatColor(color.base, colorFormat)};`);
      lines.push(`  --${name}-muted: ${formatColor(color.muted, colorFormat)};`);
      lines.push(`  --${name}-accent: ${formatColor(color.accent, colorFormat)};`);
      lines.push(`  --on-${name}: ${formatColor(color.onBase, colorFormat)};`);
      lines.push(`  --on-${name}-muted: ${formatColor(color.onMuted, colorFormat)};`);
      lines.push(`  --on-${name}-accent: ${formatColor(color.onAccent, colorFormat)};`);
    }
    
    lines.push('');
    lines.push('  /* Dark Mode Shadows */');
    for (const [name, value] of Object.entries(tokens.shadows.dark)) {
      const varName = name === 'DEFAULT' ? 'shadow' : `shadow-${name}`;
      lines.push(`  --${varName}: ${value};`);
    }
    
    lines.push('}');
  }
  
  // Media query for system preference
  if (mode === 'both') {
    lines.push('');
    lines.push('/* System Preference: Dark Mode */');
    lines.push('@media (prefers-color-scheme: dark) {');
    lines.push('  :root:not([data-theme="light"]) {');
    
    for (const [name, color] of Object.entries(tokens.semantic.dark)) {
      lines.push(`    --${name}: ${formatColor(color.base, colorFormat)};`);
      lines.push(`    --${name}-muted: ${formatColor(color.muted, colorFormat)};`);
      lines.push(`    --${name}-accent: ${formatColor(color.accent, colorFormat)};`);
      lines.push(`    --on-${name}: ${formatColor(color.onBase, colorFormat)};`);
      lines.push(`    --on-${name}-muted: ${formatColor(color.onMuted, colorFormat)};`);
      lines.push(`    --on-${name}-accent: ${formatColor(color.onAccent, colorFormat)};`);
    }
    
    for (const [name, value] of Object.entries(tokens.shadows.dark)) {
      const varName = name === 'DEFAULT' ? 'shadow' : `shadow-${name}`;
      lines.push(`    --${varName}: ${value};`);
    }
    
    lines.push('  }');
    lines.push('}');
  }
  
  return lines.join('\n');
}

/**
 * Export tokens as Tailwind v3 config
 */
export function exportToTailwindV3(tokens: TokenSystem, colorFormat: ColorFormat = 'hex'): string {
  const config = {
    theme: {
      extend: {
        colors: {} as Record<string, Record<string, string>>,
        spacing: tokens.spacing,
        borderRadius: tokens.radii,
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.fontSize,
        fontWeight: tokens.typography.fontWeight,
        boxShadow: {} as Record<string, string>,
      },
    },
  };
  
  // Add primitive colors
  for (const [name, scale] of Object.entries(tokens.primitives)) {
    config.theme.extend.colors[name] = {};
    for (const [shade, color] of Object.entries(scale)) {
      config.theme.extend.colors[name][shade] = formatColor(color, colorFormat);
    }
  }
  
  // Add semantic colors as CSS variable references
  const semanticColors = ['primary', 'secondary', 'success', 'warning', 'danger'];
  for (const name of semanticColors) {
    config.theme.extend.colors[name] = {
      DEFAULT: `var(--${name})`,
      muted: `var(--${name}-muted)`,
      accent: `var(--${name}-accent)`,
    };
  }
  
  // Add shadows
  for (const [name, value] of Object.entries(tokens.shadows.light)) {
    config.theme.extend.boxShadow[name === 'DEFAULT' ? 'DEFAULT' : name] = value;
  }
  
  return `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(config, null, 2)};`;
}

/**
 * Export tokens as Tailwind v4 CSS
 */
export function exportToTailwindV4(tokens: TokenSystem, colorFormat: ColorFormat = 'hex'): string {
  const lines: string[] = [];
  
  lines.push('@theme {');
  lines.push('  /* Colors */');
  
  // Primitive colors
  for (const [name, scale] of Object.entries(tokens.primitives)) {
    for (const [shade, color] of Object.entries(scale)) {
      lines.push(`  --color-${name}-${shade}: ${formatColor(color, colorFormat)};`);
    }
  }
  
  lines.push('');
  lines.push('  /* Semantic Colors (using CSS variables for theming) */');
  const semanticNames = ['primary', 'secondary', 'success', 'warning', 'danger'];
  for (const name of semanticNames) {
    lines.push(`  --color-${name}: var(--${name});`);
    lines.push(`  --color-${name}-muted: var(--${name}-muted);`);
    lines.push(`  --color-${name}-accent: var(--${name}-accent);`);
  }
  
  lines.push('');
  lines.push('  /* Spacing */');
  for (const [name, value] of Object.entries(tokens.spacing)) {
    lines.push(`  --spacing-${name}: ${value};`);
  }
  
  lines.push('');
  lines.push('  /* Border Radius */');
  for (const [name, value] of Object.entries(tokens.radii)) {
    const varName = name === 'DEFAULT' ? 'radius' : `radius-${name}`;
    lines.push(`  --${varName}: ${value};`);
  }
  
  lines.push('');
  lines.push('  /* Font Families */');
  for (const [name, fonts] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`  --font-${name}: ${fonts.join(', ')};`);
  }
  
  lines.push('');
  lines.push('  /* Shadows */');
  for (const [name, value] of Object.entries(tokens.shadows.light)) {
    const varName = name === 'DEFAULT' ? 'shadow' : `shadow-${name}`;
    lines.push(`  --${varName}: ${value};`);
  }
  
  lines.push('}');
  
  return lines.join('\n');
}

/**
 * Export tokens as JSON
 */
export function exportToJson(tokens: TokenSystem, pretty: boolean = true): string {
  return pretty ? JSON.stringify(tokens, null, 2) : JSON.stringify(tokens);
}

/**
 * Export tokens as SCSS variables
 */
export function exportToScss(tokens: TokenSystem, colorFormat: ColorFormat = 'hex'): string {
  const lines: string[] = [];
  
  lines.push('// Primitive Colors');
  for (const [name, scale] of Object.entries(tokens.primitives)) {
    for (const [shade, color] of Object.entries(scale)) {
      lines.push(`$color-${name}-${shade}: ${formatColor(color, colorFormat)};`);
    }
  }
  
  lines.push('');
  lines.push('// Spacing');
  for (const [name, value] of Object.entries(tokens.spacing)) {
    lines.push(`$spacing-${name}: ${value};`);
  }
  
  lines.push('');
  lines.push('// Border Radius');
  for (const [name, value] of Object.entries(tokens.radii)) {
    const varName = name === 'DEFAULT' ? 'radius' : `radius-${name}`;
    lines.push(`$${varName}: ${value};`);
  }
  
  lines.push('');
  lines.push('// Typography');
  for (const [name, fonts] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`$font-${name}: ${fonts.join(', ')};`);
  }
  
  lines.push('');
  lines.push('// Shadows (Light Mode)');
  for (const [name, value] of Object.entries(tokens.shadows.light)) {
    const varName = name === 'DEFAULT' ? 'shadow' : `shadow-${name}`;
    lines.push(`$${varName}: ${value};`);
  }
  
  return lines.join('\n');
}

/**
 * Export tokens as Lovable theme format
 * Lovable uses shadcn/ui compatible CSS variables
 */
export function exportToLovable(tokens: TokenSystem, colorFormat: ColorFormat = 'hsl'): string {
  const lines: string[] = [];
  
  // Get primary, secondary colors for Lovable format
  const lightPrimary = tokens.semantic.light.primary;
  const lightSecondary = tokens.semantic.light.secondary;
  const darkPrimary = tokens.semantic.dark.primary;
  const darkSecondary = tokens.semantic.dark.secondary;
  
  // Get neutral colors for backgrounds, foregrounds
  const neutralScale = tokens.primitives.neutral || tokens.primitives.primary;
  
  lines.push('@layer base {');
  lines.push('  :root {');
  lines.push('    /* Lovable Theme - Light Mode */');
  lines.push(`    --background: ${formatColor(neutralScale[100] || '#ffffff', colorFormat)};`);
  lines.push(`    --foreground: ${formatColor(neutralScale[10] || '#0a0a0a', colorFormat)};`);
  lines.push('');
  lines.push(`    --card: ${formatColor(neutralScale[100] || '#ffffff', colorFormat)};`);
  lines.push(`    --card-foreground: ${formatColor(neutralScale[10] || '#0a0a0a', colorFormat)};`);
  lines.push('');
  lines.push(`    --popover: ${formatColor(neutralScale[100] || '#ffffff', colorFormat)};`);
  lines.push(`    --popover-foreground: ${formatColor(neutralScale[10] || '#0a0a0a', colorFormat)};`);
  lines.push('');
  lines.push(`    --primary: ${formatColor(lightPrimary.base, colorFormat)};`);
  lines.push(`    --primary-foreground: ${formatColor(lightPrimary.onBase, colorFormat)};`);
  lines.push('');
  lines.push(`    --secondary: ${formatColor(lightSecondary.base, colorFormat)};`);
  lines.push(`    --secondary-foreground: ${formatColor(lightSecondary.onBase, colorFormat)};`);
  lines.push('');
  lines.push(`    --muted: ${formatColor(neutralScale[90] || '#f4f4f5', colorFormat)};`);
  lines.push(`    --muted-foreground: ${formatColor(neutralScale[50] || '#71717a', colorFormat)};`);
  lines.push('');
  lines.push(`    --accent: ${formatColor(lightPrimary.muted, colorFormat)};`);
  lines.push(`    --accent-foreground: ${formatColor(neutralScale[10] || '#0a0a0a', colorFormat)};`);
  lines.push('');
  lines.push(`    --destructive: ${formatColor(tokens.semantic.light.danger?.base || '#ef4444', colorFormat)};`);
  lines.push(`    --destructive-foreground: ${formatColor(tokens.semantic.light.danger?.onBase || '#fafafa', colorFormat)};`);
  lines.push('');
  lines.push(`    --border: ${formatColor(neutralScale[80] || '#e4e4e7', colorFormat)};`);
  lines.push(`    --input: ${formatColor(neutralScale[80] || '#e4e4e7', colorFormat)};`);
  lines.push(`    --ring: ${formatColor(lightPrimary.base, colorFormat)};`);
  lines.push('');
  lines.push(`    --radius: ${tokens.radii?.lg || tokens.radii?.md || '0.5rem'};`);
  lines.push('');
  lines.push('    /* Sidebar */');
  lines.push(`    --sidebar-background: ${formatColor(neutralScale[100] || '#ffffff', colorFormat)};`);
  lines.push(`    --sidebar-foreground: ${formatColor(neutralScale[10] || '#0a0a0a', colorFormat)};`);
  lines.push(`    --sidebar-primary: ${formatColor(lightPrimary.base, colorFormat)};`);
  lines.push(`    --sidebar-primary-foreground: ${formatColor(lightPrimary.onBase, colorFormat)};`);
  lines.push(`    --sidebar-accent: ${formatColor(lightPrimary.muted, colorFormat)};`);
  lines.push(`    --sidebar-accent-foreground: ${formatColor(neutralScale[10] || '#0a0a0a', colorFormat)};`);
  lines.push(`    --sidebar-border: ${formatColor(neutralScale[80] || '#e4e4e7', colorFormat)};`);
  lines.push(`    --sidebar-ring: ${formatColor(lightPrimary.base, colorFormat)};`);
  lines.push('  }');
  lines.push('');
  lines.push('  .dark {');
  lines.push('    /* Lovable Theme - Dark Mode */');
  lines.push(`    --background: ${formatColor(neutralScale[10] || '#0a0a0a', colorFormat)};`);
  lines.push(`    --foreground: ${formatColor(neutralScale[100] || '#fafafa', colorFormat)};`);
  lines.push('');
  lines.push(`    --card: ${formatColor(neutralScale[10] || '#0a0a0a', colorFormat)};`);
  lines.push(`    --card-foreground: ${formatColor(neutralScale[100] || '#fafafa', colorFormat)};`);
  lines.push('');
  lines.push(`    --popover: ${formatColor(neutralScale[10] || '#0a0a0a', colorFormat)};`);
  lines.push(`    --popover-foreground: ${formatColor(neutralScale[100] || '#fafafa', colorFormat)};`);
  lines.push('');
  lines.push(`    --primary: ${formatColor(darkPrimary.base, colorFormat)};`);
  lines.push(`    --primary-foreground: ${formatColor(darkPrimary.onBase, colorFormat)};`);
  lines.push('');
  lines.push(`    --secondary: ${formatColor(darkSecondary.base, colorFormat)};`);
  lines.push(`    --secondary-foreground: ${formatColor(darkSecondary.onBase, colorFormat)};`);
  lines.push('');
  lines.push(`    --muted: ${formatColor(neutralScale[20] || '#27272a', colorFormat)};`);
  lines.push(`    --muted-foreground: ${formatColor(neutralScale[60] || '#a1a1aa', colorFormat)};`);
  lines.push('');
  lines.push(`    --accent: ${formatColor(darkPrimary.muted, colorFormat)};`);
  lines.push(`    --accent-foreground: ${formatColor(neutralScale[100] || '#fafafa', colorFormat)};`);
  lines.push('');
  lines.push(`    --destructive: ${formatColor(tokens.semantic.dark.danger?.base || '#ef4444', colorFormat)};`);
  lines.push(`    --destructive-foreground: ${formatColor(tokens.semantic.dark.danger?.onBase || '#fafafa', colorFormat)};`);
  lines.push('');
  lines.push(`    --border: ${formatColor(neutralScale[30] || '#27272a', colorFormat)};`);
  lines.push(`    --input: ${formatColor(neutralScale[30] || '#27272a', colorFormat)};`);
  lines.push(`    --ring: ${formatColor(darkPrimary.base, colorFormat)};`);
  lines.push('');
  lines.push('    /* Sidebar */');
  lines.push(`    --sidebar-background: ${formatColor(neutralScale[10] || '#0a0a0a', colorFormat)};`);
  lines.push(`    --sidebar-foreground: ${formatColor(neutralScale[100] || '#fafafa', colorFormat)};`);
  lines.push(`    --sidebar-primary: ${formatColor(darkPrimary.base, colorFormat)};`);
  lines.push(`    --sidebar-primary-foreground: ${formatColor(darkPrimary.onBase, colorFormat)};`);
  lines.push(`    --sidebar-accent: ${formatColor(darkPrimary.muted, colorFormat)};`);
  lines.push(`    --sidebar-accent-foreground: ${formatColor(neutralScale[100] || '#fafafa', colorFormat)};`);
  lines.push(`    --sidebar-border: ${formatColor(neutralScale[30] || '#27272a', colorFormat)};`);
  lines.push(`    --sidebar-ring: ${formatColor(darkPrimary.base, colorFormat)};`);
  lines.push('  }');
  lines.push('}');
  
  return lines.join('\n');
}

export type ExportFormat = 'css' | 'tailwind-v3' | 'tailwind-v4' | 'json' | 'scss' | 'lovable';

/**
 * Export tokens in the specified format
 */
export function exportTokens(
  tokens: TokenSystem,
  format: ExportFormat,
  mode: 'light' | 'dark' | 'both' = 'both',
  colorFormat: ColorFormat = 'hex'
): string {
  switch (format) {
    case 'css':
      return exportToCss(tokens, mode, colorFormat);
    case 'tailwind-v3':
      return exportToTailwindV3(tokens, colorFormat);
    case 'tailwind-v4':
      return exportToTailwindV4(tokens, colorFormat);
    case 'json':
      return exportToJson(tokens);
    case 'scss':
      return exportToScss(tokens, colorFormat);
    case 'lovable':
      return exportToLovable(tokens, colorFormat);
    default:
      throw new Error(`Unknown export format: ${format}`);
  }
}

/**
 * Get file extension for export format
 */
export function getFileExtension(format: ExportFormat): string {
  switch (format) {
    case 'css':
    case 'tailwind-v4':
    case 'lovable':
      return 'css';
    case 'tailwind-v3':
      return 'js';
    case 'json':
      return 'json';
    case 'scss':
      return 'scss';
    default:
      return 'txt';
  }
}

/**
 * Get suggested filename for export
 */
export function getSuggestedFilename(format: ExportFormat, themeName?: string): string {
  const base = themeName ? themeName.toLowerCase().replace(/\s+/g, '-') : 'tokens';
  
  switch (format) {
    case 'css':
      return `${base}.css`;
    case 'tailwind-v3':
      return 'tailwind.config.js';
    case 'tailwind-v4':
      return `${base}.theme.css`;
    case 'json':
      return `${base}.json`;
    case 'scss':
      return `_${base}.scss`;
    case 'lovable':
      return `${base}-lovable-theme.css`;
    default:
      return `${base}.txt`;
  }
}
