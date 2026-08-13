'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/site';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const [showCredits, setShowCredits] = useState(false);
  const pathname = usePathname();
  const isDark = pathname === '/about' || pathname === '/playground';

  return (
    <footer className={`relative z-10 px-6 md:px-10 pt-20 pb-10 border-t ${
      isDark ? 'border-white/20 text-white' : 'border-black/10 text-[#111]'
    }`}>
      {/* Kinetic Marquee */}
      <div className="overflow-hidden whitespace-nowrap py-8 mb-12">
        <div className="animate-marquee">
          <span className="font-headline text-3xl md:text-5xl font-bold uppercase tracking-tight">
            LET'S BUILD A REMARKABLE DIGITAL PRODUCT ★ YOUR VISION STARTS HERE ★ &nbsp;
          </span>
          <span className="font-headline text-3xl md:text-5xl font-bold uppercase tracking-tight">
            LET'S BUILD A REMARKABLE DIGITAL PRODUCT ★ YOUR VISION STARTS HERE ★ &nbsp;
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <button
          onClick={() => setShowCredits(true)}
          className={`font-body text-xs md:text-sm font-semibold px-5 py-2 rounded-full border transition-all ${
            isDark
              ? 'border-white text-white hover:bg-white hover:text-[#083D2A]'
              : 'border-[#111] text-[#111] hover:bg-[#111] hover:text-white'
          }`}
        >
          Credits
        </button>

        <div className="flex flex-wrap gap-6 text-sm font-medium">
          <a
            href={`mailto:${siteConfig.email}`}
            className={`transition-colors ${isDark ? 'text-emerald-200 hover:text-white' : 'text-[#555] hover:text-[#111]'}`}
          >
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className={`transition-colors ${isDark ? 'text-emerald-200 hover:text-white' : 'text-[#555] hover:text-[#111]'}`}
          >
            {siteConfig.phone}
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${isDark ? 'text-emerald-200 hover:text-white' : 'text-[#555] hover:text-[#111]'}`}
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${isDark ? 'text-emerald-200 hover:text-white' : 'text-[#555] hover:text-[#111]'}`}
          >
            GitHub
          </a>
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
            className="bg-[#083D2A] text-white rounded-2xl p-8 max-w-lg w-full relative shadow-2xl border border-white/20"
          >
            <button
              onClick={() => setShowCredits(false)}
              className="absolute top-5 right-5 text-white/80 hover:text-white text-2xl"
            >
              &times;
            </button>
            <h3 className="font-headline text-2xl font-bold mb-3">Credits & Specifications</h3>
            <p className="text-emerald-100 text-sm leading-relaxed mb-6">
              Designed & engineered for <strong>{siteConfig.name}</strong> based on Léo Parpeix interactive art direction.
            </p>
            <hr className="border-white/20 my-4" />
            <div className="space-y-2 text-sm text-emerald-200">
              <p>• <strong>Framework:</strong> Next.js App Router + TypeScript</p>
              <p>• <strong>Typography:</strong> Monument Grotesk & Avantt Variable</p>
              <p>• <strong>3D Engine:</strong> Three.js + React Three Fiber + Drei</p>
              <p>• <strong>Motion:</strong> GSAP + ScrollTrigger + Lenis Smooth Scroll</p>
              <p>• <strong>Audio Engine:</strong> Web Audio API Synthesizer</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
