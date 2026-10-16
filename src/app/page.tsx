import type { Metadata } from "next";
import { getSiteSettings } from "@/content";
import { absoluteUrl, indexable } from "@/lib/site-url";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CeoQuote } from "@/components/home/CeoQuote";
import { Contact } from "@/components/home/Contact";
import { FinancialStrength } from "@/components/home/FinancialStrength";
import { Hero } from "@/components/home/Hero";
import { Partner } from "@/components/home/Partner";
import { Portfolio } from "@/components/home/Portfolio";
import { Services } from "@/components/home/Services";
import { StatsBand } from "@/components/home/StatsBand";
import { Testimonials } from "@/components/home/Testimonials";
import { TrackRecord } from "@/components/home/TrackRecord";
import { Video } from "@/components/home/Video";
import { WhoWeAre } from "@/components/home/WhoWeAre";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  const url = absoluteUrl("/");
  return {
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.brandName,
      locale: "en_US",
      url,
      title: site.seo.title,
      description: site.seo.description,
    },
    ...(indexable ? {} : { robots: { index: false, follow: false } }),
  };
}

export default function HomePage() {
  return (
    <>
      <Header currentPath="/" />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        <Hero />
        <StatsBand />
        <WhoWeAre />
        <Services />
        <Portfolio />
        <TrackRecord />
        <FinancialStrength />
        <CeoQuote />
        <Partner />
        <Testimonials />
        <Video />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
