import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { config } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tokens - Design Token Generator",
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
