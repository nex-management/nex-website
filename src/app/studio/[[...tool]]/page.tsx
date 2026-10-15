import type { Metadata } from "next";
import { sanityConfigured } from "../../../../sanity/env";
import { Studio } from "./Studio";

export const metadata: Metadata = {
  title: "Content editor",
  robots: { index: false, follow: false },
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" as const };

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
        <p className="eyebrow text-gold-deep">Content editor</p>
        <h1 className="font-display text-4xl font-semibold text-ink">Not connected yet</h1>
        <p className="max-w-[36rem] text-[15px] leading-relaxed text-body">
          The editing panel becomes available once the Sanity project is created and{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-[13px]">NEXT_PUBLIC_SANITY_PROJECT_ID</code> is set on the host.
          Until then the site is served from the content files in the code.
        </p>
      </main>
    );
  }
  return <Studio />;
}
