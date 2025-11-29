# @flett/design-tokens-mcp-server

MCP server for generating design tokens from brand colors using OKLCH color space.

## Features

- **OKLCH Color Generation**: Perceptually uniform color scales
- **Automatic Color Derivation**: Only requires primary and secondary colors
- **Multiple Export Formats**: CSS, Tailwind v3/v4, JSON
- **MCP Protocol**: Compatible with Claude Desktop, Cursor, and other MCP clients
- **TypeScript**: Full type safety with exported types

## Installation

### Global Installation (Recommended)

```bash
npm install -g @flett/design-tokens-mcp-server
```

### Using npx (No installation required)

```bash
npx -y @flett/design-tokens-mcp-server
```

## Usage

### Claude Desktop

Add to your Claude Desktop config:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "toke": {
      "command": "npx",
      "args": ["-y", "@flett/design-tokens-mcp-server"]
    }
  }
}
```

Or if globally installed:

```json
{
  "mcpServers": {
    "toke": {
      "command": "toke-mcp"
    }
  }
}
```

Restart Claude Desktop and look for the 🔌 MCP icon to verify the server is connected.

### VS Code with GitHub Copilot

Add to your VS Code `settings.json`:

**macOS/Linux**: `~/.config/Code/User/settings.json`  
**Windows**: `%APPDATA%\Code\User\settings.json`

```json
{
  "github.copilot.chat.mcp.servers": {
    "toke": {
      "command": "npx",
      "args": ["-y", "@flett/design-tokens-mcp-server"]
    }
  }
}
```

Restart VS Code and the MCP tools will be available in Copilot Chat.

### Cursor

Add to Cursor settings:

**macOS**: `~/Library/Application Support/Cursor/User/settings.json`  
**Windows**: `%APPDATA%\Cursor\User\settings.json`

```json
{
  "cursor.mcp.servers": {
    "toke": {
      "command": "npx",
      "args": ["-y", "@flett/design-tokens-mcp-server"]
    }
  }
}
```

Restart Cursor and the tools will be available in the AI chat.

### Windsurf

Add to Windsurf config:

**macOS**: `~/Library/Application Support/Windsurf/mcp_config.json`  
**Windows**: `%APPDATA%\Windsurf\mcp_config.json`

```json
{
  "mcpServers": {
    "toke": {
      "command": "npx",
      "args": ["-y", "@flett/design-tokens-mcp-server"]
    }
  }
}
```

### Zed Editor

Add to Zed settings:

**macOS**: `~/.config/zed/settings.json`  
**Linux**: `~/.config/zed/settings.json`

```json
{
  "context_servers": {
    "toke": {
      "command": "npx",
      "args": ["-y", "@flett/design-tokens-mcp-server"]
    }
  }
}
```

### Cline (VS Code Extension)

Cline automatically detects MCP servers configured in VS Code. Use the same configuration as the GitHub Copilot setup above.

### Continue (VS Code Extension)

Add to Continue config (`~/.continue/config.json`):

```json
{
  "experimental": {
    "modelContextProtocolServers": [
      {
        "name": "toke",
        "command": "npx",
        "args": ["-y", "@flett/design-tokens-mcp-server"]
      }
    ]
  }
}
```

### As a Library

You can also use this package programmatically in your Node.js projects:

```bash
npm install @flett/design-tokens-mcp-server
```

```typescript
import { generateTokens, exportTokens } from "@flett/design-tokens-mcp-server";

// Generate tokens from brand colors
const tokens = generateTokens(
  {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    accent: "#f59e0b",
  },
  "both" // light, dark, or both
);

// Export to various formats
const css = exportTokens(tokens, "css", "both");
const tailwindConfig = exportTokens(tokens, "tailwind-v4");
const json = exportTokens(tokens, "json");

console.log(css);
```

## MCP Tools

### `generate_tokens`

Generate design tokens from brand colors.

**Inputs:**

- `brandColors` (required): Object with `primary` and `secondary` hex colors
- `mode` (optional): `"light"`, `"dark"`, or `"both"` (default: `"both"`)

**Returns:** Complete token system with primitives, semantic colors, spacing, typography, and more.

### `export_tokens`

Export tokens to various formats.

**Inputs:**

- `tokenSystem` (required): Token system from `generate_tokens`
- `format` (required): `"css"`, `"tailwind-v3"`, `"tailwind-v4"`, or `"json"`
- `mode` (optional): `"light"`, `"dark"`, or `"both"` (default: `"both"`)

**Returns:** Formatted token output as string.

### `generate_component`

Generate a prompt for creating Radix UI / shadcn components.

**Inputs:**

- `componentType` (required): Type of component (e.g., "button", "card")
- `tokenSystem` (required): Token system to use
- `requirements` (optional): Additional requirements

**Returns:** AI prompt for component generation.

### `analyze_vibe`

Analyze a vibe description and generate color suggestions.

**Inputs:**

- `vibeDescription` (required): User's aesthetic description

**Returns:** Prompt for AI to suggest brand colors.

## Verification

To verify the MCP server is working:

1. **Check the connection**: Look for the MCP icon (🔌) in your editor/tool
2. **List available tools**: Ask your AI assistant "What MCP tools are available?"
3. **Test a tool**: Try "Generate design tokens with primary color #3b82f6 and secondary #8b5cf6"

## Troubleshooting

### Server not connecting

- Ensure the package is installed: `npm list -g @flett/design-tokens-mcp-server`
- Check the config file syntax (valid JSON)
- Restart your editor/tool completely
- Check the logs (location varies by tool)

### Tools not appearing

- Verify the server is connected (look for MCP icon)
- Try asking explicitly: "Use the toke MCP server to generate tokens"
- Check that you're using a compatible version of the tool

### Permission errors

- On macOS/Linux, ensure the binary is executable: `chmod +x $(which toke-mcp)`
- Try installing globally with sudo: `sudo npm install -g @flett/design-tokens-mcp-server`

## Why OKLCH?

OKLCH provides perceptually uniform color manipulation:

- Same lightness value = same perceived brightness
- Chroma adjusts naturally at extremes
- Modern browsers support `oklch()` natively

## Color Scale Algorithm

Tokens uses a sophisticated approach to generate professional color scales:

### For Chromatic Colors (Hues)

- **Smooth lightness distribution**: Even steps from light to dark, optimized for UI use
- **Parabolic chroma curve**: Vibrant mid-tones (around shade 500) with reduced saturation at extremes
- **Bezold-Brücke hue shift compensation**: Subtle hue rotation to compensate for perceptual shifts in lighter colors

### For Achromatic Colors (Neutrals/Grays)

- **Tailwind-inspired distribution**: Very light tones stay close to white (50-300) for subtle backgrounds
- **Aggressive mid-range contrast**: Large lightness drops between 300-500 for better text contrast
- **Balanced dark tones**: Medium steps in darker shades for depth without muddiness

This dual approach ensures:

- Chromatic colors remain vibrant and perceptually balanced
- Neutrals provide excellent readability and subtle UI backgrounds
- All scales work harmoniously together

### References

- **OKLCH Color Space**: [oklch.com](https://oklch.com)
- **Matt Ström's WCAG-driven approach**: [Generating Color Palettes](https://mattstromawn.com/writing/generating-color-palettes/)
- **Tailwind CSS methodology**: [Building a Tailwind-Ready Color System](https://designerup.co/blog/how-to-build-a-tailwind-ready-color-system-in-figma-that-developers-love/)

## Contributing

See the [main repository](https://github.com/andflett/toke) for contribution guidelines.

## License

MIT
