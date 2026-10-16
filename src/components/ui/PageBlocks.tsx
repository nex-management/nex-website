import type { ReactNode } from "react";
import { ButtonLink } from "./Button";
import { Eyebrow, Heading } from "./Typography";

/** Cream band at the top of an inner page: eyebrow, H1, lead paragraph. */
export function PageIntro({ eyebrow, heading, lead }: { eyebrow: string; heading: string; lead?: string }) {
  return (
    <section className="border-b border-line bg-cream">
      <div className="container-x band-y flex flex-wrap items-end gap-x-20 gap-y-10">
        <div className="flex min-w-0 max-w-[46rem] flex-[1_1_36rem] flex-col gap-5">
          <Eyebrow tone="cream">{eyebrow}</Eyebrow>
          <Heading as="h1" size="xl" className="!text-[clamp(2.875rem,5.2vw,4.75rem)]">
            {heading}
          </Heading>
        </div>
        {lead ? <p className="max-w-[35rem] flex-[0_1_28rem] pb-2.5 text-lg leading-[1.7] text-body">{lead}</p> : null}
      </div>
    </section>
  );
}

/** Closing call-to-action band used at the bottom of inner pages. */
export function CtaBand({
  heading,
  text,
  button,
  tone = "dark",
  children,
}: {
  heading: string;
  text?: string;
  button?: { label: string; href: string };
  tone?: "dark" | "cream";
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section className={dark ? "bg-ink text-white" : "border-t border-line bg-cream"}>
      <div className="container-x band-y flex flex-wrap items-center justify-between gap-x-16 gap-y-8">
        <div className="flex max-w-[40rem] flex-[1_1_24rem] flex-col gap-4">
          <h2 className={`font-display text-[clamp(1.875rem,3vw,2.75rem)] font-semibold leading-[1.1] ${dark ? "text-white" : "text-ink"}`}>
            {heading}
          </h2>
          {text ? <p className={`text-[17px] leading-[1.7] ${dark ? "text-sand" : "text-body"}`}>{text}</p> : null}
        </div>
        {button ? (
          <ButtonLink href={button.href} variant={dark ? "gold" : "dark"}>
            {button.label}
          </ButtonLink>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/** Two-column text block: small heading on the left, prose on the right. */
export function SplitText({ eyebrow, heading, children }: { eyebrow: string; heading: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start gap-x-20 gap-y-10">
      <div className="flex min-w-0 flex-[1_1_22rem] flex-col gap-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading>{heading}</Heading>
      </div>
      <div className="flex min-w-0 flex-[1_1_30rem] flex-col gap-[22px] text-[17px] leading-[1.7] text-body">{children}</div>
    </div>
  );
}
