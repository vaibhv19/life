import React from 'react';
import { Metadata } from 'next';
import { getAuthenticatedPerson } from '@/lib/hiddenspace/access';
import { BirthdayGate } from '@/components/hiddenspace/BirthdayGate';
import { HiddenSpace } from '@/components/hiddenspace/HiddenSpace';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Hidden Space — life.vaibhv19.dev',
  description: 'Private personal archive and dedicated repository.',
};

export const dynamic = 'force-dynamic';

export default async function HiddenSpacePage() {
  const person = await getAuthenticatedPerson();

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#F8F4E7] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Server-Gated Body */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {person ? (
          <HiddenSpace person={person} />
        ) : (
          <BirthdayGate />
        )}
      </main>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
}
