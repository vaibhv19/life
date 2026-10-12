'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { HeroArchive } from '@/components/HeroArchive';
import { EditorialMarquee } from '@/components/EditorialMarquee';
import { WhatIsThisPage } from '@/components/WhatIsThisPage';
import { WhyIMadeThisPage } from '@/components/WhyIMadeThisPage';
import { CatalogHighlights } from '@/components/CatalogHighlights';
import { EditorialPageNav } from '@/components/EditorialPageNav';
import { Footer } from '@/components/Footer';

export default function LifePage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#226192] antialiased">
      {/* 01. Global Editorial Navigation Bar */}
      <Header />

      {/* 02. Essential Homepage Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero composition: portrait & quote */}
        <HeroArchive />

        {/* 03. Catalog Highlights (Hero area Highlights row) */}
        <CatalogHighlights />

        {/* Between Us CTA Button positioned below highlights and editorial statement */}
        <div className="content-container flex justify-center text-center mt-2 sm:mt-3 mb-6 sm:mb-8 md:mb-10 select-none">
          <Link
            href="/between-us"
            className="btn-palette-b cursor-pointer focus:outline-none px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-tight hover:scale-[1.02] active:scale-[0.98] shadow-sm select-none inline-block leading-snug"
            style={{
              borderRadius: '18px 5px 22px 7px / 8px 20px 7px 16px',
            }}
            title="Open Between Us private space"
          >
            I might have something specially for you
          </Link>
        </div>

        {/* 04. Editorial Continuous Marquee (To exist is a fact, to live is an art) */}
        <EditorialMarquee className="w-full mt-1 sm:mt-2 md:mt-3 mb-4 sm:mb-5 md:mb-6 select-none" />

        {/* 05. Section 1: What Is This Page? */}
        <WhatIsThisPage />

        {/* 06. Section 2: Why I Made This Page */}
        <WhyIMadeThisPage />

        {/* 07. Second Editorial Continuous Marquee */}
        <EditorialMarquee
          phrase="I haven't met all of me yet"
          className="w-full mt-1 sm:mt-2 md:mt-3 mb-6 sm:mb-7 md:mb-8 select-none"
          ariaLabel="Editorial Motto: Be the love you never received"
        />

        {/* 08. Editorial Page Navigation Section (Extraa) */}
        <EditorialPageNav />
      </main>

      {/* 09. Global Minimal Footer */}
      <Footer />
    </div>
  );
}

