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
  loading: () => <div className="w-full h-[480px] bg-black/5 animate-pulse rounded-2xl" />,
});

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.className = '';
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#e6e6e6] text-[#111111]">
      {/* HERO SECTION */}
      <section className="min-h-[85vh] px-6 md:px-12 pt-28 pb-16 flex flex-col justify-between relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
          {/* Oversized Recording-Matched Typography Statement */}
          <div className="lg:col-span-7 space-y-4 z-10">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-[#111111] uppercase">
              DRIVEN BY PRECISION <br />
              AND FULLSTACK <br />
              ARCHITECTURE
            </h1>

            <p className="text-base sm:text-lg text-[#555555] max-w-xl font-body leading-relaxed pt-4">
              Engineering 3-layer Node.js microservices, high-frequency signal engines, and immersive 3D WebGL web applications.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-code">
              <Link
                href="/about"
                className="px-6 py-3 rounded-full bg-[#111111] text-[#F4F3EF] font-bold hover:bg-black transition-colors"
                data-cursor-label="ABOUT"
              >
                Explore Architecture →
              </Link>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-[#111111] text-[#111111] font-semibold hover:bg-[#111111] hover:text-white transition-colors"
              >
                GitHub Repositories ↗
              </a>
            </div>
          </div>

          {/* Right WebGL Interactive Canvas */}
          <div className="lg:col-span-5 w-full h-[420px] sm:h-[500px] lg:h-[540px] z-10">
            <Hero3DCanvas />
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS DRAG CAROUSEL */}
      <section className="py-16 md:py-24 border-t border-black/10">
        <ProjectDragSlider />
      </section>

      {/* ARCHIVES TABULAR SECTION */}
      <section className="px-6 md:px-16 py-20 border-t border-black/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
            Archives
          </h2>

          <div className="divide-y divide-black/10 border-t border-b border-black/10">
            {archivesData.map((archive, i) => (
              <div
                key={i}
                className="py-6 grid grid-cols-12 items-center gap-4 hover:bg-black/5 px-4 rounded-xl transition-colors group cursor-pointer"
                data-cursor-label="VIEW"
              >
                <div className="col-span-1 font-display text-base font-bold text-[#111111]">
                  {i + 1}
                </div>
                <div className="col-span-6 md:col-span-5">
                  <h3 className="font-display text-lg font-bold text-[#111111] group-hover:underline">
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
