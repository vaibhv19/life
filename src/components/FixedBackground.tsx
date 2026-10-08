'use client';

import React from 'react';

export const FixedBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#1B1E4A] select-none"
      aria-hidden="true"
    >
      {/* 1. Fine Static 40px x 40px Architectural Grid in Warm Stone Grey */}
      <div 
        className="absolute inset-0 bg-grid opacity-100" 
      />

      {/* 2. Prominent Warm Stone Grey (#AFAEA2) Atmospheric Mask (20–30% Perceived Presence) */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 60% at 85% 15%, rgba(175, 174, 162, 0.26) 0%, rgba(175, 174, 162, 0.08) 50%, transparent 75%),
            radial-gradient(ellipse 65% 55% at 15% 85%, rgba(175, 174, 162, 0.22) 0%, rgba(175, 174, 162, 0.06) 50%, transparent 70%),
            radial-gradient(circle at 50% 50%, rgba(175, 174, 162, 0.12) 0%, transparent 60%),
            linear-gradient(135deg, rgba(175, 174, 162, 0.08) 0%, transparent 40%, rgba(175, 174, 162, 0.14) 100%)
          `
        }}
      />

      {/* 3. Editorial Paper Grain Layer */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(rgba(175, 174, 162, 0.9) 1px, transparent 0)',
          backgroundSize: '10px 10px',
        }}
      />
    </div>
  );
};
