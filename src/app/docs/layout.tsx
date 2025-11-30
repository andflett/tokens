import { DocsSidebar } from "@/components/docs-sidebar";
import { TableOfContents } from "@/components/table-of-contents";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      <div className="py-10">
        <div className="flex gap-8">
          {/* Left Sidebar - Desktop only */}
          <DocsSidebar />

          {/* Main Content - full width within container */}
          <main className="flex-1 min-w-0">{children}</main>

          {/* Right TOC - Desktop only, in flex row */}
          <TableOfContents />
        </div>
      </div>
    </div>
  );
}
