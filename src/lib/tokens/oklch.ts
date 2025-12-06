/**
 * OKLCH color utilities using culori
 * OKLCH provides perceptually uniform color manipulation
 */

import { formatHex, formatRgb, formatHsl, Oklch, converter } from "culori";
import { APCAcontrast, sRGBtoY } from "apca-w3";
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
 * Convert XYZ Y component to Lab L* (lightness)
 * Using CIE D65 standard illuminant
 */
function YtoL(Y: number): number {
  const Yn = 1.0; // D65 white point Y = 1.0
  const ratio = Y / Yn;

  if (ratio > 0.008856) {
    return 116 * Math.pow(ratio, 1 / 3) - 16;
  }
  return 903.3 * ratio;
}

/**
 * Apply toe function to convert Lab L* to OKLab L
 * Compresses the dark end of the lightness spectrum
 */
function toe(l: number): number {
  const k1 = 0.206;
  const k2 = 0.03;
  const k3 = (1 + k1) / (1 + k2);

  return (
    0.5 * (k3 * l - k1 + Math.sqrt(Math.pow(k3 * l - k1, 2) + 4 * k2 * k3 * l))
  );
}

/**
 * Compute scale lightness using APCA contrast algorithm
 * Creates perceptually uniform lightness steps based on APCA contrast values
 *
 * APCA provides better perceptual accuracy than WCAG 2.x:
 * - Lc 90 = High contrast (body text)
 * - Lc 75 = Medium contrast (large text)
 * - Lc 60 = Moderate contrast (UI elements)
 * - Lc 45 = Low contrast (disabled states)
 *
 * @param scaleValue - Position in scale (0 = lightest, 1 = darkest)
 * @param backgroundY - Background luminance (for APCA calculation)
 * @param targetContrast - Target APCA contrast value (default 90)
 */
function computeScaleLightness(
  scaleValue: number,
  backgroundY: number,
  targetContrast: number = 90
): number {
  // For light backgrounds, we want darker colors as scaleValue increases
  // APCA contrast is directional: text on background
  // We use exponential distribution for smooth perceptual steps

  // Map scaleValue (0-1) to APCA contrast range
  // scaleValue 0 (lightest) = low contrast (Lc ~15)
  // scaleValue 0.5 (medium) = medium contrast (Lc ~60-75)
  // scaleValue 1 (darkest) = high contrast (Lc ~90-108)
  const minContrast = 15;
  const maxContrast = 108;
  const apcaContrast =
    minContrast + (maxContrast - minContrast) * Math.pow(scaleValue, 1.5);

  // Binary search to find the Y luminance that achieves target APCA contrast
  let low = 0.0;
  let high = 1.0;
  let iterations = 0;
  const maxIterations = 50;
  const tolerance = 0.5; // APCA contrast tolerance

  while (iterations < maxIterations && high - low > 0.0001) {
    const mid = (low + high) / 2;

    // Convert Y to sRGB for APCA (approximate grayscale)
    const textRGB = Math.pow(mid, 1 / 2.2) * 255;
    const bgRGB = Math.pow(backgroundY, 1 / 2.2) * 255;

    // Calculate APCA contrast (text on background)
    const contrast = Math.abs(
      APCAcontrast(
        sRGBtoY([textRGB, textRGB, textRGB]),
        sRGBtoY([bgRGB, bgRGB, bgRGB])
      )
    );

    if (Math.abs(contrast - apcaContrast) < tolerance) {
      // Convert Y to Lab L* then to OKLab L
      const labL = YtoL(mid);
      return toe(labL / 100);
    }

    if (contrast < apcaContrast) {
      // Need more contrast, so adjust based on background
      if (backgroundY > 0.5) {
        high = mid; // Lighter bg: go darker
      } else {
        low = mid; // Darker bg: go lighter
      }
    } else {
      if (backgroundY > 0.5) {
        low = mid;
      } else {
        high = mid;
      }
    }

    iterations++;
  }

  // Fallback: convert final Y to OKLab L
  const finalY = (low + high) / 2;
  const labL = YtoL(finalY);
  return toe(labL / 100);
}

/**
 * Compute scale chroma using progressive easing curve
 * Creates smooth chroma transitions from desaturated light tints to vibrant mid-tones
 *
 * Chroma Distribution:
 * - Shade 25 (0-0.03): 8-23% - Very subtle hint of color
 * - Shades 50-100 (0.03-0.12): 23-55% - Gentle color introduction
 * - Shades 100-200 (0.12-0.28): 55-85% - Smooth progression to vibrant
 * - Shades 200-400 (0.28-0.45): 85-100% - Approaching peak saturation
 * - Shades 400-900 (0.45-0.85): 100% - Full peak chroma maintained
 * - Shades 900-950 (0.85-1): 94-100% - Minimal reduction for darkest shade
 *
 * @param scaleValue - Position in scale (0 = lightest, 1 = darkest)
 * @param baseChroma - Chroma of the base color (shade 500)
 */
function computeScaleChroma(scaleValue: number, baseChroma: number): number {
  // For lightest shade (0-0.03), very subtle chroma
  if (scaleValue < 0.03) {
    const t = scaleValue / 0.03;
    return baseChroma * (0.08 + 0.15 * Math.pow(t, 1.5));
  }

  // For very light colors (0.03-0.12), gradually build chroma
  if (scaleValue < 0.12) {
    const t = (scaleValue - 0.03) / 0.09;
    return baseChroma * (0.23 + 0.32 * Math.pow(t, 1.3));
  }

  // For light colors (0.12-0.28), continue smooth progression
  if (scaleValue < 0.28) {
    const t = (scaleValue - 0.12) / 0.16;
    return baseChroma * (0.55 + 0.3 * Math.pow(t, 1.1));
  }

  // For medium-light to mid range (0.28-0.45), approach full chroma
  if (scaleValue < 0.45) {
    const t = (scaleValue - 0.28) / 0.17;
    return baseChroma * (0.85 + 0.15 * t);
  }

  // For mid to dark range (0.45-0.85), maintain peak chroma
  if (scaleValue < 0.85) {
    return baseChroma;
  }

  // For very dark colors (0.85-1), minimal chroma reduction
  const t = (scaleValue - 0.85) / 0.15;
  return baseChroma * (1 - 0.06 * t);
}

/**
 * Generate a color scale from a base color using OKLCH
 * Creates 12 shades (25,50,100,200,...,900,950) with perceptually uniform lightness
 * Shade 500 exactly matches the baseColor
 *
 * Algorithm inspired by Radix Colors methodology:
 *
 * Lightness Distribution:
 * - Uses easing curves for smooth perceptual transitions
 * - Light shades (25-400): Gradual steps optimized for UI backgrounds and subtle states
 * - Dark shades (600-950): Larger jumps for text contrast and accessibility
 * - Adaptive scaling based on available headroom above/below base color
 *
 * Chroma Distribution:
 * - Progressive easing from desaturated light tints (8% at shade 25)
 * - Smooth transitions through mid-range (reaching 100% by shade 400)
 * - Peak chroma maintained through interactive range (shades 400-900)
 * - Minimal reduction only at darkest shade (950)
 *
 * Hue:
 * - Constant throughout entire scale (no Bezold-Brücke shift)
 * - Ensures brand color consistency across all shades
 */
export function generateColorScale(baseColor: string): ColorScale {
  const base = parseToOklch(baseColor);
  const baseLightness = base.l;
  const baseChroma = base.c || 0;
  const baseHue = base.h || 0;

  // Special handling for achromatic colors (grays/neutrals)
  const isAchromatic = baseChroma < 0.01;

  // Neutrals use a different lightness distribution than chromatic colors
  // Based on Tailwind's neutral scale: very light at top, huge drops in middle range
  let lightnessSteps: Record<number, number>;

  // Calculate available headroom for lighter/darker shades
  const maxLightness = 0.98;
  const minLightness = 0.15;
  const headroomUp = maxLightness - baseLightness;
  const headroomDown = baseLightness - minLightness;

  if (isAchromatic) {
    // For neutrals: Smooth exponential curve with adaptive scaling
    // More even perceptual steps throughout the range
    lightnessSteps = {
      25: baseLightness + headroomUp * 0.98, // Nearly white
      50: baseLightness + headroomUp * 0.94, // Very light
      100: baseLightness + headroomUp * 0.88, // Very light
      200: baseLightness + headroomUp * 0.78, // Light
      300: baseLightness + headroomUp * 0.64, // Light
      400: baseLightness + headroomUp * 0.32, // Medium-light
      500: baseLightness, // Exact match
      600: baseLightness - headroomDown * 0.3, // Medium-dark
      700: baseLightness - headroomDown * 0.48, // Dark
      800: baseLightness - headroomDown * 0.66, // Dark
      900: baseLightness - headroomDown * 0.82, // Very dark
      950: baseLightness - headroomDown * 0.92, // Extremely dark
    };
  } else {
    // For chromatic colors: Radix-style easing with smooth gradients at light end
    // and larger jumps at dark end for text contrast
    lightnessSteps = {
      25: baseLightness + headroomUp * 0.98, // Nearly white (subtle tint)
      50: baseLightness + headroomUp * 0.93, // Very light background
      100: baseLightness + headroomUp * 0.86, // Light background
      200: baseLightness + headroomUp * 0.71, // Soft background
      300: baseLightness + headroomUp * 0.6, // UI element background
      400: baseLightness + headroomUp * 0.38, // Hover state
      500: baseLightness, // Base color
      600: baseLightness - headroomDown * 0.2, // Active/pressed state (smaller step)
      700: baseLightness - headroomDown * 0.38, // Borders
      800: baseLightness - headroomDown * 0.56, // Solid backgrounds
      900: baseLightness - headroomDown * 0.76, // High contrast text
      950: baseLightness - headroomDown * 0.9, // Highest contrast
    };
  }

  const scale: Record<number, string> = {};

  for (const [shade, targetLightness] of Object.entries(lightnessSteps)) {
    const shadeNum = parseInt(shade);

    // For shade 500, use the exact base color to preserve user intent
    if (shadeNum === 500) {
      scale[500] = getOklchString(baseColor);
      continue;
    }

    // Clamp lightness to valid range
    const lightness = Math.max(0.15, Math.min(0.98, targetLightness));

    // Calculate normalized position for chroma/hue (0 = shade 25, ~0.51 = shade 500, 1 = shade 950)
    const normalizedPosition = (shadeNum - 25) / 925;

    // Compute chroma (creates vibrant mid-tones, desaturated at extremes)
    let chroma = baseChroma;
    if (!isAchromatic) {
      chroma = computeScaleChroma(normalizedPosition, baseChroma);
    }

    // Keep hue constant (no Bezold-Brücke shift for Radix-style consistency)
    const hue = baseHue;

    const shadeColor: Oklch = {
      mode: "oklch",
      l: lightness,
      c: Math.max(0, chroma), // Ensure chroma doesn't go negative
      h: hue,
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
