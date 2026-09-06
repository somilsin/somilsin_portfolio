import { useEffect, useState } from "react";

const CHARS = "░▒▓█▚▞▟▙◆◇◈●○▲△";
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [shown, setShown] = useState("");
  const [glitch, setGlitch] = useState("");

  useEffect(() => {
    let i = 0;
    const int = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(int);
    }, 22);
    return () => clearInterval(int);
  }, [text]);

  useEffect(() => {
    const int = setInterval(() => {
      setGlitch(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }, 90);
    return () => clearInterval(int);
  }, []);

  return (
    <span className={className}>
      {shown}
      <span className="text-[color:var(--color-magenta)] opacity-80">{glitch}</span>
    </span>
  );
}