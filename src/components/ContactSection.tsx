import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Mail, Github, Linkedin, Send } from "lucide-react";
import { Nebula } from "./Nebula";
import { Reveal } from "./Reveal";

const EMAIL = "somils@andrew.cmu.edu";

const channels = [
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/somilsingh1812", href: "https://www.linkedin.com/in/somilsingh1812/" },
  { icon: Github, label: "GitHub", value: "github.com/somilsin", href: "https://github.com/somilsin" },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* no-op */
    }
  };

  const onLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Transmission from ${name || "Earth"}`);
    const body = encodeURIComponent(msg || "Hi Somil,\n\n");
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      style={{ position: "relative", padding: "140px 24px 120px", background: "var(--ink)", overflow: "hidden" }}
    >
      <Nebula />
      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", zIndex: 1 }}>
        <Reveal>
          <div className="label-mono" style={{ color: "var(--mist)" }}>OPEN A CHANNEL</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display" style={{ fontSize: 56, fontStyle: "italic", margin: "16px 0 0", fontWeight: 400, lineHeight: 1.05 }}>
            <span style={{ color: "var(--cream)" }}>Send a signal</span>
            <br />
            <span
              style={{
                backgroundImage: "linear-gradient(120deg, var(--nebula-cyan), var(--nebula-magenta))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              across the void.
            </span>
          </h2>
        </Reveal>

        <div style={{ marginTop: 64, display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <Reveal>
            <form
              onSubmit={onLaunch}
              style={{
                background: "linear-gradient(160deg, var(--panel), var(--stone))",
                border: "1px solid var(--rule)",
                padding: 32,
                borderRadius: 6,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div className="label-mono" style={{ color: "var(--nebula-cyan)" }}>COMPOSE TRANSMISSION</div>
              <label className="label-mono" style={{ color: "var(--mist)" }}>FROM</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                data-cursor="hover"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--rule)",
                  color: "var(--cream)",
                  padding: "8px 0",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                }}
              />
              <label className="label-mono" style={{ color: "var(--mist)", marginTop: 8 }}>MESSAGE</label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={5}
                placeholder="Tell me what you're building."
                data-cursor="hover"
                style={{
                  background: "transparent",
                  border: "1px solid var(--rule)",
                  color: "var(--cream)",
                  padding: 12,
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  borderRadius: 4,
                }}
              />
              <motion.button
                type="submit"
                data-cursor="hover"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: 8,
                  padding: "14px 22px",
                  background: "linear-gradient(120deg, var(--nebula-cyan), var(--nebula-violet))",
                  color: "var(--ink)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  borderRadius: 4,
                  boxShadow: "0 0 32px rgba(139,92,246,0.4)",
                }}
              >
                <Send size={14} /> LAUNCH TRANSMISSION
              </motion.button>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-cursor="hover"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    padding: 20,
                    background: "var(--panel)",
                    border: "1px solid var(--rule)",
                    color: "var(--cream)",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                    borderRadius: 4,
                  }}
                  onMouseEnter={(e) => {
                    const t = e.currentTarget;
                    t.style.borderColor = "rgba(77,215,242,0.6)";
                    t.style.transform = "translateY(-2px)";
                    t.style.boxShadow = "0 16px 48px rgba(77,215,242,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    const t = e.currentTarget;
                    t.style.borderColor = "var(--rule)";
                    t.style.transform = "translateY(0)";
                    t.style.boxShadow = "none";
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 42,
                      height: 42,
                      borderRadius: 999,
                      background: "rgba(77,215,242,0.1)",
                      color: "var(--nebula-cyan)",
                      border: "1px solid rgba(77,215,242,0.3)",
                    }}
                  >
                    <c.icon size={18} />
                  </span>
                  <span style={{ flex: 1 }}>
                    <span className="label-mono" style={{ color: "var(--mist)", display: "block" }}>{c.label}</span>
                    <span style={{ fontSize: 15 }}>{c.value}</span>
                  </span>
                </a>
              ))}

              <button
                onClick={onCopy}
                data-cursor="hover"
                style={{
                  marginTop: 4,
                  padding: "14px 18px",
                  background: "transparent",
                  border: "1px dashed var(--nebula-cyan)",
                  color: "var(--nebula-cyan)",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  borderRadius: 4,
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL ADDRESS"}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
