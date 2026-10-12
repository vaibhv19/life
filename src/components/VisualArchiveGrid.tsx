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
    <section className="relative w-full pt-12 sm:pt-20 pb-4 sm:pb-6">
      <div className="content-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-[#226192]/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#EF8557] uppercase tracking-wider mb-2 font-bold">
              <span>01</span>
              <span className="text-[#226192]/40">/</span>
              <span>VISUAL ARCHIVE</span>
            </div>
            <h2 className="font-editorial-display text-3xl sm:text-4xl text-[#226192] font-normal">
              Photographs, Field Notes & Moments
            </h2>
          </div>

          <div className="text-xs font-mono text-[#226192]/80">
            {activeCollectionTitle ? (
              <span className="text-[#EF8557] font-bold">FILTERED BY: {activeCollectionTitle}</span>
            ) : (
              <span className="text-[#226192]">SHOWING {items.length} CURATED ARTIFACTS</span>
            )}
          </div>
        </div>

        {/* Single-Column Editorial Visual Archive Stream */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 sm:pt-12 items-start">
          {items.map((item, idx) => {
            const isWide = item.scale === 'panoramic' || item.scale === 'prominent';
            const colSpan = isWide ? 'sm:col-span-2' : 'sm:col-span-1';

            return (
              <article
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`group relative cursor-pointer border-2 border-[#226192] hover:border-[#EF8557] bg-[#226192] p-4 sm:p-5 rounded-xs transition-all duration-300 shadow-lg hover:shadow-2xl ${colSpan}`}
              >
                {/* Visual Media Canvas Inset Plate */}
                <div
                  className={`relative w-full ${item.aspectRatio} bg-[#EAE6DE] border border-[#EAE6DE]/30 overflow-hidden flex flex-col justify-between p-4 sm:p-5 shadow-inner`}
                >
                  {/* Dusty Pink Corner Registration Crosshairs */}
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-[#EF8557]" />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-[#EF8557]" />
                  <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-[#EF8557]" />
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-[#EF8557]" />

                  {/* Top Bar inside Inset */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#226192]/80">
                    <span className="uppercase font-semibold text-[#EF8557]">{item.medium} {'//'} {String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-[#226192]/70">{item.date}</span>
                  </div>

                  {/* Center Graphic / Typography Study */}
                  <div className="my-auto py-4 flex flex-col justify-center">
                    <div className="text-[11px] font-mono text-[#226192]/70 mb-1 truncate">
                      {item.collectionTitle}
                    </div>
                    <h3 className="font-editorial-display text-lg sm:text-xl text-[#226192] group-hover:text-white transition-colors leading-snug">
                      {item.title}
                    </h3>
                    {item.location && (
                      <span className="text-[11px] font-mono text-[#226192]/60 mt-1">
                        {item.location}
                      </span>
                    )}
                  </div>

                  {/* Bottom Technical Bar */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#226192]/70 pt-2 border-t border-[#226192]/15">
                    <span className="truncate max-w-[160px]">
                      {item.metadata?.camera || item.metadata?.author || 'Archived Entry'}
                    </span>
                    <span className="text-[#EF8557] font-bold group-hover:underline">
                      VIEW ↗
                    </span>
                  </div>
                </div>

                {/* Narrative Caption on Cream Surface */}
                <div className="mt-3.5 space-y-2 text-[#EAE6DE]">
                  <p className="text-xs sm:text-sm font-sans leading-relaxed line-clamp-2 font-medium">
                    {item.caption}
                  </p>

                  {/* Subtle Tags in Burgundy text on Cream */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-[#EAE6DE] bg-[#EAE6DE]/10 px-1.5 py-0.5 rounded-xs border border-[#EAE6DE]/15 font-semibold"
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

        {/* Section separator aligned with content width */}
        <div className="content-divider mt-12 sm:mt-16" />
      </div>
    </section>
  );
};
