'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CatalogCollectionDef, CatalogImageEntry, TravelLocationNode } from '@/data/catalog';
import { PhotoLightbox, PhotoSpecimen } from '@/components/PhotoLightbox';

interface CatalogCollectionViewProps {
  collection: CatalogCollectionDef;
  items: CatalogImageEntry[];
  travelLocations?: TravelLocationNode[];
}

export const CatalogCollectionView: React.FC<CatalogCollectionViewProps> = ({
  collection,
  items,
  travelLocations = [],
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoSpecimen | null>(null);
  const [selectedTravelPath, setSelectedTravelPath] = useState<string[]>([]);

  const isTravel = collection.id === 'travel';

  // Filter items by travel path if selected
  const displayedItems = isTravel && selectedTravelPath.length > 0
    ? items.filter((item) => {
        if (!item.travelPath) return false;
        return selectedTravelPath.every((seg, i) =>
          item.travelPath?.[i]?.toLowerCase() === seg.toLowerCase()
        );
      })
    : items;

  return (
    <div className="w-full flex flex-col">
      {/* Return to Catalog Index Navigation */}
      <div className="mb-8">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#EF8557] hover:text-[#2C7BB8] transition-colors"
        >
          <span>←</span>
          <span>Return to Catalog Index</span>
        </Link>
      </div>

      {/* Collection Header */}
      <header className="border-b border-[#226192]/20 pb-8 mb-10">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#EF8557] mb-2 font-mono">
          <span>COLLECTION // {collection.numeral}</span>
          <span className="text-[#226192]/40">·</span>
          <span>{displayedItems.length} {displayedItems.length === 1 ? 'FRAME' : 'FRAMES'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#226192] mb-3">
          {collection.title}
        </h1>

        <p className="text-xs sm:text-sm text-[#226192]/70 max-w-2xl font-normal leading-relaxed">
          {collection.description}
        </p>

        {/* Travel Location Filter / Breadcrumb (Data-driven hierarchy) */}
        {isTravel && travelLocations.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#226192]/15">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#EF8557] mb-3 font-semibold">
              GEOGRAPHIC SUBCOLLECTIONS
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedTravelPath([])}
                className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer rounded-xs border ${
                  selectedTravelPath.length === 0
                    ? 'btn-palette-b border-[#EF8557] font-semibold'
                    : 'bg-transparent text-[#226192]/70 border-[#226192]/25 hover:border-[#EF8557] hover:text-[#226192]'
                }`}
              >
                All Destinations
              </button>

              {travelLocations.map((loc) => {
                const isSelected = selectedTravelPath[0]?.toLowerCase() === loc.name.toLowerCase();
                return (
                  <button
                    key={loc.name}
                    onClick={() => setSelectedTravelPath([loc.name])}
                    className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer rounded-xs border ${
                      isSelected
                        ? 'btn-palette-b border-[#EF8557] font-semibold'
                        : 'bg-transparent text-[#226192]/70 border-[#226192]/25 hover:border-[#EF8557] hover:text-[#226192]'
                    }`}
                  >
                    {loc.name}
                  </button>
                );
              })}
            </div>

            {/* Nested Second Level (e.g. States / Cities) if available */}
            {selectedTravelPath.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-[#226192]/50 uppercase">Region:</span>
                {travelLocations
                  .find((l) => l.name.toLowerCase() === selectedTravelPath[0]?.toLowerCase())
                  ?.children?.map((child) => {
                    const isChildSelected = selectedTravelPath[1]?.toLowerCase() === child.name.toLowerCase();
                    return (
                      <button
                        key={child.name}
                        onClick={() => setSelectedTravelPath([selectedTravelPath[0], child.name])}
                        className={`px-2.5 py-1 text-xs transition-colors cursor-pointer rounded-xs border ${
                          isChildSelected
                            ? 'btn-palette-b border-[#EF8557] font-semibold'
                            : 'bg-[#226192]/[0.04] text-[#226192]/70 border-[#226192]/20 hover:text-[#226192]'
                        }`}
                      >
                        {child.name}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Collection Content: Empty State vs Images Grid */}
      {displayedItems.length === 0 ? (
        <div className="w-full py-16 px-4 text-center select-none">
          <div
            className="max-w-md mx-auto border border-dashed border-[#226192]/25 p-10 sm:p-14"
            style={{ borderRadius: '18px 4px 18px 4px' }}
          >
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#EF8557] mb-3">
              EMPTY COLLECTION
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#226192] mb-3">
              No memories curated here yet.
            </h2>
            <p className="text-xs sm:text-sm text-[#226192]/70 leading-relaxed font-normal">
              {isTravel
                ? 'Photographs and travel coordinates will be added through the data configuration without altering components.'
                : `Photographs can be assigned to ${collection.title} via the project's data configuration.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayedItems.map((item) => (
            <article
              key={item.id}
              onClick={() =>
                setSelectedPhoto({
                  src: item.src,
                  formattedDate: item.date,
                  title: item.title,
                  caption: item.caption,
                  collectionTitle: collection.title,
                })
              }
              className="group cursor-pointer select-none"
            >
              <div
                className="overflow-hidden bg-[#DFDBD3]/40 border border-[#226192]/25 group-hover:border-[#EF8557] transition-colors p-2.5 shadow-md"
                style={{ borderRadius: '14px 4px 16px 4px' }}
              >
                <div className="relative w-full overflow-hidden bg-[#EAE6DE]/40 aspect-[4/3]">
                  <img
                    src={item.src}
                    alt={item.title || `Photograph from ${collection.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-[#160608]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span
                      className="btn-palette-b px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest shadow-lg"
                      style={{ borderRadius: '10px 3px 12px 3px' }}
                    >
                      Inspect ↗
                    </span>
                  </div>
                </div>

                <div className="pt-3 pb-1 px-1 flex items-center justify-between text-xs text-[#226192]/80">
                  <span className="font-semibold text-[#226192] group-hover:text-[#EF8557] transition-colors">
                    {item.title || item.date || 'Specimen'}
                  </span>
                  {item.date && item.title && (
                    <span className="text-[11px] text-[#226192]/60 font-mono">
                      {item.date}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Lightbox for large viewing */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
};
