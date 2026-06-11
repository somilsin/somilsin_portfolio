import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;
    setEnabled(true);
    document.body.classList.add("has-archive-cursor");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const el = e.target as HTMLElement | null;
      setHover(!!el?.closest("a, button, input, textarea, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-archive-cursor");
    };
  }, []);

  if (!enabled) return null;
  const size = hover ? 36 : 10;
  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: size,
        height: size,
        borderRadius: "9999px",
        border: hover ? "1px solid var(--nebula-cyan)" : "none",
        background: hover ? "transparent" : "var(--nebula-cyan)",
        boxShadow: hover
          ? "0 0 24px rgba(77,215,242,0.6)"
          : "0 0 16px rgba(77,215,242,0.7)",
        transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "screen",
      }}
    />
  );
}
