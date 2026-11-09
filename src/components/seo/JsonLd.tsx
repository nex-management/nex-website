import type { Hotel, SiteSettings, TeamMember } from "@/content/types";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

type JsonLdData = Record<string, unknown>;

/** Renders structured data for search engines (schema.org JSON-LD). */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped so a "<" in content can never close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(items.length === 1 ? items[0] : items).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const ORGANIZATION_ID = `${siteUrl}/#organization`;

export function organizationJsonLd(site: SiteSettings): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORGANIZATION_ID,
    name: site.brandName,
    legalName: site.legalName,
    url: `${siteUrl}/`,
    logo: absoluteUrl("/images/brand/nex-logo.png"),
    description: site.seo.description,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.line2.replace(/,.*$/, ""),
      addressRegion: "FL",
      postalCode: site.address.line2.match(/\d{5}/)?.[0] ?? undefined,
      addressCountry: "US",
    },
    areaServed: ["Miami-Dade County", "Broward County", "Palm Beach County"],
    ...(site.linkedinUrl ? { sameAs: [site.linkedinUrl] } : {}),
  };
}

export function webSiteJsonLd(site: SiteSettings): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.brandName,
    url: `${siteUrl}/`,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** The hotel's page, described as being *about* the hotel (no booking claims: Nex manages it, it doesn't sell rooms here). */
export function hotelPageJsonLd(hotel: Hotel, description: string): JsonLdData {
  const [streetAddress, locality, regionZip] = hotel.address.split(",").map((s) => s.trim());
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`/portfolio/${hotel.slug}`),
    url: absoluteUrl(`/portfolio/${hotel.slug}`),
    name: hotel.name.includes(hotel.city) ? hotel.name : `${hotel.name} – ${hotel.city}`,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: {
      "@type": "Hotel",
      name: hotel.name,
      ...(hotel.image ? { image: absoluteUrl(hotel.image.src) } : {}),
      address: {
        "@type": "PostalAddress",
        streetAddress,
        addressLocality: locality ?? hotel.city,
        addressRegion: "FL",
        ...(regionZip?.match(/\d{5}/) ? { postalCode: regionZip.match(/\d{5}/)![0] } : {}),
        addressCountry: "US",
      },
      ...(hotel.brand ? { brand: { "@type": "Brand", name: hotel.brand } } : {}),
      ...(hotel.rooms ? { numberOfRooms: hotel.rooms } : {}),
    },
  };
}

export function personJsonLd(member: TeamMember): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    worksFor: { "@id": ORGANIZATION_ID },
    ...(member.photo.src ? { image: absoluteUrl(member.photo.src) } : {}),
    ...(member.linkedinUrl ? { sameAs: [member.linkedinUrl] } : {}),
  };
}
