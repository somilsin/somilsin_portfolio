import { useEffect, useState } from "react";

export function StatusBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 48,
        background: "rgba(12,8,32,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--rule)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        zIndex: 40,
        transform: show ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.4s ease",
      }}
    >
      <div className="label-mono" style={{ color: "var(--cream)", flex: 1 }}>
        <span style={{ color: "var(--nebula-cyan)" }}>✦</span> SOMIL · SINGH
      </div>
      <div className="label-mono" style={{ color: "var(--mist)", textAlign: "center", flex: 2 }}>
        <span className="hidden md:inline">CHAPTER I — EXPERIENCE&nbsp;&nbsp;//&nbsp;&nbsp;</span>
        ORACLE · ASE&nbsp;&nbsp;//&nbsp;&nbsp;
        <span style={{ color: "var(--nebula-cyan)" }}>UPLINK ACTIVE</span>
      </div>
      <a
        href="mailto:somils@andrew.cmu.edu"
        className="label-mono hidden md:block"
        style={{ color: "var(--nebula-cyan)", flex: 1, textAlign: "right" }}
      >
        SOMILSINGH1812@GMAIL.COM ↗
      </a>
    </div>
  );
}
