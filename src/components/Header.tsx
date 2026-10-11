'use client';

import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#EDECE6]/95 backdrop-blur-md select-none">
      <div className="content-container">
        <div className="h-14 sm:h-16 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6 border-b border-[#1546D9]/25">
          {/* LEFT: Home link */}
          <Link
            href="/"
            className="group text-base sm:text-lg font-bold tracking-tight transition-all cursor-pointer relative py-1 focus:outline-none shrink-0 bg-transparent border-none p-0 appearance-none text-[#1546D9] hover:text-[#2E5DE8]"
            title="Return to Life Homepage"
          >
            <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1546D9] group-hover:after:w-full after:transition-all after:duration-300 after:ease-out">
              Home
            </span>
          </Link>

          {/* RIGHT: Archive Catalog, Notes, All Post & [ Between Us ] Button Navigation */}
          <nav aria-label="Main Navigation" className="flex items-center gap-3 sm:gap-5 md:gap-6 shrink-0">
            {/* 1. Catalog */}
            <Link
              href="/catalog"
              className="group text-xs sm:text-sm md:text-base font-medium tracking-normal transition-all cursor-pointer relative py-1 focus:outline-none text-[#1546D9] hover:text-[#2E5DE8]"
            >
              <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1546D9] group-hover:after:w-full after:transition-all after:duration-300 after:ease-out">
                Catalog
              </span>
            </Link>

            {/* 2. Notes */}
            <Link
              href="/notes"
              className="group text-xs sm:text-sm md:text-base font-medium tracking-normal transition-all cursor-pointer relative py-1 focus:outline-none text-[#1546D9] hover:text-[#2E5DE8]"
            >
              <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1546D9] group-hover:after:w-full after:transition-all after:duration-300 after:ease-out">
                Notes
              </span>
            </Link>

            {/* 3. All Post */}
            <Link
              href="/all-post"
              className="group text-xs sm:text-sm md:text-base font-medium tracking-normal transition-all cursor-pointer relative py-1 focus:outline-none text-[#1546D9] hover:text-[#2E5DE8]"
            >
              <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1546D9] group-hover:after:w-full after:transition-all after:duration-300 after:ease-out">
                All Post
              </span>
            </Link>

            {/* 4. [ Between Us ] Button (Sun Yellow Fill, Cobalt Blue Text) */}
            <Link
              href="/between-us"
              className="btn-palette-b cursor-pointer focus:outline-none px-3.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold tracking-tight hover:scale-[1.02] active:scale-[0.98] shadow-sm select-none shrink-0"
              style={{
                borderRadius: '18px 5px 22px 7px / 8px 20px 7px 16px',
              }}
              title="Between Us"
            >
              Between Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
