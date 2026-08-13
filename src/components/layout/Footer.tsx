'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/site';

export default function Footer() {
  const [showCredits, setShowCredits] = useState(false);

  return (
    <footer className="relative z-10 px-6 md:px-12 pt-20 pb-12 border-t border-white/10 bg-[#0A0A0C] text-fg">
      {/* Kinetic Marquee Banner */}
      <div className="overflow-hidden whitespace-nowrap py-6 mb-12 border-y border-white/5">
        <div className="animate-marquee font-display text-2xl md:text-5xl font-bold uppercase tracking-tight text-white/90">
          <span>LET'S BUILD A REMARKABLE DIGITAL PRODUCT ★ AVAILABLE FOR HIGHER-ORDER ARCHITECTURE ★ &nbsp;</span>
          <span>LET'S BUILD A REMARKABLE DIGITAL PRODUCT ★ AVAILABLE FOR HIGHER-ORDER ARCHITECTURE ★ &nbsp;</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <button
            onClick={() => setShowCredits(false)}
            className="font-code text-xs uppercase tracking-widest text-accent hover:underline mb-2 block"
          >
            Aditya Chauhan // Fullstack & WebGL Engineer
          </button>
          <p className="text-xs text-fg-muted max-w-md">
            Engineered with Next.js 14, React Three Fiber, WebGL Shaders, and GSAP. 100% procedural assets with zero external third-party media dependencies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-code">
          <button
            onClick={() => setShowCredits(true)}
            className="px-4 py-2 rounded-full border border-white/20 text-fg hover:border-accent hover:text-accent transition-colors"
          >
            CREDITS.md
          </button>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-fg-muted hover:text-accent transition-colors"
          >
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            GitHub ↗
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
            className="bg-[#121216] text-fg rounded-2xl p-8 max-w-xl w-full relative shadow-2xl border border-white/20"
          >
            <button
              onClick={() => setShowCredits(false)}
              className="absolute top-5 right-5 text-fg-muted hover:text-accent text-2xl"
            >
              &times;
            </button>
            <h3 className="font-display text-2xl font-bold mb-3 text-accent">CREDITS & SPECIFICATIONS</h3>
            <p className="text-fg-muted text-sm leading-relaxed mb-6">
              Designed & engineered for <strong>{siteConfig.name}</strong> referencing modern interaction patterns with 100% original procedural assets.
            </p>
            <hr className="border-white/10 my-4" />
            <div className="space-y-2.5 text-xs font-code text-fg-muted">
              <p>• <strong className="text-fg">Framework:</strong> Next.js 14 App Router + TypeScript</p>
              <p>• <strong className="text-fg">Typography:</strong> Space Grotesk & Plus Jakarta Sans (OFL / Google Fonts)</p>
              <p>• <strong className="text-fg">3D & Shaders:</strong> Three.js + R3F + Custom Procedural GLSL Noise Shaders</p>
              <p>• <strong className="text-fg">Motion Engine:</strong> GSAP + ScrollTrigger + Lenis Smooth Scroll</p>
              <p>• <strong className="text-fg">Audio Engine:</strong> Web Audio API Parametric Oscillator Synthesizer</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
