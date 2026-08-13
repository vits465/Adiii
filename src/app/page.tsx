'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ProjectDragSlider from '@/components/projects/ProjectDragSlider';
import { archivesData } from '@/data/projects';

const Hero3DCanvas = dynamic(() => import('@/components/three/Hero3DCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-[480px] bg-black/5 animate-pulse rounded-xl" />,
});

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="px-6 md:px-10 pt-8 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 min-h-[70vh]">
        <div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-[#111]">
            Driven by precision. <br />
            Obsessed with fullstack architecture.
          </h1>
          <div className="mt-8 flex items-center gap-2 text-sm text-[#555]">
            <span>↓ Scroll down to explore selected deliverables</span>
          </div>
        </div>

        <Hero3DCanvas />
      </section>

      {/* Selected Work Drag Slider */}
      <section className="py-12 md:py-20">
        <ProjectDragSlider />
      </section>

      {/* Engineering Archives Section */}
      <section className="px-6 md:px-10 py-16 border-t border-black/10">
        <h2 className="font-headline text-2xl md:text-3xl font-bold mb-10 text-[#111]">
          Engineering Archives & Coursework
        </h2>
        <div className="divide-y divide-black/10">
          {archivesData.map((archive, i) => (
            <div
              key={i}
              className="py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:pl-3 transition-all"
            >
              <div>
                <h3 className="font-headline text-lg font-bold text-[#111]">{archive.title}</h3>
                <p className="text-sm text-[#555]">{archive.description}</p>
              </div>
              <div className="font-code text-xs text-[#777]">
                {archive.stack} • {archive.year}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
