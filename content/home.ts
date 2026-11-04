// Home page copy. Headings are split into a plain part and an italic <em> part.
import { PLANNED, type Status } from "./status";

export type Heading = { text: string; em?: string };

export const HERO = {
  label: "Biological testing · Physics · Materials",
  chain: ["Matter", "Signal", "Discovery"],
  title: "Future Star",
  titleAccent: "Labs",
  body: "Future Star Laboratories builds programmable biological testing platforms for Physical AI labs. The work rests on first-principles physics and materials, from a single thermocouple junction to an engineered surface that positions a cell.",
  verbs: "Experiment / Understand / Build",
  probeLabel: "Probe · bench",
};

export const PLATFORM = {
  no: "01 · Platform",
  heading: { text: "Programmable biological testing", em: "for Physical AI labs." } as Heading,
  lede: "AI-driven machines are learning to plan experiments and carry them out at the bench. Future Star Labs builds the assays they need: tests that software can set up, run and read. BacteSign, for bacteria, comes first.",
  root: {
    label: "Future Star Laboratories",
    title: "Programmable biological testing platforms",
    body: "Engineered assays, miniaturised fluidics, impedance sensing and automated workflows.",
  },
  children: [
    {
      href: "/bactesign",
      label: "First market",
      status: { tone: "done", label: "Proof of concept" } as Status,
      title: "BacteSign",
      items: [
        "Bacterial identification",
        "Antibiotic susceptibility testing",
        "Antimicrobial resistance research",
        "Built for AI-lab integration",
      ],
      cta: "See how it works →",
    },
    {
      href: "/company",
      label: "Future cell applications",
      status: PLANNED,
      title: "Mammalian-cell assays",
      items: [
        "Therapeutic toxicity and efficacy screening",
        "Organoid growth monitoring",
        "Blood-brain barrier models for neurological drugs",
      ],
      cta: "See the roadmap →",
    },
  ],
  note: "Bacterial separation and impedance monitoring have been shown in the lab. AI-lab integration and the mammalian-cell applications are later milestones, and each needs its own validation.",
};

export const ABOUT = {
  no: "02 · About",
  heading: { text: "The forces behind", em: "every new technology." } as Heading,
  figCaption: "Fig. 01 · Two coherent sources",
  figHint: "Drag the right source",
  pillars: [
    {
      k: "01",
      title: "Practice",
      body: "Consulting grounded in first-principles analysis, where nanotechnology, nanoelectronics, biomedical engineering, aerospace and blockchain overlap.",
    },
    {
      k: "02",
      title: "Method",
      body: "Market research and project scoping that turn the analysis into a clear roadmap for adopting new technology.",
    },
    {
      k: "03",
      title: "Notebook",
      body: "Open study notes and worked problems across fourteen subjects, free to read, from thermoelectrics to vacuum systems.",
    },
  ],
};

export const FIELDS_SECTION = {
  no: "03 · Fields",
  heading: { text: "Five fields,", em: "one set of laws." } as Heading,
  lede: "Each field opens onto chapters of the notebook. The physics is the same throughout; only the starting point changes.",
};

export const FEATURE = {
  no: "04 · Thermoelectrics",
  heading: { text: "A temperature difference", em: "becomes a current." } as Heading,
  steps: [
    { title: "Heat the top", body: "Heat reaches one face of the couple: a p-type leg and an n-type leg joined by a metal contact." },
    { title: "Keep the bottom cold", body: "The other face stays cool. The temperature difference ΔT across each leg drives everything after it." },
    { title: "Carriers drift", body: "Holes move down the p-leg and electrons down the n-leg. Opposite charges travelling the same way add their voltages." },
    { title: "Power the load", body: "Close the circuit and current flows. Push current the other way and the same couple pumps heat instead: the Peltier effect." },
  ],
  figCaption: "Fig. 02 · A single thermoelectric couple",
  facts: [
    { label: "Thermal engineering", body: "The study of how heat moves and how it converts into other forms of energy." },
    { label: "Two directions", body: "Generate power from a temperature difference, or cool with a current. Small, solid-state, no moving parts." },
  ],
  thermocouples: {
    label: "Thermocouples",
    eq: "V = α (Th − Tc)",
    link: "Read the chapter →",
    href: "/subjects/thermoelectrics",
  },
};

export const NOTEBOOK = {
  no: "05 · Notebook",
  heading: { text: "The open", em: "notebook." } as Heading,
  stats: [
    { label: "Chapters", value: "12" },
    { label: "Subjects", value: "8" },
    { label: "Access", value: "Open" },
  ],
  alsoLabel: "More on futurestarlabs.com",
};

export const EXPERIMENT = {
  no: "06 · Experiment",
  heading: { text: "Hold one end cold.", em: "Heat the other." } as Heading,
  lede: "Every charge carrier jiggles with temperature, but only a difference in temperature makes them drift. That drift is a voltage you can measure.",
  formula: "V = α · ΔT, α ≈ 41 µV/°C (Type K)",
  note: "A linear approximation. A real Type K junction's response bends slightly with temperature, so lab work uses reference tables or polynomials.",
};

export const METHOD = {
  no: "07 · Method",
  heading: { text: "Observe, question,", em: "experiment, understand." } as Heading,
  steps: [
    { k: "01", title: "Observe", body: "Take the measurement before making assumptions." },
    { k: "02", title: "Question", body: "Find what the data can't explain yet." },
    { k: "03", title: "Experiment", body: "Change one variable and hold the rest." },
    { k: "04", title: "Understand", body: "Explain the result from first principles." },
  ],
};

export const CLOSING = {
  label: "Get in touch",
  heading: { text: "Have a project", em: "that needs first principles?" } as Heading,
  ctas: [
    { label: "Explore BacteSign", href: "/bactesign", primary: true },
    { label: "About the company", href: "/company" },
    { label: "Open the notebook", href: "/#notebook" },
  ],
};
