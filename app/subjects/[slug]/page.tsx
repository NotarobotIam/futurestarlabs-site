import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Closing from "@/components/Closing";
import PageHero, { HeroAside } from "@/components/PageHero";
import { pad, SecHead } from "@/components/ui";
import { FSL } from "@/content/site";
import { getSubject, SUBJECTS, type Block } from "@/content/subjects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSubject((await params).slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.summary,
    alternates: { canonical: `/subjects/${s.slug}` },
    openGraph: { title: s.name, description: s.summary, url: `/subjects/${s.slug}`, type: "article" },
  };
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul>
          {block.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      );
    case "eq":
      return (
        <div className="eqblock">
          <code>{block.code}</code>
          <span>{block.note}</span>
        </div>
      );
  }
}

export default async function SubjectPage({ params }: Props) {
  const { slug } = await params;
  const s = getSubject(slug);
  if (!s) notFound();
  const i = SUBJECTS.indexOf(s);
  const next = SUBJECTS[(i + 1) % SUBJECTS.length];
  const eqs = s.sections.flatMap((x, j) =>
    x.body.flatMap((b) => (b.type === "eq" ? [{ ...b, section: x, n: j + 1 }] : [])),
  );
  const firstEq = eqs[0];

  return (
    <>
      <PageHero
        crumbs={[{ label: "← Notebook", href: "/#notebook" }, { label: s.name }]}
        label={`Subject ${pad(i + 1)} · ${s.field}`}
        chain={s.sections.map((x) => ({ label: x.title, href: `#${x.id}` }))}
        title={s.name}
        lede={s.summary}
        aside={
          <HeroAside label={`Notebook · ${pad(i + 1)} of ${pad(SUBJECTS.length)}`}>
            {firstEq ? (
              <>
                <div className="aside-eq">{firstEq.code}</div>
                <div className="aside-note">{firstEq.note}</div>
              </>
            ) : (
              <div className="probe-val">
                {pad(s.sections.length)}
                <small> {s.sections.length === 1 ? "section" : "sections"}</small>
              </div>
            )}
          </HeroAside>
        }
      />

      {eqs.length >= 2 && (
        <section className="compact" id="equations">
          <div className="wrap">
            <SecHead no="Equations" heading={{ text: "The equations", em: "at a glance." }} />
            <ul className={`tiles${eqs.length >= 3 ? " three" : ""}`}>
              {eqs.map((e) => (
                <li key={e.code}>
                  <div className="topline">
                    <span className="eq">{e.code}</span>
                  </div>
                  <p>{e.note}</p>
                  <a className="textlink" href={`#${e.section.id}`}>
                    §{e.n} {e.section.title} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {s.sections.map((x, j) => (
        <section className="compact" id={x.id} key={x.id}>
          <div className="wrap">
            <div className="sec-head flush">
              <div className="sec-no">
                §{j + 1} · {s.name}
              </div>
              <div>
                <h2>{x.title}</h2>
                <div className="subj-sec flat">
                  {x.body.map((b, k) => (
                    <BlockView block={b} key={k} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <Closing
        label="Next subject"
        heading={{ text: next.name }}
        ctas={[
          { label: `Next: ${next.name} →`, href: `/subjects/${next.slug}`, primary: true },
          { label: "Original notes on futurestarlabs.com ↗", href: `${FSL}/${s.orig}`, external: true },
          { label: "Open the notebook", href: "/#notebook" },
        ]}
      />
    </>
  );
}
