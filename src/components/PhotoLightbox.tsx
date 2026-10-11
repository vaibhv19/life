'use client';

import React, { useEffect } from 'react';
import { LikeButton } from './LikeButton';

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1546D9]/90 backdrop-blur-md p-4 sm:p-6 lg:p-10 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative z-10 max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#EDECE6] border border-[#1546D9]/30 shadow-2xl overflow-hidden"
        style={{ borderRadius: '16px 4px 18px 6px / 6px 16px 6px 14px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-[#1546D9]/20 text-xs text-[#1546D9]/80 shrink-0">
          <div className="flex items-center gap-3">
            {photo.formattedDate && (
              <span className="font-semibold text-[#F9B318] tracking-wide">
                {photo.formattedDate}
              </span>
            )}
            {photo.collectionTitle && (
              <>
                <span className="text-[#1546D9]/30">/</span>
                <span className="text-[#1546D9]/90">{photo.collectionTitle}</span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-[#1546D9]/80 hover:text-[#2E5DE8] hover:border-[#F9B318] px-2.5 py-1 text-xs border border-[#1546D9]/20 transition-colors cursor-pointer"
            style={{ borderRadius: '8px 2px 8px 2px' }}
          >
            Close [Esc] ✕
          </button>
        </div>

        {/* Large photo container */}
        <div className="relative flex-1 min-h-[300px] max-h-[70vh] flex items-center justify-center p-3 sm:p-6 bg-[#E2E1DA]/40">
          <div className="relative w-full h-full max-h-[66vh] flex items-center justify-center">
            {/* Corner registration accents in Dusty Pink */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#F9B318]/70 pointer-events-none" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#F9B318]/70 pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#F9B318]/70 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#F9B318]/70 pointer-events-none" />

            <img
              src={photo.src}
              alt={photo.title || photo.caption || photo.formattedDate || 'Archival photograph'}
              className="max-h-[64vh] max-w-full object-contain mx-auto shadow-lg"
              loading="eager"
            />
          </div>
        </div>

        {/* Specimen details & Like component footer */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-[#1546D9]/15 bg-[#EDECE6]/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="min-w-0 flex-1">
            {photo.title && (
              <h3 className="text-sm sm:text-base font-semibold text-[#1546D9] mb-0.5 truncate">
                {photo.title}
              </h3>
            )}
            {photo.caption && (
              <p className="text-xs text-[#1546D9]/80 leading-relaxed font-normal">
                {photo.caption}
              </p>
            )}
            {!photo.title && !photo.caption && (
              <p className="text-xs text-[#1546D9]/60 font-mono">
                ARCHIVAL SPECIMEN {photo.formattedDate ? `// ${photo.formattedDate}` : ''}
              </p>
            )}
          </div>

          <div className="shrink-0 self-start sm:self-center">
            <LikeButton itemId={photo.src} itemType="photo" />
          </div>
        </div>
      </div>
    </div>
  );
};
