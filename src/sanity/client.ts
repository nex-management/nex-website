import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, projectId, sanityConfigured } from "../../sanity/env";

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // The site caches results itself (Next cache), so read fresh documents: a webhook
      // revalidation must not pick up a not-yet-updated CDN copy.
      useCdn: false,
      perspective: "published",
    })
  : null;

const builder = sanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

/** URL for a Sanity image, resized by Sanity's image CDN. */
export function urlFor(source: SanityImageSource, width: number, height?: number) {
  if (!builder) return "";
  let b = builder.image(source).width(width).auto("format").fit("crop");
  if (height) b = b.height(height);
  return b.url();
}
