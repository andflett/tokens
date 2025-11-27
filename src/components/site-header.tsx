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
  SwatchIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinkClass = (href: string) =>
    cn(
      "text-sm font-medium hover:text-foreground transition-colors",
      pathname === href ? "text-foreground" : "text-foreground/80"
    );

  const mobileNavLinkClass = (href: string) =>
    cn(
      "block py-2 text-lg font-medium hover:text-foreground transition-colors",
      pathname === href ? "text-foreground" : "text-foreground/80"
    );

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
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
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className={navLinkClass("/")}>
            About
          </Link>
          <Link href="/docs" className={navLinkClass("/docs")}>
            Docs
          </Link>
          <Button asChild size="sm" className="gap-1.5">
            <Link href="/generate">
              <SwatchIcon className="h-4 w-4" />
              Design Your Tokens
            </Link>
          </Button>
          <div className="h-4 w-px bg-border" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="gap-2"
              >
                <SunIcon className="h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="gap-2"
              >
                <MoonIcon className="h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="gap-2"
              >
                <ComputerDesktopIcon className="h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Button asChild size="sm" className="gap-1.5">
            <Link href="/generate">
              <SwatchIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Design Your Tokens</span>
            </Link>
          </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Bars3Icon className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col space-y-1">
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
                  Docs
                </Link>
                <Link
                  href="/generate"
                  className={mobileNavLinkClass("/generate")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Generator
                </Link>
              </nav>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-3">Theme</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="gap-2"
                  >
                    <SunIcon className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="gap-2"
                  >
                    <MoonIcon className="h-4 w-4" />
                    Dark
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
