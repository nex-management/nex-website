import { getHomeContent, getSiteSettings } from "@/content";
import { ButtonLink } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";

export async function Hero() {
  const { hero } = getHomeContent();
  const site = await getSiteSettings();

  return (
    <section className="relative flex min-h-[760px] items-center overflow-hidden bg-ink text-white">
      {site.heroImage ? (
        <>
          <Picture image={site.heroImage} sizes="100vw" priority className="object-[65%_50%] lg:object-center" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,21,15,0.93)_0%,rgba(22,21,15,0.88)_55%,rgba(22,21,15,0.6)_100%)] lg:bg-[linear-gradient(90deg,rgba(22,21,15,0.94)_0%,rgba(22,21,15,0.86)_42%,rgba(22,21,15,0.6)_64%,rgba(22,21,15,0.15)_100%)]"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_80%_50%,rgba(201,162,39,0.07)_0%,rgba(22,21,15,0)_70%)]"
        />
      )}

      <div className="container-x section-y relative">
        <div className="flex max-w-[42.5rem] flex-col gap-7">
          <p className="eyebrow text-gold">{hero.eyebrow}</p>
          <h1 className="font-display text-[clamp(2.875rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.01em] text-white">
            {hero.headingLine1}
            <br />
            {hero.headingLine2}
          </h1>
          <p className="font-display text-[28px] font-medium italic leading-[1.2] text-sand-3">{hero.subheading}</p>
          <p className="max-w-[35rem] text-[17px] leading-[1.65] text-sand">{hero.intro}</p>
          <div className="flex flex-col gap-3.5 pt-2 xs:flex-row xs:flex-wrap">
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
