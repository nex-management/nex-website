import { getSiteSettings, getStats } from "@/content";

export async function StatsBand() {
  const [{ stats, footnote: statsFootnote }, site] = await Promise.all([getStats(), getSiteSettings()]);

  const asOf = site.statsAsOf;
  if (stats.length === 0) return null;

  return (
    <section aria-label="Key figures" className="border-t border-gold/35 bg-ink-2 text-white">
      <div className="container-x flex flex-col gap-8 pb-11 pt-14">
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2 border-l border-gold/45 pl-6">
              <dt className="order-2 text-xs font-semibold uppercase tracking-[0.14em] text-sand-2">{stat.label}</dt>
              <dd className="order-1 font-display text-[60px] font-semibold leading-none text-gold">{stat.value}</dd>
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
