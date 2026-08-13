'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ProceduralWireframeAccent() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.z += state.pointer.x * 0.01;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.15;
    }
  });

  const particlePositions = useMemo(() => {
    const pos = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  return (
    <group>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial
          color="#C6FF3D"
          wireframe
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh scale={[0.85, 0.85, 0.85]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#C9A227"
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
          emissive="#121216"
        />
      </mesh>

      {/* Ambient Particle Swarm */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#C6FF3D" transparent opacity={0.6} />
      </points>
    </group>
  );
}

export default function About3DFlower() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[400px] md:h-[500px] relative overflow-hidden rounded-2xl border border-white/10 bg-[#121216]">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        frameloop={isVisible ? 'always' : 'never'}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#C6FF3D" />
        <pointLight position={[-4, -4, -2]} intensity={1.5} color="#C9A227" />

        <ProceduralWireframeAccent />
      </Canvas>
    </div>
  );
}
