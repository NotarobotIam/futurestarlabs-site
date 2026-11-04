// Status labels. Keep the wording exactly; don't upgrade anything to a stronger claim.
export type Tone = "done" | "dev" | "plan";

export type Status = { tone: Tone; label: string };

export const DEMONSTRATED: Status = { tone: "done", label: "Demonstrated" };
export const IN_DEVELOPMENT: Status = { tone: "dev", label: "In development" };
export const PLANNED: Status = { tone: "plan", label: "Planned" };
