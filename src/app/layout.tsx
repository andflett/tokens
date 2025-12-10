import type { Metadata } from "next";
import {
  Mulish,
  JetBrains_Mono,
  Noto_Sans,
  Quicksand,
  Manrope,
  Figtree,
} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { config } from "@/lib/config";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
const mulish = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Why does my AI-generated UI look like turd?",
    template: "%s | Tokens",
  },
  description:
    "Generate beautiful, accessible design tokens from your brand colors. Perfect for designers learning to code with AI assistants.",
  metadataBase: new URL(config.appUrl),
  openGraph: {
    title: "Tokens",
    description:
      "Generate beautiful, accessible design tokens from your brand colors",
    siteName: "Tokens",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tokens",
    description:
      "Generate beautiful, accessible design tokens from your brand colors",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${mulish.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-[linear-gradient(to_bottom,theme(colors.primary.25),#fdfbff)] dark:bg-[linear-gradient(to_bottom,theme(colors.background),black)]">
            <SiteHeader />
            <main className="relative flex-1">
              {/* Subtle grid only at top of main content */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-[90vh] z-0 bg-[linear-gradient(rgb(229_184_229_/_0.15)_1px,transparent_1px),linear-gradient(90deg,rgb(229_184_229_/_0.15)_1px,transparent_1px)] bg-[length:16px_16px] [mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_100%)] dark:bg-[linear-gradient(rgb(255_255_255_/_0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.03)_1px,transparent_1px)]" />
              {/* Main content sits above grid */}
              <div className="relative z-10">{children}</div>
            </main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
