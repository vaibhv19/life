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
    <section className="relative w-full py-12 sm:py-20 border-b border-[#F8F4E7]/20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-[#F8F4E7]/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D7A781] uppercase tracking-wider mb-2 font-bold">
              <span>02</span>
              <span className="text-[#F8F4E7]/40">/</span>
              <span>COLLECTION & THEMATIC LENSES</span>
            </div>
            <h2 className="font-editorial-display text-3xl sm:text-4xl text-[#F8F4E7] font-normal">
              Series & Curatorial Threads
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#F8F4E7]/80">
            {activeSeriesId && (
              <button
                onClick={onClearFilter}
                className="text-[#D7A781] hover:text-[#FFFDF7] underline underline-offset-4 cursor-pointer font-bold"
              >
                CLEAR FILTER / VIEW ALL LENSES
              </button>
            )}
            <span className="text-[#F8F4E7]">5 SERIES IN ARCHIVE</span>
          </div>
        </div>

        {/* Quiet Editorial Series List */}
        <div className="divide-y divide-[#F8F4E7]/20 pt-6">
          {seriesList.map((series) => {
            const isActive = activeSeriesId === series.id;

            return (
              <div
                key={series.id}
                onClick={() => onSelectSeries(series.id)}
                className={`group py-8 sm:py-10 transition-all cursor-pointer rounded-xs ${
                  isActive
                    ? 'bg-[#F8F4E7] text-[#722F37] px-6 -mx-6 shadow-xl border-l-4 border-l-[#D7A781]'
                    : 'hover:bg-[#F8F4E7]/10 hover:px-4 hover:-mx-4'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline">
                  {/* Left: Index & Dates */}
                  <div className="lg:col-span-3 flex items-baseline gap-3 text-xs font-mono">
                    <span className="text-[#D7A781] font-bold text-base">
                      {series.indexNumber}
                    </span>
                    <span className={isActive ? 'text-[#722F37]/40' : 'text-[#F8F4E7]/40'}>/</span>
                    <span className={isActive ? 'text-[#722F37]/80 font-medium' : 'text-[#F8F4E7]/80'}>
                      {series.dateRange}
                    </span>
                  </div>

                  {/* Middle: Title & Description */}
                  <div className="lg:col-span-7 space-y-2">
                    <h3 className={`font-editorial-display text-xl sm:text-2xl transition-colors ${
                      isActive ? 'text-[#722F37] font-semibold' : 'text-[#F8F4E7] group-hover:text-[#D7A781]'
                    }`}>
                      {series.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-sans leading-relaxed max-w-2xl ${
                      isActive ? 'text-[#722F37]/90 font-medium' : 'text-[#F8F4E7]/80'
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
                              ? 'bg-[#722F37] text-[#F8F4E7] border-[#722F37]'
                              : 'bg-[#F8F4E7]/15 text-[#F8F4E7] border-[#F8F4E7]/25'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Item Count & Trigger */}
                  <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-3 text-xs font-mono">
                    <span className={isActive ? 'text-[#722F37] font-semibold' : 'text-[#F8F4E7]/80'}>
                      {series.itemCount} FRAMES
                    </span>
                    <span className="text-[#D7A781] group-hover:translate-x-1 transition-transform font-bold">
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
