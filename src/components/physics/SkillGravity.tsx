import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export function SkillGravity({ words }: { words: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<() => void>(() => {});
  const shakeRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);

  // Wait for the container to actually have layout dimensions before Matter init.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 20 && r.height > 20) setReady(true);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    const isMobile = W < 640 || (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.35 } });
    const world = engine.world;

    const render = Matter.Render.create({
      element: container,
      engine,
      options: {
        width: W,
        height: H,
        background: "transparent",
        wireframes: false,
        pixelRatio: window.devicePixelRatio || 1,
      },
    });

    // Walls
    const wallOpts: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };
    Matter.World.add(world, [
      Matter.Bodies.rectangle(W / 2, H + 30, W + 100, 60, wallOpts),
      Matter.Bodies.rectangle(-30, H / 2, 60, H + 100, wallOpts),
      Matter.Bodies.rectangle(W + 30, H / 2, 60, H + 100, wallOpts),
      Matter.Bodies.rectangle(W / 2, -30, W + 100, 60, wallOpts),
    ]);

    // Word chips as rectangles; we draw labels ourselves via afterRender.
    const bodies: (Matter.Body & { _label?: string })[] = [];
    words.forEach((w, i) => {
      const width = 40 + w.length * 12;
      const height = 42;
      const body = Matter.Bodies.rectangle(
        60 + ((i * 90) % (W - 120)),
        -60 - i * 40,
        width,
        height,
        {
          chamfer: { radius: 21 },
          restitution: 0.6,
          friction: 0.02,
          frictionAir: 0.02,
          density: 0.0015,
          render: { fillStyle: "rgba(11,18,32,0.85)", strokeStyle: "#00e5ff", lineWidth: 1 },
        },
      ) as Matter.Body & { _label?: string };
      body._label = w;
      bodies.push(body);
    });
    Matter.World.add(world, bodies);

    // Mouse constraint (drag + repulsion via mouse position)
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.25, damping: 0.15, render: { visible: false } },
    });
    Matter.World.add(world, mouseConstraint);

    // Give dragged bodies a visual highlight + a nice fling on release
    Matter.Events.on(mouseConstraint, "startdrag", (e: unknown) => {
      const body = (e as { body: Matter.Body }).body;
      if (body?.render) {
        body.render.strokeStyle = "#ff2bd6";
        body.render.lineWidth = 2;
      }
    });
    Matter.Events.on(mouseConstraint, "enddrag", (e: unknown) => {
      const body = (e as { body: Matter.Body }).body;
      if (body?.render) {
        body.render.strokeStyle = "#00e5ff";
        body.render.lineWidth = 1;
      }
    });
    // Prevent Matter from swallowing wheel events (allows page scroll)
    (mouse as unknown as { element: HTMLElement }).element.removeEventListener?.(
      "wheel",
      // @ts-expect-error internal
      mouse.mousewheel,
    );
    // Also let touch scroll pass through when not dragging (mobile)
    render.canvas.style.touchAction = "pan-y";

    // Ambient wind + cursor repulsion
    const applyForces = () => {
      const mx = mouse.position.x;
      const my = mouse.position.y;
      const repelRadius = isMobile ? 100 : 160;
      const repelStrength = isMobile ? 0.005 : 0.008;
      for (const b of bodies) {
        const dx = b.position.x - mx;
        const dy = b.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repelRadius && dist > 0.01) {
          const f = (1 - dist / repelRadius) * repelStrength;
          Matter.Body.applyForce(b, b.position, { x: (dx / dist) * f, y: (dy / dist) * f });
        }
        // Gentle wind so things keep drifting when idle
        Matter.Body.applyForce(b, b.position, {
          x: (Math.sin(engine.timing.timestamp / 700 + b.id) * 0.00015),
          y: 0,
        });
      }
    };
    Matter.Events.on(engine, "beforeUpdate", applyForces);

    // Draw labels over bodies
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;
      ctx.save();
      ctx.font = "600 13px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const b of bodies) {
        ctx.save();
        ctx.translate(b.position.x, b.position.y);
        ctx.rotate(b.angle);
        ctx.fillStyle = "rgba(125,211,252,1)";
        ctx.shadowColor = "rgba(0,229,255,0.8)";
        ctx.shadowBlur = 8;
        ctx.fillText(b._label ?? "", 0, 0);
        ctx.restore();
      }
      ctx.restore();
    });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Expose reset/shake to buttons
    resetRef.current = () => {
      bodies.forEach((b, i) => {
        Matter.Body.setPosition(b, {
          x: 60 + ((i * 90) % Math.max(W - 120, 200)),
          y: -60 - i * 40,
        });
        Matter.Body.setVelocity(b, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(b, 0);
        Matter.Body.setAngle(b, 0);
      });
    };
    shakeRef.current = () => {
      bodies.forEach((b) => {
        Matter.Body.applyForce(b, b.position, {
          x: (Math.random() - 0.5) * 0.15,
          y: -Math.random() * 0.12,
        });
      });
    };

    const onResize = () => {
      const r = container.getBoundingClientRect();
      render.canvas.width = r.width * (window.devicePixelRatio || 1);
      render.canvas.height = r.height * (window.devicePixelRatio || 1);
      render.canvas.style.width = `${r.width}px`;
      render.canvas.style.height = `${r.height}px`;
      render.options.width = r.width;
      render.options.height = r.height;
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Events.off(engine, "beforeUpdate", applyForces);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      (render as unknown as { textures: Record<string, unknown> }).textures = {};
    };
  }, [words, ready]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative h-[380px] sm:h-[420px] w-full overflow-hidden rounded-2xl neon-border bg-[color:var(--color-card)]/40 backdrop-blur"
        data-magnetic
      />
      <div className="absolute right-3 top-3 flex gap-2">
        <button
          type="button"
          onClick={() => shakeRef.current()}
          className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-background)]/70 px-3 py-1.5 hud-text text-[color:var(--color-cyan-soft)] backdrop-blur transition-colors hover:text-[color:var(--color-magenta)]"
        >
          SHAKE
        </button>
        <button
          type="button"
          onClick={() => resetRef.current()}
          className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-background)]/70 px-3 py-1.5 hud-text text-[color:var(--color-neon)] backdrop-blur transition-colors hover:text-[color:var(--color-magenta)]"
        >
          RESET
        </button>
      </div>
      <p className="mt-3 hud-text text-xs text-[color:var(--color-muted-foreground)]">
        Drag chips · cursor repels · SHAKE to fling · RESET to redrop
      </p>
    </div>
  );
}