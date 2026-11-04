"use client";

import { prefersReducedMotion } from "./motion";

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
    >
      Back to top ↑
    </button>
  );
}
