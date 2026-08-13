'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/data/site';

const About3DFlower = dynamic(() => import('@/components/three/About3DFlower'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-white/5 animate-pulse rounded-2xl" />,
});

export default function AboutPage() {
  useEffect(() => {
    document.body.className = 'theme-emerald';
    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#083D2A] text-[#F4F3EF] px-6 md:px-16 pt-28 pb-20">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Top 3D Scene Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-code text-[#a7f3d0] uppercase tracking-widest block">
              // BIOGRAPHY & PHILOSOPHY
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight leading-tight uppercase text-white">
              WHO IS THIS <br />
              CURIOUS FELLOW
            </h1>
            <p className="text-xs font-code text-[#a7f3d0]">
              (Wanna know ?)
            </p>
            <p className="text-base sm:text-lg text-emerald-100 font-body leading-relaxed pt-2">
              I'm <strong>{siteConfig.name}</strong>, a Full Stack Developer & Systems Architect based in Surat, Gujarat. I hold a BCA degree with <strong>Distinction (SGPA 8.78)</strong> from VNSGU and am finalizing Full Stack Web Development certification at <strong>Oscar Career Point Academy</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 w-full h-[420px]">
            <About3DFlower />
          </div>
        </section>

        {/* Recording-Matched Big Typography Statement */}
        <section className="py-12 border-t border-white/20">
          <div className="max-w-5xl space-y-4">
            <span className="text-xs font-code text-[#a7f3d0] uppercase tracking-widest block">
              // ARCHITECTURAL CAPABILITY
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-tight text-white">
              I CREATE IMPACTFUL WEBSITES USING A MIX OF TYPOGRAPHY, CLEAN LAYOUTS, ANIMATION AND 3D ELEMENTS
            </h2>
          </div>
        </section>

        {/* Recording-Matched Experience Cards Stack */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/20 pt-16">
          <div className="lg:col-span-6 space-y-8">
            <h3 className="font-display text-2xl font-bold text-white">
              Professional Experiences
            </h3>

            <div className="space-y-4">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-2">
                <div className="flex justify-between items-center text-xs font-code text-[#a7f3d0]">
                  <span>SINCE 2025</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-[#083D2A] font-bold text-[10px]">CURRENT</span>
                </div>
                <h4 className="font-display text-xl font-bold text-white">Freelance Full-Stack Developer</h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Designed & built production web applications for clients including JourneyFlicker, JourneyFlicker WhatsApp Bot, Bobby Salon, and The Flat White Coffee House.
                </p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-2">
                <div className="flex justify-between items-center text-xs font-code text-[#a7f3d0]">
                  <span>2024 – PRESENT</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-[#083D2A] font-bold text-[10px]">IN PROGRESS</span>
                </div>
                <h4 className="font-display text-xl font-bold text-white">Full Stack Certification</h4>
                <p className="text-xs text-emerald-200">Oscar Career Point Academy, Surat</p>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Advanced fullstack JavaScript training, REST API design, and 3-layer enterprise backend capstones.
                </p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-2">
                <div className="flex justify-between items-center text-xs font-code text-[#a7f3d0]">
                  <span>FEB 2025</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px]">SGPA 8.78</span>
                </div>
                <h4 className="font-display text-xl font-bold text-white">Bachelor of Computer Applications (BCA)</h4>
                <p className="text-xs text-emerald-200">Udhna Citizen Commerce College (VNSGU)</p>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Graduated with Distinction. Core focus in Web Architecture, Database Systems, and Application Design.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Stack Matrix */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="font-display text-2xl font-bold text-white">
              Technical Stack &amp; Skills
            </h3>

            <div className="flex flex-wrap gap-3">
              {siteConfig.skills.map((skill, i) => (
                <span
                  key={i}
                  className="font-code text-xs text-white bg-white/10 px-4 py-2.5 rounded-full border border-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="pt-6">
              <a
                href={siteConfig.resumePdf}
                download="Aditya_Chauhan_Resume.pdf"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-400 text-[#083D2A] font-display text-sm font-bold hover:bg-white transition-colors shadow-lg"
                data-cursor-label="RESUME"
              >
                DOWNLOAD RESUME PDF ↓
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
