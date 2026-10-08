'use client';

import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#722F37]/95 backdrop-blur-md border-b border-[#F8F4E7]/25 select-none">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-14 sm:h-16 py-3 sm:py-4 flex items-center justify-between gap-6">
        {/* LEFT: Main Home / Navigation Identity (Static Text Visually, Clickable) */}
        <Link
          href="/"
          className="text-left cursor-pointer focus:outline-none shrink min-w-0 bg-transparent border-none p-0 appearance-none"
          title="Return to Life Homepage"
        >
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-[#F8F4E7] no-underline inline-block">
            Who is @vaibhv19 apart from code?
          </span>
        </Link>

        {/* RIGHT: Archive Catalog, Notes, All Post & [ Between Us ] Button Navigation */}
        <nav aria-label="Main Navigation" className="flex items-center gap-4 sm:gap-6 md:gap-8 shrink-0">
          {/* 1. Catalog */}
          <button
            type="button"
            className="group text-sm sm:text-base md:text-lg font-medium tracking-normal transition-all cursor-pointer relative py-1 focus:outline-none text-[#F8F4E7] hover:text-[#FFFDF7]"
          >
            <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F8F4E7] group-hover:after:w-full after:transition-all after:duration-300 after:ease-out">
              Catalog
            </span>
          </button>

          {/* 2. Notes */}
          <button
            type="button"
            className="group text-sm sm:text-base md:text-lg font-medium tracking-normal transition-all cursor-pointer relative py-1 focus:outline-none text-[#F8F4E7] hover:text-[#FFFDF7]"
          >
            <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F8F4E7] group-hover:after:w-full after:transition-all after:duration-300 after:ease-out">
              Notes
            </span>
          </button>

          {/* 3. All Post */}
          <button
            type="button"
            className="group text-sm sm:text-base md:text-lg font-medium tracking-normal transition-all cursor-pointer relative py-1 focus:outline-none text-[#F8F4E7] hover:text-[#FFFDF7]"
          >
            <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F8F4E7] group-hover:after:w-full after:transition-all after:duration-300 after:ease-out">
              All Post
            </span>
          </button>

          {/* 4. [ Between Us ] Button (Organic Hand-Cut Shape, Cream Fill, Dusty Pink Text) */}
          <button
            type="button"
            className="cursor-pointer focus:outline-none bg-[#F8F4E7] text-[#D7A781] px-3.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 ease-out hover:bg-[#FFFDF7] hover:scale-[1.02] active:scale-[0.98] shadow-sm select-none shrink-0"
            style={{
              borderRadius: '18px 5px 22px 7px / 8px 20px 7px 16px',
            }}
            title="Between Us"
          >
            Between Us
          </button>
        </nav>
      </div>
    </header>
  );
};
