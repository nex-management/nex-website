import type { MetadataRoute } from "next";
import { getHotels } from "@/content";

const base = "https://nex-mgmt.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hotels = await getHotels();
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    ...hotels.map((h) => ({ url: `${base}/portfolio/${h.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/team`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/partner`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];
}
