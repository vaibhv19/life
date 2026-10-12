import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CatalogSections } from '@/components/CatalogSections';

export const metadata: Metadata = {
  title: 'Catalog — life.vaibhv19.dev',
  description: 'Curated collections organizing memories by meaning rather than by date.',
};

export default function CatalogPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#226192] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Catalog Sections: ME, PEOPLE, TRAVEL */}
      <main className="flex-1 flex flex-col py-10 sm:py-14 md:py-16 select-none">
        <CatalogSections />

        {/* 03. Navigation Button: View these in chronology */}
        <div className="content-container flex justify-center text-center mt-10 sm:mt-12 md:mt-14 select-none">
          <Link
            href="/all-post"
            className="btn-palette-b cursor-pointer focus:outline-none px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-tight hover:scale-[1.02] active:scale-[0.98] shadow-sm select-none inline-block leading-snug"
            style={{
              borderRadius: '18px 5px 22px 7px / 8px 20px 7px 16px',
            }}
            title="View these in chronology"
          >
            View these in chronology
          </Link>
        </div>
      </main>

      {/* 04. Global Footer */}
      <Footer />
    </div>
  );
}
