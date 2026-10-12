'use client';

import React from 'react';

interface HeroArchiveProps {
  featuredItem?: unknown;
  onSelectFeatured?: (item: unknown) => void;
  onExploreSeries?: () => void;
  totalEntriesCount?: number;
}

export const HeroArchive: React.FC<HeroArchiveProps> = () => {
  return (
    <section className="relative w-full pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 select-none">
      <div className="content-container">
        {/* Balanced Two-Column Composition: Portrait & Quote/CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Column 1: Supporting Portrait Image */}
          <div className="md:col-span-4 w-full">
            <div className="relative aspect-[3/4] w-full max-w-[220px] sm:max-w-[250px] md:max-w-none mx-auto overflow-hidden rounded-md border border-[#226192]/25 shadow-xs transform -rotate-[3.5deg] hover:-rotate-[1deg] transition-transform duration-500 ease-out origin-center">
              <img
                src="/archive/Warm Acoustic Guitar Portrait.png"
                alt="Vaibhav Gupta"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>

          {/* Column 2: Visual Quote */}
          <div className="md:col-span-8 flex flex-col items-center md:items-start text-center md:text-left pt-3 md:pt-12">
            <blockquote className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium italic tracking-tight text-[#226192] leading-tight sm:leading-snug">
              I think if I do nothing on this planet than make people feel a little more loved, then I have served my purpose well.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};
