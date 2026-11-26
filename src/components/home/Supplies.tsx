import Image from "next/image";
// The supplies site's own logo, cut to its visible area (no pixel changed). It is drawn for dark backgrounds.
import logo from "../../../public/images/brand/nex-group-supplies.png";
import { getHomeContent, getSuppliesSite } from "@/content";
import { Eyebrow, Heading } from "@/components/ui/Typography";

/**
 * Banner for Nex Group Supplies, the group's wholesale hotel-supply site (a separate site on its own subdomain).
 * The whole banner is one link: the button carries it and its ::after covers the banner.
 */
export function Supplies() {
  const { supplies } = getHomeContent();
  const site = getSuppliesSite();

  return (
    <section
      id="supplies"
      aria-labelledby="supplies-heading"
      className="scroll-mt-20 overflow-hidden border-y border-gold/35 bg-ink-deep text-white"
    >
      <div className="container-x band-y">
        <div className="group relative grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr_auto] xl:items-center">
          <div className="relative flex items-center md:row-span-2 md:border-r md:border-ink-5 md:pr-12 xl:row-span-1">
            {/* A soft light behind the logo, centred on it at every width */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[5.25rem] top-1/2 h-[14rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(201_162_39/0.13),transparent)] md:h-[19rem] md:w-[30rem] xl:left-24"
            />
            <Image src={logo} alt={site.name} unoptimized className="relative h-auto w-[10.5rem] xl:w-[12rem]" />
          </div>

          <div className="relative flex min-w-0 flex-col gap-4">
            <Eyebrow tone="dark">{supplies.eyebrow}</Eyebrow>
            <Heading size="md" tone="dark" id="supplies-heading">
              {supplies.heading}
            </Heading>
            <p className="max-w-[34rem] text-pretty text-base leading-[1.7] text-sand">{supplies.text}</p>
          </div>

          <a
            href={site.url}
            target="_blank"
            rel="noopener"
            className="label-caps inline-flex min-h-[52px] items-center justify-center gap-2 justify-self-start rounded-[2px] border border-gold bg-gold px-7 py-3.5 text-center text-ink no-underline transition-colors after:absolute after:inset-0 group-hover:border-[#b8962e] group-hover:bg-[#b8962e] focus-visible:outline-white md:col-start-2 xl:col-start-3"
          >
            {supplies.ctaLabel}
            <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
