import React from 'react';
import { Metadata } from 'next';
import { isExtraaAuthenticated } from '@/lib/extraa/access';
import { PasswordGate } from '@/components/extraa/PasswordGate';
import { ExtraaSpace } from '@/components/extraa/ExtraaSpace';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Extraa — life.vaibhv19.dev',
  description: 'Private personal material and internal repository.',
};

export const dynamic = 'force-dynamic';

export default async function ExtraaPage() {
  const authenticated = await isExtraaAuthenticated();

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#F8F4E7] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Server-Gated Body */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {authenticated ? (
          <ExtraaSpace />
        ) : (
          <PasswordGate />
        )}
      </main>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
}
