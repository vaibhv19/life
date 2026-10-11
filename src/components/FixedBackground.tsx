'use client';

import React from 'react';

export const FixedBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#EDECE6] select-none"
      aria-hidden="true"
    >
      {/* 1. Subtle Organic Tonal Variation (Vignette & Soft Parchment Lighting) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 70% at 50% 0%, rgba(248, 247, 241, 0.7) 0%, transparent 65%),
            radial-gradient(ellipse 90% 85% at 15% 25%, rgba(246, 245, 239, 0.5) 0%, transparent 55%),
            radial-gradient(ellipse 85% 85% at 85% 70%, rgba(224, 222, 214, 0.5) 0%, transparent 60%),
            radial-gradient(ellipse 100% 100% at 50% 100%, rgba(219, 217, 208, 0.45) 0%, transparent 75%)
          `,
        }}
      />

      {/* 2. Soft Clouded Paper Fiber Texture (Natural organic surface mottling) */}
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='mottleFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23mottleFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '320px 320px',
        }}
      />

      {/* 3. Fine Archival Paper / Tactile Film Grain (Clearly visible stationary texture) */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperGrain)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
        }}
      />
    </div>
  );
};
