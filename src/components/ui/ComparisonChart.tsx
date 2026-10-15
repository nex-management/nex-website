import type { ChartFormat, ComparisonChart as ComparisonChartData } from "@/content/types";

/** Axis tick label for a value in the chart's unit. */
function formatTick(value: number, format: ChartFormat) {
  const n = Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
  if (format === "multiple") return `${n}x`;
  if (format === "currency") return value === 0 ? "$0" : `$${n}M`;
  return `${n}%`;
}

const GOLD = "#c9a227";
const REFERENCE = "#8c877c";
const GRID = "#dad5c9";
const INK = "#16150f";
const MUTED = "#6b665c";

/**
 * A small server-rendered bar chart comparing two or three values on one
 * axis (inline SVG, no JavaScript). The emphasised bar is gold, the
 * reference bars grey; every bar is labelled directly, and a visually
 * hidden table carries the same numbers for screen readers.
 */
export function ComparisonChart({ chart, id }: { chart: ComparisonChartData; id: string }) {
  const width = 360;
  const height = 230;
  const pad = { top: 30, right: 12, bottom: 34, left: 54 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const baseline = pad.top + plotH;
  const ticks = 4;
  const max = chart.max > 0 ? chart.max : Math.max(...chart.bars.map((b) => b.value)) || 1;
  const slot = plotW / chart.bars.length;
  const barW = Math.min(72, slot * 0.5);
  const r = 4;

  return (
    <figure className="flex h-full flex-col gap-5 border border-line bg-white px-5 py-7 sm:px-8 sm:py-8">
      <figcaption className="flex flex-col gap-1.5">
        <h3 className="text-[19px] font-bold leading-[1.3] text-ink">{chart.title}</h3>
        <p className="text-[15px] leading-[1.6] text-muted">{chart.caption}</p>
      </figcaption>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto h-auto w-full max-w-[28rem]"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-table`}
      >
        <title id={`${id}-title`}>{chart.title}</title>
        {/* Grid and axis ticks */}
        {Array.from({ length: ticks + 1 }, (_, i) => {
          const value = (max / ticks) * i;
          const y = baseline - (plotH * i) / ticks;
          return (
            <g key={i}>
              <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke={GRID} strokeWidth={1} strokeDasharray={i === 0 ? undefined : "3 4"} />
              <text x={pad.left - 10} y={y + 4} textAnchor="end" fontSize={12} fill={MUTED} fontFamily="inherit">
                {formatTick(value, chart.format)}
              </text>
            </g>
          );
        })}

        {chart.bars.map((bar, i) => {
          const h = Math.max(0, Math.min(1, bar.value / max)) * plotH;
          const x = pad.left + slot * i + (slot - barW) / 2;
          const y = baseline - h;
          const rr = Math.min(r, h);
          const d = `M${x} ${baseline} V${y + rr} Q${x} ${y} ${x + rr} ${y} H${x + barW - rr} Q${x + barW} ${y} ${x + barW} ${y + rr} V${baseline} Z`;
          return (
            <g key={bar.label}>
              <path d={d} fill={bar.emphasis ? GOLD : REFERENCE}>
                <title>{`${bar.label}: ${bar.display}`}</title>
              </path>
              <text x={x + barW / 2} y={y - 9} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} fontFamily="inherit">
                {bar.display}
              </text>
              <text x={x + barW / 2} y={baseline + 20} textAnchor="middle" fontSize={13} fill={MUTED} fontFamily="inherit">
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>

      <table id={`${id}-table`} className="sr-only">
        <caption>{chart.title}</caption>
        <tbody>
          {chart.bars.map((bar) => (
            <tr key={bar.label}>
              <th scope="row">{bar.label}</th>
              <td>{bar.display}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
