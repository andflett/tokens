"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  exportTokens,
  getSuggestedFilename,
  type ExportFormat,
} from "@/lib/export";
import type { TokenSystem, ColorFormat } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  SHARED_INSTRUCTIONS,
  COPILOT_INSTRUCTIONS,
} from "@/components/home/ai-instructions-demo";
import { ArrowDownTrayIcon, ClipboardIcon } from "@heroicons/react/24/outline";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tokens: TokenSystem;
  mode: "light" | "dark" | "both";
  colorFormat?: ColorFormat;
}

type ExportType = "tokens" | "instructions";

const FORMAT_INFO: Record<
  ExportFormat | "lovable-theme",
  { label: string; description: string; filename: string }
> = {
  css: {
    label: "CSS Variables",
    description: "Standard CSS custom properties",
    filename: "tokens.css",
  },
  "tailwind-v3": {
    label: "Tailwind v3",
    description: "JavaScript config for v3.x",
    filename: "tailwind.config.js",
  },
  "tailwind-v4": {
    label: "Tailwind v4",
    description: "CSS-based config for v4.x",
    filename: "globals.css",
  },
  "lovable-theme": {
    label: "Lovable Theme",
    description: "Tailwind v4 for Lovable",
    filename: "globals.css",
  },
  json: {
    label: "JSON",
    description: "Raw token data",
    filename: "tokens.json",
  },
};

const INSTRUCTIONS_INFO = {
  claude: {
    label: "Claude",
    description: "Instructions for Claude AI",
    filename: "claude.md",
    content: SHARED_INSTRUCTIONS,
  },
  copilot: {
    label: "GitHub Copilot",
    description: "Instructions for Copilot",
    filename: "copilot-instructions.md",
    content: COPILOT_INSTRUCTIONS,
  },
} as const;

/**
 * Export dialog with format selection and preview
 */
export function ExportDialog({
  open,
  onOpenChange,
  tokens,
  mode,
  colorFormat: initialColorFormat = "oklch",
}: ExportDialogProps) {
  const [exportType, setExportType] = React.useState<ExportType>("tokens");
  const [format, setFormat] = React.useState<ExportFormat | "lovable-theme">(
    "tailwind-v4"
  );
  const [colorFormat, setColorFormat] =
    React.useState<ColorFormat>(initialColorFormat);
  const [instructionType, setInstructionType] = React.useState<
    "claude" | "copilot"
  >("claude");
  const [output, setOutput] = React.useState("");

  // Generate output when relevant state changes
  React.useEffect(() => {
    try {
      if (exportType === "tokens") {
        // lovable-theme is just tailwind-v4 format
        const actualFormat =
          format === "lovable-theme" ? "tailwind-v4" : format;
        const result = exportTokens(tokens, actualFormat, mode, colorFormat);
        setOutput(result);
      } else {
        setOutput(INSTRUCTIONS_INFO[instructionType].content);
      }
    } catch (error) {
      console.error("Export error:", error);
      setOutput("// Error generating export");
    }
  }, [tokens, format, mode, colorFormat, exportType, instructionType]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDownload = () => {
    let filename: string;
    if (exportType === "tokens") {
      filename = FORMAT_INFO[format].filename;
    } else {
      filename = INSTRUCTIONS_INFO[instructionType].filename;
    }

    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Use your tokens</DialogTitle>
          <DialogDescription>
            Export your design tokens and teach your AI assistant to use them.
          </DialogDescription>
        </DialogHeader>

        {/* Main Tabs: Tokens vs AI Instructions */}
        <Tabs
          value={exportType}
          onValueChange={(v) => setExportType(v as ExportType)}
          className="flex-1 overflow-hidden flex flex-col"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="instructions">AI Instructions</TabsTrigger>
          </TabsList>

          <div className="mt-2 space-y-4 flex-1 overflow-hidden flex flex-col">
            {exportType === "tokens" ? (
              <>
                {/* Token Format Selection */}
                <div className="space-y-3">
                  <div>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        Object.keys(FORMAT_INFO) as Array<
                          ExportFormat | "lovable-theme"
                        >
                      ).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFormat(f)}
                          className={cn(
                            "h-auto py-2 px-3 flex flex-col items-start gap-0.5 rounded-md transition-colors text-left",
                            format === f
                              ? "bg-neutral-800 text-neutral-50"
                              : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800/40 dark:text-neutral-300 dark:hover:bg-neutral-800/60"
                          )}
                        >
                          <span className="text-xs font-medium">
                            {FORMAT_INFO[f].label}
                          </span>
                          <span className="text-[10px] opacity-70 font-normal">
                            {FORMAT_INFO[f].description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />
              </>
            ) : (
              <>
                {/* AI Instructions Selection */}
                <div className="space-y-3">
                  <div>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        Object.keys(INSTRUCTIONS_INFO) as Array<
                          keyof typeof INSTRUCTIONS_INFO
                        >
                      ).map((type) => (
                        <button
                          key={type}
                          onClick={() => setInstructionType(type)}
                          className={cn(
                            "h-auto py-2 px-3 flex flex-col items-start gap-0.5 rounded-md transition-colors text-left",
                            instructionType === type
                              ? "bg-neutral-800 text-neutral-50"
                              : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800/40 dark:text-neutral-300 dark:hover:bg-neutral-800/60"
                          )}
                        >
                          <span className="text-xs font-medium">
                            {INSTRUCTIONS_INFO[type].label}
                          </span>
                          <span className="text-[10px] opacity-70 font-normal">
                            {INSTRUCTIONS_INFO[type].description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />
              </>
            )}

            {/* Output Preview */}
            <div className="flex-1 overflow-hidden min-h-0">
              <div className="relative h-full">
                {exportType === "tokens" && (
                  <div className="absolute top-2 right-2 z-10">
                    <Select
                      value={colorFormat}
                      onValueChange={(v) => setColorFormat(v as ColorFormat)}
                    >
                      <SelectTrigger className="h-7 w-20 text-xs bg-background/80 backdrop-blur-sm border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oklch" className="text-xs">
                          OKLCH
                        </SelectItem>
                        <SelectItem value="rgb" className="text-xs">
                          RGB
                        </SelectItem>
                        <SelectItem value="hsl" className="text-xs">
                          HSL
                        </SelectItem>
                        <SelectItem value="hex" className="text-xs">
                          Hex
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <pre
                  className={cn(
                    "h-full max-h-[400px] overflow-auto rounded-lg bg-muted p-4",
                    "text-xs font-mono whitespace-pre",
                    exportType === "tokens" && "pt-12"
                  )}
                >
                  {output}
                </pre>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                intent="default"
                variant="outline"
                onClick={handleCopy}
                className="gap-2"
              >
                <ClipboardIcon className="h-4 w-4" />
                Copy
              </Button>
              <Button
                intent="default"
                onClick={handleDownload}
                className="gap-2"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
