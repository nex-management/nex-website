import type { MetadataRoute } from "next";
import { getHotels } from "@/content";
import { absoluteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hotels = await getHotels();
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/portfolio"), changeFrequency: "monthly", priority: 0.8 },
    ...hotels.map((h) => ({ url: absoluteUrl(`/portfolio/${h.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: absoluteUrl("/team"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/partner"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.6 },
  ];
}
