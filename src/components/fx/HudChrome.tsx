import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export function HudChrome() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTime(`${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 md:px-10">
      <Link
        to="/"
        className="pointer-events-auto hud-text flex items-center gap-2 text-[color:var(--color-neon)]"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--color-neon)] shadow-[0_0_10px_var(--color-neon)] animate-pulse" />
        SOMIL · SINGH // PORTFOLIO
      </Link>
      <div className="pointer-events-auto hud-text hidden items-center gap-4 md:flex">
        <span className="animate-flicker">UPLINK STABLE</span>
        <span>·</span>
        <span suppressHydrationWarning>{time}</span>
        <span>·</span>
        <a
          href="https://github.com/somilsin"
          target="_blank"
          rel="noreferrer"
          className="text-[color:var(--color-neon)] transition-colors hover:text-[color:var(--color-magenta)]"
        >
          @somilsin ↗
        </a>
        <span>·</span>
        <a
          href="https://www.linkedin.com/in/somil-singh/"
          target="_blank"
          rel="noreferrer"
          className="text-[color:var(--color-cyan-soft)] transition-colors hover:text-[color:var(--color-neon)]"
        >
          LINKEDIN ↗
        </a>
      </div>
    </header>
  );
}

export function TerminalTicker() {
  const lines = [
    "> ESTABLISHING UPLINK TO SOMIL.SINGH",
    "> LOADING WORLD-MODEL WEIGHTS · 1.7B params",
    "> MCP AGENTS ONLINE · 07 registered tools",
    "> RAG INDEX HYDRATED · 128k vectors",
    "> NERF SCENE COMPILED · 4096³ voxels",
    "> STATUS: ALL SYSTEMS NOMINAL",
  ];
  const doubled = [...lines, ...lines];
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 overflow-hidden border-t border-[color:var(--color-neon)]/20 bg-[color:var(--color-background)]/60 backdrop-blur">
      <div className="flex whitespace-nowrap animate-marquee py-2 hud-text text-[color:var(--color-cyan-soft)]">
        {doubled.map((l, i) => (
          <span key={i} className="mx-8">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}