import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllCatalogCollections } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Catalog — life.vaibhv19.dev',
  description: 'Curated collections organizing memories by meaning rather than by date.',
};

export default function CatalogPage() {
  const collections = getAllCatalogCollections();

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#226192] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Catalog Index Content */}
      <main className="flex-1 flex flex-col content-container py-12 sm:py-16 select-none">
        {/* Section Header */}
        <header className="mb-10 sm:mb-12 border-b border-[#226192]/20 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#226192]">
                Catalog
              </h1>
              <p className="text-xs sm:text-sm text-[#226192]/80 mt-2.5 max-w-2xl font-normal leading-relaxed">
                A curated index of photographs, moments, and personal artifacts grouped by theme rather than a strict chronological timeline. Each collection gathers frames around a specific chapter or focus—from candid moments with people I love, to travel, art, and quiet daily routines.
              </p>
            </div>

            <div className="text-xs text-[#226192]/60 font-mono shrink-0">
              {collections.length} {collections.length === 1 ? 'collection' : 'collections'}
            </div>
          </div>
        </header>

        {/* Collections Single-Column Editorial Stream */}
        <div className="flex flex-col space-y-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/catalog/${col.id}`}
              className="group block p-6 sm:p-7 border border-[#226192]/20 hover:border-[#EF8557] bg-[#226192]/[0.02] hover:bg-[#226192]/[0.05] transition-all duration-200"
              style={{ borderRadius: '18px 5px 20px 6px / 7px 18px 6px 16px' }}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-3 text-[#EF8557]">
                <span className="font-bold text-sm tracking-wider">
                  {col.numeral}
                </span>
                <span className="text-[#226192]/60 text-[11px]">
                  {col.itemCount} {col.itemCount === 1 ? 'FRAME' : 'FRAMES'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#226192] group-hover:text-[#2C7BB8] tracking-tight mb-2.5 transition-colors">
                {col.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#226192]/75 leading-relaxed font-normal mb-5">
                {col.description}
              </p>

              <div className="pt-3.5 border-t border-[#226192]/15 flex items-center justify-between text-xs font-medium">
                <span className="text-[#226192]/50 group-hover:text-[#226192]/80 transition-colors">
                  View Collection
                </span>
                <span className="text-[#EF8557] group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
}
