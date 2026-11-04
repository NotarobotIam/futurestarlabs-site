import Link from "next/link";
import type { ReactNode } from "react";
import type { Heading } from "@/content/home";
import type { Status } from "@/content/status";
import type { PipelineItem } from "@/content/company";

const TONE_CLASS = { done: "st-done", dev: "st-dev", plan: "st-plan" } as const;

export function StatusPill({ status }: { status: Status }) {
  return <span className={`status ${TONE_CLASS[status.tone]}`}>{status.label}</span>;
}

export function HeadingText({ heading }: { heading: Heading }) {
  return (
    <>
      {heading.text}
      {heading.em && (
        <>
          {" "}
          <em>{heading.em}</em>
        </>
      )}
    </>
  );
}

export function SecHead({ no, heading, lede }: { no: string; heading: Heading; lede?: string }) {
  return (
    <div className="sec-head">
      <div className="sec-no">{no}</div>
      <div>
        <h2>
          <HeadingText heading={heading} />
        </h2>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </div>
  );
}

export function Pipeline({ items }: { items: PipelineItem[] }) {
  return (
    <ol className="pipeline">
      {items.map((it) => (
        <li key={it.k}>
          <span className="k">{it.k}</span>
          <div>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
          </div>
          {it.status && <StatusPill status={it.status} />}
        </li>
      ))}
    </ol>
  );
}

/** Internal links use next/link; external links open in a new tab. */
export function SmartLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="#ff9b45" strokeWidth="1.5" />
      <path d="M12 4.5 13.8 10.2 19.5 12 13.8 13.8 12 19.5 10.2 13.8 4.5 12 10.2 10.2Z" fill="#ebe7df" />
    </svg>
  );
}

export const pad = (n: number, w = 2) => String(n).padStart(w, "0");
