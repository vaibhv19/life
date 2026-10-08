'use client';

import React, { useEffect } from 'react';
import { ArchiveItem } from '../types';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B1E4A]/95 backdrop-blur-md p-4 sm:p-8 select-none">
      {/* Backdrop click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Container: Warm Stone Grey Physical Surface */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#AFAEA2] text-[#1B1E4A] border-2 border-[#AFAEA2] flex flex-col shadow-2xl overflow-hidden rounded-xs">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B1E4A]/15 text-xs font-mono shrink-0 bg-[#AFAEA2] font-semibold">
          <div className="flex items-center gap-2.5">
            <span className="text-[#D21319] font-bold">SPECIMEN VIEW</span>
            <span className="text-[#1B1E4A]/30">/</span>
            <span className="text-[#1B1E4A] font-bold">{item.collectionTitle}</span>
          </div>

          <button
            onClick={onClose}
            className="text-[#1B1E4A] hover:text-[#D21319] px-2.5 py-1 border border-[#1B1E4A]/30 hover:border-[#D21319] text-xs font-mono cursor-pointer transition-colors font-bold"
          >
            CLOSE [ESC] ✕
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#AFAEA2]">
          {/* Main Visual Display on Navy Inset Frame */}
          <div className="relative w-full aspect-[16/10] max-h-[460px] bg-[#1B1E4A] border border-[#1B1E4A]/40 p-6 sm:p-8 flex flex-col justify-between shadow-inner">
            {/* Corner registration marks in Crimson Red */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D21319]" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D21319]" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D21319]" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D21319]" />

            <div className="flex items-center justify-between text-xs font-mono text-[#AFAEA2]">
              <span className="text-[#D21319] font-bold">{item.metadata?.format || 'ARCHIVAL SPECIMEN'}</span>
              <span>{item.date}</span>
            </div>

            <div className="my-auto text-center py-6">
              <span className="text-xs font-mono text-[#D21319] uppercase tracking-widest block mb-2 font-bold">
                {item.medium}
              </span>
              <h2 className="font-editorial-display text-2xl sm:text-4xl text-[#E8E7E0] max-w-xl mx-auto">
                "{item.title}"
              </h2>
              {item.location && (
                <span className="text-xs font-mono text-[#AFAEA2] mt-2 block">
                  {item.location}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#AFAEA2] pt-3 border-t border-[#AFAEA2]/15">
              <span>{item.metadata?.filmStock || item.metadata?.camera || '35mm Negative'}</span>
              <span>{item.coordinates || '28°38\'N 77°13\'E'}</span>
            </div>
          </div>

          {/* Narrative & Field Notes on Warm Stone */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-editorial-display text-2xl text-[#1B1E4A] font-semibold">
                {item.title}
              </h3>
              <p className="text-sm text-[#1B1E4A]/90 font-sans leading-relaxed font-medium">
                {item.caption}
              </p>
              {item.notes && (
                <div className="bg-[#1B1E4A] p-4 border border-[#1B1E4A] rounded-xs space-y-1">
                  <span className="text-[10px] font-mono text-[#D21319] uppercase block font-bold">
                    Author's Field Note:
                  </span>
                  <p className="text-xs font-mono text-[#E8E7E0] italic leading-relaxed">
                    {item.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Technical Metadata Matrix */}
            <div className="md:col-span-5 bg-[#1B1E4A] text-[#AFAEA2] p-5 space-y-3 text-xs font-mono rounded-xs shadow-md">
              <span className="text-[10px] uppercase text-[#D21319] tracking-wider block font-bold">
                TECHNICAL LOG
              </span>
              <div className="space-y-2 text-[#AFAEA2]">
                <div className="flex justify-between border-b border-[#AFAEA2]/10 pb-1">
                  <span className="text-[#AFAEA2]/70">Recorded:</span>
                  <span className="text-[#E8E7E0] font-semibold">{item.date}</span>
                </div>
                <div className="flex justify-between border-b border-[#AFAEA2]/10 pb-1">
                  <span className="text-[#AFAEA2]/70">Medium:</span>
                  <span className="text-[#D21319] font-bold uppercase">{item.medium}</span>
                </div>
                {item.metadata?.camera && (
                  <div className="flex justify-between border-b border-[#AFAEA2]/10 pb-1">
                    <span className="text-[#AFAEA2]/70">Camera:</span>
                    <span className="text-[#E8E7E0]">{item.metadata.camera}</span>
                  </div>
                )}
                {item.metadata?.filmStock && (
                  <div className="flex justify-between border-b border-[#AFAEA2]/10 pb-1">
                    <span className="text-[#AFAEA2]/70">Emulsion:</span>
                    <span className="text-[#D21319] font-medium">{item.metadata.filmStock}</span>
                  </div>
                )}
                {item.coordinates && (
                  <div className="flex justify-between border-b border-[#AFAEA2]/10 pb-1">
                    <span className="text-[#AFAEA2]/70">Coordinates:</span>
                    <span className="text-[#E8E7E0]">{item.coordinates}</span>
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
