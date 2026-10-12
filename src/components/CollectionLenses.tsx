'use client';

import React from 'react';
import { CollectionSeries } from '../types';

interface CollectionLensesProps {
  seriesList: CollectionSeries[];
  activeSeriesId: string | null;
  onSelectSeries: (seriesId: string) => void;
  onClearFilter: () => void;
}

export const CollectionLenses: React.FC<CollectionLensesProps> = ({
  seriesList,
  activeSeriesId,
  onSelectSeries,
  onClearFilter,
}) => {
  return (
    <section className="relative w-full pt-12 sm:pt-20 pb-4 sm:pb-6">
      <div className="content-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-[#EF8557]/25">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#EF8557] uppercase tracking-wider mb-2 font-bold">
              <span>02</span>
              <span className="text-[#226192]/40">/</span>
              <span>COLLECTION & THEMATIC LENSES</span>
            </div>
            <h2 className="font-editorial-display text-3xl sm:text-4xl text-[#226192] font-normal">
              Series & Curatorial Threads
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#226192]/80">
            {activeSeriesId && (
              <button
                onClick={onClearFilter}
                className="text-[#EF8557] hover:text-[#2C7BB8] underline underline-offset-4 cursor-pointer font-bold"
              >
                CLEAR FILTER / VIEW ALL LENSES
              </button>
            )}
            <span className="text-[#226192]">5 SERIES IN ARCHIVE</span>
          </div>
        </div>

        {/* Quiet Editorial Series List */}
        <div className="divide-y divide-[#226192]/20 pt-6">
          {seriesList.map((series) => {
            const isActive = activeSeriesId === series.id;

            return (
              <div
                key={series.id}
                onClick={() => onSelectSeries(series.id)}
                className={`group py-8 sm:py-10 transition-all cursor-pointer rounded-xs ${
                  isActive
                    ? 'bg-[#226192] text-[#EAE6DE] px-6 -mx-6 shadow-xl border-l-4 border-l-[#EF8557]'
                    : 'hover:bg-[#226192]/10 hover:px-4 hover:-mx-4'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline">
                  {/* Left: Index & Dates */}
                  <div className="lg:col-span-3 flex items-baseline gap-3 text-xs font-mono">
                    <span className="text-[#EF8557] font-bold text-base">
                      {series.indexNumber}
                    </span>
                    <span className={isActive ? 'text-[#EAE6DE]/40' : 'text-[#226192]/40'}>/</span>
                    <span className={isActive ? 'text-[#EAE6DE]/80 font-medium' : 'text-[#226192]/80'}>
                      {series.dateRange}
                    </span>
                  </div>

                  {/* Middle: Title & Description */}
                  <div className="lg:col-span-7 space-y-2">
                    <h3 className={`font-editorial-display text-xl sm:text-2xl transition-colors ${
                      isActive ? 'text-[#EAE6DE] font-semibold' : 'text-[#226192] group-hover:text-[#EF8557]'
                    }`}>
                      {series.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-sans leading-relaxed max-w-2xl ${
                      isActive ? 'text-[#EAE6DE]/90 font-medium' : 'text-[#226192]/80'
                    }`}>
                      {series.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {series.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-xs border ${
                            isActive
                              ? 'bg-[#EAE6DE] text-[#226192] border-[#EAE6DE]'
                              : 'bg-[#226192]/15 text-[#226192] border-[#226192]/25'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Item Count & Trigger */}
                  <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-3 text-xs font-mono">
                    <span className={isActive ? 'text-[#EAE6DE] font-semibold' : 'text-[#226192]/80'}>
                      {series.itemCount} FRAMES
                    </span>
                    <span className="text-[#EF8557] group-hover:translate-x-1 transition-transform font-bold">
                      {isActive ? 'ACTIVE ✓' : 'FILTER →'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section separator aligned with content width */}
        <div className="content-divider mt-12 sm:mt-16" />
      </div>
    </section>
  );
};
