import type { Metadata } from "next";
import { I18nProvider } from "./components/i18n-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEA.md · Tactile & Editorial Aesthetics",
  description:
    "No more instant AI slop. Curated physical & cultural UI aesthetics with interactive live demos and DESIGN.md prompts for AI coding agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased min-h-screen">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
