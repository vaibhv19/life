'use client';

import React from 'react';
import { ArchiveItem } from '../types';

interface VisualArchiveGridProps {
  items: ArchiveItem[];
  onSelectItem: (item: ArchiveItem) => void;
  activeCollectionTitle?: string | null;
}

export const VisualArchiveGrid: React.FC<VisualArchiveGridProps> = ({
  items,
  onSelectItem,
  activeCollectionTitle,
}) => {
  return (
    <section className="relative w-full py-12 sm:py-20 border-b border-[#AFAEA2]/20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-[#AFAEA2]/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D21319] uppercase tracking-wider mb-2 font-bold">
              <span>01</span>
              <span className="text-[#AFAEA2]/40">/</span>
              <span>VISUAL ARCHIVE</span>
            </div>
            <h2 className="font-editorial-display text-3xl sm:text-4xl text-[#E8E7E0] font-normal">
              Photographs, Field Notes & Moments
            </h2>
          </div>

          <div className="text-xs font-mono text-[#AFAEA2]">
            {activeCollectionTitle ? (
              <span className="text-[#D21319] font-bold">FILTERED BY: {activeCollectionTitle}</span>
            ) : (
              <span className="text-[#E8E7E0]">SHOWING {items.length} CURATED ARTIFACTS</span>
            )}
          </div>
        </div>

        {/* Multi-scale Asymmetrical Masonry Grid with Warm Stone Grey Physical Surfaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 pt-10 sm:pt-12 items-start">
          {items.map((item, idx) => {
            // Determine asymmetric grid span based on item scale
            let colSpan = 'lg:col-span-4';
            if (item.scale === 'panoramic') {
              colSpan = 'lg:col-span-8';
            } else if (item.scale === 'prominent') {
              colSpan = 'lg:col-span-6';
            } else if (item.scale === 'tall') {
              colSpan = 'lg:col-span-4';
            } else if (item.scale === 'intimate') {
              colSpan = 'lg:col-span-3';
            }

            return (
              <article
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`group relative cursor-pointer border-2 border-[#AFAEA2] hover:border-[#D21319] bg-[#AFAEA2] p-4 sm:p-5 rounded-xs transition-all duration-300 shadow-lg hover:shadow-2xl ${colSpan}`}
              >
                {/* Visual Media Canvas Inset Plate */}
                <div
                  className={`relative w-full ${item.aspectRatio} bg-[#1B1E4A] border border-[#1B1E4A]/30 overflow-hidden flex flex-col justify-between p-4 sm:p-5 shadow-inner`}
                >
                  {/* Crimson Corner Registration Crosshairs */}
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-[#D21319]" />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-[#D21319]" />
                  <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-[#D21319]" />
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-[#D21319]" />

                  {/* Top Bar inside Inset */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#AFAEA2]">
                    <span className="uppercase font-semibold text-[#D21319]">{item.medium} // {String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-[#AFAEA2]">{item.date}</span>
                  </div>

                  {/* Center Graphic / Typography Study */}
                  <div className="my-auto py-4 flex flex-col justify-center">
                    <div className="text-[11px] font-mono text-[#AFAEA2] mb-1 truncate">
                      {item.collectionTitle}
                    </div>
                    <h3 className="font-editorial-display text-lg sm:text-xl text-[#E8E7E0] group-hover:text-white transition-colors leading-snug">
                      {item.title}
                    </h3>
                    {item.location && (
                      <span className="text-[11px] font-mono text-[#AFAEA2]/70 mt-1">
                        {item.location}
                      </span>
                    )}
                  </div>

                  {/* Bottom Technical Bar */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#AFAEA2] pt-2 border-t border-[#AFAEA2]/15">
                    <span className="truncate max-w-[160px]">
                      {item.metadata?.camera || item.metadata?.author || 'Archived Entry'}
                    </span>
                    <span className="text-[#D21319] font-bold group-hover:underline">
                      VIEW ↗
                    </span>
                  </div>
                </div>

                {/* Narrative Caption on Warm Stone Surface */}
                <div className="mt-3.5 space-y-2 text-[#1B1E4A]">
                  <p className="text-xs sm:text-sm font-sans leading-relaxed line-clamp-2 font-medium">
                    {item.caption}
                  </p>

                  {/* Subtle Tags in Navy / Crimson text on Stone */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-[#1B1E4A] bg-[#1B1E4A]/10 px-1.5 py-0.5 rounded-xs border border-[#1B1E4A]/15 font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
