// The open notebook: the 8 internal subjects, the chapter index and the field cards.
// Edit text here; layout code reads from these arrays.

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "eq"; code: string; note: string };

export type SubjectSection = { id: string; title: string; body: Block[] };

export type Subject = {
  slug: string;
  name: string;
  field: string;
  /** Path of the original notes on futurestarlabs.com */
  orig: string;
  summary: string;
  sections: SubjectSection[];
};

/** A link into the notebook: a subject, optionally one of its sections. */
export type NotebookRef = { slug: string; section?: string };

export const notebookHref = ({ slug, section }: NotebookRef) =>
  `/subjects/${slug}${section ? `#${section}` : ""}`;

export const SUBJECTS: Subject[] = [
  {
    slug: "thermoelectrics",
    name: "Thermoelectrics",
    field: "Thermal Energy",
    orig: "thermoelectrics",
    summary:
      "Thermal engineering looks at how heat moves and how it turns into other kinds of energy. Thermoelectric devices do that conversion with no moving parts.",
    sections: [
      {
        id: "two-methods",
        title: "Two methods",
        body: [
          { type: "p", text: "A thermoelectric device runs in one of two directions. Keep its two faces at different temperatures and it generates power. Send a current through it and it moves heat, which means it cools." },
          { type: "ul", items: ["Thermoelectric power generation", "Thermoelectric cooling"] },
        ],
      },
      {
        id: "peltier",
        title: "The Peltier effect",
        body: [
          { type: "p", text: "When current flows through a circuit of semiconductor and metal contacts, it carries heat along with it, moving heat from one electrode to the other." },
          { type: "p", text: "Semiconductors produce enough thermoelectric power for practical electronic cooling, which matters most where size is tight and moving parts are a problem. A cooling unit pairs one p-type and one n-type element joined by ohmic contacts." },
        ],
      },
      {
        id: "thermocouples",
        title: "Thermocouples",
        body: [
          { type: "p", text: "Join two different conductors and hold the two junctions at different temperatures. A voltage appears that is proportional to the temperature difference. This is the Seebeck effect, and every thermocouple works on it." },
          { type: "eq", code: "V = α (Th − Tc)", note: "α is the Seebeck coefficient of the pair of materials" },
        ],
      },
      {
        id: "piezoelectric",
        title: "The piezoelectric effect",
        body: [
          { type: "p", text: "Some materials produce an electric charge when they are squeezed or bent. It is a close relative: another direct path from one form of energy to electricity." },
        ],
      },
    ],
  },
  {
    slug: "physics",
    name: "Physics",
    field: "Electromagnetism",
    orig: "physics",
    summary:
      "Recitation notes from University Physics with Calculus, covering magnetic induction, capacitance and electric potential, worked as conceptual questions.",
    sections: [
      {
        id: "induction",
        title: "Electromagnetic induction",
        body: [
          { type: "p", text: "A changing magnetic flux through a circuit induces an emf. Lenz’s law sets its direction: the induced current pushes back against the change that caused it." },
          { type: "p", text: "The size of the emf depends on how quickly the flux changes, not on how strong the field is." },
          { type: "eq", code: "ε = −N dΦ/dt", note: "Faraday’s law for a coil of N turns" },
          { type: "eq", code: "Φ = B A cos θ", note: "flux through a flat loop" },
        ],
      },
      {
        id: "capacitance",
        title: "Capacitors and capacitance",
        body: [
          { type: "p", text: "Capacitance comes from geometry and the dielectric: plate area, plate separation and the material between them. It does not depend on the stored charge, so an empty capacitor has the same capacitance as a full one." },
          { type: "p", text: "The notes cover dielectrics, spherical capacitors, networks of three 1.0 μF capacitors, and conducting slabs." },
          { type: "eq", code: "C = Q / V", note: "definition" },
          { type: "eq", code: "C = κ ε₀ A / d", note: "parallel plates with a dielectric" },
        ],
      },
      {
        id: "potential",
        title: "Electric potential",
        body: [
          { type: "p", text: "Potential difference and potential energy, uniformly charged spheres, equipotential points, and why the surface of a conductor is always at one potential. Applications include grounding, photocopiers and electrostatic precipitators." },
          { type: "eq", code: "U = q V", note: "potential energy of a charge q" },
        ],
      },
    ],
  },
  {
    slug: "thermodynamics",
    name: "Thermodynamics",
    field: "Thermal Energy",
    orig: "thermodynamics",
    summary:
      "Phase diagrams and the conditions for equilibrium, following Gaskell’s Introduction to the Thermodynamics of Materials.",
    sections: [
      {
        id: "phase-equilibrium",
        title: "Phase equilibrium",
        body: [
          { type: "p", text: "A phase is at equilibrium when its free energy is at a minimum for its composition, pressure and temperature. That minimum is what makes the structure stable. Changing any one of the three pushes the free energy back up." },
          { type: "eq", code: "dG = 0", note: "at the minimum, with P, T and composition fixed" },
        ],
      },
      {
        id: "ideal-gas",
        title: "The state of an ideal gas",
        body: [
          { type: "p", text: "At constant temperature, pressure falls as volume rises. At constant pressure, volume rises with temperature. Put the two together and you get the ideal gas law." },
          { type: "eq", code: "PV = nRT", note: "equation of state" },
        ],
      },
    ],
  },
  {
    slug: "material-structures",
    name: "Material Structures",
    field: "Materials",
    orig: "material-structures",
    summary:
      "Crystallography, defects, diffusion, phase changes, fracture, conduction, magnetism and thermal behaviour: the structure that sets a material’s properties.",
    sections: [
      {
        id: "dislocations",
        title: "Dislocations and strengthening",
        body: [
          { type: "p", text: "Resolved shear stress is the part of an applied tensile stress that acts along a slip plane. A crystal starts to yield when it reaches the critical resolved shear stress, which is a property of the material." },
        ],
      },
      {
        id: "miller-indices",
        title: "Miller indices",
        body: [
          { type: "p", text: "Crystal planes are labelled with three integers (hkl). Take the reciprocals of where the plane crosses each axis, then clear the fractions. A zero means the plane runs parallel to that axis." },
        ],
      },
      {
        id: "xrd",
        title: "X-ray diffraction",
        body: [
          { type: "p", text: "Diffraction peaks give the crystal structure, the spacing between planes, the lattice constant and the atomic radius. A worked example indexes four peaks, (110), (200), (211) and (220), as a BCC lattice with a lattice constant near 0.289 nm." },
          { type: "eq", code: "nλ = 2d sin θ", note: "Bragg’s law" },
          { type: "eq", code: "1/d² = (h² + k² + l²) / a²", note: "spacing between planes in a cubic crystal" },
          { type: "eq", code: "a = 4r / √3", note: "body-centred cubic" },
        ],
      },
    ],
  },
  {
    slug: "thin-films",
    name: "Thin Films",
    field: "Materials",
    orig: "thin-films",
    summary:
      "Growing films from a few atoms to a few microns thick, where substrate temperature, gas, pressure, geometry and power all shape the result.",
    sections: [
      {
        id: "plasma",
        title: "Plasma sources",
        body: [
          { type: "p", text: "RF plasma deposition runs at the standard 13.56 MHz. Electron cyclotron resonance sources work at about 10⁻⁵ to 10⁻³ Torr with ionisation ratios near 10⁻³ to 10⁻¹, compared with roughly 10⁻⁶ to 10⁻⁴ for RF plasma." },
        ],
      },
      {
        id: "cvd",
        title: "Chemical vapour deposition",
        body: [
          { type: "p", text: "Reactor temperature is measured with thermocouples or optical pyrometers. Gas flow is measured with rotameters or, more and more, electronic flow meters that make automation possible. Pressure is held either by changing the inflow at a fixed pumping rate or by throttling the pump." },
          { type: "p", text: "Hot-wall tube reactors use fully developed laminar flow to deposit polysilicon, silicon dioxide and silicon nitride. Low-temperature reactors at 350–450 °C lay down passivation layers such as silicon nitride over aluminium." },
          { type: "ul", items: ["Reaction chamber", "Power source and matching network", "Gas flow control", "Pressure measurement"] },
        ],
      },
    ],
  },
  {
    slug: "vacuum-system",
    name: "Vacuum Systems",
    field: "Experimentation",
    orig: "vacuum-system",
    summary:
      "How a chamber is pumped down: first the gas in the volume, then the gas stuck to its surfaces, then the limits of the pumps themselves.",
    sections: [
      {
        id: "pump-down",
        title: "Pump-down time",
        body: [
          { type: "p", text: "The time to go from P₁ to P₂ comes from the chamber volume and the average pumping speed. It holds while the speed stays close to its average and the target pressure is at least ten times the base pressure." },
          { type: "p", text: "Pumping speeds are usually quoted for nitrogen. Other gases need a correction for molecular weight." },
          { type: "eq", code: "t = 2.3 (V / S) log(P₁ / P₂)", note: "V in litres, S in litres per second" },
        ],
      },
      {
        id: "pumps",
        title: "Pumps",
        body: [
          {
            type: "ul",
            items: [
              "Oil diffusion: hot oil vapour knocks gas molecules toward the exhaust",
              "Molecular drag: a spinning rotor sweeps molecules through grooves and compresses them toward the exhaust",
              "Gas ballast: handles vapours that condense, such as water",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "colloids-and-interfaces",
    name: "Colloids & Interfaces",
    field: "Materials",
    orig: "colloids-%26-interfaces",
    summary:
      "Surface and interfacial tension, self-assembled monolayers, forces between colloidal particles, emulsions and self-assembling polymers.",
    sections: [
      {
        id: "polyelectrolytes",
        title: "Polyelectrolytes",
        body: [
          { type: "p", text: "Negatively and positively charged polyelectrolytes can be stacked layer by layer on a surface. The notes compare strong and weak polyelectrolytes, how their coatings change colloid stability, and how pH and ionic strength make multilayer capsules swell." },
        ],
      },
      {
        id: "self-assembly",
        title: "Self-assembled molecules",
        body: [
          { type: "p", text: "The forces behind molecular self-assembly, and what makes thiol and silane monolayers form on a surface." },
        ],
      },
    ],
  },
  {
    slug: "electrophysiology",
    name: "Electrophysiology",
    field: "Experimentation",
    orig: "electrophysiology",
    summary:
      "Electrical signals in living systems: biosensors, membrane transport, bioenergetics and how populations of cells behave.",
    sections: [
      {
        id: "glossary",
        title: "Working glossary",
        body: [
          {
            type: "ul",
            items: [
              "Quorum sensing: bacteria sensing and reacting to their population density through gene regulation",
              "Biosensor: a biomolecule as the sensing surface, paired with a transducer that turns binding into a measurable signal",
              "Spatio-temporal cluster: separate sites that fire together within one time window",
            ],
          },
        ],
      },
    ],
  },
];

export const getSubject = (slug: string) => SUBJECTS.find((s) => s.slug === slug);

/** Subjects that live only on futurestarlabs.com. */
export const EXTERNAL_SUBJECTS: { name: string; path: string }[] = [
  { name: "Meta Optics", path: "meta-optics-1" },
  { name: "Chemistry", path: "chemistry" },
  { name: "Robotics", path: "robotics" },
  { name: "Data Analysis", path: "data-analysis" },
  { name: "BlockChain", path: "blockchain" },
  { name: "Keeping a Healthy Body", path: "keeping-a-healthy-body" },
];

export type Field = {
  eq: string;
  title: string;
  description: string;
  links: { label: string; ref: NotebookRef }[];
};

export const FIELDS: Field[] = [
  {
    eq: "∇T → J",
    title: "Thermal Energy",
    description: "How heat moves, settles into equilibrium and converts into other forms of energy.",
    links: [
      { label: "Thermoelectrics", ref: { slug: "thermoelectrics" } },
      { label: "Thermodynamics", ref: { slug: "thermodynamics" } },
    ],
  },
  {
    eq: "ε = −N dΦ/dt",
    title: "Electromagnetism",
    description: "Magnetic fields, changing flux and the currents they induce.",
    links: [{ label: "Induction", ref: { slug: "physics", section: "induction" } }],
  },
  {
    eq: "U = qV",
    title: "Electricity",
    description: "Charge, potential and capacitance: how a field stores energy and gives it back.",
    links: [
      { label: "Capacitance", ref: { slug: "physics", section: "capacitance" } },
      { label: "Electric potential", ref: { slug: "physics", section: "potential" } },
    ],
  },
  {
    eq: "nλ = 2d sin θ",
    title: "Materials",
    description: "Crystal structure, thin films and interfaces, the architecture that decides what matter can do.",
    links: [
      { label: "Material structures", ref: { slug: "material-structures" } },
      { label: "Thin films", ref: { slug: "thin-films" } },
      { label: "Colloids & interfaces", ref: { slug: "colloids-and-interfaces" } },
    ],
  },
  {
    eq: "P₁ → P₂",
    title: "Experimentation",
    description: "The apparatus and the measurement: vacuum systems, deposition chambers and signals from living cells.",
    links: [
      { label: "Vacuum systems", ref: { slug: "vacuum-system" } },
      { label: "Electrophysiology", ref: { slug: "electrophysiology" } },
    ],
  },
];

export type Chapter = { title: string; eq: string; ref: NotebookRef };

export const CHAPTERS: Chapter[] = [
  { title: "Thermoelectrics", eq: "heat ⇄ current", ref: { slug: "thermoelectrics" } },
  { title: "Peltier Effect", eq: "I → Q̇", ref: { slug: "thermoelectrics", section: "peltier" } },
  { title: "Thermocouples", eq: "V = α ΔT", ref: { slug: "thermoelectrics", section: "thermocouples" } },
  { title: "Induction", eq: "ε = −N dΦ/dt", ref: { slug: "physics", section: "induction" } },
  { title: "Capacitance", eq: "C = Q / V", ref: { slug: "physics", section: "capacitance" } },
  { title: "Electric Potential", eq: "U = qV", ref: { slug: "physics", section: "potential" } },
  { title: "Phase Equilibrium", eq: "dG = 0", ref: { slug: "thermodynamics", section: "phase-equilibrium" } },
  { title: "X-Ray Diffraction", eq: "nλ = 2d sin θ", ref: { slug: "material-structures", section: "xrd" } },
  { title: "Thin-Film Deposition", eq: "13.56 MHz", ref: { slug: "thin-films" } },
  { title: "Vacuum Pump-Down", eq: "t = 2.3 (V/S) log(P₁/P₂)", ref: { slug: "vacuum-system", section: "pump-down" } },
  { title: "Polyelectrolytes", eq: "layer by layer", ref: { slug: "colloids-and-interfaces", section: "polyelectrolytes" } },
  { title: "Biosensors", eq: "binding → signal", ref: { slug: "electrophysiology", section: "glossary" } },
];
