"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { glossary, type GlossaryTerm } from "@/lib/glossary";
import { cn } from "@/lib/utils";

interface TermProps {
  /** The term to look up in the glossary */
  term: keyof typeof glossary;
  /** Optional children to display as the trigger (defaults to the term name) */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Term component displays glossary terms with an informative popover.
 * Designed for non-technical users who may not know programming jargon.
 *
 * @example
 * <Term term="mcp">MCP</Term>
 * <Term term="tailwind" />
 */
export function Term({ term, children, className }: TermProps) {
  const definition = glossary[term] as GlossaryTerm | undefined;

  if (!definition) {
    // If term not found, just render children or term as-is
    return <span className={className}>{children || term}</span>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className={cn(
            "cursor-pointer inline-flex items-center border-b-2 border-primary-200",
            "hover:border-primary hover:text-primary transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            className
          )}
        >
          {children || definition.term}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-card border-border" align="start">
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">{definition.term}</h4>
          <p className="text-sm text-muted-foreground">{definition.short}</p>
          {definition.full && (
            <p className="text-sm text-foreground">{definition.full}</p>
          )}
          {definition.learnMoreUrl && (
            <a
              href={definition.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:text-primary-highlight hover:underline inline-flex items-center gap-1 pt-2 transition-colors"
            >
              Learn more →
            </a>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
