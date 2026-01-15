"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import TurdLogo from "./turd-logo";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Only show theme after mounting to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navLinkClass = (href: string) =>
    cn(
      "py-1 text-sm font-medium rounded-full px-4 text-foreground/90 hover:bg-muted transition-colors",
      pathname === href && pathname !== "/" ? "text-foreground bg-muted" : ""
    );

  const mobileNavLinkClass = (href: string) =>
    cn(
      "block py-3 text-lg font-medium hover:text-foreground transition-colors",
      pathname === href ? "text-foreground" : "text-foreground"
    );

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-sm w-full">
      <div className="flex h-16 items-center justify-between w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-0">
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
            Home
          </Link>
          <Link href="/generate" className={navLinkClass("/generate")}>
            Token Designer
          </Link>
          <Link href="/mcp" className={navLinkClass("/mcp")}>
            MCP Server
          </Link>
          <Link href="/docs" className={navLinkClass("/docs")}>
            Documentation
          </Link>
        </nav>

        {/* Desktop Theme Switch - right aligned */}
        <div className="hidden md:flex items-center">
          {mounted && <ThemeSwitch size="sm" />}
        </div>

        {/* Mobile Controls - theme switch + hamburger at far right */}
        <div className="flex md:hidden items-center gap-2">
          {mounted && <ThemeSwitch size="sm" />}

          <Button
            intent="default"
            variant="ghost"
            size="sm"
            className=""
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {/* Hamburger to X animation - foreground color */}
            <div className="flex flex-col justify-center items-center w-5 h-7 text-foreground">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex flex-col">
            <Link
              href="/"
              className={mobileNavLinkClass("/")}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/generate"
              className={mobileNavLinkClass("/generate")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Token Designer
            </Link>
            <Link
              href="/mcp"
              className={mobileNavLinkClass("/mcp")}
              onClick={() => setMobileMenuOpen(false)}
            >
              AI MCP
            </Link>
            <Link
              href="/docs"
              className={mobileNavLinkClass("/docs")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
