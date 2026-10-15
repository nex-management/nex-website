import type { Metadata } from "next";
import Image from "next/image";
import { getHomeContent } from "@/content";
import { aboutPage } from "@/content/pages";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CtaBand, PageIntro, SplitText } from "@/components/ui/PageBlocks";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.intro,
};

export default function AboutPage() {
  const { about, ceoQuote } = getHomeContent();

  return (
    <>
      <Header currentPath="/about" />
      <main className="flex flex-1 flex-col">
        <PageIntro eyebrow={aboutPage.eyebrow} heading={aboutPage.heading} lead={aboutPage.intro} />

        {/* Story */}
        <section className="bg-white">
          <div className="container-x py-[110px]">
            <SplitText eyebrow={aboutPage.story.eyebrow} heading={aboutPage.story.heading}>
              {aboutPage.story.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </SplitText>
          </div>
        </section>

        {/* How we work */}
        <section className="border-y border-line bg-cream">
          <div className="container-x flex flex-col gap-14 py-[110px]">
            <div className="flex max-w-[47.5rem] flex-col gap-[18px]">
              <Eyebrow tone="cream">{aboutPage.approach.eyebrow}</Eyebrow>
              <Heading>{aboutPage.approach.heading}</Heading>
              <p className="text-[17px] leading-[1.7] text-body">{aboutPage.approach.intro}</p>
            </div>
            <ol className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {about.differentiators.map((item, index) => (
                <li key={item.title} className="flex flex-col gap-3.5 border border-line bg-white px-[30px] py-9">
                  <p className="font-display text-[34px] font-semibold leading-none text-gold" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-bold leading-[1.3] text-ink">{item.title}</h3>
                  <p className="text-[15px] leading-[1.65] text-muted">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Values + CEO quote */}
        <section className="bg-white">
          <div className="container-x flex flex-wrap items-center gap-x-24 gap-y-12 py-[110px]">
            <div className="flex min-w-0 flex-[1_1_28rem] flex-col gap-7">
              <Eyebrow>{aboutPage.values.eyebrow}</Eyebrow>
              <Heading>{aboutPage.values.heading}</Heading>
              <p className="text-[17px] leading-[1.7] text-body">{aboutPage.values.text}</p>
              <blockquote className="border-l-2 border-gold pl-6 font-display text-2xl font-medium italic leading-[1.4] text-ink">
                &ldquo;{ceoQuote.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <Image
                  src={ceoQuote.photo.src}
                  alt=""
                  width={112}
                  height={112}
                  sizes="56px"
                  className="size-14 rounded-full object-cover object-[50%_30%]"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[15px] font-bold text-ink">{ceoQuote.name}</p>
                  <p className="text-[13px] text-muted">{ceoQuote.title}</p>
                </div>
              </div>
            </div>
            <div className="min-w-[16rem] flex-[0_1_22rem]">
              <Image
                src={ceoQuote.photo.src}
                alt={ceoQuote.photo.alt}
                width={ceoQuote.photo.width ?? 800}
                height={ceoQuote.photo.height ?? 1000}
                sizes="(min-width: 1024px) 352px, 100vw"
                className="aspect-[4/5] w-full rounded-[2px] object-cover"
              />
            </div>
          </div>
        </section>

        <CtaBand heading={aboutPage.cta.heading} text={aboutPage.cta.text} button={aboutPage.cta.button} />
      </main>
      <Footer />
    </>
  );
}
