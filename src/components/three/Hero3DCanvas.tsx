'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

function HomeModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/home/scene_v9.glb');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = state.mouse.y * 0.15;
      meshRef.current.rotation.y += state.mouse.x * 0.15;
    }
  });

  return (
    <group ref={meshRef} scale={[1.35, 1.35, 1.35]} position={[0, -0.2, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function FloatingItem({ path, position, scale }: { path: string; position: [number, number, number]; scale: number }) {
  const { scene } = useGLTF(path);
  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <primitive object={scene.clone()} position={position} scale={scale} />
    </Float>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#e5cf96" transparent opacity={0.5} />
    </points>
  );
}

function FallbackMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.008;
    }
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.2, 0.38, 128, 32]} />
      <meshPhongMaterial color="#083D2A" specular="#e5cf96" shininess={90} transparent opacity={0.9} />
    </mesh>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="w-full h-[480px] md:h-[580px] relative">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#e5cf96" />
        <directionalLight position={[-5, -5, 3]} intensity={1.8} color="#146949" />
        <pointLight position={[0, 3, 2]} intensity={1.5} color="#e5cf96" />

        <Particles />

        <Suspense fallback={<FallbackMesh />}>
          <HomeModel />
          <FloatingItem path="/models/global/flower/flower_v2.glb" position={[-2.2, 1.6, 0.5]} scale={0.7} />
          <FloatingItem path="/models/global/bee/bee_v4.glb" position={[2.4, 1.8, 0.8]} scale={0.6} />
          <FloatingItem path="/models/global/fruits/orange.glb" position={[-2.6, -1.4, 1]} scale={0.55} />
          <FloatingItem path="/models/global/fruits/raisin.glb" position={[2.5, -1.5, 0.7]} scale={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/home/scene_v9.glb');
useGLTF.preload('/models/global/flower/flower_v2.glb');
useGLTF.preload('/models/global/bee/bee_v4.glb');
useGLTF.preload('/models/global/fruits/orange.glb');
useGLTF.preload('/models/global/fruits/raisin.glb');

