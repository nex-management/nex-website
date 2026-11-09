import type {
  MarketContent,
  AboutContent,
  CeoQuote,
  FinancialStrengthContent,
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
  { value: "6", label: "Hotels Across South Florida" },
  { value: "2.48x", label: "Blended Debt Service Coverage" },
];

export const statsFootnote =
  "Portfolio value and room count include owned and managed properties across Florida. Debt service coverage is trailing twelve months through June 2026. Past performance is not a guarantee of future results.";

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
    "Our established lender relationships have historically allowed us to finance up to approximately 75% of total project cost, so investor capital goes further in every acquisition.",
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
      {
        label: "Revenue per available room",
        before: "$52",
        after: "$119",
        beforeWidth: 0.44,
        afterWidth: 1,
      },
    ],
  },
};

export const financialStrength: FinancialStrengthContent = {
  eyebrow: "By the numbers",
  heading: "Portfolio financial strength",
  intro: "Trailing twelve months through June 2026, from property-level P&Ls and current mortgage statements.",
  metrics: [
    { value: "2.48x", label: "Blended DSCR", note: "Banks typically require 1.20x–1.25x" },
    { value: "$6.87M", label: "TTM Portfolio NOI", note: "Up 15.3% from $5.96M" },
    { value: "36.5%", label: "Stabilized NOI Margin", note: "Up from 33.6% prior year" },
    { value: "+9.6%", label: "2026 YTD Revenue Growth", note: "Four stabilized hotels, ADR +11.1%" },
  ],
  charts: [
    {
      title: "Blended debt service coverage",
      caption: "Portfolio DSCR of 2.48x is nearly double the 1.25x lender minimum.",
      format: "multiple",
      max: 3,
      bars: [
        { label: "Bank minimum", value: 1.25, display: "1.25x", emphasis: false },
        { label: "Our blended", value: 2.48, display: "2.48x", emphasis: true },
      ],
    },
    {
      title: "Portfolio NOI growth",
      caption: "Trailing twelve months across the portfolio, up 15.3% year over year.",
      format: "currency",
      max: 8,
      bars: [
        { label: "Prior TTM", value: 5.96, display: "$5.96M", emphasis: false },
        { label: "Current TTM", value: 6.87, display: "$6.87M", emphasis: true },
      ],
    },
    {
      title: "Stabilized NOI margin",
      caption: "Margin rose 2.9 points year over year: more of every revenue dollar reaches the bottom line.",
      format: "percent",
      max: 40,
      bars: [
        { label: "Prior year", value: 33.6, display: "33.6%", emphasis: false },
        { label: "Trailing 12 months", value: 36.5, display: "36.5%", emphasis: true },
      ],
    },
    {
      title: "2026 year-to-date growth",
      caption: "Four stabilized hotels, 2026 year to date versus the same period of 2025.",
      format: "percent",
      max: 12,
      bars: [
        { label: "Revenue", value: 9.6, display: "+9.6%", emphasis: true },
        { label: "Average daily rate", value: 11.1, display: "+11.1%", emphasis: true },
      ],
    },
  ],
  hidden: false,
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
        "Portfolio debt service coverage of 2.48x, nearly double the lender minimum",
        "Lender relationships that have financed up to ~75% of project cost",
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
  scheduleLabel: "Book a private consultation",
};

/**
 * "Where we operate": the portfolio map and how the South Florida hotel
 * market compares with the U.S. Market figures are public STR data –
 * update them once a year (sources below).
 */
export const market: MarketContent = {
  eyebrow: "Where we operate",
  heading: "Six hotels in one of America's strongest hotel markets",
  intro:
    "Our portfolio spans Miami-Dade, Broward and Palm Beach counties: airport, suburban, urban and boutique hotels within an hour's drive of each other, so every property gets hands-on oversight.",
  marketHeading: "South Florida outperforms the national market",
  marketIntro: "Full-year 2025 hotel performance, Greater Miami compared with the United States as a whole.",
  charts: [
    {
      title: "Occupancy",
      caption: "Share of available rooms sold.",
      format: "percent",
      max: 80,
      bars: [
        { label: "United States", value: 62.3, display: "62.3%", emphasis: false },
        { label: "Greater Miami", value: 73.9, display: "73.9%", emphasis: true },
      ],
    },
    {
      title: "Average daily rate",
      caption: "Average price paid per occupied room.",
      format: "usd",
      max: 240,
      bars: [
        { label: "United States", value: 160.54, display: "$160.54", emphasis: false },
        { label: "Greater Miami", value: 224.24, display: "$224.24", emphasis: true },
      ],
    },
    {
      title: "Revenue per available room",
      caption: "Occupancy × average daily rate.",
      format: "usd",
      max: 180,
      bars: [
        { label: "United States", value: 100.02, display: "$100.02", emphasis: false },
        { label: "Greater Miami", value: 165.73, display: "$165.73", emphasis: true },
      ],
    },
  ],
  sources: [
    {
      label: "Greater Miami: STR data via the Greater Miami Convention & Visitors Bureau, January–December 2025",
      href: "https://www.miamiandbeaches.com/getmedia/964e21ca-c90b-427a-b314-bf5118214428/2025_Dec_Greater_Miami-Occupancy_and_ADR.pdf",
    },
    {
      label: "United States: CoStar/STR full-year 2025 results (January 2026)",
      href: "https://www.costar.com/es-la/productos/str-benchmark/recursos/notas-de-prensa/us-hotels-report-first-full-year-occupancy-revpar-declines-2020",
    },
  ],
};
