import { getHomeContent, getHotelTypes, getHotels } from "@/content";
import { portfolioPage } from "@/content/pages";
import { pageMeta } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PortfolioGrid } from "@/components/home/PortfolioGrid";
import { Icon } from "@/components/ui/Icon";
import { CtaBand, PageIntro } from "@/components/ui/PageBlocks";

export const metadata = pageMeta({ title: "Portfolio", description: portfolioPage.intro, path: "/portfolio" });

export default async function PortfolioPage() {
  const hotels = await getHotels();
  const types = getHotelTypes(hotels);
  const { strategyPillars } = getHomeContent();

  return (
    <>
      <Header currentPath="/portfolio" />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        <PageIntro eyebrow={portfolioPage.eyebrow} heading={portfolioPage.heading} lead={portfolioPage.intro} />

        <section className="bg-white">
          <div className="container-x section-y flex flex-col gap-16">
            {hotels.length > 0 ? (
              <PortfolioGrid hotels={hotels} types={types} linkToPages headingLevel="h2" />
            ) : (
              <p className="text-[17px] leading-[1.7] text-body">Property details are being updated. Please check back soon.</p>
            )}

            <div className="flex flex-col gap-8 border-t border-line pt-12">
              <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.125rem)] font-semibold leading-[1.1] text-ink">
                {portfolioPage.strategyHeading}
              </h2>
              <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(16.25rem,100%),1fr))] gap-x-12 gap-y-8 p-0">
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
