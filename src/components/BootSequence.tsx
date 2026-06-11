import { useEffect, useState } from "react";

const TEXT = "ESTABLISHING UPLINK TO SOMIL.SINGH...";

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState("");
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTyped(TEXT.slice(0, i));
        if (i >= TEXT.length) {
          clearInterval(interval);
          setTimeout(() => setFading(true), 700);
          setTimeout(onDone, 1400);
        }
      }, 34);
    }, 500);
    return () => clearTimeout(start);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--ink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <span className="font-mono" style={{ color: "var(--nebula-cyan)", letterSpacing: "0.2em", fontSize: 12 }}>
        {typed}
        <span style={{ opacity: 0.7 }}>▍</span>
      </span>
    </div>
  );
}
