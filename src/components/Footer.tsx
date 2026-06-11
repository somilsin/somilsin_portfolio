import { Link } from "@tanstack/react-router";
import { chapters } from "@/data/chapters";

export function Footer() {
  return (
    <footer style={{ background: "var(--ink)", borderTop: "1px solid var(--rule)", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 48 }}>
        <div>
          <div className="font-display" style={{ fontSize: 32, color: "var(--cream)", fontWeight: 400 }}>
            ✦ Somil Singh
          </div>
          <a
            href="https://www.linkedin.com/in/somilsingh1812/"
            target="_blank"
            rel="noreferrer"
            className="label-mono"
            data-cursor="hover"
            style={{ display: "inline-block", marginTop: 16, color: "var(--nebula-cyan)" }}
          >
            in/somilsingh1812 ↗
          </a>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {chapters.map((w) => (
            <Link
              key={w.id}
              to="/chapter/$id"
              params={{ id: w.id }}
              data-cursor="hover"
              className="label-mono"
              style={{ color: "var(--mist)" }}
            >
              CHAPTER {w.roman} — {w.title.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div className="font-display" style={{ fontSize: 24, fontStyle: "italic", color: "var(--nebula-cyan)" }}>
          The uplink is always open.
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "64px auto 0", borderTop: "1px solid var(--rule)", paddingTop: 24 }}>
        <div className="label-mono" style={{ color: "var(--mist)", textAlign: "center" }}>
          SOMIL · SINGH // ENGINEER · CHESS · GUITAR · COSMOS // © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
