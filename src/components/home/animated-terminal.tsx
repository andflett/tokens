"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface TerminalLine {
  type: "command" | "output" | "comment";
  text: string;
  delay: number;
}

const terminalContent: TerminalLine[] = [
  { type: "comment", text: "# Install the Toke MCP Server", delay: 0 },
  { type: "command", text: "npx -y @tokedesign/mcp-server", delay: 800 },
  { type: "output", text: "✓ Toke MCP Server started", delay: 1200 },
  { type: "output", text: "✓ Connected to token generator", delay: 1600 },
  { type: "comment", text: "# Or use the hosted version", delay: 2400 },
  { type: "command", text: "https://mcp.toke.design", delay: 3000 },
];

export function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (visibleLines >= terminalContent.length) return;

    const currentLine = terminalContent[visibleLines];
    const lineDelay = currentLine.delay;

    const timer = setTimeout(() => {
      setIsTyping(true);
      setCurrentCharIndex(0);
    }, lineDelay);

    return () => clearTimeout(timer);
  }, [visibleLines]);

  useEffect(() => {
    if (!isTyping || visibleLines >= terminalContent.length) return;

    const currentLine = terminalContent[visibleLines];

    if (currentCharIndex < currentLine.text.length) {
      const charDelay = currentLine.type === "command" ? 50 : 20;
      const timer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, charDelay);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
      setVisibleLines((prev) => prev + 1);
    }
  }, [currentCharIndex, isTyping, visibleLines]);

  return (
    <Card className="bg-slate-950 border-slate-800 overflow-hidden font-mono text-sm">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="text-xs text-slate-400 ml-2">terminal</div>
      </div>

      {/* Terminal content */}
      <div className="p-3 space-y-1.5 min-h-[180px]">
        {terminalContent.slice(0, visibleLines).map((line, index) => (
          <div key={index} className="flex items-start gap-2 text-xs">
            {line.type === "command" && (
              <span className="text-green-400 flex-shrink-0">$</span>
            )}
            <span
              className={
                line.type === "comment"
                  ? "text-slate-500"
                  : line.type === "output"
                  ? "text-slate-300"
                  : "text-slate-100"
              }
            >
              {line.text}
            </span>
          </div>
        ))}

        {isTyping && visibleLines < terminalContent.length && (
          <div className="flex items-start gap-2 text-xs">
            {terminalContent[visibleLines].type === "command" && (
              <span className="text-green-400 flex-shrink-0">$</span>
            )}
            <span
              className={
                terminalContent[visibleLines].type === "comment"
                  ? "text-slate-500"
                  : terminalContent[visibleLines].type === "output"
                  ? "text-slate-300"
                  : "text-slate-100"
              }
            >
              {terminalContent[visibleLines].text.substring(
                0,
                currentCharIndex
              )}
              <span className="inline-block w-1.5 h-3 bg-green-400 ml-0.5 animate-pulse" />
            </span>
          </div>
        )}
      </div>

      {/* Footer with link */}
      <div className="border-t border-slate-800 bg-slate-900/50 px-4 py-2">
        <Link
          href="https://www.npmjs.com/package/@tokedesign/mcp-server"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
          </svg>
          View on NPM
        </Link>
      </div>
    </Card>
  );
}
