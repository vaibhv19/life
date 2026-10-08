'use client';

import React from 'react';
import { ArchiveItem } from '../types';

interface HeroArchiveProps {
  featuredItem?: ArchiveItem;
  onSelectFeatured: (item: ArchiveItem) => void;
  onExploreSeries: () => void;
  totalEntriesCount: number;
}

export const HeroArchive: React.FC<HeroArchiveProps> = ({
  featuredItem,
  onSelectFeatured,
  onExploreSeries,
  totalEntriesCount,
}) => {
  return (
    <section className="relative w-full border-b border-[#AFAEA2]/20 pt-8 sm:pt-14 pb-12 sm:pb-20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Editorial Eyebrow & Coordinates */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#AFAEA2] pb-8 sm:pb-12 border-b border-[#AFAEA2]/15">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D21319]" />
            <span className="text-[#D21319] font-bold tracking-wider">AUTOBIOGRAPHICAL REPOSITORY</span>
            <span className="text-[#AFAEA2]/30">/</span>
            <span className="text-[#E8E7E0]">2025 EDITION</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#AFAEA2]">
            <span>NEW DELHI · 28°38'N 77°13'E</span>
            <span className="text-[#AFAEA2]/30">·</span>
            <span className="text-[#E8E7E0] font-medium">{totalEntriesCount} ARCHIVAL ENTRIES</span>
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-8 sm:pt-12 items-start">
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <h1 className="font-editorial-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.08] tracking-tight text-[#E8E7E0]">
              A quiet repository of{' '}
              <span className="font-editorial-italic font-normal text-[#D21319]">
                analog moments
              </span>
              , notebooks, & observations apart from code.
            </h1>

            <div className="space-y-4 max-w-xl text-sm sm:text-base text-[#AFAEA2] font-sans leading-relaxed">
              <p>
                Life is an uncurated personal scrapbook. It holds 35mm film negatives, mountain ridgelines, fragments of marginalia from books, and memories that exist outside the screen.
              </p>
              <p className="text-xs sm:text-sm text-[#8E8D82] font-mono leading-normal border-l-2 border-[#D21319] pl-3 py-0.5">
                "I think if I do nothing on this planet that makes people feel a little more loved, then I have served my purpose well." — Vaibhav Gupta
              </p>
            </div>

            {/* Quiet navigational indices */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
              <button
                onClick={onExploreSeries}
                className="group flex items-center gap-2 text-[#E8E7E0] hover:text-[#D21319] transition-colors cursor-pointer font-medium"
              >
                <span>[ VIEW 5 SERIES LENSES ]</span>
                <span className="text-[#D21319] group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <span className="text-[#AFAEA2]/30">·</span>
              <span className="text-[#8E8D82]">UPDATED MONTHLY</span>
            </div>
          </div>

          {/* Right Column: Featured Focus Photographic Frame (Warm Stone Grey Surface) */}
          {featuredItem && (
            <div className="lg:col-span-5 flex flex-col justify-start">
              <div
                onClick={() => onSelectFeatured(featuredItem)}
                className="group relative cursor-pointer border-2 border-[#AFAEA2] bg-[#AFAEA2] p-4 sm:p-5 rounded-xs shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-[#D21319]"
              >
                {/* Frame Header Meta on Stone Surface */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[#1B1E4A] mb-3 pb-2 border-b border-[#1B1E4A]/15 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D21319] font-bold">FEATURED SPECIMEN</span>
                    <span className="text-[#1B1E4A]/30">/</span>
                    <span className="text-[#1B1E4A] truncate max-w-[170px]">{featuredItem.collectionTitle}</span>
                  </div>
                  <span>{featuredItem.date}</span>
                </div>

                {/* Inner Plate Canvas Container */}
                <div className="relative w-full aspect-[4/5] bg-[#1B1E4A] border border-[#1B1E4A]/40 overflow-hidden flex flex-col justify-between p-4 sm:p-5 shadow-inner">
                  {/* Subtle registration corner crosshairs in Crimson */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#D21319]" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#D21319]" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#D21319]" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#D21319]" />

                  {/* Frame Top Meta */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#AFAEA2]">
                    <span>{featuredItem.metadata?.filmStock || '35mm Negative'}</span>
                    <span>{featuredItem.coordinates || '28°N 77°E'}</span>
                  </div>

                  {/* Central Graphic Composition */}
                  <div className="my-auto flex flex-col items-center justify-center text-center px-3">
                    <div className="w-12 h-12 rounded-full border-2 border-[#D21319] flex items-center justify-center text-[#D21319] mb-3 group-hover:scale-105 transition-transform bg-[#1B1E4A]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <span className="font-editorial-display text-lg sm:text-xl text-[#E8E7E0] leading-snug">
                      "{featuredItem.title}"
                    </span>
                    <span className="text-[11px] font-mono text-[#AFAEA2] mt-1.5">
                      {featuredItem.location}
                    </span>
                  </div>

                  {/* Frame Bottom Meta */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#AFAEA2] pt-2 border-t border-[#AFAEA2]/20">
                    <span>{featuredItem.metadata?.camera || 'Leica M6'}</span>
                    <span className="text-[#D21319] group-hover:underline font-bold">OPEN SPECIMEN ↗</span>
                  </div>
                </div>

                {/* Caption beneath frame on Warm Stone */}
                <div className="mt-3.5 text-xs text-[#1B1E4A] font-sans leading-relaxed font-normal">
                  {featuredItem.caption}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
