import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHotel, getHotels, getSiteSettings } from "@/content";
import { hotelPage } from "@/content/pages";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HotelPhoto } from "@/components/home/PortfolioGrid";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/PageBlocks";
import { DotList, Eyebrow } from "@/components/ui/Typography";

export async function generateStaticParams() {
  const hotels = await getHotels();
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hotel = await getHotel(slug);
  if (!hotel) return { title: "Property not found" };
  return {
    title: `${hotel.name} – ${hotel.city}`,
    description: hotel.description ?? `${hotel.name}, a ${hotel.type.toLowerCase()} hotel in ${hotel.city}, managed by Nex Management.`,
  };
}

function Fact({ label, value, placeholder }: { label: string; value: string | null; placeholder: string | null }) {
  if (!value && !placeholder) return null;
  return (
    <div className="flex flex-col gap-1 border-t border-line pt-4">
      <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-2">{label}</dt>
      <dd className={`text-[17px] ${value ? "text-ink" : "text-muted-3"}`}>{value ?? placeholder}</dd>
    </div>
  );
}

export default async function HotelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [hotel, site] = await Promise.all([getHotel(slug), getSiteSettings()]);
  if (!hotel) notFound();

  const ph = (text: string) => (site.showPlaceholders ? `[${text}]` : null);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name}, ${hotel.address}`)}`;

  return (
    <>
      <Header currentPath="/portfolio" />
      <main className="flex flex-1 flex-col">
        <section className="border-b border-line bg-cream">
          <div className="container-x flex flex-col gap-8 pb-16 pt-12">
            <Link href="/portfolio" className="label-caps self-start text-muted no-underline hover:text-ink">
              {hotelPage.backLabel}
            </Link>
            <div className="flex flex-wrap items-end gap-x-20 gap-y-8">
              <div className="flex min-w-0 flex-[1_1_26rem] flex-col gap-5">
                <Eyebrow tone="cream">
                  {hotel.type} Hotel · {hotel.city}
                </Eyebrow>
                <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.01em] text-ink">
                  {hotel.name}
                </h1>
                <p className="text-lg text-body">
                  {hotel.address} ·{" "}
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-gold-text">
                    Map
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-x flex flex-wrap items-start gap-x-20 gap-y-12 py-[88px]">
            <div className="flex min-w-0 flex-[1_1_32rem] flex-col gap-10">
              <HotelPhoto hotel={hotel} sizes="(min-width: 1280px) 760px, 100vw" />
              {hotel.gallery.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-text">{hotelPage.galleryHeading}</h2>
                  <ul className="grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3">
                    {hotel.gallery.map((img) => (
                      <li key={img.src} className="relative aspect-[4/3] overflow-hidden">
                        <Image src={img.src} alt={img.alt} unoptimized={img.unoptimized} fill sizes="(min-width: 1280px) 240px, 33vw" className="object-cover" />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="flex flex-col gap-4 text-[17px] leading-[1.7] text-body">
                {hotel.description ? (
                  <p>{hotel.description}</p>
                ) : (
                  <p>
                    {hotel.name} is a {hotel.type.toLowerCase()} hotel in {hotel.city}, Florida
                    {hotel.brand ? `, operated under ${hotel.brand}` : ""} and managed by Nex Management.
                  </p>
                )}
                {!hotel.description && site.showPlaceholders ? (
                  <p className="text-muted-3">[Property description – to be provided]</p>
                ) : null}
              </div>
            </div>

            <aside className="flex min-w-0 flex-[1_1_18rem] flex-col gap-8 lg:max-w-[22rem]">
              <div className="flex flex-col gap-5">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-text">{hotelPage.factsHeading}</h2>
                <dl className="flex flex-col gap-4">
                  <Fact label="Brand" value={hotel.brand ?? "Independent"} placeholder={null} />
                  <Fact label="Rooms" value={hotel.rooms ? String(hotel.rooms) : null} placeholder={ph("ROOMS")} />
                  <Fact label="Managed since" value={hotel.managedSince ? String(hotel.managedSince) : null} placeholder={ph("YEAR")} />
                  <Fact label="Relationship" value={hotel.ownership} placeholder={ph("Owned / Managed")} />
                </dl>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-text">{hotelPage.highlightsHeading}</h2>
                <DotList items={hotel.highlights} size="md" className="!border-t-0 !pt-0" />
              </div>
              <ButtonLink href={hotelPage.cta.button.href} variant="outline-dark" className="self-start">
                {hotelPage.cta.button.label}
              </ButtonLink>
            </aside>
          </div>
        </section>

        <CtaBand heading={hotelPage.cta.heading} button={hotelPage.cta.button} />
      </main>
      <Footer />
    </>
  );
}
