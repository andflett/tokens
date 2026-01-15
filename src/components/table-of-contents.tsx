"use client";

import { useHeadings } from "@/hooks/use-headings";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ListBulletIcon } from "@heroicons/react/24/outline";

export function TableOfContents() {
  const { headings, activeId } = useHeadings();

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const tocContent = (
    <nav className="space-y-3">
      {headings
        .filter((heading) => heading.level === 2)
        .map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={cn(
              "cursor-pointer block w-full text-left text-sm transition-colors hover:text-foreground relative pl-4 py-1",
              activeId === heading.id
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            {/* Scroll indicator line */}
            <span
              className={cn(
                "absolute left-0 top-0 bottom-0 w-0.5 transition-all",
                activeId === heading.id
                  ? "bg-primary"
                  : "bg-transparent"
              )}
            />
            {heading.text}
          </button>
        ))}
    </nav>
  );

  return (
    <>
      {/* Desktop: Static position in flex row */}
      <aside className="hidden xl:block w-56 flex-shrink-0 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
        <div className="sticky top-20">
          <h4 className="text-sm font-semibold mb-4">On This Page</h4>
          {tocContent}
        </div>
      </aside>

      {/* Mobile: Floating button with popover */}
      <div className="xl:hidden fixed bottom-6 right-6 z-40">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              intent="default"
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg"
              aria-label="Table of contents"
            >
              <ListBulletIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-64 max-h-[400px] overflow-y-auto"
          >
            <h4 className="text-sm font-semibold mb-3">On This Page</h4>
            {tocContent}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
