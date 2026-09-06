import { useEffect, useRef } from "react";

export function CursorRing() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest?.("a,button,[data-magnetic]");
      targetScale = target ? 2.4 : 1;
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      scale += (targetScale - scale) * 0.15;
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      ring.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    document.documentElement.style.cursor = "none";
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-[color:var(--color-neon)] shadow-[0_0_12px_var(--color-neon)]"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-10 w-10 rounded-full border border-[color:var(--color-neon)]/70 mix-blend-screen"
        aria-hidden
      />
    </>
  );
}