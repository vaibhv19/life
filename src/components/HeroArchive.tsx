'use client';

import React from 'react';
import Link from 'next/link';

interface HeroArchiveProps {
  featuredItem?: unknown;
  onSelectFeatured?: (item: unknown) => void;
  onExploreSeries?: () => void;
  totalEntriesCount?: number;
}

export const HeroArchive: React.FC<HeroArchiveProps> = () => {
  return (
    <section className="relative w-full pt-12 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 select-none">
      <div className="content-container">
        {/* Restrained Introductory Heading Establishing Personal Identity */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-sm sm:text-base md:text-lg font-medium text-[#1546D9]/80 tracking-tight">
            Who is @vaibhv19 apart from code?
          </h1>
        </div>

        {/* Primary Visual Quote — Exact five-line italic composition */}
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-medium italic tracking-tight text-[#1546D9] leading-tight sm:leading-snug mb-10 sm:mb-12">
          <span className="block">“I THINK IF I DO <span className="text-[#F9B318]">NOTHING</span></span>
          <span className="block">ON THIS PLANET THAT MAKES</span>
          <span className="block">PEOPLE FEEL A LITTLE <span className="text-[#F9B318]">MORE</span></span>
          <span className="block"><span className="text-[#F9B318]">LOVED</span>, THEN I HAVE SERVED</span>
          <span className="block"><span className="text-[#F9B318]">MY PURPOSE</span> WELL.”</span>
        </blockquote>

        {/* Between Us Organic Button */}
        <div>
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

        {/* Section separator aligned with content width */}
        <div className="content-divider mt-12 sm:mt-16 lg:mt-20" />
      </div>
    </section>
  );
};
