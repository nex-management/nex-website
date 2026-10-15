import { getHomeContent, getSiteSettings } from "@/content";
import { SectionIntro } from "@/components/ui/Typography";

export function Testimonials() {
  const { testimonialsIntro, testimonials } = getHomeContent();
  const site = getSiteSettings();

  return (
    <section aria-labelledby="testimonials-heading" className="bg-white">
      <div className="container-x flex flex-col gap-12 py-[110px]">
        <SectionIntro
          eyebrow={testimonialsIntro.eyebrow}
          heading={testimonialsIntro.heading}
          headingId="testimonials-heading"
        />
        <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(18.75rem,1fr))] gap-6 p-0">
          {testimonials.map((item, index) => (
            <li key={index}>
              <figure className="flex h-full flex-col justify-between gap-6 border border-line px-9 py-10">
                <blockquote className="font-display text-2xl font-medium leading-[1.35] text-ink">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="flex flex-col gap-0.5 border-t border-line pt-[18px]">
                  <p className="text-[15px] font-bold text-ink">
                    {item.name ?? (site.showPlaceholders ? "[Full name]" : "Hotel owner")}
                  </p>
                  <p className="text-[13px] text-muted">{item.role}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
