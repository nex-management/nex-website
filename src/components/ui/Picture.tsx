import Image from "next/image";
import type { ImageRef } from "@/content/types";

/**
 * A photo that fills its (positioned) container. Pre-sized local files are
 * served as they are, with a WebP version offered first; images from
 * Sanity's CDN already arrive resized and in the best format.
 */
export function Picture({
  image,
  sizes,
  alt,
  className = "",
  priority = false,
}: {
  image: ImageRef;
  sizes: string;
  /** Overrides the image's own text, e.g. "" for a purely decorative backdrop. */
  alt?: string;
  className?: string;
  /** True for the largest image at the top of a page: loads first instead of lazily. */
  priority?: boolean;
}) {
  const altText = alt ?? image.alt;
  const imgClass = `absolute inset-0 h-full w-full object-cover ${className}`;

  if (!image.srcSet) {
    return (
      <Image src={image.src} alt={altText} unoptimized={image.unoptimized} fill priority={priority} sizes={sizes} className={`object-cover ${className}`} />
    );
  }

  return (
    <picture>
      {image.srcSetWebp ? <source type="image/webp" srcSet={image.srcSetWebp} sizes={sizes} /> : null}
      {/* Pre-sized files: served as they are, no optimizer needed. */}
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        alt={altText}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={imgClass}
      />
    </picture>
  );
}
