'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/data/site';

const About3DFlower = dynamic(() => import('@/components/three/About3DFlower'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-white/5 animate-pulse rounded-2xl" />,
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-fg px-6 md:px-12 pt-28 pb-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* About Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-code text-accent uppercase tracking-widest block">
              // BIOGRAPHY & ARCHITECTURE
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fg leading-tight">
              Bringing depth, performance, and architecture to every web application.
            </h1>
            <p className="text-base sm:text-lg text-fg-muted font-body leading-relaxed">
              I'm <strong>{siteConfig.name}</strong>, a Full Stack & WebGL Engineer based in Surat, Gujarat. I hold a Bachelor of Computer Applications (BCA) degree with <strong>Distinction (SGPA 8.78)</strong> from Udhna Citizen Commerce College (VNSGU) and am completing Full Stack Web Development certification at <strong>Oscar Career Point Academy</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 w-full h-[400px]">
            <About3DFlower />
          </div>
        </section>

        {/* Content Columns */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-white/10 pt-16">
          {/* Left Column: Workflow & Experience */}
          <div className="space-y-10">
            <div>
              <h3 className="font-display text-2xl font-bold text-fg mb-4 text-accent">
                Engineering Approach
              </h3>
              <p className="text-sm md:text-base text-fg-muted leading-relaxed font-body">
                My workflow combines manual craftsmanship across <strong>Node.js, Express, React, MongoDB, and TypeScript</strong> with structured AI coding agent direction—enabling me to ship enterprise-grade backends and interactive WebGL platforms at 5x velocity.
              </p>
            </div>

            <div>
              <a
                href={siteConfig.resumePdf}
                download="Aditya_Chauhan_Resume.pdf"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent text-[#0A0A0C] font-display text-sm font-bold hover:bg-white transition-colors"
                data-cursor-label="RESUME"
              >
                DOWNLOAD RESUME PDF ↓
              </a>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-fg border-b border-white/10 pb-3 mb-6">
                Professional Experience
              </h3>
              <div className="space-y-6">
                <div>
                  <span className="font-code text-xs text-accent">2025 – PRESENT</span>
                  <h4 className="text-lg font-bold text-fg mt-1">Freelance Full-Stack Developer</h4>
                  <p className="text-xs font-code text-fg-muted">Surat, Gujarat // Remote</p>
                  <p className="text-xs text-fg-muted mt-2 leading-relaxed">
                    Designed and built production platforms for clients including JourneyFlicker (Travel agency platform + quotation PDF engine), JourneyFlicker WhatsApp Bot, Bobby Salon, and The Flat White Coffee House.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Education & Skills */}
          <div className="space-y-10">
            <div>
              <h3 className="font-display text-xl font-bold text-fg border-b border-white/10 pb-3 mb-6">
                Education & Credentials
              </h3>
              <div className="space-y-6">
                <div>
                  <span className="font-code text-xs text-accent">2024 – PRESENT</span>
                  <h4 className="text-lg font-bold text-fg mt-1">Full Stack Web Development Certification</h4>
                  <p className="text-xs font-code text-fg-muted">Oscar Career Point Academy</p>
                  <p className="text-xs text-fg-muted mt-1 leading-relaxed">
                    Comprehensive fullstack JavaScript ecosystem training, REST API design, and enterprise backend capstones.
                  </p>
                </div>

                <div>
                  <span className="font-code text-xs text-accent">FEB 2025</span>
                  <h4 className="text-lg font-bold text-fg mt-1">Bachelor of Computer Applications (BCA)</h4>
                  <p className="text-xs font-code text-fg-muted">Udhna Citizen Commerce College (VNSGU)</p>
                  <p className="text-xs text-fg-muted mt-1">
                    Graduated with <strong>Distinction (SGPA: 8.78 / 10)</strong>. Coursework in Web Development, Database Management Systems, PHP, and Android Java.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-fg border-b border-white/10 pb-3 mb-6">
                Technical Stack Matrix
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {siteConfig.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="font-code text-xs text-fg bg-white/5 px-3 py-1.5 rounded-md border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
