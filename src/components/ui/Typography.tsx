import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Tone = "light" | "cream" | "dark";

const eyebrowTone: Record<Tone, string> = {
  light: "text-gold-text",
  cream: "text-gold-deep",
  dark: "text-gold",
};

export function Eyebrow({
  tone = "light",
  className = "",
  ...props
}: ComponentPropsWithoutRef<"p"> & { tone?: Tone }) {
  return <p className={`eyebrow ${eyebrowTone[tone]} ${className}`} {...props} />;
}

type HeadingProps = {
  as?: ElementType;
  tone?: "light" | "dark";
  size?: "xl" | "lg" | "md";
  className?: string;
  children: ReactNode;
  id?: string;
};

const headingSize = {
  xl: "text-[clamp(2.875rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.01em]",
  lg: "text-[clamp(2.375rem,4vw,3.5rem)] leading-[1.08]",
  md: "text-[clamp(1.75rem,2.6vw,2.125rem)] leading-[1.1]",
};

/** Serif display heading (Cormorant Garamond). */
export function Heading({
  as: Tag = "h2",
  tone = "light",
  size = "lg",
  className = "",
  children,
  id,
}: HeadingProps) {
  return (
    <Tag
      id={id}
      className={`font-display font-semibold ${headingSize[size]} ${tone === "dark" ? "text-white" : "text-ink"} ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Eyebrow + heading (+ optional lead paragraph) laid out like the mockup: title left, lead right. */
export function SectionIntro({
  eyebrow,
  heading,
  lead,
  tone = "light",
  headingId,
  align = "split",
}: {
  eyebrow: string;
  heading: string;
  lead?: string;
  tone?: Tone;
  headingId?: string;
  align?: "split" | "stack" | "center";
}) {
  const leadColor = tone === "dark" ? "text-sand" : "text-body";
  if (align === "center") {
    return (
      <div className="mx-auto flex max-w-[45rem] flex-col items-center gap-[18px] text-center">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <Heading tone={tone === "dark" ? "dark" : "light"} id={headingId}>
          {heading}
        </Heading>
        {lead ? <p className={`text-[17px] leading-[1.7] ${leadColor}`}>{lead}</p> : null}
      </div>
    );
  }
  if (align === "stack") {
    return (
      <div className="flex max-w-[47.5rem] flex-col gap-[18px]">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <Heading tone={tone === "dark" ? "dark" : "light"} id={headingId}>
          {heading}
        </Heading>
        {lead ? <p className={`text-[17px] leading-[1.7] ${leadColor}`}>{lead}</p> : null}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-6">
      <div className="flex min-w-0 flex-[1_1_26rem] flex-col gap-[18px]">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <Heading tone={tone === "dark" ? "dark" : "light"} id={headingId}>
          {heading}
        </Heading>
      </div>
      {lead ? (
        <p className={`max-w-[30rem] flex-[1_1_22.5rem] text-[17px] leading-[1.7] ${leadColor}`}>{lead}</p>
      ) : null}
    </div>
  );
}

/** Gold dot bullet list used in cards. */
export function DotList({
  items,
  className = "",
  size = "sm",
}: {
  items: string[];
  className?: string;
  size?: "sm" | "md";
}) {
  if (items.length === 0) return null;
  return (
    <ul
      className={`flex list-none flex-col border-t border-line p-0 text-body ${
        size === "md" ? "gap-3 pt-5 text-[15px]" : "gap-1.5 pt-3.5 text-sm"
      } ${className}`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-2.5">
          <span
            aria-hidden="true"
            className={`relative -top-0.5 shrink-0 rounded-full bg-gold ${size === "md" ? "size-1.5" : "size-[5px]"}`}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
