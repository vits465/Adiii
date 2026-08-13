'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectDragSlider from '@/components/projects/ProjectDragSlider';
import { archivesData } from '@/data/projects';
import { siteConfig } from '@/data/site';

const Hero3DCanvas = dynamic(() => import('@/components/three/Hero3DCanvas'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 w-full h-full bg-black/5 animate-pulse" />,
});

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.className = '';
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#e6e6e6] text-[#111111] min-h-screen">
      {/* Fullscreen 3D Background Canvas */}
      <Hero3DCanvas />

      {/* HERO SECTION OVERLAY */}
      <section className="min-h-screen px-6 md:px-12 pt-32 pb-20 flex flex-col justify-between relative z-10">
        <div className="max-w-4xl my-auto space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-black/10 text-xs font-code text-[#111111] uppercase tracking-wider backdrop-blur-sm">
            // FULLSTACK & WEBGL ARCHITECT
          </span>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.98] text-[#111111] uppercase drop-shadow-sm">
            DRIVEN BY PRECISION <br />
            AND FULLSTACK <br />
            ARCHITECTURE
          </h1>

          <p className="text-lg sm:text-xl text-[#333333] max-w-2xl font-body leading-relaxed pt-2 font-medium">
            Engineering 3-layer Node.js microservices, high-frequency signal engines, and immersive 3D WebGL web applications.
          </p>

          <div className="pt-6 flex flex-wrap items-center gap-4 text-xs font-code">
            <Link
              href="/about"
              className="px-8 py-4 rounded-full bg-[#111111] text-[#F4F3EF] font-bold hover:bg-black transition-transform duration-300 hover:scale-105 shadow-xl"
              data-cursor-label="ABOUT"
            >
              Explore Architecture →
            </Link>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border-2 border-[#111111] text-[#111111] font-semibold hover:bg-[#111111] hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              GitHub Repositories ↗
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS DRAG CAROUSEL */}
      <section className="relative z-10 py-20 md:py-28 border-t border-black/10 bg-[#e6e6e6]/90 backdrop-blur-sm">
        <ProjectDragSlider />
      </section>

      {/* ARCHIVES TABULAR SECTION */}
      <section className="relative z-10 px-6 md:px-16 py-24 border-t border-black/10 bg-[#e6e6e6]">
        <div className="max-w-6xl mx-auto space-y-10">
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#111111]">
            Archives
          </h2>

          <div className="divide-y divide-black/10 border-t border-b border-black/10">
            {archivesData.map((archive, i) => (
              <div
                key={i}
                className="py-6 grid grid-cols-12 items-center gap-4 hover:bg-black/5 px-4 rounded-xl transition-colors group cursor-pointer"
                data-cursor-label="VIEW"
              >
                <div className="col-span-1 font-display text-lg font-bold text-[#111111]">
                  {i + 1}
                </div>
                <div className="col-span-6 md:col-span-5">
                  <h3 className="font-display text-xl font-bold text-[#111111] group-hover:underline">
                    {archive.title}
                  </h3>
                </div>
                <div className="col-span-5 md:col-span-3 text-sm font-body text-[#555555]">
                  {archive.description}
                </div>
                <div className="col-span-12 md:col-span-3 text-right text-xs font-code text-[#777777]">
                  {archive.stack} • {archive.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
