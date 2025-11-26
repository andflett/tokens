"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  SwatchIcon,
  DocumentTextIcon,
  BoltIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background text-sm font-bold">
              V
            </div>
            <span className="hidden sm:inline">Vibe Themes</span>
          </Link>
        </div>

        <nav className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={pathname === "/docs" ? "text-foreground" : "text-muted-foreground"}
          >
            <Link href="/docs" className="gap-1.5">
              <DocumentTextIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Docs</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={pathname === "/generate" ? "text-foreground" : "text-muted-foreground"}
          >
            <Link href="/generate" className="gap-1.5">
              <SwatchIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Generator</span>
            </Link>
          </Button>
          <div className="mx-2 h-4 w-px bg-border" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2">
                <SunIcon className="h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2">
                <MoonIcon className="h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2">
                <ComputerDesktopIcon className="h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" asChild>
            <Link href="/login" className="gap-1.5">
              <BoltIcon className="h-4 w-4" />
              Sign In
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
