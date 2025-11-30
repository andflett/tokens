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
import { Card } from "@/components/ui/card";

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
    <nav className="space-y-1">
      {headings.map((heading) => (
        <button
          key={heading.id}
          onClick={() => scrollToHeading(heading.id)}
          className={cn(
            "block w-full text-left text-sm transition-colors hover:text-foreground",
            heading.level === 3 && "pl-4",
            activeId === heading.id
              ? "text-foreground font-medium"
              : "text-muted-foreground"
          )}
        >
          {heading.text}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop: Fixed position on right side of viewport */}
      <div className="hidden xl:block fixed right-8 top-20 w-56 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <div className="sticky top-20">
          <Card className="p-4">
            <h4 className="text-sm font-semibold mb-3">On This Page</h4>
            {tocContent}
          </Card>
        </div>
      </div>

      {/* Mobile: Floating button with popover */}
      <div className="xl:hidden fixed bottom-6 right-6 z-40">
        <Popover>
          <PopoverTrigger asChild>
            <Button
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
