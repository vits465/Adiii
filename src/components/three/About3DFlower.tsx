'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function FlowerModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/about/scene_v15.glb');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.y += state.mouse.x * 0.02;
    }
  });

  return (
    <group ref={meshRef} scale={[0.9, 0.9, 0.9]} position={[0, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function FallbackFlower() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[1.2, 1]} />
      <meshPhongMaterial color="#10b981" wireframe />
    </mesh>
  );
}

export default function About3DFlower() {
  if (typeof window === 'undefined') {
    return <div className="w-full h-[480px] md:h-[580px] relative bg-white/5 animate-pulse rounded-2xl" />;
  }

  return (
    <div className="w-full h-[480px] md:h-[580px] relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1.6} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#34d399" />

        <Suspense fallback={<FallbackFlower />}>
          <FlowerModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

if (typeof window !== 'undefined') {
  useGLTF.preload('/models/about/scene_v15.glb');
}
