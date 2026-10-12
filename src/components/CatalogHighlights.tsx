'use client';

import React, { useState } from 'react';
import { CATALOG_COLLECTIONS } from '@/data/catalog';
import { StoryViewer } from '@/components/StoryViewer';

const THUMBNAIL_MAP: Record<string, string> = {
  'fav-moments': '/archive/Screenshot_20261012-170421_Instagram~2.jpg',
  'fitness': '/archive/Screenshot_20261012-170535_Instagram~2.jpg',
  'art': '/archive/Screenshot_20261012-170705_Instagram~2.jpg',
  'people-i-love': '/archive/Screenshot_20261012-170751_Instagram~2.jpg',
  'other-hobbies': '/archive/Warm Acoustic Guitar Portrait.png',
  'i-think-i-look-good-in-these-pics': '/archive/Screenshot_20261012-170849_Instagram~2.jpg',
  'travel': '/archive/Screenshot_20261012-170936_Instagram~2.jpg',
};

const EMOJI_MAP: Record<string, string> = {
  'fav-moments': '😃',
  'fitness': '💪',
  'art': '🎨',
  'people-i-love': '❣️',
  'other-hobbies': '🎯',
  'i-think-i-look-good-in-these-pics': '👍',
  'travel': '✈️',
};

// Filter out Travel from homepage highlights row (remains available in catalog/stories)
const HOMEPAGE_HIGHLIGHTS = CATALOG_COLLECTIONS.filter((category) => category.id !== 'travel');

export const CatalogHighlights: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section aria-label="Catalog Highlights" className="w-full select-none">
      <div className="content-container">
        {/* 1. Instagram Highlights Row */}
        <div className="w-full pt-1 pb-0">
          <div className="flex items-start justify-between w-full">
            {HOMEPAGE_HIGHLIGHTS.map((category) => {
              const thumbnailSrc = THUMBNAIL_MAP[category.id] || '/cutout.png';
              const emoji = EMOJI_MAP[category.id] || '✨';
              const isSelected = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  aria-haspopup="dialog"
                  aria-label={`Open ${category.title} stories`}
                  className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none"
                  title={`Open ${category.title} stories`}
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
                          src={thumbnailSrc}
                          alt={category.title}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category Emoji Label */}
                  <span
                    className={`text-xs min-[360px]:text-sm sm:text-base md:text-lg transition-transform duration-200 mt-1 sm:mt-1.5 md:mt-2 leading-none flex items-center justify-center select-none ${
                      isSelected
                        ? 'scale-110 drop-shadow-xs'
                        : 'group-hover:scale-110'
                    }`}
                    aria-hidden="true"
                  >
                    {emoji}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Subtle horizontal separator between highlights row and media archive */}
        <div className="content-divider mt-4 sm:mt-5 md:mt-6 mb-6 sm:mb-8 md:mb-10" />
      </div>

      {/* 2. Instagram-Style Story Viewer Modal */}
      {activeCategory && (
        <StoryViewer
          categoryId={activeCategory}
          onCategoryChange={setActiveCategory}
          onClose={() => setActiveCategory(null)}
          thumbnailMap={THUMBNAIL_MAP}
        />
      )}
    </section>
  );
};

