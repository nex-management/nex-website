import type { TeamMember } from "./types";

export const teamIntro = {
  eyebrow: "Our People",
  heading: "Leadership & Team",
  text: "The professionals behind Nex Management bring decades of combined experience in hospitality operations, real estate, and financial management.",
};

export const teamGroups: { id: TeamMember["group"]; label: string }[] = [
  { id: "leadership", label: "Leadership" },
  { id: "operations", label: "Operations & Finance" },
];

export const perspectivesIntro = {
  eyebrow: "In Their Words",
  heading: "Leadership perspectives",
  text: "A closer look at the philosophy that guides how we manage, operate, and protect our partners' investments.",
};

export const careers = {
  eyebrow: "Careers",
  heading: "Join our team",
  text: "We are always looking for driven professionals who share our commitment to excellence in hospitality management.",
  cta: "Get in Touch",
};

export const team: TeamMember[] = [
  {
    slug: "m-zeigen",
    name: "M. Zeigen",
    shortName: "M. Zeigen",
    title: "Chief Executive Officer",
    bio: "Founder and CEO of Nex Management. M. Zeigen leads the firm's strategy, operations, and investor relations — driving the mission of transforming underperforming hotels into high-performing assets through disciplined management and operational excellence.",
    photo: {
      src: "/images/team/m-zeigen.jpg",
      alt: "M. Zeigen, Chief Executive Officer",
      width: 800,
      height: 1000,
    },
    group: "leadership",
    email: "mendy@nex-mgmt.com",
    linkedinUrl: null,
    perspective:
      "We approach every property with an owner's mindset because, as hotel owners ourselves, we understand firsthand what it takes to protect an investment, drive profitability, and maximize the long-term value of an asset. Our young, dynamic team combines hands-on operational experience with deep local roots and a passion for delivering exceptional results. We believe successful partnerships are built on transparency, integrity, and accountability, which means communicating openly, making decisions with our owners' best interests in mind, and never making promises we can't keep. At the end of the day, our goal is simple: earn our clients' trust, maximize the potential of every property we manage, and let the results speak for themselves.",
  },
  {
    slug: "luis-rodriguez",
    name: "Luis Rodriguez",
    shortName: "Luis Rodriguez",
    title: "Hospitality & Revenue Management",
    bio: "Leads operations with a data-driven, revenue-management focus — balancing guest experience, team culture, and disciplined strategy to maximize sustainable profitability.",
    photo: {
      src: "/images/team/luis-rodriguez.jpg",
      alt: "Luis Rodriguez, Hospitality and Revenue Management",
      width: 800,
      height: 1000,
    },
    group: "leadership",
    email: null,
    linkedinUrl: null,
    perspective:
      "Our approach to operations is built on the belief that strong financial performance starts with strong hotels. That means maintaining exceptional service quality, creating a positive and accountable work culture, and giving our teams the tools and leadership they need to succeed. At the same time, we are highly data-driven and revenue-management focused, using performance insights to guide operational decisions, control costs, identify opportunities, and maximize revenue. By balancing the guest experience, team culture, and disciplined revenue strategy, our goal is to operate hotels that consistently perform at their highest potential and deliver sustainable profitability and long-term value for our stakeholders.",
  },
  {
    slug: "sheyla-perez",
    name: "Sheyla Perez",
    shortName: "Sheyla Perez",
    title: "Chief Financial Officer",
    bio: "Oversees accounting and financial strategy, using accurate P&L reporting, detailed analysis, and forensic accounting to uncover inefficiencies and drive profitability.",
    photo: {
      src: "/images/team/sheyla-perez.jpg",
      alt: "Sheyla Perez, Chief Financial Officer",
      width: 800,
      height: 1000,
    },
    group: "leadership",
    email: null,
    linkedinUrl: null,
    perspective:
      "Our approach to accounting goes beyond reporting the numbers, we use them to understand the story behind every property's performance. Through accurate and timely P&L reporting, detailed financial analysis, and forensic accounting, we identify trends, uncover inefficiencies, and provide the transparency needed to make informed decisions. By working closely with operations and revenue management, we ensure financial discipline across the portfolio while identifying opportunities to control costs and improve performance. Our goal is to give ownership a clear picture of their investment and turn financial insight into strategies that drive maximum profitability and long-term value.",
  },
  {
    slug: "adriana-lopez",
    name: "Adriana Lopez",
    shortName: "Adriana Lopez",
    title: "Bookkeeper",
    bio: "Maintains accurate financial records and supports day-to-day accounting operations across the portfolio.",
    photo: {
      src: "/images/team/adriana-lopez.jpg",
      alt: "Adriana Lopez, Bookkeeper",
      width: 800,
      height: 1000,
    },
    group: "operations",
    email: null,
    linkedinUrl: null,
    perspective: null,
  },
  {
    slug: "camilio-suarez",
    name: "Camilio Suarez",
    shortName: "Camilio Suarez",
    title: "Accounts Payable",
    bio: "Manages accounts payable processes, ensuring vendors and partners are handled with accuracy and efficiency.",
    photo: {
      src: "/images/team/camilio-suarez.jpg",
      alt: "Camilio Suarez, Accounts Payable",
      width: 800,
      height: 1000,
    },
    group: "operations",
    email: null,
    linkedinUrl: null,
    perspective: null,
  },
  {
    slug: "alfredo-gonzales",
    name: "Alfredo Gonzales",
    shortName: "Alfredo Gonzales",
    title: "Human Resources",
    bio: "Leads human resources, supporting the team culture and helping attract and retain top hospitality talent.",
    photo: {
      src: "/images/team/alfredo-gonzales.jpg",
      alt: "Alfredo Gonzales, Human Resources",
      width: 800,
      height: 1000,
    },
    group: "operations",
    email: null,
    linkedinUrl: null,
    perspective: null,
  },
];
