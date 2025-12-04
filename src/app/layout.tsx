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
          <div className="relative flex min-h-screen flex-col">
            {/* Grid background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              {/* Intersection dots */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(0_0_0_/_0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgb(255_255_255_/_0.15)_1px,transparent_1px)] bg-[length:20px_20px] [mask-image:linear-gradient(to_bottom,black_0%,transparent_55%)]" />
            </div>

            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
