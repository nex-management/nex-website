import type { Metadata } from "next";
import { getHomeContent, getHotelTypes, getHotels } from "@/content";
import { portfolioPage } from "@/content/pages";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PortfolioGrid } from "@/components/home/PortfolioGrid";
import { Icon } from "@/components/ui/Icon";
import { CtaBand, PageIntro } from "@/components/ui/PageBlocks";

export const metadata: Metadata = {
  title: "Portfolio",
  description: portfolioPage.intro,
};

export default async function PortfolioPage() {
  const [hotels, types] = [await getHotels(), getHotelTypes()];
  const { strategyPillars } = getHomeContent();

  return (
    <>
      <Header currentPath="/portfolio" />
      <main className="flex flex-1 flex-col">
        <PageIntro eyebrow={portfolioPage.eyebrow} heading={portfolioPage.heading} lead={portfolioPage.intro} />

        <section className="bg-white">
          <div className="container-x flex flex-col gap-16 py-[100px]">
            <PortfolioGrid hotels={hotels} types={types} linkToPages />

            <div className="flex flex-col gap-8 border-t border-line pt-12">
              <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.125rem)] font-semibold leading-[1.1] text-ink">
                {portfolioPage.strategyHeading}
              </h2>
              <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(16.25rem,1fr))] gap-x-12 gap-y-8 p-0">
                {strategyPillars.map((pillar) => (
                  <li key={pillar.title} className="flex items-start gap-[18px]">
                    <Icon name={pillar.icon} size={28} className="shrink-0 text-gold-text" />
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-[17px] font-bold text-ink">{pillar.title}</h3>
                      <p className="text-[15px] leading-relaxed text-muted">{pillar.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <CtaBand heading={portfolioPage.cta.heading} text={portfolioPage.cta.text} button={portfolioPage.cta.button} />
      </main>
      <Footer />
    </>
  );
}
