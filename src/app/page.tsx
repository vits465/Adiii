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
  loading: () => <div className="w-full h-[480px] bg-white/5 animate-pulse rounded-2xl" />,
});

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const archiveRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollTrigger Section Pinning & Cross-fade transitions
      if (heroRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: '+=400',
          pin: false,
          scrub: 1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0A0A0C] text-fg">
      {/* SECTION 1: HERO */}
      <section
        ref={heroRef}
        className="min-h-screen px-6 md:px-12 pt-28 pb-16 flex flex-col justify-between relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
          {/* Left Title & Elevator Pitch */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-xs font-code text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>FULLSTACK & WEBGL ARCHITECT</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-fg">
              Driven by precision. <br />
              <span className="text-accent">Obsessed with fullstack</span> architecture.
            </h1>

            <p className="text-base sm:text-lg text-fg-muted max-w-2xl font-body leading-relaxed">
              Engineering 3-layer Node.js microservices, high-frequency signal engines, and immersive 3D WebGL web applications with sub-50ms query response times.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-code">
              <Link
                href="/about"
                className="px-6 py-3 rounded-full bg-accent text-[#0A0A0C] font-bold hover:bg-white transition-colors"
                data-cursor-label="ABOUT"
              >
                VIEW ARCHITECTURE →
              </Link>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-white/20 text-fg hover:border-accent hover:text-accent transition-colors"
              >
                GITHUB REPOSITORIES ↗
              </a>
            </div>
          </div>

          {/* Right WebGL Hero Canvas */}
          <div className="lg:col-span-5 w-full h-[420px] sm:h-[500px] lg:h-[560px] z-10">
            <Hero3DCanvas />
          </div>
        </div>

        {/* Hero Footer Bar */}
        <div className="flex justify-between items-end pt-8 border-t border-white/10 text-xs font-code text-fg-muted z-10">
          <div>
            <span className="block text-accent font-semibold">LOCAL TIME</span>
            <span>SURAT, GUJARAT, INDIA</span>
          </div>
          <div className="hidden sm:block text-right">
            <span className="block text-accent font-semibold">SCROLL TO DISCOVER</span>
            <span>[ 01 // FEATURED DELIVERABLES ]</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: WORK DRAG SLIDER */}
      <section ref={workRef} className="py-20 md:py-32 border-t border-white/10 relative">
        <ProjectDragSlider />
      </section>

      {/* SECTION 3: ENGINEERING ARCHIVES */}
      <section ref={archiveRef} className="px-6 md:px-12 py-24 border-t border-white/10 bg-[#121216]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-code text-accent uppercase tracking-widest block mb-2">
                // System Artifacts & Research
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-fg">
                Engineering Archives & Coursework
              </h2>
            </div>
            <span className="text-xs font-code text-fg-muted">
              [ DIRECTORY INDEX: 03 ARCHIVES ]
            </span>
          </div>

          <div className="divide-y divide-white/10">
            {archivesData.map((archive, i) => (
              <div
                key={i}
                className="py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:px-4 transition-all duration-300 rounded-lg hover:bg-white/5"
              >
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-bold text-fg group-hover:text-accent transition-colors weight-hover">
                    {archive.title}
                  </h3>
                  <p className="text-sm text-fg-muted max-w-2xl">{archive.description}</p>
                </div>
                <div className="font-code text-xs text-accent/80 flex items-center gap-3">
                  <span>{archive.stack}</span>
                  <span className="text-fg-muted">•</span>
                  <span>{archive.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION BANNER */}
      <section className="px-6 md:px-12 py-28 border-t border-white/10 text-center bg-gradient-to-b from-[#121216] to-[#0A0A0C]">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-code text-accent uppercase tracking-widest">
            // READY FOR PRODUCTION DEPLOYMENT
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-fg leading-tight">
            Have a project in mind? Let's build it together.
          </h2>
          <p className="text-fg-muted text-base sm:text-lg max-w-xl mx-auto">
            Available for fullstack software engineering roles, high-performance web applications, and interactive WebGL experiences.
          </p>
          <div className="pt-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-[#0A0A0C] font-display text-base font-bold hover:bg-white transition-colors shadow-[0_0_25px_rgba(198,255,61,0.25)]"
              data-cursor-label="CONTACT"
            >
              START A CONVERSATION →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
