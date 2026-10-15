import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/brand/nex-logo.png";
import { getNavigation, getSiteSettings } from "@/content";
import { Icon } from "@/components/ui/Icon";

const linkClass =
  "label-caps py-2.5 text-ink no-underline transition-colors hover:text-gold-text";

export function Header({ currentPath = "/" }: { currentPath?: string }) {
  const site = getSiteSettings();
  const { main } = getNavigation();

  const isCurrent = (href: string) => href === currentPath;

  const investorLogin = site.investorLoginUrl ? (
    <Link
      href={site.investorLoginUrl}
      className="label-caps py-2.5 text-muted no-underline transition-colors hover:text-ink"
    >
      Investor Login
    </Link>
  ) : (
    <span
      className="label-caps py-2.5 text-muted-3"
      title="Investor portal coming soon"
      aria-disabled="true"
    >
      Investor Login
    </span>
  );

  return (
    <header className="relative z-40 border-b border-line bg-white">
      <div className="container-x flex min-h-[88px] items-center justify-between gap-x-8 gap-y-4">
        <Link href="/" aria-label={`${site.brandName} – home`} className="flex items-center py-3.5">
          <Image src={logo} alt="Nex Group Management" priority className="h-[46px] w-auto md:h-[54px]" />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={`${linkClass} ${
                isCurrent(item.href) ? "border-b-2 border-gold text-gold-text" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          {investorLogin}
          <Link
            href="/#contact"
            className="label-caps rounded-[2px] bg-gold px-6 py-3.5 text-ink no-underline transition-colors hover:bg-[#b8962e]"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile navigation: native <details>, works without JavaScript */}
        <details className="group lg:hidden">
          <summary
            className="no-marker flex size-11 cursor-pointer items-center justify-center rounded-[2px] text-ink hover:bg-cream"
            aria-label="Menu"
          >
            <Icon name="menu" size={26} className="group-open:hidden" />
            <Icon name="close" size={26} className="hidden group-open:block" />
          </summary>
          <nav
            aria-label="Main"
            className="absolute inset-x-0 top-full flex flex-col border-b border-line bg-white px-5 pb-6 pt-2 shadow-[0_24px_40px_-24px_rgba(22,21,15,0.35)]"
          >
            {main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
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
                href="/#contact"
                className="label-caps rounded-[2px] bg-gold px-6 py-4 text-center text-ink no-underline"
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
