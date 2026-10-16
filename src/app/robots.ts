import type { MetadataRoute } from "next";
import { absoluteUrl, indexable } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  // Deploy previews and the temporary *.netlify.app address are closed to crawlers.
  if (!indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/studio"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
