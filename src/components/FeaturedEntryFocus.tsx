'use client';

import React from 'react';
import { ArchiveItem } from '../types';

interface FeaturedEntryFocusProps {
  item: ArchiveItem;
  onOpenLightbox: (item: ArchiveItem) => void;
  onClose?: () => void;
}

export const FeaturedEntryFocus: React.FC<FeaturedEntryFocusProps> = ({
  item,
  onOpenLightbox,
  onClose,
}) => {
  return (
    <section className="relative w-full py-16 sm:py-24 border-b border-[#AFAEA2]/20 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Focal Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#AFAEA2]/20 text-xs font-mono text-[#AFAEA2]">
          <div className="flex items-center gap-3">
            <span className="text-[#D21319] font-bold text-sm">04</span>
            <span className="text-[#AFAEA2]/40">/</span>
            <span className="text-[#E8E7E0] font-medium">SINGLE ENTRY FOCUS & SPECIMEN</span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-[#D21319] hover:text-[#E8E7E0] underline underline-offset-4 cursor-pointer font-bold"
            >
              CLOSE FOCUS [ESC]
            </button>
          )}
        </div>

        {/* Large Focal Display Layout with Generous Negative Space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-12 items-center">
          {/* Left: Large Framed Photographic Subject on Physical Warm Stone Surface */}
          <div className="lg:col-span-7">
            <div
              onClick={() => onOpenLightbox(item)}
              className="group relative cursor-pointer border-2 border-[#AFAEA2] hover:border-[#D21319] bg-[#AFAEA2] p-5 sm:p-7 shadow-2xl rounded-xs transition-all duration-300"
            >
              <div className={`relative w-full ${item.aspectRatio || 'aspect-[4/3]'} max-h-[560px] bg-[#1B1E4A] border border-[#1B1E4A]/40 overflow-hidden flex flex-col justify-between p-6 sm:p-8 shadow-inner`}>
                {/* Visual crop corner marks in Crimson Red */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D21319]" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D21319]" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D21319]" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D21319]" />

                {/* Top Overlay Meta */}
                <div className="flex items-center justify-between text-xs font-mono text-[#AFAEA2]">
                  <span className="text-[#D21319] font-bold">{item.collectionTitle.toUpperCase()}</span>
                  <span>{item.date}</span>
                </div>

                {/* Inner Graphic Centered Focus */}
                <div className="my-auto text-center py-8">
                  <span className="text-xs font-mono text-[#D21319] tracking-widest uppercase block mb-2 font-bold">
                    {item.medium} // ARCHIVE SPECIMEN
                  </span>
                  <h3 className="font-editorial-display text-2xl sm:text-3xl lg:text-4xl text-[#E8E7E0] leading-snug max-w-lg mx-auto">
                    "{item.title}"
                  </h3>
                  {item.location && (
                    <span className="text-xs font-mono text-[#AFAEA2] mt-2 block">
                      {item.location}
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Meta */}
                <div className="flex items-center justify-between text-xs font-mono text-[#AFAEA2] pt-3 border-t border-[#AFAEA2]/15">
                  <span>{item.metadata?.filmStock || item.metadata?.camera || '35mm Film'}</span>
                  <span className="text-[#D21319] group-hover:underline font-bold">EXPAND FULL VIEW ↗</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Rich Secondary Typographic Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D21319] tracking-wider uppercase font-bold">
                ENTRY RECORD #{item.id}
              </span>
              <h2 className="font-editorial-display text-3xl sm:text-4xl text-[#E8E7E0]">
                {item.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#AFAEA2] font-sans leading-relaxed">
              {item.caption}
            </p>

            {item.notes && (
              <div className="bg-[#AFAEA2]/12 p-4 border border-[#AFAEA2]/25 rounded-xs space-y-1">
                <span className="text-[11px] font-mono text-[#D21319] uppercase block font-bold">
                  Field Notes & Observations:
                </span>
                <p className="text-xs sm:text-sm text-[#E8E7E0] font-mono italic">
                  {item.notes}
                </p>
              </div>
            )}

            {/* Technical Metadata Matrix on Warm Stone Surface Box */}
            <div className="pt-4 border-t border-[#AFAEA2]/20 grid grid-cols-2 gap-4 text-xs font-mono bg-[#AFAEA2]/8 p-4 rounded-xs border border-[#AFAEA2]/15">
              <div>
                <span className="text-[#AFAEA2] block text-[10px]">SERIES:</span>
                <span className="text-[#E8E7E0] font-medium">{item.collectionTitle}</span>
              </div>
              <div>
                <span className="text-[#AFAEA2] block text-[10px]">COORDINATES:</span>
                <span className="text-[#E8E7E0] font-medium">{item.coordinates || '28°38\'N 77°13\'E'}</span>
              </div>
              {item.metadata?.camera && (
                <div>
                  <span className="text-[#AFAEA2] block text-[10px]">HARDWARE / MEDIUM:</span>
                  <span className="text-[#E8E7E0] font-medium">{item.metadata.camera}</span>
                </div>
              )}
              {item.metadata?.filmStock && (
                <div>
                  <span className="text-[#AFAEA2] block text-[10px]">EMULSION / STOCK:</span>
                  <span className="text-[#D21319] font-medium">{item.metadata.filmStock}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
