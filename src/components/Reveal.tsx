import { useEffect, useRef, type ReactNode } from "react";

// Shared IntersectionObserver across all Reveal instances — one observer,
// rAF-batched class toggles for buttery-smooth scroll reveals.
type RevealEl = HTMLDivElement & { __revealDelay?: number };

let sharedObserver: IntersectionObserver | null = null;
const pending = new Set<RevealEl>();
let rafScheduled = false;

function flush() {
  rafScheduled = false;
  pending.forEach((el) => {
    const delay = el.__revealDelay ?? 0;
    if (delay > 0) el.style.transitionDelay = `${delay}s`;
    el.classList.add("reveal-in");
  });
  pending.clear();
}

function getObserver() {
  if (sharedObserver) return sharedObserver;
  if (typeof window === "undefined") return null;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          pending.add(entry.target as RevealEl);
          sharedObserver!.unobserve(entry.target);
        }
      }
      if (!rafScheduled && pending.size > 0) {
        rafScheduled = true;
        requestAnimationFrame(flush);
      }
    },
    { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
  );
  return sharedObserver;
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<RevealEl | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal-in");
      return;
    }

    el.__revealDelay = delay;
    const ob = getObserver();
    if (!ob) {
      el.classList.add("reveal-in");
      return;
    }
    ob.observe(el);
    return () => ob.unobserve(el);
  }, [delay]);

  return (
    <div ref={ref} className={`reveal${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
