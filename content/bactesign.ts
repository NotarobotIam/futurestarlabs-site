// BacteSign page copy and simulator settings.
import type { Heading } from "./home";
import type { Status } from "./status";
import type { PipelineItem } from "./company";

export const BACTESIGN = {
  meta: {
    title: "BacteSign",
    description:
      "An engineered assay for bacterial identification, antibiotic susceptibility testing and antimicrobial resistance research, designed to plug into automated and AI-driven labs.",
  },
  title: "BacteSign",
  lede: "An engineered assay for bacterial identification, antibiotic susceptibility testing and antimicrobial resistance research, designed to plug into automated and AI-driven labs.",
  legend: [
    { tone: "done", label: "Bacterial proof of concept" },
    { tone: "dev", label: "Research-use system in development" },
  ] as Status[],
  uses: [
    { k: "01", title: "Identify", body: "Separate and position bacteria on an engineered surface so they can be told apart." },
    { k: "02", title: "Test susceptibility", body: "Expose positioned bacteria to an antibiotic and watch whether they keep growing." },
    { k: "03", title: "Study resistance", body: "Compare how strains respond across antibiotics and concentrations for AMR research." },
  ],
  run: {
    label: "How a run works",
    heading: { text: "Five steps,", em: "one readout." } as Heading,
    steps: [
      { k: "01", title: "Load the sample", body: "The sample goes onto the assay disc." },
      { k: "02", title: "Separate and position", body: "Engineered surfaces hold bacteria in defined spots." },
      { k: "03", title: "Expose", body: "Each spot meets an antibiotic at a set concentration, next to an untreated control." },
      {
        k: "04",
        title: "Measure impedance",
        body: "As bacteria grow and metabolise, the electrical impedance of their surroundings drops. Electrodes track that change over time.",
      },
      { k: "05", title: "Analyse", body: "Comparing treated and control signals shows whether the antibiotic stopped growth." },
    ] as PipelineItem[],
  },
  simulator: {
    label: "Interactive",
    heading: { text: "Try", em: "the readout." } as Heading,
    lede: "Choose a strain profile and an antibiotic concentration. The chart compares the treated sample's signal with an untreated control over six hours.",
    protocolLabel: "Protocol request",
    protocolStatus: { tone: "plan", label: "Planned interface" } as Status,
    protocolNote:
      "This is the idea behind Physical AI integration: an AI-driven lab sends a request like this to set up the run, then gets the impedance data and analysis back.",
    disclaimer:
      "Illustrative simulation with made-up curves. It shows how the readout works. It is not measured BacteSign data and is not for clinical use.",
  },
};

/** Illustrative MIC values in µg/mL for each strain profile. */
export const STRAIN_PROFILES = [
  { id: "susceptible", label: "Susceptible", mic: 1 },
  { id: "intermediate", label: "Intermediate", mic: 8 },
  { id: "resistant", label: "Resistant", mic: 64 },
] as const;

export type StrainProfileId = (typeof STRAIN_PROFILES)[number]["id"];

export const RESULTS = {
  inhibited: {
    label: "Growth inhibited",
    cls: "r-inh",
    explanation: "The treated signal stays nearly flat, so the antibiotic stopped growth at this concentration.",
  },
  partial: {
    label: "Partly inhibited",
    cls: "r-part",
    explanation: "Growth slowed but did not stop. A higher concentration may be needed.",
  },
  none: {
    label: "Not inhibited",
    cls: "r-none",
    explanation: "The treated signal follows the control, so the strain kept growing despite the antibiotic.",
  },
};
