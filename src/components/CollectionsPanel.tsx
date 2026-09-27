'use client';

import React from 'react';
import { Collection, LightboxData } from '../types';

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
      <aside className="relative z-20 border-r border-zinc-800 bg-zinc-950 flex flex-col items-center py-6 px-2 w-12 shrink-0 select-none">
        {/* Re-expand button */}
        <button
          onClick={onToggleCollapse}
          className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 flex items-center justify-center transition-colors text-xs font-mono"
          title="Expand collections panel"
          aria-label="Expand collections panel"
        >
          →
        </button>

        {/* Vertical rotated text */}
        <div
          className="mt-8 [writing-mode:vertical-rl] rotate-180 flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
          onClick={onToggleCollapse}
        >
          <span className="font-mono text-xs uppercase tracking-widest">collections</span>
          <span className="text-[11px] font-mono text-zinc-600">({collections.length})</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="relative z-10 w-full md:w-[460px] lg:w-[500px] shrink-0 border-r border-zinc-800/80 bg-zinc-950 flex flex-col h-full overflow-hidden">
      {/* Panel Top Header */}
      <div className="sticky top-0 z-20 bg-zinc-950 px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            collections
          </h2>
          <span className="text-xs font-mono text-zinc-600">
            ({collections.length})
          </span>
        </div>

        {/* Collapse button at boundary */}
        <button
          onClick={onToggleCollapse}
          className="w-6 h-6 rounded bg-transparent hover:bg-zinc-900 text-zinc-500 hover:text-zinc-200 flex items-center justify-center transition-colors text-xs font-mono"
          title="Collapse collections panel"
          aria-label="Collapse collections panel"
        >
          ✕
        </button>
      </div>

      {/* Independently scrolling collection list */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-12">
        {collections.map((col) => {
          const isActive = activeCollectionId === col.id;

          return (
            <section
              key={col.id}
              className={`space-y-3 pb-8 border-b border-zinc-900 last:border-b-0 ${
                isActive ? 'opacity-100' : 'opacity-85 hover:opacity-100'
              } transition-opacity`}
            >
              {/* Collection Header */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
                  <span>SERIES {col.indexNumber}</span>
                  <span>{col.dateRange}</span>
                </div>
                <h3 className="text-base font-normal text-zinc-100 tracking-tight">
                  {col.title}
                </h3>
                <p className="text-xs text-zinc-400 font-normal mt-1 leading-relaxed">
                  {col.description}
                </p>
              </div>

              {/* Asymmetric Photo-Grid */}
              <div className="grid grid-cols-3 gap-2 auto-rows-[90px] sm:auto-rows-[100px] pt-1">
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
                    className={`group relative overflow-hidden rounded bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-600 cursor-pointer transition-colors p-2.5 flex flex-col justify-between ${thumb.gridSpan}`}
                  >
                    <div className="text-[10px] font-mono text-zinc-500 truncate">
                      {thumb.location || thumb.date}
                    </div>

                    <div className="truncate">
                      <span className="text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors block truncate">
                        {thumb.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Collection lens toggle */}
              <div className="pt-1 flex items-center justify-between">
                <button
                  onClick={() => onFilterCollection(col.id)}
                  className={`text-xs font-mono transition-colors ${
                    isActive
                      ? 'text-zinc-100 underline underline-offset-4'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {isActive ? 'viewing in timeline ✓' : 'view collection in timeline →'}
                </button>

                <span className="text-[11px] font-mono text-zinc-600">
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
