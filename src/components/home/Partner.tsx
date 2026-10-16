import { getHomeContent, getSiteSettings } from "@/content";
import { ButtonLink } from "@/components/ui/Button";
import { DotList, Eyebrow, SectionIntro } from "@/components/ui/Typography";

export async function Partner() {
  const { partner } = getHomeContent();
  const site = await getSiteSettings();

  return (
    <section id="partner" className="scroll-mt-20 border-y border-line bg-cream">
      <div className="container-x section-y flex flex-col gap-14">
        <SectionIntro
          eyebrow={partner.eyebrow}
          heading={partner.heading}
          lead={partner.intro}
          tone="cream"
          align="stack"
        />

        <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] gap-6 p-0">
          {partner.tracks.map((track) => (
            <li key={track.eyebrow}>
              <article className="flex h-full flex-col gap-6 border border-line bg-white px-6 py-8 sm:px-11 sm:py-12">
                <Eyebrow className="!text-[11px] !tracking-[0.2em]">{track.eyebrow}</Eyebrow>
                <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.125rem)] font-semibold leading-[1.1] text-ink">{track.heading}</h3>
                <p className="text-base leading-[1.7] text-muted">{track.text}</p>
                <DotList items={track.bullets} size="md" />
                <ButtonLink
                  href={track.cta.href}
                  variant={track.variant === "primary" ? "gold" : "outline-dark"}
                  className="mt-auto self-start"
                >
                  {track.cta.label}
                </ButtonLink>
              </article>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-line pt-10">
          <p className="font-display text-[28px] font-semibold leading-[1.2] text-ink">{partner.closingLine}</p>
          <ButtonLink
            href={site.schedulingUrl ?? "/#contact"}
            variant="dark"
            {...(site.schedulingUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            Schedule a call
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
