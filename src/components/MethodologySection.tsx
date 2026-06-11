import { Reveal } from "./Reveal";

const items = [
  { n: "01", title: "AGENTIC SOFTWARE", body: "Designing systems where LLMs aren't autocomplete but operators — planning, calling tools, recovering from failure. Production-grade, observed, evaluated." },
  { n: "02", title: "RAG & CONTEXT", body: "Retrieval that actually retrieves. Chunking strategies, hybrid search, re-ranking, and prompts engineered so the model has no excuse to hallucinate." },
  { n: "03", title: "FULL-STACK CRAFT", body: "Oracle JET, Preact, Java, JUnit, integration tests and OIC flows. The frontend, the backend, and the tests that hold them together." },
  { n: "04", title: "HARDWARE TO HEAVENS", body: "Arduino payload electronics for a student satellite. Computer vision for license plates. The same engineer wrote the firmware and the CNN." },
];

export function MethodologySection() {
  return (
    <section style={{ padding: "120px 24px", background: "var(--stone)", position: "relative" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <h2 className="font-display" style={{ fontSize: 48, fontStyle: "italic", margin: 0, fontWeight: 400 }}>
            <span style={{ color: "var(--cream)" }}>The discipline.</span>{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(120deg, var(--nebula-cyan), var(--nebula-magenta))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              From transistors to transformers.
            </span>
          </h2>
        </Reveal>

        <div
          style={{
            marginTop: 64,
            display: "grid",
            gap: 1,
            background: "var(--rule)",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 0.08}>
              <div style={{ background: "var(--panel)", padding: "40px 32px", height: "100%" }}>
                <div className="label-mono" style={{ color: "var(--nebula-cyan)" }}>{it.n} — {it.title}</div>
                <p style={{ color: "var(--cream)", fontSize: 15, lineHeight: 1.7, marginTop: 20 }}>{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
