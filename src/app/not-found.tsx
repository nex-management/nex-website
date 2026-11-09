import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export const metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        <section className="flex flex-1 items-center border-b border-line bg-cream">
          <div className="container-x section-y flex flex-col items-start gap-6">
            <Eyebrow tone="cream">Error 404</Eyebrow>
            <Heading as="h1" size="xl" className="!text-[clamp(2.875rem,5.2vw,4.75rem)]">
              Page not found
            </Heading>
            <p className="max-w-[36rem] text-[17px] leading-[1.7] text-body">
              The page you were looking for doesn&rsquo;t exist or has moved. Our properties, services and contact details are
              all one click away.
            </p>
            <div className="flex flex-col gap-3.5 pt-2 xs:flex-row xs:flex-wrap">
              <ButtonLink href="/" variant="gold">
                Back to the homepage
              </ButtonLink>
              <ButtonLink href="/portfolio" variant="outline-dark">
                View the portfolio
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
