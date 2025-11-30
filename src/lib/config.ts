/**
 * App configuration - centralized URLs and settings
 */

const getAppUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

export const config = {
  // App
  appName: "Tokens",
  appDescription: "Design token generator + MCP server for AI-powered theming",
  appUrl: getAppUrl(),

  // MCP
  mcpUrl: `${getAppUrl()}/mcp`,
  mcpSseUrl: `${getAppUrl()}/mcp/sse`,

  // Defaults
  defaultBrandColors: {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
  },

  // Links
  links: {
    github: "https://github.com/andflett/toke",
    docs: "/docs",
    generator: "/generator",
  },
} as const;

export type Config = typeof config;
