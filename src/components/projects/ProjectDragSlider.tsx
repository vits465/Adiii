'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { projectsData, Project } from '@/data/projects';

export default function ProjectDragSlider() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Floating preview card mouse tracker
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Drag scroll handlers
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
      {/* Section Title & Drag Indicator */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end px-6 md:px-12 mb-10">
        <div>
          <span className="text-xs font-code text-accent uppercase tracking-widest block mb-2">
            // Selected Deliverables
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-fg">
            Featured Engineering Projects
          </h2>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3 text-xs font-code text-fg-muted">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>[ DRAG HORIZONTALLY OR HOVER FOR PREVIEW ]</span>
        </div>
      </div>

      {/* Horizontal Drag Slider */}
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleDragMove}
        className={`flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-12 pt-4 no-scrollbar cursor-grab ${
          isDragging ? 'cursor-grabbing select-none' : ''
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projectsData.map((project) => (
          <div
            key={project.slug}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
            className="flex-shrink-0 w-[320px] sm:w-[420px] md:w-[540px] snap-start group"
          >
            <Link href={`/work/${project.slug}`} className="block">
              <div
                className="w-full h-[360px] md:h-[460px] rounded-2xl border border-white/10 bg-bg-card p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-[0_0_30px_rgba(198,255,61,0.1)]"
                data-cursor-label="EXPLORE"
              >
                {/* Top Bar Metadata */}
                <div className="flex justify-between items-center text-xs font-code text-fg-muted z-10">
                  <span className="text-accent font-semibold">{project.index}</span>
                  <span>{project.year}</span>
                </div>

                {/* Center Title & Description */}
                <div className="z-10 my-auto">
                  <span className="text-xs font-code text-fg-muted uppercase tracking-wider block mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-fg mb-4 weight-hover">
                    {project.title}
                  </h3>
                  <p className="text-sm text-fg-muted line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Roles & Action */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs font-code text-fg-muted z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.roles.slice(0, 3).map((role, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px]"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <span className="text-accent font-semibold group-hover:translate-x-1 transition-transform">
                    Case Study →
                  </span>
                </div>

                {/* Background Pattern Accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </Link>

            {/* Links Bar Below Card */}
            <div className="flex items-center justify-between mt-4 px-2 text-xs font-code text-fg-muted">
              <span>{project.team}</span>
              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent border-b border-fg-muted hover:border-accent transition-colors"
                  >
                    Live Demo ↗
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent border-b border-fg-muted hover:border-accent transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Hover-Preview Panel (Follows Cursor) */}
      {hoveredProject && !isDragging && (
        <div
          className="fixed pointer-events-none z-[9990] hidden md:flex flex-col justify-between p-4 w-[260px] h-[160px] bg-bg-card/95 border border-accent/40 rounded-xl shadow-2xl backdrop-blur-md transition-opacity duration-300"
          style={{
            left: `${mousePos.x + 20}px`,
            top: `${mousePos.y + 20}px`,
          }}
        >
          <div className="flex justify-between items-center text-[10px] font-code text-accent">
            <span>PREVIEW // {hoveredProject.index}</span>
            <span>{hoveredProject.year}</span>
          </div>
          <div className="my-auto">
            <h4 className="font-display text-sm font-bold text-fg leading-tight">
              {hoveredProject.title}
            </h4>
            <p className="text-[11px] text-fg-muted mt-1 line-clamp-2">
              {hoveredProject.category}
            </p>
          </div>
          <div className="text-[10px] font-code text-accent/80 text-right">
            CLICK TO VIEW ARCHITECTURE
          </div>
        </div>
      )}
    </div>
  );
}
