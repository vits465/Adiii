import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import Preloader from '@/components/layout/Preloader';
import { siteConfig } from '@/data/site';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: `${siteConfig.shortName} — ${siteConfig.title}`,
  description: siteConfig.bio,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.title,
    url: 'https://the-flat-white.vercel.app/',
    type: 'website',
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
