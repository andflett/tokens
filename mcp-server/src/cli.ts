/**
 * MCP Server for Toke - Design Token Generator
 * Runs via stdio for use with Claude Desktop, Cursor, etc.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { generateTokens } from "../../src/lib/tokens/index.js";
import { exportTokens } from "../../src/lib/export/index.js";
import {
  generateComponentPrompt,
  generateVibeAnalysisPrompt,
} from "../../src/lib/prompts/templates.js";
import {
  toolDefinitions,
  generateTokensSchema,
  exportTokensSchema,
  generateComponentSchema,
  analyzeVibeSchema,
} from "../../src/lib/mcp/tools.js";
import type { BrandColors, TokenSystem } from "../../src/lib/types.js";
import type { ExportFormat } from "../../src/lib/export/index.js";

const server = new Server(
  {
    name: "toke-mcp-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools (imported from shared definitions)
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    toolDefinitions.generate_tokens,
    toolDefinitions.export_tokens,
    toolDefinitions.generate_component,
    toolDefinitions.analyze_vibe,
  ],
}));

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "generate_tokens": {
        const { brandColors, mode } = generateTokensSchema.parse(args);
        const tokens = generateTokens(brandColors as BrandColors, mode);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(tokens, null, 2),
            },
          ],
        };
      }

      case "export_tokens": {
        const { tokenSystem, format, mode } = exportTokensSchema.parse(args);
        const output = exportTokens(
          tokenSystem as TokenSystem,
          format as ExportFormat,
          mode
        );

        return {
          content: [
            {
              type: "text",
              text: output,
            },
          ],
        };
      }

      case "generate_component": {
        const { componentType, tokenSystem, requirements } =
          generateComponentSchema.parse(args);
        const result = generateComponentPrompt({
          componentType,
          tokenSystem: tokenSystem as TokenSystem,
          requirements,
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "analyze_vibe": {
        const { vibeDescription } = analyzeVibeSchema.parse(args);
        const prompt = generateVibeAnalysisPrompt(vibeDescription);

        return {
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Toke MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
