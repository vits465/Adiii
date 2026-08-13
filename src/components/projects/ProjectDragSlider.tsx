'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { projectsData, Project } from '@/data/projects';

export default function ProjectDragSlider() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setHoveredProject(null);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      {/* Horizontal Drag Slider */}
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleDragMove}
        className={`flex gap-10 md:gap-16 overflow-x-auto snap-x snap-mandatory px-6 md:px-16 pb-16 pt-6 no-scrollbar cursor-grab ${
          isDragging ? 'cursor-grabbing select-none' : ''
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projectsData.map((project) => (
          <div
            key={project.slug}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
            className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[60vw] max-w-[860px] snap-start group"
          >
            {/* Card Device Container */}
            <Link href={`/work/${project.slug}`} className="block">
              <div
                className="w-full h-[400px] sm:h-[500px] md:h-[580px] rounded-3xl bg-[#f0f0f0] border border-black/10 p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.01] shadow-2xl"
                data-cursor-label="EXPLORE"
              >
                {/* SVG Cover / Mockup Display */}
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#0A0A0C]">
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </Link>

            {/* Recording-Matched Metadata Layout Below Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-black/10 mt-6 text-[#111111]">
              {/* Left Column: Index, Title & Category */}
              <div className="lg:col-span-6 flex items-start gap-4">
                <span className="font-display text-xl font-bold text-[#111111]">{project.index}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#111111] leading-tight weight-hover">
                    {project.title}
                  </h3>
                  <span className="text-sm font-body text-[#555555] font-medium block mt-1">
                    {project.category}
                  </span>
                  <div className="mt-4">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-body font-semibold text-[#111111] border-b border-[#111111] pb-0.5 hover:opacity-70 transition-opacity"
                      >
                        Project link ↗
                      </a>
                    ) : project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-body font-semibold text-[#111111] border-b border-[#111111] pb-0.5 hover:opacity-70 transition-opacity"
                      >
                        GitHub code ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Middle Column: Year */}
              <div className="lg:col-span-2">
                <span className="text-sm font-body font-medium text-[#111111]">{project.year}</span>
              </div>

              {/* Right Column: Team & Roles */}
              <div className="lg:col-span-4 space-y-2">
                <div>
                  <span className="text-sm font-body font-medium text-[#111111] block">
                    {project.team}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-code text-[#777777] uppercase tracking-wider block">Roles</span>
                  <span className="text-xs font-body font-medium text-[#333333] block">
                    {project.roles.join(' • ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
