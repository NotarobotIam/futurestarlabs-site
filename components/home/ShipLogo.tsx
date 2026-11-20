// Future Star Labs mark: a silver fighter jet climbing upward, with a DNA
// double helix streaming out of its twin exhausts and ending in glowing cells.
// Pure SVG, drawn after the company logo (teal / cyan palette).

const CX = 80; // centre line (viewBox is 160 wide)
const Y0 = 160; // helix starts just below the nozzles
const Y1 = 382; // helix ends above the cells
const AMP = 26; // full helix radius
const NOZ = 8; // nozzle offset from centre: the strands leave the exhausts here
const TURNS = 2.75;

const TEAL = "#19d6a8";
const CYAN = "#22c6ea";
const SILVER_HI = "#f4f7f9";
const SILVER_LO = "#b4bfc9";
const EDGE = "#7f8d9a";
const BASES = ["#f5a524", "#e9508f", "#19d6a8", "#f2cf4a"]; // base-pair colours

// Radius ramps from the nozzle spacing out to the full helix width.
const ampAt = (f: number) => NOZ + (AMP - NOZ) * Math.min(1, f / 0.12);
const xAt = (f: number, sign: 1 | -1) => CX - sign * ampAt(f) * Math.cos(f * TURNS * 2 * Math.PI);
const yAt = (f: number) => Y0 + f * (Y1 - Y0);
const r2 = (v: number) => Math.round(v * 100) / 100;

function strand(sign: 1 | -1) {
  const n = 160;
  let d = "";
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    d += `${i ? "L" : "M"}${xAt(f, sign).toFixed(2)} ${yAt(f).toFixed(2)}`;
  }
  return d;
}

function rungs() {
  const out: { xl: number; xr: number; y: number; c1: string; c2: string }[] = [];
  const n = 40;
  for (let i = 2; i < n; i++) {
    const f = i / n;
    const a = xAt(f, 1);
    const b = xAt(f, -1);
    if (Math.abs(a - b) < 7) continue; // skip where the strands cross
    const k = i % BASES.length;
    // Rounded so server and browser render identical attribute values.
    out.push({ xl: r2(Math.min(a, b)), xr: r2(Math.max(a, b)), y: r2(yAt(f)), c1: BASES[k], c2: BASES[(k + 2) % BASES.length] });
  }
  return out;
}

// Points where the two strands cross (cos = 0), marked with a white node.
function crossings() {
  const out: number[] = [];
  for (let m = 0; m < TURNS * 2; m++) {
    const f = (m + 0.5) / (TURNS * 2);
    if (f > 0.1 && f < 0.98) out.push(r2(yAt(f)));
  }
  return out;
}

const SPINE = Array.from({ length: 11 }, (_, i) => ({ y: 44 + i * 9.5, c: BASES[i % BASES.length] }));

const CELLS = [
  { x: 52, y: 398, r: 4.5 },
  { x: 63, y: 404, r: 3.5 },
  { x: 74, y: 396, r: 5 },
  { x: 86, y: 405, r: 4 },
  { x: 97, y: 397, r: 4.5 },
  { x: 108, y: 404, r: 3.5 },
];

export default function ShipLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 420"
      role="img"
      aria-label="Future Star Labs logo: a fighter jet with a DNA double helix coming out of its two exhausts"
    >
      <defs>
        <linearGradient id="fslBody" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={SILVER_LO} />
          <stop offset=".45" stopColor={SILVER_HI} />
          <stop offset=".55" stopColor={SILVER_HI} />
          <stop offset="1" stopColor={SILVER_LO} />
        </linearGradient>
        <radialGradient id="fslPool" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor={CYAN} stopOpacity=".35" />
          <stop offset="1" stopColor={CYAN} stopOpacity="0" />
        </radialGradient>
        <filter id="fslGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Reveal window for the helix: its top edge rides on the jet's nozzles
            during take-off, so the helix appears as the jet's exhaust. */}
        <clipPath id="fslReveal">
          <rect className="trail-reveal" x="-40" y="146" width="240" height="300" />
        </clipPath>
      </defs>

      {/* cells at the base: the launch pad */}
      <ellipse cx={CX} cy="402" rx="46" ry="14" fill="url(#fslPool)" />
      <g className="jet-cells" filter="url(#fslGlow)" fill="none" stroke={CYAN} strokeWidth="1.6">
        {CELLS.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r={c.r} />
            <circle cx={c.x} cy={c.y} r={c.r * 0.35} fill={CYAN} stroke="none" />
          </g>
        ))}
      </g>

      {/* DNA trail */}
      <g clipPath="url(#fslReveal)">
      <g className="ship-trail">
        {rungs().map((r, i) => {
          const mid = (r.xl + r.xr) / 2;
          return (
            <g key={i} strokeWidth="2.6" strokeLinecap="round">
              <line x1={r.xl} x2={mid} y1={r.y} y2={r.y} stroke={r.c1} />
              <line x1={mid} x2={r.xr} y1={r.y} y2={r.y} stroke={r.c2} />
            </g>
          );
        })}
        <path d={strand(1)} fill="none" stroke={TEAL} strokeWidth="4.2" strokeLinecap="round" />
        <path d={strand(-1)} fill="none" stroke={CYAN} strokeWidth="4.2" strokeLinecap="round" />
        {crossings().map((y, i) => (
          <circle key={i} cx={CX} cy={y} r="2.6" fill="#fff" />
        ))}
      </g>
      </g>

      {/* Jet (top view, nose up): outer group = take-off, inner = hover */}
      <g className="jet-rise">
      <g className="ship-body" strokeLinejoin="round">
        {/* exhaust glow */}
        <g className="jet-flame" filter="url(#fslGlow)">
          <rect x={CX - NOZ - 4} y="146" width="8" height="14" rx="3" fill={CYAN} />
          <rect x={CX + NOZ - 4} y="146" width="8" height="14" rx="3" fill={CYAN} />
        </g>

        {/* main wings, teal leading edges */}
        <path d="M68 78 L12 120 L14 128 L66 124 Z" fill="url(#fslBody)" stroke={EDGE} strokeWidth="1.2" />
        <path d="M92 78 L148 120 L146 128 L94 124 Z" fill="url(#fslBody)" stroke={EDGE} strokeWidth="1.2" />
        <path d="M68 78 L12 120 L14 128 L22 121 L66 90 Z" fill={TEAL} />
        <path d="M92 78 L148 120 L146 128 L138 121 L94 90 Z" fill={TEAL} />
        {/* wing roundels */}
        <circle cx="42" cy="111" r="5" fill={TEAL} stroke="#0e5f56" strokeWidth="1.2" />
        <circle cx="118" cy="111" r="5" fill={TEAL} stroke="#0e5f56" strokeWidth="1.2" />
        <circle cx="42" cy="111" r="1.8" fill="#0e5f56" />
        <circle cx="118" cy="111" r="1.8" fill="#0e5f56" />

        {/* canards */}
        <path d="M70 54 L54 72 L56 76 L70 70 Z" fill="url(#fslBody)" stroke={EDGE} strokeWidth="1.2" />
        <path d="M90 54 L106 72 L104 76 L90 70 Z" fill="url(#fslBody)" stroke={EDGE} strokeWidth="1.2" />
        <path d="M70 54 L54 72 L57 72 L70 59 Z" fill={TEAL} />
        <path d="M90 54 L106 72 L103 72 L90 59 Z" fill={TEAL} />

        {/* tail stabilisers */}
        <path d="M67 124 L40 144 L42 150 L67 146 Z" fill="url(#fslBody)" stroke={EDGE} strokeWidth="1.2" />
        <path d="M93 124 L120 144 L118 150 L93 146 Z" fill="url(#fslBody)" stroke={EDGE} strokeWidth="1.2" />
        <path d="M67 124 L40 144 L42 146 L67 130 Z" fill={TEAL} />
        <path d="M93 124 L120 144 L118 146 L93 130 Z" fill={TEAL} />

        {/* fuselage */}
        <path
          d="M80 4 C84 16 88 32 89 48 L94 60 L94 148 L66 148 L66 60 L71 48 C72 32 76 16 80 4 Z"
          fill="url(#fslBody)"
          stroke={EDGE}
          strokeWidth="1.4"
        />
        {/* twin tail fins, seen edge-on */}
        <path d="M70 112 L70 146" stroke={EDGE} strokeWidth="3" strokeLinecap="round" />
        <path d="M90 112 L90 146" stroke={EDGE} strokeWidth="3" strokeLinecap="round" />
        {/* canopy */}
        <path d="M80 16 C84 24 85 34 84 42 L76 42 C75 34 76 24 80 16 Z" fill={TEAL} stroke="#0e5f56" strokeWidth="1" />
        <path d="M80 20 C82 25 82.5 31 82 36" fill="none" stroke="#e8fffa" strokeWidth="1.2" strokeLinecap="round" opacity=".8" />

        {/* DNA spine down the fuselage */}
        <line x1={CX} y1="44" x2={CX} y2="140" stroke={EDGE} strokeWidth="1" opacity=".6" />
        {SPINE.map((s, i) => (
          <circle key={i} cx={CX} cy={s.y} r="2" fill={s.c} />
        ))}

        {/* nozzles */}
        <rect x={CX - NOZ - 5} y="140" width="10" height="10" rx="2" fill="#5f6c78" stroke={EDGE} strokeWidth="1" />
        <rect x={CX + NOZ - 5} y="140" width="10" height="10" rx="2" fill="#5f6c78" stroke={EDGE} strokeWidth="1" />
      </g>
      </g>
    </svg>
  );
}
