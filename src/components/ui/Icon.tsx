import type { SVGProps } from "react";

export type IconName =
  | "building"
  | "search"
  | "house"
  | "ledger"
  | "compass"
  | "star"
  | "plane"
  | "family"
  | "play"
  | "mail"
  | "linkedin"
  | "menu"
  | "close"
  | "hotel";

const paths: Record<IconName, React.ReactNode> = {
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M10 21v-3h4v3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
      <path d="M8 11h6M11 8v6" />
    </>
  ),
  house: (
    <>
      <path d="M3 21h18" />
      <path d="M4 21V10l8-6 8 6v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M12 4v3" />
    </>
  ),
  ledger: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h8M8 11h3M13 11h3M8 15h3M13 15h3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  star: <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7z" />,
  plane: (
    <>
      <path d="M2.5 19h19" />
      <path d="M3.8 13.4 7 11.8l9.4-6.4a2 2 0 0 1 2.4 3.2L13 13.6l-1.8 4.6-2.1-1.1.7-3.6-3.7 1.9z" />
    </>
  ),
  family: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M15.5 14.4c2.6.3 5.5 2 5.5 5.6" />
    </>
  ),
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  hotel: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 10h2M13 10h2M9 14h2M13 14h2" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  /** Set a label to expose the icon to assistive tech; otherwise it is decorative. */
  label?: string;
};

export function Icon({ name, size = 24, label, strokeWidth = 1.5, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
