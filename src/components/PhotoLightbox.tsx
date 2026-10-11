'use client';

import React, { useEffect } from 'react';

export interface PhotoSpecimen {
  src: string;
  formattedDate?: string;
  title?: string;
  caption?: string;
  collectionTitle?: string;
}

interface PhotoLightboxProps {
  photo: PhotoSpecimen | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photo, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && photo) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#160608]/90 backdrop-blur-md p-4 sm:p-6 lg:p-10 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative z-10 max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#722F37] border border-[#F8F4E7]/30 shadow-2xl overflow-hidden"
        style={{ borderRadius: '16px 4px 18px 6px / 6px 16px 6px 14px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-[#F8F4E7]/20 text-xs text-[#F8F4E7]/80 shrink-0">
          <div className="flex items-center gap-3">
            {photo.formattedDate && (
              <span className="font-semibold text-[#D7A781] tracking-wide">
                {photo.formattedDate}
              </span>
            )}
            {photo.collectionTitle && (
              <>
                <span className="text-[#F8F4E7]/30">/</span>
                <span className="text-[#F8F4E7]/90">{photo.collectionTitle}</span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-[#F8F4E7]/80 hover:text-[#FFFDF7] hover:border-[#D7A781] px-2.5 py-1 text-xs border border-[#F8F4E7]/20 transition-colors cursor-pointer"
            style={{ borderRadius: '8px 2px 8px 2px' }}
          >
            Close [Esc] ✕
          </button>
        </div>

        {/* Large photo container */}
        <div className="relative flex-1 min-h-[300px] max-h-[70vh] flex items-center justify-center p-3 sm:p-6 bg-[#160608]/40">
          <div className="relative w-full h-full max-h-[66vh] flex items-center justify-center">
            {/* Corner registration accents in Dusty Pink */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#D7A781]/70 pointer-events-none" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#D7A781]/70 pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#D7A781]/70 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#D7A781]/70 pointer-events-none" />

            <img
              src={photo.src}
              alt={photo.title || photo.caption || photo.formattedDate || 'Archival photograph'}
              className="max-h-[64vh] max-w-full object-contain mx-auto shadow-lg"
              loading="eager"
            />
          </div>
        </div>

        {/* Optional caption footer */}
        {(photo.title || photo.caption) && (
          <div className="px-6 py-4 border-t border-[#F8F4E7]/15 bg-[#722F37]/80">
            {photo.title && (
              <h3 className="text-base sm:text-lg font-semibold text-[#F8F4E7] mb-1">
                {photo.title}
              </h3>
            )}
            {photo.caption && (
              <p className="text-xs sm:text-sm text-[#F8F4E7]/80 leading-relaxed font-normal">
                {photo.caption}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
