/**
 * OKLCH color utilities using culori
 * OKLCH provides perceptually uniform color manipulation
 */

import { formatHex, formatRgb, formatHsl, Oklch, converter } from 'culori';
import type { ColorScale, ColorFormat } from '../types';

const toOklch = converter('oklch');
const toRgbConverter = converter('rgb');
const toHslConverter = converter('hsl');

/**
 * Convert any color format to OKLCH
 */
export function parseToOklch(color: string): Oklch {
  const result = toOklch(color);
  if (!result) {
    throw new Error(`Invalid color: ${color}`);
  }
  return result as Oklch;
}

/**
 * Convert OKLCH to hex
 */
export function oklchToHex(color: Oklch): string {
  const hex = formatHex(color);
  return hex || '#000000';
}

/**
 * Generate a color scale from a base color using OKLCH
 * Creates 10 shades (10-100) with perceptually uniform lightness
 */
export function generateColorScale(baseColor: string): ColorScale {
  const base = parseToOklch(baseColor);
  
  // Define target lightness values for each shade
  // These are perceptually uniform steps
  const lightnessMap: Record<number, number> = {
    10: 0.15,  // Very dark
    20: 0.25,
    30: 0.35,
    40: 0.45,
    50: 0.55,
    60: 0.65,
    70: 0.75,
    80: 0.85,
    90: 0.92,
    100: 0.97, // Very light
  };

  const scale: Record<number, string> = {};

  for (const [shade, targetLightness] of Object.entries(lightnessMap)) {
    const shadeNum = parseInt(shade);
    
    // Adjust chroma for very light and very dark shades
    // to maintain color vibrancy
    let chroma = base.c || 0.1;
    
    if (targetLightness > 0.9) {
      // Very light shades need reduced chroma
      chroma = chroma * 0.3;
    } else if (targetLightness < 0.2) {
      // Very dark shades need reduced chroma
      chroma = chroma * 0.5;
    }

    const shadeColor: Oklch = {
      mode: 'oklch',
      l: targetLightness,
      c: chroma,
      h: base.h || 0,
    };

    scale[shadeNum] = oklchToHex(shadeColor);
  }

  // Type assertion is safe because we generate all 10 required shades
  return scale as unknown as ColorScale;
}

/**
 * Adjust the lightness of a color
 */
export function adjustLightness(color: string, lightness: number): string {
  const oklchColor = parseToOklch(color);
  return oklchToHex({
    ...oklchColor,
    l: Math.max(0, Math.min(1, lightness)),
  });
}

/**
 * Adjust the chroma (saturation) of a color
 */
export function adjustChroma(color: string, chroma: number): string {
  const oklchColor = parseToOklch(color);
  return oklchToHex({
    ...oklchColor,
    c: Math.max(0, chroma),
  });
}

/**
 * Convert color to RGB object
 */
function toRgb(color: string): { r: number; g: number; b: number } {
  const rgb = toRgbConverter(color);
  
  if (!rgb || !('r' in rgb) || !('g' in rgb) || !('b' in rgb)) {
    throw new Error(`Cannot convert ${color} to RGB`);
  }
  
  return {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
  };
}

/**
 * Get the relative luminance of a color (for contrast calculations)
 * Using WCAG formula
 */
export function getRelativeLuminance(color: string): number {
  const rgb = toRgb(color);
  
  const rsRGB = rgb.r;
  const gsRGB = rgb.g;
  const bsRGB = rgb.b;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors (WCAG formula)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standard
 */
export function meetsWCAG_AA(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check if contrast ratio meets WCAG AAA standard
 */
export function meetsWCAG_AAA(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Get OKLCH values as a readable string
 */
export function getOklchString(color: string): string {
  const oklch = parseToOklch(color);
  const l = (oklch.l * 100).toFixed(1);
  const c = (oklch.c * 100).toFixed(1);
  const h = (oklch.h || 0).toFixed(0);
  return `oklch(${l}% ${c}% ${h})`;
}

/**
 * Convert a color to the specified format
 */
export function formatColorAs(color: string, format: ColorFormat): string {
  switch (format) {
    case 'hex':
      return formatHex(color) || '#000000';
    case 'rgb': {
      const rgb = toRgbConverter(color);
      if (!rgb) return 'rgb(0, 0, 0)';
      return formatRgb(rgb) || 'rgb(0, 0, 0)';
    }
    case 'hsl': {
      const hsl = toHslConverter(color);
      if (!hsl) return 'hsl(0, 0%, 0%)';
      return formatHsl(hsl) || 'hsl(0, 0%, 0%)';
    }
    case 'oklch':
    default:
      return getOklchString(color);
  }
}
