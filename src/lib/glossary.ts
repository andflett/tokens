/**
 * Glossary of terms for jargon popovers
 * Used throughout the docs and UI to explain technical concepts to non-technical users
 */

export interface GlossaryTerm {
  term: string;
  short: string;
  full: string;
  learnMoreUrl?: string;
}

export const glossary: Record<string, GlossaryTerm> = {
  mcp: {
    term: "MCP",
    short: "Model Context Protocol - a way for AI assistants to use tools",
    full: "Model Context Protocol (MCP) is an open standard that allows AI assistants like Claude or GitHub Copilot to connect to external tools and data sources. Think of it like plugins for AI - it lets the AI do more things, like generating design tokens.",
    learnMoreUrl: "https://modelcontextprotocol.io",
  },
  sse: {
    term: "SSE",
    short: "Server-Sent Events - a way for servers to push updates to browsers",
    full: "Server-Sent Events (SSE) is a technology that allows a server to continuously send data to a web page. In MCP, it's used to maintain a persistent connection between your AI assistant and the token generator.",
  },
  tailwind: {
    term: "Tailwind CSS",
    short: "A popular CSS framework that uses utility classes",
    full: 'Tailwind CSS is a utility-first CSS framework. Instead of writing custom CSS, you use pre-built classes like "bg-blue-500" or "text-lg" directly in your HTML. It\'s very popular for building modern web interfaces quickly.',
    learnMoreUrl: "https://tailwindcss.com",
  },
  "css-variables": {
    term: "CSS Variables",
    short: "Custom properties that store values in CSS",
    full: "CSS Variables (also called CSS Custom Properties) are special values you define once and reuse throughout your stylesheet. For example, --primary-color: #3b82f6 can be used anywhere as var(--primary-color). They make it easy to maintain consistent colors and other values.",
  },
  "design-tokens": {
    term: "Design Tokens",
    short: "Named values that define your design system",
    full: 'Design tokens are the smallest pieces of a design system - things like colors, spacing, typography, and shadows. Instead of using raw values like "#3b82f6", you use named tokens like "primary-500". This makes your design consistent and easy to update.',
  },
  llm: {
    term: "LLM",
    short: "Large Language Model - the AI that powers assistants like Claude",
    full: "A Large Language Model (LLM) is the type of AI that powers assistants like Claude, ChatGPT, and GitHub Copilot. They're trained on vast amounts of text and can understand and generate human-like responses.",
  },
  claude: {
    term: "Claude",
    short: "An AI assistant made by Anthropic",
    full: "Claude is an AI assistant created by Anthropic. It can have conversations, help with coding, analyze documents, and - with MCP - use external tools like this design token generator.",
    learnMoreUrl: "https://claude.ai",
  },
  copilot: {
    term: "GitHub Copilot",
    short: "An AI coding assistant that works in VS Code",
    full: "GitHub Copilot is an AI-powered coding assistant that integrates directly into code editors like VS Code. It can suggest code, answer questions about your project, and with MCP support, use external tools.",
    learnMoreUrl: "https://github.com/features/copilot",
  },
  "vs-code": {
    term: "VS Code",
    short: "Visual Studio Code - a popular code editor",
    full: "Visual Studio Code (VS Code) is a free, open-source code editor made by Microsoft. It's one of the most popular editors for web development and has great support for extensions like GitHub Copilot.",
    learnMoreUrl: "https://code.visualstudio.com",
  },
  cli: {
    term: "CLI",
    short: "Command Line Interface - a text-based way to use software",
    full: "A Command Line Interface (CLI) is a way to interact with software by typing commands in a terminal, rather than clicking buttons in a graphical interface. Many developer tools, including Claude Code, use a CLI.",
  },
  stdio: {
    term: "stdio",
    short: "Standard input/output - how programs communicate via text",
    full: "Standard I/O (stdio) is the traditional way programs read input and write output as text streams. In MCP, stdio mode means the AI assistant runs the tool as a local program and communicates with it through these text streams.",
  },
  oklch: {
    term: "OKLCH",
    short: "A perceptually uniform color space",
    full: "OKLCH is a color space that represents colors in a way that matches human perception. Unlike RGB or HSL, equal steps in OKLCH values produce visually equal changes. This makes it ideal for generating color scales that look balanced.",
  },
  "color-scale": {
    term: "Color Scale",
    short: "A range of shades from light to dark",
    full: "A color scale is a series of color variations ranging from very light (like 10) to very dark (like 100). For example, primary-10 might be a pale blue, while primary-90 is a deep navy. Scales help you use colors consistently across your design.",
  },
  "semantic-colors": {
    term: "Semantic Colors",
    short: "Colors named by their purpose, not appearance",
    full: 'Semantic colors are named by what they mean, not how they look. Instead of "blue-500", you use "primary" or "success". This way, if you change your primary color from blue to purple, everything using "primary" updates automatically.',
  },
  radix: {
    term: "Radix UI",
    short: "A library of unstyled, accessible React components",
    full: "Radix UI is a collection of low-level React components that handle complex interactions like dialogs, dropdowns, and tooltips. They're unstyled by default, so you can apply your own design tokens. shadcn/ui is built on top of Radix.",
    learnMoreUrl: "https://www.radix-ui.com",
  },
  shadcn: {
    term: "shadcn/ui",
    short: "A collection of beautifully designed, reusable components",
    full: "shadcn/ui is not a component library you install - it's a collection of reusable components you copy into your project. Built on Radix UI, they come with sensible defaults but are fully customizable. Very popular in the React ecosystem.",
    learnMoreUrl: "https://ui.shadcn.com",
  },
  // Supabase glossary entry removed as Supabase integration has been removed.
  "vibe-coding": {
    term: "Vibe Coding",
    short: "Building software by describing what you want to AI",
    full: "Vibe coding is a term for building software by describing what you want in natural language to an AI assistant, rather than writing code directly. The AI generates the code based on your description. Having a design system ready makes vibe coding much more effective.",
  },
};

export function getTerm(key: string): GlossaryTerm | undefined {
  return glossary[key.toLowerCase()];
}

export function getAllTerms(): GlossaryTerm[] {
  return Object.values(glossary);
}
