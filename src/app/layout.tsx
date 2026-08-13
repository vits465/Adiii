import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import Preloader from '@/components/layout/Preloader';
import { siteConfig } from '@/data/site';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://the-flat-white.vercel.app/'),
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.bio,
  keywords: [
    'Aditya Chauhan',
    'Fullstack Engineer',
    'WebGL Developer',
    'Three.js Portfolio',
    'React Developer',
    'Node.js Architect',
    'Surat Gujarat Software Engineer',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.bio,
    url: 'https://the-flat-white.vercel.app/',
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: '/images/work/house-of-hackney.svg',
        width: 1200,
        height: 800,
        alt: `${siteConfig.name} Portfolio Showcase`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.bio,
    images: ['/images/work/house-of-hackney.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <CustomCursor />
        <div className="noise-overlay" />
        <Navigation />
        <main className="min-h-screen pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
