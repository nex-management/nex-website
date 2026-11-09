import Image from "next/image";
import { getHomeContent } from "@/content";
import { TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Typography";

export function CeoQuote() {
  const { ceoQuote } = getHomeContent();

  return (
    <section id="team" className="scroll-mt-20 bg-white">
      <div className="container-x section-y flex flex-wrap items-center gap-x-24 gap-y-12">
        <div className="min-w-[17.5rem] flex-[0_1_26.25rem]">
          <Image
            src={ceoQuote.photo.src}
            alt={ceoQuote.photo.alt}
            width={ceoQuote.photo.width ?? 800}
            height={ceoQuote.photo.height ?? 1000}
            sizes="(min-width: 1024px) 420px, 100vw"
            className="aspect-[4/5] w-full rounded-[2px] object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-[1_1_28.75rem] flex-col gap-7">
          <Eyebrow>From our CEO</Eyebrow>
          <blockquote className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium italic leading-[1.3] text-ink">
            &ldquo;{ceoQuote.quote}&rdquo;
          </blockquote>
          <div className="flex flex-col gap-1 border-l-2 border-gold pl-5">
            <p className="text-base font-bold text-ink">{ceoQuote.name}</p>
            <p className="text-sm text-muted">{ceoQuote.title}</p>
          </div>
          <TextLink href="/team">Meet the leadership team</TextLink>
        </div>
      </div>
    </section>
  );
}
