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
    <section className="relative w-full py-12 sm:py-20 border-b border-[#F8F4E7]/20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-[#F8F4E7]/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D7A781] uppercase tracking-wider mb-2 font-bold">
              <span>03</span>
              <span className="text-[#F8F4E7]/40">/</span>
              <span>CHRONOLOGICAL STREAM</span>
            </div>
            <h2 className="font-editorial-display text-3xl sm:text-4xl text-[#F8F4E7] font-normal">
              Chronology & Field Records
            </h2>
          </div>

          <div className="text-xs font-mono text-[#F8F4E7]/80">
            TEMPORAL RECORD — 2025
          </div>
        </div>

        {/* Typographic Architectural Timeline */}
        <div className="space-y-16 sm:space-y-24 pt-10 sm:pt-14">
          {grouped.map(([period, periodItems]) => (
            <div key={period} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              {/* Asymmetric Margin Period Indicator */}
              <div className="lg:col-span-3 sticky top-24 pt-2">
                <div className="border-t-2 border-[#D7A781] pt-3">
                  <span className="text-xs font-mono text-[#D7A781] uppercase tracking-widest block mb-1 font-bold">
                    PERIOD
                  </span>
                  <h3 className="font-editorial-display text-2xl sm:text-3xl text-[#F8F4E7]">
                    {period}
                  </h3>
                  <span className="text-[11px] font-mono text-[#F8F4E7]/80 mt-1 block">
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
                    className="group border-b border-[#F8F4E7]/20 pb-8 sm:pb-10 last:border-b-0 cursor-pointer"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Left Details: Date, Location, Title, Note */}
                      <div className="md:col-span-7 space-y-3">
                        <div className="flex items-center gap-3 text-xs font-mono text-[#F8F4E7]/80">
                          <span className="text-[#F8F4E7] font-semibold">{item.date}</span>
                          <span className="text-[#F8F4E7]/40">/</span>
                          <span className="text-[#D7A781] font-medium">{item.collectionTitle}</span>
                        </div>

                        <h4 className="font-editorial-display text-xl sm:text-2xl text-[#F8F4E7] group-hover:text-[#D7A781] transition-colors">
                          {item.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-[#F8F4E7]/80 font-sans leading-relaxed">
                          {item.caption}
                        </p>

                        {item.notes && (
                          <div className="text-xs text-[#F8F4E7] font-mono border-l-2 border-[#D7A781] pl-3 py-1 mt-2 italic bg-[#F8F4E7]/10">
                            {item.notes}
                          </div>
                        )}

                        {item.location && (
                          <div className="text-[11px] font-mono text-[#F8F4E7]/70 pt-1">
                            LOC: {item.location}
                          </div>
                        )}
                      </div>

                      {/* Right Visual Frame Preview: Physical Cream Plate */}
                      <div className="md:col-span-5">
                        <div className={`w-full ${item.aspectRatio} max-h-[220px] bg-[#F8F4E7] border-2 border-[#F8F4E7] group-hover:border-[#D7A781] p-3 flex flex-col justify-between transition-all rounded-xs shadow-md`}>
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#722F37] font-semibold">
                            <span className="text-[#D7A781] font-bold">{item.medium.toUpperCase()}</span>
                            <span>{item.metadata?.camera || 'ARCHIVE'}</span>
                          </div>

                          <div className="text-center py-2 px-1">
                            <span className="font-editorial-italic text-sm text-[#722F37] font-semibold">
                              "{item.title}"
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono text-[#722F37] pt-1 border-t border-[#722F37]/15 font-medium">
                            <span>{item.coordinates || '28°N'}</span>
                            <span className="text-[#D7A781] font-bold">INSPECT ↗</span>
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
      </div>
    </section>
  );
};
