'use client';

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
    <header className="w-full bg-zinc-950 border-b border-zinc-800/60 shrink-0">
      <div className="max-w-[1720px] mx-auto px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Left: Avatar + Identity + Personal Belief */}
          <div className="flex items-start gap-5 max-w-3xl">
            {/* Profile Avatar Frame */}
            <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
              <span className="text-zinc-400 font-mono text-xs">VG</span>
            </div>

            {/* Intro text block */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span>life.vaibhv19.dev</span>
                <span className="text-zinc-700">/</span>
                <span>visual log & memoirs</span>
              </div>

              {/* Heading */}
              <h1 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-100">
                who is <span className="text-white font-medium">vaibhv19</span> apart from code?
              </h1>

              {/* Personal belief paragraph */}
              <p className="text-sm text-zinc-400 font-normal leading-relaxed max-w-2xl">
                Collecting unscripted moments, quiet mountain trails, 35mm film grain, tactile notebooks, and late-night espresso conversations. Believing that how we spend our unstructured days is ultimately how we spend our lives.
              </p>

              {/* Signature */}
              <div className="pt-0.5">
                <span className="text-xs text-zinc-400 font-mono">
                  — Vaibhav Gupta
                </span>
              </div>
            </div>
          </div>

          {/* Right: Archive context & Active filter */}
          <div className="flex flex-col md:items-end justify-start gap-2 shrink-0">
            <div className="text-xs font-mono text-zinc-500">
              <span>{totalCollections} collections</span>
              <span className="mx-2 text-zinc-700">•</span>
              <span>{totalPosts} entries</span>
              <span className="mx-2 text-zinc-700">•</span>
              <span>2025</span>
            </div>

            {activeFilterTitle && (
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono pt-1">
                <span className="text-zinc-500">filtered:</span>
                <span className="text-zinc-200 truncate max-w-[220px]">
                  {activeFilterTitle}
                </span>
                <button
                  onClick={onClearFilter}
                  className="text-zinc-500 hover:text-zinc-200 transition-colors ml-1 underline underline-offset-2"
                  title="Reset filter"
                >
                  clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
