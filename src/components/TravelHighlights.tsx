'use client';

import React, { useState } from 'react';
import { StoryViewer } from '@/components/StoryViewer';

export interface TravelHighlightItem {
  id: string;
  title: string;
  emoji: string;
  coverSrc: string;
}

export const TRAVEL_HIGHLIGHTS_DATA: TravelHighlightItem[] = [
  {
    id: 'travel',
    title: 'Travel',
    emoji: '✈️',
    coverSrc: '/archive/Screenshot_20261012-170936_Instagram~2.jpg',
  },
];

const THUMBNAIL_MAP: Record<string, string> = {
  travel: '/archive/Screenshot_20261012-170936_Instagram~2.jpg',
};

export const TravelHighlights: React.FC = () => {
  const [activeTripId, setActiveTripId] = useState<string | null>(null);

  return (
    <section
      id="travel-highlights"
      aria-label="Travel Highlights"
      className="w-full pt-4 sm:pt-6 pb-4 sm:pb-6 select-none"
    >
      <div className="content-container">
        {/* Section Heading Tag */}
        <div className="mb-3 sm:mb-4">
          <h2
            className="inline-block bg-[#EF8557] text-[#226192] text-xs sm:text-sm font-bold tracking-wider uppercase px-4 sm:px-5 py-1.5 sm:py-2 shadow-sm select-none leading-snug"
            style={{ borderRadius: '18px 5px 22px 7px / 8px 20px 7px 16px' }}
          >
            Travel Highlights
          </h2>
        </div>

        {/* Circular Highlight Covers Row */}
        <div className="flex items-start gap-4 sm:gap-6 flex-wrap">
          {TRAVEL_HIGHLIGHTS_DATA.map((trip) => {
            const isSelected = activeTripId === trip.id;

            return (
              <button
                key={trip.id}
                type="button"
                onClick={() => setActiveTripId(trip.id)}
                aria-haspopup="dialog"
                aria-label={`Open ${trip.title} stories`}
                className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none"
                title={`Open ${trip.title} stories`}
              >
                {/* Outer Ring with Hover Reaction */}
                <div
                  className={`p-[2px] sm:p-[3px] rounded-full border transition-all duration-300 ease-out ${
                    isSelected
                      ? 'border-[#EF8557] ring-2 ring-[#EF8557]/40 scale-105'
                      : 'border-[#226192]/30 group-hover:border-[#EF8557] group-hover:scale-105'
                  }`}
                >
                  {/* Ring Gap */}
                  <div className="p-[1.5px] sm:p-[2px] rounded-full bg-[#EAE6DE]">
                    {/* Circular Image Container */}
                    <div className="w-10 h-10 min-[360px]:w-[42px] min-[360px]:h-[42px] min-[390px]:w-12 min-[390px]:h-12 sm:w-16 sm:h-16 md:w-[74px] md:h-[74px] lg:w-[78px] lg:h-[78px] rounded-full overflow-hidden bg-[#226192]/10 relative">
                      <img
                        src={trip.coverSrc}
                        alt={trip.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Emoji Label */}
                <span
                  className={`text-xs min-[360px]:text-sm sm:text-base md:text-lg transition-transform duration-200 mt-1 sm:mt-1.5 md:mt-2 leading-none flex items-center justify-center select-none ${
                    isSelected ? 'scale-110 drop-shadow-xs' : 'group-hover:scale-110'
                  }`}
                  aria-hidden="true"
                >
                  {trip.emoji}
                </span>
              </button>
            );
          })}
        </div>

        {/* Story Viewer Modal */}
        {activeTripId && (
          <StoryViewer
            categoryId={activeTripId}
            onClose={() => setActiveTripId(null)}
            thumbnailMap={THUMBNAIL_MAP}
          />
        )}
      </div>
    </section>
  );
};
