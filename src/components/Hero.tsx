import { motion, type Variants } from "framer-motion";
import { Nebula } from "./Nebula";

const lineReveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(18px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const, delay },
  }),
};

export function Hero() {
  return (
    <section
      style={{ position: "relative", minHeight: "100vh", background: "var(--ink)", overflow: "hidden" }}
    >
      <Nebula />

      <motion.div
        aria-hidden
        initial={{ y: "-110%" }}
        animate={{ y: "110%" }}
        transition={{ duration: 2.8, ease: [0.7, 0, 0.3, 1], delay: 0.1 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(77,215,242,0.18) 50%, transparent 58%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
          mixBlendMode: "screen",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "32px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <motion.span
          className="label-mono"
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
          style={{ color: "var(--nebula-cyan)" }}
        >
          SOMIL · SINGH // PORTFOLIO
        </motion.span>
        <motion.a
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          href="https://github.com/somilsin"
          target="_blank"
          rel="noreferrer"
          className="label-mono"
          style={{ pointerEvents: "auto", color: "var(--nebula-cyan)" }}
        >
          @somilsin ↗
        </motion.a>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <h1
          className="font-display"
          style={{
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            margin: 0,
            fontSize: "clamp(40px, 6.4vw, 84px)",
            maxWidth: 1180,
          }}
        >
          <motion.div variants={lineReveal} initial="hidden" animate="show" custom={0.3} style={{ color: "var(--cream)" }}>
            Computer Vision,
          </motion.div>
          <motion.div variants={lineReveal} initial="hidden" animate="show" custom={0.55} style={{ color: "var(--mist)" }}>
            Agentic Systems &amp; World Models,
          </motion.div>
          <motion.div
            variants={lineReveal}
            initial="hidden"
            animate={{
              opacity: [0, 1, 0.4, 1, 0.7, 1],
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.95, times: [0, 0.55, 0.62, 0.72, 0.8, 1] }}
            className="nebula-glow"
            style={{
              fontStyle: "italic",
              backgroundImage: "linear-gradient(120deg, var(--nebula-cyan), var(--nebula-violet), var(--nebula-magenta))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            engineered end-to-end.
          </motion.div>
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 1.8 }}
          style={{
            marginTop: 36,
            color: "var(--mist)",
            fontSize: 16,
            lineHeight: 1.7,
            maxWidth: 780,
            fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)",
          }}
        >
          <span style={{ color: "var(--cream)" }}>Core Systems:</span> Architecting end to end agentic multi agent frameworks, MCP integrations and high throughput RAG pipelines at Oracle.
          <br /><br />
          <span style={{ color: "var(--cream)" }}>Perception Research:</span> Advanced CV research covering Neural Radiance Fields (IISc), video frame synthesis (Samsung R&amp;D) and SSD/FPN object detection for autonomous driving. Published author on YOLOv4 tracking systems.
          <br /><br />
          <span style={{ color: "var(--cream)" }}>Personal Pursuits:</span> State level footballer, 1340 ELO chess player and guitarist.
        </motion.p>


        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 140,
            height: 1,
            background: "linear-gradient(to right, transparent, var(--nebula-cyan), transparent)",
            marginTop: 36,
            transformOrigin: "center",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0, 1, 0.6, 1], y: 0 }}
          transition={{ duration: 1.6, delay: 2.6, times: [0, 0.4, 0.7, 1] }}
          className="label-mono"
          style={{ marginTop: 28, color: "var(--nebula-cyan)" }}
        >
          SCROLL TO ENTER THE GALAXY ↓
        </motion.div>
      </div>
    </section>
  );
}
