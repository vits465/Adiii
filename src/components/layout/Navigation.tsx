'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SoundEqualizer from '../ui/SoundEqualizer';
import { siteConfig } from '@/data/site';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 py-6 flex justify-between items-center bg-gradient-to-b from-[#0A0A0C]/90 to-transparent backdrop-blur-sm pointer-events-none">
      <div className="brand-block pointer-events-auto flex flex-col">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-fg hover:text-accent transition-colors"
          data-cursor-label="HOME"
        >
          {siteConfig.shortName}
        </Link>
        <span className="text-[11px] font-code text-fg-muted">
          {siteConfig.title}
        </span>
      </div>

      <div className="nav-right pointer-events-auto flex items-center gap-6 md:gap-10">
        <nav className="flex items-center gap-6 md:gap-8 font-code text-xs uppercase tracking-wider">
          <Link
            href="/"
            className={`transition-colors hover:text-accent relative py-1 ${
              pathname === '/' ? 'text-accent font-semibold border-b border-accent' : 'text-fg-muted'
            }`}
          >
            Work
          </Link>
          <Link
            href="/about"
            className={`transition-colors hover:text-accent relative py-1 ${
              pathname === '/about' ? 'text-accent font-semibold border-b border-accent' : 'text-fg-muted'
            }`}
          >
            About
          </Link>
          <Link
            href="/playground"
            className={`transition-colors hover:text-accent relative py-1 ${
              pathname === '/playground' ? 'text-accent font-semibold border-b border-accent' : 'text-fg-muted'
            }`}
          >
            Playground
          </Link>
        </nav>

        <SoundEqualizer />
      </div>
    </header>
  );
}
