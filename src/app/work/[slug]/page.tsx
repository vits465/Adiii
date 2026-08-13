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
    <div className="min-h-screen bg-[#0A0A0C] text-fg px-6 md:px-12 pt-28 pb-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Breadcrumb & Title */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-xs font-code text-accent">
            <Link href="/" className="hover:underline">WORK</Link>
            <span>/</span>
            <span>{project.category}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-fg leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-fg-muted max-w-3xl leading-relaxed font-body">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-2 font-code text-xs">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-accent text-[#0A0A0C] font-bold hover:bg-white transition-colors"
                data-cursor-label="LIVE"
              >
                LAUNCH PLATFORM ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-white/20 text-fg hover:border-accent hover:text-accent transition-colors"
              >
                INSPECT REPOSITORY ↗
              </a>
            )}
          </div>
        </section>

        {/* Hero Card Container */}
        <section className="w-full h-[360px] md:h-[500px] bg-[#121216] rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center p-8 text-center">
          <div className="max-w-xl space-y-3 z-10">
            <span className="font-code text-xs text-accent">{project.index} // CASE STUDY SPECIFICATION</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-fg">{project.title}</h2>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        </section>

        {/* Specs Grid & Architectural Detail */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/10 pt-12">
          {/* Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-8 font-code text-xs">
            <div>
              <span className="block text-fg-muted uppercase tracking-widest mb-1">YEAR</span>
              <span className="text-sm font-semibold text-fg">{project.year}</span>
            </div>

            <div>
              <span className="block text-fg-muted uppercase tracking-widest mb-1">TEAM & CONTEXT</span>
              <span className="text-sm font-semibold text-fg">{project.team}</span>
            </div>

            <div>
              <span className="block text-fg-muted uppercase tracking-widest mb-2">TECHNOLOGY STACK</span>
              <div className="flex flex-wrap gap-2">
                {project.roles.map((r, i) => (
                  <span key={i} className="text-fg bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="font-display text-2xl font-bold text-fg text-accent">Architectural Deep-Dive</h3>
            <div className="text-sm md:text-base text-fg-muted leading-relaxed whitespace-pre-line bg-[#121216] p-8 rounded-2xl border border-white/10 font-body">
              {project.longDescription}
            </div>

            {project.stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {project.stats.map((s, i) => (
                  <div key={i} className="bg-[#121216] p-6 rounded-xl border border-white/10 text-center space-y-1">
                    <div className="font-display text-xl font-bold text-accent">{s.value}</div>
                    <div className="font-code text-[11px] text-fg-muted uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Next Deliverable Banner */}
        <section className="border-t border-white/10 pt-12 flex flex-col space-y-2">
          <span className="text-xs font-code text-accent uppercase tracking-widest">NEXT DELIVERABLE →</span>
          <Link href={`/work/${nextProject.slug}`} className="group inline-block">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-fg group-hover:text-accent transition-colors">
              {nextProject.title}
            </h2>
          </Link>
        </section>
      </div>
    </div>
  );
}
