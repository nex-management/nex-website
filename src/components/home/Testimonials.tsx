import { getHomeContent, getTestimonials } from "@/content";
import { SectionIntro } from "@/components/ui/Typography";

export async function Testimonials() {
  const { testimonialsIntro } = getHomeContent();
  const testimonials = await getTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="bg-white">
      <div className="container-x section-y flex flex-col gap-12">
        <SectionIntro
          eyebrow={testimonialsIntro.eyebrow}
          heading={testimonialsIntro.heading}
          headingId="testimonials-heading"
        />
        <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-6 p-0">
          {testimonials.map((item, index) => (
            <li key={index}>
              <figure className="flex h-full flex-col justify-between gap-6 border border-line px-6 py-8 sm:px-9 sm:py-10">
                <blockquote className="font-display text-2xl font-medium leading-[1.35] text-ink">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="flex flex-col gap-0.5 border-t border-line pt-[18px]">
                  {item.name ? <p className="text-[15px] font-bold text-ink">{item.name}</p> : null}
                  <p className={item.name ? "text-[13px] text-muted" : "text-[15px] font-bold text-ink"}>
                    {item.role}
                    {item.company ? `, ${item.company}` : ""}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
