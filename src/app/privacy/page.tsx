import type { Metadata } from "next";
import { getSiteSettings } from "@/content";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default async function PrivacyPage() {
  const site = await getSiteSettings();

  return (
    <>
      <Header currentPath="/privacy" />
      <main className="flex flex-1 flex-col">
        <section className="border-b border-line bg-cream">
          <div className="container-x flex flex-col gap-5 pb-20 pt-24">
            <Eyebrow tone="cream">Legal</Eyebrow>
            <Heading as="h1" size="xl" className="!text-[clamp(2.875rem,5.2vw,4.75rem)]">
              Privacy Policy
            </Heading>
          </div>
        </section>
        <section className="bg-white">
          <div className="container-x flex max-w-[52rem] flex-col gap-6 py-20 text-[17px] leading-[1.7] text-body">
            {site.showPlaceholders ? (
              <p className="text-muted-3">[Privacy policy text to be provided by {site.legalName}.]</p>
            ) : null}
            <p>
              Questions about this policy can be sent to{" "}
              <a href={`mailto:${site.email}`} className="text-ink">
                {site.email}
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
