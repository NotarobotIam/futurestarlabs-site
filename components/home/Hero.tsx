"use client";

import { useEffect, useState } from "react";
import { HERO } from "@/content/home";
import Chain from "../Chain";
import { prefersReducedMotion } from "../motion";

export default function Hero() {
  const [probe, setProbe] = useState(23.4);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let v = 23.4;
    const p = setInterval(() => {
      v += (Math.random() - 0.5) * 0.12;
      v = Math.max(22.9, Math.min(23.9, v));
      setProbe(v);
    }, 900);
    return () => {
      clearInterval(p);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="label">{HERO.label}</div>
        <Chain items={HERO.chain.map((label) => ({ label }))} />
        <h1>
          {HERO.title}
          <span>{HERO.titleAccent}</span>
        </h1>
        <div className="hero-foot">
          <div>
            <p>{HERO.body}</p>
            <div className="verbs">{HERO.verbs}</div>
          </div>
          <div className="probe" aria-label="Decorative probe readout" role="img">
            <div className="label">
              <span className="probe-dot" />
              {HERO.probeLabel}
            </div>
            <div className="probe-val">
              <span>{probe.toFixed(1)}</span>
              <small> °C</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
