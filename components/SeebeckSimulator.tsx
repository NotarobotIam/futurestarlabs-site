"use client";

import { useState } from "react";
import { EXPERIMENT } from "@/content/home";

const ALPHA = 0.041; // mV per °C (Type K, linear approximation)
const T_MAX = 500;

const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
const STOPS: [number, [number, number, number]][] = [
  [0, [114, 180, 212]],
  [0.25, [150, 150, 150]],
  [0.6, [214, 96, 40]],
  [1, [255, 196, 120]],
];
/** 0 °C cool blue → 250 °C dull red-orange → 500 °C bright amber */
function tempColor(T: number) {
  const t = Math.max(0, Math.min(1, T / T_MAX));
  for (let i = 1; i < STOPS.length; i++) {
    if (t <= STOPS[i][0]) {
      const [p0, c0] = STOPS[i - 1];
      const [p1, c1] = STOPS[i];
      const u = (t - p0) / (p1 - p0);
      return `rgb(${lerp(c0[0], c1[0], u)},${lerp(c0[1], c1[1], u)},${lerp(c0[2], c1[2], u)})`;
    }
  }
  return "rgb(255,196,120)";
}

export default function SeebeckSimulator() {
  const [cold, setCold] = useState(20);
  const [hot, setHot] = useState(320);
  const dT = hot - cold;
  const V = ALPHA * dT;
  const sign = dT > 0 ? "+" : dT < 0 ? "−" : "";
  const dTText = `${sign}${Math.abs(dT)}`;
  const vText = `${V < 0 ? "−" : ""}${Math.abs(V).toFixed(2)}`;
  const cc = tempColor(cold);
  const hc = tempColor(hot);

  return (
    <div className="lab">
      <div>
        <svg
          id="junction"
          viewBox="0 0 520 170"
          role="img"
          aria-label="Thermocouple wire running from the cold junction on the left to the hot junction on the right, colored by temperature."
        >
          <defs>
            <linearGradient id="wireGrad" x1="0" x2="1">
              <stop offset="0" stopColor={cc} />
              <stop offset="1" stopColor={hc} />
            </linearGradient>
          </defs>
          <path d="M60 60 C200 20 320 20 460 60" stroke="url(#wireGrad)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M60 100 C200 140 320 140 460 100" stroke="url(#wireGrad)" strokeWidth="7" fill="none" strokeLinecap="round" opacity=".55" />
          <circle cx="60" cy="80" r="22" fill={cc} />
          <circle cx="460" cy="80" r="22" fill={hc} />
          <circle cx="460" cy="80" r="34" fill={hc} opacity={(0.05 + (0.25 * hot) / T_MAX).toFixed(2)} />
          <text x="60" y="140" textAnchor="middle">COLD</text>
          <text x="460" y="140" textAnchor="middle">HOT</text>
          <text x="260" y="84" textAnchor="middle" style={{ fontSize: 13, fill: "#ebe7df" }}>
            ΔT {dTText} °C
          </text>
        </svg>
        <div className="sliders">
          <div className="slider">
            <label htmlFor="cold">
              <span>Cold junction</span>
              <output htmlFor="cold">{cold} °C</output>
            </label>
            <input
              type="range"
              id="cold"
              min={0}
              max={T_MAX}
              value={cold}
              aria-valuetext={`${cold} °C`}
              onChange={(e) => setCold(+e.target.value)}
            />
          </div>
          <div className="slider">
            <label htmlFor="hot">
              <span>Hot junction</span>
              <output htmlFor="hot">{hot} °C</output>
            </label>
            <input
              type="range"
              id="hot"
              min={0}
              max={T_MAX}
              value={hot}
              aria-valuetext={`${hot} °C`}
              onChange={(e) => setHot(+e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="readout" aria-live="polite">
        <div>
          <span className="label">ΔT</span>
          <div className="big" style={{ color: "var(--fg)", fontSize: "clamp(34px,4.5vw,44px)" }}>
            {dTText}
            <small>°C</small>
          </div>
        </div>
        <div>
          <span className="label">Output voltage</span>
          <div className="big">
            {vText}
            <small>mV</small>
          </div>
        </div>
        <div className="meter" aria-hidden="true">
          <i style={{ width: `${Math.min(100, (Math.abs(V) / (ALPHA * T_MAX)) * 100)}%` }} />
        </div>
        <div className="mono text-[14px] text-muted">{EXPERIMENT.formula}</div>
      </div>
    </div>
  );
}
