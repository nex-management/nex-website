import { getHomeContent, getSiteSettings } from "@/content";
import { TextLink } from "@/components/ui/Button";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { ContactForm } from "./ContactForm";

const detailLabel = "text-[11px] font-bold uppercase tracking-[0.18em] text-muted-2";

export function Contact() {
  const { contact } = getHomeContent();
  const site = getSiteSettings();

  return (
    <section id="contact" className="scroll-mt-20 bg-white">
      <div className="container-x flex flex-wrap gap-x-24 gap-y-14 py-[120px]">
        <div className="flex min-w-0 flex-[1_1_23.75rem] flex-col gap-7">
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <Heading>{contact.heading}</Heading>
          <p className="text-[17px] leading-[1.7] text-body">{contact.text}</p>

          <dl className="flex flex-col gap-5 border-t border-line pt-7 text-[15px] leading-relaxed text-body">
            <div className="flex flex-col gap-1">
              <dt className={detailLabel}>Office</dt>
              <dd>
                {site.address.line1}
                <br />
                {site.address.line2}
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
                <dt className="text-[15px] font-bold text-ink">{contact.scheduleHeading}</dt>
                <dd>
                  {site.schedulingUrl ? (
                    <TextLink href={site.schedulingUrl} target="_blank" rel="noopener noreferrer">
                      {contact.scheduleLabel}
                    </TextLink>
                  ) : (
                    <span className="label-caps text-muted-3">[Booking link pending]</span>
                  )}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <ContactForm fallbackEmail={site.email} />
      </div>
    </section>
  );
}
