import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/brand/nex-logo-sm.png";
import { getCopyrightYear, getNavigation, getSiteSettings } from "@/content";

const footerLink = "text-sm text-sand-2 no-underline transition-colors hover:text-white";
const columnHeading = "text-[11px] font-bold uppercase tracking-[0.18em] text-white";

export async function Footer() {
  const [site, year] = await Promise.all([getSiteSettings(), getCopyrightYear()]);
  const { footer } = getNavigation();

  return (
    <footer className="border-t border-gold/30 bg-ink-deep text-sand-2">
      <div className="container-x flex flex-col gap-14 pb-10 pt-[72px]">
        <div className="flex flex-wrap justify-between gap-x-16 gap-y-12">
          <div className="flex max-w-[22.5rem] flex-[1_1_17.5rem] flex-col gap-5">
            <Image src={logo} alt={site.brandName} unoptimized className="h-16 w-auto self-start" />
            <p className="font-display text-[22px] font-medium italic text-sand-3">{site.tagline}</p>
            <p className="text-sm leading-relaxed text-muted-3">{site.shortDescription}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-16 gap-y-10">
            <div className="flex flex-col gap-3">
              <p className={columnHeading}>Company</p>
              {footer.company.map((item) => (
                <Link key={item.href} href={item.href} prefetch={false} className={footerLink}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className={columnHeading}>Investors</p>
              {footer.investors.map((item) => {
                if (item.label === "Investor Login") {
                  // The portal link appears once it exists; until then, a direct line to investor relations.
                  return site.investorLoginUrl ? (
                    <Link key={item.href} href={site.investorLoginUrl} prefetch={false} className={footerLink}>
                      {item.label}
                    </Link>
                  ) : (
                    <a key={item.href} href={`mailto:${site.email}`} className={footerLink}>
                      Investor relations
                    </a>
                  );
                }
                return (
                  <Link key={item.href} href={item.href} prefetch={false} className={footerLink}>
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              <p className={columnHeading}>Contact</p>
              <p className="text-sm leading-relaxed">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <a href={`mailto:${site.email}`} className={footerLink}>
                {site.email}
              </a>
              {site.phone ? (
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className={footerLink}>
                  {site.phone}
                </a>
              ) : null}
              {site.linkedinUrl ? (
                <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className={footerLink}>
                  LinkedIn
                </a>
              ) : null}
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink-line pt-7 text-xs leading-relaxed text-muted-3">
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-2">
            <p>
              © {year} {site.brandName}. All rights reserved.
            </p>
            <p>
              {site.legalName} · FEI Number: {site.feiNumber}
            </p>
            <Link href="/privacy" prefetch={false} className="text-sand-2 no-underline hover:text-white">
              Privacy Policy
            </Link>
          </div>
          <p className="max-w-[56rem]">{site.legalDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
