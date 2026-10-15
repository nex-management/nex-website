import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "gold" | "outline-light" | "outline-dark" | "dark";

const base =
  "label-caps inline-flex items-center justify-center gap-2 rounded-[2px] text-center transition-colors duration-200 no-underline";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink px-7 py-[17px] hover:bg-[#b8962e] border border-gold hover:border-[#b8962e]",
  "outline-light":
    "border border-white/55 text-white px-7 py-4 hover:border-white hover:bg-white/5",
  "outline-dark": "border border-ink text-ink px-[26px] py-[15px] hover:bg-ink hover:text-white",
  dark: "bg-ink text-white border border-ink px-[26px] py-4 hover:bg-ink-2",
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

/** Small text link with a gold underline, used for "Read more →" style links. */
export function TextLink({ className = "", ...props }: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={`label-caps inline-block self-start border-b border-gold py-1.5 text-ink no-underline transition-colors hover:text-gold-text ${className}`}
      {...props}
    />
  );
}
