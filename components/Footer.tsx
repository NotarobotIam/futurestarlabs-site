import Link from "next/link";
import { FOOTER_ELSEWHERE, FOOTER_EXPLORE, SITE_NAME, TAGLINE } from "@/content/site";
import { SUBJECTS } from "@/content/subjects";
import BackToTop from "./BackToTop";
import { SmartLink } from "./ui";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <h2>Explore</h2>
            <ul>
              {FOOTER_EXPLORE.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Subjects</h2>
            <ul>
              {SUBJECTS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/subjects/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Elsewhere</h2>
            <ul>
              {FOOTER_ELSEWHERE.map((l) => (
                <li key={l.label}>
                  <SmartLink href={l.href} external className="ext">
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>
            © {SITE_NAME} · {TAGLINE}
          </span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
