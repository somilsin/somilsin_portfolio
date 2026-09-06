import { useEffect, useRef } from "react";

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const stars: { x: number; y: number; z: number; r: number; hue: number }[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(220, Math.floor((w * h) / 9000));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.3 + Math.random() * 1,
        r: 0.4 + Math.random() * 1.4,
        hue: 190 + Math.random() * 130,
      });
    }

    let mx = w / 2;
    let my = h / 2;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("pointermove", onMove);

    let t = 0;
    let raf = 0;
    const loop = () => {
      t += 0.003;
      ctx.clearRect(0, 0, w, h);
      const cx = (mx - w / 2) / w;
      const cy = (my - h / 2) / h;
      for (const s of stars) {
        s.x += Math.sin(t + s.z) * 0.06 * s.z;
        s.y += 0.05 * s.z;
        if (s.y > h) s.y = 0;
        if (s.x > w) s.x = 0;
        if (s.x < 0) s.x = w;
        const px = s.x + cx * 40 * s.z;
        const py = s.y + cy * 40 * s.z;
        const alpha = 0.35 + 0.55 * Math.abs(Math.sin(t * 6 + s.z * 12));
        ctx.beginPath();
        ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 100%, 70%, ${alpha})`;
        ctx.shadowBlur = 8 * s.z;
        ctx.shadowColor = `hsla(${s.hue}, 100%, 60%, ${alpha * 0.7})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden />;
}