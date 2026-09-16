import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Modelo isolado para substituição futura.
 * Para trocar por um GLB, substitua apenas DumbbellModel por um componente useGLTF.
 * Mantenha o groupRef no grupo externo para preservar a animação por rolagem.
 */
function DumbbellModel({ progressRef }: { progressRef: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const dt = Math.min(delta, 0.05);
    const progress = progressRef.current ?? 0;
    const targetY = reducedMotion.current ? 0.22 : progress * Math.PI * 2.6 + clock.elapsedTime * 0.05;
    const targetX = reducedMotion.current ? -0.18 : -0.18 + Math.sin(progress * Math.PI) * 0.18;
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 5, dt);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 5, dt);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, 0.18 + progress * 0.34, 5, dt);
    group.position.y = THREE.MathUtils.damp(group.position.y, Math.sin(progress * Math.PI) * 0.12, 4, dt);
  });

  return <group ref={groupRef} rotation={[0, 0, 0.34]} scale={0.78}>
    <mesh rotation-z={Math.PI / 2} castShadow>
      <cylinderGeometry args={[0.11, 0.11, 4.2, 32]} />
      <meshStandardMaterial color="rgb(165, 168, 170)" metalness={0.95} roughness={0.2} />
    </mesh>
    {[-1, 1].map((side) => <group key={side} position={[side * 1.42, 0, 0]}>
      <mesh rotation-z={Math.PI / 2} position={[side * 0.22, 0, 0]} castShadow>
        <cylinderGeometry args={[0.82, 0.82, 0.38, 32, 1]} />
        <meshStandardMaterial color="rgb(20, 20, 19)" metalness={0.72} roughness={0.3} />
      </mesh>
      <mesh rotation-z={Math.PI / 2} position={[side * 0.46, 0, 0]} castShadow>
        <cylinderGeometry args={[0.62, 0.62, 0.16, 32, 1]} />
        <meshStandardMaterial color="rgb(244, 155, 0)" metalness={0.68} roughness={0.24} />
      </mesh>
      <mesh rotation-z={Math.PI / 2} position={[side * 0.58, 0, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.16, 24]} />
        <meshStandardMaterial color="rgb(165, 168, 170)" metalness={0.92} roughness={0.16} />
      </mesh>
    </group>)}
  </group>;
}

export default function DumbbellCanvas() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = window.innerHeight + rect.height;
      progressRef.current = THREE.MathUtils.clamp((window.innerHeight - rect.top) / distance, 0, 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <section ref={sectionRef} aria-label="Transição entre estrutura e horários" className="relative isolate h-56 overflow-hidden border-y border-border bg-surface sm:h-64 lg:h-72">
    <div aria-hidden="true" className="absolute inset-0 bg-dumbbell-halo opacity-70" />
    <div aria-hidden="true" className="site-container absolute inset-x-0 bottom-6 z-30 flex items-center gap-5">
      <span className="h-px flex-1 bg-border" />
      <span className="font-display text-xs font-black uppercase tracking-[0.24em] text-primary sm:text-sm">Força em movimento</span>
      <span className="h-px flex-1 bg-border" />
    </div>
    <div aria-hidden="true" className="absolute inset-0 z-20">
    <Canvas camera={{ position: [0, 0, 6.8], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 4, 5]} intensity={3.2} color="rgb(255, 216, 156)" />
      <pointLight position={[-3, -2, 3]} intensity={2.4} color="rgb(244, 155, 0)" />
      <Environment>
        <Lightformer intensity={2.2} position={[0, 4, 1]} scale={[8, 2, 1]} />
        <Lightformer intensity={1.5} color="rgb(244, 155, 0)" position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 1, 1]} />
      </Environment>
      <DumbbellModel progressRef={progressRef} />
    </Canvas>
    </div>
  </section>;
}
