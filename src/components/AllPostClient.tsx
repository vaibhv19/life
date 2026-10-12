'use client';

import React, { useState, useMemo } from 'react';
import { ArchivePost } from '@/lib/posts';
import { PhotoLightbox, PhotoSpecimen } from '@/components/PhotoLightbox';

interface AllPostClientProps {
  posts: ArchivePost[];
}

export const AllPostClient: React.FC<AllPostClientProps> = ({ posts }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoSpecimen | null>(null);

  // Group posts chronologically by Month & Year for clear editorial hierarchy
  const groupedPosts = useMemo(() => {
    const groups: { label: string; year: number; items: ArchivePost[] }[] = [];
    const map = new Map<string, ArchivePost[]>();

    posts.forEach((post) => {
      const key = post.monthYear;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(post);
    });

    map.forEach((items, label) => {
      groups.push({
        label,
        year: items[0].year,
        items,
      });
    });

    return groups;
  }, [posts]);

  return (
    <>
      {posts.length === 0 ? (
        <div className="w-full py-20 px-4 text-center select-none">
          <div className="max-w-md mx-auto border border-dashed border-[#226192]/25 p-10 sm:p-14"
            style={{ borderRadius: '18px 4px 18px 4px' }}
          >
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#EF8557] mb-3">
              EMPTY ARCHIVE
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#226192] mb-3">
              No photographs recorded yet.
            </h2>
            <p className="text-xs sm:text-sm text-[#226192]/70 leading-relaxed font-normal">
              Photographs named using the <code className="text-[#EF8557] font-mono">YYYY-MM-DD.ext</code> convention
              placed in the <code className="text-[#EF8557] font-mono">public/archive/</code> directory will appear automatically upon rebuild.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-16 sm:space-y-24">
          {groupedPosts.map((group) => (
            <section key={group.label} className="space-y-8">
              {/* Chronological Section Indicator */}
              <div className="flex items-baseline justify-between border-b border-[#226192]/20 pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#226192]">
                    {group.label}
                  </span>
                  <span className="text-xs text-[#EF8557] font-mono font-medium">
                    {'//'} {group.items.length} {group.items.length === 1 ? 'FRAME' : 'FRAMES'}
                  </span>
                </div>
                <span className="text-xs text-[#226192]/50 font-mono">
                  {group.year}
                </span>
              </div>

              {/* Centered Single-Column Editorial Photo Stream */}
              <div className="space-y-8 sm:space-y-10">
                {group.items.map((item) => (
                  <article
                    key={item.id}
                    onClick={() =>
                      setSelectedPhoto({
                        src: item.src,
                        formattedDate: item.formattedDate,
                        title: item.title,
                        caption: item.caption,
                      })
                    }
                    className="group cursor-pointer transition-all duration-300 relative select-none"
                  >
                    {/* Photo Container Frame with Tactile Editorial Border */}
                    <div
                      className="relative overflow-hidden bg-[#DFDBD3]/40 border border-[#226192]/25 group-hover:border-[#EF8557] transition-colors p-2.5 sm:p-3 shadow-md"
                      style={{ borderRadius: '14px 4px 16px 4px / 6px 14px 5px 12px' }}
                    >
                      <div className="relative w-full overflow-hidden bg-[#EAE6DE]/40 aspect-[4/3] sm:aspect-[16/10]">
                        <img
                          src={item.src}
                          alt={item.title || `Archive photograph from ${item.formattedDate}`}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                          loading="lazy"
                        />

                        {/* Hover inspection pill */}
                        <div className="absolute inset-0 bg-[#160608]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span
                            className="btn-palette-b px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest shadow-lg"
                            style={{ borderRadius: '12px 3px 14px 3px' }}
                          >
                            Inspect ↗
                          </span>
                        </div>
                      </div>

                      {/* Date & Meta Caption */}
                      <div className="pt-3 pb-1 px-1 flex items-center justify-between text-xs text-[#226192]/80">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#226192] tracking-tight group-hover:text-[#EF8557] transition-colors">
                            {item.formattedDate}
                          </span>
                          {item.title && (
                            <>
                              <span className="text-[#226192]/40">·</span>
                              <span className="text-[#226192]/90">{item.title}</span>
                            </>
                          )}
                        </div>
                        {item.suffix && (
                          <span className="text-[10px] font-mono text-[#EF8557] uppercase tracking-wider">
                            #{item.suffix}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  );
};
