import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "somil_theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem(KEY)) as
      | "light"
      | "dark"
      | null;
    const initial =
      saved ??
      (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    apply(initial);
    setTheme(initial);
  }, []);

  function apply(t: "light" | "dark") {
    document.documentElement.classList.toggle("dark", t === "dark");
  }

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
