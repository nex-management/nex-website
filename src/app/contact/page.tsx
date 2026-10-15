import type { Metadata } from "next";
import { Suspense } from "react";
import { getSiteSettings } from "@/content";
import { contactPage } from "@/content/pages";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContactForm } from "@/components/home/ContactForm";
import { TextLink } from "@/components/ui/Button";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.intro,
};

const detailLabel = "text-[11px] font-bold uppercase tracking-[0.18em] text-muted-2";

/** Reads the ?topic= query parameter (runtime data) and renders the form with it preselected. */
async function FormWithTopic({
  searchParams,
  fallbackEmail,
}: {
  searchParams: Promise<{ topic?: string | string[] }>;
  fallbackEmail: string;
}) {
  const { topic } = await searchParams;
  const requested = Array.isArray(topic) ? topic[0] : topic;
  const defaultTopic = contactPage.topics.some((t) => t.value === requested) ? requested : undefined;
  return <ContactForm fallbackEmail={fallbackEmail} topics={contactPage.topics} defaultTopic={defaultTopic} />;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string | string[] }>;
}) {
  const site = await getSiteSettings();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.line1}, ${site.address.line2}`)}`;

  return (
    <>
      <Header currentPath="/contact" />
      <main className="flex flex-1 flex-col">
        <section className="bg-white">
          <div className="container-x flex flex-wrap gap-x-24 gap-y-14 pb-[120px] pt-24">
            <div className="flex min-w-0 flex-[1_1_23.75rem] flex-col gap-7">
              <Eyebrow>{contactPage.eyebrow}</Eyebrow>
              <Heading as="h1" size="xl" className="!text-[clamp(2.875rem,5.2vw,4.75rem)]">
                {contactPage.heading}
              </Heading>
              <p className="text-[17px] leading-[1.7] text-body">{contactPage.intro}</p>

              <dl className="flex flex-col gap-5 border-t border-line pt-7 text-[15px] leading-relaxed text-body">
                <div className="flex flex-col gap-1">
                  <dt className={detailLabel}>Office</dt>
                  <dd>
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <br />
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-gold-text">
                      Open in Maps
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className={detailLabel}>Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="text-ink">
                      {site.email}
                    </a>
                  </dd>
                </div>
                {site.phone || site.showPlaceholders ? (
                  <div className="flex flex-col gap-1">
                    <dt className={detailLabel}>Phone</dt>
                    <dd>
                      {site.phone ? (
                        <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="text-ink">
                          {site.phone}
                        </a>
                      ) : (
                        <span className="text-muted-3">[PHONE NUMBER]</span>
                      )}
                    </dd>
                  </div>
                ) : null}
                {site.schedulingUrl || site.showPlaceholders ? (
                  <div className="flex flex-col gap-1.5 pt-2">
                    <dt className="text-[15px] font-bold text-ink">Prefer to schedule directly?</dt>
                    <dd>
                      {site.schedulingUrl ? (
                        <TextLink href={site.schedulingUrl} target="_blank" rel="noopener noreferrer">
                          Book a private consultation →
                        </TextLink>
                      ) : (
                        <span className="label-caps text-muted-3">[Booking link pending]</span>
                      )}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <Suspense fallback={<ContactForm fallbackEmail={site.email} topics={contactPage.topics} />}>
              <FormWithTopic searchParams={searchParams} fallbackEmail={site.email} />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
