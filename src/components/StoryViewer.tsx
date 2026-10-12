'use client';

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { CatalogCollectionDef, CatalogImageEntry } from '@/data/catalog';
import { getCatalogCollectionById, getCollectionItems } from '@/lib/catalog';

interface StoryViewerProps {
  categoryId: string;
  onClose: () => void;
  thumbnailMap?: Record<string, string>;
}

const AUTOPLAY_DURATION_MS = 5000;
const TICK_INTERVAL_MS = 40;

const subscribe = () => () => {};

export const StoryViewer: React.FC<StoryViewerProps> = ({
  categoryId,
  onClose,
  thumbnailMap = {},
}) => {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  // 1. Data derivation
  const collection: CatalogCollectionDef | null = getCatalogCollectionById(categoryId);
  const rawItems: CatalogImageEntry[] = getCollectionItems(categoryId);

  // Fallback if category has no items
  const items: CatalogImageEntry[] =
    rawItems.length > 0
      ? rawItems
      : [
          {
            id: `${categoryId}-fallback`,
            src: thumbnailMap[categoryId] || '/cutout.png',
            title: collection?.title || 'Archive Frame',
            caption: collection?.description || 'Curated catalog memory',
            collections: [categoryId],
          },
        ];

  // 2. Playback State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0 to 100 percentage
  const [isPaused, setIsPaused] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);

  const activeItem = items[currentIndex] || items[0];

  // 3. Navigation Handlers with functional state updates (prevents stale closures)
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < items.length - 1) {
        setProgress(0);
        return prevIndex + 1;
      } else {
        // Reached the end of this category's stories: close cleanly
        onClose();
        return prevIndex;
      }
    });
  }, [items.length, onClose]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      setProgress(0);
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      // At the first item: restart current item's timer
      return 0;
    });
  }, []);

  const handleSelectStoryItem = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    setIsBrowseOpen(false);
  }, []);

  // 4. Autoplay Timer
  useEffect(() => {
    // If paused, holding, or Browse overview is open, don't run timer
    if (isPaused || isHolding || isBrowseOpen) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + (TICK_INTERVAL_MS / AUTOPLAY_DURATION_MS) * 100;
        if (nextProgress >= 100) {
          handleNext();
          return 0;
        }
        return nextProgress;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isPaused, isHolding, isBrowseOpen, handleNext]);

  // 5. Scroll lock on underlying page
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 6. Keyboard navigation (ArrowLeft, ArrowRight, Escape, Spacebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isBrowseOpen) {
          setIsBrowseOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight') {
        if (!isBrowseOpen) {
          e.preventDefault();
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (!isBrowseOpen) {
          e.preventDefault();
          handlePrev();
        }
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        // Spacebar toggles pause
        if (!isBrowseOpen) {
          e.preventDefault();
          setIsPaused((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBrowseOpen, handleNext, handlePrev, onClose]);

  // 7. Pointer hold handlers (pause only after sustained hold of >150ms so normal taps don't glitch)
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = () => {
    holdTimeoutRef.current = setTimeout(() => {
      setIsHolding(true);
    }, 150);
  };

  const handlePointerUp = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    setIsHolding(false);
  };

  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
    };
  }, []);

  if (!mounted) return null;

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${collection?.title || 'Catalog'} story viewer`}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0B1E2E]/95 backdrop-blur-md select-none text-[#EAE6DE] animate-in fade-in duration-200"
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* ========================================================= */}
      {/* TOP BAR: Segmented Progress Indicators & Header Controls   */}
      {/* ========================================================= */}
      <header className="w-full max-w-2xl mx-auto pt-3 sm:pt-4 px-4 sm:px-6 shrink-0 z-30">
        {/* Progress Segments */}
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="flex items-center gap-1.5 w-full mb-3"
        >
          {items.map((item, idx) => {
            let widthPercent = 0;
            if (idx < currentIndex) {
              widthPercent = 100;
            } else if (idx === currentIndex) {
              widthPercent = Math.min(progress, 100);
            } else {
              widthPercent = 0;
            }

            return (
              <div
                key={item.id || idx}
                className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-[#EF8557] rounded-full transition-all duration-75 ease-linear"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Story Metadata & Controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Category info */}
          <div className="flex items-center gap-3">
            {/* Category Avatar */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#EF8557] bg-[#226192]/20 shrink-0">
              <img
                src={thumbnailMap[categoryId] || activeItem.src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-[#EAE6DE] leading-tight">
                {collection?.title}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#EAE6DE]/60 leading-tight">
                {currentIndex + 1} of {items.length} {activeItem.date ? `· ${activeItem.date}` : ''}
              </span>
            </div>
          </div>

          {/* Right: Pause toggle & Close button */}
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume story playback' : 'Pause story playback'}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#EAE6DE]/70 hover:text-[#EF8557] transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#EF8557]"
              title={isPaused ? 'Resume (Space)' : 'Pause (Space)'}
            >
              {isPaused ? (
                // Play Icon
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                // Pause Icon
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close story viewer"
              className="p-1.5 rounded-full hover:bg-white/10 text-[#EAE6DE]/80 hover:text-[#EF8557] transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#EF8557]"
              title="Close (Esc)"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* CENTER MEDIA AREA: Centered scale-to-fit with navigation  */}
      {/* ========================================================= */}
      <main className="relative flex-1 w-full max-w-4xl mx-auto flex items-center justify-between px-3 sm:px-6 my-auto">
        {/* Desktop Previous Button (Outside media frame, never clipped) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous frame"
          className="hidden sm:flex shrink-0 mr-3 lg:mr-6 z-30 items-center justify-center w-11 h-11 rounded-full bg-black/50 hover:bg-[#EF8557] text-[#EAE6DE] hover:text-[#0B1E2E] transition-all shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#EF8557]"
          title="Previous frame (Left arrow)"
        >
          <svg className="w-5 h-5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Media Frame Container */}
        <div
          className="relative flex-1 h-full max-h-[72vh] sm:max-h-[78vh] flex items-center justify-center"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Active Image (object-contain to preserve aspect ratio without distortion) */}
          <img
            key={activeItem.id || activeItem.src}
            src={activeItem.src}
            alt={activeItem.title || collection?.title || 'Story frame'}
            className="w-full h-full max-h-[72vh] sm:max-h-[78vh] object-contain rounded-md shadow-2xl transition-opacity duration-200 select-none"
            loading="eager"
            draggable={false}
          />

          {/* Left Tap Zone (mobile & direct media tap) */}
          <div
            role="button"
            tabIndex={-1}
            aria-label="Previous story"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute inset-y-0 left-0 w-1/3 z-20 cursor-pointer select-none"
          />

          {/* Right Tap Zone (mobile & direct media tap) */}
          <div
            role="button"
            tabIndex={-1}
            aria-label="Next story"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute inset-y-0 right-0 w-1/3 z-20 cursor-pointer select-none"
          />

          {/* Caption / Title Overlay at bottom of media */}
          {(activeItem.title || activeItem.caption) && (
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 bg-[#0B1E2E]/85 backdrop-blur-md border border-[#EF8557]/30 p-3 sm:p-3.5 rounded pointer-events-none">
              {activeItem.title && (
                <div className="text-xs sm:text-sm font-bold text-[#EAE6DE] tracking-tight">
                  {activeItem.title}
                </div>
              )}
              {activeItem.caption && (
                <div className="text-[11px] sm:text-xs text-[#EAE6DE]/75 mt-0.5 line-clamp-2 font-normal leading-relaxed">
                  {activeItem.caption}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Next Button (Outside media frame, never clipped) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next frame"
          className="hidden sm:flex shrink-0 ml-3 lg:ml-6 z-30 items-center justify-center w-11 h-11 rounded-full bg-black/50 hover:bg-[#EF8557] text-[#EAE6DE] hover:text-[#0B1E2E] transition-all shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#EF8557]"
          title="Next frame (Right arrow)"
        >
          <svg className="w-5 h-5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </main>

      {/* ========================================================= */}
      {/* BOTTOM ACTION BAR: Browse Button                           */}
      {/* ========================================================= */}
      <footer className="w-full max-w-2xl mx-auto pb-4 sm:pb-6 pt-2 px-4 flex items-center justify-center shrink-0 z-30">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsBrowseOpen(true);
          }}
          aria-label={`Browse all ${items.length} items in ${collection?.title}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#EF8557] border border-[#EF8557]/40 hover:border-[#EF8557] text-[#EAE6DE] hover:text-[#0B1E2E] transition-all duration-200 text-xs sm:text-sm font-semibold tracking-wide cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557]"
        >
          {/* Grid Archive Icon */}
          <svg
            className="w-4 h-4 stroke-[1.75]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
          <span>Browse ({items.length})</span>
        </button>
      </footer>

      {/* ========================================================= */}
      {/* BROWSE MEDIA OVERVIEW: Compact responsive thumbnail grid  */}
      {/* ========================================================= */}
      {isBrowseOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Browse all frames in ${collection?.title}`}
          className="fixed inset-0 z-50 bg-[#0B1E2E]/98 backdrop-blur-xl flex flex-col p-4 sm:p-6 md:p-8 animate-in fade-in duration-200 overflow-y-auto"
        >
          <div className="max-w-3xl mx-auto w-full flex flex-col flex-1">
            {/* Overview Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EF8557]/25 shrink-0">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#EF8557] font-bold">
                  COLLECTION ARCHIVE // {collection?.numeral}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#EAE6DE] mt-0.5">
                  {collection?.title}
                </h3>
              </div>

              {/* Close Browse / Back to Story */}
              <button
                type="button"
                onClick={() => setIsBrowseOpen(false)}
                aria-label="Back to story slideshow"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 hover:border-[#EF8557] text-[#EAE6DE] hover:text-[#EF8557] text-xs font-mono transition-colors cursor-pointer focus:outline-none"
              >
                <span>✕ Back to Story</span>
              </button>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 my-6 flex-1">
              {items.map((item, idx) => {
                const isSelected = idx === currentIndex;

                return (
                  <button
                    key={item.id || idx}
                    type="button"
                    onClick={() => handleSelectStoryItem(idx)}
                    className={`group relative aspect-[4/5] rounded-md overflow-hidden bg-black/40 border-2 transition-all duration-200 text-left cursor-pointer focus:outline-none ${
                      isSelected
                        ? 'border-[#EF8557] ring-2 ring-[#EF8557]/40 shadow-lg'
                        : 'border-white/15 hover:border-[#EF8557]/70'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.title || `Frame ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Gradient Overlay & Indicator */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-2.5">
                      {/* Top status tag */}
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-[#EAE6DE]/80">
                          {idx + 1}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-[#EF8557] text-[#0B1E2E] px-1.5 py-0.5 rounded-xs">
                            Viewing
                          </span>
                        )}
                      </div>

                      {/* Bottom caption */}
                      {item.title && (
                        <div className="text-[11px] font-medium text-white truncate drop-shadow-xs">
                          {item.title}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Overview Bottom Navigation & External Link */}
            <div className="pt-4 border-t border-[#EF8557]/25 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <Link
                href={`/catalog/${categoryId}`}
                onClick={onClose}
                className="text-xs sm:text-sm font-semibold text-[#EF8557] hover:underline underline-offset-4 inline-flex items-center gap-1.5 cursor-pointer focus:outline-none"
              >
                <span>Open full {collection?.title} catalog page</span>
                <span>→</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsBrowseOpen(false)}
                className="btn-palette-b px-4 py-2 text-xs font-semibold tracking-tight cursor-pointer focus:outline-none shadow-sm"
                style={{ borderRadius: '12px 4px 14px 4px' }}
              >
                Resume Slideshow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return createPortal(content, document.body);
};

