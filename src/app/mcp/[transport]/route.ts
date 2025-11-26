/**
 * MCP API Route Handler
 * Provides Model Context Protocol server for design token generation
 * Uses Vercel's mcp-handler with Upstash Redis for SSE support
 */

import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { generateTokens } from '@/lib/tokens';
import { exportTokens, type ExportFormat } from '@/lib/export';
import { 
  generateTokenPrompt, 
  generateComponentPrompt, 
  generateVibeAnalysisPrompt 
} from '@/lib/prompts/templates';
import type { BrandColors, TokenSystem, GenerateComponentInput } from '@/lib/types';

const handler = createMcpHandler(
  (server) => {
    // Tool: Generate design tokens from brand colors
    server.tool(
      'generate_tokens',
      'Generate design tokens deterministically using OKLCH color generation from brand colors',
      {
        brandColors: z.object({
          primary: z.string().describe('Primary brand color (hex)'),
          secondary: z.string().describe('Secondary brand color (hex)'),
          accent: z.string().describe('Accent brand color (hex)'),
        }),
        mode: z.enum(['light', 'dark', 'both']).default('both').describe('Color mode to generate'),
      },
      async ({ brandColors, mode }) => {
        try {
          const tokens = generateTokens(brandColors as BrandColors, mode);
          
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(tokens, null, 2),
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error generating tokens: ${error instanceof Error ? error.message : 'Unknown error'}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    // Tool: Generate AI prompt for creative token generation
    server.tool(
      'generate_tokens_ai',
      'Generate a prompt for AI to create design tokens with creative context',
      {
        brandColors: z.object({
          primary: z.string().describe('Primary brand color (hex)'),
          secondary: z.string().describe('Secondary brand color (hex)'),
          accent: z.string().describe('Accent brand color (hex)'),
        }),
        mode: z.enum(['light', 'dark', 'both']).default('both').describe('Color mode'),
        designContext: z.string().optional().describe('Design context or brand description'),
        preferences: z.string().optional().describe('Specific preferences or requirements'),
      },
      async ({ brandColors, designContext, preferences }) => {
        try {
          const result = generateTokenPrompt(
            brandColors as BrandColors,
            designContext,
            preferences
          );
          
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error generating AI prompt: ${error instanceof Error ? error.message : 'Unknown error'}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    // Tool: Generate component prompt
    server.tool(
      'generate_component',
      'Generate a prompt for AI to create a Radix/ShadCN component using design tokens',
      {
        componentType: z.string().describe('Type of component (e.g., "button", "card")'),
        tokenSystem: z.any().describe('Token system from generate_tokens'),
        requirements: z.string().optional().describe('Additional component requirements'),
      },
      async ({ componentType, tokenSystem, requirements }) => {
        try {
          const input: GenerateComponentInput = {
            componentType,
            tokenSystem: tokenSystem as TokenSystem,
            requirements,
          };
          
          const result = generateComponentPrompt(input);
          
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error generating component prompt: ${error instanceof Error ? error.message : 'Unknown error'}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    // Tool: Export tokens to various formats
    server.tool(
      'export_tokens',
      'Export design tokens to CSS, Tailwind, JSON, or SCSS format',
      {
        tokenSystem: z.any().describe('Token system to export'),
        format: z.enum(['css', 'tailwind-v3', 'tailwind-v4', 'json', 'scss']).describe('Export format'),
        mode: z.enum(['light', 'dark', 'both']).default('both').describe('Mode for CSS export'),
      },
      async ({ tokenSystem, format, mode }) => {
        try {
          const output = exportTokens(
            tokenSystem as TokenSystem,
            format as ExportFormat,
            mode
          );
          
          return {
            content: [
              {
                type: 'text',
                text: output,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error exporting tokens: ${error instanceof Error ? error.message : 'Unknown error'}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    // Tool: Analyze a vibe description and suggest colors
    server.tool(
      'analyze_vibe',
      'Analyze a vibe description and generate a prompt for AI to suggest brand colors',
      {
        vibeDescription: z.string().describe('User\'s description of their desired aesthetic or vibe'),
      },
      async ({ vibeDescription }) => {
        try {
          const prompt = generateVibeAnalysisPrompt(vibeDescription);
          
          return {
            content: [
              {
                type: 'text',
                text: prompt,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error analyzing vibe: ${error instanceof Error ? error.message : 'Unknown error'}`,
              },
            ],
            isError: true,
          };
        }
      }
    );
  },
  {
    // Server options (empty - tools are self-describing)
  },
  {
    // Redis config for SSE support on Vercel
    redisUrl: process.env.REDIS_URL,
    basePath: '/mcp',
    maxDuration: 60,
    verboseLogs: process.env.NODE_ENV === 'development',
  }
);

export { handler as GET, handler as POST, handler as DELETE };
