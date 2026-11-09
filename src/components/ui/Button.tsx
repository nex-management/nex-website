import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "gold" | "outline-light" | "outline-dark" | "dark";

const base =
  "label-caps inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[2px] border px-7 py-3.5 text-center transition-colors duration-200 no-underline";

const variants: Record<Variant, string> = {
  // Gold on gold would hide the focus ring, so this one gets an ink ring everywhere.
  gold: "border-gold bg-gold text-ink hover:border-[#b8962e] hover:bg-[#b8962e] focus-visible:outline-ink",
  "outline-light": "border-white/55 text-white hover:border-white hover:bg-white/5",
  "outline-dark": "border-ink text-ink hover:bg-ink hover:text-white",
  dark: "border-ink bg-ink text-white hover:bg-ink-2",
};

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "gold", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant };

export function Button({ variant = "gold", className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} cursor-pointer disabled:cursor-default disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

/** Small text link with a gold underline and a trailing arrow, used for "Read more" style links. */
export function TextLink({ className = "", children, ...props }: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={`label-caps inline-block self-start border-b border-gold py-1.5 text-ink no-underline transition-colors hover:text-gold-text ${className}`}
      {...props}
    >
      {children}
      <span aria-hidden="true"> →</span>
    </Link>
  );
}
