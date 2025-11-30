"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface DocPage {
  title: string;
  href: string;
}

const docPages: DocPage[] = [
  {
    title: "Documentation",
    href: "/docs",
  },
  {
    title: "Color Algorithm",
    href: "/docs/color-algorithm",
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-48 flex-shrink-0">
      <div className="sticky top-20">
        <Card className="p-4">
          <h4 className="text-sm font-semibold px-2">Documentation</h4>
          <nav className="space-y-1">
            {docPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className={cn(
                  "block px-3 py-2 text-sm rounded-md transition-colors",
                  pathname === page.href
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {page.title}
              </Link>
            ))}
          </nav>
        </Card>
      </div>
    </aside>
  );
}

// Export doc pages for use in mobile menu
export { docPages };
