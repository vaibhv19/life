'use client';

import React from 'react';
import { ArchiveItem } from '../types';

interface ChronologicalStreamProps {
  items: ArchiveItem[];
  onSelectItem: (item: ArchiveItem) => void;
}

export const ChronologicalStream: React.FC<ChronologicalStreamProps> = ({
  items,
  onSelectItem,
}) => {
  // Group items by Month/Year
  const grouped = React.useMemo(() => {
    const map = new Map<string, ArchiveItem[]>();
    items.forEach((item) => {
      const key = `${item.month} ${item.year}`;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(item);
    });
    return Array.from(map.entries());
  }, [items]);

  return (
    <section className="relative w-full pt-12 sm:pt-20 pb-4 sm:pb-6">
      <div className="content-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-[#EF8557]/25">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#EF8557] uppercase tracking-wider mb-2 font-bold">
              <span>03</span>
              <span className="text-[#226192]/40">/</span>
              <span>CHRONOLOGICAL STREAM</span>
            </div>
            <h2 className="font-editorial-display text-3xl sm:text-4xl text-[#226192] font-normal">
              Chronology & Field Records
            </h2>
          </div>

          <div className="text-xs font-mono text-[#226192]/80">
            TEMPORAL RECORD — 2025
          </div>
        </div>

        {/* Typographic Architectural Timeline */}
        <div className="space-y-16 sm:space-y-24 pt-10 sm:pt-14">
          {grouped.map(([period, periodItems]) => (
            <div key={period} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              {/* Asymmetric Margin Period Indicator */}
              <div className="lg:col-span-3 sticky top-24 pt-2">
                <div className="border-t-2 border-[#EF8557] pt-3">
                  <span className="text-xs font-mono text-[#EF8557] uppercase tracking-widest block mb-1 font-bold">
                    PERIOD
                  </span>
                  <h3 className="font-editorial-display text-2xl sm:text-3xl text-[#226192]">
                    {period}
                  </h3>
                  <span className="text-[11px] font-mono text-[#226192]/80 mt-1 block">
                    {periodItems.length} {periodItems.length === 1 ? 'entry recorded' : 'entries recorded'}
                  </span>
                </div>
              </div>

              {/* Chronological Entries Feed */}
              <div className="lg:col-span-9 space-y-10 sm:space-y-12">
                {periodItems.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className="group border-b border-[#EF8557]/20 pb-8 sm:pb-10 last:border-b-0 cursor-pointer"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Left Details: Date, Location, Title, Note */}
                      <div className="md:col-span-7 space-y-3">
                        <div className="flex items-center gap-3 text-xs font-mono text-[#226192]/80">
                          <span className="text-[#226192] font-semibold">{item.date}</span>
                          <span className="text-[#226192]/40">/</span>
                          <span className="text-[#EF8557] font-medium">{item.collectionTitle}</span>
                        </div>

                        <h4 className="font-editorial-display text-xl sm:text-2xl text-[#226192] group-hover:text-[#EF8557] transition-colors">
                          {item.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-[#226192]/80 font-sans leading-relaxed">
                          {item.caption}
                        </p>

                        {item.notes && (
                          <div className="text-xs text-[#226192] font-mono border-l-2 border-[#EF8557] pl-3 py-1 mt-2 italic bg-[#226192]/10">
                            {item.notes}
                          </div>
                        )}

                        {item.location && (
                          <div className="text-[11px] font-mono text-[#226192]/70 pt-1">
                            LOC: {item.location}
                          </div>
                        )}
                      </div>

                      {/* Right Visual Frame Preview: Physical Cream Plate */}
                      <div className="md:col-span-5">
                        <div className={`w-full ${item.aspectRatio} max-h-[220px] bg-[#226192] border-2 border-[#226192] group-hover:border-[#EF8557] p-3 flex flex-col justify-between transition-all rounded-xs shadow-md`}>
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#EAE6DE] font-semibold">
                            <span className="text-[#EF8557] font-bold">{item.medium.toUpperCase()}</span>
                            <span>{item.metadata?.camera || 'ARCHIVE'}</span>
                          </div>

                          <div className="text-center py-2 px-1">
                            <span className="font-editorial-italic text-sm text-[#EAE6DE] font-semibold">
                              &quot;{item.title}&quot;
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono text-[#EAE6DE] pt-1 border-t border-[#EAE6DE]/15 font-medium">
                            <span>{item.coordinates || '28°N'}</span>
                            <span className="text-[#EF8557] font-bold">INSPECT ↗</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section separator aligned with content width */}
        <div className="content-divider mt-12 sm:mt-16" />
      </div>
    </section>
  );
};
