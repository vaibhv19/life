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
    <section className="relative w-full border-b border-[#F8F4E7]/20 py-16 sm:py-24 lg:py-32 select-none">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-20 items-center">
          {/* LEFT SIDE: Primary Visual Quote */}
          <div className="lg:col-span-8">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-medium italic tracking-tight text-[#F8F4E7] leading-tight sm:leading-snug">
              <span className="block">“I THINK IF I DO <span className="text-[#D7A781]">NOTHING</span></span>
              <span className="block">ON THIS PLANET THAT MAKES</span>
              <span className="block">PEOPLE FEEL A LITTLE <span className="text-[#D7A781]">MORE</span></span>
              <span className="block"><span className="text-[#D7A781]">LOVED</span>, THEN I HAVE SERVED</span>
              <span className="block"><span className="text-[#D7A781]">MY PURPOSE</span> WELL.”</span>
            </blockquote>
          </div>

          {/* RIGHT SIDE: Between Us Organic Button */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end pt-4 lg:pt-0">
            <Link
              href="/between-us"
              className="cursor-pointer focus:outline-none bg-[#F8F4E7] text-[#722F37] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold tracking-tight transition-all duration-200 ease-out hover:bg-[#FFFDF7] hover:scale-[1.02] active:scale-[0.98] shadow-sm select-none text-left max-w-sm inline-block leading-snug"
              style={{
                borderRadius: '18px 5px 22px 7px / 8px 20px 7px 16px',
              }}
              title="Open Between Us private space"
            >
              I might have something specially for you
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
