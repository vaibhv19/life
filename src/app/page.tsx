import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { HeroArchive } from '@/components/HeroArchive';
import { EditorialMarquee } from '@/components/EditorialMarquee';
import { ArtSection } from '@/components/ArtSection';
import { FitnessSection } from '@/components/FitnessSection';
import { WhatIsThisPage } from '@/components/WhatIsThisPage';
import { WhyIMadeThisPage } from '@/components/WhyIMadeThisPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Life — vaibhv19.dev',
  description: 'A personal archive of memories, moments, and thoughts.',
};

export const dynamic = 'force-dynamic';

export default function LifePage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#226192] antialiased">
      {/* 01. Global Editorial Navigation Bar */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero composition: portrait & quote */}
        <HeroArchive />

        {/* Marquee separating Hero and Art section */}
        <EditorialMarquee className="w-full mt-1 sm:mt-2 mb-4 sm:mb-5 md:mb-6 select-none" />

        {/* Dedicated Art Section (3 image slots) */}
        <ArtSection />

        {/* Marquee separating Art and Fitness section */}
        <EditorialMarquee className="w-full mt-1 sm:mt-2 mb-4 sm:mb-5 md:mb-6 select-none" />

        {/* Dedicated Fitness Section (3 image slots) */}
        <FitnessSection />

        {/* Editorial Narrative Sections */}
        <WhatIsThisPage />

        <WhyIMadeThisPage />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
