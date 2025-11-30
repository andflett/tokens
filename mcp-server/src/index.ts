/**
 * Main exports for @flett/design-tokens-mcp-server package
 * Re-exports from the Next.js app's lib directory
 */

export { generateTokens } from "../../src/lib/tokens/index.js";
export { exportTokens, type ExportFormat } from "../../src/lib/export/index.js";
export {
  generateComponentPrompt,
  generateVibeAnalysisPrompt,
} from "../../src/lib/prompts/templates.js";

export type {
  BrandColors,
  ColorScale,
  TokenSystem,
  SemanticTokens,
  ExtendedSemanticColor,
  SemanticColorPair,
  SurfaceTokens,
  UtilityTokens,
  ColorFormat,
  GenerateComponentInput,
  AIPromptResponse,
} from "../../src/lib/types.js";

export type { PrimitivePalette } from "../../src/lib/tokens/primitives.js";
