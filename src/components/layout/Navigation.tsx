'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SoundEqualizer from '../ui/SoundEqualizer';
import { siteConfig } from '@/data/site';

export default function Navigation() {
  const pathname = usePathname();

  const isAbout = pathname === '/about';
  const isPlayground = pathname === '/playground';

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] px-6 md:px-10 py-6 flex justify-between items-start pointer-events-none">
      <div className="brand-block pointer-events-auto flex flex-col">
        <Link
          href="/"
          className={`font-headline text-lg font-bold tracking-tight transition-colors ${
            isAbout || isPlayground ? 'text-white' : 'text-[#111]'
          }`}
        >
          {siteConfig.shortName}
        </Link>
        <span
          className={`text-xs font-normal mt-0.5 ${
            isAbout || isPlayground ? 'text-[#a7f3d0]' : 'text-[#555]'
          }`}
        >
          {siteConfig.title}
        </span>
      </div>

      <div className="nav-right pointer-events-auto flex items-center gap-6 md:gap-9">
        <nav className="flex items-center gap-5 md:gap-7 list-none">
          <Link
            href="/"
            className={`font-body text-sm md:text-base font-medium relative pb-1 transition-colors ${
              pathname === '/'
                ? `${isAbout || isPlayground ? 'text-white border-b-2 border-white' : 'text-[#111] border-b-2 border-[#111]'}`
                : `${isAbout || isPlayground ? 'text-white/70 hover:text-white' : 'text-[#555] hover:text-[#111]'}`
            }`}
          >
            Work
          </Link>
          <Link
            href="/about"
            className={`font-body text-sm md:text-base font-medium relative pb-1 transition-colors ${
              pathname === '/about'
                ? 'text-white border-b-2 border-white'
                : `${isAbout || isPlayground ? 'text-white/70 hover:text-white' : 'text-[#555] hover:text-[#111]'}`
            }`}
          >
            About
          </Link>
          <Link
            href="/playground"
            className={`font-body text-sm md:text-base font-medium relative pb-1 transition-colors ${
              pathname === '/playground'
                ? 'text-white border-b-2 border-white'
                : `${isAbout || isPlayground ? 'text-white/70 hover:text-white' : 'text-[#555] hover:text-[#111]'}`
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
