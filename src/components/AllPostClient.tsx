'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ArchivePost } from '@/lib/posts';

interface AllPostClientProps {
  posts: ArchivePost[];
}

export const AllPostClient: React.FC<AllPostClientProps> = ({ posts }) => {
  // Sort posts chronologically by rawDate, newest first
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => b.rawDate.localeCompare(a.rawDate));
  }, [posts]);

  // Default state: focused browsing layout with the newest post selected on initial page load
  const [focusedId, setFocusedId] = useState<string | null>(() => {
    return sortedPosts.length > 0 ? sortedPosts[0].id : null;
  });

  const focusedPost = useMemo(() => {
    return sortedPosts.find((p) => p.id === focusedId) || null;
  }, [sortedPosts, focusedId]);

  // Refs for synchronized scrolling
  const gridItemRefs = useRef<Record<string, HTMLElement | null>>({});
  const stripItemRefs = useRef<Record<string, HTMLElement | null>>({});
  const mobileStripItemRefs = useRef<Record<string, HTMLElement | null>>({});
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const horizontalStripRef = useRef<HTMLDivElement | null>(null);

  // Handle image selection
  const handleSelect = useCallback((id: string) => {
    setFocusedId(id);

    // Synchronize scroll in desktop strip
    const stripEl = stripItemRefs.current[id];
    if (stripEl) {
      stripEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }

    // Synchronize scroll in mobile strip
    const mobileStripEl = mobileStripItemRefs.current[id];
    if (mobileStripEl) {
      mobileStripEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }

    // Synchronize scroll in 2-column grid
    const gridEl = gridItemRefs.current[id];
    if (gridEl) {
      gridEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, []);

  // Keyboard navigation when in focused mode
  useEffect(() => {
    if (!focusedId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFocusedId(null);
        return;
      }

      const currentIndex = sortedPosts.findIndex((p) => p.id === focusedId);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, sortedPosts.length - 1);
        handleSelect(sortedPosts[nextIndex].id);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        handleSelect(sortedPosts[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedId, sortedPosts, handleSelect]);

  if (sortedPosts.length === 0) {
    return (
      <div className="w-full py-20 px-4 text-center select-none">
        <div
          className="max-w-md mx-auto border border-dashed border-[#226192]/25 p-10 sm:p-14"
          style={{ borderRadius: '18px 4px 18px 4px' }}
        >
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#EF8557] mb-3">
            EMPTY ARCHIVE
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#226192] mb-3">
            No photographs recorded yet.
          </h2>
          <p className="text-xs sm:text-sm text-[#226192]/70 leading-relaxed font-normal">
            Photographs placed in the archive will appear automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full select-none">
      {/* ============================================================== */}
      {/* DESKTOP VIEW (lg+): In-place Reflow Layout                    */}
      {/* ============================================================== */}
      <div className="hidden lg:block w-full">
        {focusedPost ? (
          /* Split Browsing Layout: 35% 2-column grid + 65% focused panel with vertical divider */
          <div className="flex items-start w-full animate-in fade-in duration-300">
            {/* 1. Left: 2-Column Main Image Grid (35% width) */}
            <div
              ref={gridContainerRef}
              className="w-[35%] shrink-0 max-h-[calc(100vh-12rem)] overflow-y-auto pr-6 xl:pr-8 border-r border-[#EF8557]/25 no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 xl:gap-3">
                {sortedPosts.map((item) => {
                  const isSelected = focusedId === item.id;

                  return (
                    <article
                      key={item.id}
                      ref={(el) => {
                        gridItemRefs.current[item.id] = el;
                      }}
                      onClick={() => handleSelect(item.id)}
                      className="cursor-pointer transition-all duration-200"
                    >
                      <div
                        className={`p-1.5 bg-[#DFDBD3]/35 border transition-all duration-200 shadow-xs hover:shadow-sm ${
                          isSelected
                            ? 'border-[#EF8557] ring-2 ring-[#EF8557]/60 shadow-sm'
                            : 'border-[#226192]/20 hover:border-[#EF8557]'
                        }`}
                        style={{ borderRadius: '10px 3px 12px 3px / 4px 10px 4px 8px' }}
                      >
                        <div className="relative w-full aspect-square overflow-hidden bg-[#226192]/5 rounded-[2px]">
                          <img
                            src={item.src}
                            alt={item.formattedDate}
                            className="w-full h-full object-cover object-center transition-transform duration-300 ease-out hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="pt-1.5 pb-0.5 px-0.5 text-[10px] xl:text-[11px] font-semibold text-[#226192] tracking-tight">
                          {item.formattedDate}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* 2. Right: Prominent Focused Image Display (65% width) */}
            <div className="w-[65%] min-w-0 pl-6 xl:pl-8 sticky top-24 flex flex-col gap-5">
              {/* Header with Close Cross Only */}
              <div className="flex justify-end w-full">
                <button
                  type="button"
                  onClick={() => setFocusedId(null)}
                  className="text-[#226192] hover:text-[#EF8557] text-base leading-none p-1 transition-colors cursor-pointer focus:outline-none"
                  title="Close [Esc]"
                  aria-label="Close focused view"
                >
                  ✕
                </button>
              </div>

              {/* Prominent Focused Image Display */}
              <div className="flex flex-col items-center justify-center flex-1 min-h-[460px] xl:min-h-[520px]">
                <div
                  className="relative w-full max-h-[calc(100vh-18rem)] flex items-center justify-center p-4 xl:p-6 bg-[#DFDBD3]/30 border border-[#226192]/20 shadow-md overflow-hidden"
                  style={{ borderRadius: '16px 4px 18px 6px / 6px 16px 6px 14px' }}
                >
                  <img
                    key={focusedPost.id}
                    src={focusedPost.src}
                    alt={focusedPost.formattedDate}
                    className="max-h-[calc(100vh-22rem)] max-w-full object-contain shadow-sm animate-in fade-in duration-300"
                  />
                </div>

                <div className="pt-3 text-sm font-semibold text-[#226192] tracking-wide text-center">
                  {focusedPost.formattedDate}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Default State: 5-Column Grid on Desktop */
          <div className="grid grid-cols-5 gap-4 xl:gap-5 w-full animate-in fade-in duration-300">
            {sortedPosts.map((item) => (
              <article
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="group cursor-pointer transition-all duration-300 relative"
                title={`Open ${item.formattedDate}`}
              >
                <div
                  className="p-1.5 sm:p-2 bg-[#DFDBD3]/35 border border-[#226192]/20 group-hover:border-[#EF8557] transition-all duration-300 shadow-xs group-hover:shadow-md"
                  style={{ borderRadius: '10px 3px 12px 3px / 4px 10px 4px 8px' }}
                >
                  <div className="relative w-full aspect-square overflow-hidden bg-[#226192]/5 rounded-[2px]">
                    <img
                      src={item.src}
                      alt={item.formattedDate}
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-2 pb-0.5 px-0.5 text-xs font-semibold text-[#226192] tracking-tight">
                    {item.formattedDate}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MOBILE VIEW (< lg): Single-column / grid browsing layout      */}
      {/* ============================================================== */}
      <div className="block lg:hidden w-full">
        {focusedPost ? (
          /* Mobile Focused Browsing: Focused image + strip navigation */
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            {/* Header with Close Cross Only */}
            <div className="flex justify-end w-full">
              <button
                type="button"
                onClick={() => setFocusedId(null)}
                className="text-[#226192] hover:text-[#EF8557] text-base leading-none p-1 transition-colors cursor-pointer focus:outline-none"
                title="Close [Esc]"
                aria-label="Close focused view"
              >
                ✕
              </button>
            </div>

            {/* Focused Image */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-full max-h-[50vh] flex items-center justify-center p-3 bg-[#DFDBD3]/30 border border-[#226192]/20 shadow-md overflow-hidden"
                style={{ borderRadius: '14px 4px 16px 4px / 6px 14px 5px 12px' }}
              >
                <img
                  key={focusedPost.id}
                  src={focusedPost.src}
                  alt={focusedPost.formattedDate}
                  className="max-h-[44vh] max-w-full object-contain shadow-sm animate-in fade-in duration-300"
                />
              </div>

              <div className="pt-2 text-xs font-semibold text-[#226192] tracking-tight text-center">
                {focusedPost.formattedDate}
              </div>
            </div>

            {/* Mobile Chronological Media Strip */}
            <div className="w-full pt-2 border-t border-[#EF8557]/20">
              <div
                className="flex gap-2.5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
                style={{
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {sortedPosts.map((item) => {
                  const isSelected = focusedId === item.id;

                  return (
                    <article
                      key={item.id}
                      ref={(el) => {
                        mobileStripItemRefs.current[item.id] = el;
                      }}
                      onClick={() => handleSelect(item.id)}
                      className="shrink-0 w-28 sm:w-32 cursor-pointer snap-center"
                    >
                      <div
                        className={`p-1 bg-[#DFDBD3]/35 border transition-all duration-200 ${
                          isSelected
                            ? 'border-[#EF8557] ring-2 ring-[#EF8557]/60 shadow-xs'
                            : 'border-[#226192]/20'
                        }`}
                        style={{ borderRadius: '8px 2px 10px 2px' }}
                      >
                        <div className="w-full aspect-[4/3] overflow-hidden bg-[#226192]/5 rounded-[2px]">
                          <img
                            src={item.src}
                            alt={item.formattedDate}
                            className="w-full h-full object-cover object-center"
                            loading="lazy"
                          />
                        </div>
                        <div className="pt-1 text-[10px] font-semibold text-[#226192] truncate text-center">
                          {item.formattedDate}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Mobile Default State: 2-Column (or 3 on tablet) Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
            {sortedPosts.map((item) => (
              <article
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="group cursor-pointer transition-all duration-300 relative"
                title={`Open ${item.formattedDate}`}
              >
                <div
                  className="p-1.5 sm:p-2 bg-[#DFDBD3]/35 border border-[#226192]/20 group-hover:border-[#EF8557] transition-all duration-300 shadow-xs group-hover:shadow-md"
                  style={{ borderRadius: '10px 3px 12px 3px / 4px 10px 4px 8px' }}
                >
                  <div className="relative w-full aspect-square overflow-hidden bg-[#226192]/5 rounded-[2px]">
                    <img
                      src={item.src}
                      alt={item.formattedDate}
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-2 pb-0.5 px-0.5 text-xs font-semibold text-[#226192] tracking-tight">
                    {item.formattedDate}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
