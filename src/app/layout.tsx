import type { Metadata } from "next";
import localFont from "next/font/local";
import { getSiteSettings } from "@/content";
import "./globals.css";

const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const manrope = localFont({
  src: [{ path: "./fonts/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

const site = getSiteSettings();

export const metadata: Metadata = {
  metadataBase: new URL("https://nex-mgmt.com"),
  title: {
    default: site.seo.title,
    template: `%s – ${site.brandName}`,
  },
  description: site.seo.description,
  openGraph: {
    type: "website",
    siteName: site.brandName,
    title: site.seo.title,
    description: site.seo.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
