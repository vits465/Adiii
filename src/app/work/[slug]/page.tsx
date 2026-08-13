import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsData } from '@/data/projects';

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const projectIndex = projectsData.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <div className="px-6 md:px-10 pb-20">
      {/* Header */}
      <section className="pt-8 pb-12">
        <div className="flex items-center gap-3 text-xs font-code text-[#555] mb-4">
          <Link href="/" className="hover:text-[#111]">Work</Link>
          <span>/</span>
          <span>{project.category}</span>
        </div>

        <h1 className="font-headline text-4xl md:text-6xl font-bold text-[#111] mb-6">
          {project.title}
        </h1>

        <p className="text-lg md:text-xl text-[#444] max-w-3xl leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#083D2A] text-white font-headline font-bold text-sm px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors"
            >
              🌐 Launch Live Platform ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#111] text-[#111] font-headline font-bold text-sm px-6 py-3 rounded-full hover:bg-[#111] hover:text-white transition-colors"
            >
              💻 Inspect GitHub Code ↗
            </a>
          )}
        </div>
      </section>

      {/* Hero Media Container */}
      <section className="w-full h-[400px] md:h-[600px] bg-[#dfdfdf] rounded-2xl border border-black/10 overflow-hidden mb-16 relative flex items-center justify-center p-8 text-center">
        <div className="max-w-xl">
          <span className="font-code text-sm text-[#555] block mb-2">{project.index} // CASE STUDY</span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-[#111]">{project.title}</h2>
        </div>
      </section>

      {/* Specs Grid & Content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-1 space-y-6 border-t border-black/10 pt-6">
          <div>
            <span className="block text-xs text-[#777] uppercase tracking-widest font-code mb-1">YEAR</span>
            <span className="text-base font-semibold text-[#111]">{project.year}</span>
          </div>

          <div>
            <span className="block text-xs text-[#777] uppercase tracking-widest font-code mb-1">TEAM & ROLE</span>
            <span className="text-base font-semibold text-[#111]">{project.team}</span>
          </div>

          <div>
            <span className="block text-xs text-[#777] uppercase tracking-widest font-code mb-1">TECHNOLOGIES DEPLOYED</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.roles.map((r, i) => (
                <span key={i} className="font-code text-xs text-[#111] bg-black/5 px-3 py-1 rounded">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8 border-t border-black/10 pt-6">
          <h3 className="font-headline text-2xl font-bold text-[#111]">Architectural Overview</h3>
          <div className="text-base md:text-lg text-[#333] leading-relaxed whitespace-pre-line bg-black/5 p-8 rounded-2xl border border-black/5">
            {project.longDescription}
          </div>

          {project.stats && (
            <div className="grid grid-cols-3 gap-6 pt-6">
              {project.stats.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-black/10 text-center">
                  <div className="font-headline text-2xl font-bold text-emerald-800">{s.value}</div>
                  <div className="text-xs text-[#777] uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Next Project Footer */}
      <section className="border-t border-black/10 pt-12">
        <span className="text-xs font-code text-[#777] uppercase tracking-widest block mb-2">NEXT DELIVERABLE</span>
        <Link href={`/work/${nextProject.slug}`} className="group inline-flex items-center gap-4">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-[#111] group-hover:text-emerald-800 transition-colors">
            {nextProject.title} →
          </h2>
        </Link>
      </section>
    </div>
  );
}
