/**
 * Export utilities for design tokens
 * Converts token system to CSS variables, Tailwind config, etc.
 */

import type { TokenSystem, ColorScale } from '../types';

/**
 * Convert a color scale to CSS custom properties
 */
function colorScaleToCssVars(name: string, scale: ColorScale): string[] {
  return Object.entries(scale).map(
    ([shade, color]) => `  --color-${name}-${shade}: ${color};`
  );
}

/**
 * Export tokens as CSS custom properties
 */
export function exportToCss(
  tokens: TokenSystem,
  mode: 'light' | 'dark' | 'both' = 'both'
): string {
  const lines: string[] = [];
  
  // Root variables (primitives - always available)
  lines.push(':root {');
  lines.push('  /* Primitive Colors */');
  
  for (const [name, scale] of Object.entries(tokens.primitives)) {
    lines.push(...colorScaleToCssVars(name, scale));
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
      lines.push(`  --${name}: ${color.base};`);
      lines.push(`  --${name}-muted: ${color.muted};`);
      lines.push(`  --${name}-accent: ${color.accent};`);
      lines.push(`  --on-${name}: ${color.onBase};`);
      lines.push(`  --on-${name}-muted: ${color.onMuted};`);
      lines.push(`  --on-${name}-accent: ${color.onAccent};`);
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
      lines.push(`  --${name}: ${color.base};`);
      lines.push(`  --${name}-muted: ${color.muted};`);
      lines.push(`  --${name}-accent: ${color.accent};`);
      lines.push(`  --on-${name}: ${color.onBase};`);
      lines.push(`  --on-${name}-muted: ${color.onMuted};`);
      lines.push(`  --on-${name}-accent: ${color.onAccent};`);
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
      lines.push(`    --${name}: ${color.base};`);
      lines.push(`    --${name}-muted: ${color.muted};`);
      lines.push(`    --${name}-accent: ${color.accent};`);
      lines.push(`    --on-${name}: ${color.onBase};`);
      lines.push(`    --on-${name}-muted: ${color.onMuted};`);
      lines.push(`    --on-${name}-accent: ${color.onAccent};`);
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
export function exportToTailwindV3(tokens: TokenSystem): string {
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
      config.theme.extend.colors[name][shade] = color;
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
export function exportToTailwindV4(tokens: TokenSystem): string {
  const lines: string[] = [];
  
  lines.push('@theme {');
  lines.push('  /* Colors */');
  
  // Primitive colors
  for (const [name, scale] of Object.entries(tokens.primitives)) {
    for (const [shade, color] of Object.entries(scale)) {
      lines.push(`  --color-${name}-${shade}: ${color};`);
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
export function exportToScss(tokens: TokenSystem): string {
  const lines: string[] = [];
  
  lines.push('// Primitive Colors');
  for (const [name, scale] of Object.entries(tokens.primitives)) {
    for (const [shade, color] of Object.entries(scale)) {
      lines.push(`$color-${name}-${shade}: ${color};`);
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

export type ExportFormat = 'css' | 'tailwind-v3' | 'tailwind-v4' | 'json' | 'scss';

/**
 * Export tokens in the specified format
 */
export function exportTokens(
  tokens: TokenSystem,
  format: ExportFormat,
  mode: 'light' | 'dark' | 'both' = 'both'
): string {
  switch (format) {
    case 'css':
      return exportToCss(tokens, mode);
    case 'tailwind-v3':
      return exportToTailwindV3(tokens);
    case 'tailwind-v4':
      return exportToTailwindV4(tokens);
    case 'json':
      return exportToJson(tokens);
    case 'scss':
      return exportToScss(tokens);
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
    default:
      return `${base}.txt`;
  }
}
