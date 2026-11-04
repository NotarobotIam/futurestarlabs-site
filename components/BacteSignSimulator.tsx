"use client";

import { useState } from "react";
import { BACTESIGN, RESULTS, STRAIN_PROFILES, type StrainProfileId } from "@/content/bactesign";
import { StatusPill } from "./ui";

// Chart geometry (viewBox 560 × 300)
const X0 = 52, X1 = 544, Y0 = 250, Y1 = 16, TMAX = 6, YMAX = 20;
const sx = (t: number) => X0 + ((X1 - X0) * t) / TMAX;
const sy = (v: number) => Y0 - ((Y0 - Y1) * v) / YMAX;
// Illustrative control curve: a logistic impedance drop over six hours.
const f = (x: number) => 18 / (1 + Math.exp(-(x - 3) / 0.55));
const base = (t: number) => f(t) - f(0);
const path = (fn: (t: number) => number) => {
  let d = "";
  for (let i = 0; i <= 60; i++) {
    const t = i / 10;
    d += (i ? "L" : "M") + sx(t).toFixed(1) + " " + sy(fn(t)).toFixed(1);
  }
  return d;
};
const CONTROL_PATH = path(base);
const Y_TICKS = [0, 5, 10, 15, 20];
const X_TICKS = [0, 1, 2, 3, 4, 5, 6];

/** Concentration slider index 0–9 → 0.25 … 128 µg/mL in doubling steps. */
const concOf = (i: number) => 0.25 * Math.pow(2, i);
const concLabel = (c: number) => (c < 1 ? c.toFixed(2) : String(c));

export default function BacteSignSimulator() {
  const [profile, setProfile] = useState<StrainProfileId>("susceptible");
  const [ci, setCi] = useState(4);
  const sim = BACTESIGN.simulator;

  const mic = STRAIN_PROFILES.find((p) => p.id === profile)!.mic;
  const c = concOf(ci);
  const gr = 1 / (1 + Math.pow(c / mic, 2)); // growth factor
  const result = gr < 0.3 ? RESULTS.inhibited : gr < 0.7 ? RESULTS.partial : RESULTS.none;
  const protocol = JSON.stringify(
    {
      assay: "bactesign.susceptibility",
      sample: "strain_profile:" + profile,
      antibiotic_ug_per_ml: c,
      control_well: true,
      readout: "impedance",
      duration_h: 6,
      interval_min: 10,
      analysis: "ai_assisted",
    },
    null,
    2,
  );

  return (
    <>
      <div className="lab mt-[28px]">
        <div>
          <div className="sim-controls">
            <div>
              <span className="label" id="profileLabel">Strain profile</span>
              <div className="seg" role="group" aria-labelledby="profileLabel">
                {STRAIN_PROFILES.map((p) => (
                  <button key={p.id} aria-pressed={profile === p.id} onClick={() => setProfile(p.id)}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="slider">
              <label htmlFor="abConc">
                <span>Antibiotic concentration</span>
                <output htmlFor="abConc">{concLabel(c)} µg/mL</output>
              </label>
              <input
                type="range"
                id="abConc"
                min={0}
                max={9}
                step={1}
                value={ci}
                aria-valuetext={`${concLabel(c)} µg/mL`}
                onChange={(e) => setCi(+e.target.value)}
              />
            </div>
          </div>
          <svg
            id="simChart"
            viewBox="0 0 560 300"
            role="img"
            aria-label="Impedance drop over six hours for the untreated control and the treated sample"
          >
            <g>
              {Y_TICKS.map((v) => (
                <g key={v}>
                  <line x1={X0} x2={X1} y1={sy(v)} y2={sy(v)} className="grid" />
                  <text x={X0 - 10} y={sy(v) + 4} textAnchor="end">{v}</text>
                </g>
              ))}
              {X_TICKS.map((t) => (
                <text key={t} x={sx(t)} y={Y0 + 20} textAnchor="middle">{t}</text>
              ))}
              <text x={(X0 + X1) / 2} y={Y0 + 42} textAnchor="middle">Time (h)</text>
              <text transform={`translate(14 ${(Y0 + Y1) / 2}) rotate(-90)`} textAnchor="middle">
                Impedance drop (%)
              </text>
            </g>
            <path className="ctrl" d={CONTROL_PATH} />
            <path className="treat" d={path((t) => base(t) * gr)} />
            <circle r="5" className="dotc" cx={sx(6)} cy={sy(base(6) * gr)} />
          </svg>
          <div className="legend">
            <span><i />Control, no antibiotic</span>
            <span><i className="lg-t" />With antibiotic</span>
          </div>
        </div>
        <div className="readout" aria-live="polite">
          <div>
            <span className="label">Result at 6 h</span>
            <div className="mt-[10px]">
              <span className={`status ${result.cls}`}>{result.label}</span>
            </div>
          </div>
          <div>
            <span className="label">Growth signal vs control</span>
            <div className="big">{Math.round(gr * 100)}%</div>
          </div>
          <p className="text-muted">{result.explanation}</p>
        </div>
      </div>
      <div className="proto">
        <div className="proto-head">
          <span className="label">{sim.protocolLabel}</span>
          <StatusPill status={sim.protocolStatus} />
        </div>
        <pre tabIndex={0} aria-label="Protocol request JSON">{protocol}</pre>
        <p className="note">{sim.protocolNote}</p>
      </div>
      <p className="note">{sim.disclaimer}</p>
    </>
  );
}
