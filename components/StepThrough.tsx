"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Status } from "@/content/status";
import { pad, StatusPill } from "./ui";

export type Step = { title: string; body: string; status?: Status };

/**
 * The home page's step-through pattern (as in Fig. 02, the thermoelectric couple), made generic.
 * Steps change on click, and on scroll at desktop widths. The figure (children) is styled
 * from CSS using the data-step attribute on its frame.
 */
export default function StepThrough({
  steps,
  caption,
  figClass,
  children,
}: {
  steps: Step[];
  caption: string;
  figClass: string;
  children: ReactNode;
}) {
  const [step, setStep] = useState(1);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(min-width:960px)").matches) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <div className="feature-grid">
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={s.title}>
            <button
              ref={(el) => {
                refs.current[i] = el;
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
                {s.status && (
                  <span className="st-status">
                    <StatusPill status={s.status} />
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <figure className="feature-fig">
        <div className={`fig-frame step-fig ${figClass}`} data-step={step}>
          {children}
        </div>
        <figcaption>
          <span>{caption}</span>
          <span aria-live="polite">
            Step {pad(step)} of {pad(steps.length)}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
