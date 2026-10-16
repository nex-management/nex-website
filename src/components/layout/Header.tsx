import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/brand/nex-logo-sm.png";
import { getNavigation, getSiteSettings } from "@/content";
import { Icon } from "@/components/ui/Icon";

const linkClass = "label-caps whitespace-nowrap py-2.5 text-ink no-underline transition-colors hover:text-gold-text";

export async function Header({ currentPath = "/" }: { currentPath?: string }) {
  const site = await getSiteSettings();
  const { main } = getNavigation();

  const isCurrent = (href: string) => href === currentPath;

  // Shown only once the investor portal has an address.
  const investorLogin = site.investorLoginUrl ? (
    <Link
      href={site.investorLoginUrl}
      prefetch={false}
      className="label-caps whitespace-nowrap py-2.5 text-muted no-underline transition-colors hover:text-ink"
    >
      Investor Login
    </Link>
  ) : null;

  return (
    <header className="relative z-40 border-b border-line bg-white">
      <div className="container-x flex min-h-[88px] items-center justify-between gap-x-8 gap-y-4">
        <Link href="/" prefetch={false} aria-label={`${site.brandName} – home`} className="flex items-center py-3.5">
          {/* Small pre-sized PNG (3× the rendered height); no image optimizer needed. */}
          <Image src={logo} alt={site.brandName} unoptimized className="h-[46px] w-auto md:h-[54px]" />
        </Link>

        {/* Desktop navigation (from 1280px; narrower screens get the menu button) */}
        <nav aria-label="Main" className="hidden items-center gap-8 xl:flex">
          {main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={`${linkClass} ${isCurrent(item.href) ? "border-b-2 border-gold text-gold-text" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 xl:flex">
          {investorLogin}
          <Link
            href="/contact"
            className="label-caps whitespace-nowrap rounded-[2px] bg-gold px-6 py-3.5 text-ink no-underline transition-colors hover:bg-[#b8962e] focus-visible:outline-ink"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile navigation: native <details>, works without JavaScript */}
        <details className="group xl:hidden">
          <summary
            className="no-marker flex size-11 cursor-pointer items-center justify-center rounded-[2px] text-ink hover:bg-cream"
            aria-label="Menu"
          >
            <Icon name="menu" size={26} className="group-open:hidden" />
            <Icon name="close" size={26} className="hidden group-open:block" />
          </summary>
          <nav
            aria-label="Main"
            className="absolute inset-x-0 top-full flex flex-col border-b border-line bg-white px-[clamp(1.25rem,5vw,4rem)] pb-6 pt-2 shadow-[0_24px_40px_-24px_rgba(22,21,15,0.35)]"
          >
            {main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={`border-b border-line py-4 text-[15px] font-semibold text-ink no-underline ${
                  isCurrent(item.href) ? "text-gold-text" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-4 pt-5">
              {investorLogin}
              <Link
                href="/contact"
                className="label-caps rounded-[2px] bg-gold px-6 py-4 text-center text-ink no-underline focus-visible:outline-ink"
              >
                Get in Touch
              </Link>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
