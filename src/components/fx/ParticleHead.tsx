import { useEffect, useRef, useState } from "react";
import portraitSrc from "@/assets/portrait-source.jpg";

type Particle = {
  x: number; y: number; ox: number; oy: number;
  vx: number; vy: number; r: number; c: string;
};

type Ambient = {
  x: number; y: number; vx: number; vy: number; r: number; c: string; a: number;
};

type FxSettings = {
  quality: number;      // 0.5 – 1.25 particle density multiplier
  warp: number;         // 0.4 – 2.0 black-hole strength
  fpsCap: number;       // 30 | 60 | 120
  ambient: boolean;     // ambient starfield on/off
  showPanel: boolean;
};

type DebugStats = {
  fps: number;
  adapt: number;
  running: boolean;
  reason: "running" | "hidden" | "offscreen";
};

const DEFAULTS: FxSettings = {
  quality: 1,
  warp: 1,
  fpsCap: 60,
  ambient: true,
  showPanel: false,
};

export default function ParticleHead() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const [fx, setFx] = useState<FxSettings>(() => {
    if (typeof window === "undefined") return DEFAULTS;
    try {
      const raw = localStorage.getItem("fx:particle");
      if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch {}
    const show = new URLSearchParams(window.location.search).has("fx");
    return { ...DEFAULTS, showPanel: show };
  });
  const fxRef = useRef(fx);
  useEffect(() => {
    fxRef.current = fx;
    try { localStorage.setItem("fx:particle", JSON.stringify(fx)); } catch {}
  }, [fx]);
  const [stats, setStats] = useState<DebugStats>({ fps: 0, adapt: 1, running: true, reason: "running" });
  const statsRef = useRef(stats);
  statsRef.current = stats;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    if (!canvas || !wrap || !tilt) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // adaptive quality applied on top of user quality
    let adapt = 1;
    let W = 0, H = 0;
    let particles: Particle[] = [];
    let ambient: Ambient[] = [];
    let raf = 0;
    let running = true;
    let visible = true;
    let inView = true;
    const mouse = { x: -9999, y: -9999, active: false };
    const gm = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const scroll = { v: 0, tv: 0 };
    const t0 = performance.now();

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = portraitSrc;

    const sample = () => {
      const rect = wrap.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Portrait positioned toward the right (reference lobod.rocks layout).
      // Ambient particles fill the rest of the canvas.
      const isMobile = W < 640;
      // Portrait scaled to fill more vertical space for sharper facial detail.
      const targetH = Math.min(H * (isMobile ? 0.78 : 1.1), 1400);
      const scale = targetH / img.height;
      const iw = img.width * scale;
      const ih = img.height * scale;
      // Right-biased anchor to match the reference layout (portrait sits slightly
      // right of center, cropping into the right edge on ultra-wide screens).
      const anchor = isMobile ? 0.55 : 0.74;
      const ox = W * anchor - iw / 2;
      const oy = (H - ih) / 2;

      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(iw));
      off.height = Math.max(1, Math.floor(ih));
      const octx = off.getContext("2d")!;
      octx.drawImage(img, 0, 0, off.width, off.height);
      const data = octx.getImageData(0, 0, off.width, off.height).data;

      const q = fxRef.current.quality * adapt;
      // Denser sampling → sharper resemblance. Uses a fractional step floor.
      const baseStep = isMobile ? 5 : 3;
      const step = Math.max(2, Math.round(baseStep / q));
      const pts: Particle[] = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const i = (y * off.width + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const bright = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          if (bright > 0.94) continue;
          const density = 1 - bright;
          // Bias toward darker (feature) pixels so eyes/nose/mouth read sharply.
          if (Math.random() > Math.pow(density, 0.8) * 0.95 + 0.05) continue;
          const px = ox + x + (Math.random() - 0.5) * step * 0.6;
          const py = oy + y + (Math.random() - 0.5) * step * 0.6;
          const size = 0.5 + density * 1.8;
          const hue = 26 + Math.random() * 18;
          const light = 42 + (1 - density) * 35;
          pts.push({
            x: px + (Math.random() - 0.5) * 24,
            y: py + (Math.random() - 0.5) * 24,
            ox: px, oy: py,
            vx: 0, vy: 0,
            r: size,
            c: `hsl(${hue} 70% ${light}%)`,
          });
        }
      }
      particles = pts;

      // Ambient starfield — count scales with area and quality.
      const amb: Ambient[] = [];
      const density = (isMobile ? 0.00006 : 0.00011) * q;
      const count = Math.floor(W * H * density);
      for (let i = 0; i < count; i++) {
        const hue = 26 + Math.random() * 20;
        amb.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: Math.random() * 1.6 + 0.3,
          c: `hsl(${hue} 65% ${55 + Math.random() * 25}%)`,
          a: 0.25 + Math.random() * 0.55,
        });
      }
      ambient = amb;
    };

    const onResize = () => { if (img.complete) sample(); };
    const setPointer = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.active = true;
      gm.tx = clientX / window.innerWidth;
      gm.ty = clientY / window.innerHeight;
    };
    const onMove = (e: MouseEvent) => setPointer(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const t = e.touches[0];
      setPointer(t.clientX, t.clientY);
    };
    const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; };
    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const h = Math.max(1, rect.height);
      scroll.tv = Math.min(1, Math.max(0, -rect.top / h));
    };

    // FPS-based adaptive quality
    let lastT = performance.now();
    let acc = 0;
    let frames = 0;
    let lastShiftAt = 0;
    let frameGate = 0;

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (!running) return;
      const cap = fxRef.current.fpsCap;
      const minDelta = 1000 / cap - 1;
      if (now - frameGate < minDelta) return;
      frameGate = now;

      const dt = now - lastT;
      lastT = now;
      acc += dt;
      frames++;
      if (acc >= 1000) {
        const fps = (frames * 1000) / acc;
        acc = 0; frames = 0;
        const target = Math.min(cap, 60);
        if (fps < target * 0.7 && adapt > 0.5 && now - lastShiftAt > 2000) {
          adapt = Math.max(0.5, adapt - 0.25);
          lastShiftAt = now;
          if (img.complete) sample();
        } else if (fps > target * 0.95 && adapt < 1 && now - lastShiftAt > 5000) {
          adapt = Math.min(1, adapt + 0.25);
          lastShiftAt = now;
          if (img.complete) sample();
        }
        const prev = statsRef.current;
        const nextFps = Math.round(fps);
        if (prev.fps !== nextFps || prev.adapt !== adapt || prev.running !== running) {
          setStats({
            fps: nextFps,
            adapt,
            running,
            reason: running ? "running" : (!visible ? "hidden" : "offscreen"),
          });
        }
      }

      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      // Smoothed scroll drive
      scroll.v += (scroll.tv - scroll.v) * 0.08;
      const sw = scroll.v;
      const scrollPushY = sw * H * 0.35;
      const scrollTwist = sw * 2.4;

      const warp = fxRef.current.warp;
      const repelR = Math.max(180, Math.min(W, H) * 0.32) * (0.75 + warp * 0.35);
      const repelR2 = repelR * repelR;
      const cx = W / 2, cy = H / 2;

      // Ambient layer (behind portrait particles)
      if (fxRef.current.ambient) {
        for (let i = 0; i < ambient.length; i++) {
          const a = ambient[i];
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (mouse.active && d2 < repelR2) {
            const d = Math.sqrt(d2) || 1;
            const n = 1 - d / repelR;
            const f = Math.pow(n, 1.4) * 2.5 * warp;
            a.vx += (dx / d) * f;
            a.vy += (dy / d) * f;
          }
          a.vx *= 0.965;
          a.vy *= 0.965;
          a.x += a.vx + Math.sin(t * 0.3 + a.y * 0.005) * 0.08;
          a.y += a.vy + Math.cos(t * 0.25 + a.x * 0.005) * 0.06 + sw * 0.4;
          if (a.x < -20) a.x = W + 20;
          else if (a.x > W + 20) a.x = -20;
          if (a.y < -20) a.y = H + 20;
          else if (a.y > H + 20) a.y = -20;
          ctx.globalAlpha = a.a;
          ctx.fillStyle = a.c;
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const drift = reduce ? 0 : Math.sin(t * 0.6 + p.ox * 0.01) * 0.4;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (mouse.active && d2 < repelR2) {
          const d = Math.sqrt(d2) || 1;
          const n = 1 - d / repelR;
          const f = Math.pow(n, 1.6) * 7.5 * warp;
          const nx = dx / d;
          const ny = dy / d;
          p.vx += nx * f;
          p.vy += ny * f;
          const sp = Math.pow(n, 2) * 2.2 * warp;
          p.vx += -ny * sp;
          p.vy += nx * sp;
        }
        if (sw > 0.001) {
          // Scroll-warped ambient swirl around portrait center
          const rx = p.ox - cx, ry = p.oy - cy;
          p.vx += -ry * 0.0008 * scrollTwist;
          p.vy += rx * 0.0008 * scrollTwist;
        }
        const homeX = p.ox;
        const homeY = p.oy + scrollPushY;
        p.vx += (homeX - p.x) * 0.012;
        p.vy += (homeY - p.y) * 0.012;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy + drift * 0.15;

        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      gm.x += (gm.tx - gm.x) * 0.06;
      gm.y += (gm.ty - gm.y) * 0.06;
      const rx = (0.5 - gm.y) * 18 - sw * 12;
      const ry = (gm.x - 0.5) * 22 + sw * 6;
      const tx = (gm.x - 0.5) * 26;
      const ty = (0.5 - gm.y) * 18 - sw * 40;
      const sc = 1 - sw * 0.08;
      tilt.style.transform =
        `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${sc.toFixed(3)})`;
      tilt.style.opacity = String(1 - sw * 0.55);
    };

    img.onload = () => {
      sample();
      onScroll();
      raf = requestAnimationFrame(render);
    };

    // Pause when tab hidden or hero offscreen.
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        running = inView && visible;
        lastT = performance.now();
        setStats((s) => ({ ...s, running, reason: running ? "running" : (!visible ? "hidden" : "offscreen") }));
      },
      { threshold: 0.01 },
    );
    io.observe(wrap);
    const onVis = () => {
      visible = document.visibilityState !== "hidden";
      running = inView && visible;
      lastT = performance.now();
      setStats((s) => ({ ...s, running, reason: running ? "running" : (!visible ? "hidden" : "offscreen") }));
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
      wrap.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <div ref={wrapRef} className="pointer-events-none absolute inset-0" style={{ perspective: "1200px" }}>
        <div
          ref={tiltRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformStyle: "preserve-3d", transition: "opacity 200ms linear" }}
        >
          <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
        </div>
      </div>
      <FxPanel fx={fx} setFx={setFx} />
      <DebugHud stats={stats} />
    </>
  );
}

function DebugHud({ stats }: { stats: DebugStats }) {
  const color =
    stats.fps >= 55 ? "var(--color-primary)" :
    stats.fps >= 30 ? "#e6c07b" : "#ff6b6b";
  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-50 rounded-sm border border-[color:var(--color-foreground)]/15 bg-[color:var(--color-background)]/70 px-3 py-2 font-mono text-[10px] uppercase tracking-widest backdrop-blur">
      <div className="flex items-center gap-3">
        <span style={{ color }}>{stats.fps} FPS</span>
        <span className="opacity-60">Q {stats.adapt.toFixed(2)}</span>
        <span className={stats.running ? "text-[color:var(--color-primary)]" : "opacity-60"}>
          {stats.running ? "● RUN" : stats.reason === "hidden" ? "◌ HIDDEN" : "◌ OFFSCREEN"}
        </span>
      </div>
    </div>
  );
}

function FxPanel({ fx, setFx }: { fx: FxSettings; setFx: (f: FxSettings) => void }) {
  const open = fx.showPanel;
  return (
    <div className="pointer-events-auto fixed bottom-4 right-4 z-50 font-mono text-[10px] uppercase tracking-widest">
      {open ? (
        <div className="w-[240px] rounded-sm border border-[color:var(--color-foreground)]/20 bg-[color:var(--color-background)]/90 p-3 backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <span className="opacity-70">FX Controls</span>
            <button
              onClick={() => setFx({ ...fx, showPanel: false })}
              className="opacity-60 hover:opacity-100"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <Row label={`Quality ${fx.quality.toFixed(2)}`}>
            <input
              type="range" min={0.5} max={1.25} step={0.05} value={fx.quality}
              onChange={(e) => setFx({ ...fx, quality: Number(e.target.value) })}
              className="w-full"
            />
          </Row>
          <Row label={`Warp ${fx.warp.toFixed(2)}`}>
            <input
              type="range" min={0.4} max={2} step={0.05} value={fx.warp}
              onChange={(e) => setFx({ ...fx, warp: Number(e.target.value) })}
              className="w-full"
            />
          </Row>
          <Row label={`FPS cap ${fx.fpsCap}`}>
            <div className="flex gap-1">
              {[30, 60, 120].map((v) => (
                <button
                  key={v}
                  onClick={() => setFx({ ...fx, fpsCap: v })}
                  className={`flex-1 border px-2 py-1 ${
                    fx.fpsCap === v
                      ? "border-[color:var(--color-primary)] text-[color:var(--color-primary)]"
                      : "border-[color:var(--color-foreground)]/25"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </Row>
          <label className="mt-2 flex items-center gap-2 opacity-80">
            <input
              type="checkbox" checked={fx.ambient}
              onChange={(e) => setFx({ ...fx, ambient: e.target.checked })}
            />
            Ambient field
          </label>
        </div>
      ) : (
        <button
          onClick={() => setFx({ ...fx, showPanel: true })}
          className="rounded-sm border border-[color:var(--color-foreground)]/20 bg-[color:var(--color-background)]/70 px-3 py-1.5 opacity-40 backdrop-blur transition-opacity hover:opacity-100"
          aria-label="Open FX controls"
        >
          FX
        </button>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <div className="mb-1 opacity-60">{label}</div>
      {children}
    </div>
  );
}