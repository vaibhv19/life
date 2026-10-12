'use client';

import React from 'react';
import Link from 'next/link';
import { CATALOG_COLLECTIONS } from '@/data/catalog';

const THUMBNAIL_MAP: Record<string, string> = {
  'fav-moments': '/archive/2026-09-28-01.jpeg',
  'fitness': '/archive/2026-09-28-02.jpeg',
  'art': '/archive/2026-09-28-03.jpeg',
  'people-i-love': '/archive/2026-09-28-04.jpeg',
  'other-hobbies': '/archive/Warm Acoustic Guitar Portrait.png',
  'i-think-i-look-good-in-these-pics': '/cutout.png',
  'travel': '/archive/2026-09-28-05.jpeg',
};

export const CatalogHighlights: React.FC = () => {
  return (
    <section aria-label="Catalog Highlights" className="w-full pb-5 sm:pb-6 md:pb-7 select-none">
      <div className="content-container">
        {/* 1. Instagram Highlights Row */}
        <div className="w-full overflow-x-auto no-scrollbar scroll-smooth py-1 -mx-2 px-2 sm:mx-0 sm:px-0">
          <div className="flex items-start gap-4 sm:gap-5 md:gap-6 min-w-max sm:min-w-0 sm:justify-between">
            {CATALOG_COLLECTIONS.map((category) => {
              const thumbnailSrc = THUMBNAIL_MAP[category.id] || '/cutout.png';

              return (
                <Link
                  key={category.id}
                  href={`/catalog/${category.id}`}
                  className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none"
                  title={`Open ${category.title} collection`}
                >
                  {/* Outer Ring with Hover Reaction */}
                  <div className="p-[3px] rounded-full border border-[#226192]/30 group-hover:border-[#EF8557] group-hover:scale-105 transition-all duration-300 ease-out">
                    {/* Ring Gap */}
                    <div className="p-[2px] rounded-full bg-[#EAE6DE]">
                      {/* Circular Image Container */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[68px] md:h-[68px] rounded-full overflow-hidden bg-[#226192]/10 relative">
                        <img
                          src={thumbnailSrc}
                          alt={category.title}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category Title Label */}
                  <span
                    className="text-[10px] sm:text-[11px] font-medium text-[#226192]/80 group-hover:text-[#EF8557] tracking-tight text-center max-w-[70px] sm:max-w-[78px] transition-colors mt-2 leading-tight line-clamp-2 min-h-[26px] sm:min-h-[28px] flex items-start justify-center"
                    title={category.title}
                  >
                    {category.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 2. Understated Editorial Statement below highlights */}
        <div className="mt-4 sm:mt-6">
          <p className="font-editorial-italic text-base sm:text-lg md:text-xl text-[#226192] tracking-tight">
            My social media profile, except I own the platform.
          </p>
        </div>
      </div>
    </section>
  );
};
