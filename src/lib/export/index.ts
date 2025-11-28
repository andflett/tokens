/**
 * Export utilities for design tokens
 * Converts token system to CSS variables, Tailwind config, etc.
 */

import type {
  TokenSystem,
  ColorScale,
  ColorFormat,
  ExtendedSemanticColor,
  SemanticColorPair,
} from "../types";
import { formatColorAs } from "../tokens";

/**
 * Convert a color to the target format
 */
function formatColor(color: string, format: ColorFormat): string {
  return formatColorAs(color, format);
}

/**
 * Convert a color scale to CSS custom properties
 */
function colorScaleToCssVars(
  name: string,
  scale: ColorScale,
  colorFormat: ColorFormat = "hex"
): string[] {
  return Object.entries(scale).map(
    ([shade, color]) =>
      `  --color-${name}-${shade}: ${formatColor(color, colorFormat)};`
  );
}

/**
 * Helper to check if a semantic color is an extended color (with scale) or a simple pair
 */
function isExtendedSemanticColor(
  color: ExtendedSemanticColor | SemanticColorPair
): color is ExtendedSemanticColor {
  return "subdued" in color;
}

/**
 * Export tokens as CSS custom properties
 */
export function exportToCss(
  tokens: TokenSystem,
  mode: "light" | "dark" | "both" = "both",
  colorFormat: ColorFormat = "hex"
): string {
  const lines: string[] = [];

  // Root variables (primitives - always available)
  lines.push(":root {");
  lines.push("  /* Primitive Colors */");

  for (const [name, scale] of Object.entries(tokens.primitives)) {
    lines.push(...colorScaleToCssVars(name, scale, colorFormat));
  }

  lines.push("");
  lines.push("  /* Spacing */");
  for (const [name, value] of Object.entries(tokens.spacing)) {
    lines.push(`  --spacing-${name}: ${value};`);
  }

  lines.push("");
  lines.push("  /* Border Radius */");
  for (const [name, value] of Object.entries(tokens.radii)) {
    const varName = name === "DEFAULT" ? "radius" : `radius-${name}`;
    lines.push(`  --${varName}: ${value};`);
  }

  lines.push("");
  lines.push("  /* Typography */");
  for (const [name, fonts] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`  --font-${name}: ${fonts.join(", ")};`);
  }

  lines.push("}");

  // Light mode semantic tokens
  if (mode === "light" || mode === "both") {
    lines.push("");
    lines.push("/* Light Mode */");
    const lightSelector =
      mode === "both" ? ':root, [data-theme="light"]' : ":root";
    lines.push(`${lightSelector} {`);

    // Surface tokens
    lines.push("  /* Surface */");
    lines.push(
      `  --background: ${formatColor(
        tokens.surface.light.background,
        colorFormat
      )};`
    );
    lines.push(
      `  --foreground: ${formatColor(
        tokens.surface.light.foreground,
        colorFormat
      )};`
    );
    lines.push(
      `  --card: ${formatColor(tokens.surface.light.card, colorFormat)};`
    );
    lines.push(
      `  --card-foreground: ${formatColor(
        tokens.surface.light["card-foreground"],
        colorFormat
      )};`
    );
    lines.push(
      `  --popover: ${formatColor(tokens.surface.light.popover, colorFormat)};`
    );
    lines.push(
      `  --popover-foreground: ${formatColor(
        tokens.surface.light["popover-foreground"],
        colorFormat
      )};`
    );

    // Utility tokens
    lines.push("");
    lines.push("  /* Utility */");
    lines.push(
      `  --border: ${formatColor(tokens.utility.light.border, colorFormat)};`
    );
    lines.push(
      `  --input: ${formatColor(tokens.utility.light.input, colorFormat)};`
    );
    lines.push(
      `  --ring: ${formatColor(tokens.utility.light.ring, colorFormat)};`
    );

    // Semantic colors
    lines.push("");
    lines.push("  /* Semantic Colors */");
    for (const [name, color] of Object.entries(tokens.semantic.light)) {
      if (isExtendedSemanticColor(color)) {
        lines.push(`  --${name}: ${formatColor(color.DEFAULT, colorFormat)};`);
        lines.push(
          `  --${name}-foreground: ${formatColor(
            color.foreground,
            colorFormat
          )};`
        );
        lines.push(
          `  --${name}-subdued: ${formatColor(color.subdued, colorFormat)};`
        );
        lines.push(
          `  --${name}-subdued-foreground: ${formatColor(
            color["subdued-foreground"],
            colorFormat
          )};`
        );
        lines.push(
          `  --${name}-highlight: ${formatColor(color.highlight, colorFormat)};`
        );
        lines.push(
          `  --${name}-highlight-foreground: ${formatColor(
            color["highlight-foreground"],
            colorFormat
          )};`
        );
      } else {
        lines.push(`  --${name}: ${formatColor(color.DEFAULT, colorFormat)};`);
        lines.push(
          `  --${name}-foreground: ${formatColor(
            color.foreground,
            colorFormat
          )};`
        );
      }
    }

    lines.push("");
    lines.push("  /* Shadows */");
    for (const [name, value] of Object.entries(tokens.shadows.light)) {
      const varName = name === "DEFAULT" ? "shadow" : `shadow-${name}`;
      lines.push(`  --${varName}: ${value};`);
    }

    lines.push("}");
  }

  // Dark mode semantic tokens
  if (mode === "dark" || mode === "both") {
    lines.push("");
    lines.push("/* Dark Mode */");
    const darkSelector = mode === "both" ? '[data-theme="dark"]' : ":root";
    lines.push(`${darkSelector} {`);

    // Surface tokens
    lines.push("  /* Surface */");
    lines.push(
      `  --background: ${formatColor(
        tokens.surface.dark.background,
        colorFormat
      )};`
    );
    lines.push(
      `  --foreground: ${formatColor(
        tokens.surface.dark.foreground,
        colorFormat
      )};`
    );
    lines.push(
      `  --card: ${formatColor(tokens.surface.dark.card, colorFormat)};`
    );
    lines.push(
      `  --card-foreground: ${formatColor(
        tokens.surface.dark["card-foreground"],
        colorFormat
      )};`
    );
    lines.push(
      `  --popover: ${formatColor(tokens.surface.dark.popover, colorFormat)};`
    );
    lines.push(
      `  --popover-foreground: ${formatColor(
        tokens.surface.dark["popover-foreground"],
        colorFormat
      )};`
    );

    // Utility tokens
    lines.push("");
    lines.push("  /* Utility */");
    lines.push(
      `  --border: ${formatColor(tokens.utility.dark.border, colorFormat)};`
    );
    lines.push(
      `  --input: ${formatColor(tokens.utility.dark.input, colorFormat)};`
    );
    lines.push(
      `  --ring: ${formatColor(tokens.utility.dark.ring, colorFormat)};`
    );

    // Semantic colors
    lines.push("");
    lines.push("  /* Semantic Colors */");
    for (const [name, color] of Object.entries(tokens.semantic.dark)) {
      if (isExtendedSemanticColor(color)) {
        lines.push(`  --${name}: ${formatColor(color.DEFAULT, colorFormat)};`);
        lines.push(
          `  --${name}-foreground: ${formatColor(
            color.foreground,
            colorFormat
          )};`
        );
        lines.push(
          `  --${name}-subdued: ${formatColor(color.subdued, colorFormat)};`
        );
        lines.push(
          `  --${name}-subdued-foreground: ${formatColor(
            color["subdued-foreground"],
            colorFormat
          )};`
        );
        lines.push(
          `  --${name}-highlight: ${formatColor(color.highlight, colorFormat)};`
        );
        lines.push(
          `  --${name}-highlight-foreground: ${formatColor(
            color["highlight-foreground"],
            colorFormat
          )};`
        );
      } else {
        lines.push(`  --${name}: ${formatColor(color.DEFAULT, colorFormat)};`);
        lines.push(
          `  --${name}-foreground: ${formatColor(
            color.foreground,
            colorFormat
          )};`
        );
      }
    }

    lines.push("");
    lines.push("  /* Shadows */");
    for (const [name, value] of Object.entries(tokens.shadows.dark)) {
      const varName = name === "DEFAULT" ? "shadow" : `shadow-${name}`;
      lines.push(`  --${varName}: ${value};`);
    }

    lines.push("}");
  }

  // Media query for system preference
  if (mode === "both") {
    lines.push("");
    lines.push("/* System Preference: Dark Mode */");
    lines.push("@media (prefers-color-scheme: dark) {");
    lines.push('  :root:not([data-theme="light"]) {');

    // Surface tokens
    lines.push(
      `    --background: ${formatColor(
        tokens.surface.dark.background,
        colorFormat
      )};`
    );
    lines.push(
      `    --foreground: ${formatColor(
        tokens.surface.dark.foreground,
        colorFormat
      )};`
    );
    lines.push(
      `    --card: ${formatColor(tokens.surface.dark.card, colorFormat)};`
    );
    lines.push(
      `    --card-foreground: ${formatColor(
        tokens.surface.dark["card-foreground"],
        colorFormat
      )};`
    );
    lines.push(
      `    --popover: ${formatColor(tokens.surface.dark.popover, colorFormat)};`
    );
    lines.push(
      `    --popover-foreground: ${formatColor(
        tokens.surface.dark["popover-foreground"],
        colorFormat
      )};`
    );

    // Utility tokens
    lines.push(
      `    --border: ${formatColor(tokens.utility.dark.border, colorFormat)};`
    );
    lines.push(
      `    --input: ${formatColor(tokens.utility.dark.input, colorFormat)};`
    );
    lines.push(
      `    --ring: ${formatColor(tokens.utility.dark.ring, colorFormat)};`
    );

    // Semantic colors
    for (const [name, color] of Object.entries(tokens.semantic.dark)) {
      if (isExtendedSemanticColor(color)) {
        lines.push(
          `    --${name}: ${formatColor(color.DEFAULT, colorFormat)};`
        );
        lines.push(
          `    --${name}-foreground: ${formatColor(
            color.foreground,
            colorFormat
          )};`
        );
        lines.push(
          `    --${name}-subdued: ${formatColor(color.subdued, colorFormat)};`
        );
        lines.push(
          `    --${name}-subdued-foreground: ${formatColor(
            color["subdued-foreground"],
            colorFormat
          )};`
        );
        lines.push(
          `    --${name}-highlight: ${formatColor(
            color.highlight,
            colorFormat
          )};`
        );
        lines.push(
          `    --${name}-highlight-foreground: ${formatColor(
            color["highlight-foreground"],
            colorFormat
          )};`
        );
      } else {
        lines.push(
          `    --${name}: ${formatColor(color.DEFAULT, colorFormat)};`
        );
        lines.push(
          `    --${name}-foreground: ${formatColor(
            color.foreground,
            colorFormat
          )};`
        );
      }
    }

    for (const [name, value] of Object.entries(tokens.shadows.dark)) {
      const varName = name === "DEFAULT" ? "shadow" : `shadow-${name}`;
      lines.push(`    --${varName}: ${value};`);
    }

    lines.push("  }");
    lines.push("}");
  }

  return lines.join("\n");
}

/**
 * Export tokens as Tailwind v3 config
 */
export function exportToTailwindV3(
  tokens: TokenSystem,
  colorFormat: ColorFormat = "hex"
): string {
  const config = {
    theme: {
      extend: {
        colors: {} as Record<string, string | Record<string, string>>,
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
      (config.theme.extend.colors[name] as Record<string, string>)[shade] =
        formatColor(color, colorFormat);
    }
  }

  // Add semantic colors as CSS variable references (new structure)
  // Include full palette plus semantic variants
  const extendedSemanticColors = [
    "primary",
    "secondary",
    "gray",
    "success",
    "destructive",
    "warning",
  ];
  for (const name of extendedSemanticColors) {
    const primitiveScale = tokens.primitives[name];
    const colorObj: Record<string, string> = {
      DEFAULT: `var(--${name})`,
      foreground: `var(--${name}-foreground)`,
      subdued: `var(--${name}-subdued)`,
      "subdued-foreground": `var(--${name}-subdued-foreground)`,
      highlight: `var(--${name}-highlight)`,
      "highlight-foreground": `var(--${name}-highlight-foreground)`,
    };
    // Add full palette shades if available
    if (primitiveScale) {
      for (const [shade, color] of Object.entries(primitiveScale)) {
        colorObj[shade] = formatColor(color, colorFormat);
      }
    }
    config.theme.extend.colors[name] = colorObj;
  }

  // Add simple color pairs
  config.theme.extend.colors["muted"] = {
    DEFAULT: `var(--muted)`,
    foreground: `var(--muted-foreground)`,
  };
  config.theme.extend.colors["accent"] = {
    DEFAULT: `var(--accent)`,
    foreground: `var(--accent-foreground)`,
  };

  // Add surface colors
  config.theme.extend.colors["background"] = `var(--background)`;
  config.theme.extend.colors["foreground"] = `var(--foreground)`;
  config.theme.extend.colors["card"] = {
    DEFAULT: `var(--card)`,
    foreground: `var(--card-foreground)`,
  };
  config.theme.extend.colors["popover"] = {
    DEFAULT: `var(--popover)`,
    foreground: `var(--popover-foreground)`,
  };

  // Add utility colors
  config.theme.extend.colors["border"] = `var(--border)`;
  config.theme.extend.colors["input"] = `var(--input)`;
  config.theme.extend.colors["ring"] = `var(--ring)`;

  // Add shadows
  for (const [name, value] of Object.entries(tokens.shadows.light)) {
    config.theme.extend.boxShadow[name === "DEFAULT" ? "DEFAULT" : name] =
      value;
  }

  return `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(config, null, 2)};`;
}

/**
 * Export tokens as Tailwind v4 CSS
 */
export function exportToTailwindV4(
  tokens: TokenSystem,
  colorFormat: ColorFormat = "hex"
): string {
  const lines: string[] = [];

  lines.push("@theme {");
  lines.push("  /* Colors */");

  // Primitive colors
  for (const [name, scale] of Object.entries(tokens.primitives)) {
    for (const [shade, color] of Object.entries(scale)) {
      lines.push(
        `  --color-${name}-${shade}: ${formatColor(color, colorFormat)};`
      );
    }
  }

  lines.push("");
  lines.push("  /* Semantic Colors (using CSS variables for theming) */");
  const extendedSemanticNames = [
    "primary",
    "secondary",
    "gray",
    "success",
    "destructive",
    "warning",
  ];
  for (const name of extendedSemanticNames) {
    lines.push(`  --${name}: var(--${name});`);
    lines.push(`  --${name}-foreground: var(--${name}-foreground);`);
    lines.push(`  --${name}-subdued: var(--${name}-subdued);`);
    lines.push(
      `  --${name}-subdued-foreground: var(--${name}-subdued-foreground);`
    );
    lines.push(`  --${name}-highlight: var(--${name}-highlight);`);
    lines.push(
      `  --${name}-highlight-foreground: var(--${name}-highlight-foreground);`
    );
  }

  // Simple color pairs
  lines.push("");
  lines.push("  /* Muted and Accent */");
  lines.push(`  --muted: var(--muted);`);
  lines.push(`  --muted-foreground: var(--muted-foreground);`);
  lines.push(`  --accent: var(--accent);`);
  lines.push(`  --accent-foreground: var(--accent-foreground);`);

  // Surface colors
  lines.push("");
  lines.push("  /* Surface Colors */");
  lines.push(`  --background: var(--background);`);
  lines.push(`  --foreground: var(--foreground);`);
  lines.push(`  --card: var(--card);`);
  lines.push(`  --card-foreground: var(--card-foreground);`);
  lines.push(`  --popover: var(--popover);`);
  lines.push(`  --popover-foreground: var(--popover-foreground);`);

  // Utility colors
  lines.push("");
  lines.push("  /* Utility Colors */");
  lines.push(`  --border: var(--border);`);
  lines.push(`  --input: var(--input);`);
  lines.push(`  --ring: var(--ring);`);

  lines.push("");
  lines.push("  /* Spacing */");
  for (const [name, value] of Object.entries(tokens.spacing)) {
    lines.push(`  --spacing-${name}: ${value};`);
  }

  lines.push("");
  lines.push("  /* Border Radius */");
  for (const [name, value] of Object.entries(tokens.radii)) {
    const varName = name === "DEFAULT" ? "radius" : `radius-${name}`;
    lines.push(`  --${varName}: ${value};`);
  }

  lines.push("");
  lines.push("  /* Font Families */");
  for (const [name, fonts] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`  --font-${name}: ${fonts.join(", ")};`);
  }

  lines.push("");
  lines.push("  /* Shadows */");
  for (const [name, value] of Object.entries(tokens.shadows.light)) {
    const varName = name === "DEFAULT" ? "shadow" : `shadow-${name}`;
    lines.push(`  --${varName}: ${value};`);
  }

  lines.push("}");

  return lines.join("\n");
}

/**
 * Export tokens as JSON
 */
export function exportToJson(
  tokens: TokenSystem,
  pretty: boolean = true
): string {
  return pretty ? JSON.stringify(tokens, null, 2) : JSON.stringify(tokens);
}

export type ExportFormat = "css" | "tailwind-v3" | "tailwind-v4" | "json";

/**
 * Export tokens in the specified format
 */
export function exportTokens(
  tokens: TokenSystem,
  format: ExportFormat,
  mode: "light" | "dark" | "both" = "both",
  colorFormat: ColorFormat = "hex"
): string {
  switch (format) {
    case "css":
      return exportToCss(tokens, mode, colorFormat);
    case "tailwind-v3":
      return exportToTailwindV3(tokens, colorFormat);
    case "tailwind-v4":
      return exportToTailwindV4(tokens, colorFormat);
    case "json":
      return exportToJson(tokens);
    default:
      throw new Error(`Unknown export format: ${format}`);
  }
}

/**
 * Get file extension for export format
 */
export function getFileExtension(format: ExportFormat): string {
  switch (format) {
    case "css":
    case "tailwind-v4":
      return "css";
    case "tailwind-v3":
      return "js";
    case "json":
      return "json";
    default:
      return "txt";
  }
}

/**
 * Get suggested filename for export
 */
export function getSuggestedFilename(
  format: ExportFormat,
  themeName?: string
): string {
  const base = themeName
    ? themeName.toLowerCase().replace(/\s+/g, "-")
    : "tokens";

  switch (format) {
    case "css":
      return `${base}.css`;
    case "tailwind-v3":
      return "tailwind.config.js";
    case "tailwind-v4":
      return `${base}.theme.css`;
    case "json":
      return `${base}.json`;
    default:
      return `${base}.txt`;
  }
}
