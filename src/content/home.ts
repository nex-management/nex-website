import type {
  AboutContent,
  CeoQuote,
  PartnerContent,
  Service,
  Stat,
  StrategyPillar,
  Testimonial,
  TrackRecordContent,
} from "./types";

export const hero = {
  eyebrow: "Nex Management · South Florida Hospitality",
  headingLine1: "Built by owners,",
  headingLine2: "run for owners.",
  subheading: "From underperforming to unstoppable.",
  intro:
    "Nex Management is a South Florida-based hospitality company. We own and operate multiple branded hotels, and we partner with hotel owners who want stronger results – whether through professional management, property improvement projects, or strategic acquisitions.",
  primaryCta: { label: "For Investors", href: "/partner#investors" },
  secondaryCta: { label: "For Hotel Owners", href: "/partner#owners" },
};

export const stats: Stat[] = [
  { value: "$100M+", label: "Portfolio Under Management" },
  { value: "700+", label: "Hotel Rooms Managed" },
  { value: "10%+", label: "Average Investor Returns" },
  { value: "3:1", label: "Bank Leverage Ratio" },
];

export const statsFootnote =
  "Portfolio value and room count include owned and managed properties across Florida. Average investor returns are historical and are not a guarantee of future results.";

export const about: AboutContent = {
  eyebrow: "Who We Are",
  heading: "We are hotel owners first.",
  intro:
    "With a portfolio of properties across Miami-Dade, Broward, and Palm Beach counties, we understand what it takes to run a profitable hotel. We have been through the acquisitions, the renovations, the brand compliance, and the day-to-day challenges. That experience is what we bring to every partnership.",
  storyHeading: "Born from ownership experience",
  story:
    "Nex Management was born out of a direct need we experienced as hotel owners ourselves. We saw the gap for a truly dynamic management company — one that could develop hotels, find creative solutions, and drive real results. Because we've been in the owner's seat, we deeply understand what owners need and are relentlessly driven to deliver.",
  differentiators: [
    {
      title: "Owners, not just managers",
      text: "We have skin in the game and we treat every property like our own.",
    },
    {
      title: "Brand and franchise expertise",
      text: "Deep experience with Wyndham brand standards, PIP compliance, and franchise requirements.",
    },
    {
      title: "Direct sourcing relationships",
      text: "FF&E, linens, and room supplies sourced directly – faster, more cost-effective renovations.",
    },
    {
      title: "Local roots",
      text: "A local team with strong roots in the South Florida hospitality market.",
    },
  ],
};

export const servicesIntro = {
  eyebrow: "What We Do",
  heading: "A full-service hospitality platform",
  text: "Built to serve hotel owners and investors — delivering results at every level, from front desk to financials.",
};

export const services: Service[] = [
  {
    slug: "hotel-management",
    title: "Hotel Management",
    description:
      "Full-service operations management for branded and independent hotels. From front desk to financials, we handle it all.",
    details: null,
    icon: "building",
  },
  {
    slug: "acquisitions-due-diligence",
    title: "Acquisitions & Due Diligence",
    description:
      "Thinking about buying a hotel? We provide in-depth due diligence reports so you know exactly what you're getting into before you close.",
    details: null,
    icon: "search",
  },
  {
    slug: "pip-projects",
    title: "PIP Projects",
    description:
      "We manage Property Improvement Plans from start to finish – scope, contractors, brand compliance, and delivery on time and on budget.",
    details: null,
    icon: "house",
  },
  {
    slug: "accounting-services",
    title: "Accounting Services",
    description:
      "Hotel-specific financial reporting, bookkeeping, and oversight designed for owners who want full visibility into their numbers.",
    details: null,
    icon: "ledger",
  },
  {
    slug: "consultation",
    title: "Consultation",
    description:
      "Strategic guidance for hotel owners and investors looking to improve performance, reposition a property, or plan their next move.",
    details: null,
    icon: "compass",
  },
];

export const portfolioIntro = {
  eyebrow: "Our Portfolio",
  heading: "Branded and independent hotels across South Florida",
  text: "We operate branded hotels under Wyndham Hotels & Resorts, with properties in Miami, Plantation, Coral Springs, West Palm Beach and Boynton Beach, alongside independent boutique hotels.",
};

export const strategyPillars: StrategyPillar[] = [
  {
    title: "Boutique Excellence",
    text: "Premium properties focused on high ADR and guest experience.",
    icon: "star",
  },
  {
    title: "Airport Efficiency",
    text: "High-occupancy properties near major transportation hubs.",
    icon: "plane",
  },
  {
    title: "Family Value",
    text: "Strong market demand with stable year-round performance.",
    icon: "family",
  },
];

export const trackRecord: TrackRecordContent = {
  eyebrow: "Track Record",
  heading: "Measurable change from the very first month",
  intro:
    "We currently manage a $100M+ portfolio with over 700 hotel rooms across Florida. Our performance speaks for itself.",
  bankHeading: "Powerful bank partnerships",
  bankText:
    "Our established banking relationships allow us to secure 3:1 leverage on every investment dollar. A $100K investment becomes $400K in acquisition power, amplifying potential returns and deal opportunities.",
  caseStudy: {
    propertyName: null,
    period: "first 6 months under Nex management",
    metrics: [
      {
        label: "Occupancy rate",
        before: "55%",
        after: "85%",
        beforeWidth: 0.55,
        afterWidth: 0.85,
      },
      {
        label: "Average daily rate",
        before: "$95",
        after: "$140",
        beforeWidth: 0.68,
        afterWidth: 1,
      },
    ],
  },
};

export const ceoQuote: CeoQuote = {
  quote:
    "Our mission is simple: create measurable positive change from the very first month of management. We are relentlessly focused on execution and results.",
  name: "M. Zeigen",
  title: "Chief Executive Officer, Nex Management",
  photo: {
    src: "/images/team/m-zeigen.jpg",
    alt: "M. Zeigen, Chief Executive Officer of Nex Management",
    width: 800,
    height: 1000,
  },
};

export const partner: PartnerContent = {
  eyebrow: "Investment & Partnership",
  heading: "Two ways to work with Nex",
  intro:
    "We work with investors seeking exposure to professionally managed hotel assets, and with hotel owners who want a management partner with skin in the game.",
  tracks: [
    {
      eyebrow: "For Investors",
      heading: "Invest in a portfolio of expertly managed hotel assets",
      text: "Access a portfolio of professionally managed and appreciating hotel assets, backed by established banking relationships. Join our investor community.",
      bullets: [
        "10%+ average investor returns",
        "3:1 bank leverage on every dollar invested",
        "Owners who invest alongside you",
      ],
      cta: { label: "Explore investments", href: "/contact?topic=invest" },
      variant: "primary",
    },
    {
      eyebrow: "For Hotel Owners",
      heading: "A management partner that delivers from month one",
      text: "Partner with a professional management team that delivers immediate results, increased profitability, and complete peace of mind.",
      bullets: [
        "Results from month one",
        "Access to capital for renovations and expansions",
        "Wyndham brand standards and PIP expertise",
      ],
      cta: { label: "Discuss a partnership", href: "/contact?topic=management" },
      variant: "secondary",
    },
  ],
  closingLine: "Ready to get started? Schedule a private consultation.",
};

export const testimonialsIntro = {
  eyebrow: "What Our Partners Say",
  heading: "Trusted by owners across South Florida",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Nex delivered on their promise from day one. Our revenue is up 40% and our operational headaches are gone. A true game-changer.",
    name: null,
    role: "Hotel Owner, South Florida",
    company: null,
  },
  {
    quote:
      "The professionalism and transparency of their team are unmatched. We finally have clear insight into our property's performance and a strategy that works.",
    name: "Jacob B.",
    role: "Property Owner",
    company: null,
  },
  {
    quote:
      "We were skeptical, but the results are undeniable. They turned our underperforming hotel into a local market leader in under a year. I'd recommend them to any owner.",
    name: "M. Jilau",
    role: "Asset Manager",
    company: null,
  },
];

export const video = {
  eyebrow: "See Our Impact",
  heading: "Watch how we transform properties",
  text: "Our story, in the words of the people who run our hotels every day.",
  buttonLabel: "Watch our story",
};

export const contact = {
  eyebrow: "Let's Talk",
  heading: "We'd love to connect.",
  text: "Whether you're looking for a management partner, exploring an acquisition, or need guidance on a PIP project – reach out and we'll get back to you promptly.",
  scheduleHeading: "Prefer to schedule directly?",
  scheduleLabel: "Book a private consultation →",
};
