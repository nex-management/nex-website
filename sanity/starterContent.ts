/**
 * Builds the Sanity documents for the content that currently lives in
 * src/content/ – used by the "Starter content" tool in the Studio so the
 * editing panel starts out filled in instead of empty.
 */
import { services, stats, statsFootnote, testimonials } from "@/content/home";
import { hotels } from "@/content/hotels";
import { site } from "@/content/site";
import { team } from "@/content/team";

export type StarterDocument = { _id: string; _type: string } & Record<string, unknown>;

/** Drops null/undefined fields so they don't end up as empty values in Sanity. */
function compact<T extends Record<string, unknown>>(doc: T): T {
  return Object.fromEntries(Object.entries(doc).filter(([, v]) => v !== null && v !== undefined)) as T;
}

export const SITE_SETTINGS_ID = "siteSettings";

export function starterSiteSettings(): StarterDocument {
  return compact({
    _id: SITE_SETTINGS_ID,
    _type: "siteSettings",
    email: site.email,
    phone: site.phone,
    addressLine1: site.address.line1,
    addressLine2: site.address.line2,
    schedulingUrl: site.schedulingUrl,
    linkedinUrl: site.linkedinUrl,
    investorLoginUrl: site.investorLoginUrl,
    videoUrl: site.videoUrl,
    stats: stats.map((s, i) => ({ _key: `stat-${i + 1}`, _type: "stat", value: s.value, label: s.label })),
    statsAsOf: site.statsAsOf,
    statsFootnote,
    seoTitle: site.seo.title,
    seoDescription: site.seo.description,
    legalName: site.legalName,
    feiNumber: site.feiNumber,
    legalDisclaimer: site.legalDisclaimer,
    showPlaceholders: site.showPlaceholders,
  });
}

export function starterHotels(): StarterDocument[] {
  return hotels.map((h, i) =>
    compact({
      _id: `hotel-${h.slug}`,
      _type: "hotel",
      name: h.name,
      slug: { _type: "slug", current: h.slug },
      type: h.type,
      address: h.address,
      city: h.city,
      brand: h.brand,
      rooms: h.rooms,
      managedSince: h.managedSince,
      ownership: h.ownership,
      highlights: h.highlights,
      description: h.description,
      order: i + 1,
      hidden: false,
    }),
  );
}

/** Team members; the photo is attached by the tool after it uploads the file at `photoPath`. */
export function starterTeam(): { doc: StarterDocument; photoPath: string; photoFilename: string }[] {
  return team.map((m, i) => ({
    photoPath: m.photo.src,
    photoFilename: `${m.slug}.jpg`,
    doc: compact({
      _id: `teamMember-${m.slug}`,
      _type: "teamMember",
      name: m.name,
      slug: { _type: "slug", current: m.slug },
      title: m.title,
      group: m.group,
      bio: m.bio,
      email: m.email,
      linkedinUrl: m.linkedinUrl,
      perspective: m.perspective,
      order: i + 1,
      hidden: false,
    }),
  }));
}

export function starterTestimonials(): StarterDocument[] {
  return testimonials.map((t, i) =>
    compact({
      _id: `testimonial-${i + 1}`,
      _type: "testimonial",
      quote: t.quote,
      name: t.name,
      role: t.role,
      company: t.company,
      approved: true,
      order: i + 1,
    }),
  );
}

export function starterServices(): StarterDocument[] {
  return services.map((s, i) =>
    compact({
      _id: `service-${s.slug}`,
      _type: "service",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      description: s.description,
      details: s.details,
      icon: s.icon,
      order: i + 1,
    }),
  );
}
