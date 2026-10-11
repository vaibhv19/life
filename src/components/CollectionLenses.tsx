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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-[#1546D9]/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#F9B318] uppercase tracking-wider mb-2 font-bold">
              <span>02</span>
              <span className="text-[#1546D9]/40">/</span>
              <span>COLLECTION & THEMATIC LENSES</span>
            </div>
            <h2 className="font-editorial-display text-3xl sm:text-4xl text-[#1546D9] font-normal">
              Series & Curatorial Threads
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#1546D9]/80">
            {activeSeriesId && (
              <button
                onClick={onClearFilter}
                className="text-[#F9B318] hover:text-[#2E5DE8] underline underline-offset-4 cursor-pointer font-bold"
              >
                CLEAR FILTER / VIEW ALL LENSES
              </button>
            )}
            <span className="text-[#1546D9]">5 SERIES IN ARCHIVE</span>
          </div>
        </div>

        {/* Quiet Editorial Series List */}
        <div className="divide-y divide-[#1546D9]/20 pt-6">
          {seriesList.map((series) => {
            const isActive = activeSeriesId === series.id;

            return (
              <div
                key={series.id}
                onClick={() => onSelectSeries(series.id)}
                className={`group py-8 sm:py-10 transition-all cursor-pointer rounded-xs ${
                  isActive
                    ? 'bg-[#1546D9] text-[#EDECE6] px-6 -mx-6 shadow-xl border-l-4 border-l-[#F9B318]'
                    : 'hover:bg-[#1546D9]/10 hover:px-4 hover:-mx-4'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline">
                  {/* Left: Index & Dates */}
                  <div className="lg:col-span-3 flex items-baseline gap-3 text-xs font-mono">
                    <span className="text-[#F9B318] font-bold text-base">
                      {series.indexNumber}
                    </span>
                    <span className={isActive ? 'text-[#EDECE6]/40' : 'text-[#1546D9]/40'}>/</span>
                    <span className={isActive ? 'text-[#EDECE6]/80 font-medium' : 'text-[#1546D9]/80'}>
                      {series.dateRange}
                    </span>
                  </div>

                  {/* Middle: Title & Description */}
                  <div className="lg:col-span-7 space-y-2">
                    <h3 className={`font-editorial-display text-xl sm:text-2xl transition-colors ${
                      isActive ? 'text-[#EDECE6] font-semibold' : 'text-[#1546D9] group-hover:text-[#F9B318]'
                    }`}>
                      {series.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-sans leading-relaxed max-w-2xl ${
                      isActive ? 'text-[#EDECE6]/90 font-medium' : 'text-[#1546D9]/80'
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
                              ? 'bg-[#EDECE6] text-[#1546D9] border-[#EDECE6]'
                              : 'bg-[#1546D9]/15 text-[#1546D9] border-[#1546D9]/25'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Item Count & Trigger */}
                  <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-3 text-xs font-mono">
                    <span className={isActive ? 'text-[#EDECE6] font-semibold' : 'text-[#1546D9]/80'}>
                      {series.itemCount} FRAMES
                    </span>
                    <span className="text-[#F9B318] group-hover:translate-x-1 transition-transform font-bold">
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
