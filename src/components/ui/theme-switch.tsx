"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { ThemeToggler } from "@/components/animate-ui/primitives/effects/theme-toggler";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

type ThemeSwitchProps = {
  size?: "sm" | "lg";
  className?: string;
  direction?: "ltr" | "rtl" | "ttb" | "btt";
};

export function ThemeSwitch({
  size = "lg",
  className,
  direction = "ltr",
}: ThemeSwitchProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeToggler
      theme={(theme || "system") as "light" | "dark" | "system"}
      resolvedTheme={(resolvedTheme || "light") as "light" | "dark"}
      setTheme={setTheme}
      direction={direction}
    >
      {({ resolved, toggleTheme }) => {
        const isSmall = size === "sm";
        const buttonHeight = isSmall ? "h-9" : "h-auto";
        const pillHeight = isSmall ? "h-7" : "h-8";
        const padding = isSmall ? "p-1" : "p-1.5";
        const iconSize = isSmall ? "h-3.5 w-3.5" : "h-4 w-4";
        const itemSize = isSmall ? "h-7 w-7" : "h-8 w-8";
        const itemPadding = isSmall ? "" : "px-2";
        const pillLeft =
          resolved === "light"
            ? isSmall
              ? "4px"
              : "6px"
            : isSmall
            ? "calc(50% + 0px)"
            : "calc(50% + 2px)";
        const pillWidth = isSmall ? "calc(50% - 4px)" : "calc(50% - 8px)";

        return (
          <button
            type="button"
            onClick={() => toggleTheme(resolved === "light" ? "dark" : "light")}
            className={cn(
              "border border-primary/15 shadow-md shadow-primary/20 bg-card text-muted-foreground relative inline-flex w-fit items-center justify-center rounded-full cursor-pointer",
              padding,
              buttonHeight,
              className
            )}
            title="Toggle theme"
            aria-pressed={resolved === "dark"}
          >
            {/* Animated pill background */}
            <div
              className={cn(
                "absolute rounded-full bg-primary-subdued transition-all duration-200 ease-out",
                pillHeight
              )}
              style={{
                left: pillLeft,
                width: pillWidth,
              }}
            />
            {/* Light button */}
            <div
              className={cn(
                "relative z-10 inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors",
                itemSize,
                itemPadding,
                resolved === "light"
                  ? "text-primary-subdued-foreground"
                  : "text-foreground"
              )}
            >
              <SunIcon className={iconSize} />
            </div>
            {/* Dark button */}
            <div
              className={cn(
                "relative z-10 inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors",
                itemSize,
                itemPadding,
                resolved === "dark"
                  ? "text-primary-subdued-foreground"
                  : "text-foreground"
              )}
            >
              <MoonIcon className={iconSize} />
            </div>
            <span className="sr-only">Toggle theme</span>
          </button>
        );
      }}
    </ThemeToggler>
  );
}
