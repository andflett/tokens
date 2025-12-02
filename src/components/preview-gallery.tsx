"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  XMarkIcon,
  MoonIcon,
  SunIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type {
  TokenSystem,
  ExtendedSemanticColor,
  SemanticColorPair,
} from "@/lib/types";

interface PreviewGalleryProps {
  className?: string;
  tokens: TokenSystem;
}

function isExtendedSemanticColor(
  color: ExtendedSemanticColor | SemanticColorPair
): color is ExtendedSemanticColor {
  return "subdued" in color;
}

export function PreviewGallery({ className, tokens }: PreviewGalleryProps) {
  const [previewTheme, setPreviewTheme] = React.useState<"light" | "dark">(
    "light"
  );

  // Build CSS custom properties from tokens
  const cssVars = React.useMemo(() => {
    const vars: Record<string, string> = {};

    // Primitive colors - both --color-* for Tailwind v4 and -- for semantics
    for (const [name, scale] of Object.entries(tokens.primitives)) {
      if (typeof scale === "string") {
        vars[`--${name}`] = scale;
        vars[`--color-${name}`] = scale;
      } else {
        for (const [shade, color] of Object.entries(scale)) {
          vars[`--${name}-${shade}`] = color;
          vars[`--color-${name}-${shade}`] = color;
        }
      }
    }

    // Theme-specific tokens based on preview mode
    const mode = previewTheme;
    const surface = tokens.surface[mode];
    const semantic = tokens.semantic[mode];
    const utility = tokens.utility[mode];
    const shadows = tokens.shadows[mode];

    // Surface tokens
    vars["--background"] = surface.background;
    vars["--color-background"] = surface.background;
    vars["--foreground"] = surface.foreground;
    vars["--color-foreground"] = surface.foreground;
    vars["--card"] = surface.card;
    vars["--color-card"] = surface.card;
    vars["--card-foreground"] = surface["card-foreground"];
    vars["--color-card-foreground"] = surface["card-foreground"];
    vars["--popover"] = surface.popover;
    vars["--color-popover"] = surface.popover;
    vars["--popover-foreground"] = surface["popover-foreground"];
    vars["--color-popover-foreground"] = surface["popover-foreground"];

    // Utility tokens
    vars["--border"] = utility.border;
    vars["--color-border"] = utility.border;
    vars["--input"] = utility.input;
    vars["--color-input"] = utility.input;
    vars["--ring"] = utility.ring;
    vars["--color-ring"] = utility.ring;

    // Semantic colors
    for (const [name, color] of Object.entries(semantic)) {
      if (typeof color === "string") {
        vars[`--${name}`] = color;
        vars[`--color-${name}`] = color;
      } else if (isExtendedSemanticColor(color)) {
        vars[`--${name}`] = color.DEFAULT;
        vars[`--color-${name}`] = color.DEFAULT;
        vars[`--${name}-foreground`] = color.foreground;
        vars[`--color-${name}-foreground`] = color.foreground;
        vars[`--${name}-subdued`] = color.subdued;
        vars[`--color-${name}-subdued`] = color.subdued;
        vars[`--${name}-subdued-foreground`] = color["subdued-foreground"];
        vars[`--color-${name}-subdued-foreground`] =
          color["subdued-foreground"];
        vars[`--${name}-highlight`] = color.highlight;
        vars[`--color-${name}-highlight`] = color.highlight;
        vars[`--${name}-highlight-foreground`] = color["highlight-foreground"];
        vars[`--color-${name}-highlight-foreground`] =
          color["highlight-foreground"];
      } else {
        vars[`--${name}`] = color.DEFAULT;
        vars[`--color-${name}`] = color.DEFAULT;
        vars[`--${name}-foreground`] = color.foreground;
        vars[`--color-${name}-foreground`] = color.foreground;
      }
    }

    // Spacing - no --color- prefix needed
    for (const [name, value] of Object.entries(tokens.spacing)) {
      vars[`--spacing-${name}`] = value;
    }

    // Border radius
    for (const [name, value] of Object.entries(tokens.radii)) {
      const varName = name === "DEFAULT" ? "radius" : `radius-${name}`;
      vars[`--${varName}`] = value;
    }

    // Typography
    for (const [name, value] of Object.entries(tokens.typography.fontSize)) {
      const varName = name === "base" ? "text" : `text-${name}`;
      vars[`--${varName}`] = value;
    }

    for (const [name, value] of Object.entries(tokens.typography.fontWeight)) {
      vars[`--font-${name}`] = value.toString();
    }

    for (const [name, value] of Object.entries(tokens.typography.tracking)) {
      vars[`--tracking-${name}`] = value;
    }

    for (const [name, value] of Object.entries(tokens.typography.leading)) {
      vars[`--leading-${name}`] = value.toString();
    }

    // Border width
    if (tokens.borderWidth) {
      vars["--default-border-width"] = tokens.borderWidth;
    }

    // Shadows
    for (const [name, value] of Object.entries(shadows)) {
      const varName = name === "DEFAULT" ? "shadow" : `shadow-${name}`;
      vars[`--${varName}`] = value;
    }

    // Border colors (if present)
    if (tokens.borderColors) {
      const borderColors = tokens.borderColors[mode];
      vars["--border"] = borderColors.default;
      vars["--color-border"] = borderColors.default;
      vars["--input"] = borderColors.input;
      vars["--color-input"] = borderColors.input;
      vars["--ring"] = borderColors.ring;
      vars["--color-ring"] = borderColors.ring;
    }

    return vars;
  }, [tokens, previewTheme]);

  return (
    <div className={cn("w-full", className)}>
      {/* Browser Window Chrome */}
      <div className="rounded-lg border bg-card shadow-xl overflow-hidden">
        {/* Title Bar */}
        <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex gap-1.5">
              <div className="size-3 rounded-full bg-destructive/60" />
              <div className="size-3 rounded-full bg-warning/60" />
              <div className="size-3 rounded-full bg-success/60" />
            </div>
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-1.5">
                <svg
                  className="size-3 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <span className="text-xs font-mono text-muted-foreground">
                  localhost:3000/components
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() =>
              setPreviewTheme(previewTheme === "light" ? "dark" : "light")
            }
            className="flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent transition-colors"
          >
            {previewTheme === "light" ? (
              <>
                <MoonIcon className="size-3.5" />
                <span>Dark</span>
              </>
            ) : (
              <>
                <SunIcon className="size-3.5" />
                <span>Light</span>
              </>
            )}
          </button>
        </div>

        {/* Content Area (Scrollable) - Isolated with token CSS vars */}
        <div
          className={cn(
            "max-h-[70vh] overflow-y-auto bg-background preview-container",
            previewTheme === "dark" && "dark"
          )}
          style={cssVars as React.CSSProperties}
          data-theme={previewTheme}
        >
          <style>{`
            .preview-container {
              /* Override spacing utilities to use CSS variables */
              --spacing-0: var(--spacing-0);
              --spacing-px: 1px;
              --spacing-0\\.5: var(--spacing-0.5);
              --spacing-1: var(--spacing-1);
              --spacing-1\\.5: var(--spacing-1.5);
              --spacing-2: var(--spacing-2);
              --spacing-2\\.5: var(--spacing-2.5);
              --spacing-3: var(--spacing-3);
              --spacing-3\\.5: var(--spacing-3.5);
              --spacing-4: var(--spacing-4);
              --spacing-5: var(--spacing-5);
              --spacing-6: var(--spacing-6);
              --spacing-7: var(--spacing-7);
              --spacing-8: var(--spacing-8);
              --spacing-9: var(--spacing-9);
              --spacing-10: var(--spacing-10);
              --spacing-11: var(--spacing-11);
              --spacing-12: var(--spacing-12);
              --spacing-14: var(--spacing-14);
              --spacing-16: var(--spacing-16);
              --spacing-20: var(--spacing-20);
              --spacing-24: var(--spacing-24);
              --spacing-28: var(--spacing-28);
              --spacing-32: var(--spacing-32);
              --spacing-36: var(--spacing-36);
              --spacing-40: var(--spacing-40);
              --spacing-44: var(--spacing-44);
              --spacing-48: var(--spacing-48);
              --spacing-52: var(--spacing-52);
              --spacing-56: var(--spacing-56);
              --spacing-60: var(--spacing-60);
              --spacing-64: var(--spacing-64);
              --spacing-72: var(--spacing-72);
              --spacing-80: var(--spacing-80);
              --spacing-96: var(--spacing-96);
            }
            
            /* Padding utilities */
            .preview-container .p-0 { padding: var(--spacing-0) !important; }
            .preview-container .p-0\\.5 { padding: var(--spacing-0.5) !important; }
            .preview-container .p-1 { padding: var(--spacing-1) !important; }
            .preview-container .p-1\\.5 { padding: var(--spacing-1.5) !important; }
            .preview-container .p-2 { padding: var(--spacing-2) !important; }
            .preview-container .p-2\\.5 { padding: var(--spacing-2.5) !important; }
            .preview-container .p-3 { padding: var(--spacing-3) !important; }
            .preview-container .p-3\\.5 { padding: var(--spacing-3.5) !important; }
            .preview-container .p-4 { padding: var(--spacing-4) !important; }
            .preview-container .p-5 { padding: var(--spacing-5) !important; }
            .preview-container .p-6 { padding: var(--spacing-6) !important; }
            .preview-container .p-8 { padding: var(--spacing-8) !important; }
            .preview-container .p-10 { padding: var(--spacing-10) !important; }
            .preview-container .p-12 { padding: var(--spacing-12) !important; }
            
            /* Padding-x utilities */
            .preview-container .px-0 { padding-left: var(--spacing-0) !important; padding-right: var(--spacing-0) !important; }
            .preview-container .px-1 { padding-left: var(--spacing-1) !important; padding-right: var(--spacing-1) !important; }
            .preview-container .px-2 { padding-left: var(--spacing-2) !important; padding-right: var(--spacing-2) !important; }
            .preview-container .px-3 { padding-left: var(--spacing-3) !important; padding-right: var(--spacing-3) !important; }
            .preview-container .px-4 { padding-left: var(--spacing-4) !important; padding-right: var(--spacing-4) !important; }
            .preview-container .px-5 { padding-left: var(--spacing-5) !important; padding-right: var(--spacing-5) !important; }
            .preview-container .px-6 { padding-left: var(--spacing-6) !important; padding-right: var(--spacing-6) !important; }
            .preview-container .px-8 { padding-left: var(--spacing-8) !important; padding-right: var(--spacing-8) !important; }
            
            /* Padding-y utilities */
            .preview-container .py-0 { padding-top: var(--spacing-0) !important; padding-bottom: var(--spacing-0) !important; }
            .preview-container .py-1 { padding-top: var(--spacing-1) !important; padding-bottom: var(--spacing-1) !important; }
            .preview-container .py-2 { padding-top: var(--spacing-2) !important; padding-bottom: var(--spacing-2) !important; }
            .preview-container .py-3 { padding-top: var(--spacing-3) !important; padding-bottom: var(--spacing-3) !important; }
            .preview-container .py-4 { padding-top: var(--spacing-4) !important; padding-bottom: var(--spacing-4) !important; }
            .preview-container .py-6 { padding-top: var(--spacing-6) !important; padding-bottom: var(--spacing-6) !important; }
            .preview-container .py-8 { padding-top: var(--spacing-8) !important; padding-bottom: var(--spacing-8) !important; }
            
            /* Padding-top utilities */
            .preview-container .pt-0 { padding-top: var(--spacing-0) !important; }
            .preview-container .pt-1 { padding-top: var(--spacing-1) !important; }
            .preview-container .pt-2 { padding-top: var(--spacing-2) !important; }
            .preview-container .pt-3 { padding-top: var(--spacing-3) !important; }
            .preview-container .pt-4 { padding-top: var(--spacing-4) !important; }
            .preview-container .pt-6 { padding-top: var(--spacing-6) !important; }
            .preview-container .pt-8 { padding-top: var(--spacing-8) !important; }
            
            /* Padding-bottom utilities */
            .preview-container .pb-0 { padding-bottom: var(--spacing-0) !important; }
            .preview-container .pb-1 { padding-bottom: var(--spacing-1) !important; }
            .preview-container .pb-2 { padding-bottom: var(--spacing-2) !important; }
            .preview-container .pb-3 { padding-bottom: var(--spacing-3) !important; }
            .preview-container .pb-4 { padding-bottom: var(--spacing-4) !important; }
            .preview-container .pb-6 { padding-bottom: var(--spacing-6) !important; }
            .preview-container .pb-8 { padding-bottom: var(--spacing-8) !important; }
            
            /* Padding-left utilities */
            .preview-container .pl-0 { padding-left: var(--spacing-0) !important; }
            .preview-container .pl-1 { padding-left: var(--spacing-1) !important; }
            .preview-container .pl-2 { padding-left: var(--spacing-2) !important; }
            .preview-container .pl-3 { padding-left: var(--spacing-3) !important; }
            .preview-container .pl-4 { padding-left: var(--spacing-4) !important; }
            .preview-container .pl-6 { padding-left: var(--spacing-6) !important; }
            .preview-container .pl-8 { padding-left: var(--spacing-8) !important; }
            
            /* Padding-right utilities */
            .preview-container .pr-0 { padding-right: var(--spacing-0) !important; }
            .preview-container .pr-1 { padding-right: var(--spacing-1) !important; }
            .preview-container .pr-2 { padding-right: var(--spacing-2) !important; }
            .preview-container .pr-3 { padding-right: var(--spacing-3) !important; }
            .preview-container .pr-4 { padding-right: var(--spacing-4) !important; }
            .preview-container .pr-6 { padding-right: var(--spacing-6) !important; }
            .preview-container .pr-8 { padding-right: var(--spacing-8) !important; }
            
            /* Margin utilities */
            .preview-container .m-0 { margin: var(--spacing-0) !important; }
            .preview-container .m-1 { margin: var(--spacing-1) !important; }
            .preview-container .m-2 { margin: var(--spacing-2) !important; }
            .preview-container .m-3 { margin: var(--spacing-3) !important; }
            .preview-container .m-4 { margin: var(--spacing-4) !important; }
            .preview-container .m-6 { margin: var(--spacing-6) !important; }
            .preview-container .m-8 { margin: var(--spacing-8) !important; }
            
            /* Margin-x utilities */
            .preview-container .mx-0 { margin-left: var(--spacing-0) !important; margin-right: var(--spacing-0) !important; }
            .preview-container .mx-1 { margin-left: var(--spacing-1) !important; margin-right: var(--spacing-1) !important; }
            .preview-container .mx-2 { margin-left: var(--spacing-2) !important; margin-right: var(--spacing-2) !important; }
            .preview-container .mx-3 { margin-left: var(--spacing-3) !important; margin-right: var(--spacing-3) !important; }
            .preview-container .mx-4 { margin-left: var(--spacing-4) !important; margin-right: var(--spacing-4) !important; }
            .preview-container .mx-6 { margin-left: var(--spacing-6) !important; margin-right: var(--spacing-6) !important; }
            .preview-container .mx-8 { margin-left: var(--spacing-8) !important; margin-right: var(--spacing-8) !important; }
            
            /* Margin-y utilities */
            .preview-container .my-0 { margin-top: var(--spacing-0) !important; margin-bottom: var(--spacing-0) !important; }
            .preview-container .my-1 { margin-top: var(--spacing-1) !important; margin-bottom: var(--spacing-1) !important; }
            .preview-container .my-2 { margin-top: var(--spacing-2) !important; margin-bottom: var(--spacing-2) !important; }
            .preview-container .my-3 { margin-top: var(--spacing-3) !important; margin-bottom: var(--spacing-3) !important; }
            .preview-container .my-4 { margin-top: var(--spacing-4) !important; margin-bottom: var(--spacing-4) !important; }
            .preview-container .my-6 { margin-top: var(--spacing-6) !important; margin-bottom: var(--spacing-6) !important; }
            .preview-container .my-8 { margin-top: var(--spacing-8) !important; margin-bottom: var(--spacing-8) !important; }
            
            /* Margin-top utilities */
            .preview-container .mt-0 { margin-top: var(--spacing-0) !important; }
            .preview-container .mt-1 { margin-top: var(--spacing-1) !important; }
            .preview-container .mt-2 { margin-top: var(--spacing-2) !important; }
            .preview-container .mt-3 { margin-top: var(--spacing-3) !important; }
            .preview-container .mt-4 { margin-top: var(--spacing-4) !important; }
            .preview-container .mt-6 { margin-top: var(--spacing-6) !important; }
            .preview-container .mt-8 { margin-top: var(--spacing-8) !important; }
            
            /* Margin-bottom utilities */
            .preview-container .mb-0 { margin-bottom: var(--spacing-0) !important; }
            .preview-container .mb-1 { margin-bottom: var(--spacing-1) !important; }
            .preview-container .mb-2 { margin-bottom: var(--spacing-2) !important; }
            .preview-container .mb-3 { margin-bottom: var(--spacing-3) !important; }
            .preview-container .mb-4 { margin-bottom: var(--spacing-4) !important; }
            .preview-container .mb-6 { margin-bottom: var(--spacing-6) !important; }
            .preview-container .mb-8 { margin-bottom: var(--spacing-8) !important; }
            
            /* Margin-left utilities */
            .preview-container .ml-0 { margin-left: var(--spacing-0) !important; }
            .preview-container .ml-1 { margin-left: var(--spacing-1) !important; }
            .preview-container .ml-2 { margin-left: var(--spacing-2) !important; }
            .preview-container .ml-3 { margin-left: var(--spacing-3) !important; }
            .preview-container .ml-4 { margin-left: var(--spacing-4) !important; }
            .preview-container .ml-6 { margin-left: var(--spacing-6) !important; }
            .preview-container .ml-8 { margin-left: var(--spacing-8) !important; }
            
            /* Margin-right utilities */
            .preview-container .mr-0 { margin-right: var(--spacing-0) !important; }
            .preview-container .mr-1 { margin-right: var(--spacing-1) !important; }
            .preview-container .mr-2 { margin-right: var(--spacing-2) !important; }
            .preview-container .mr-3 { margin-right: var(--spacing-3) !important; }
            .preview-container .mr-4 { margin-right: var(--spacing-4) !important; }
            .preview-container .mr-6 { margin-right: var(--spacing-6) !important; }
            .preview-container .mr-8 { margin-right: var(--spacing-8) !important; }
            
            /* Gap utilities */
            .preview-container .gap-1 { gap: var(--spacing-1) !important; }
            .preview-container .gap-2 { gap: var(--spacing-2) !important; }
            .preview-container .gap-3 { gap: var(--spacing-3) !important; }
            .preview-container .gap-4 { gap: var(--spacing-4) !important; }
            .preview-container .gap-6 { gap: var(--spacing-6) !important; }
            .preview-container .gap-8 { gap: var(--spacing-8) !important; }
            
            /* Space-y utilities */
            .preview-container .space-y-1 > * + * { margin-top: var(--spacing-1) !important; }
            .preview-container .space-y-2 > * + * { margin-top: var(--spacing-2) !important; }
            .preview-container .space-y-3 > * + * { margin-top: var(--spacing-3) !important; }
            .preview-container .space-y-4 > * + * { margin-top: var(--spacing-4) !important; }
            .preview-container .space-y-6 > * + * { margin-top: var(--spacing-6) !important; }
            .preview-container .space-y-12 > * + * { margin-top: var(--spacing-12) !important; }
            
            /* Space-x utilities */
            .preview-container .space-x-1 > * + * { margin-left: var(--spacing-1) !important; }
            .preview-container .space-x-2 > * + * { margin-left: var(--spacing-2) !important; }
            .preview-container .space-x-3 > * + * { margin-left: var(--spacing-3) !important; }
            .preview-container .space-x-4 > * + * { margin-left: var(--spacing-4) !important; }
          `}</style>
          <div className="p-8">
            <div className="space-y-12">
              {/* Buttons Section */}
              <section>
                <h3 className="text-lg font-semibold mb-4">Buttons</h3>
                <div className="space-y-6">
                  {/* Default variant */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Default
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Button intent="default" size="default">
                        Primary
                      </Button>
                      <Button intent="secondary" size="default">
                        Secondary
                      </Button>
                      <Button intent="destructive" size="default">
                        Destructive
                      </Button>
                      <Button intent="warning" size="default">
                        Warning
                      </Button>
                      <Button intent="success" size="default">
                        Success
                      </Button>
                    </div>
                  </div>

                  {/* Outline variant */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Outline
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Button intent="default" variant="outline">
                        Primary
                      </Button>
                      <Button intent="secondary" variant="outline">
                        Secondary
                      </Button>
                      <Button intent="destructive" variant="outline">
                        Destructive
                      </Button>
                      <Button intent="warning" variant="outline">
                        Warning
                      </Button>
                      <Button intent="success" variant="outline">
                        Success
                      </Button>
                    </div>
                  </div>

                  {/* Ghost variant */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Ghost
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Button intent="default" variant="ghost">
                        Primary
                      </Button>
                      <Button intent="secondary" variant="ghost">
                        Secondary
                      </Button>
                      <Button intent="destructive" variant="ghost">
                        Destructive
                      </Button>
                      <Button intent="warning" variant="ghost">
                        Warning
                      </Button>
                      <Button intent="success" variant="ghost">
                        Success
                      </Button>
                    </div>
                  </div>

                  {/* Link variant */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Link
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Button intent="default" variant="link">
                        Primary
                      </Button>
                      <Button intent="secondary" variant="link">
                        Secondary
                      </Button>
                      <Button intent="destructive" variant="link">
                        Destructive
                      </Button>
                      <Button intent="warning" variant="link">
                        Warning
                      </Button>
                      <Button intent="success" variant="link">
                        Success
                      </Button>
                    </div>
                  </div>

                  {/* States */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      States
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Button intent="default" disabled>
                        Disabled
                      </Button>
                      <Button intent="default" loading>
                        Loading
                      </Button>
                      <Button intent="default">
                        <PlusIcon className="size-4" />
                        With Icon
                      </Button>
                      <Button intent="default" size="icon">
                        <HeartIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Alerts Section */}
              <section>
                <h3 className="text-lg font-semibold mb-4">Alerts</h3>
                <div className="space-y-3">
                  <Alert
                    variant="default"
                    intent="default"
                    icon={<InformationCircleIcon className="size-4" />}
                  >
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      This is an informational alert with the default intent.
                    </AlertDescription>
                  </Alert>
                  <Alert
                    variant="default"
                    intent="success"
                    icon={<CheckCircleIcon className="size-4" />}
                  >
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Your changes have been saved successfully.
                    </AlertDescription>
                  </Alert>
                  <Alert
                    variant="default"
                    intent="warning"
                    icon={<ExclamationTriangleIcon className="size-4" />}
                  >
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      Please review your settings before continuing.
                    </AlertDescription>
                  </Alert>
                  <Alert
                    variant="default"
                    intent="destructive"
                    icon={<XCircleIcon className="size-4" />}
                  >
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      An error occurred while processing your request.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="outline" intent="default">
                    <AlertTitle>Outline Variant</AlertTitle>
                    <AlertDescription>
                      This is an outlined alert without an icon.
                    </AlertDescription>
                  </Alert>
                </div>
              </section>

              {/* Badges Section */}
              <section>
                <h3 className="text-lg font-semibold mb-4">Badges</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Default
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge intent="default">Primary</Badge>
                      <Badge intent="secondary">Secondary</Badge>
                      <Badge intent="destructive">Destructive</Badge>
                      <Badge intent="warning">Warning</Badge>
                      <Badge intent="success">Success</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Outline
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" intent="default">
                        Primary
                      </Badge>
                      <Badge variant="outline" intent="secondary">
                        Secondary
                      </Badge>
                      <Badge variant="outline" intent="destructive">
                        Destructive
                      </Badge>
                      <Badge variant="outline" intent="warning">
                        Warning
                      </Badge>
                      <Badge variant="outline" intent="success">
                        Success
                      </Badge>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cards Section */}
              <section>
                <h3 className="text-lg font-semibold mb-4">Cards</h3>
                <Card className="max-w-md">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>
                      Card description goes here to explain the content.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      This is the main content area of the card with some
                      example text.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Interactive Components Section */}
              <section>
                <h3 className="text-lg font-semibold mb-4">
                  Interactive Components
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Dropdown Menu */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Dropdown Menu</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button intent="default" variant="ghost">
                          <UserIcon className="size-4" />
                          Account
                          <ChevronDownIcon className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <UserIcon className="size-4" />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Cog6ToothIcon className="size-4" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <ArrowRightOnRectangleIcon className="size-4" />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Popover */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Popover</h4>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button intent="default" variant="ghost">
                          <InformationCircleIcon className="size-4" />
                          Open Popover
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Popover Title</h4>
                          <p className="text-sm text-muted-foreground">
                            This is a popover with some content inside.
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Toast */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Toast</h4>
                    <Button
                      intent="default"
                      variant="ghost"
                      onClick={() =>
                        toast.success("Success!", {
                          description:
                            "Your action was completed successfully.",
                        })
                      }
                    >
                      <BellIcon className="size-4" />
                      Show Toast
                    </Button>
                  </div>

                  {/* Dialog */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Dialog</h4>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button intent="default" variant="ghost">
                          <ShareIcon className="size-4" />
                          Open Dialog
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Dialog Title</DialogTitle>
                          <DialogDescription>
                            This is a dialog with a description and actions.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm">Dialog content goes here.</p>
                        </div>
                        <DialogFooter>
                          <Button intent="default">Confirm</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Alert Dialog */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Alert Dialog</h4>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button intent="destructive" variant="ghost">
                          <TrashIcon className="size-4" />
                          Delete Item
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the item.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  {/* Tooltip */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Tooltip</h4>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button intent="default" variant="ghost">
                            <InformationCircleIcon className="size-4" />
                            Hover Me
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This is a helpful tooltip</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </section>

              {/* Tabs Section */}
              <section>
                <h3 className="text-lg font-semibold mb-4">Tabs</h3>
                <Tabs defaultValue="tab1" className="w-full">
                  <TabsList>
                    <TabsTrigger value="tab1">Overview</TabsTrigger>
                    <TabsTrigger value="tab2">Details</TabsTrigger>
                    <TabsTrigger value="tab3">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Overview</CardTitle>
                        <CardDescription>
                          General overview content goes here.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Overview tab content.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Details</CardTitle>
                        <CardDescription>
                          Detailed information displayed here.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Details tab content.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>
                          Configure your preferences.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Settings tab content.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </section>

              {/* Form Section */}
              <section>
                <h3 className="text-lg font-semibold mb-4">Form Inputs</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>Example Form</CardTitle>
                    <CardDescription>
                      Form inputs with labels and validation states.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select>
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="font-normal">
                          I agree to the terms and conditions
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="marketing" />
                        <Label htmlFor="marketing" className="font-normal">
                          Send me marketing emails
                        </Label>
                      </div>
                      <div className="pt-2">
                        <Button intent="default" type="button">
                          Submit Form
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
