import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Shared cursor tracker (normalized -1..1, y inverted for three)
const cursor = { x: 0, y: 0, down: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    cursor.x = (e.clientX / window.innerWidth) * 2 - 1;
    cursor.y = -((e.clientY / window.innerHeight) * 2 - 1);
  });
  window.addEventListener("pointerdown", () => (cursor.down = 1));
  window.addEventListener("pointerup", () => (cursor.down = 0));
}

function Sentinel() {
  const group = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const wireMat = useRef<THREE.MeshBasicMaterial>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const geom = useMemo(() => new THREE.IcosahedronGeometry(1, 2), []);
  const wireGeom = useMemo(() => new THREE.IcosahedronGeometry(1.02, 2), []);
  const eyeGeom = useMemo(() => new THREE.SphereGeometry(0.11, 20, 20), []);

  const blink = useRef(0);
  const nextBlink = useRef(3);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const g = group.current;
    if (!g || !headRef.current || !wireRef.current) return;

    // Track the cursor with damped rotation — head watches you
    const targetY = cursor.x * 0.9;
    const targetX = -cursor.y * 0.5 + Math.sin(t * 0.4) * 0.04;
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, delta * 4);
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 4);

    // Idle breathing + slight bob so it never freezes
    const s = 1 + Math.sin(t * 1.6) * 0.02 + cursor.down * 0.06 - blink.current * 0.04;
    headRef.current.scale.setScalar(s);
    wireRef.current.scale.setScalar(s * 1.03);
    g.position.y = Math.sin(t * 0.9) * 0.06;

    // Wireframe counter-rotates slowly for a "scanning" feel
    wireRef.current.rotation.z += delta * 0.25;

    // Blink cycle
    nextBlink.current -= delta;
    if (nextBlink.current <= 0) {
      blink.current = 1;
      nextBlink.current = 3 + Math.random() * 4;
    }
    blink.current = Math.max(0, blink.current - delta * 7);
    const eyeScaleY = 1 - blink.current;
    if (eyeL.current && eyeR.current) {
      eyeL.current.scale.set(1, eyeScaleY, 1);
      eyeR.current.scale.set(1, eyeScaleY, 1);
    }

    // Reactive emissive glow — brighter when cursor is near center of head
    const dist = Math.hypot(cursor.x, cursor.y);
    const glow = Math.max(0, 1 - dist) + cursor.down * 0.6;
    if (matRef.current) {
      const target = 0.25 + glow * 0.9;
      matRef.current.emissiveIntensity += (target - matRef.current.emissiveIntensity) * 0.1;
    }
    if (wireMat.current) {
      wireMat.current.opacity = 0.35 + glow * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (0.4 + glow * 0.8);
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={headRef} geometry={geom}>
        <meshStandardMaterial
          ref={matRef}
          color="#0b1220"
          emissive="#00e5ff"
          emissiveIntensity={0.3}
          metalness={0.85}
          roughness={0.3}
          flatShading
        />
      </mesh>
      <mesh ref={wireRef} geometry={wireGeom}>
        <meshBasicMaterial ref={wireMat} color="#00e5ff" wireframe transparent opacity={0.45} />
      </mesh>
      {/* Eyes — look direction is baked into head rotation */}
      <mesh ref={eyeL} geometry={eyeGeom} position={[-0.32, 0.12, 0.9]}>
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
      <mesh ref={eyeR} geometry={eyeGeom} position={[0.32, 0.12, 0.9]}>
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
      {/* Orbiting ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.7, 0.006, 12, 128]} />
        <meshBasicMaterial color="#ff2bd6" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

export function SentinelHead() {
  const [mounted, setMounted] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  useEffect(() => {
    setMounted(true);
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setLowPower(coarse || window.innerWidth < 768);
  }, []);
  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-6 right-6 z-[5] hidden md:block"
      style={{
        width: lowPower ? 120 : 180,
        height: lowPower ? 120 : 180,
        opacity: 0.85,
        filter: "drop-shadow(0 0 24px rgba(0,229,255,0.35))",
      }}
    >
      <Canvas
        dpr={lowPower ? [1, 1.2] : [1, 1.6]}
        camera={{ position: [0, 0, 3.6], fov: 45 }}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: lowPower ? "low-power" : "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 3]} intensity={1.2} color="#00e5ff" />
        <pointLight position={[-2, -1, 1]} intensity={0.8} color="#ff2bd6" />
        <Sentinel />
      </Canvas>
    </div>
  );
}
