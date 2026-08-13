'use client';

import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/data/site';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (isLoaded) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#083D2A] text-white z-[99999] flex flex-col justify-between p-8 md:p-12 transition-opacity duration-700 ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex justify-between items-center text-xs font-mono text-emerald-300 uppercase tracking-widest">
        <span>{siteConfig.shortName}</span>
        <span>Loading Portfolio // {progress}%</span>
      </div>

      <div className="my-auto">
        <h1 className="font-headline text-3xl md:text-6xl font-bold tracking-tight text-emerald-100 leading-tight max-w-3xl">
          Driven by precision. <br />
          Obsessed with fullstack architecture.
        </h1>
      </div>

      <div className="w-full bg-emerald-950/60 h-1 rounded-full overflow-hidden">
        <div
          className="bg-emerald-400 h-full transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
