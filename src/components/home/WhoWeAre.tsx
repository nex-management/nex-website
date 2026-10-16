import { getHomeContent } from "@/content";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export function WhoWeAre() {
  const { about } = getHomeContent();

  return (
    <section id="about" className="scroll-mt-20 bg-white">
      <div className="container-x section-y flex flex-col gap-[72px]">
        <div className="flex flex-wrap items-start gap-x-20 gap-y-12">
          <div className="flex min-w-0 flex-[1_1_23.75rem] flex-col gap-5">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <Heading>{about.heading}</Heading>
          </div>
          <div className="flex min-w-0 flex-[1_1_30rem] flex-col gap-[22px] text-[17px] leading-[1.7] text-body">
            <p>{about.intro}</p>
            <div className="flex flex-col gap-2.5 border-l-2 border-gold py-1 pl-6">
              <h3 className="font-display text-[28px] font-semibold leading-[1.15] text-ink">{about.storyHeading}</h3>
              <p className="text-base leading-[1.7] text-muted">{about.story}</p>
            </div>
          </div>
        </div>

        <ol className="grid list-none grid-cols-1 gap-x-12 gap-y-10 border-t border-line p-0 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {about.differentiators.map((item, index) => (
            <li key={item.title} className="flex flex-col gap-3.5">
              <p className="font-display text-[34px] font-semibold leading-none text-gold-text" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg font-bold leading-[1.3] text-ink">{item.title}</h3>
              <p className="text-[15px] leading-[1.65] text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
