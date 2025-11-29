/**
 * OKLCH color utilities using culori
 * OKLCH provides perceptually uniform color manipulation
 */

import { formatHex, formatRgb, formatHsl, Oklch, converter } from "culori";
import type { ColorScale, ColorFormat } from "../types";

const toOklch = converter("oklch");
const toRgbConverter = converter("rgb");
const toHslConverter = converter("hsl");

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
  return hex || "#000000";
}

/**
 * Generate a color scale from a base color using OKLCH
 * Creates 11 shades (50,100,200,...,900,950) with perceptually uniform lightness
 * Shade 500 exactly matches the baseColor, with proportional scaling to lighter/darker shades
 */
export function generateColorScale(baseColor: string): ColorScale {
  const base = parseToOklch(baseColor);
  const baseLightness = base.l;

  // Calculate lightness values relative to the base color (shade 500)
  // We scale proportionally from the base lightness
  const lightnessMap: Record<number, number> = {
    50: Math.min(0.98, baseLightness + (0.98 - baseLightness) * 1.0), // Lightest
    100: Math.min(0.96, baseLightness + (0.96 - baseLightness) * 0.9),
    200: Math.min(0.92, baseLightness + (0.92 - baseLightness) * 0.8),
    300: Math.min(0.88, baseLightness + (0.88 - baseLightness) * 0.6),
    400: baseLightness + (Math.min(0.98, baseLightness + 0.1) - baseLightness) * 0.3,
    500: baseLightness, // Exactly matches the base color
    600: baseLightness - (baseLightness - Math.max(0.05, baseLightness - 0.15)) * 0.3,
    700: baseLightness - (baseLightness - Math.max(0.05, baseLightness - 0.25)) * 0.5,
    800: baseLightness - (baseLightness - Math.max(0.05, baseLightness - 0.35)) * 0.7,
    900: baseLightness - (baseLightness - Math.max(0.05, baseLightness - 0.45)) * 0.85,
    950: Math.max(0.05, baseLightness - 0.5), // Darkest
  };

  const scale: Record<number, string> = {};

  for (const [shade, targetLightness] of Object.entries(lightnessMap)) {
    const shadeNum = parseInt(shade);

    // For shade 500, use the exact base color to preserve user intent
    if (shadeNum === 500) {
      scale[500] = getOklchString(baseColor);
      continue;
    }

    // Adjust chroma for very light and very dark shades
    // to maintain color vibrancy
    let chroma = base.c || 0;

    if (targetLightness > 0.9) {
      // Very light shades (50, 100) need reduced chroma
      chroma = chroma * 0.3;
    } else if (targetLightness < 0.2) {
      // Very dark shades (900, 950) need reduced chroma
      chroma = chroma * 0.5;
    }

    const shadeColor: Oklch = {
      mode: "oklch",
      l: targetLightness,
      c: chroma,
      h: base.h || 0,
    };

    // Store as OKLCH string
    const l = (shadeColor.l * 100).toFixed(2) + "%";
    const c = shadeColor.c.toFixed(4);
    const h = (shadeColor.h || 0).toFixed(2);
    scale[shadeNum] = `oklch(${l} ${c} ${h})`;
  }

  // Type assertion is safe because we generate all required shades for the scale
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

  if (!rgb || !("r" in rgb) || !("g" in rgb) || !("b" in rgb)) {
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

  const r =
    rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g =
    gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b =
    bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

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
export function meetsWCAG_AA(
  ratio: number,
  isLargeText: boolean = false
): boolean {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check if contrast ratio meets WCAG AAA standard
 */
export function meetsWCAG_AAA(
  ratio: number,
  isLargeText: boolean = false
): boolean {
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Get OKLCH values as a readable string
 */
export function getOklchString(color: string): string {
  const oklch = parseToOklch(color);
  const l = (oklch.l * 100).toFixed(2) + "%";
  const c = oklch.c.toFixed(4);
  const h = (oklch.h || 0).toFixed(2);
  return `oklch(${l} ${c} ${h})`;
}

/**
 * Convert a color to the specified format
 */
export function formatColorAs(color: string, format: ColorFormat): string {
  switch (format) {
    case "hex":
      return formatHex(color) || "#000000";
    case "rgb": {
      const rgb = toRgbConverter(color);
      if (!rgb) return "rgb(0, 0, 0)";
      return formatRgb(rgb) || "rgb(0, 0, 0)";
    }
    case "hsl": {
      const hsl = toHslConverter(color);
      if (!hsl) return "hsl(0, 0%, 0%)";
      return formatHsl(hsl) || "hsl(0, 0%, 0%)";
    }
    case "oklch":
    default:
      return getOklchString(color);
  }
}
