"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./motion";

export type ChainItem = { label: string; href?: string };

/** The "Matter → Signal → Discovery" chain: lights up one step at a time. */
export default function Chain({ items, interval = 1400 }: { items: ChainItem[]; interval?: number }) {
  const [k, setK] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion() || items.length < 2) return;
    const t = setInterval(() => setK((x) => (x + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);
  return (
    <ol className="chain">
      {items.map((it, i) => (
        <li key={it.label} className={i <= k ? "on" : undefined}>
          {it.href ? <a href={it.href}>{it.label}</a> : it.label}
        </li>
      ))}
    </ol>
  );
}
