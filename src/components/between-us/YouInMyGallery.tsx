'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SectionHeadingBadge } from './SectionHeadingBadge';

export interface CandidMediaItem {
  id: string;
  src: string;
  type?: 'image' | 'video';
  alt?: string;
}

/**
 * Data-driven media collection for You in My Gallery.
 * Newly added candid or memorable images/videos will automatically be
 * distributed across the four cycling media windows.
 */
export const YOU_IN_MY_GALLERY_DATA: CandidMediaItem[] = [
  {
    id: 'candid-1',
    src: '/archive/Screenshot_20261012-170751_Instagram~2.jpg',
    type: 'image',
    alt: 'Candid memory 1',
  },
  {
    id: 'candid-2',
    src: '/archive/Screenshot_20261012-170936_Instagram~2.jpg',
    type: 'image',
    alt: 'Candid memory 2',
  },
  {
    id: 'candid-3',
    src: '/archive/Screenshot_20261012-170535_Instagram~2.jpg',
    type: 'image',
    alt: 'Candid memory 3',
  },
  {
    id: 'candid-4',
    src: '/archive/Screenshot_20261012-170421_Instagram~2.jpg',
    type: 'image',
    alt: 'Candid memory 4',
  },
  {
    id: 'candid-5',
    src: '/archive/Screenshot_20261012-170705_Instagram~2.jpg',
    type: 'image',
    alt: 'Candid memory 5',
  },
  {
    id: 'candid-6',
    src: '/archive/Screenshot_20261012-170849_Instagram~2.jpg',
    type: 'image',
    alt: 'Candid memory 6',
  },
];

/**
 * Distributes all available media items evenly across the target number of windows.
 * Extra items are allocated sequentially across windows so all buckets stay balanced.
 */
function distributeMedia(items: CandidMediaItem[], windowCount = 4): CandidMediaItem[][] {
  const buckets: CandidMediaItem[][] = Array.from({ length: windowCount }, () => []);
  if (!items || items.length === 0) return buckets;

  items.forEach((item, index) => {
    buckets[index % windowCount].push(item);
  });

  return buckets;
}

const IMAGE_DURATION_MS = 1750;

/**
 * Single media window that independently cycles through its assigned media files.
 * Contains only the media itself, free of any text, captions, or hover animations.
 */
const CyclingMediaWindow: React.FC<{
  mediaList: CandidMediaItem[];
  windowIndex: number;
}> = ({ mediaList, windowIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isInitialMount = React.useRef(true);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const advance = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % mediaList.length);
  }, [mediaList.length]);

  const currentItem = mediaList[currentIndex];
  const isVideo =
    currentItem?.type === 'video' ||
    currentItem?.src.endsWith('.mp4') ||
    currentItem?.src.endsWith('.webm');

  // Handle automatic cycling timing
  useEffect(() => {
    if (mediaList.length <= 1) return;

    // For videos: playback advances when the video triggers onEnded
    if (isVideo) {
      return;
    }

    // For images: consistent interval of approximately 1.75s (1750ms).
    // Initial mount delay is staggered slightly per window so windows cycle independently.
    const delay = isInitialMount.current
      ? IMAGE_DURATION_MS + (windowIndex % 4) * 350
      : IMAGE_DURATION_MS;

    isInitialMount.current = false;

    const timer = setTimeout(() => {
      advance();
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, isVideo, mediaList.length, windowIndex, advance]);

  // Ensure active video resets and plays when it becomes the active item
  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex, isVideo]);

  if (!mediaList || mediaList.length === 0) {
    return null;
  }

  return (
    <div
      className="border border-[#226192]/20 bg-[#226192]/[0.02] p-2 sm:p-2.5 overflow-hidden"
      style={{ borderRadius: '16px 5px 18px 6px' }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-[#226192]/10">
        {mediaList.map((item, idx) => {
          const isActive = idx === currentIndex;
          const isItemVideo =
            item.type === 'video' ||
            item.src.endsWith('.mp4') ||
            item.src.endsWith('.webm');

          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {isItemVideo ? (
                <video
                  ref={isActive ? videoRef : null}
                  src={item.src}
                  autoPlay
                  muted
                  playsInline
                  onEnded={isActive ? advance : undefined}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt || ''}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  priority={windowIndex === 0 && idx === 0}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const YouInMyGallery: React.FC = () => {
  // If fewer than 4 files exist, display only the available windows without duplicate slots
  const targetWindowCount = Math.min(4, Math.max(1, YOU_IN_MY_GALLERY_DATA.length));
  const distributedBuckets = distributeMedia(YOU_IN_MY_GALLERY_DATA, targetWindowCount);
  const activeWindows = distributedBuckets.filter((bucket) => bucket.length > 0);

  return (
    <section className="w-full">
      <SectionHeadingBadge>You in My Gallery</SectionHeadingBadge>

      {/* Exactly four-column responsive media windows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {activeWindows.map((mediaList, idx) => (
          <CyclingMediaWindow
            key={`candid-window-${idx}`}
            mediaList={mediaList}
            windowIndex={idx}
          />
        ))}
      </div>
    </section>
  );
};
