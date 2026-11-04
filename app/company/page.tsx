import type { Metadata } from "next";
import Closing from "@/components/Closing";
import { StackDiagram } from "@/components/diagrams";
import PageHero, { HeroAside } from "@/components/PageHero";
import StepThrough from "@/components/StepThrough";
import { pad, SecHead, StatusPill } from "@/components/ui";
import { COMPANY } from "@/content/company";

export const metadata: Metadata = {
  title: COMPANY.meta.title,
  description: COMPANY.meta.description,
  alternates: { canonical: "/company" },
  openGraph: { title: COMPANY.meta.title, description: COMPANY.meta.description, url: "/company" },
};

export default function CompanyPage() {
  const c = COMPANY;
  return (
    <>
      <PageHero
        crumbs={[{ label: "← Home", href: "/" }, { label: "Company" }]}
        label="Programmable biological testing platforms"
        chain={c.roadmap.steps.map((s) => ({ label: s.k }))}
        title={c.title}
        accent={c.titleAccent}
        lede={c.lede}
        leadExtra={
          <div className="legend-row">
            {c.legend.map((s) => (
              <StatusPill key={s.label} status={s} />
            ))}
          </div>
        }
        aside={
          <HeroAside label="Company">
            <dl>
              {c.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </HeroAside>
        }
      />

      <section id="problem">
        <div className="wrap">
          <SecHead no={`01 · ${c.problem.label}`} heading={c.problem.heading} />
          <ul className="tiles">
            {c.problem.cards.map((x, i) => (
              <li key={x.title}>
                <div className="topline">
                  <span className="eq">{pad(i + 1)}</span>
                  <span className="label">{c.problem.label}</span>
                </div>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="approach">
        <div className="wrap">
          <SecHead no={`02 · ${c.approach.label}`} heading={c.approach.heading} lede={c.approach.lede} />
          <StepThrough
            steps={c.approach.steps}
            caption="Fig. 01 · From engineered surface to software"
            figClass="stack-fig"
          >
            <StackDiagram layers={c.approach.steps.map((s) => ({ title: s.title, tone: s.status!.tone }))} />
          </StepThrough>
        </div>
      </section>

      <section id="roadmap">
        <div className="wrap">
          <SecHead no={`03 · ${c.roadmap.label}`} heading={c.roadmap.heading} />
          <ol className="method three">
            {c.roadmap.steps.map((s) => (
              <li key={s.k}>
                <span className="k big">{s.k}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {s.status && <StatusPill status={s.status} />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="team">
        <div className="wrap">
          <SecHead no={`04 · ${c.team.label}`} heading={c.team.heading} />
          <ul className="tiles">
            {c.team.people.map((p) => (
              <li key={p.name}>
                <span className="role">{p.role}</span>
                <h3>{p.name}</h3>
                <p>{p.bio}</p>
              </li>
            ))}
          </ul>
          <div className="facts-row">
            <span>{c.team.programsLabel}</span>
            {c.team.programs.map((p) => (
              <span key={p.name}>
                <b>{p.name}</b>
                {p.detail}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Closing
        label="Our first product"
        heading={{ text: "BacteSign" }}
        ctas={[
          { label: "BacteSign →", href: "/bactesign", primary: true },
          { label: "← Back to home", href: "/" },
        ]}
      />
    </>
  );
}
