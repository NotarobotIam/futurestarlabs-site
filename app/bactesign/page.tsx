import type { Metadata } from "next";
import BacteSignSimulator from "@/components/BacteSignSimulator";
import Closing from "@/components/Closing";
import { RunDiagram } from "@/components/diagrams";
import PageHero, { HeroAside } from "@/components/PageHero";
import StepThrough from "@/components/StepThrough";
import { SecHead, StatusPill } from "@/components/ui";
import { BACTESIGN } from "@/content/bactesign";

export const metadata: Metadata = {
  title: BACTESIGN.meta.title,
  description: BACTESIGN.meta.description,
  alternates: { canonical: "/bactesign" },
  openGraph: { title: BACTESIGN.meta.title, description: BACTESIGN.meta.description, url: "/bactesign" },
};

export default function BacteSignPage() {
  const b = BACTESIGN;
  return (
    <>
      <PageHero
        crumbs={[{ label: "← Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Product" }]}
        label="First product · Bacteria"
        chain={b.uses.map((u) => ({ label: u.title }))}
        title={b.title}
        lede={b.lede}
        aside={
          <HeroAside label="Status">
            <div className="stack">
              {b.legend.map((s) => (
                <StatusPill key={s.label} status={s} />
              ))}
            </div>
          </HeroAside>
        }
      >
        <ul className="tiles three">
          {b.uses.map((u) => (
            <li key={u.k}>
              <div className="topline">
                <span className="eq">{u.k}</span>
                <span className="label">Use</span>
              </div>
              <h2 className="card-h">{u.title}</h2>
              <p>{u.body}</p>
            </li>
          ))}
        </ul>
      </PageHero>

      <section id="how-it-works">
        <div className="wrap">
          <SecHead no={`01 · ${b.run.label}`} heading={b.run.heading} />
          <StepThrough steps={b.run.steps} caption="Fig. 01 · A run on the assay disc, schematic" figClass="run-fig">
            <RunDiagram />
          </StepThrough>
        </div>
      </section>

      <section id="simulator">
        <div className="wrap">
          <SecHead no={`02 · ${b.simulator.label}`} heading={b.simulator.heading} lede={b.simulator.lede} />
          <BacteSignSimulator />
        </div>
      </section>

      <Closing
        label="Back to"
        heading={{ text: "Future Star Labs" }}
        ctas={[
          { label: "Home →", href: "/", primary: true },
          { label: "← The company", href: "/company" },
        ]}
      />
    </>
  );
}
