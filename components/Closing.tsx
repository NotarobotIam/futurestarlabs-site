import type { Heading } from "@/content/home";
import { HeadingText, SmartLink } from "./ui";

export type Cta = { label: string; href: string; primary?: boolean; external?: boolean };

/** The closing call-to-action block from the home page, shared by every page. */
export default function Closing({ label, heading, ctas }: { label: string; heading: Heading; ctas: Cta[] }) {
  return (
    <section className="closing">
      <div className="wrap">
        <div className="label mb-[18px]">{label}</div>
        <h2>
          <HeadingText heading={heading} />
        </h2>
        <div className="cta-row">
          {ctas.map((c) => (
            <SmartLink
              key={c.label}
              href={c.href}
              external={c.external}
              className={`btn${c.primary ? " primary" : ""}`}
            >
              {c.label}
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}
