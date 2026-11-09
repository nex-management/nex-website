import { getServices } from "@/content";
import { servicesPage } from "@/content/pages";
import { pageMeta } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Icon } from "@/components/ui/Icon";
import { CtaBand, PageIntro } from "@/components/ui/PageBlocks";
import { DotList, Eyebrow, Heading } from "@/components/ui/Typography";

export const metadata = pageMeta({ title: "Services", description: servicesPage.intro, path: "/services" });

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Header currentPath="/services" />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        <PageIntro eyebrow={servicesPage.eyebrow} heading={servicesPage.heading} lead={servicesPage.intro} />

        <section className="bg-white">
          <div className="container-x flex flex-col py-[clamp(1.5rem,4vw,3.75rem)]">
            {services.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                className={`flex scroll-mt-24 flex-wrap items-start gap-x-20 gap-y-6 py-14 ${index === 0 ? "" : "border-t border-line"}`}
              >
                <div className="flex min-w-0 flex-[1_1_20rem] items-start gap-5">
                  <Icon name={service.icon} size={32} className="mt-1 shrink-0 text-gold-text" />
                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-text" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.125rem)] font-semibold leading-[1.1] text-ink">
                      {service.title}
                    </h2>
                  </div>
                </div>
                <div className="flex min-w-0 flex-[1_1_30rem] flex-col gap-4 text-[17px] leading-[1.7] text-body">
                  <p>{service.description}</p>
                  {service.details ? <p className="text-base text-muted">{service.details}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-cream">
          <div className="container-x section-y flex flex-wrap items-start gap-x-20 gap-y-10">
            <div className="flex min-w-0 flex-[1_1_22rem] flex-col gap-5">
              <Eyebrow tone="cream">{servicesPage.approach.eyebrow}</Eyebrow>
              <Heading>{servicesPage.approach.heading}</Heading>
            </div>
            <div className="min-w-0 flex-[1_1_30rem]">
              <DotList items={servicesPage.approach.bullets} size="md" className="!border-t-0 !pt-0 text-[16px]" />
            </div>
          </div>
        </section>

        <CtaBand heading={servicesPage.cta.heading} text={servicesPage.cta.text} button={servicesPage.cta.button} />
      </main>
      <Footer />
    </>
  );
}
