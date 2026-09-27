'use client';

import React, { useState } from 'react';

interface PersonalPostViewProps {
  onExploreCollections: () => void;
  onExploreTimeline: () => void;
}

export const PersonalPostView: React.FC<PersonalPostViewProps> = ({
  onExploreCollections,
  onExploreTimeline,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <main className="flex-1 h-full min-h-screen lg:min-h-0 overflow-y-auto overflow-x-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative select-none transition-colors">
      {/* Top Subtle Meta / Journal Context */}
      <header className="flex items-center justify-between text-xs font-mono text-zinc-400 dark:text-zinc-500 w-full max-w-6xl mx-auto shrink-0">
        <div className="flex items-center gap-2 tracking-wide">
          <span>01</span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span>visual journal</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-zinc-400 dark:text-zinc-600">
          <span>memoirs & quiet observations</span>
        </div>
      </header>

      {/* Main Editorial Composition: Photograph-First Hierarchy */}
      <div className="flex-1 flex items-center justify-center my-6 sm:my-8 w-full max-w-6xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Dominant Visual Element: Cut-out Portrait (Occupies Col 1 to 7/8) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start items-end relative min-h-[360px] sm:min-h-[480px] lg:min-h-[580px] h-[50vh] sm:h-[58vh] lg:h-[68vh] max-h-[720px]">
            {/* Free-standing cut-out silhouette / photograph */}
            <div className="relative h-full w-full max-w-md sm:max-w-lg lg:max-w-xl flex items-end justify-center lg:justify-start">
              {!imgError ? (
                <img
                  src="/cutout.png"
                  alt="Vaibhav Gupta"
                  onError={() => setImgError(true)}
                  className="h-full w-auto max-h-full object-contain object-bottom drop-shadow-2xl dark:drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)] filter contrast-[1.03] transition-transform duration-500 ease-out"
                />
              ) : (
                /* Editorial isolated portrait silhouette mark when cutout bitmap is being loaded/supplied */
                <div className="h-full w-full flex flex-col items-center lg:items-start justify-end pb-2 opacity-85 dark:opacity-80">
                  <svg
                    viewBox="0 0 240 320"
                    className="h-full w-auto max-h-full fill-zinc-300 dark:fill-zinc-800 transition-colors"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Sculptural silhouette form */}
                    <path d="M120 36 C 98 36, 84 54, 84 80 C 84 102, 98 120, 120 120 C 142 120, 156 102, 156 80 C 156 54, 142 36, 120 36 Z M 58 175 C 36 195, 24 228, 16 320 L 224 320 C 216 228, 204 195, 182 175 C 166 160, 148 150, 120 150 C 92 150, 74 160, 58 175 Z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Supporting Personal Statement & Quiet Context (Col 8 to 12) */}
          <div className="lg:col-span-5 flex flex-col justify-end pb-4 lg:pb-8 space-y-6 max-w-md">
            
            {/* The Personal Statement (Understated, discoverable secondary thought) */}
            <div className="space-y-3">
              <blockquote className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed sm:leading-loose font-normal tracking-normal">
                “I think if I do nothing on this planet that makes people feel a little more loved, then I have served my purpose well.”
              </blockquote>
              <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500 tracking-wider">
                — Vaibhav Gupta
              </div>
            </div>

            {/* Subtle Navigation Actions into Archive */}
            <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center gap-5 text-xs font-mono text-zinc-400 dark:text-zinc-500">
              <button
                onClick={onExploreTimeline}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                open timeline →
              </button>
              <span className="text-zinc-300 dark:text-zinc-800">·</span>
              <button
                onClick={onExploreCollections}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                view collections →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Quiet Archive Marker */}
      <footer className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600 flex items-center justify-between w-full max-w-6xl mx-auto shrink-0 pt-2">
        <span>personal archive</span>
        <span>2025</span>
      </footer>
    </main>
  );
};
