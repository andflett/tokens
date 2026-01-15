import Link from "next/link";
import TurdLogo from "./turd-logo";

export function SiteFooter() {
  return (
    <footer className="border-t py-8">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <TurdLogo
              width={20}
              height={20}
              background="var(--foreground)"
              foreground="var(--background)"
              className="shrink-0"
            />
            <span className="text-sm text-muted-foreground">
              © 2025{" "}
              <Link
                href="https://flett.cc"
                className="hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Andrew Flett
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/docs"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="/generate"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Generator
            </Link>
            <Link
              href="https://www.npmjs.com/package/@flett/design-tokens-mcp-server"
              className="text-sm text-muted-foreground hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              NPM
            </Link>
            <Link
              href="/legal"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
