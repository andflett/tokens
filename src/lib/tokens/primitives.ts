/**
 * Primitive color palette generation using OKLCH
 */

import { generateColorScale } from './oklch';
import type { BrandColors, ColorScale } from '../types';

export type PrimitivePalette = {
  [colorName: string]: ColorScale;
};

/**
 * Generate a complete primitive palette from brand colors
 */
export function generatePrimitivePalette(
  brandColors: BrandColors,
  additionalColors: string[] = []
): PrimitivePalette {
  const palette: PrimitivePalette = {};

  // Generate scales for brand colors
  palette.primary = generateColorScale(brandColors.primary);
  palette.secondary = generateColorScale(brandColors.secondary);
  palette.accent = generateColorScale(brandColors.accent);

  // Generate neutral gray scale (from a neutral gray)
  palette.neutral = generateColorScale('#6b7280');

  // Generate additional color scales if provided
  additionalColors.forEach((color, index) => {
    palette[`custom${index + 1}`] = generateColorScale(color);
  });

  // Generate semantic color scales
  palette.success = generateColorScale('#10b981');
  palette.warning = generateColorScale('#f59e0b');
  palette.danger = generateColorScale('#ef4444');
  palette.info = generateColorScale('#3b82f6');

  return palette;
}

/**
 * Get a specific shade from a color scale
 */
export function getShade(
  palette: PrimitivePalette,
  colorName: string,
  shade: keyof ColorScale
): string {
  const scale = palette[colorName];
  if (!scale) {
    throw new Error(`Color "${colorName}" not found in palette`);
  }
  return scale[shade];
}
