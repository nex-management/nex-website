/**
 * Content access layer.
 *
 * Components import from here only. When Sanity is connected
 * (NEXT_PUBLIC_SANITY_PROJECT_ID is set), the editable content – site
 * settings, hotels, team, testimonials, services – is read from Sanity and
 * mapped to the shapes in ./types.ts. Otherwise it comes from the local files
 * in this folder. Section copy (about, partner, contact…) lives in ./home.ts
 * either way.
 *
 * Fallback rule: the local files are used only until the Sanity dataset has
 * been filled in (the "Site settings" document exists – the Starter content
 * tool creates it). From then on Sanity is the single source of truth, so a
 * hotel or testimonial removed in the Studio really disappears from the site
 * instead of the local copy coming back.
 */
import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import * as home from "./home";
import { hotelTypes, hotels as localHotels } from "./hotels";
import { footerNav, mainNav, site as localSite } from "./site";
import { careers, perspectivesIntro, team as localTeam, teamGroups, teamIntro } from "./team";
import type {
  ComparisonChart,
  FinancialStrengthContent,
  Hotel,
  HotelType,
  ImageRef,
  Service,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "./types";
import { client, urlFor } from "@/sanity/client";
import {
  financialStrengthQuery,
  hotelsQuery,
  servicesQuery,
  siteSettingsQuery,
  teamQuery,
  testimonialsQuery,
} from "@/sanity/queries";

export type { FinancialStrengthContent, Hotel, Service, SiteSettings, TeamMember, Testimonial } from "./types";

// ---------------------------------------------------------------------------
// Sanity → site shapes
// ---------------------------------------------------------------------------

type SanityImage = { asset?: { _ref?: string }; alt?: string } | null | undefined;

function imageRef(img: SanityImage, width: number, height: number, altFallback = ""): ImageRef | null {
  if (!img?.asset?._ref) return null;
  // Sanity's CDN resizes and converts the image itself, so Next's optimizer is skipped.
  return { src: urlFor(img, width, height), alt: img.alt ?? altFallback, width, height, unoptimized: true };
}

/** The homepage opening image: two sizes so phones don't download the 2400px file. */
function heroImageRef(img: SanityImage): ImageRef | null {
  const ref = imageRef(img, 2400, 1350, "");
  if (!ref) return null;
  return { ...ref, srcSet: `${urlFor(img!, 1200, 675)} 1200w, ${urlFor(img!, 2400, 1350)} 2400w` };
}

/** Hotel card/page photo: two sizes so cards don't download the large file. */
function hotelImageRef(img: SanityImage, altFallback: string): ImageRef | null {
  const ref = imageRef(img, 1200, 750, altFallback);
  if (!ref) return null;
  return { ...ref, srcSet: `${urlFor(img!, 600, 375)} 600w, ${urlFor(img!, 1200, 750)} 1200w` };
}

function mapHotel(h: Record<string, unknown>): Hotel {
  const gallery = Array.isArray(h.gallery) ? (h.gallery as SanityImage[]) : [];
  return {
    slug: String(h.slug ?? ""),
    name: String(h.name ?? ""),
    type: (h.type as Hotel["type"]) ?? "Suburban",
    address: String(h.address ?? ""),
    city: String(h.city ?? ""),
    brand: (h.brand as string) || null,
    highlights: Array.isArray(h.highlights) ? (h.highlights as string[]) : [],
    description: (h.description as string) || null,
    image: hotelImageRef(h.image as SanityImage, String(h.name ?? "")),
    gallery: gallery.map((g) => imageRef(g, 1200, 750, String(h.name ?? ""))).filter((g): g is ImageRef => g !== null),
    rooms: typeof h.rooms === "number" ? h.rooms : null,
    managedSince: typeof h.managedSince === "number" ? h.managedSince : null,
    ownership: (h.ownership as Hotel["ownership"]) ?? null,
  };
}

function mapTeamMember(m: Record<string, unknown>): TeamMember {
  const name = String(m.name ?? "");
  return {
    slug: String(m.slug ?? ""),
    name,
    shortName: name,
    title: String(m.title ?? ""),
    bio: String(m.bio ?? ""),
    photo: imageRef(m.photo as SanityImage, 800, 1000, `${name}, ${String(m.title ?? "")}`) ?? {
      src: "",
      alt: name,
    },
    group: (m.group as TeamMember["group"]) ?? "operations",
    email: (m.email as string) || null,
    linkedinUrl: (m.linkedinUrl as string) || null,
    perspective: (m.perspective as string) || null,
  };
}

function mapSettings(s: Record<string, unknown>): SiteSettings {
  return {
    ...localSite,
    email: (s.email as string) || localSite.email,
    phone: (s.phone as string) || null,
    address: {
      line1: (s.addressLine1 as string) || localSite.address.line1,
      line2: (s.addressLine2 as string) || localSite.address.line2,
    },
    schedulingUrl: (s.schedulingUrl as string) || null,
    linkedinUrl: (s.linkedinUrl as string) || null,
    investorLoginUrl: (s.investorLoginUrl as string) || null,
    heroImage: heroImageRef(s.heroImage as SanityImage),
    videoUrl: (s.videoUrl as string) || null,
    videoPoster: imageRef(s.videoPoster as SanityImage, 1600, 900),
    statsAsOf: (s.statsAsOf as string) || null,
    seo: {
      title: (s.seoTitle as string) || localSite.seo.title,
      description: (s.seoDescription as string) || localSite.seo.description,
    },
    legalName: (s.legalName as string) || localSite.legalName,
    feiNumber: (s.feiNumber as string) || localSite.feiNumber,
    legalDisclaimer: (s.legalDisclaimer as string) || localSite.legalDisclaimer,
  };
}

/** Tag shared by every Sanity read; `revalidateTag(SANITY_TAG, …)` refreshes all of it on demand. */
export const SANITY_TAG = "sanity";

/**
 * Runs a GROQ query through Next's cache so the result can be prerendered
 * into the static pages. Refreshes in the background about once an hour
 * (see the "content" cache profile in next.config.ts), or immediately when
 * the "sanity" tag is revalidated by the webhook (see /api/revalidate).
 *
 * Errors are not swallowed on purpose: a failed refresh keeps serving the
 * last good content, and a failed build fails loudly instead of quietly
 * publishing the local files over the client's edits.
 */
async function cachedQuery<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  "use cache";
  cacheLife("content");
  cacheTag(SANITY_TAG);
  if (!client) return null;
  try {
    return (await client.fetch<T>(query, params)) ?? null;
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    throw error;
  }
}

/** Site settings document, or null when Sanity isn't connected / not filled in yet. */
async function sanitySettings(): Promise<Record<string, unknown> | null> {
  if (!client) return null;
  return cachedQuery<Record<string, unknown>>(siteSettingsQuery);
}

/** True once the Sanity dataset holds the Site settings document – from then on Sanity is the only source. */
async function isLive(): Promise<boolean> {
  return (await sanitySettings()) !== null;
}

/**
 * Reads a list from Sanity. Before the dataset is filled in, the local list
 * is used; afterwards the Sanity result stands even when it is empty.
 */
async function listOrLocal<T>(query: string, map: (row: Record<string, unknown>) => T, local: T[]): Promise<T[]> {
  if (!client) return local;
  const rows = await cachedQuery<Record<string, unknown>[]>(query);
  if (rows && rows.length) return rows.map(map);
  return (await isLive()) ? [] : local;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  const s = await sanitySettings();
  return s ? mapSettings(s) : localSite;
}

export function getNavigation() {
  return { main: mainNav, footer: footerNav };
}

/** Year shown in the footer's copyright line (refreshed with the content cache). */
export async function getCopyrightYear(): Promise<number> {
  "use cache";
  cacheLife("content");
  return Math.max(2026, new Date().getFullYear());
}

export function getHomeContent() {
  return home;
}

export async function getStats(): Promise<{ stats: { value: string; label: string }[]; footnote: string }> {
  const s = await sanitySettings();
  // Once Site settings exist in Sanity, its list stands (an empty list hides the band).
  const stats = s ? (Array.isArray(s.stats) ? (s.stats as { value: string; label: string }[]) : []) : home.stats;
  const footnote = (s?.statsFootnote as string) || home.statsFootnote;
  return { stats, footnote };
}

export async function getHotels(): Promise<Hotel[]> {
  return listOrLocal(hotelsQuery, mapHotel, localHotels);
}

/** One hotel by its web address; hidden hotels are not found, like deleted ones. */
export async function getHotel(slug: string): Promise<Hotel | null> {
  const hotels = await getHotels();
  return hotels.find((h) => h.slug === slug) ?? null;
}

/** The hotel types that actually occur in the portfolio, in the site's fixed order (for the filter buttons). */
export function getHotelTypes(hotels: Hotel[]): HotelType[] {
  return hotelTypes.filter((type) => hotels.some((h) => h.type === type));
}

export async function getTeam(): Promise<TeamMember[]> {
  const members = await listOrLocal(teamQuery, mapTeamMember, localTeam);
  return members.filter((m) => m.photo.src);
}

export function getTeamPageContent() {
  return { teamIntro, teamGroups, perspectivesIntro, careers };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return listOrLocal(
    testimonialsQuery,
    (t) => ({
      quote: String(t.quote ?? ""),
      name: (t.name as string) || null,
      role: String(t.role ?? ""),
      company: (t.company as string) || null,
    }),
    home.testimonials,
  );
}

function mapChart(c: Record<string, unknown>): ComparisonChart {
  const bars = Array.isArray(c.bars) ? (c.bars as Record<string, unknown>[]) : [];
  return {
    title: String(c.title ?? ""),
    caption: String(c.caption ?? ""),
    format: (c.format as ComparisonChart["format"]) ?? "multiple",
    max: typeof c.max === "number" ? c.max : 0,
    bars: bars.map((b) => ({
      label: String(b.label ?? ""),
      value: typeof b.value === "number" ? b.value : 0,
      display: String(b.display ?? b.value ?? ""),
      emphasis: b.emphasis === true,
    })),
  };
}

export async function getFinancialStrength(): Promise<FinancialStrengthContent> {
  const local = home.financialStrength;
  const s = client ? await cachedQuery<Record<string, unknown>>(financialStrengthQuery) : null;
  if (!s) return local;
  const metrics = Array.isArray(s.metrics) ? (s.metrics as Record<string, unknown>[]) : [];
  const charts = Array.isArray(s.charts) ? (s.charts as Record<string, unknown>[]) : [];
  return {
    eyebrow: local.eyebrow,
    heading: (s.heading as string) || local.heading,
    intro: (s.intro as string) || local.intro,
    metrics: metrics.map((m) => ({ value: String(m.value ?? ""), label: String(m.label ?? ""), note: (m.note as string) || null })),
    charts: charts.map(mapChart),
    hidden: s.hidden === true,
  };
}

export async function getServices(): Promise<Service[]> {
  return listOrLocal(
    servicesQuery,
    (s) => ({
      slug: String(s.slug ?? ""),
      title: String(s.title ?? ""),
      description: String(s.description ?? ""),
      details: (s.details as string) || null,
      icon: (s.icon as Service["icon"]) ?? "building",
    }),
    home.services,
  );
}
