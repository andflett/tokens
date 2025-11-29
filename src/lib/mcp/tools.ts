/**
 * Shared MCP tool definitions
 * Used by both the Next.js API route and the standalone MCP server
 */

import { z } from "zod";

export const generateTokensSchema = z.object({
  brandColors: z.object({
    primary: z.string().describe("Primary brand color (hex)"),
    secondary: z.string().describe("Secondary brand color (hex)"),
  }),
  mode: z
    .enum(["light", "dark", "both"])
    .default("both")
    .describe("Color mode to generate"),
});

export const exportTokensSchema = z.object({
  tokenSystem: z.any().describe("Token system to export"),
  format: z
    .enum(["css", "tailwind-v3", "tailwind-v4", "json"])
    .describe("Export format"),
  mode: z
    .enum(["light", "dark", "both"])
    .default("both")
    .describe("Mode for CSS export"),
});

export const generateComponentSchema = z.object({
  componentType: z
    .string()
    .describe('Type of component (e.g., "button", "card")'),
  tokenSystem: z.any().describe("Token system from generate_tokens"),
  requirements: z
    .string()
    .optional()
    .describe("Additional component requirements"),
});

export const analyzeVibeSchema = z.object({
  vibeDescription: z
    .string()
    .describe("User's description of their desired aesthetic or vibe"),
});

export const toolDefinitions = {
  generate_tokens: {
    name: "generate_tokens",
    description:
      "Generate design tokens deterministically using OKLCH color generation from brand colors. Only requires primary and secondary colors - neutral, success, destructive, and warning colors are automatically derived.",
    inputSchema: {
      type: "object" as const,
      properties: {
        brandColors: {
          type: "object" as const,
          properties: {
            primary: {
              type: "string" as const,
              description: "Primary brand color (hex)",
            },
            secondary: {
              type: "string" as const,
              description: "Secondary brand color (hex)",
            },
          },
          required: ["primary", "secondary"],
        },
        mode: {
          type: "string" as const,
          enum: ["light", "dark", "both"],
          default: "both",
          description: "Color mode to generate",
        },
      },
      required: ["brandColors"],
    },
  },
  export_tokens: {
    name: "export_tokens",
    description: "Export design tokens to CSS, Tailwind, JSON, or SCSS format",
    inputSchema: {
      type: "object" as const,
      properties: {
        tokenSystem: {
          description: "Token system to export",
        },
        format: {
          type: "string" as const,
          enum: ["css", "tailwind-v3", "tailwind-v4", "json"],
          description: "Export format",
        },
        mode: {
          type: "string" as const,
          enum: ["light", "dark", "both"],
          default: "both",
          description: "Mode for CSS export",
        },
      },
      required: ["tokenSystem", "format"],
    },
  },
  generate_component: {
    name: "generate_component",
    description:
      "Generate a prompt for AI to create a Radix/ShadCN component using design tokens",
    inputSchema: {
      type: "object" as const,
      properties: {
        componentType: {
          type: "string" as const,
          description: 'Type of component (e.g., "button", "card")',
        },
        tokenSystem: {
          description: "Token system from generate_tokens",
        },
        requirements: {
          type: "string" as const,
          description: "Additional component requirements",
        },
      },
      required: ["componentType", "tokenSystem"],
    },
  },
  analyze_vibe: {
    name: "analyze_vibe",
    description:
      "Analyze a vibe description and generate a prompt for AI to suggest brand colors",
    inputSchema: {
      type: "object" as const,
      properties: {
        vibeDescription: {
          type: "string" as const,
          description: "User's description of their desired aesthetic or vibe",
        },
      },
      required: ["vibeDescription"],
    },
  },
};
