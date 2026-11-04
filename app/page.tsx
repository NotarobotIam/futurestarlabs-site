import Link from "next/link";
import Closing from "@/components/Closing";
import CoupleDiagram from "@/components/CoupleDiagram";
import Hero from "@/components/home/Hero";
import Loader from "@/components/home/Loader";
import InterferenceCanvas from "@/components/InterferenceCanvas";
import SeebeckSimulator from "@/components/SeebeckSimulator";
import { pad, SecHead, StatusPill } from "@/components/ui";
import {
  ABOUT,
  CLOSING,
  EXPERIMENT,
  FEATURE,
  FIELDS_SECTION,
  METHOD,
  NOTEBOOK,
  PLATFORM,
} from "@/content/home";
import { FSL } from "@/content/site";
import { CHAPTERS, EXTERNAL_SUBJECTS, FIELDS, getSubject, notebookHref } from "@/content/subjects";

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />

      <section id="platform">
        <div className="wrap">
          <SecHead no={PLATFORM.no} heading={PLATFORM.heading} lede={PLATFORM.lede} />
          <div className="tree">
            <div className="tree-root">
              <span className="label">{PLATFORM.root.label}</span>
              <b>{PLATFORM.root.title}</b>
              <p>{PLATFORM.root.body}</p>
            </div>
            <div className="tree-stem" aria-hidden="true" />
            <div className="tree-kids">
              {PLATFORM.children.map((c) => (
                <Link className="tree-card" href={c.href} key={c.title}>
                  <div className="tc-top">
                    <span className="label">{c.label}</span>
                    <StatusPill status={c.status} />
                  </div>
                  <h3>{c.title}</h3>
                  <ul>
                    {c.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <span className="textlink">{c.cta}</span>
                </Link>
              ))}
            </div>
          </div>
          <p className="note">{PLATFORM.note}</p>
        </div>
      </section>

      <section id="about">
        <div className="wrap">
          <SecHead no={ABOUT.no} heading={ABOUT.heading} />
          <div className="about-grid">
            <figure>
              <InterferenceCanvas />
              <figcaption>
                <span>{ABOUT.figCaption}</span>
                <span>{ABOUT.figHint}</span>
              </figcaption>
            </figure>
            <ul className="pillars">
              {ABOUT.pillars.map((p) => (
                <li key={p.k}>
                  <span className="k">{p.k}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="fields">
        <div className="wrap">
          <SecHead no={FIELDS_SECTION.no} heading={FIELDS_SECTION.heading} lede={FIELDS_SECTION.lede} />
          <ul className="fields">
            {FIELDS.map((f, i) => (
              <li key={f.title}>
                <div className="topline">
                  <span className="eq">{f.eq}</span>
                  <span className="label">{pad(i + 1)}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                <div className="chips">
                  {f.links.map((l) => (
                    <Link key={l.label} href={notebookHref(l.ref)}>
                      {l.label} →
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="feature">
        <div className="wrap">
          <SecHead no={FEATURE.no} heading={FEATURE.heading} />
          <CoupleDiagram />
          <div className="facts">
            {FEATURE.facts.map((f) => (
              <div key={f.label}>
                <span className="label">{f.label}</span>
                <p>{f.body}</p>
              </div>
            ))}
            <div>
              <span className="label">{FEATURE.thermocouples.label}</span>
              <span className="eq">{FEATURE.thermocouples.eq}</span>
              <Link className="textlink" href={FEATURE.thermocouples.href}>
                {FEATURE.thermocouples.link}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="notebook">
        <div className="wrap">
          <SecHead no={NOTEBOOK.no} heading={NOTEBOOK.heading} />
          <div className="stats">
            {NOTEBOOK.stats.map((s) => (
              <div key={s.label}>
                <span className="label">{s.label}</span>
                <b>{s.value}</b>
              </div>
            ))}
          </div>
          <ol className="index">
            {CHAPTERS.map((c, i) => (
              <li key={c.title}>
                <Link href={notebookHref(c.ref)}>
                  <span className="n">{pad(i + 1, 3)}</span>
                  <span className="t">{c.title}</span>
                  <span className="e">{c.eq}</span>
                  <span className="s">{getSubject(c.ref.slug)?.name} →</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="also">
            <span className="label">{NOTEBOOK.alsoLabel}</span>
            {EXTERNAL_SUBJECTS.map((s) => (
              <a key={s.path} className="ext" href={`${FSL}/${s.path}`} target="_blank" rel="noopener">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="experiment">
        <div className="wrap">
          <SecHead no={EXPERIMENT.no} heading={EXPERIMENT.heading} lede={EXPERIMENT.lede} />
          <SeebeckSimulator />
          <p className="note">{EXPERIMENT.note}</p>
        </div>
      </section>

      <section id="method">
        <div className="wrap">
          <SecHead no={METHOD.no} heading={METHOD.heading} />
          <ol className="method">
            {METHOD.steps.map((m) => (
              <li key={m.k}>
                <span className="k">{m.k}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Closing label={CLOSING.label} heading={CLOSING.heading} ctas={CLOSING.ctas} />
    </>
  );
}
