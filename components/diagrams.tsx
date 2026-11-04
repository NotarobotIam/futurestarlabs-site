// Schematic SVG figures for inner pages. They're styled from CSS by the
// data-step attribute that <StepThrough> puts on the figure frame.

import type { Tone } from "@/content/status";

const TONE_COLOR: Record<Tone, string> = { done: "#7fd19b", dev: "#ff9b45", plan: "#72b4d4" };

/** Company approach: the five layers stacked from cells (bottom) to software (top). */
export function StackDiagram({ layers }: { layers: { title: string; tone: Tone }[] }) {
  const H = 44;
  const GAP = 16;
  const top = 64;
  // layers[0] is the bottom layer
  const yOf = (i: number) => top + (layers.length - 1 - i) * (H + GAP);
  const bottom = yOf(0) + H;
  return (
    <svg
      viewBox="0 0 420 400"
      role="img"
      aria-label="Five layers stacked from cells at the bottom to software at the top: engineered surfaces, miniaturised fluidics, impedance sensing, automated workflows and Physical AI integration."
    >
      <text x="210" y="36" textAnchor="middle">SOFTWARE · AI LAB</text>
      <line className="flow" x1="392" y1={bottom} x2="392" y2={top} />
      <path className="flow-head" d={`M386 ${top + 10} 392 ${top} 398 ${top + 10}`} fill="none" />
      {layers.map((l, i) => (
        <g key={l.title} className={`layer L${i + 1}${l.tone === "plan" ? " plan" : ""}`}>
          <rect x="40" y={yOf(i)} width="326" height={H} rx="6" />
          <text x="60" y={yOf(i) + H / 2 + 4}>
            {String(i + 1).padStart(2, "0")} · {l.title.toUpperCase()}
          </text>
          <circle cx="346" cy={yOf(i) + H / 2} r="5" fill={TONE_COLOR[l.tone]} />
        </g>
      ))}
      <g className="cells">
        {[70, 102, 134, 166, 198, 230, 262, 294, 326].map((x, i) => (
          <circle key={x} cx={x} cy={bottom + 26 + (i % 2) * 4} r="6" />
        ))}
      </g>
      <text x="210" y={bottom + 60} textAnchor="middle">CELLS</text>
    </svg>
  );
}

const SPOTS = Array.from({ length: 8 }, (_, i) => {
  const a = ((i * 45 - 90) * Math.PI) / 180;
  return { x: 210 + 92 * Math.cos(a), y: 158 + 92 * Math.sin(a), treated: i % 2 === 0 };
});

// Mini readout: same logistic shape as the simulator's control curve.
const f = (x: number) => 18 / (1 + Math.exp(-(x - 3) / 0.55));
const curve = (scale: number) => {
  let d = "";
  for (let i = 0; i <= 30; i++) {
    const t = (i / 30) * 6;
    const x = 96 + (t / 6) * 250;
    const y = 382 - ((f(t) - f(0)) * scale * 52) / 18;
    d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
  }
  return d;
};

/** BacteSign: one run on the assay disc, schematic. */
export function RunDiagram() {
  return (
    <svg
      viewBox="0 0 420 400"
      role="img"
      aria-label="Schematic of a run: a sample loads at the centre of a disc, channels carry it to eight spots, alternate spots receive antibiotic next to untreated controls, electrodes measure each spot, and the treated and control signals are compared."
    >
      <text x="210" y="16" textAnchor="middle">ASSAY DISC · SCHEMATIC</text>
      <circle className="disc" cx="210" cy="158" r="128" />
      {SPOTS.map((s, i) => (
        <line key={i} className="chan" x1="210" y1="158" x2={s.x} y2={s.y} />
      ))}
      <circle className="hub" cx="210" cy="158" r="24" />
      <text className="hub-t" x="210" y="162" textAnchor="middle">IN</text>
      {SPOTS.map((s, i) => (
        <g key={i}>
          <circle className="elec" cx={s.x} cy={s.y} r="22" />
          {s.treated && <circle className="drug" cx={s.x} cy={s.y} r="17" />}
          <circle className="spot" cx={s.x} cy={s.y} r="13" />
          <g className={s.treated ? "bact bact-t" : "bact"}>
            <circle cx={s.x - 4} cy={s.y - 3} r="2.4" />
            <circle cx={s.x + 4} cy={s.y + 1} r="2.4" />
            <circle cx={s.x - 1} cy={s.y + 5} r="2.4" />
            {!s.treated && (
              <>
                <circle cx={s.x + 5} cy={s.y - 6} r="2.2" />
                <circle cx={s.x - 7} cy={s.y + 3} r="2.2" />
              </>
            )}
          </g>
        </g>
      ))}
      <g className="key">
        <circle cx="128" cy="306" r="5" fill="none" stroke="#ff9b45" strokeWidth="1.5" />
        <text x="140" y="310">ANTIBIOTIC</text>
        <circle cx="244" cy="306" r="5" fill="none" stroke="#3a3f48" strokeWidth="1.5" />
        <text x="256" y="310">CONTROL</text>
      </g>
      <g className="chart">
        <line x1="96" y1="384" x2="346" y2="384" stroke="#272b33" />
        <path className="r-ctrl" d={curve(1)} />
        <path className="r-treat" d={curve(0.08)} />
        <text x="356" y="336">CTRL</text>
        <text x="356" y="384">AB</text>
      </g>
    </svg>
  );
}
