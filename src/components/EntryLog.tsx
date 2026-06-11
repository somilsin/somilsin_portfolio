import { entries } from "@/data/entries";
import { EntryCard } from "./EntryCard";
import { Reveal } from "./Reveal";

const featured = entries
  .filter((e) => e.chapterId === "projects" || (e.chapterId === "experience" && e.number === 1))
  .slice(0, 4);

export function EntryLog() {
  return (
    <section style={{ padding: "120px 24px", background: "var(--ink)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <div className="label-mono" style={{ color: "var(--mist)" }}>CHAPTER II — ENGINEERING PROJECTS</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display" style={{ fontSize: 44, fontStyle: "italic", margin: "16px 0 0", fontWeight: 400 }}>
            <span style={{ color: "var(--cream)" }}>Selected transmissions —</span>{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(120deg, var(--nebula-cyan), var(--nebula-magenta))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              build logs.
            </span>
          </h2>
        </Reveal>

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {featured.map((e, i) => (
            <Reveal key={`${e.chapterId}-${e.number}`} delay={i * 0.08}>
              <EntryCard entry={e} />
            </Reveal>
          ))}
        </div>

        <div className="label-mono" style={{ marginTop: 56, textAlign: "center", color: "var(--mist)" }}>
          MORE BUILDS IN THE CHAPTER ARCHIVES. // ALL SIGNALS LIVE.
        </div>
      </div>
    </section>
  );
}
