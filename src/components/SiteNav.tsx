import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";

const items = [
  { to: "/", label: "Index" },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background font-display text-lg">
            S
          </span>
          <span className="hidden font-display text-lg sm:block">Somil Singh</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "rounded-full px-3 py-1.5 bg-foreground text-background" }}
              activeOptions={{ exact: true }}
            >
              {it.label}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-border" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Somil Singh — Built with care.</p>
        <div className="flex gap-5">
          <a className="link-underline" href="https://github.com/somilsin" target="_blank" rel="noreferrer">GitHub</a>
          <a className="link-underline" href="#" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="link-underline" href="mailto:somil@example.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
