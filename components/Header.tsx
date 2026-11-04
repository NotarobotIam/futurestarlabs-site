"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FSL, NAV_AFTER, NAV_BEFORE, type NavLink } from "@/content/site";
import { EXTERNAL_SUBJECTS, SUBJECTS } from "@/content/subjects";
import { BrandMark, pad, SmartLink } from "./ui";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close everything on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setDdOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDdOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Any link click inside the nav closes the menu and dropdown (covers same-page hash links).
  const onNavClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) {
      setDdOpen(false);
      setMenuOpen(false);
    }
  };

  const item = (l: NavLink) => (
    <SmartLink key={l.label} href={l.href} external={l.external} className={l.external ? "ext" : undefined}>
      {l.label}
    </SmartLink>
  );

  return (
    <header className="site-head">
      <div className="wrap head-row">
        <Link className="brand" href="/" aria-label="Future Star Labs home">
          <BrandMark />
          Future Star Labs
        </Link>
        <button
          className="menu-btn"
          aria-expanded={menuOpen}
          aria-controls="nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav className={`nav${menuOpen ? " open" : ""}`} id="nav" aria-label="Main" onClick={onNavClick}>
          {NAV_BEFORE.map(item)}
          <div className="dd" ref={ddRef}>
            <button
              className="navbtn"
              aria-expanded={ddOpen}
              aria-controls="subjPanel"
              onClick={() => setDdOpen((o) => !o)}
            >
              Subjects ▾
            </button>
            <div className="dd-panel" id="subjPanel" hidden={!ddOpen}>
              {SUBJECTS.map((s, i) => (
                <Link key={s.slug} href={`/subjects/${s.slug}`}>
                  <span className="num">{pad(i + 1)}</span>
                  <span>{s.name}</span>
                </Link>
              ))}
              <div className="dd-sep label">On futurestarlabs.com</div>
              {EXTERNAL_SUBJECTS.map((s) => (
                <a key={s.path} className="ext" href={`${FSL}/${s.path}`} target="_blank" rel="noopener">
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
          {NAV_AFTER.map(item)}
        </nav>
      </div>
    </header>
  );
}
