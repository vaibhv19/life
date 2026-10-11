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
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#D7A781] hover:text-[#FFFDF7] transition-colors"
        >
          <span>←</span>
          <span>Return to Catalog Index</span>
        </Link>
      </div>

      {/* Collection Header */}
      <header className="border-b border-[#F8F4E7]/20 pb-8 mb-10">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-2 font-mono">
          <span>COLLECTION // {collection.numeral}</span>
          <span className="text-[#F8F4E7]/40">·</span>
          <span>{displayedItems.length} {displayedItems.length === 1 ? 'FRAME' : 'FRAMES'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F4E7] mb-3">
          {collection.title}
        </h1>

        <p className="text-xs sm:text-sm text-[#F8F4E7]/70 max-w-2xl font-normal leading-relaxed">
          {collection.description}
        </p>

        {/* Travel Location Filter / Breadcrumb (Data-driven hierarchy) */}
        {isTravel && travelLocations.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#F8F4E7]/15">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#D7A781] mb-3 font-semibold">
              GEOGRAPHIC SUBCOLLECTIONS
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedTravelPath([])}
                className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer rounded-xs border ${
                  selectedTravelPath.length === 0
                    ? 'bg-[#F8F4E7] text-[#722F37] border-[#F8F4E7] font-semibold'
                    : 'bg-transparent text-[#F8F4E7]/70 border-[#F8F4E7]/25 hover:border-[#D7A781] hover:text-[#F8F4E7]'
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
                        ? 'bg-[#F8F4E7] text-[#722F37] border-[#F8F4E7] font-semibold'
                        : 'bg-transparent text-[#F8F4E7]/70 border-[#F8F4E7]/25 hover:border-[#D7A781] hover:text-[#F8F4E7]'
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
                <span className="text-[10px] font-mono text-[#F8F4E7]/50 uppercase">Region:</span>
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
                            ? 'bg-[#D7A781] text-[#722F37] border-[#D7A781] font-semibold'
                            : 'bg-[#F8F4E7]/[0.04] text-[#F8F4E7]/70 border-[#F8F4E7]/20 hover:text-[#F8F4E7]'
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
            className="max-w-md mx-auto border border-dashed border-[#F8F4E7]/25 p-10 sm:p-14"
            style={{ borderRadius: '18px 4px 18px 4px' }}
          >
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-3">
              EMPTY COLLECTION
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F8F4E7] mb-3">
              No memories curated here yet.
            </h2>
            <p className="text-xs sm:text-sm text-[#F8F4E7]/70 leading-relaxed font-normal">
              {isTravel
                ? 'Photographs and travel coordinates will be added through the data configuration without altering components.'
                : `Photographs can be assigned to ${collection.title} via the project's data configuration.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                className="overflow-hidden bg-[#160608]/40 border border-[#F8F4E7]/25 group-hover:border-[#D7A781] transition-colors p-2.5 shadow-md"
                style={{ borderRadius: '14px 4px 16px 4px' }}
              >
                <div className="relative w-full overflow-hidden bg-[#722F37]/40 aspect-[4/3]">
                  <img
                    src={item.src}
                    alt={item.title || `Photograph from ${collection.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-[#160608]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span
                      className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest bg-[#F8F4E7] text-[#722F37] shadow-lg"
                      style={{ borderRadius: '10px 3px 12px 3px' }}
                    >
                      Inspect ↗
                    </span>
                  </div>
                </div>

                <div className="pt-3 pb-1 px-1 flex items-center justify-between text-xs text-[#F8F4E7]/80">
                  <span className="font-semibold text-[#F8F4E7] group-hover:text-[#D7A781] transition-colors">
                    {item.title || item.date || 'Specimen'}
                  </span>
                  {item.date && item.title && (
                    <span className="text-[11px] text-[#F8F4E7]/60 font-mono">
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
