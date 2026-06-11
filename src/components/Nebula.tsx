import { useEffect, useRef } from "react";

/**
 * Cosmos background: layered nebula gradients + drifting starfield + occasional shooting star.
 * Pure canvas — no images, no external deps. Honors prefers-reduced-motion.
 */
export function Nebula() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0;
    const resize = () => {
      w = c.width = c.offsetWidth * dpr;
      h = c.height = c.offsetHeight * dpr;
    };
    resize();

    // Nebula blobs (slow drifting radial gradients)
    const blobs = [
      { x: 0.2, y: 0.3, r: 0.55, color: "rgba(139, 92, 246, 0.35)", vx: 0.00006, vy: 0.00004 },
      { x: 0.75, y: 0.4, r: 0.45, color: "rgba(232, 121, 249, 0.28)", vx: -0.00005, vy: 0.00007 },
      { x: 0.5, y: 0.8, r: 0.5, color: "rgba(77, 215, 242, 0.22)", vx: 0.00004, vy: -0.00005 },
      { x: 0.85, y: 0.85, r: 0.35, color: "rgba(201, 168, 76, 0.18)", vx: -0.00003, vy: -0.00004 },
    ];

    // Stars
    const STAR_N = 220;
    const stars = Array.from({ length: STAR_N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: (Math.random() * 1.2 + 0.2) * dpr,
      tw: Math.random() * Math.PI * 2,
      tws: 0.01 + Math.random() * 0.03,
      vy: -(Math.random() * 0.00006 + 0.00002),
      vx: (Math.random() - 0.5) * 0.00002,
    }));

    // Shooting stars
    let shootingStars: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const spawnShooting = () => {
      if (reduce) return;
      shootingStars.push({
        x: Math.random() * 0.6 * w,
        y: Math.random() * 0.4 * h,
        vx: (4 + Math.random() * 3) * dpr,
        vy: (1 + Math.random() * 1.2) * dpr,
        life: 1,
      });
    };
    const shootingTimer = window.setInterval(spawnShooting, 5200);

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 1;
      ctx.fillStyle = "#05030F";
      ctx.fillRect(0, 0, w, h);

      // Nebula
      for (const b of blobs) {
        b.x += b.vx; b.y += b.vy;
        if (b.x < -0.2 || b.x > 1.2) b.vx *= -1;
        if (b.y < -0.2 || b.y > 1.2) b.vy *= -1;
        const cx = b.x * w, cy = b.y * h, rad = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, b.color);
        g.addColorStop(1, "rgba(5,3,15,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Stars
      for (const s of stars) {
        s.x += s.vx; s.y += s.vy;
        if (s.y < -0.02) { s.y = 1.02; s.x = Math.random(); }
        if (s.x < -0.02) s.x = 1.02; else if (s.x > 1.02) s.x = -0.02;
        s.tw += s.tws;
        const alpha = 0.35 + 0.5 * (0.5 + 0.5 * Math.sin(s.tw));
        ctx.fillStyle = `rgba(236, 232, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shooting stars
      shootingStars = shootingStars.filter((sh) => {
        sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.012;
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 12, sh.y - sh.vy * 12);
        grad.addColorStop(0, `rgba(236,232,255,${Math.max(0, sh.life)})`);
        grad.addColorStop(1, "rgba(236,232,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4 * dpr;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 12, sh.y - sh.vy * 12);
        ctx.stroke();
        return sh.life > 0 && sh.x < w + 100 && sh.y < h + 100;
      });

      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.clearInterval(shootingTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
