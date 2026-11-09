import { getSiteSettings, getStats } from "@/content";
import { partnerPage } from "@/content/pages";
import { pageMeta } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand, PageIntro } from "@/components/ui/PageBlocks";
import { DotList, Eyebrow, Heading } from "@/components/ui/Typography";

export const metadata = pageMeta({ title: "Partner With Us", description: partnerPage.intro, path: "/partner" });

function Track({
  track,
  tone,
}: {
  track: typeof partnerPage.investors;
  tone: "light" | "cream";
}) {
  return (
    <section id={track.id} className={`scroll-mt-24 ${tone === "cream" ? "border-y border-line bg-cream" : "bg-white"}`}>
      <div className="container-x section-y flex flex-wrap items-start gap-x-20 gap-y-10">
        <div className="flex min-w-0 flex-[1_1_24rem] flex-col gap-5">
          <Eyebrow tone={tone}>{track.eyebrow}</Eyebrow>
          <Heading>{track.heading}</Heading>
        </div>
        <div className="flex min-w-0 flex-[1_1_30rem] flex-col gap-6">
          <div className="flex flex-col gap-[22px] text-[17px] leading-[1.7] text-body">
            {track.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <DotList items={track.bullets} size="md" />
          <ButtonLink href={track.cta.href} variant="gold" className="self-start">
            {track.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default async function PartnerPage() {
  const [site, { stats }] = await Promise.all([getSiteSettings(), getStats()]);

  return (
    <>
      <Header currentPath="/partner" />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        <PageIntro eyebrow={partnerPage.eyebrow} heading={partnerPage.heading} lead={partnerPage.intro} />

        {stats.length > 0 ? (
          <section aria-label="Key figures" className="border-b border-gold/35 bg-ink-2 text-white">
            <div className="container-x py-12">
              <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-2 border-l border-gold/45 pl-6">
                    <dt className="order-2 text-xs font-semibold uppercase tracking-[0.14em] text-sand-2">{stat.label}</dt>
                    <dd className="order-1 font-display text-[48px] font-semibold leading-none text-gold">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ) : null}

        <Track track={partnerPage.investors} tone="light" />
        <Track track={partnerPage.owners} tone="cream" />

        <section className="bg-white">
          <div className="container-x section-y flex flex-col gap-12">
            <div className="flex max-w-[40rem] flex-col gap-[18px]">
              <Eyebrow>{partnerPage.process.eyebrow}</Eyebrow>
              <Heading>{partnerPage.process.heading}</Heading>
            </div>
            <ol className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-x-12 gap-y-10 p-0">
              {partnerPage.process.steps.map((step, index) => (
                <li key={step.title} className="flex flex-col gap-3.5 border-t border-line pt-6">
                  <p className="font-display text-[34px] font-semibold leading-none text-gold-text" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-bold leading-[1.3] text-ink">{step.title}</h3>
                  <p className="text-[15px] leading-[1.65] text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
            <p className="max-w-[56rem] text-xs leading-relaxed text-muted-2">{partnerPage.disclaimer}</p>
          </div>
        </section>

        <CtaBand
          heading={partnerPage.closing.heading}
          button={{
            label: partnerPage.closing.button,
            href: site.schedulingUrl ?? "/contact",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
