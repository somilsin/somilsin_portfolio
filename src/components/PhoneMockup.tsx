import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { entries } from "@/data/entries";
import { Reveal } from "./Reveal";

const featured = entries.filter((e) => ["experience", "projects", "honors"].includes(e.chapterId));

export function PhoneMockup() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % featured.length), 4500);
    return () => clearInterval(t);
  }, []);
  const e = featured[i];

  return (
    <section style={{ padding: "120px 24px", background: "var(--ink)", position: "relative" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <Reveal>
          <div className="label-mono" style={{ color: "var(--mist)" }}>SIGNAL FROM THE ARCHIVE</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display" style={{ fontSize: 44, fontStyle: "italic", margin: "16px 0 56px", fontWeight: 400, color: "var(--cream)" }}>
            Now broadcasting —{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(120deg, var(--nebula-cyan), var(--nebula-magenta))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              field notes.
            </span>
          </h2>
        </Reveal>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          <button
            data-cursor="hover"
            onClick={() => setI((v) => (v - 1 + featured.length) % featured.length)}
            aria-label="Previous"
            style={{ background: "transparent", border: "1px solid var(--rule)", color: "var(--nebula-cyan)", padding: 10, borderRadius: 999 }}
          >
            <ChevronLeft size={18} />
          </button>

          <div
            style={{
              position: "relative",
              width: "min(390px, 90vw)",
              height: "min(720px, 80vh)",
              background: "linear-gradient(180deg, var(--panel), var(--stone))",
              borderRadius: 44,
              border: "1px solid var(--rule)",
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(139,92,246,0.35)",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(120% 70% at 50% 0%, rgba(77,215,242,0.18), transparent 60%), radial-gradient(80% 60% at 50% 100%, rgba(232,121,249,0.15), transparent 60%)",
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={`${e.chapterId}-${e.number}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "48px 28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <div className="label-mono" style={{ color: "var(--nebula-cyan)" }}>
                  {e.chapterId.toUpperCase()} // {String(e.number).padStart(3, "0")} / {String(e.total).padStart(3, "0")}
                </div>
                <p className="font-display" style={{ fontSize: 22, lineHeight: 1.45, color: "var(--cream)", fontWeight: 400 }}>
                  &ldquo;{e.fact}&rdquo;
                </p>
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--mist)" }}>
                  SOMIL · SINGH — TRANSMISSION LOG
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            data-cursor="hover"
            onClick={() => setI((v) => (v + 1) % featured.length)}
            aria-label="Next"
            style={{ background: "transparent", border: "1px solid var(--rule)", color: "var(--nebula-cyan)", padding: 10, borderRadius: 999 }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <Reveal delay={0.1}>
          <a
            href="https://github.com/somilsin"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="label-mono"
            style={{
              display: "inline-block",
              marginTop: 56,
              padding: "16px 28px",
              border: "1px solid var(--nebula-cyan)",
              color: "var(--nebula-cyan)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(ev) => {
              const t = ev.currentTarget;
              t.style.background = "var(--nebula-cyan)";
              t.style.color = "var(--ink)";
              t.style.boxShadow = "0 0 32px rgba(77,215,242,0.5)";
            }}
            onMouseLeave={(ev) => {
              const t = ev.currentTarget;
              t.style.background = "transparent";
              t.style.color = "var(--nebula-cyan)";
              t.style.boxShadow = "none";
            }}
          >
            EXPLORE THE CODE ON GITHUB →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
