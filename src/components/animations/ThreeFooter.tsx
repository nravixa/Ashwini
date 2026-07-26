import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { AdditiveBlending } from 'three';
import type { Points as ThreePoints } from 'three';

function GoldenDust({ count = 250 }) {
  const pointsRef = useRef<ThreePoints>(null);

  // Generate random positions for the dust particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
    }
    return positions;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      // Gentle floating rotation
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false} dispose={null}>
      <PointMaterial
        transparent
        color="#F08CAE" // Rose gold hue
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={AdditiveBlending}
        dispose={null}
      />
    </Points>
  );
}

const ThreeFooter = React.memo(function ThreeFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none z-0">
      <Canvas
        // Switch to demand when off-screen to completely pause rendering and save CPU/GPU
        frameloop={isInView ? "always" : "demand"}
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={1.5} // Locked to max 1.5 as requested
        performance={{ min: 0.5 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <fog attach="fog" args={['#1D1A31', 3, 10]} />
        {isInView && <GoldenDust count={250} />}
      </Canvas>
    </div>
  );
});

export default ThreeFooter;
