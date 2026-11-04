import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap subject">
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">← Home</Link>
      </nav>
      <h1>Not found</h1>
      <p className="lede">That page isn’t in the notebook.</p>
      <div className="cta-row">
        <Link className="btn primary" href="/">Go home</Link>
        <Link className="btn" href="/#notebook">Open the notebook</Link>
      </div>
    </div>
  );
}
