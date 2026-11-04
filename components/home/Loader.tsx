"use client";

import { useEffect, useRef, useState } from "react";
import { TAGLINE } from "@/content/site";

const DURATION = 1100; // ms, plus a 150 ms hold: under ~1.2 s total

/** Intro loader. The inline script in the layout decides whether it shows (adds .fsl-loading to <html>). */
export default function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("fsl-loading")) return;
    let raf = 0;
    let hold: ReturnType<typeof setTimeout> | undefined;
    let hide: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setDone(true);
      hide = setTimeout(() => root.classList.remove("fsl-loading"), 400);
      try {
        sessionStorage.setItem("fsl-loaded", "1");
      } catch {}
    };
    const t0 = performance.now();
    const tick = (now: number) => {
      if (finished.current) return;
      const p = Math.min(1, (now - t0) / DURATION);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else hold = setTimeout(finish, 150);
    };
    raf = requestAnimationFrame(tick);
    const el = document.getElementById("loader");
    el?.addEventListener("click", finish);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hold);
      clearTimeout(hide);
      el?.removeEventListener("click", finish);
      document.removeEventListener("keydown", onKey);
      // If we navigate away mid-intro, don't leave the overlay behind.
      if (!finished.current) root.classList.remove("fsl-loading");
    };
  }, []);

  return (
    <div id="loader" className={done ? "done" : undefined} aria-hidden="true">
      <div className="load-inner">
        <div className="load-name">Future Star Labs</div>
        <div className="label">{TAGLINE}</div>
        <div className="load-count">{String(pct).padStart(3, "0")} %</div>
      </div>
    </div>
  );
}
