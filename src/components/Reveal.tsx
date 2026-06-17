import { useEffect, useRef, type ReactNode } from "react";

// Shared IntersectionObserver across all Reveal instances — one observer,
// rAF-batched class toggles for buttery-smooth scroll reveals.
// Also honors prefers-reduced-motion and reveals immediately when a child
// element receives keyboard focus (so focus rings remain visible).
type RevealEl = HTMLDivElement & { __revealDelay?: number };

let sharedObserver: IntersectionObserver | null = null;
const pending = new Set<RevealEl>();
let rafScheduled = false;

function reveal(el: RevealEl) {
  const delay = el.__revealDelay ?? 0;
  if (delay > 0) el.style.transitionDelay = `${delay}s`;
  el.classList.add("reveal-in");
}

function flush() {
  rafScheduled = false;
  pending.forEach(reveal);
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

    // Respect reduced-motion preference — show content immediately, no animation.
    const mql =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    if (mql?.matches) {
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

    // Keyboard accessibility: if focus lands inside a still-hidden block
    // (e.g. tabbed into a link), reveal it immediately so the focus ring
    // and content are visible to the user.
    const onFocusIn = () => {
      if (!el.classList.contains("reveal-in")) {
        pending.delete(el);
        ob.unobserve(el);
        reveal(el);
      }
    };
    el.addEventListener("focusin", onFocusIn);

    // React to a runtime preference change too.
    const onMqlChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        ob.unobserve(el);
        el.style.transitionDelay = "0s";
        el.classList.add("reveal-in");
      }
    };
    mql?.addEventListener?.("change", onMqlChange);

    return () => {
      ob.unobserve(el);
      el.removeEventListener("focusin", onFocusIn);
      mql?.removeEventListener?.("change", onMqlChange);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
