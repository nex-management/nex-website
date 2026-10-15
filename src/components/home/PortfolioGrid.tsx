"use client";

import Image from "next/image";
import { useState } from "react";
import type { Hotel, HotelType } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { DotList } from "@/components/ui/Typography";

type Filter = "All" | HotelType;

export function PortfolioGrid({ hotels, types }: { hotels: Hotel[]; types: HotelType[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? hotels : hotels.filter((h) => h.type === filter);
  const filters: Filter[] = ["All", ...types];

  return (
    <div className="flex flex-col gap-12">
      <div
        role="group"
        aria-label="Filter properties by type"
        className="flex flex-wrap gap-2.5 border-b border-line pb-6"
      >
        {filters.map((value) => {
          const active = value === filter;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(value)}
              className={`cursor-pointer rounded-[2px] border px-[18px] py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
                active
                  ? "border-ink bg-ink text-white"
                  : "border-line-3 bg-white text-ink hover:border-ink"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>

      <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(18.75rem,1fr))] gap-x-6 gap-y-8 p-0">
        {visible.map((hotel) => (
          <li key={hotel.slug}>
            <article className="flex flex-col gap-4">
              {hotel.image ? (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={hotel.image.src}
                    alt={hotel.image.alt}
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  role="img"
                  aria-label="Property photo placeholder"
                  className="flex aspect-[16/10] flex-col items-center justify-center gap-2.5 border border-ink-5 bg-ink-4"
                >
                  <Icon name="hotel" size={34} strokeWidth={1.2} className="text-muted-2" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-3">Property photo</p>
                </div>
              )}
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-text">{hotel.type} Hotel</p>
              <h3 className="text-[21px] font-bold leading-[1.25] text-ink">{hotel.name}</h3>
              <p className="text-sm leading-normal text-muted">{hotel.address}</p>
              <DotList items={hotel.highlights} />
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
