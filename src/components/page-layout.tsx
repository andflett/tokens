import { SiteHeader } from "./site-header";

interface PageLayoutProps {
  children: React.ReactNode;
  showGrid?: boolean;
  fullWidth?: boolean;
}

export function PageLayout({ children, showGrid = false, fullWidth = false }: PageLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Grid background */}
      {showGrid && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Grid lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
                linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              maskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 50%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 50%)",
            }}
          />
          {/* Intersection dots */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--grid-dot) 1.5px, transparent 0)`,
              backgroundSize: "40px 40px",
              maskImage: "linear-gradient(to bottom, black 0%, black 25%, transparent 55%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 25%, transparent 55%)",
            }}
          />
        </div>
      )}

      <SiteHeader />

      <main className={`flex-1 ${fullWidth ? "" : "mx-auto w-full max-w-5xl px-6"}`}>
        {children}
      </main>
    </div>
  );
}
