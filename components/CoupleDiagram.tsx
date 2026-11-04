"use client";

import { useEffect, useRef, useState } from "react";
import { FEATURE } from "@/content/home";
import { pad } from "./ui";

const HOLES = [
  [118, 40], [152, 80], [128, 120], [148, -10], [122, -60], [150, -100], [130, 170],
];
const ELECTRONS = [
  [266, 30], [300, 70], [276, 115], [298, -20], [270, -70], [296, -110], [282, 165],
];

/** Step list + SVG thermoelectric couple. Steps change on click, and on scroll at desktop widths. */
export default function CoupleDiagram() {
  const [step, setStep] = useState(1);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(min-width:960px)").matches) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    btnRefs.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <div className="feature-grid">
      <ol className="steps">
        {FEATURE.steps.map((s, i) => (
          <li key={s.title}>
            <button
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              data-step={i + 1}
              className={step === i + 1 ? "on" : undefined}
              aria-pressed={step === i + 1}
              onClick={() => setStep(i + 1)}
            >
              <span className="k">{pad(i + 1)}</span>
              <span>
                <span className="st-h">{s.title}</span>
                <span className="st-p">{s.body}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <figure className="feature-fig">
        <div className="fig-frame px-[10px] pt-[18px] pb-[6px]">
          <svg
            id="couple"
            data-step={step}
            viewBox="0 0 420 380"
            role="img"
            aria-label="Thermoelectric couple: a hot plate on top, p-type and n-type legs below it, two cold plates at the bottom wired through a load."
          >
            <rect className="plate hot" x="70" y="40" width="280" height="26" rx="3" />
            <text x="210" y="28" textAnchor="middle">HOT SIDE · Th</text>
            <rect className="leg" x="100" y="66" width="72" height="168" fill="#1c1f26" strokeWidth="1.5" />
            <rect className="leg" x="248" y="66" width="72" height="168" fill="#1c1f26" strokeWidth="1.5" />
            <text x="136" y="156" textAnchor="middle" style={{ fontSize: 16, fill: "#ebe7df" }}>p</text>
            <text x="284" y="156" textAnchor="middle" style={{ fontSize: 16, fill: "#ebe7df" }}>n</text>
            <clipPath id="clipP">
              <rect x="100" y="66" width="72" height="168" />
            </clipPath>
            <clipPath id="clipN">
              <rect x="248" y="66" width="72" height="168" />
            </clipPath>
            <g clipPath="url(#clipP)">
              <g className="carrier">
                <g className="c-p">
                  {HOLES.map(([cx, cy]) => (
                    <circle key={cy} cx={cx} cy={cy} r="5" fill="none" stroke="#ff9b45" strokeWidth="1.6" />
                  ))}
                </g>
              </g>
            </g>
            <g clipPath="url(#clipN)">
              <g className="carrier">
                <g className="c-n">
                  {ELECTRONS.map(([cx, cy]) => (
                    <circle key={cy} cx={cx} cy={cy} r="4.5" fill="#72b4d4" />
                  ))}
                </g>
              </g>
            </g>
            <rect className="plate cold" x="70" y="234" width="122" height="24" rx="3" />
            <rect className="plate cold" x="228" y="234" width="122" height="24" rx="3" />
            <text x="210" y="282" textAnchor="middle">COLD SIDE · Tc</text>
            <line className="dt" x1="378" y1="44" x2="378" y2="254" strokeWidth="1.5" />
            <path className="dt" d="M372 52 378 42 384 52M372 246 378 256 384 246" fill="none" strokeWidth="1.5" />
            <text className="dt-t" x="392" y="154" style={{ fontSize: 13 }}>ΔT</text>
            <path className="wire" d="M110 258 V330 H180" />
            <path className="wire" d="M310 258 V330 H240" />
            <rect x="180" y="316" width="60" height="28" rx="4" fill="#1a1d23" stroke="#3a3f48" />
            <text className="load-t" x="210" y="334" textAnchor="middle">LOAD</text>
            <text className="load-t" x="210" y="370" textAnchor="middle" style={{ fontSize: 13 }}>V = α · ΔT</text>
          </svg>
        </div>
        <figcaption>
          <span>{FEATURE.figCaption}</span>
          <span aria-live="polite">Step {pad(step)} of 04</span>
        </figcaption>
      </figure>
    </div>
  );
}
