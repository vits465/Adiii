'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/data/site';

const About3DFlower = dynamic(() => import('@/components/three/About3DFlower'), {
  ssr: false,
  loading: () => <div className="w-full h-[480px] bg-white/5 animate-pulse rounded-xl" />,
});

export default function AboutPage() {
  useEffect(() => {
    document.body.classList.add('theme-about');
    return () => {
      document.body.classList.remove('theme-about');
    };
  }, []);

  return (
    <div className="px-6 md:px-10 pb-20">
      {/* About Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 min-h-[60vh] pt-6">
        <div>
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Bringing depth, performance, and architecture to every web application.
          </h1>
        </div>

        <About3DFlower />
      </section>

      {/* About Content Grid */}
      <section className="pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <p className="text-lg md:text-xl text-emerald-100 leading-relaxed mb-6">
            I'm <strong>{siteConfig.name}</strong>, a Full Stack Developer based in Surat, Gujarat. I hold a Bachelor of Computer Applications (BCA) degree with <strong>Distinction (SGPA 8.78)</strong> from Udhna Citizen Commerce College (VNSGU) and am finalizing Full Stack Web Development certification at <strong>Oscar Career Point Academy</strong>.
          </p>

          <p className="text-lg md:text-xl text-emerald-100 leading-relaxed mb-8">
            My engineering workflow combines rigorous manual development across <strong>React, Node.js, Express, MongoDB, and TypeScript</strong> with structured technical AI agent orchestration—enabling me to deliver complex production applications at rapid velocity.
          </p>

          <a
            href={siteConfig.resumePdf}
            download="Aditya_Chauhan_Resume.pdf"
            className="inline-flex items-center gap-3 bg-emerald-400 text-[#083D2A] font-headline font-bold text-base px-8 py-4 rounded-full shadow-lg hover:bg-emerald-300 hover:shadow-emerald-400/40 transition-all duration-200"
          >
            📥 Download PDF Resume
          </a>

          {/* Professional Experience */}
          <div className="mt-16">
            <h3 className="font-headline text-2xl font-bold text-white border-b border-white/20 pb-3 mb-6">
              Professional Experience
            </h3>

            <div className="mb-8">
              <span className="font-code text-xs text-emerald-400">2025 – PRESENT</span>
              <h4 className="text-xl font-bold text-white mt-1">Freelance Full-Stack Developer</h4>
              <p className="text-sm text-emerald-200 mt-1">Remote / Surat, Gujarat</p>
              <p className="text-sm text-emerald-100/80 mt-2 leading-relaxed">
                Designed and built production platforms for clients including JourneyFlicker (Travel agency platform + quotation PDF engine), JourneyFlicker WhatsApp Bot, Bobby Salon, and The Flat White Coffee House.
              </p>
            </div>
          </div>
        </div>

        <div>
          {/* Education & Certifications */}
          <div>
            <h3 className="font-headline text-2xl font-bold text-white border-b border-white/20 pb-3 mb-6">
              Education & Academy
            </h3>

            <div className="space-y-8">
              <div>
                <span className="font-code text-xs text-emerald-400">2024 – PRESENT</span>
                <h4 className="text-xl font-bold text-white mt-1">Full Stack Web Development Certification</h4>
                <p className="text-sm text-emerald-200">Oscar Career Point Academy, Surat</p>
                <p className="text-sm text-emerald-100/80 mt-2 leading-relaxed">
                  Comprehensive fullstack JavaScript ecosystem training, REST API design, and enterprise backend capstones. Completing within 1-2 months.
                </p>
              </div>

              <div>
                <span className="font-code text-xs text-emerald-400">FEB 2025</span>
                <h4 className="text-xl font-bold text-white mt-1">Bachelor of Computer Applications (BCA)</h4>
                <p className="text-sm text-emerald-200">Udhna Citizen Commerce College (VNSGU)</p>
                <p className="text-sm text-emerald-100/80 mt-2 leading-relaxed">
                  Graduated with <strong>Distinction (SGPA: 8.78 / 10)</strong>. Coursework in Web Development, Database Management Systems, PHP, and Android Java.
                </p>
              </div>

              <div>
                <span className="font-code text-xs text-emerald-400">CERTIFICATIONS</span>
                <h4 className="text-xl font-bold text-white mt-1">Web Design & AI Coursework</h4>
                <p className="text-sm text-emerald-200">Veer Narmad South Gujarat University (VNSGU)</p>
              </div>
            </div>
          </div>

          {/* Technical Skills Matrix */}
          <div className="mt-16">
            <h3 className="font-headline text-2xl font-bold text-white border-b border-white/20 pb-3 mb-6">
              Technical Skills Matrix
            </h3>
            <div className="flex flex-wrap gap-3">
              {siteConfig.skills.map((skill, i) => (
                <span
                  key={i}
                  className="font-body text-sm font-medium text-white bg-white/10 px-4 py-2 rounded-full border border-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
