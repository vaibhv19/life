import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { HeroArchive } from '@/components/HeroArchive';
import { CatalogHighlights } from '@/components/CatalogHighlights';
import { AllPostClient } from '@/components/AllPostClient';
import { TravelHighlights } from '@/components/TravelHighlights';
import { EditorialMarquee } from '@/components/EditorialMarquee';
import { WhatIsThisPage } from '@/components/WhatIsThisPage';
import { WhyIMadeThisPage } from '@/components/WhyIMadeThisPage';
import { EditorialPageNav } from '@/components/EditorialPageNav';
import { Footer } from '@/components/Footer';
import { getArchivePosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Life — vaibhv19.dev',
  description: 'A personal archive of memories, moments, and thoughts.',
};

export const dynamic = 'force-dynamic';

export default function LifePage() {
  const posts = getArchivePosts();

  // Visibility control: Hide collection, timeline, and archive sections from the default homepage view
  const showArchiveUI = false;

  // Visibility control: Hide Between Us CTA button from homepage
  const showBetweenUsCTA = false;

  // Visibility control: Hide Extraa navigation ("There is more, somewhere.") from homepage
  const showExtraaNav = false;

  // Visibility control: Hide lower marquee ("I haven't met all of me yet") from homepage
  const showLowerMarquee = false;

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#226192] antialiased">
      {/* 01. Global Editorial Navigation Bar */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero composition: portrait & quote */}
        <HeroArchive />

        {/* “I might have something specially for you” button directly below hero - Hidden on homepage */}
        {showBetweenUsCTA && (
          <div className="content-container flex justify-center text-center mt-1 sm:mt-2 mb-3 sm:mb-4 select-none">
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
        )}


        {/* Archive-oriented sections (Collection highlights, Timeline archive, Travel highlights)
            Hidden from default homepage view per simplification requirement */}
        {showArchiveUI && (
          <>
            {/* Non-Travel Circular Highlights Row */}
            <CatalogHighlights />

            {/* 3. Complete Chronological Media Archive (from All Post) */}
            <section
              id="archive"
              aria-label="Chronological Archive"
              className="w-full pb-8 sm:pb-10 select-none"
            >
              <div className="content-container">
                <AllPostClient posts={posts} />
              </div>
            </section>

            {/* 4. Dedicated Travel Highlights Section */}
            <TravelHighlights />
          </>
        )}

        {/* 6. Existing Marquee and Remaining Editorial Content */}
        <EditorialMarquee className="w-full mt-1 sm:mt-2 mb-4 sm:mb-5 md:mb-6 select-none" />

        <WhatIsThisPage />

        <WhyIMadeThisPage />

        {showLowerMarquee && (
          <EditorialMarquee
            phrase="I haven't met all of me yet"
            className="w-full mt-1 sm:mt-2 mb-6 sm:mb-7 md:mb-8 select-none"
            ariaLabel="Editorial Motto: Be the love you never received"
          />
        )}

        {showExtraaNav && <EditorialPageNav />}
      </main>

      {/* 7. Existing Footer */}
      <Footer />
    </div>
  );
}
