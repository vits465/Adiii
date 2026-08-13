'use client';

import React, { useEffect } from 'react';
import { playgroundData } from '@/data/playground';

export default function PlaygroundPage() {
  useEffect(() => {
    document.body.className = 'theme-yellow';
    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#D9E838] text-[#111111] px-6 md:px-16 pt-28 pb-24">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Recording-Matched Header */}
        <div className="space-y-4">
          <p className="text-sm font-body text-[#333333] max-w-xl">
            I enjoy trying out fresh techniques and playing with unique layer compositions, often inspired by my creative observations or simply from wandering around.
          </p>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-[#111111] uppercase">
            WELCOME ON <br />
            MY DESIGN PLAYGROUND
          </h1>

          <span className="text-xs font-code text-[#444444] block">
            (Click to feed the bee)
          </span>
        </div>

        {/* Recording-Matched Tile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {playgroundData.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] border border-black/10 rounded-2xl p-5 space-y-3 group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              data-cursor-label="VIEW"
            >
              <div className="w-full h-[260px] rounded-xl overflow-hidden bg-[#0A0A0C] border border-black/5 relative">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex justify-between items-center text-xs font-code text-[#555555] pt-1">
                <h3 className="font-display text-base font-bold text-[#111111] group-hover:underline">
                  {item.title}
                </h3>
                <span>2025</span>
              </div>
              <span className="text-xs font-body text-[#777777] block">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
