'use client';

import React from 'react';
import { Collection, ThumbnailItem, LightboxData } from '../types';

interface CollectionsPanelProps {
  collections: Collection[];
  activeCollectionId: string | null;
  onFilterCollection: (collectionId: string) => void;
  onOpenLightbox: (data: LightboxData) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const CollectionsPanel: React.FC<CollectionsPanelProps> = ({
  collections,
  activeCollectionId,
  onFilterCollection,
  onOpenLightbox,
  isCollapsed,
  onToggleCollapse,
}) => {
  if (isCollapsed) {
    return (
      <aside className="relative z-20 border-r border-zinc-800/80 bg-zinc-950/80 flex flex-col items-center py-6 px-2 w-14 shrink-0 transition-all duration-300 select-none">
        {/* Re-expand button */}
        <button
          onClick={onToggleCollapse}
          className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 group"
          title="Expand collections panel"
          aria-label="Expand collections panel"
        >
          <span className="text-sm font-mono group-hover:translate-x-0.5 transition-transform">→</span>
        </button>

        {/* Vertical rotated text indicating collapsed collections */}
        <div className="mt-8 [writing-mode:vertical-rl] rotate-180 flex items-center gap-3 text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer" onClick={onToggleCollapse}>
          <span className="font-mono text-xs uppercase tracking-widest font-medium">collections</span>
          <span className="text-[10px] font-mono text-zinc-400">({collections.length})</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="relative z-10 w-full md:w-[460px] lg:w-[520px] shrink-0 border-r border-zinc-800/80 bg-zinc-950/50 flex flex-col h-full overflow-hidden transition-all duration-300">
      {/* Panel Top Header with Title and Boundary Collapse Button */}
      <div className="sticky top-0 z-20 bg-zinc-950/95 backdrop-blur-md px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-zinc-400" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold">
            collection
          </h2>
          <span className="text-xs font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            {collections.length} series
          </span>
        </div>

        {/* Circular "✕" collapse button positioned at the boundary */}
        <button
          onClick={onToggleCollapse}
          className="w-7 h-7 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-400 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-150 text-xs shadow-sm hover:scale-105"
          title="Collapse collections panel"
          aria-label="Collapse collections panel"
        >
          ✕
        </button>
      </div>

      {/* Independently scrolling collection list */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-10 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {collections.map((col) => {
          const isActive = activeCollectionId === col.id;

          return (
            <section
              key={col.id}
              className={`rounded-2xl p-4 sm:p-5 transition-all duration-200 border ${
                isActive
                  ? 'bg-zinc-900/60 border-zinc-600/80 shadow-lg shadow-black/40 ring-1 ring-zinc-500/20'
                  : 'bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700/80'
              }`}
            >
              {/* Collection Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-400 mb-1">
                  <span>SERIES {col.indexNumber}</span>
                  <span>{col.dateRange}</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-zinc-100 tracking-tight leading-snug">
                  {col.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                  {col.description}
                </p>
              </div>

              {/* Asymmetric Photo-Grid (Magazine / Collage Style) */}
              <div className="grid grid-cols-3 gap-2 auto-rows-[90px] sm:auto-rows-[105px] my-3">
                {col.thumbnails.map((thumb) => (
                  <div
                    key={thumb.id}
                    onClick={() =>
                      onOpenLightbox({
                        id: thumb.id,
                        title: thumb.title,
                        label: thumb.label,
                        caption: thumb.caption,
                        date: thumb.date,
                        collectionTitle: col.title,
                        location: thumb.location,
                      })
                    }
                    className={`group relative overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800/80 hover:border-zinc-400/80 cursor-pointer transition-all duration-200 shadow-sm ${thumb.gridSpan}`}
                  >
                    {/* Placeholder content styling */}
                    <div className="w-full h-full flex flex-col justify-between p-2.5 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 select-none">
                      {/* Top label / metadata tag */}
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono tracking-tight text-zinc-400 group-hover:text-zinc-200 transition-colors">
                          {thumb.label}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-300">
                          ↗
                        </span>
                      </div>

                      {/* Center subtle watermark / grid graphic */}
                      <div className="my-auto flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                        <div className="w-6 h-6 border border-dashed border-zinc-600 rounded flex items-center justify-center text-[10px] font-mono text-zinc-400">
                          +
                        </div>
                      </div>

                      {/* Bottom title / tag */}
                      <div className="truncate">
                        <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors truncate block">
                          {thumb.title}
                        </span>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Complete Timeline Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => onFilterCollection(col.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium transition-all duration-200 py-1.5 px-3 rounded-lg border ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 border-white shadow-sm'
                      : 'text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {isActive ? (
                    <>
                      <span>currently viewing in timeline</span>
                      <span className="font-bold">✓</span>
                    </>
                  ) : (
                    <>
                      <span>complete timeline</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>

                <span className="text-[11px] font-mono text-zinc-400">
                  {col.itemCount} frames
                </span>
              </div>
            </section>
          );
        })}
      </div>
    </aside>
  );
};
