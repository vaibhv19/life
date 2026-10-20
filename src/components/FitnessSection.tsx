import React from 'react';
import Image from 'next/image';

export interface ImageSlot {
  src: string;
  alt: string;
}

/**
 * Image slots for the Fitness section sourced from /fitness/.
 * Easily replace these 3 paths with final assets when ready.
 */
export const FITNESS_IMAGES: ImageSlot[] = [
  {
    src: '/fitness/IMG_20250708_121605976_HDR.jpg',
    alt: 'Fitness - Training and physical conditioning',
  },
  {
    src: '/fitness/VID_20250730_225359810_exported_22272.jpg',
    alt: 'Fitness - Movement and workout session',
  },
  {
    src: '/fitness/VID_20250730_225359810_exported_49473-EDIT.jpg',
    alt: 'Fitness - Strength and discipline',
  },
];

interface FitnessSectionProps {
  images?: ImageSlot[];
  className?: string;
}

const ROTATION_CLASSES = [
  'transform -rotate-[1.5deg] hover:rotate-0',
  'transform rotate-[1deg] hover:rotate-0',
  'transform -rotate-[1deg] hover:rotate-0',
];

export const FitnessSection: React.FC<FitnessSectionProps> = ({
  images = FITNESS_IMAGES,
  className = 'w-full select-none py-5 sm:py-7 md:py-9',
}) => {
  return (
    <section aria-label="Fitness" className={className}>
      <div className="content-container">
        {/* Restrained Section Heading */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#226192]">
            I have not met all of me yet.......
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 md:gap-7 items-center">
          {images.map((slot, index) => (
            <div
              key={slot.src + index}
              className="w-full max-w-[240px] sm:max-w-none mx-auto"
            >
              <div
                className={`relative aspect-[3/4] w-full overflow-hidden rounded-md border border-[#226192]/25 shadow-xs transition-transform duration-500 ease-out origin-center bg-[#EAE6DE] ${ROTATION_CLASSES[index % ROTATION_CLASSES.length]}`}
              >
                <Image
                  src={slot.src}
                  alt={slot.alt}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 33vw, 240px"
                  className="object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
