'use strict';
import React from 'react';

interface BioHeaderProps {
  totalCollections: number;
  totalPosts: number;
  activeFilterTitle?: string | null;
  onClearFilter?: () => void;
}

export const BioHeader: React.FC<BioHeaderProps> = ({
  totalCollections,
  totalPosts,
  activeFilterTitle,
  onClearFilter,
}) => {
  return (
    <header className="w-full bg-zinc-950/95 border-b border-zinc-800/80 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Left: Avatar + Identity + Personal Belief */}
          <div className="flex items-start gap-4 sm:gap-6 max-w-3xl">
            {/* Profile Picture Placeholder */}
            <div className="relative group shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 border border-zinc-700/60 p-1 shadow-lg shadow-black/40 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-xl bg-zinc-900/90 border border-zinc-800/80 flex flex-col items-center justify-center text-center p-1 relative">
                  <span className="text-zinc-200 font-mono text-xs sm:text-sm font-semibold tracking-wider">VG</span>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-tight uppercase mt-0.5">avatar</span>
                </div>
              </div>
              {/* Online / Active status pulse */}
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-zinc-950"></span>
              </span>
            </div>

            {/* Intro text block */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  life.vaibhv19.dev
                </span>
                <span className="text-xs text-zinc-400 font-mono tracking-tight">
                  visual log & memoirs
                </span>
              </div>

              {/* Required Heading */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-tight text-zinc-100">
                who is <span className="font-semibold text-white">vaibhv19</span> apart from code?
              </h1>

              {/* Personal belief paragraph */}
              <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-2xl">
                Collecting unscripted moments, quiet mountain trails, 35mm film grain, tactile notebooks, and late-night espresso conversations. Believing that how we spend our unstructured days is ultimately how we spend our lives.
              </p>

              {/* Signature */}
              <div className="pt-1 flex items-center gap-3">
                <span className="text-sm font-medium text-zinc-200 tracking-wide font-mono">
                  — Vaibhav Gupta
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Stats & Active Filter Badge */}
          <div className="flex flex-row md:flex-col items-start md:items-end justify-between md:justify-start gap-3 border-t md:border-t-0 border-zinc-900 pt-3 md:pt-0 shrink-0">
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="text-left md:text-right">
                <span className="text-zinc-200 font-semibold block text-sm">{totalCollections}</span>
                <span className="text-zinc-400 text-[11px] tracking-wider uppercase">Collections</span>
              </div>
              <div className="h-6 w-[1px] bg-zinc-800" />
              <div className="text-left md:text-right">
                <span className="text-zinc-200 font-semibold block text-sm">{totalPosts}</span>
                <span className="text-zinc-400 text-[11px] tracking-wider uppercase">Entries</span>
              </div>
              <div className="h-6 w-[1px] bg-zinc-800" />
              <div className="text-left md:text-right">
                <span className="text-zinc-200 font-semibold block text-sm">2025</span>
                <span className="text-zinc-400 text-[11px] tracking-wider uppercase">Archive</span>
              </div>
            </div>

            {/* Active filter pill if filtered */}
            {activeFilterTitle && (
              <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-700/80 rounded-full px-3 py-1 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-zinc-300 font-mono truncate max-w-[200px]">
                  {activeFilterTitle}
                </span>
                <button
                  onClick={onClearFilter}
                  className="text-zinc-400 hover:text-white transition-colors ml-1 font-mono hover:bg-zinc-800 rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                  title="Reset filter"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
