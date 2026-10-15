import { getHomeContent, getSiteSettings } from "@/content";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export function TrackRecord() {
  const { trackRecord } = getHomeContent();
  const site = getSiteSettings();
  const { caseStudy } = trackRecord;

  const propertyName =
    caseStudy.propertyName ?? (site.showPlaceholders ? "[Case study: PROPERTY NAME]" : "A Nex-managed property");

  return (
    <section id="track-record" className="scroll-mt-20 bg-ink text-white">
      <div className="container-x flex flex-wrap items-center gap-x-20 gap-y-14 py-[120px]">
        <div className="flex min-w-0 flex-[1_1_27.5rem] flex-col gap-7">
          <Eyebrow tone="dark">{trackRecord.eyebrow}</Eyebrow>
          <Heading tone="dark">{trackRecord.heading}</Heading>
          <p className="text-[17px] leading-[1.7] text-sand">{trackRecord.intro}</p>
          <div className="flex flex-col gap-2.5 border-t border-gold/35 pt-6">
            <h3 className="text-lg font-bold text-white">{trackRecord.bankHeading}</h3>
            <p className="text-base leading-[1.7] text-sand-2">{trackRecord.bankText}</p>
          </div>
        </div>

        <figure className="flex min-w-0 flex-[1_1_27.5rem] flex-col gap-8 border border-ink-3 bg-ink-2 px-10 py-11">
          <figcaption className="flex flex-col gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Performance transformation</p>
            <p className="text-[15px] text-sand-2">
              {propertyName} — {caseStudy.period}
            </p>
          </figcaption>

          {caseStudy.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-3.5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-bold uppercase tracking-[0.06em] text-white">{metric.label}</p>
                <p className="font-display text-[30px] font-semibold leading-none text-gold">
                  {metric.before} → {metric.after}
                </p>
              </div>
              <div className="flex flex-col gap-1.5" aria-hidden="true">
                <div className="h-2 rounded-[1px] bg-ink-3">
                  <div className="h-2 rounded-[1px] bg-muted-2" style={{ width: `${metric.beforeWidth * 100}%` }} />
                </div>
                <div className="h-2 rounded-[1px] bg-ink-3">
                  <div className="h-2 rounded-[1px] bg-gold" style={{ width: `${metric.afterWidth * 100}%` }} />
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-6 text-xs uppercase tracking-[0.08em] text-muted-3" aria-hidden="true">
            <p className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-[18px] bg-muted-2" />
              Before
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-[18px] bg-gold" />
              After
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}
