'use client';

import React, { useState } from 'react';
import { StoryViewer } from '@/components/StoryViewer';
import { EditorialMarquee } from '@/components/EditorialMarquee';

interface HighlightItem {
  id: string;
  title: string;
  emoji: string;
  coverSrc: string;
}

const ME_HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'i-think-i-look-good-in-these-pics',
    title: 'I Think I Look Good in These Pics',
    emoji: '👍',
    coverSrc: '/archive/Screenshot_20261012-170849_Instagram~2.jpg',
  },
  {
    id: 'other-hobbies',
    title: 'Other Hobbies',
    emoji: '🎯',
    coverSrc: '/archive/Warm Acoustic Guitar Portrait.png',
  },
  {
    id: 'art',
    title: 'Art',
    emoji: '🎨',
    coverSrc: '/archive/Screenshot_20261012-170705_Instagram~2.jpg',
  },
  {
    id: 'fitness',
    title: 'Fitness',
    emoji: '💪',
    coverSrc: '/archive/Screenshot_20261012-170535_Instagram~2.jpg',
  },
];

const PEOPLE_HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'fav-moments',
    title: 'Fav Moments',
    emoji: '😃',
    coverSrc: '/archive/Screenshot_20261012-170421_Instagram~2.jpg',
  },
  {
    id: 'people-i-love',
    title: 'People I Love',
    emoji: '❣️',
    coverSrc: '/archive/Screenshot_20261012-170751_Instagram~2.jpg',
  },
];

const TRAVEL_HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'travel',
    title: 'Travel',
    emoji: '✈️',
    coverSrc: '/archive/Screenshot_20261012-170936_Instagram~2.jpg',
  },
];

const THUMBNAIL_MAP: Record<string, string> = {
  'fav-moments': '/archive/Screenshot_20261012-170421_Instagram~2.jpg',
  'fitness': '/archive/Screenshot_20261012-170535_Instagram~2.jpg',
  'art': '/archive/Screenshot_20261012-170705_Instagram~2.jpg',
  'people-i-love': '/archive/Screenshot_20261012-170751_Instagram~2.jpg',
  'other-hobbies': '/archive/Warm Acoustic Guitar Portrait.png',
  'i-think-i-look-good-in-these-pics': '/archive/Screenshot_20261012-170849_Instagram~2.jpg',
  'travel': '/archive/Screenshot_20261012-170936_Instagram~2.jpg',
};

export const CatalogSections: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const renderHighlightRow = (items: HighlightItem[]) => (
    <div className="flex items-start gap-4 sm:gap-6 md:gap-7 flex-wrap">
      {items.map((item) => {
        const isSelected = activeCategory === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveCategory(item.id)}
            aria-haspopup="dialog"
            aria-label={`Open ${item.title} stories`}
            className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none"
            title={`Open ${item.title} stories`}
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
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[68px] md:h-[68px] rounded-full overflow-hidden bg-[#226192]/10 relative">
                  <img
                    src={item.coverSrc}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Category Emoji Label */}
            <span
              className={`text-sm sm:text-base md:text-lg transition-transform duration-200 mt-1.5 sm:mt-2 leading-none flex items-center justify-center select-none ${
                isSelected
                  ? 'scale-110 drop-shadow-xs'
                  : 'group-hover:scale-110'
              }`}
              aria-hidden="true"
            >
              {item.emoji}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="w-full flex flex-col">
        {/* Section 1: ME */}
        <section aria-labelledby="section-me" className="w-full">
          <div className="content-container">
            <h2
              id="section-me"
              className="inline-block bg-[#EF8557] text-[#226192] text-xs sm:text-sm font-bold tracking-wider uppercase px-4 sm:px-5 py-1.5 sm:py-2 shadow-sm select-none mb-4 sm:mb-5 leading-snug"
              style={{ borderRadius: '18px 5px 22px 7px / 8px 20px 7px 16px' }}
            >
              ME
            </h2>
            {renderHighlightRow(ME_HIGHLIGHTS)}
          </div>
        </section>

        {/* Marquee below ME */}
        <EditorialMarquee
          className="w-full mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-10 md:mb-12 select-none"
          ariaLabel="Editorial Marquee: Me"
        />

        {/* Section 2: PEOPLE */}
        <section aria-labelledby="section-people" className="w-full">
          <div className="content-container">
            <h2
              id="section-people"
              className="inline-block bg-[#EF8557] text-[#226192] text-xs sm:text-sm font-bold tracking-wider uppercase px-4 sm:px-5 py-1.5 sm:py-2 shadow-sm select-none mb-4 sm:mb-5 leading-snug"
              style={{ borderRadius: '18px 5px 22px 7px / 8px 20px 7px 16px' }}
            >
              PEOPLE
            </h2>
            {renderHighlightRow(PEOPLE_HIGHLIGHTS)}
          </div>
        </section>

        {/* Marquee below PEOPLE */}
        <EditorialMarquee
          className="w-full mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-10 md:mb-12 select-none"
          ariaLabel="Editorial Marquee: People"
        />

        {/* Section 3: TRAVEL */}
        <section aria-labelledby="section-travel" className="w-full">
          <div className="content-container">
            <h2
              id="section-travel"
              className="inline-block bg-[#EF8557] text-[#226192] text-xs sm:text-sm font-bold tracking-wider uppercase px-4 sm:px-5 py-1.5 sm:py-2 shadow-sm select-none mb-4 sm:mb-5 leading-snug"
              style={{ borderRadius: '18px 5px 22px 7px / 8px 20px 7px 16px' }}
            >
              TRAVEL
            </h2>
            {renderHighlightRow(TRAVEL_HIGHLIGHTS)}
          </div>
        </section>

        {/* Marquee below TRAVEL */}
        <EditorialMarquee
          className="w-full mt-6 sm:mt-8 md:mt-10 select-none"
          ariaLabel="Editorial Marquee: Travel"
        />
      </div>

      {/* Story Viewer Modal */}
      {activeCategory && (
        <StoryViewer
          categoryId={activeCategory}
          onCategoryChange={setActiveCategory}
          onClose={() => setActiveCategory(null)}
          thumbnailMap={THUMBNAIL_MAP}
        />
      )}
    </>
  );
};
