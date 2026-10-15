import Image from "next/image";
import { getHomeContent, getSiteSettings } from "@/content";
import { ButtonLink } from "@/components/ui/Button";

export async function Hero() {
  const { hero } = getHomeContent();
  const site = await getSiteSettings();

  return (
    <section className="relative flex min-h-[760px] items-center overflow-hidden bg-ink text-white">
      {site.heroImage ? (
        <>
          {site.heroImage.srcSet ? (
            // Pre-sized files (local or Sanity's CDN): served as-is, no image optimizer.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.heroImage.src}
              srcSet={site.heroImage.srcSet}
              sizes="100vw"
              alt={site.heroImage.alt}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[65%_50%] md:object-center"
            />
          ) : (
            <Image
              src={site.heroImage.src}
              alt={site.heroImage.alt}
              unoptimized={site.heroImage.unoptimized}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,21,15,0.93)_0%,rgba(22,21,15,0.88)_55%,rgba(22,21,15,0.6)_100%)] md:bg-[linear-gradient(90deg,rgba(22,21,15,0.94)_0%,rgba(22,21,15,0.82)_38%,rgba(22,21,15,0.45)_62%,rgba(22,21,15,0.10)_100%)]"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_80%_50%,rgba(201,162,39,0.07)_0%,rgba(22,21,15,0)_70%)]"
        />
      )}

      {!site.heroImage && site.showPlaceholders ? (
        <p className="absolute bottom-7 right-[clamp(1.25rem,5vw,4rem)] rounded-[2px] border border-white/20 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-3">
          [ Background: hotel photography or video – to be supplied ]
        </p>
      ) : null}

      <div className="container-x relative pb-[110px] pt-[120px]">
        <div className="flex max-w-[42.5rem] flex-col gap-7">
          <p className="eyebrow text-gold">{hero.eyebrow}</p>
          <h1 className="font-display text-[clamp(2.875rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.01em] text-white">
            {hero.headingLine1}
            <br />
            {hero.headingLine2}
          </h1>
          <p className="font-display text-[28px] font-medium italic leading-[1.2] text-sand-3">{hero.subheading}</p>
          <p className="max-w-[35rem] text-[17px] leading-[1.65] text-sand">{hero.intro}</p>
          <div className="flex flex-wrap gap-3.5 pt-2">
            <ButtonLink href={hero.primaryCta.href} variant="gold">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline-light">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
