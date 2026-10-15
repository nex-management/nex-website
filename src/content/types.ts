/**
 * Content model for the Nex Management site.
 *
 * Everything the client will eventually edit in Sanity is described here.
 * The local data files in this folder implement these types today; when
 * Sanity is connected, `src/content/index.ts` swaps the source and the
 * components stay untouched.
 */

export type ImageRef = {
  /** Public path (e.g. "/images/team/m-zeigen.jpg") or a remote URL. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** True for images an image CDN (Sanity) already serves resized – skips Next's own optimizer. */
  unoptimized?: boolean;
};

export type Link = {
  label: string;
  href: string;
  external?: boolean;
};

export type SiteSettings = {
  /** Lead brand name used everywhere on the site. */
  brandName: string;
  /** Legal entity shown in the footer only. */
  legalName: string;
  /** Tax ID shown in the footer only. */
  feiNumber: string;
  tagline: string;
  shortDescription: string;
  seo: {
    title: string;
    description: string;
  };
  address: {
    line1: string;
    line2: string;
  };
  email: string;
  phone: string | null;
  /** Booking link (Calendly or similar). null = button hidden / placeholder. */
  schedulingUrl: string | null;
  /** Company LinkedIn page. null = link hidden / placeholder. */
  linkedinUrl: string | null;
  /** Investor portal. null = shown as "coming soon". */
  investorLoginUrl: string | null;
  /** YouTube watch URL for the "See our impact" section. */
  videoUrl: string | null;
  /** Optional poster shown before the video plays. */
  videoPoster: ImageRef | null;
  /** Optional full-bleed photo or still for the homepage opening. */
  heroImage: ImageRef | null;
  /** "As of" date for the key figures, e.g. "June 2026". */
  statsAsOf: string | null;
  legalDisclaimer: string;
  copyrightYear: number;
  /**
   * While true, missing content is rendered as visible bracketed placeholders
   * (e.g. "[PHONE NUMBER]") so reviewers can see what is still pending.
   * Set to false at launch.
   */
  showPlaceholders: boolean;
};

export type NavItem = Link & { current?: boolean };

export type Stat = {
  value: string;
  label: string;
};

export type Differentiator = {
  title: string;
  text: string;
};

export type AboutContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  storyHeading: string;
  story: string;
  differentiators: Differentiator[];
};

export type ServiceIcon = "building" | "search" | "house" | "ledger" | "compass";

export type Service = {
  slug: string;
  title: string;
  description: string;
  /** Longer paragraph for the Services page. */
  details: string | null;
  icon: ServiceIcon;
};

export type HotelType = "Airport" | "Suburban" | "Urban" | "Boutique";

export type Hotel = {
  slug: string;
  name: string;
  type: HotelType;
  address: string;
  city: string;
  /** Brand / franchise, e.g. "Wyndham Hotels & Resorts". null = independent. */
  brand: string | null;
  highlights: string[];
  description: string | null;
  image: ImageRef | null;
  gallery: ImageRef[];
  rooms: number | null;
  managedSince: number | null;
  ownership: "Owned" | "Managed" | null;
};

export type StrategyPillar = {
  title: string;
  text: string;
  icon: "star" | "plane" | "family";
};

export type CaseStudyMetric = {
  label: string;
  before: string;
  after: string;
  /** Bar widths as a fraction of the track, 0–1. */
  beforeWidth: number;
  afterWidth: number;
};

export type TrackRecordContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  bankHeading: string;
  bankText: string;
  caseStudy: {
    propertyName: string | null;
    period: string;
    metrics: CaseStudyMetric[];
  };
};

export type TeamGroup = "leadership" | "operations";

export type TeamMember = {
  slug: string;
  name: string;
  /** Short name used in the "In their words" section. */
  shortName: string;
  title: string;
  bio: string;
  photo: ImageRef;
  group: TeamGroup;
  email: string | null;
  linkedinUrl: string | null;
  /** Long-form perspective shown on the Team page. */
  perspective: string | null;
};

export type CeoQuote = {
  quote: string;
  name: string;
  title: string;
  photo: ImageRef;
};

export type Testimonial = {
  quote: string;
  /** null = name still to be confirmed with the client. */
  name: string | null;
  role: string;
  company: string | null;
};

export type PartnerTrack = {
  eyebrow: string;
  heading: string;
  text: string;
  bullets: string[];
  cta: Link;
  variant: "primary" | "secondary";
};

export type PartnerContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  tracks: PartnerTrack[];
  closingLine: string;
};
