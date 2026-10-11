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
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#F8F4E7] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Catalog Index Content */}
      <main className="flex-1 flex flex-col max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-20 select-none">
        {/* Section Header */}
        <header className="mb-12 sm:mb-16 border-b border-[#F8F4E7]/20 pb-8">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-2">
            <span>CURATED ARCHIVE</span>
            <span className="text-[#F8F4E7]/40">{'//'}</span>
            <span>MEANING & CONTEXT</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F4E7]">
                Catalog
              </h1>
              <p className="text-xs sm:text-sm text-[#F8F4E7]/70 mt-2 max-w-xl font-normal leading-relaxed">
                Memories arranged by intention and theme rather than chronology.
              </p>
            </div>

            <div className="text-xs text-[#F8F4E7]/60 font-mono">
              7 CURATED COLLECTIONS
            </div>
          </div>
        </header>

        {/* Collections List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/catalog/${col.id}`}
              className="group flex flex-col justify-between p-6 sm:p-8 border border-[#F8F4E7]/20 hover:border-[#D7A781] bg-[#F8F4E7]/[0.02] hover:bg-[#F8F4E7]/[0.06] transition-all duration-200"
              style={{ borderRadius: '18px 5px 20px 6px / 7px 18px 6px 16px' }}
            >
              <div>
                {/* Numeral and Counter */}
                <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#D7A781]">
                  <span className="font-bold text-sm tracking-wider">
                    {col.numeral}
                  </span>
                  <span className="text-[#F8F4E7]/60 text-[11px]">
                    {col.itemCount} {col.itemCount === 1 ? 'FRAME' : 'FRAMES'}
                  </span>
                </div>

                {/* Collection Exact Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-[#F8F4E7] group-hover:text-[#FFFDF7] tracking-tight mb-3 transition-colors">
                  {col.title}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#F8F4E7]/70 leading-relaxed font-normal">
                  {col.description}
                </p>
              </div>

              {/* Action indicator */}
              <div className="pt-6 mt-6 border-t border-[#F8F4E7]/15 flex items-center justify-between text-xs font-medium">
                <span className="text-[#F8F4E7]/50 group-hover:text-[#F8F4E7]/80 transition-colors">
                  View Collection
                </span>
                <span className="text-[#D7A781] group-hover:translate-x-1 transition-transform">
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
