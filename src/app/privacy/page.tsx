import { getSiteSettings } from "@/content";
import { pageMeta } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Nex Management handles the details sent through this website.",
  path: "/privacy",
  noindex: true,
});

export default async function PrivacyPage() {
  const site = await getSiteSettings();

  return (
    <>
      <Header currentPath="/privacy" />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        <section className="border-b border-line bg-cream">
          <div className="container-x band-y flex flex-col gap-5">
            <Eyebrow tone="cream">Legal</Eyebrow>
            <Heading as="h1" size="xl" className="!text-[clamp(2.875rem,5.2vw,4.75rem)]">
              Privacy Policy
            </Heading>
          </div>
        </section>
        <section className="bg-white">
          <div className="container-x section-y">
            <div className="flex max-w-[52rem] flex-col gap-6 text-[17px] leading-[1.7] text-body">
            <p>
              {site.brandName} ({site.legalName}) uses the details you send through this website&rsquo;s contact form &mdash; your
              name, email address, phone number and message &mdash; only to respond to your inquiry. They are delivered to us by
              email and are not sold or shared with third parties for marketing. This website sets no cookies and uses no
              analytics; the video on the homepage is loaded from YouTube only when you choose to play it. A full privacy
              policy will be published here.
            </p>
            <p>
              Questions about this policy can be sent to{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-ink underline decoration-gold underline-offset-4">
                {site.email}
              </a>
              .
            </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
