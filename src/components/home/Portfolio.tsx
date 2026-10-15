import { getHomeContent, getHotelTypes, getHotels } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionIntro } from "@/components/ui/Typography";
import { PortfolioGrid } from "./PortfolioGrid";

export async function Portfolio() {
  const { portfolioIntro, strategyPillars } = getHomeContent();
  const hotels = await getHotels();
  const types = getHotelTypes();

  return (
    <section id="portfolio" className="scroll-mt-20 bg-white">
      <div className="container-x flex flex-col gap-12 py-[120px]">
        <SectionIntro
          eyebrow={portfolioIntro.eyebrow}
          heading={portfolioIntro.heading}
          lead={portfolioIntro.text}
        />

        <PortfolioGrid hotels={hotels} types={types} />

        <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(16.25rem,1fr))] gap-x-12 gap-y-8 border-t border-line p-0 pt-12">
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
    </section>
  );
}
