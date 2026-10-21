import React from 'react';
import Image from 'next/image';
import { ImageSlot } from './FitnessSection';

export interface ArtComposition {
  portrait: ImageSlot;
  landscapeLeft: ImageSlot;
  landscapeRight: ImageSlot;
}

/**
 * Three Art pieces arranged in a balanced composition:
 * - Top / center: 4:5 portrait artwork
 * - Bottom left: 5:4 landscape artwork
 * - Bottom right: 5:4 landscape artwork
 */
export const ART_PIECES: ArtComposition = {
  portrait: {
    src: '/art/Screenshot_20261012-170705_Instagram~2.webp',
    alt: 'Art - Angelic warrior sketch study',
  },
  landscapeLeft: {
    src: '/art/IMG_20231218_024947_208~4.webp',
    alt: 'Art - Pencil illustration study',
  },
  landscapeRight: {
    src: '/art/IMG_20251122_161501621_HDR_AE-EDIT.webp',
    alt: 'Art - Kimi no Na wa tribute sketch',
  },
};

export const ART_IMAGES: ImageSlot[] = [
  ART_PIECES.portrait,
  ART_PIECES.landscapeLeft,
  ART_PIECES.landscapeRight,
];

interface ArtSectionProps {
  className?: string;
}

export const ArtSection: React.FC<ArtSectionProps> = ({
  className = 'w-full select-none py-5 sm:py-7 md:py-9',
}) => {
  return (
    <section aria-label="Art" className={className}>
      <div className="content-container">
        {/* Restrained Section Heading */}
        <div className="mb-5 sm:mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#226192]">
            Everything is beautiful when you look at it with love.....
          </h2>
        </div>

        {/* Composition: Top Portrait Centered + Bottom Two Landscapes Side-by-Side */}
        <div className="w-full space-y-5 sm:space-y-6 md:space-y-7">
          {/* 1. Top / center: Portrait image in 4:5 container */}
          <div className="flex justify-center">
            <div className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-[#226192]/25 shadow-xs transition-transform duration-500 ease-out origin-center bg-[#EAE6DE] transform -rotate-[1deg] hover:rotate-0">
                <Image
                  src={ART_PIECES.portrait.src}
                  alt={ART_PIECES.portrait.alt}
                  fill
                  sizes="(max-width: 640px) 260px, 320px"
                  className="object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* 2. Bottom: Two landscape images in 5:4 containers side-by-side */}
          <div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:gap-7 items-center max-w-2xl mx-auto">
            {/* Bottom left */}
            <div className="w-full min-w-0">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-md border border-[#226192]/25 shadow-xs transition-transform duration-500 ease-out origin-center bg-[#EAE6DE] transform rotate-[1deg] hover:rotate-0">
                <Image
                  src={ART_PIECES.landscapeLeft.src}
                  alt={ART_PIECES.landscapeLeft.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, 320px"
                  className="object-contain p-1 sm:p-1.5"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bottom right */}
            <div className="w-full min-w-0">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-md border border-[#226192]/25 shadow-xs transition-transform duration-500 ease-out origin-center bg-[#EAE6DE] transform -rotate-[1deg] hover:rotate-0">
                <Image
                  src={ART_PIECES.landscapeRight.src}
                  alt={ART_PIECES.landscapeRight.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, 320px"
                  className="object-contain p-1 sm:p-1.5"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
