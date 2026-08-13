'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vDisplacement;

  // Simplex noise helper functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave & noise displacement
    float noiseScale = 1.2;
    float noise = snoise(vec2(pos.x * noiseScale + uTime * 0.25, pos.y * noiseScale + uTime * 0.2));
    
    // Parallax mouse influence
    float distToMouse = distance(uv, uMouse);
    float mouseWave = sin(distToMouse * 8.0 - uTime * 2.0) * 0.15 * (1.0 - smoothstep(0.0, 0.8, distToMouse));
    
    pos.z += noise * 0.45 + mouseWave;
    vDisplacement = noise;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorBase;
  uniform vec3 uColorAccent;
  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    float mixFactor = smoothstep(-0.4, 0.6, vDisplacement);
    
    // Mix charcoal base with vibrant electric accent
    vec3 color = mix(uColorBase, uColorAccent, mixFactor * 0.65);
    
    // Vignette towards edges
    float edgeVignette = smoothstep(0.7, 0.2, length(vUv - vec2(0.5)));
    color *= edgeVignette;

    // Grid glow line detail
    float grid = abs(sin(vUv.x * 40.0)) * abs(sin(vUv.y * 40.0));
    grid = pow(grid, 12.0) * 0.12;
    color += uColorAccent * grid;

    gl_FragColor = vec4(color, 0.95);
  }
`;

function ProceduralShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseLerp = useRef({ x: 0.5, y: 0.5 });
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColorBase: { value: new THREE.Color('#0A0A0C') },
      uColorAccent: { value: new THREE.Color('#C6FF3D') },
    }),
    []
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value += delta;

      // Mouse lerp parallax
      mouseLerp.current.x += (state.pointer.x * 0.5 + 0.5 - mouseLerp.current.x) * 0.05;
      mouseLerp.current.y += (state.pointer.y * 0.5 + 0.5 - mouseLerp.current.y) * 0.05;

      material.uniforms.uMouse.value.set(mouseLerp.current.x, mouseLerp.current.y);

      // Subtle camera parallax tilt
      meshRef.current.rotation.x = (mouseLerp.current.y - 0.5) * 0.2;
      meshRef.current.rotation.y = (mouseLerp.current.x - 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width * 1.2, viewport.height * 1.2, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
        transparent
      />
    </mesh>
  );
}

export default function Hero3DCanvas() {
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
    <div ref={containerRef} className="w-full h-full min-h-[440px] md:min-h-[560px] relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0C]">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <ProceduralShaderMesh />
      </Canvas>
    </div>
  );
}
