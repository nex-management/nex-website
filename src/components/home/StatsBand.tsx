import { getHomeContent, getSiteSettings } from "@/content";

export function StatsBand() {
  const { stats, statsFootnote } = getHomeContent();
  const site = getSiteSettings();

  const asOf = site.statsAsOf ?? (site.showPlaceholders ? "[DATE]" : null);

  return (
    <section aria-label="Key figures" className="border-t border-gold/35 bg-ink-2 text-white">
      <div className="container-x flex flex-col gap-8 pb-11 pt-14">
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))] gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2 border-l border-gold/45 pl-6">
              <dd className="order-1 font-display text-[60px] font-semibold leading-none text-gold">{stat.value}</dd>
              <dt className="order-2 text-xs font-semibold uppercase tracking-[0.14em] text-sand-2">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <p className="max-w-[56rem] text-xs leading-relaxed text-muted-3">
          {asOf ? <>Figures as of {asOf}. </> : null}
          {statsFootnote}
        </p>
      </div>
    </section>
  );
}
