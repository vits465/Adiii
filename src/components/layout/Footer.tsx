'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/site';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const [showCredits, setShowCredits] = useState(false);
  const pathname = usePathname();
  const isAbout = pathname === '/about';
  const isPlayground = pathname === '/playground';

  const footerBgClass = isAbout
    ? 'bg-[#083D2A] text-[#F4F3EF]'
    : isPlayground
    ? 'bg-[#D9E838] text-[#111111]'
    : 'bg-[#083D2A] text-[#F4F3EF]';

  return (
    <footer className={`relative z-10 px-6 md:px-16 pt-24 pb-12 border-t border-black/10 transition-colors duration-500 ${footerBgClass}`}>
      {/* Recording-Matched Giant Bold Typography Statement */}
      <div className="max-w-6xl mx-auto space-y-6 mb-20">
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.95]">
          LET'S BUILD A <br />
          REMARKABLE DIGITAL <br />
          PRODUCT
        </h2>
        <h3 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-accent-lime opacity-90">
          YOUR VISION STARTS HERE !
        </h3>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-10 border-t border-white/20">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowCredits(true)}
            className="font-body text-xs font-semibold px-5 py-2 rounded-full border border-current hover:opacity-70 transition-all"
            data-cursor-label="CREDITS"
          >
            Credits
          </button>
          <span className="text-xs font-code opacity-75">
            Surat, Gujarat, India
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-8 text-xs font-code">
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:underline opacity-90"
          >
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline opacity-90"
          >
            LinkedIn ↗
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline opacity-90"
          >
            GitHub ↗
          </a>
          <span className="opacity-60">
            © 2026
          </span>
        </div>
      </div>

      {/* Credits Modal */}
      {showCredits && (
        <div
          onClick={() => setShowCredits(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[10000] flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#083D2A] text-[#F4F3EF] rounded-2xl p-8 max-w-xl w-full relative shadow-2xl border border-white/20"
          >
            <button
              onClick={() => setShowCredits(false)}
              className="absolute top-5 right-5 text-white/80 hover:text-white text-2xl"
            >
              &times;
            </button>
            <h3 className="font-display text-2xl font-bold mb-3 text-[#C6FF3D]">CREDITS & SPECIFICATIONS</h3>
            <p className="text-emerald-100 text-sm leading-relaxed mb-6">
              Designed & engineered for <strong>{siteConfig.name}</strong> referencing top-tier interactive portfolio direction with 100% original procedural assets.
            </p>
            <hr className="border-white/10 my-4" />
            <div className="space-y-2.5 text-xs font-code text-emerald-200">
              <p>• <strong>Framework:</strong> Next.js 14 App Router + TypeScript</p>
              <p>• <strong>Typography:</strong> Space Grotesk & Plus Jakarta Sans</p>
              <p>• <strong>3D & Shaders:</strong> Three.js + R3F + Custom Procedural GLSL Noise Shaders</p>
              <p>• <strong>Motion Engine:</strong> GSAP + ScrollTrigger + Lenis Smooth Scroll</p>
              <p>• <strong>Audio Engine:</strong> Web Audio API Parametric Oscillator Synthesizer</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
