import { Suspense } from "react";
import { getSiteSettings } from "@/content";
import { contactPage } from "@/content/pages";
import { pageMeta } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContactForm } from "@/components/home/ContactForm";
import { ContactFormWithTopic } from "@/components/home/ContactFormWithTopic";
import { TextLink } from "@/components/ui/Button";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export const metadata = pageMeta({ title: "Contact", description: contactPage.intro, path: "/contact" });

const detailLabel = "text-[11px] font-bold uppercase tracking-[0.18em] text-muted-2";

export default async function ContactPage() {
  const site = await getSiteSettings();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.line1}, ${site.address.line2}`)}`;

  return (
    <>
      <Header currentPath="/contact" />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        <section className="bg-white">
          <div className="container-x section-y flex flex-wrap gap-x-24 gap-y-14">
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
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-text underline decoration-gold underline-offset-4 hover:text-ink"
                    >
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
                {site.phone ? (
                  <div className="flex flex-col gap-1">
                    <dt className={detailLabel}>Phone</dt>
                    <dd>
                      <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="text-ink">
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {site.schedulingUrl ? (
                  <div className="flex flex-col gap-1.5 pt-2">
                    <dt className="text-[15px] font-bold text-ink">Prefer to schedule directly?</dt>
                    <dd>
                      <TextLink href={site.schedulingUrl} target="_blank" rel="noopener noreferrer">
                        Book a private consultation
                      </TextLink>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <Suspense fallback={<ContactForm fallbackEmail={site.email} topics={contactPage.topics} />}>
              <ContactFormWithTopic fallbackEmail={site.email} topics={contactPage.topics} />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
