// Site-wide settings, navigation and footer links.

export const SITE_NAME = "Future Star Labs";

/** Canonical URL. Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is connected. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_DESCRIPTION =
  "Future Star Laboratories builds programmable biological testing platforms for Physical AI labs, starting with BacteSign, and publishes an open study notebook on physics, materials and energy.";

export const TAGLINE = "Matter → Signal → Discovery";

export const FSL = "https://futurestarlabs.com";

export type NavLink = { label: string; href: string; external?: boolean };

/** Header links before the Subjects dropdown. */
export const NAV_BEFORE: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "BacteSign", href: "/bactesign" },
  { label: "About", href: "/#about" },
];

/** Header links after the Subjects dropdown. */
export const NAV_AFTER: NavLink[] = [
  { label: "Percent Difference", href: `${FSL}/percent-difference`, external: true },
];

export const FOOTER_EXPLORE: NavLink[] = [
  { label: "Company", href: "/company" },
  { label: "BacteSign", href: "/bactesign" },
  { label: "Fields", href: "/#fields" },
  { label: "Thermoelectrics", href: "/#feature" },
  { label: "The notebook", href: "/#notebook" },
  { label: "Experiment", href: "/#experiment" },
];

export const FOOTER_ELSEWHERE: NavLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/futurestar33/", external: true },
  { label: "X", href: "https://www.x.com/FutureStar33", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/andre-childs-69659478/", external: true },
];
