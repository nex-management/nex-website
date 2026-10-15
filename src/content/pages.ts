/**
 * Copy for the inner pages (About, Services, Portfolio, Partner, Contact).
 * Everything here is drawn from the company's existing texts; facts that are
 * still pending from the client are marked as placeholders by the components.
 */

export const aboutPage = {
  eyebrow: "About Nex Management",
  heading: "Hotel owners first. Operators by necessity, partners by choice.",
  intro:
    "Nex Management is a South Florida-based hospitality company. We own and operate branded hotels across Miami-Dade, Broward, and Palm Beach counties, and we partner with hotel owners who want stronger results – through professional management, property improvement projects, or strategic acquisitions.",
  story: {
    eyebrow: "Our story",
    heading: "Born from ownership experience",
    paragraphs: [
      "Nex Management was born out of a direct need we experienced as hotel owners ourselves. We saw the gap for a truly dynamic management company — one that could develop hotels, find creative solutions, and drive real results.",
      "Because we've been in the owner's seat, we deeply understand what owners need and are relentlessly driven to deliver. We have been through the acquisitions, the renovations, the brand compliance, and the day-to-day challenges. That experience is what we bring to every partnership.",
    ],
  },
  approach: {
    eyebrow: "How we work",
    heading: "What partnering with Nex means",
    intro: "Partnering with Nex means unlocking a new level of performance and profitability for your hotel asset.",
  },
  values: {
    eyebrow: "What we believe",
    heading: "Transparency, integrity, accountability",
    text: "We believe successful partnerships are built on transparency, integrity, and accountability — communicating openly, making decisions with our owners' best interests in mind, and never making promises we can't keep.",
  },
  cta: {
    heading: "Meet the people behind Nex",
    text: "Our leadership team brings decades of combined experience in hospitality operations, real estate, and financial management.",
    button: { label: "Meet the team", href: "/team" },
  },
};

export const servicesPage = {
  eyebrow: "Services",
  heading: "A full-service hospitality platform",
  intro:
    "Built to serve hotel owners and investors — delivering results at every level, from front desk to financials. Engage us for a single project or for complete, hands-on management of your property.",
  approach: {
    eyebrow: "Why it works",
    heading: "Owners, not just managers",
    bullets: [
      "We have skin in the game and we treat every property like our own.",
      "Deep experience with Wyndham brand standards, PIP compliance, and franchise requirements.",
      "Direct sourcing relationships for FF&E, linens, and room supplies – faster, more cost-effective renovations.",
      "A local team with strong roots in the South Florida hospitality market.",
    ],
  },
  cta: {
    heading: "Tell us about your property",
    text: "Whether you're looking for a management partner, exploring an acquisition, or need guidance on a PIP project – we'd love to connect.",
    button: { label: "Get in touch", href: "/contact" },
  },
};

export const portfolioPage = {
  eyebrow: "Portfolio",
  heading: "Branded and independent hotels across South Florida",
  intro:
    "We operate branded hotels under Wyndham Hotels & Resorts, with properties in Miami, Plantation, Coral Springs, West Palm Beach and Boynton Beach, alongside independent boutique hotels. Our portfolio includes both branded and independent hotels serving the South Florida market.",
  strategyHeading: "Diversified portfolio strategy",
  cta: {
    heading: "Own a hotel in South Florida?",
    text: "We partner with owners who want a management team with ownership experience and skin in the game.",
    button: { label: "Discuss a partnership", href: "/contact?topic=management" },
  },
};

export const hotelPage = {
  backLabel: "← All properties",
  factsHeading: "At a glance",
  highlightsHeading: "Our focus at this property",
  galleryHeading: "Photos",
  cta: {
    heading: "Interested in this property or in working with Nex?",
    button: { label: "Contact us", href: "/contact" },
  },
};

export const partnerPage = {
  eyebrow: "Partner With Us",
  heading: "Two ways to work with Nex",
  intro:
    "We work with investors seeking exposure to professionally managed hotel assets, and with hotel owners who want a management partner with skin in the game.",
  investors: {
    id: "investors",
    eyebrow: "For Investors",
    heading: "Invest in a portfolio of expertly managed hotel assets",
    paragraphs: [
      "Access a portfolio of professionally managed and appreciating hotel assets, backed by established banking relationships. Join our investor community.",
      "Our established banking relationships allow us to secure 3:1 leverage on every investment dollar. A $100K investment becomes $400K in acquisition power, amplifying potential returns and deal opportunities.",
    ],
    bullets: ["10%+ average investor returns", "3:1 bank leverage on every dollar invested", "Owners who invest alongside you"],
    cta: { label: "Explore investments", href: "/contact?topic=invest" },
  },
  owners: {
    id: "owners",
    eyebrow: "For Hotel Owners",
    heading: "A management partner that delivers from month one",
    paragraphs: [
      "Partner with a professional management team that delivers immediate results, increased profitability, and complete peace of mind.",
      "Need renovations or expansions? We bring the financing power to fund your property improvements, and the brand and franchise expertise to deliver them on time and on budget.",
    ],
    bullets: ["Results from month one", "Access to capital for renovations and expansions", "Wyndham brand standards and PIP expertise"],
    cta: { label: "Discuss a partnership", href: "/contact?topic=management" },
  },
  process: {
    eyebrow: "What to expect",
    heading: "From first call to first month",
    steps: [
      { title: "Introduction", text: "A short call to understand your property or investment goals and whether we're the right fit." },
      { title: "Review", text: "We look at the numbers – current performance, brand requirements, and what a change in management or capital could unlock." },
      { title: "Proposal", text: "A clear plan with scope, responsibilities, and the results we commit to measuring from the very first month." },
    ],
  },
  closing: {
    heading: "Ready to get started? Schedule a private consultation.",
    button: "Schedule a call",
  },
  disclaimer:
    "This page is for informational purposes only. All investment opportunities involve risk. Please consult a financial advisor before making any investment decisions.",
};

export const contactPage = {
  eyebrow: "Contact",
  heading: "We'd love to connect.",
  intro:
    "Whether you're looking for a management partner, exploring an acquisition, or need guidance on a PIP project – reach out and we'll get back to you promptly.",
  topics: [
    { value: "management", label: "Hotel management partnership" },
    { value: "invest", label: "Investment opportunities" },
    { value: "acquisition", label: "Acquisition or due diligence" },
    { value: "pip", label: "PIP project" },
    { value: "other", label: "Something else" },
  ],
};
