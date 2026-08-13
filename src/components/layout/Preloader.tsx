'use client';

import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/data/site';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isWiped, setIsWiped] = useState(false);

  useEffect(() => {
    // Real font load checking paired with progress ticker
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        setProgress((prev) => Math.max(prev, 60));
      });
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 300);
          setTimeout(() => setIsWiped(true), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18) + 8;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (isWiped) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#0A0A0C] text-[#F4F3EF] z-[99999] flex flex-col justify-between p-8 md:p-14 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isDone ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center text-xs font-code text-accent uppercase tracking-widest">
        <span>{siteConfig.shortName} // Portfolio</span>
        <span>INITIALIZING WEBGL // {progress}%</span>
      </div>

      {/* Center Reveal Typography */}
      <div className="my-auto max-w-4xl">
        <span className="text-xs font-code text-fg-muted uppercase tracking-widest block mb-4">
          SYSTEM ARCHITECTURE & WEBGL SHADERS
        </span>
        <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-fg leading-tight">
          Driven by precision. <br />
          <span className="text-accent">Obsessed with fullstack</span> architecture.
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
        <div
          className="bg-accent h-full transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
