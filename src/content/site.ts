import type { NavItem, SiteSettings } from "./types";

export const site: SiteSettings = {
  brandName: "Nex Management",
  legalName: "NEXGROUPE MANAGEMENT FL LLC",
  feiNumber: "99-2787781",
  tagline: "Built by owners, run for owners.",
  shortDescription: "South Florida hospitality ownership and management.",
  seo: {
    title: "Nex Management – Built by owners, run for owners.",
    description:
      "Nex Management is a South Florida hospitality company that owns and operates branded hotels and partners with hotel owners through professional management, property improvement projects, and strategic acquisitions.",
  },
  address: {
    line1: "11030 SW 54th St",
    line2: "Davie, FL 33328",
  },
  email: "mendy@nex-mgmt.com",
  phone: null,
  schedulingUrl: null,
  linkedinUrl: null,
  investorLoginUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=iqNkrzyD-As",
  videoPoster: null,
  // Homepage opening image (AI-generated placeholder until a photo of a Nex hotel is supplied;
  // replaceable in the Studio under Site settings → Homepage media). Two sizes so phones load the small one.
  heroImage: {
    src: "/images/hero/hotel-dusk-1776.jpg",
    srcSet: "/images/hero/hotel-dusk-1200.jpg 1200w, /images/hero/hotel-dusk-1776.jpg 1776w",
    srcSetWebp: "/images/hero/hotel-dusk-1200.webp 1200w, /images/hero/hotel-dusk-1776.webp 1776w",
    alt: "",
    width: 1776,
    height: 896,
    unoptimized: true,
  },
  statsAsOf: null,
  legalDisclaimer:
    "This website is for informational purposes only. All investment opportunities involve risk. Please consult a financial advisor before making any investment decisions.",
};

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Team", href: "/team" },
  { label: "Partner With Us", href: "/partner" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: mainNav,
  investors: [
    { label: "Investment opportunities", href: "/partner#investors" },
    { label: "Investor Login", href: "#investor-login" },
    { label: "Schedule a call", href: "/contact" },
  ] satisfies NavItem[],
};
