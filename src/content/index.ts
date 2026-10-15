/**
 * Content access layer.
 *
 * Components import from here only. When Sanity is connected
 * (NEXT_PUBLIC_SANITY_PROJECT_ID is set), the editable content – site
 * settings, hotels, team, testimonials, services – is read from Sanity and
 * mapped to the shapes in ./types.ts. Otherwise it comes from the local files
 * in this folder. Section copy (about, partner, contact…) lives in ./home.ts
 * either way.
 */
import { cacheLife, cacheTag } from "next/cache";
import * as home from "./home";
import { hotelTypes, hotels as localHotels } from "./hotels";
import { footerNav, mainNav, site as localSite } from "./site";
import { careers, perspectivesIntro, team as localTeam, teamGroups, teamIntro } from "./team";
import type { ComparisonChart, FinancialStrengthContent, Hotel, ImageRef, Service, SiteSettings, TeamMember, Testimonial } from "./types";
import { client, urlFor } from "@/sanity/client";
import {
  financialStrengthQuery,
  hotelBySlugQuery,
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
    image: imageRef(h.image as SanityImage, 1200, 750, String(h.name ?? "")),
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
    heroImage: imageRef(s.heroImage as SanityImage, 2400, 1350, "Nex Management hotel"),
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
    showPlaceholders: typeof s.showPlaceholders === "boolean" ? s.showPlaceholders : localSite.showPlaceholders,
  };
}

/** Tag shared by every Sanity read; `revalidateTag(SANITY_TAG, "max")` refreshes all of it on demand. */
export const SANITY_TAG = "sanity";

/**
 * Runs a GROQ query through Next's cache so the result can be prerendered
 * into the static pages. Refreshes in the background about once an hour, or
 * immediately when the "sanity" tag is revalidated (see /api/revalidate).
 */
async function cachedQuery<T>(query: string, params: Record<string, string>): Promise<T | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(SANITY_TAG);
  if (!client) return null;
  return (await client.fetch<T>(query, params)) ?? null;
}

async function fetchOrNull<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await cachedQuery<T>(query, params);
  } catch (error) {
    console.error("Sanity fetch failed, falling back to local content:", error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  const s = await fetchOrNull<Record<string, unknown>>(siteSettingsQuery);
  return s ? mapSettings(s) : localSite;
}

export function getNavigation() {
  return { main: mainNav, footer: footerNav };
}

export function getHomeContent() {
  return home;
}

export async function getStats(): Promise<{ stats: { value: string; label: string }[]; footnote: string }> {
  const s = await fetchOrNull<Record<string, unknown>>(siteSettingsQuery);
  const stats = s && Array.isArray(s.stats) && s.stats.length ? (s.stats as { value: string; label: string }[]) : home.stats;
  const footnote = (s?.statsFootnote as string) || home.statsFootnote;
  return { stats, footnote };
}

export async function getHotels(): Promise<Hotel[]> {
  const rows = await fetchOrNull<Record<string, unknown>[]>(hotelsQuery);
  return rows && rows.length ? rows.map(mapHotel) : localHotels;
}

export async function getHotel(slug: string): Promise<Hotel | null> {
  if (client) {
    const row = await fetchOrNull<Record<string, unknown>>(hotelBySlugQuery, { slug });
    if (row) return mapHotel(row);
  }
  return localHotels.find((h) => h.slug === slug) ?? null;
}

export function getHotelTypes() {
  return hotelTypes;
}

export async function getTeam(): Promise<TeamMember[]> {
  const rows = await fetchOrNull<Record<string, unknown>[]>(teamQuery);
  return rows && rows.length ? rows.map(mapTeamMember).filter((m) => m.photo.src) : localTeam;
}

export function getTeamPageContent() {
  return { teamIntro, teamGroups, perspectivesIntro, careers };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await fetchOrNull<Record<string, unknown>[]>(testimonialsQuery);
  if (rows && rows.length) {
    return rows.map((t) => ({
      quote: String(t.quote ?? ""),
      name: (t.name as string) || null,
      role: String(t.role ?? ""),
      company: (t.company as string) || null,
    }));
  }
  return home.testimonials;
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
  const s = await fetchOrNull<Record<string, unknown>>(financialStrengthQuery);
  if (!s) return local;
  const metrics = Array.isArray(s.metrics) ? (s.metrics as Record<string, unknown>[]) : [];
  const charts = Array.isArray(s.charts) ? (s.charts as Record<string, unknown>[]) : [];
  return {
    eyebrow: local.eyebrow,
    heading: (s.heading as string) || local.heading,
    intro: (s.intro as string) || local.intro,
    metrics: metrics.length
      ? metrics.map((m) => ({ value: String(m.value ?? ""), label: String(m.label ?? ""), note: (m.note as string) || null }))
      : local.metrics,
    charts: charts.length ? charts.map(mapChart) : local.charts,
    hidden: s.hidden === true,
  };
}

export async function getServices(): Promise<Service[]> {
  const rows = await fetchOrNull<Record<string, unknown>[]>(servicesQuery);
  if (rows && rows.length) {
    return rows.map((s) => ({
      slug: String(s.slug ?? ""),
      title: String(s.title ?? ""),
      description: String(s.description ?? ""),
      details: (s.details as string) || null,
      icon: (s.icon as Service["icon"]) ?? "building",
    }));
  }
  return home.services;
}
