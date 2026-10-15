import type { MetadataRoute } from "next";

const base = "https://nex-mgmt.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/team`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
