import Image from "next/image";
import type { SiteSettings } from "@/content/types";
// The glyphs are the unchanged files from open icon libraries:
//   Facebook, Instagram – Simple Icons 16.38.1 (simpleicons.org, CC0-1.0)
//   LinkedIn – Font Awesome Free 7.3.1 (fontawesome.com, CC BY 4.0; the credit is inside the file).
//              Simple Icons no longer carries a LinkedIn glyph.
// The marks belong to their owners and are used here only to link to the company's own profiles.
import facebookGlyph from "../../../public/images/social/facebook.svg";
import instagramGlyph from "../../../public/images/social/instagram.svg";
import linkedinGlyph from "../../../public/images/social/linkedin.svg";

type Tone = "dark" | "light";

const ring: Record<Tone, string> = {
  dark: "border-ink-5 text-sand-2 hover:border-gold hover:text-white",
  light: "border-line-2 text-ink hover:border-gold",
};

type Props = {
  site: SiteSettings;
  /** "dark" on the footer, "light" on white sections. */
  tone?: Tone;
  className?: string;
};

/** Round icon links to the company's social profiles. Renders nothing while no profile is set. */
export function SocialLinks({ site, tone = "dark", className = "" }: Props) {
  const links = [
    site.facebookUrl ? { name: "Facebook", href: site.facebookUrl, glyph: facebookGlyph } : null,
    site.instagramUrl ? { name: "Instagram", href: site.instagramUrl, glyph: instagramGlyph } : null,
    site.linkedinUrl ? { name: "LinkedIn", href: site.linkedinUrl, glyph: linkedinGlyph } : null,
  ].filter((link) => link !== null);

  if (links.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            aria-label={`${site.brandName} on ${link.name} (opens in a new tab)`}
            className={`group flex size-10 items-center justify-center rounded-full border transition-colors ${ring[tone]}`}
          >
            <Image
              src={link.glyph}
              alt=""
              width={18}
              height={18}
              unoptimized
              className={`size-[18px] opacity-75 transition-opacity group-hover:opacity-100 ${tone === "dark" ? "invert" : ""}`}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
