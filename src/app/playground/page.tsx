'use client';

import React, { useState, useEffect } from 'react';
import { playgroundData, PlaygroundItem } from '@/data/playground';

export default function PlaygroundPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PlaygroundItem | null>(null);

  useEffect(() => {
    document.body.classList.add('theme-playground');
    return () => {
      document.body.classList.remove('theme-playground');
    };
  }, []);

  const categories = ['all', 'GLSL Shader', '3D Exploration', 'Physics & Motion', 'Generative Art'];

  const filteredItems = activeFilter === 'all'
    ? playgroundData
    : playgroundData.filter(item => item.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="px-6 md:px-10 pb-20 text-white">
      <section className="pt-8 pb-12 min-h-[30vh] max-w-4xl">
        <span className="font-mono text-xs uppercase tracking-widest text-[#E5CF96] block mb-2">
          Laboratory &amp; Experiments
        </span>
        <h1 className="font-headline text-3xl md:text-5xl font-bold leading-tight text-white">
          Exploring GLSL shaders, 3D kinetics, real-time node graphs, and procedural motion.
        </h1>
      </section>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              activeFilter === cat
                ? 'bg-[#E5CF96] text-[#083D2A] font-bold shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Gallery */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative aspect-square bg-[#05291C] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#E5CF96] transition-all duration-300"
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#05291C]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
              <span className="font-mono text-[10px] text-[#E5CF96] uppercase">{item.category}</span>
              <h3 className="font-headline text-lg font-bold text-white">{item.title}</h3>
            </div>
          </div>
        ))}
      </section>

      {/* Modal Popup Viewer */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[3000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#083D2A] border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-[#E5CF96] hover:text-[#083D2A] transition-all"
            >
              ✕
            </button>

            <div className="max-h-[65vh] bg-black flex items-center justify-center">
              {selectedItem.type === 'video' ? (
                <video src={selectedItem.src} controls autoPlay loop className="max-h-[65vh] w-auto object-contain" />
              ) : (
                <img src={selectedItem.src} alt={selectedItem.title} className="max-h-[65vh] w-auto object-contain" />
              )}
            </div>

            <div className="p-8">
              <span className="font-mono text-xs text-[#E5CF96] uppercase block mb-1">{selectedItem.category}</span>
              <h2 className="font-headline text-2xl font-bold text-white">{selectedItem.title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

