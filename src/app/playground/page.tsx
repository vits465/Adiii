'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Experiment 1: WebGL Plasma Shader Toy Plane
function ShaderToyMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
  });

  useFrame((_, delta) => {
    if (meshRef.current) {
      uniforms.current.uTime.value += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 2, 32, 32]} />
      <shaderMaterial
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vec2 p = vUv * 6.0 - vec2(3.0);
            for(int n=1; n<4; n++) {
              float i = float(n);
              p += vec2(0.7/i * sin(i*p.y + uTime + 0.3*i) + 0.8, 0.4/i * sin(i*p.x + uTime + 0.3*i) + 1.6);
            }
            vec3 col = vec3(0.5*sin(3.0*p.x)+0.5, 0.8*sin(3.0*p.y)+0.5, sin(p.x+p.y));
            col = mix(col, vec3(0.77, 1.0, 0.24), 0.5);
            gl_FragColor = vec4(col, 0.9);
          }
        `}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}

// Experiment 2: Physics Interactive Canvas Particle Trail
function PhysicsParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number }> = [];

    const addParticle = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 3 + 1,
          alpha: 1,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      addParticle(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.fillStyle = 'rgba(10, 10, 12, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198, 255, 61, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} width={360} height={240} className="w-full h-full rounded-xl bg-[#0A0A0C]" />;
}

// Experiment 3: Generative Math Matrix Pattern
function GenerativePatternGrid() {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks((t) => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[240px] bg-[#0A0A0C] rounded-xl border border-white/10 p-6 flex flex-wrap gap-2 items-center justify-center overflow-hidden">
      {Array.from({ length: 48 }).map((_, i) => {
        const active = Math.sin((i + ticks) * 0.4) > 0.3;
        return (
          <div
            key={i}
            className={`w-6 h-6 rounded-md transition-all duration-300 ${
              active ? 'bg-accent shadow-[0_0_10px_#C6FF3D] scale-110' : 'bg-white/10 scale-90'
            }`}
          />
        );
      })}
    </div>
  );
}

// Experiment 4: Kinetic Typography Displacement
function KineticTextTile() {
  return (
    <div className="w-full h-full min-h-[240px] bg-[#121216] rounded-xl border border-white/10 p-6 flex flex-col justify-between overflow-hidden group">
      <div className="text-xs font-code text-accent uppercase tracking-widest">
        KINETIC TYPE // 04
      </div>
      <div className="my-auto font-display text-4xl font-bold tracking-tighter text-fg group-hover:scale-105 transition-transform duration-500">
        SUB-50MS <br />
        <span className="text-accent group-hover:tracking-widest transition-all duration-500">
          PERFORMANCE
        </span>
      </div>
      <div className="text-[11px] font-code text-fg-muted">
        HOVER TO TRANSFORM GLYPH SPACING
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-fg px-6 md:px-12 pt-28 pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-code text-accent uppercase tracking-widest block mb-2">
            // CODE EXPERIMENTS & MICRO-INTERACTIONS
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-fg">
            Interactive Playground
          </h1>
          <p className="text-fg-muted text-sm md:text-base max-w-2xl mt-3 font-body">
            A collection of procedural GLSL shader toys, canvas particle dynamics, and generative algorithmic math built natively in code.
          </p>
        </div>

        {/* 4 Tile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tile 1: WebGL Shader Toy */}
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center text-xs font-code text-accent">
              <span>01 // GLSL PLASMA SHADER</span>
              <span>R3F / THREE.JS</span>
            </div>
            <div className="w-full h-[240px] rounded-xl overflow-hidden">
              <Canvas camera={{ position: [0, 0, 2] }}>
                <ShaderToyMesh />
              </Canvas>
            </div>
            <p className="text-xs text-fg-muted">Procedural sine-wave color displacement shader rendered on a WebGL plane.</p>
          </div>

          {/* Tile 2: Canvas Physics Particle Trail */}
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center text-xs font-code text-accent">
              <span>02 // CANVAS PARTICLE TRAIL</span>
              <span>2D CONTEXT</span>
            </div>
            <div className="w-full h-[240px]">
              <PhysicsParticleCanvas />
            </div>
            <p className="text-xs text-fg-muted">Interactive particle swarm emitting on mouse movement with decay opacity.</p>
          </div>

          {/* Tile 3: Generative Matrix Grid */}
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center text-xs font-code text-accent">
              <span>03 // GENERATIVE MATH MATRIX</span>
              <span>REACT STATE</span>
            </div>
            <div className="w-full h-[240px]">
              <GenerativePatternGrid />
            </div>
            <p className="text-xs text-fg-muted">Trigonometric wave oscillating tile grid with dynamic bloom effects.</p>
          </div>

          {/* Tile 4: Kinetic Typography */}
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center text-xs font-code text-accent">
              <span>04 // KINETIC TYPOGRAPHY</span>
              <span>CSS INTERACTION</span>
            </div>
            <div className="w-full h-[240px]">
              <KineticTextTile />
            </div>
            <p className="text-xs text-fg-muted">Variable font glyph tracking and weight scale modulation on hover.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
