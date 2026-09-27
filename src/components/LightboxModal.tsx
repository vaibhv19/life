'use client';

import React, { useEffect } from 'react';
import { LightboxData } from '../types';

interface LightboxModalProps {
  data: LightboxData | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ data, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (data) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded flex flex-col overflow-hidden"
      >
        {/* Top bar with metadata and close button */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>{data.collectionTitle}</span>
            {data.date && (
              <>
                <span className="text-zinc-700">•</span>
                <span>{data.date}</span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 text-xs font-mono p-1"
            title="Close (ESC)"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Image Preview Container */}
        <div className="p-6 bg-zinc-950 flex flex-col items-center justify-center">
          <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded bg-zinc-900 border border-zinc-800/80 flex flex-col items-center justify-center p-6 text-center">
            <div className="font-normal text-sm text-zinc-300">
              {data.title}
            </div>
            {data.location && (
              <div className="text-xs font-mono text-zinc-500 mt-1">
                {data.location}
              </div>
            )}
          </div>
        </div>

        {/* Caption & Context Footer */}
        {data.caption && (
          <div className="px-5 py-4 border-t border-zinc-800/80 bg-zinc-950">
            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
              {data.caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
