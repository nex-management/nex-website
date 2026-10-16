"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import logo from "../../public/images/brand/nex-logo-sm.png";
import { site } from "@/content/site";
import { Button, ButtonLink } from "@/components/ui/Button";

/** Shown instead of a page when rendering fails; the rest of the site keeps working. */
export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <header className="relative z-40 border-b border-line bg-white">
        <div className="container-x flex min-h-[88px] items-center">
          <Link href="/" aria-label={`${site.brandName} – home`} className="flex items-center py-3.5">
            <Image src={logo} alt={site.brandName} unoptimized className="h-[46px] w-auto md:h-[54px]" />
          </Link>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        <section className="flex flex-1 items-center bg-cream">
          <div className="container-x section-y flex flex-col items-start gap-6">
            <p className="eyebrow text-gold-deep">Something went wrong</p>
            <h1 className="font-display text-[clamp(2.875rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.01em] text-ink">
              This page couldn&rsquo;t be shown
            </h1>
            <p className="max-w-[36rem] text-[17px] leading-[1.7] text-body">
              Please try again in a moment. If it keeps happening, email us at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-ink underline decoration-gold underline-offset-4">
                {site.email}
              </a>
              .
            </p>
            <div className="flex flex-col gap-3.5 pt-2 xs:flex-row xs:flex-wrap">
              <Button variant="gold" onClick={() => retry()}>
                Try again
              </Button>
              <ButtonLink href="/" variant="outline-dark">
                Back to the homepage
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
