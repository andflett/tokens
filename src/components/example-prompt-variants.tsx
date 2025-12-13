"use client";

import { useState } from "react";
import { TerminalIcon } from "@/components/animate-ui/icons/terminal";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import {
  SparklesIcon,
  PlusIcon,
  ChatBubbleLeftIcon,
  CommandLineIcon,
  ArrowUpIcon,
  PaperAirplaneIcon,
  ClipboardIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowUp } from "lucide-react";

interface ExamplePromptProps {
  prompt: string;
  className?: string;
}

/**
 * V1: Terminal Window Style
 * Resembles a terminal window with a header bar
 */
export function ExamplePromptV1({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "border border-border/50 rounded-lg overflow-hidden bg-card shadow-sm",
        className
      )}
    >
      {/* Terminal header bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/30 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-warning-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-success-400" />
          </div>
          <TerminalIcon
            size={14}
            className="text-muted-foreground"
            animate
            loop
          />
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors",
            copied
              ? "bg-success-subdued/80 text-success-foreground"
              : "hover:bg-muted text-muted-foreground"
          )}
        >
          {copied ? (
            <>
              <CheckIcon className="h-3 w-3" />
              <span>Copied</span>
            </>
          ) : (
            <ClipboardDocumentIcon className="h-3 w-3" />
          )}
        </button>
      </div>
      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-sm font-mono text-foreground/90 leading-relaxed">
          {prompt}
        </p>
      </div>
    </div>
  );
}

/**
 * V2: Chat Bubble Style
 * Looks like a message in a chat interface
 */
export function ExamplePromptV2({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("flex items-start gap-3", className)}>
      {/* Avatar/Icon */}
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
        <SparklesIcon className="h-4 w-4 text-white" />
      </div>
      {/* Bubble */}
      <div className="flex-1 group relative">
        <div className="bg-primary-subdued border border-primary/20 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          <p className="text-sm text-foreground/90 leading-relaxed">{prompt}</p>
        </div>
        {/* Copy button appears on hover */}
        <button
          onClick={handleCopy}
          className={cn(
            "absolute -right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md",
            copied
              ? "bg-success-500 text-white scale-100"
              : "bg-card border border-border hover:bg-muted scale-90 group-hover:scale-100"
          )}
        >
          {copied ? (
            <CheckIcon className="h-3.5 w-3.5" />
          ) : (
            <ClipboardDocumentIcon className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * V3: Code Block Style
 * Mimics a code editor or syntax highlighted block
 */
export function ExamplePromptV3({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative border border-border/50 rounded-lg overflow-hidden bg-muted/20",
        className
      )}
    >
      {/* Line number column */}
      <div className="flex">
        <div className="flex-shrink-0 w-12 bg-muted/50 py-3 flex flex-col items-center border-r border-border/50">
          <TerminalIcon size={16} className="text-primary-400" animate loop />
        </div>
        <div className="flex-1 px-4 py-3">
          <p className="text-xs italic font-mono text-foreground/90 leading-relaxed">
            {prompt}
          </p>
        </div>
      </div>
      {/* Copy button (absolute positioned) */}
      <button
        onClick={handleCopy}
        className={cn(
          "absolute top-2 right-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5",
          copied
            ? "bg-success-subdued text-success-foreground"
            : "bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-muted text-muted-foreground"
        )}
      >
        {copied ? (
          <>
            <CheckIcon className="h-3 w-3" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <ClipboardDocumentIcon className="h-3 w-3" />
            <span className="hidden sm:inline">Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

/**
 * V4: Minimal Pill Style
 * Clean, minimal design with inline copy action
 */
export function ExamplePromptV4({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 px-4 py-2.5 bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-full transition-colors group",
        className
      )}
    >
      <TerminalIcon
        size={14}
        className="text-primary-500 flex-shrink-0"
        animate
        loop
      />
      <p className="text-sm text-foreground/90 font-mono flex-1">{prompt}</p>
      <button
        onClick={handleCopy}
        className={cn(
          "flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-all",
          copied
            ? "bg-success-500 text-white"
            : "hover:bg-background text-muted-foreground"
        )}
      >
        {copied ? (
          <CheckIcon className="h-3.5 w-3.5" />
        ) : (
          <ClipboardDocumentIcon className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

/**
 * V5: Card with Icon Badge
 * Professional card design with floating icon badge
 */
export function ExamplePromptV5({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative border border-primary/20 rounded-xl bg-gradient-to-br from-primary-subdued/50 to-accent-subdued/30 p-4 shadow-sm",
        className
      )}
    >
      {/* Floating badge */}
      <div className="absolute -top-3 -left-3 h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
        <TerminalIcon size={18} className="text-white" animate loop />
      </div>
      <div className="flex items-start gap-3 pl-8">
        <p className="text-sm text-foreground/90 leading-relaxed flex-1">
          {prompt}
        </p>
        <button
          onClick={handleCopy}
          className={cn(
            "flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5",
            copied
              ? "bg-success-500 text-white"
              : "bg-background/60 backdrop-blur-sm border border-border hover:bg-muted text-muted-foreground"
          )}
        >
          {copied ? (
            <>
              <CheckIcon className="h-3 w-3" />
              <span>Copied</span>
            </>
          ) : (
            <ClipboardDocumentIcon className="h-3 w-3" />
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * V6: Search Bar Style (ChatGPT-inspired)
 * Minimalist search/input field with icon buttons
 */
export function ExamplePromptV6({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-full shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <button className="flex-shrink-0 h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
        <TerminalIcon animate loop className="h-4 w-4" />
      </button>
      <p className="flex-1 text-sm text-muted-foreground font-medium min-w-0">
        {prompt}
      </p>
      <button className="flex-shrink-0 h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
        <MagnifyingGlassIcon className="h-4 w-4" />
      </button>
      <button
        onClick={handleCopy}
        className={cn(
          "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all",
          copied
            ? "bg-primary-500 text-white"
            : "bg-primary-500 hover:bg-primary-600 text-white"
        )}
      >
        {copied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <TerminalIcon size={14} className="text-white" animate loop />
        )}
      </button>
    </div>
  );
}

/**
 * V7: Lovable-inspired Toolbar
 * Large rounded pill with action buttons on sides
 */
export function ExamplePromptV7({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-6 py-4 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full shadow-lg",
        className
      )}
    >
      <div className="flex items-center gap-3 flex-shrink-0">
        <button className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
          <TerminalIcon animate loop className="h-4 w-4 text-primary" />
        </button>
      </div>
      <p className="flex-1 text-xs text-foreground/80 min-w-0 font-mono">
        {prompt}
      </p>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="h-5 w-px bg-border" />
        <button
          onClick={handleCopy}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
            copied
              ? "bg-success-500 text-white"
              : "bg-primary-500 hover:bg-primary-600 text-white"
          )}
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <ArrowUp size={14} className="text-white" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * V8: Bolt-inspired Dark Mode
 * Dark, compact toolbar with model selector style
 */
export function ExamplePromptV8({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl",
        className
      )}
    >
      <button className="h-8 w-8 rounded-lg hover:bg-zinc-800 flex items-center justify-center transition-colors">
        <PlusIcon className="h-4 w-4 text-zinc-400" />
      </button>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <TerminalIcon size={16} className="text-zinc-400 flex-shrink-0" />
        <p className="text-sm text-zinc-400 font-mono truncate">{prompt}</p>
      </div>
      <button
        onClick={handleCopy}
        className={cn(
          "h-9 w-9 rounded-lg flex items-center justify-center transition-all",
          copied
            ? "bg-emerald-500 text-white"
            : "bg-blue-600 hover:bg-blue-500 text-white"
        )}
      >
        {copied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <ClipboardDocumentIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

/**
 * V9: Inline Composer Style
 * Clean inline editor with subtle borders and actions
 */
export function ExamplePromptV9({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group relative border-l-2 border-primary-500 pl-4 pr-12 py-3 hover:bg-muted/30 transition-colors rounded-r-lg",
        className
      )}
    >
      <p className="text-sm text-foreground/90 leading-relaxed">{prompt}</p>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <button
          onClick={handleCopy}
          className={cn(
            "h-7 px-2.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5",
            copied
              ? "bg-success-subdued text-success-foreground"
              : "opacity-0 group-hover:opacity-100 bg-background border border-border hover:bg-muted text-muted-foreground"
          )}
        >
          {copied ? (
            <>
              <CheckIcon className="h-3 w-3" />
              <span>Copied</span>
            </>
          ) : (
            <ClipboardDocumentIcon className="h-3 w-3" />
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * V10: Compact Tag Style
 * Small, tag-like design with icon and quick copy
 */
export function ExamplePromptV10({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 bg-primary-subdued/50 border border-primary/30 rounded-lg hover:border-primary/50 transition-colors group",
        className
      )}
    >
      <div className="flex-shrink-0 h-5 w-5 rounded bg-primary-500 flex items-center justify-center">
        <TerminalIcon size={12} className="text-white" animate loop />
      </div>
      <p className="text-xs text-foreground/90 flex-1 font-mono">{prompt}</p>
      <button
        onClick={handleCopy}
        className={cn(
          "flex-shrink-0 h-5 w-5 rounded flex items-center justify-center transition-all",
          copied
            ? "bg-success-500 text-white scale-110"
            : "opacity-50 group-hover:opacity-100 hover:bg-primary-500 hover:text-white"
        )}
      >
        {copied ? (
          <CheckIcon className="h-3 w-3" />
        ) : (
          <ClipboardDocumentIcon className="h-3 w-3" />
        )}
      </button>
    </div>
  );
}

/**
 * V11: Prompt Card with Quote Marks
 * Visual quote styling makes it obviously a "prompt"
 */
export function ExamplePromptV11({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative bg-gradient-to-br from-primary-subdued/30 to-accent-subdued/20 border border-primary/20 rounded-xl p-5",
        className
      )}
    >
      {/* Large quote mark */}
      <div className="absolute top-3 left-4 text-primary-300 text-5xl font-serif leading-none select-none">
        "
      </div>
      <div className="pl-8 pr-10">
        <p className="text-sm text-foreground/90 leading-relaxed italic">
          {prompt}
        </p>
      </div>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={cn(
          "absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5",
          copied
            ? "bg-success-500 text-white"
            : "bg-background/80 border border-border hover:bg-muted text-muted-foreground"
        )}
      >
        {copied ? (
          <>
            <CheckIcon className="h-3 w-3" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <DocumentDuplicateIcon className="h-3 w-3" />
            <span>Copy prompt</span>
          </>
        )}
      </button>
    </div>
  );
}

/**
 * V12: Speech Bubble with Arrow
 * Classic speech bubble, immediately recognizable as input
 */
export function ExamplePromptV12({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("flex items-end gap-3", className)}>
      {/* Speech bubble */}
      <div className="relative flex-1 bg-primary-500 text-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-md">
        <p className="text-sm leading-relaxed">{prompt}</p>
        {/* Triangle */}
        <div className="absolute -bottom-0 left-0 w-3 h-3 bg-primary-500 transform rotate-45 translate-y-1/2 -translate-x-1/4" />
      </div>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={cn(
          "flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center transition-all shadow-sm",
          copied
            ? "bg-success-500 text-white scale-110"
            : "bg-background border border-border hover:bg-muted text-muted-foreground"
        )}
        title="Copy prompt"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <DocumentDuplicateIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

/**
 * V13: AI Chat Input Style
 * Looks like an active AI chat input with "Copy this prompt" action
 */
export function ExamplePromptV13({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "border border-border rounded-2xl bg-card shadow-lg overflow-hidden",
        className
      )}
    >
      {/* Input area */}
      <div className="px-4 py-4">
        <p className="text-sm text-foreground leading-relaxed">{prompt}</p>
      </div>
      {/* Bottom toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-t border-border/50">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ChatBubbleLeftIcon className="h-4 w-4" />
          <span className="text-xs font-medium">Example prompt</span>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5",
            copied
              ? "bg-success-500 text-white"
              : "bg-primary-500 hover:bg-primary-600 text-white"
          )}
        >
          {copied ? (
            <>
              <CheckIcon className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <DocumentDuplicateIcon className="h-3.5 w-3.5" />
              <span>Copy this prompt</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * V14: Floating Action Card
 * Card with prominent "Try this prompt" CTA
 */
export function ExamplePromptV14({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden",
        className
      )}
    >
      {/* Header label */}
      <div className="flex items-center gap-2 px-4 py-2 bg-primary-subdued/50 border-b border-primary/20">
        <SparklesIcon className="h-4 w-4 text-primary-600" />
        <span className="text-xs font-semibold text-primary-700 uppercase tracking-wide">
          Try this prompt
        </span>
      </div>
      {/* Content */}
      <div className="px-4 py-4">
        <p className="text-sm text-foreground/90 leading-relaxed">{prompt}</p>
      </div>
      {/* Action */}
      <div className="px-4 pb-4">
        <button
          onClick={handleCopy}
          className={cn(
            "w-full py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
            copied
              ? "bg-success-subdued text-success-foreground border border-success/30"
              : "bg-primary-500 hover:bg-primary-600 text-white"
          )}
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4" />
              <span>Copied to clipboard!</span>
            </>
          ) : (
            <>
              <ClipboardIcon className="h-4 w-4" />
              <span>Copy prompt</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * V15: Command Palette Style
 * Looks like a command/shortcut suggestion
 */
export function ExamplePromptV15({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-lg shadow-sm hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer group",
        className
      )}
      onClick={handleCopy}
    >
      <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
        <CommandLineIcon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground/90 leading-relaxed truncate">
          {prompt}
        </p>
      </div>
      <div
        className={cn(
          "flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all",
          copied
            ? "bg-success-subdued text-success-foreground"
            : "bg-muted text-muted-foreground group-hover:bg-primary-subdued group-hover:text-primary-foreground"
        )}
      >
        {copied ? (
          <>
            <CheckIcon className="h-3 w-3" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <DocumentDuplicateIcon className="h-3 w-3" />
            <span>Copy</span>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * V16: Sticky Note Style
 * Playful sticky note design
 */
export function ExamplePromptV16({ prompt, className }: ExamplePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative bg-warning-100 dark:bg-warning-900/30 rounded-sm shadow-md p-4 transform rotate-1 hover:rotate-0 transition-transform",
        className
      )}
    >
      {/* Tape effect */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-warning-200/80 dark:bg-warning-800/50 rounded-sm" />
      <div className="pt-2">
        <p className="text-sm text-warning-900 dark:text-warning-100 leading-relaxed font-medium">
          {prompt}
        </p>
      </div>
      <button
        onClick={handleCopy}
        className={cn(
          "absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium transition-all flex items-center gap-1",
          copied
            ? "bg-success-500 text-white"
            : "bg-warning-200 dark:bg-warning-800 hover:bg-warning-300 dark:hover:bg-warning-700 text-warning-800 dark:text-warning-200"
        )}
      >
        {copied ? (
          <>
            <CheckIcon className="h-3 w-3" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <DocumentDuplicateIcon className="h-3 w-3" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
