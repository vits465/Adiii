'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SoundEqualizer from '../ui/SoundEqualizer';
import { siteConfig } from '@/data/site';

export default function Navigation() {
  const pathname = usePathname();

  const isAbout = pathname === '/about';
  const textColorClass = isAbout ? 'text-[#F4F3EF]' : 'text-[#111111]';
  const mutedColorClass = isAbout ? 'text-[#a7f3d0]' : 'text-[#555555]';

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 py-6 flex justify-between items-center pointer-events-none">
      <div className="brand-block pointer-events-auto flex items-center gap-4">
        <Link
          href="/"
          className={`font-display text-lg font-bold tracking-tight transition-colors ${textColorClass}`}
          data-cursor-label="HOME"
        >
          {siteConfig.shortName}
        </Link>
        <span className={`text-xs font-body font-normal ${mutedColorClass} hidden sm:inline-block`}>
          {siteConfig.title}
        </span>
      </div>

      <div className="nav-right pointer-events-auto flex items-center gap-6 md:gap-10">
        <nav className="flex items-center gap-6 md:gap-8 font-body text-sm font-semibold tracking-tight">
          <Link
            href="/"
            className={`transition-colors relative py-1 ${
              pathname === '/'
                ? `${textColorClass} border-b-2 ${isAbout ? 'border-white' : 'border-black'}`
                : `${mutedColorClass} hover:${textColorClass}`
            }`}
          >
            Work
          </Link>
          <Link
            href="/about"
            className={`transition-colors relative py-1 ${
              pathname === '/about'
                ? `${textColorClass} border-b-2 ${isAbout ? 'border-white' : 'border-black'}`
                : `${mutedColorClass} hover:${textColorClass}`
            }`}
          >
            About
          </Link>
          <Link
            href="/playground"
            className={`transition-colors relative py-1 ${
              pathname === '/playground'
                ? `${textColorClass} border-b-2 ${isAbout ? 'border-white' : 'border-black'}`
                : `${mutedColorClass} hover:${textColorClass}`
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
