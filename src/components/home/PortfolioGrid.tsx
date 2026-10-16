"use client";

import Link from "next/link";
import { useState } from "react";
import type { Hotel, HotelType } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { Picture } from "@/components/ui/Picture";
import { DotList } from "@/components/ui/Typography";

type Filter = "All" | HotelType;

export function PortfolioGrid({
  hotels,
  types,
  linkToPages = false,
  headingLevel = "h3",
}: {
  hotels: Hotel[];
  types: HotelType[];
  /** When true, each card links to the hotel's own page. */
  linkToPages?: boolean;
  /** Heading level of the hotel names: h2 when the grid sits directly under the page's h1. */
  headingLevel?: "h2" | "h3";
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? hotels : hotels.filter((h) => h.type === filter);
  const filters: Filter[] = ["All", ...types];

  return (
    <div className="flex flex-col gap-12">
      {types.length > 1 ? (
        <div role="group" aria-label="Filter properties by type" className="flex flex-wrap gap-2.5 border-b border-line pb-6">
          {filters.map((value) => {
            const active = value === filter;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(value)}
                className={`cursor-pointer rounded-[2px] border px-[18px] py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
                  active ? "border-ink bg-ink text-white" : "border-line-3 bg-white text-ink hover:border-ink"
                }`}
              >
                {value}
              </button>
            );
          })}
          <p role="status" className="sr-only">
            Showing {visible.length} of {hotels.length} properties
          </p>
        </div>
      ) : null}

      <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-x-6 gap-y-8 p-0">
        {visible.map((hotel) => (
          <li key={hotel.slug}>
            <HotelCard hotel={hotel} href={linkToPages ? `/portfolio/${hotel.slug}` : null} headingLevel={headingLevel} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HotelPhoto({
  hotel,
  sizes,
  className = "",
  priority = false,
}: {
  hotel: Hotel;
  sizes: string;
  className?: string;
  /** True for the main photo at the top of a hotel page (loads first). */
  priority?: boolean;
}) {
  if (hotel.image) {
    return (
      <div className={`relative aspect-[16/10] overflow-hidden ${className}`}>
        <Picture
          image={hotel.image}
          sizes={sizes}
          priority={priority}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${hotel.name} – photo coming soon`}
      className={`flex aspect-[16/10] flex-col items-center justify-center gap-2.5 border border-ink-5 bg-ink-4 ${className}`}
    >
      <Icon name="hotel" size={34} strokeWidth={1.2} className="text-sand-2" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-2">Photo coming soon</p>
    </div>
  );
}

function HotelCard({ hotel, href, headingLevel }: { hotel: Hotel; href: string | null; headingLevel: "h2" | "h3" }) {
  const HeadingTag = headingLevel;
  const body = (
    <>
      <HotelPhoto hotel={hotel} sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw" />
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-text">{hotel.type} Hotel</p>
      <HeadingTag className="text-[21px] font-bold leading-[1.25] text-ink">{hotel.name}</HeadingTag>
      <p className="text-sm leading-normal text-muted">{hotel.address}</p>
      <DotList items={hotel.highlights} />
    </>
  );

  if (!href) return <article className="flex flex-col gap-4">{body}</article>;

  return (
    <article className="group flex flex-col gap-4">
      <Link href={href} className="flex flex-col gap-4 no-underline">
        {body}
        <span className="label-caps self-start border-b border-gold pb-1 text-ink transition-colors group-hover:text-gold-text">
          View property<span aria-hidden="true"> →</span>
        </span>
      </Link>
    </article>
  );
}
