'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type MainViewMode = 'all' | 'archive' | 'series' | 'chronology' | 'hidden';

interface HeaderProps {
  activeView?: MainViewMode;
  onSelectView?: (view: MainViewMode) => void;
  onOpenSearch?: () => void;
  activeFilterTitle?: string | null;
  onClearFilter?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView = 'all',
  onSelectView,
  onClearFilter,
}) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isCatalogPage = pathname.startsWith('/catalog') || (isHomePage && activeView === 'series');
  const isNotesPage = pathname.startsWith('/notes');
  const isAllPostPage = pathname.startsWith('/all-post') || (isHomePage && activeView === 'chronology');
  const isBetweenUsPage = pathname.startsWith('/between-us');

  return (
    <header className="sticky top-0 z-40 w-full bg-[#EAE6DE]/95 backdrop-blur-md select-none">
      <div className="content-container">
        <div className="h-14 sm:h-16 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6 border-b border-[#EF8557]/25">
        {/* LEFT: Home link */}
        <Link
          href="/"
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault();
              if (onClearFilter) onClearFilter();
              if (onSelectView) onSelectView('all');
            }
          }}
          className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 cursor-pointer relative py-1 focus:outline-none shrink-0 bg-transparent border-none p-0 appearance-none ${
            isHomePage
              ? 'text-[#2C7BB8] hover:text-[#EF8557]'
              : 'text-[#226192] hover:text-[#EF8557]'
          }`}
          title="Return to Life Homepage"
        >
          Home
        </Link>

        {/* RIGHT: Archive Catalog, Notes, All Post & [ Between Us ] Button Navigation */}
        <nav aria-label="Main Navigation" className="flex items-center gap-3 sm:gap-5 md:gap-6 shrink-0">
          {/* 1. Catalog */}
          <Link
            href="/catalog"
            className={`text-xs sm:text-sm md:text-base font-medium tracking-normal transition-colors duration-200 cursor-pointer relative py-1 focus:outline-none ${
              isCatalogPage
                ? 'text-[#2C7BB8] font-semibold hover:text-[#EF8557]'
                : 'text-[#226192] hover:text-[#EF8557]'
            }`}
          >
            Catalog
          </Link>

          {/* 2. Notes */}
          <Link
            href="/notes"
            className={`text-xs sm:text-sm md:text-base font-medium tracking-normal transition-colors duration-200 cursor-pointer relative py-1 focus:outline-none ${
              isNotesPage
                ? 'text-[#2C7BB8] font-semibold hover:text-[#EF8557]'
                : 'text-[#226192] hover:text-[#EF8557]'
            }`}
          >
            Notes
          </Link>

          {/* 3. All Post */}
          <Link
            href="/all-post"
            className={`text-xs sm:text-sm md:text-base font-medium tracking-normal transition-colors duration-200 cursor-pointer relative py-1 focus:outline-none ${
              isAllPostPage
                ? 'text-[#2C7BB8] font-semibold hover:text-[#EF8557]'
                : 'text-[#226192] hover:text-[#EF8557]'
            }`}
          >
            All Post
          </Link>

          {/* 4. [ Between Us ] Button (Organic Hand-Cut Shape, Cream Fill, Burgundy Text) */}
          <Link
            href="/between-us"
            className={`btn-palette-b cursor-pointer focus:outline-none px-3.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold tracking-tight hover:scale-[1.02] active:scale-[0.98] shadow-sm select-none shrink-0 ${
              isBetweenUsPage ? 'ring-2 ring-[#EF8557]/60' : ''
            }`}
            style={{
              borderRadius: '18px 5px 22px 7px / 8px 20px 7px 16px',
            }}
            title="Open Between Us private space"
          >
            Between Us
          </Link>
        </nav>
        </div>
      </div>
    </header>
  );
};
