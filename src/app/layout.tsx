import type { Metadata } from "next";
import localFont from "next/font/local";
import { getSiteSettings } from "@/content";
import { indexable, siteUrl } from "@/lib/site-url";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "@/components/seo/JsonLd";
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

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    metadataBase: new URL(siteUrl),
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
      // No `url` and no canonical here: Next resolves those against the current route's path, which
      // for /studio (a dynamic route) isn't known at build time. Each page sets its own (see lib/seo.ts).
    },
    twitter: {
      card: "summary_large_image",
    },
    // Previews and the temporary *.netlify.app address stay out of search results.
    ...(indexable ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSiteSettings();
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <JsonLd data={[organizationJsonLd(site), webSiteJsonLd(site)]} />
      </body>
    </html>
  );
}
