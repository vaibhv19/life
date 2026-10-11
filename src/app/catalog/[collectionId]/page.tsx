import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  getCatalogCollectionById,
  getCollectionItems,
  getTravelLocations,
} from '@/lib/catalog';
import { CatalogCollectionView } from '@/components/CatalogCollectionView';
import { CATALOG_COLLECTIONS } from '@/data/catalog';

interface PageProps {
  params: Promise<{ collectionId: string }>;
}

export async function generateStaticParams() {
  return CATALOG_COLLECTIONS.map((c) => ({
    collectionId: c.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { collectionId } = await params;
  const collection = getCatalogCollectionById(collectionId);

  if (!collection) {
    return { title: 'Collection Not Found — life.vaibhv19.dev' };
  }

  return {
    title: `${collection.title} — Catalog — life.vaibhv19.dev`,
    description: collection.description,
  };
}

export default async function CatalogCollectionPage({ params }: PageProps) {
  const { collectionId } = await params;
  const collection = getCatalogCollectionById(collectionId);

  if (!collection) {
    notFound();
  }

  const items = getCollectionItems(collectionId);
  const travelLocations = collectionId === 'travel' ? getTravelLocations() : [];

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#1546D9] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Curated Collection View */}
      <main className="flex-1 flex flex-col content-container py-12 sm:py-16 select-none">
        <CatalogCollectionView
          collection={collection}
          items={items}
          travelLocations={travelLocations}
        />
      </main>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
}
