'use client';

import React from 'react';
import { ArchiveItem } from '../types';
import { LikeButton } from './LikeButton';

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
    <section className="relative w-full pt-12 sm:pt-20 pb-4 sm:pb-6 bg-transparent">
      <div className="content-container">
        {/* Top Focal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1546D9]/20 text-xs font-mono text-[#1546D9]">
          <div className="flex items-center gap-3">
            <span className="text-[#F9B318] font-bold text-sm">04</span>
            <span className="text-[#1546D9]/40">/</span>
            <span className="text-[#1546D9] font-medium">SINGLE ENTRY FOCUS & SPECIMEN</span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-[#F9B318] hover:text-[#2E5DE8] underline underline-offset-4 cursor-pointer font-bold"
            >
              CLOSE FOCUS [ESC]
            </button>
          )}
        </div>

        {/* Large Focal Display Single-Column Flow */}
        <div className="space-y-8 pt-8">
          {/* Framed Photographic Subject on Physical Surface */}
          <div>
            <div
              onClick={() => onOpenLightbox(item)}
              className="group relative cursor-pointer border-2 border-[#1546D9] hover:border-[#F9B318] bg-[#1546D9] p-5 sm:p-7 shadow-2xl rounded-xs transition-all duration-300"
            >
              <div className={`relative w-full ${item.aspectRatio || 'aspect-[4/3]'} max-h-[560px] bg-[#EDECE6] border border-[#EDECE6]/40 overflow-hidden flex flex-col justify-between p-6 sm:p-8 shadow-inner`}>
                {/* Visual crop corner marks in Dusty Pink */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#F9B318]" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#F9B318]" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#F9B318]" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#F9B318]" />

                {/* Top Overlay Meta */}
                <div className="flex items-center justify-between text-xs font-mono text-[#1546D9]/80">
                  <span className="text-[#F9B318] font-bold">{item.collectionTitle.toUpperCase()}</span>
                  <span>{item.date}</span>
                </div>

                {/* Inner Graphic Centered Focus */}
                <div className="my-auto text-center py-8">
                  <span className="text-xs font-mono text-[#F9B318] tracking-widest uppercase block mb-2 font-bold">
                    {item.medium} {'//'} ARCHIVE SPECIMEN
                  </span>
                  <h3 className="font-editorial-display text-2xl sm:text-3xl lg:text-4xl text-[#1546D9] leading-snug max-w-lg mx-auto">
                    &quot;{item.title}&quot;
                  </h3>
                  {item.location && (
                    <span className="text-xs font-mono text-[#1546D9]/70 mt-2 block">
                      {item.location}
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Meta */}
                <div className="flex items-center justify-between text-xs font-mono text-[#1546D9]/80 pt-3 border-t border-[#1546D9]/15">
                  <span>{item.metadata?.filmStock || item.metadata?.camera || '35mm Film'}</span>
                  <span className="text-[#F9B318] group-hover:underline font-bold">EXPAND FULL VIEW ↗</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Typographic Narrative & Like Button */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#F9B318] tracking-wider uppercase font-bold">
                ENTRY RECORD #{item.id}
              </span>
              <h2 className="font-editorial-display text-3xl sm:text-4xl text-[#1546D9]">
                {item.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#1546D9]/90 font-sans leading-relaxed">
              {item.caption}
            </p>

            {item.notes && (
              <div className="bg-[#1546D9]/12 p-4 border border-[#1546D9]/25 rounded-xs space-y-1">
                <span className="text-[11px] font-mono text-[#F9B318] uppercase block font-bold">
                  Field Notes & Observations:
                </span>
                <p className="text-xs sm:text-sm text-[#1546D9] font-mono italic">
                  {item.notes}
                </p>
              </div>
            )}

            {/* Technical Metadata Matrix on Surface Box */}
            <div className="pt-4 border-t border-[#1546D9]/20 grid grid-cols-2 gap-4 text-xs font-mono bg-[#1546D9]/8 p-4 rounded-xs border border-[#1546D9]/15">
              <div>
                <span className="text-[#1546D9]/60 block text-[10px]">SERIES:</span>
                <span className="text-[#1546D9] font-medium">{item.collectionTitle}</span>
              </div>
              <div>
                <span className="text-[#1546D9]/60 block text-[10px]">COORDINATES:</span>
                <span className="text-[#1546D9] font-medium">{item.coordinates || '28°38\'N 77°13\'E'}</span>
              </div>
              {item.metadata?.camera && (
                <div>
                  <span className="text-[#1546D9]/60 block text-[10px]">HARDWARE / MEDIUM:</span>
                  <span className="text-[#1546D9] font-medium">{item.metadata.camera}</span>
                </div>
              )}
              {item.metadata?.filmStock && (
                <div>
                  <span className="text-[#1546D9]/60 block text-[10px]">EMULSION / STOCK:</span>
                  <span className="text-[#F9B318] font-medium">{item.metadata.filmStock}</span>
                </div>
              )}
            </div>

            {/* Like Component for Focal Entry */}
            <div className="pt-2">
              <LikeButton itemId={item.id} itemType="entry" />
            </div>
          </div>
        </div>

        {/* Section separator aligned with content width */}
        <div className="content-divider mt-12 sm:mt-16" />
      </div>
    </section>
  );
};
