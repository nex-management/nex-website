import type { Metadata } from "next";
import { site } from "@/content/site";
import { absoluteUrl, indexable } from "./site-url";

/**
 * Metadata for one page: title, description, canonical URL and the matching
 * Open Graph block. The Open Graph image comes from src/app/opengraph-image.png
 * automatically.
 */
export function pageMeta({
  title,
  description,
  path,
  noindex = false,
}: {
  /** Page title without the site name; null for the homepage (uses the site title). */
  title: string | null;
  description: string;
  /** Site-relative path, e.g. "/about". */
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title ? `${title} – ${site.brandName}` : site.seo.title;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.brandName,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
    },
    ...(noindex || !indexable ? { robots: { index: false, follow: false } } : {}),
  };
}
