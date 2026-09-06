import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function Head({ hover, lowPower }: { hover: number; lowPower: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const detail = lowPower ? 2 : 4;
  const geom = useMemo(() => new THREE.IcosahedronGeometry(1.4, detail), [detail]);
  const wireGeom = useMemo(() => new THREE.IcosahedronGeometry(1.42, detail), [detail]);
  const baseRef = useRef<Float32Array | null>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const wireMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const hoverLerp = useRef(0);
  const blinkRef = useRef(0);
  const nextBlink = useRef(2 + Math.random() * 3);

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.getElapsedTime();
    const m = meshRef.current;
    const w = wireRef.current;
    if (!m || !w) return;

    // Smooth hover envelope for reactive glow / speed
    hoverLerp.current += (hover - hoverLerp.current) * Math.min(1, delta * 4);
    const h = hoverLerp.current;

    // Blink: brief scale-Y squish on eyes; here we simulate with periodic emissive dip
    nextBlink.current -= delta;
    if (nextBlink.current <= 0) {
      blinkRef.current = 1;
      nextBlink.current = 2.5 + Math.random() * 3.5;
    }
    blinkRef.current = Math.max(0, blinkRef.current - delta * 6);

    // Continuous idle rotation + breathing scale (faster on hover)
    m.rotation.y += delta * (0.35 + h * 0.8);
    w.rotation.y = m.rotation.y;
    m.rotation.x = Math.sin(t * 0.6) * 0.15 + pointer.y * (0.3 + h * 0.5);
    w.rotation.x = m.rotation.x;
    m.rotation.z = pointer.x * (0.15 + h * 0.3);
    w.rotation.z = m.rotation.z;
    const s = 1 + Math.sin(t * 1.4) * 0.03 + h * 0.06 - blinkRef.current * 0.05;
    m.scale.setScalar(s);
    w.scale.setScalar(s * 1.02);

    // Reactive glow — emissive intensity + wireframe opacity spike on hover, dim on blink
    if (matRef.current) {
      const target = 0.25 + h * 0.9 - blinkRef.current * 0.2;
      matRef.current.emissiveIntensity += (target - matRef.current.emissiveIntensity) * 0.15;
      matRef.current.emissive.setStyle(h > 0.5 ? "#ff2bd6" : "#00e5ff");
    }
    if (wireMatRef.current) {
      const target = 0.55 + h * 0.35;
      wireMatRef.current.opacity += (target - wireMatRef.current.opacity) * 0.15;
    }

    // Skip expensive per-vertex work on low power
    if (lowPower) return;

    // Physics-informed vertex displacement — cursor repels vertices near it
    const pos = geom.attributes.position as THREE.BufferAttribute;
    if (!baseRef.current) {
      baseRef.current = new Float32Array(pos.array as Float32Array);
    }
    const base = baseRef.current;
    const reach = 2.5 + h * 1.5;
    const cursor = new THREE.Vector3(pointer.x * reach, pointer.y * reach, 1);
    const v = new THREE.Vector3();
    const pushK = 0.35 + h * 0.6;
    for (let i = 0; i < pos.count; i++) {
      v.set(base[i * 3], base[i * 3 + 1], base[i * 3 + 2]);
      const d = v.distanceTo(cursor);
      const push = Math.max(0, 1.2 - d) * pushK + Math.sin(t * 2 + i) * 0.008;
      const n = v.clone().normalize().multiplyScalar(push);
      pos.setXYZ(i, base[i * 3] + n.x, base[i * 3 + 1] + n.y, base[i * 3 + 2] + n.z);
    }
    pos.needsUpdate = true;
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geom}>
        <meshStandardMaterial
          ref={matRef}
          color="#0b1220"
          emissive="#00e5ff"
          emissiveIntensity={0.25}
          metalness={0.9}
          roughness={0.25}
          flatShading
        />
      </mesh>
      <mesh ref={wireRef} geometry={wireGeom}>
        <meshBasicMaterial ref={wireMatRef} color="#00e5ff" wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function Rings({ hover }: { hover: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }, delta) => {
    if (!g.current) return;
    g.current.rotation.z += delta * (0.2 + hover * 0.6);
    g.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.4;
  });
  return (
    <group ref={g}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.3, 0.01, 16, 200]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.6, 0]}>
        <torusGeometry args={[2.6, 0.008, 16, 200]} />
        <meshBasicMaterial color="#ff2bd6" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 1.6, 0.2, 0.3]}>
        <torusGeometry args={[2.9, 0.006, 16, 200]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function ParticleField({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = count;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 3 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      a[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      a[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      a[i * 3 + 2] = r * Math.cos(phi);
    }
    return a;
  }, [count]);
  useFrame(({ clock }, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.15;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial size={0.02} color="#7dd3fc" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

export function RobotHead() {
  const [hover, setHover] = useState(0);
  const [lowPower, setLowPower] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setLowPower(coarse || small);
    setReduced(rm.matches);
    const onRm = () => setReduced(rm.matches);
    rm.addEventListener?.("change", onRm);
    return () => rm.removeEventListener?.("change", onRm);
  }, []);

  return (
    <div
      className="absolute inset-0"
      onPointerMove={() => setHover((h) => Math.min(1, h + 0.15))}
      onPointerEnter={() => setHover(0.6)}
      onPointerLeave={() => setHover(0)}
      onPointerDown={() => setHover(1)}
      style={{ touchAction: "pan-y" }}
    >
      <Canvas
        dpr={lowPower ? [1, 1.2] : [1, 1.8]}
        camera={{ position: [0, 0, 8.5], fov: 40 }}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: lowPower ? "low-power" : "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <ambientLight intensity={0.4 + hover * 0.3} />
        <pointLight position={[4, 3, 4]} intensity={1.4 + hover * 1.2} color="#00e5ff" />
        <pointLight position={[-4, -2, 2]} intensity={1.2 + hover * 1.0} color="#ff2bd6" />
        <Head hover={hover} lowPower={lowPower} />
        <Rings hover={hover} />
        {!lowPower && <ParticleField count={lowPower ? 300 : 900} />}
        {!lowPower && (
          <EffectComposer>
            <Bloom intensity={1.1 + hover * 0.8} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}