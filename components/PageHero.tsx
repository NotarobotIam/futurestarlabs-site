import Link from "next/link";
import type { ReactNode } from "react";
import Chain, { type ChainItem } from "./Chain";

export type Crumb = { label: string; href?: string };

/** The home-page hero, reused at the top of every inner page. */
export default function PageHero({
  crumbs,
  label,
  chain,
  title,
  accent,
  lede,
  leadExtra,
  aside,
  children,
}: {
  crumbs: Crumb[];
  label?: string;
  /** Animated chain under the label, as on the home page. */
  chain?: ChainItem[];
  title: string;
  /** Optional second line, set in italic accent like "Labs" on the home page. */
  accent?: string;
  lede: string;
  /** Rendered under the lede, in the left column. */
  leadExtra?: ReactNode;
  /** The readout-style box on the right. */
  aside?: ReactNode;
  /** Rendered full width below the hero text. */
  children?: ReactNode;
}) {
  const longest = Math.max(...[title, accent ?? ""].flatMap((s) => s.split(" ")).map((w) => w.length));
  return (
    <section className="hero page-hero">
      <div className="wrap">
        <nav className="crumb" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.label} className="contents">
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        {label && <div className="label page-label">{label}</div>}
        {chain && <Chain items={chain} />}
        <h1 className={longest > 11 ? "long" : undefined}>
          {title}
          {accent && <span>{accent}</span>}
        </h1>
        <div className="hero-foot">
          <div>
            <p>{lede}</p>
            {leadExtra}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
}

/** The probe-style box used in page heroes. */
export function HeroAside({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="probe hero-aside">
      <div className="label">
        <span className="probe-dot" />
        {label}
      </div>
      {children}
    </div>
  );
}
