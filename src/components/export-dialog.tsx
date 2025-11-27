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
import { exportTokens, getSuggestedFilename, type ExportFormat } from "@/lib/export";
import type { TokenSystem, ColorFormat } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tokens: TokenSystem;
  mode: "light" | "dark" | "both";
  colorFormat?: ColorFormat;
}

const FORMAT_INFO: Record<ExportFormat, { label: string; description: string }> = {
  css: {
    label: "CSS Variables",
    description: "Standard CSS custom properties that work everywhere",
  },
  "tailwind-v3": {
    label: "Tailwind v3",
    description: "JavaScript config for Tailwind CSS v3.x",
  },
  "tailwind-v4": {
    label: "Tailwind v4",
    description: "CSS-based config for Tailwind CSS v4.x",
  },
  json: {
    label: "JSON",
    description: "Raw token data in JSON format",
  },
  scss: {
    label: "SCSS",
    description: "SCSS variables for Sass projects",
  },
};

/**
 * Export dialog with format selection and preview
 */
export function ExportDialog({
  open,
  onOpenChange,
  tokens,
  mode,
  colorFormat: initialColorFormat = "hex",
}: ExportDialogProps) {
  const [format, setFormat] = React.useState<ExportFormat>("css");
  const [colorFormat, setColorFormat] = React.useState<ColorFormat>(initialColorFormat);
  const [output, setOutput] = React.useState("");

  // Generate output when format or colorFormat changes
  React.useEffect(() => {
    try {
      const result = exportTokens(tokens, format, mode, colorFormat);
      setOutput(result);
    } catch (error) {
      console.error("Export error:", error);
      setOutput("// Error generating export");
    }
  }, [tokens, format, mode, colorFormat]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDownload = () => {
    const filename = getSuggestedFilename(format);
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
          <DialogTitle>Export Tokens</DialogTitle>
          <DialogDescription>
            Choose a format and copy or download your design tokens.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={format}
          onValueChange={(v) => setFormat(v as ExportFormat)}
          className="flex-1 overflow-hidden flex flex-col"
        >
          <TabsList className="grid grid-cols-5">
            {(Object.keys(FORMAT_INFO) as ExportFormat[]).map((f) => (
              <TabsTrigger key={f} value={f} className="text-xs">
                {FORMAT_INFO[f].label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-muted-foreground">
              {FORMAT_INFO[format].description}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Color format:</span>
              <Select value={colorFormat} onValueChange={(v) => setColorFormat(v as ColorFormat)}>
                <SelectTrigger className="w-24 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oklch">OKLCH</SelectItem>
                  <SelectItem value="rgb">RGB</SelectItem>
                  <SelectItem value="hsl">HSL</SelectItem>
                  <SelectItem value="hex">Hex</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 overflow-hidden mt-4">
            <div className="relative h-full">
              <pre
                className={cn(
                  "h-full max-h-[400px] overflow-auto rounded-lg bg-muted p-4",
                  "text-xs font-mono whitespace-pre"
                )}
              >
                {output}
              </pre>
            </div>
          </div>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleCopy}>
            📋 Copy
          </Button>
          <Button onClick={handleDownload}>
            ⬇️ Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
