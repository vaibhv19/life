'use client';

import React, { useEffect } from 'react';
import { ArchiveItem } from '../types';
import { LikeButton } from './LikeButton';

interface LightboxModalProps {
  item: ArchiveItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && item) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#EDECE6]/95 backdrop-blur-md p-4 sm:p-8 select-none">
      {/* Backdrop click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Container: Cream Physical Surface */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#1546D9] text-[#EDECE6] border-2 border-[#1546D9] flex flex-col shadow-2xl overflow-hidden rounded-xs">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDECE6]/15 text-xs font-mono shrink-0 bg-[#1546D9] font-semibold">
          <div className="flex items-center gap-2.5">
            <span className="text-[#F9B318] font-bold">SPECIMEN VIEW</span>
            <span className="text-[#EDECE6]/30">/</span>
            <span className="text-[#EDECE6] font-bold">{item.collectionTitle}</span>
          </div>

          <button
            onClick={onClose}
            className="text-[#EDECE6] hover:text-[#F9B318] px-2.5 py-1 border border-[#EDECE6]/30 hover:border-[#F9B318] text-xs font-mono cursor-pointer transition-colors font-bold"
          >
            CLOSE [ESC] ✕
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#1546D9]">
          {/* Main Visual Display on Burgundy Inset Frame */}
          <div className="relative w-full aspect-[16/10] max-h-[460px] bg-[#EDECE6] border border-[#EDECE6]/40 p-6 sm:p-8 flex flex-col justify-between shadow-inner">
            {/* Corner registration marks in Dusty Pink */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#F9B318]" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#F9B318]" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#F9B318]" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#F9B318]" />

            <div className="flex items-center justify-between text-xs font-mono text-[#1546D9]/80">
              <span className="text-[#F9B318] font-bold">{item.metadata?.format || 'ARCHIVAL SPECIMEN'}</span>
              <span>{item.date}</span>
            </div>

            <div className="my-auto text-center py-6">
              <span className="text-xs font-mono text-[#F9B318] uppercase tracking-widest block mb-2 font-bold">
                {item.medium}
              </span>
              <h2 className="font-editorial-display text-2xl sm:text-4xl text-[#1546D9] max-w-xl mx-auto">
                &quot;{item.title}&quot;
              </h2>
              {item.location && (
                <span className="text-xs font-mono text-[#1546D9]/70 mt-2 block">
                  {item.location}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#1546D9]/80 pt-3 border-t border-[#1546D9]/15">
              <span>{item.metadata?.filmStock || item.metadata?.camera || '35mm Negative'}</span>
              <span>{item.coordinates || '28°38\'N 77°13\'E'}</span>
            </div>
          </div>

          {/* Narrative & Field Notes on Cream */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-editorial-display text-2xl text-[#EDECE6] font-semibold">
                {item.title}
              </h3>
              <p className="text-sm text-[#EDECE6]/90 font-sans leading-relaxed font-medium">
                {item.caption}
              </p>
              {item.notes && (
                <div className="bg-[#EDECE6] p-4 border border-[#EDECE6] rounded-xs space-y-1">
                  <span className="text-[10px] font-mono text-[#F9B318] uppercase block font-bold">
                    Author&apos;s Field Note:
                  </span>
                  <p className="text-xs font-mono text-[#1546D9] italic leading-relaxed">
                    {item.notes}
                  </p>
                </div>
              )}

              <div className="pt-2">
                <LikeButton itemId={item.id} itemType="entry" />
              </div>
            </div>

            {/* Technical Metadata Matrix */}
            <div className="md:col-span-5 bg-[#EDECE6] text-[#1546D9]/80 p-5 space-y-3 text-xs font-mono rounded-xs shadow-md">
              <span className="text-[10px] uppercase text-[#F9B318] tracking-wider block font-bold">
                TECHNICAL LOG
              </span>
              <div className="space-y-2 text-[#1546D9]/80">
                <div className="flex justify-between border-b border-[#1546D9]/10 pb-1">
                  <span className="text-[#1546D9]/60">Recorded:</span>
                  <span className="text-[#1546D9] font-semibold">{item.date}</span>
                </div>
                <div className="flex justify-between border-b border-[#1546D9]/10 pb-1">
                  <span className="text-[#1546D9]/60">Medium:</span>
                  <span className="text-[#F9B318] font-bold uppercase">{item.medium}</span>
                </div>
                {item.metadata?.camera && (
                  <div className="flex justify-between border-b border-[#1546D9]/10 pb-1">
                    <span className="text-[#1546D9]/60">Camera:</span>
                    <span className="text-[#1546D9]">{item.metadata.camera}</span>
                  </div>
                )}
                {item.metadata?.filmStock && (
                  <div className="flex justify-between border-b border-[#1546D9]/10 pb-1">
                    <span className="text-[#1546D9]/60">Emulsion:</span>
                    <span className="text-[#F9B318] font-medium">{item.metadata.filmStock}</span>
                  </div>
                )}
                {item.coordinates && (
                  <div className="flex justify-between border-b border-[#1546D9]/10 pb-1">
                    <span className="text-[#1546D9]/60">Coordinates:</span>
                    <span className="text-[#1546D9]">{item.coordinates}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
