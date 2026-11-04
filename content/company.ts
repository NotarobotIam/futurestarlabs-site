// Company page copy.
import type { Heading } from "./home";
import { DEMONSTRATED, IN_DEVELOPMENT, PLANNED, type Status } from "./status";

export type PipelineItem = { k: string; title: string; body: string; status?: Status };

export const COMPANY = {
  meta: {
    title: "Company",
    description:
      "Future Star Laboratories builds programmable biological testing platforms for Physical AI laboratories: assays that software can set up, run, measure and analyse. We are starting with bacteria.",
  },
  title: "Future Star",
  titleAccent: "Laboratories",
  lede: "We build programmable biological testing platforms for Physical AI laboratories: assays that software can set up, run, measure and analyse. We are starting with bacteria.",
  facts: [
    { label: "Legal entity", value: "Future Star Labs LLC" },
    { label: "Based in", value: "Dallas–Fort Worth" },
    { label: "First product", value: "BacteSign" },
  ],
  legend: [DEMONSTRATED, IN_DEVELOPMENT, PLANNED],
  problem: {
    label: "The problem",
    heading: { text: "Biology is still", em: "hard to automate." } as Heading,
    cards: [
      { title: "Manual handling", body: "Biological experiments depend on hands-on sample preparation that is slow and hard to standardise." },
      { title: "Reproducibility", body: "Results shift between operators, runs and labs, so the same test can give different answers." },
      { title: "Cost and training", body: "Consumables are expensive, and every assay takes skilled staff time to learn and run well." },
      {
        title: "Machines are learning the bench",
        body: "AI-driven robots are learning to pipette, handle samples and run experiments. They need assays built for machines: consistent, measurable and controlled by software. Future Star Labs builds its assays that way from the start.",
      },
    ],
  },
  approach: {
    label: "Our approach",
    heading: { text: "Engineer", em: "the assay itself." } as Heading,
    lede: "Instead of bolting robots onto existing lab equipment, we design the assay so it can be automated from the start. We control where cells sit and what they are exposed to, then connect that to sensing and software.",
    steps: [
      { k: "01", title: "Engineered surfaces", body: "Separate and position cells so every run starts the same way.", status: DEMONSTRATED },
      { k: "02", title: "Miniaturised fluidics", body: "A lab-on-a-disc format that moves samples and reagents. Three design iterations completed so far.", status: IN_DEVELOPMENT },
      { k: "03", title: "Impedance sensing", body: "An electrical readout of how cells respond, with no stains or manual counting.", status: DEMONSTRATED },
      { k: "04", title: "Automated workflows", body: "Python instrument control, signal processing and data analysis.", status: IN_DEVELOPMENT },
      {
        k: "05",
        title: "Physical AI integration",
        body: "Software-defined setup, measurement and AI-assisted interpretation of impedance signals, through a web interface and lab automation systems.",
        status: PLANNED,
      },
    ] as PipelineItem[],
  },
  roadmap: {
    label: "Roadmap",
    heading: { text: "From bacteria", em: "to human cells." } as Heading,
    steps: [
      {
        k: "Now",
        title: "BacteSign for research use",
        body: "Bring fluid handling, sensing, instrument control and software together into one system for research-use evaluation.",
        status: IN_DEVELOPMENT,
      },
      {
        k: "Next",
        title: "AI-lab integration and external validation",
        body: "Connect BacteSign to AI-driven lab automation end to end, and have it tested outside our own lab.",
        status: PLANNED,
      },
      {
        k: "Later",
        title: "Mammalian-cell applications",
        body: "Toxicity and efficacy screening for therapeutics, organoid growth monitoring, and blood-brain barrier models for neurological drug testing. Each needs its own biological validation; bacterial results don't carry over.",
        status: PLANNED,
      },
    ] as PipelineItem[],
  },
  team: {
    label: "Team",
    heading: { text: "The", em: "founders." } as Heading,
    people: [
      {
        role: "Co-founder · Technical lead",
        name: "Andre Childs",
        bio: "PhD in Materials Science and Engineering, University of Central Florida (2024). Research in biosensors, microfabricated assays, bacterial identification and antibiotic susceptibility testing. Leads assay engineering, microfabrication, sensor development and prototyping.",
      },
      {
        role: "Co-founder · Clinical research",
        name: "Karolina Budzen",
        bio: "Brings clinical research expertise, identifies the biomedical use cases where better testing matters most, and shapes product development.",
      },
    ],
    programsLabel: "Programs",
    programs: [
      { name: "Alloy Futures Biotech Startup Academy", detail: ", Dallas, 2026" },
      { name: "NSF I-Corps Southeast Regional", detail: ", Georgia Tech" },
    ],
  },
};
