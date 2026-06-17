import { useEffect, useRef, useState } from "react";

// Smoothly animated scroll progress rail. Uses passive scroll + rAF batching
// and eases the rendered value toward the actual target each frame so the
// indicator glides rather than snaps. Honors prefers-reduced-motion by
// applying the value instantly.
export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const compute = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      targetRef.current = total > 0 ? (h.scrollTop / total) * 100 : 0;
    };

    const tick = () => {
      rafRef.current = null;
      const target = targetRef.current;
      const cur = currentRef.current;
      // Critically-damped lerp: 18% of the gap per frame ≈ 60fps smooth.
      const next = reduce ? target : cur + (target - cur) * 0.18;
      const done = Math.abs(target - next) < 0.05;
      currentRef.current = done ? target : next;
      setPct(currentRef.current);
      if (!done) rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      compute();
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    compute();
    setPct(targetRef.current);
    currentRef.current = targetRef.current;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 2,
        height: "100vh",
        background: "var(--rule)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          height: pct + "%",
          background:
            "linear-gradient(to bottom, var(--nebula-cyan), var(--nebula-violet), var(--nebula-magenta))",
          boxShadow: "0 0 14px rgba(139,92,246,0.65)",
        }}
      />
    </div>
  );
}
