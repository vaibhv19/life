import React from 'react';
import { Metadata } from 'next';
import { getAuthenticatedPerson } from '@/lib/between-us/access';
import { getPersonSpaceConfig } from '@/lib/between-us/content';
import { BirthdayGate } from '@/components/between-us/BirthdayGate';
import { BetweenUsSpace } from '@/components/between-us/BetweenUsSpace';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Between Us — life.vaibhv19.dev',
  description: 'A private vault of dedicated spaces and quiet correspondence.',
};

export const dynamic = 'force-dynamic';

export default async function BetweenUsPage() {
  const person = await getAuthenticatedPerson();

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#F8F4E7] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Server-Gated Body */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {person ? (
          <BetweenUsSpace config={getPersonSpaceConfig(person.id)} />
        ) : (
          <BirthdayGate />
        )}
      </main>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
}
