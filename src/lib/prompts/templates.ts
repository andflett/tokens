/**
 * AI prompt templates for token and component generation
 */

import type { TokenSystem, BrandColors, AIPromptResponse, GenerateComponentInput } from '../types';

/**
 * Generate a prompt for AI-assisted token creation
 */
export function generateTokenPrompt(
  brandColors: BrandColors,
  designContext?: string,
  preferences?: string
): AIPromptResponse {
  const prompt = `You are a design systems expert. Generate design tokens based on the following brand colors and context.

## Brand Colors
- Primary: ${brandColors.primary}
- Secondary: ${brandColors.secondary}
- Accent: ${brandColors.accent}

${designContext ? `## Design Context\n${designContext}\n` : ''}
${preferences ? `## Preferences\n${preferences}\n` : ''}

## Your Task
Based on these brand colors, provide recommendations for:

1. **Color Psychology**: Explain what emotions and associations these colors evoke
2. **Complementary Colors**: Suggest additional colors that would work well
3. **Usage Guidelines**: How should each color be used (primary actions, backgrounds, text, etc.)
4. **Accessibility Notes**: Any contrast concerns or recommendations
5. **Industry Fit**: What types of brands/products these colors suit

Format your response as structured JSON with these sections.`;

  return {
    prompt,
    context: {
      brandColors,
      designContext,
      preferences,
      type: 'token-generation',
    },
  };
}

/**
 * Generate a prompt for Radix/shadcn component generation
 */
export function generateComponentPrompt(input: GenerateComponentInput): AIPromptResponse {
  const { componentType, tokenSystem, requirements } = input;
  
  const prompt = `You are an expert React developer specializing in accessible, well-designed components. 
Create a ${componentType} component using Radix UI primitives and shadcn/ui patterns.

## Design Tokens Available
The component should use CSS custom properties from this token system:

### Color Primitives
${formatPrimitives(tokenSystem.primitives)}

### Semantic Colors (Light Mode)
${formatSemanticColors(tokenSystem.semantic.light)}

### Spacing Scale
${formatSpacing(tokenSystem.spacing)}

### Typography
Font families: ${Object.entries(tokenSystem.typography.fontFamily).map(([k, v]) => `${k}: ${v.join(', ')}`).join('; ')}

### Border Radii
${Object.entries(tokenSystem.radii).map(([k, v]) => `${k}: ${v}`).join(', ')}

${requirements ? `## Additional Requirements\n${requirements}\n` : ''}

## Guidelines
1. Use Radix UI primitives for accessibility
2. Follow shadcn/ui patterns and conventions
3. Use CSS variables for all colors (e.g., \`var(--color-primary-50)\`)
4. Include proper TypeScript types
5. Support both light and dark modes via CSS variables
6. Include Tailwind classes that reference the tokens
7. Add JSDoc comments explaining usage

Provide the complete component code with:
- TypeScript interface for props
- Component implementation
- Usage example
- Tailwind config additions if needed`;

  return {
    prompt,
    context: {
      componentType,
      tokenSystem,
      requirements,
      type: 'component-generation',
    },
  };
}

/**
 * Format primitive colors for prompt
 */
function formatPrimitives(primitives: TokenSystem['primitives']): string {
  const lines: string[] = [];
  
  for (const [name, scale] of Object.entries(primitives)) {
    const shades = Object.entries(scale)
      .map(([shade, color]) => `${shade}: ${color}`)
      .join(', ');
    lines.push(`- ${name}: ${shades}`);
  }
  
  return lines.join('\n');
}

/**
 * Format semantic colors for prompt
 */
function formatSemanticColors(semantic: TokenSystem['semantic']['light']): string {
  const lines: string[] = [];
  
  for (const [name, color] of Object.entries(semantic)) {
    lines.push(`- ${name}: base=${color.base}, muted=${color.muted}, accent=${color.accent}`);
  }
  
  return lines.join('\n');
}

/**
 * Format spacing for prompt
 */
function formatSpacing(spacing: Record<string, string>): string {
  const entries = Object.entries(spacing).slice(0, 15); // First 15 for brevity
  return entries.map(([k, v]) => `${k}: ${v}`).join(', ') + '...';
}

/**
 * Generate a system prompt for the AI chat interface
 */
export function getSystemPrompt(): string {
  return `You are a friendly design systems assistant helping designers create beautiful, accessible design tokens.

Your personality:
- Enthusiastic about colors and design
- Patient with beginners who may not know technical terms
- Explains concepts simply without being condescending
- Uses analogies and real-world examples

Your expertise:
- Color theory and OKLCH color space
- Accessibility (WCAG contrast requirements)
- Design systems and tokens
- Tailwind CSS and CSS custom properties
- shadcn/ui and Radix components

When users describe a "vibe" or aesthetic:
1. Translate their words into specific colors
2. Suggest a cohesive palette
3. Explain your reasoning
4. Offer alternatives if they want to explore

Always be encouraging and make design feel approachable!`;
}

/**
 * Generate a prompt to analyze user's vibe description
 */
export function generateVibeAnalysisPrompt(vibeDescription: string): string {
  return `A user described their desired design aesthetic as: "${vibeDescription}"

Based on this vibe description, suggest:

1. **Primary Color**: The main brand color (with hex code)
2. **Secondary Color**: A complementary color (with hex code)  
3. **Accent Color**: A pop color for CTAs and highlights (with hex code)
4. **Mood Board Words**: 3-5 words that capture this aesthetic
5. **Example Brands**: 2-3 existing brands with similar vibes
6. **Reasoning**: Brief explanation of why these colors match the vibe

Respond in JSON format with these exact keys:
{
  "primary": "#hexcode",
  "secondary": "#hexcode", 
  "accent": "#hexcode",
  "moodWords": ["word1", "word2", "word3"],
  "exampleBrands": ["Brand1", "Brand2"],
  "reasoning": "explanation"
}`;
}
