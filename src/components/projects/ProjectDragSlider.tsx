'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { projectsData } from '@/data/projects';

export default function ProjectDragSlider() {
  const [activeDrag, setActiveDrag] = useState<string | null>(null);

  const handleMouseEnter = () => {
    document.body.classList.add('cursor-drag');
  };

  const handleMouseLeave = () => {
    document.body.classList.remove('cursor-drag');
    setActiveDrag(null);
  };

  return (
    <div className="space-y-24 md:space-y-36 px-6 md:px-10">
      {projectsData.map((project) => (
        <div key={project.slug} className="group">
          {/* Mockup Card Slider */}
          <Link href={`/work/${project.slug}`}>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="project-mockup-card w-full h-[380px] md:h-[540px] bg-[#dfdfdf] rounded-xl border border-black/10 overflow-hidden relative cursor-grab active:cursor-grabbing shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
            >
              <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-emerald-900/10 to-emerald-500/10 p-8 text-center">
                <span className="font-code text-xs md:text-sm text-[#555] mb-3">
                  {project.index} // {project.category}
                </span>
                <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4 text-[#111]">
                  {project.title}
                </h2>
                <p className="max-w-xl text-sm md:text-base text-[#444] leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-white/80 px-4 py-2 rounded-full border border-emerald-700/20">
                  Explore Editorial Case Study →
                </div>
              </div>
            </div>
          </Link>

          {/* Editorial Metadata Row Below Card */}
          <div className="flex flex-col md:flex-row justify-between items-start pt-6 border-t border-black/10 mt-6 gap-6">
            <div className="flex items-start gap-6">
              <span className="font-headline text-lg font-bold text-[#111]">{project.index}</span>
              <div>
                <h3 className="font-headline text-xl font-bold text-[#111]">{project.title}</h3>
                <p className="text-xs text-[#555]">({project.category})</p>
              </div>
            </div>

            <div className="flex flex-wrap items-start gap-8 md:gap-12">
              <div>
                <span className="block text-[10px] text-[#777] uppercase tracking-widest">YEAR</span>
                <span className="text-sm font-medium text-[#111]">{project.year}</span>
              </div>

              <div>
                <span className="block text-[10px] text-[#777] uppercase tracking-widest">TEAM</span>
                <span className="text-sm font-medium text-[#111]">{project.team}</span>
              </div>

              <div>
                <span className="block text-[10px] text-[#777] uppercase tracking-widest">ROLES</span>
                <span className="text-sm font-medium text-[#111]">{project.roles.join(', ')}</span>
              </div>

              <div className="flex items-center gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm font-semibold text-[#111] border-b-2 border-[#111] pb-0.5 hover:opacity-70 transition-opacity"
                  >
                    Project link ↗
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm font-semibold text-[#111] border-b-2 border-[#111] pb-0.5 hover:opacity-70 transition-opacity"
                  >
                    GitHub Code ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
