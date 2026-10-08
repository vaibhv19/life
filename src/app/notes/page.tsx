'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotesPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#F8F4E7] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Minimal Notes Structure (Editorial Canvas) */}
      <main className="flex-1 flex flex-col max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-20">
        <header className="mb-10 border-b border-[#F8F4E7]/20 pb-6">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-2">
            ARCHIVAL RECORDS // 02
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F4E7]">
            Notes
          </h1>
        </header>

        {/* Minimal Content Canvas */}
        <section className="flex-1 flex items-start py-8">
          <p className="text-sm sm:text-base text-[#F8F4E7]/60 font-normal">
            No entries published yet.
          </p>
        </section>
      </main>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
}
