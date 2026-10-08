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
    <section className="relative w-full py-12 sm:py-20 border-b border-[#AFAEA2]/20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-[#AFAEA2]/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D21319] uppercase tracking-wider mb-2 font-bold">
              <span>02</span>
              <span className="text-[#AFAEA2]/40">/</span>
              <span>COLLECTION & THEMATIC LENSES</span>
            </div>
            <h2 className="font-editorial-display text-3xl sm:text-4xl text-[#E8E7E0] font-normal">
              Series & Curatorial Threads
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#AFAEA2]">
            {activeSeriesId && (
              <button
                onClick={onClearFilter}
                className="text-[#D21319] hover:text-[#E8E7E0] underline underline-offset-4 cursor-pointer font-bold"
              >
                CLEAR FILTER / VIEW ALL LENSES
              </button>
            )}
            <span className="text-[#E8E7E0]">5 SERIES IN ARCHIVE</span>
          </div>
        </div>

        {/* Quiet Editorial Series List */}
        <div className="divide-y divide-[#AFAEA2]/20 pt-6">
          {seriesList.map((series) => {
            const isActive = activeSeriesId === series.id;

            return (
              <div
                key={series.id}
                onClick={() => onSelectSeries(series.id)}
                className={`group py-8 sm:py-10 transition-all cursor-pointer rounded-xs ${
                  isActive
                    ? 'bg-[#AFAEA2] text-[#1B1E4A] px-6 -mx-6 shadow-xl border-l-4 border-l-[#D21319]'
                    : 'hover:bg-[#AFAEA2]/10 hover:px-4 hover:-mx-4'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline">
                  {/* Left: Index & Dates */}
                  <div className="lg:col-span-3 flex items-baseline gap-3 text-xs font-mono">
                    <span className="text-[#D21319] font-bold text-base">
                      {series.indexNumber}
                    </span>
                    <span className={isActive ? 'text-[#1B1E4A]/40' : 'text-[#AFAEA2]/40'}>/</span>
                    <span className={isActive ? 'text-[#1B1E4A]/80 font-medium' : 'text-[#AFAEA2]'}>
                      {series.dateRange}
                    </span>
                  </div>

                  {/* Middle: Title & Description */}
                  <div className="lg:col-span-7 space-y-2">
                    <h3 className={`font-editorial-display text-xl sm:text-2xl transition-colors ${
                      isActive ? 'text-[#1B1E4A] font-semibold' : 'text-[#E8E7E0] group-hover:text-[#D21319]'
                    }`}>
                      {series.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-sans leading-relaxed max-w-2xl ${
                      isActive ? 'text-[#1B1E4A]/90 font-medium' : 'text-[#AFAEA2]'
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
                              ? 'bg-[#1B1E4A] text-[#AFAEA2] border-[#1B1E4A]'
                              : 'bg-[#AFAEA2]/15 text-[#E8E7E0] border-[#AFAEA2]/25'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Item Count & Trigger */}
                  <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-3 text-xs font-mono">
                    <span className={isActive ? 'text-[#1B1E4A] font-semibold' : 'text-[#AFAEA2]'}>
                      {series.itemCount} FRAMES
                    </span>
                    <span className="text-[#D21319] group-hover:translate-x-1 transition-transform font-bold">
                      {isActive ? 'ACTIVE ✓' : 'FILTER →'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
