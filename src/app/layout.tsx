import type { Metadata } from "next";
import { JetBrains_Mono, Figtree, Lora } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { config } from "@/lib/config";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Why does everything I build with AI look like turd?",
    template: "%s | Tokens",
  },
  description: "Generate beautiful, accessible design tokens.",
  metadataBase: new URL(config.appUrl),
  openGraph: {
    title: "Tokens",
    description: "Generate beautiful, accessible design tokens.",
    siteName: "Tokens",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tokens",
    description: "Generate beautiful, accessible design tokens.",
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
        className={`${figtree.variable} ${lora.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-[hsl(48_33.3%_97.1%)]">
            <SiteHeader />
            <main className="relative flex-1">
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
