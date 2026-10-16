import { getFinancialStrength } from "@/content";
import { ComparisonChart } from "@/components/ui/ComparisonChart";
import { SectionIntro } from "@/components/ui/Typography";

export async function FinancialStrength() {
  const content = await getFinancialStrength();
  if (content.hidden || (content.metrics.length === 0 && content.charts.length === 0)) return null;

  return (
    <section id="financial-strength" className="scroll-mt-20 border-b border-line bg-cream">
      <div className="container-x section-y flex flex-col gap-12">
        <SectionIntro eyebrow={content.eyebrow} heading={content.heading} lead={content.intro} tone="cream" />

        {content.metrics.length > 0 ? (
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {content.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-2 border border-line bg-white px-7 py-8">
                <dt className="order-2 text-[15px] font-bold text-ink">{metric.label}</dt>
                <dd className="order-1 font-display text-[48px] font-semibold leading-none text-gold-text">{metric.value}</dd>
                {metric.note ? <dd className="order-3 text-sm leading-relaxed text-muted">{metric.note}</dd> : null}
              </div>
            ))}
          </dl>
        ) : null}

        {content.charts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {content.charts.map((chart, i) => (
              <ComparisonChart key={chart.title} chart={chart} id={`fin-chart-${i + 1}`} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
