import Link from "next/link";
import { getHomeContent, getHotels } from "@/content";
import type { Hotel } from "@/content/types";
import { ComparisonChart } from "@/components/ui/ComparisonChart";
import { SectionIntro } from "@/components/ui/Typography";

// ---------------------------------------------------------------------------
// South Florida map (simplified, drawn from real coordinates)
// ---------------------------------------------------------------------------

const BOUNDS = { west: -80.5, east: -79.98, north: 26.85, south: 25.66 };
const K = 560; // px per degree of latitude
const COS = Math.cos((26.2 * Math.PI) / 180);
const W = Math.round((BOUNDS.east - BOUNDS.west) * COS * K);
const H = Math.round((BOUNDS.north - BOUNDS.south) * K);

function project(lat: number, lng: number) {
  return { x: (lng - BOUNDS.west) * COS * K, y: (BOUNDS.north - lat) * K };
}

/** Atlantic coastline, north to south (approximate). */
const COAST: [number, number][] = [
  [26.9, -80.06],
  [26.77, -80.035],
  [26.62, -80.035],
  [26.47, -80.05],
  [26.33, -80.07],
  [26.2, -80.09],
  [26.08, -80.105],
  [25.96, -80.12],
  [25.85, -80.12],
  [25.77, -80.135],
  [25.7, -80.17],
  [25.62, -80.27],
  [25.5, -80.33],
];

/** County lines (approximate latitudes along the coast). */
const COUNTY_LINES = [
  { lat: 26.33, north: "Palm Beach", south: "Broward" },
  { lat: 25.957, north: "Broward", south: "Miami-Dade" },
];

const COUNTY_LABELS = [
  { name: "Palm Beach County", lat: 26.8 },
  { name: "Broward County", lat: 26.0 },
  { name: "Miami-Dade County", lat: 25.9 },
];

function SouthFloridaMap({ hotels }: { hotels: (Hotel & { n: number })[] }) {
  const coast = COAST.map(([lat, lng]) => project(lat, lng));
  const land = [`M0 0`, ...coast.map((p) => `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`), `L0 ${H}`, "Z"].join(" ");
  const coastLine = coast.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="market-map-title">
      <title id="market-map-title">Map of the six Nex-managed hotels across Palm Beach, Broward and Miami-Dade counties</title>
      <rect width={W} height={H} fill="#e7eef0" />
      <path d={land} fill="#f4f1ea" />
      <path d={coastLine} fill="none" stroke="#b9c7cb" strokeWidth={1.5} />
      {COUNTY_LINES.map((line) => {
        const { y } = project(line.lat, BOUNDS.west);
        const end = project(line.lat, -80.08);
        return <line key={line.lat} x1={0} x2={end.x} y1={y} y2={y} stroke="#cfc8b8" strokeWidth={1} strokeDasharray="4 5" />;
      })}
      {COUNTY_LABELS.map((c) => {
        const { y } = project(c.lat, BOUNDS.west);
        return (
          <text key={c.name} x={16} y={y} fontSize={13} letterSpacing="0.14em" fill="#8c877c" fontFamily="inherit" fontWeight={700}>
            {c.name.toUpperCase()}
          </text>
        );
      })}
      <text x={W - 12} y={H - 16} fontSize={12} letterSpacing="0.2em" fill="#8fa3a9" fontFamily="inherit" textAnchor="end" fontStyle="italic">
        ATLANTIC
      </text>
      {hotels.map((h) => {
        const { x, y } = project(h.location!.lat, h.location!.lng);
        return (
          <g key={h.slug}>
            <circle cx={x} cy={y} r={13} fill="#16150f" stroke="#c9a227" strokeWidth={2} />
            <text x={x} y={y + 4.5} fontSize={13} fontWeight={700} fill="#ffffff" textAnchor="middle" fontFamily="inherit">
              {h.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------

export async function Market() {
  const { market } = getHomeContent();
  const hotels = await getHotels();
  const numbered = hotels.map((h, i) => ({ ...h, n: i + 1 }));
  const mapped = numbered.filter((h) => h.location);

  return (
    <section id="market" aria-labelledby="market-heading" className="scroll-mt-20 border-y border-line bg-cream">
      <div className="container-x section-y flex flex-col gap-14">
        <SectionIntro eyebrow={market.eyebrow} heading={market.heading} lead={market.intro} tone="cream" headingId="market-heading" />

        {mapped.length > 0 ? (
          <div className="flex flex-wrap items-center gap-x-14 gap-y-10">
            <div className="min-w-0 flex-[1_1_20rem] overflow-hidden border border-line bg-white lg:max-w-[26rem]">
              <SouthFloridaMap hotels={mapped} />
            </div>
            <ol className="flex min-w-0 flex-[1_1_22rem] list-none flex-col p-0">
              {numbered.map((h) => (
                <li key={h.slug} className="border-b border-line first:border-t">
                  <Link
                    href={`/portfolio/${h.slug}`}
                    className="group flex items-center gap-5 py-4 no-underline"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-ink text-[13px] font-bold text-white">
                      {h.n}
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-[16px] font-bold leading-snug text-ink group-hover:text-gold-text">{h.name}</span>
                      <span className="text-sm text-muted">
                        {h.type} hotel · {h.city}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {market.charts.length > 0 ? (
          <div className="flex flex-col gap-8 border-t border-line pt-12">
            <div className="flex max-w-[47.5rem] flex-col gap-3">
              <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.125rem)] font-semibold leading-[1.1] text-ink">
                {market.marketHeading}
              </h3>
              <p className="text-[17px] leading-[1.7] text-body">{market.marketIntro}</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {market.charts.map((chart, i) => (
                <ComparisonChart key={chart.title} chart={chart} id={`market-chart-${i + 1}`} />
              ))}
            </div>
            <ul className="flex list-none flex-col gap-1 p-0 text-xs leading-relaxed text-muted-2">
              {market.sources.map((s) => (
                <li key={s.href}>
                  Source:{" "}
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-line-2 underline-offset-2 hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
