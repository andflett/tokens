"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import TurdLogo from "./turd-logo";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggler } from "@/components/animate-ui/primitives/effects/theme-toggler";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Only show theme after mounting to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navLinkClass = (href: string) =>
    cn(
      "px-3 py-1 rounded text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
      pathname === href ? "text-foreground" : ""
    );

  const mobileNavLinkClass = (href: string) =>
    cn(
      "block py-3 text-lg font-medium hover:text-foreground transition-colors",
      pathname === href ? "text-foreground" : "text-foreground"
    );

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-center px-6">
        <div className="absolute left-6 flex items-center gap-6">
          <Link href="/" aria-label="Home" className="flex items-center">
            <TurdLogo
              width={28}
              height={28}
              background="var(--foreground)"
              foreground="var(--background)"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/" className={navLinkClass("/")}>
            About
          </Link>
          <Link href="/generate" className={navLinkClass("/generate")}>
            Token Designer
          </Link>
          <Link href="/docs" className={navLinkClass("/docs")}>
            Documentation
          </Link>
          {mounted && (
            <ThemeToggler
              theme={theme as "light" | "dark" | "system"}
              resolvedTheme={resolvedTheme as "light" | "dark"}
              setTheme={setTheme}
              direction="ltr"
            >
              {({ resolved, toggleTheme }) => (
                <Button
                  intent="secondary"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    const nextTheme = resolved === "light" ? "dark" : "light";
                    toggleTheme(nextTheme);
                  }}
                >
                  {resolved === "dark" ? (
                    <MoonIcon className="h-4 w-4" />
                  ) : (
                    <SunIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}
            </ThemeToggler>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            intent="default"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {/* Hamburger to X animation */}
            <div className="flex flex-col justify-center items-center w-5 h-5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-all duration-300 ease-in-out",
                  mobileMenuOpen
                    ? "rotate-45 translate-y-0.5"
                    : "-translate-y-1"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-all duration-300 ease-in-out",
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-all duration-300 ease-in-out",
                  mobileMenuOpen
                    ? "-rotate-45 -translate-y-0.5"
                    : "translate-y-1"
                )}
              />
            </div>
          </Button>
        </div>

        {/* Mobile Theme Toggle - Always visible on right */}
        <div className="absolute right-6 flex md:hidden items-center">
          {mounted && (
            <ThemeToggler
              theme={theme as "light" | "dark" | "system"}
              resolvedTheme={resolvedTheme as "light" | "dark"}
              setTheme={setTheme}
              direction="ltr"
            >
              {({ resolved, toggleTheme }) => (
                <Button
                  intent="secondary"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    const nextTheme = resolved === "light" ? "dark" : "light";
                    toggleTheme(nextTheme);
                  }}
                >
                  {resolved === "dark" ? (
                    <MoonIcon className="h-4 w-4" />
                  ) : (
                    <SunIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}
            </ThemeToggler>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen
            ? "max-h-screen opacity-100 border-t border-border/50"
            : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto max-w-5xl px-6 py-4">
          <nav className="flex flex-col">
            <Link
              href="/"
              className={mobileNavLinkClass("/")}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/docs"
              className={mobileNavLinkClass("/docs")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </Link>

            {/* Docs sub-navigation - only show when on docs pages */}
            {pathname.startsWith("/docs") && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-border/50 pl-4">
                <Link
                  href="/docs"
                  className={cn(
                    "block py-2 text-sm transition-colors",
                    pathname === "/docs"
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Documentation
                </Link>
                <Link
                  href="/docs/color-algorithm"
                  className={cn(
                    "block py-2 text-sm transition-colors",
                    pathname === "/docs/color-algorithm"
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Color Algorithm
                </Link>
              </div>
            )}

            <Link
              href="/generate"
              className={mobileNavLinkClass("/generate")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Design your Tokens
            </Link>
          </nav>

          {/* Theme Toggle - Animated Pill */}
          {mounted && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <ThemeToggler
                theme={theme as "light" | "dark" | "system"}
                resolvedTheme={resolvedTheme as "light" | "dark"}
                setTheme={setTheme}
                direction="ltr"
              >
                {({ resolved, toggleTheme }) => (
                  <div className="inline-flex items-center rounded-lg bg-muted p-1">
                    <button
                      onClick={() => toggleTheme("light")}
                      className={cn(
                        "inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                        resolved === "light"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <SunIcon className="h-4 w-4" />
                      Light
                    </button>
                    <button
                      onClick={() => toggleTheme("dark")}
                      className={cn(
                        "inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                        resolved === "dark"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <MoonIcon className="h-4 w-4" />
                      Dark
                    </button>
                  </div>
                )}
              </ThemeToggler>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
