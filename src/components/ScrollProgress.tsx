import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 1,
        height: "100vh",
        background: "var(--rule)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          height: pct + "%",
          background: "linear-gradient(to bottom, var(--nebula-cyan), var(--nebula-violet), var(--nebula-magenta))",
          boxShadow: "0 0 12px rgba(139,92,246,0.6)",
        }}
      />
    </div>
  );
}
