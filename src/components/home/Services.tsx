import { getHomeContent, getServices } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionIntro } from "@/components/ui/Typography";

export async function Services() {
  const { servicesIntro } = getHomeContent();
  const services = await getServices();

  return (
    <section id="services" className="scroll-mt-20 border-y border-line bg-cream">
      <div className="container-x flex flex-col gap-14 py-[110px]">
        <SectionIntro
          eyebrow={servicesIntro.eyebrow}
          heading={servicesIntro.heading}
          lead={servicesIntro.text}
          tone="cream"
        />
        {/* 5 cards: 3 on the first row, 2 centered on the second (6-column grid, each card spans 2). */}
        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-6 lg:[&>li:nth-child(4)]:col-start-2">
          {services.map((service) => (
            <li key={service.slug} className="lg:col-span-2">
              <article className="flex h-full flex-col gap-[18px] border border-line bg-white px-[30px] py-9">
                <Icon name={service.icon} size={30} className="text-gold-text" />
                <h3 className="text-[19px] font-bold leading-[1.3] text-ink">{service.title}</h3>
                <p className="text-[15px] leading-[1.65] text-muted">{service.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
