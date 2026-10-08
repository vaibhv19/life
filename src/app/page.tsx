import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#F8F4E7] antialiased">
      {/* 01. Life Navbar from develop */}
      <Header />

      {/* 02. Minimal Central Content */}
      <main className="flex-1 flex items-center justify-center px-5 sm:px-8 py-20 select-none">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F8F4E7] text-center max-w-2xl leading-tight">
          this page is in development
        </h1>
      </main>

      {/* 03. Life Footer from develop */}
      <Footer />
    </div>
  );
}
