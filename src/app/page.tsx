'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Header, MainViewMode } from '@/components/Header';
import { HeroArchive } from '@/components/HeroArchive';
import { VisualArchiveGrid } from '@/components/VisualArchiveGrid';
import { CollectionLenses } from '@/components/CollectionLenses';
import { ChronologicalStream } from '@/components/ChronologicalStream';
import { FeaturedEntryFocus } from '@/components/FeaturedEntryFocus';
import { Footer } from '@/components/Footer';
import { SearchDrawer } from '@/components/SearchDrawer';
import { LightboxModal } from '@/components/LightboxModal';
import { mockArchiveItems, mockSeries } from '@/data/mockData';
import { ArchiveItem } from '@/types';

export default function LifePage() {
  const [activeView, setActiveView] = useState<MainViewMode>('all');
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeFocalItem, setActiveFocalItem] = useState<ArchiveItem | null>(null);
  const [activeLightboxItem, setActiveLightboxItem] = useState<ArchiveItem | null>(null);

  // Global keyboard shortcut '/' to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !isSearchOpen &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Featured Item for Hero Section (Item 01)
  const defaultFeaturedItem = useMemo(() => {
    return mockArchiveItems.find((item) => item.featured) || mockArchiveItems[0];
  }, []);

  // Filtered Archive Items based on series filter and search query
  const filteredItems = useMemo(() => {
    let items = mockArchiveItems;

    if (selectedSeriesId) {
      items = items.filter((item) => item.collectionId === selectedSeriesId);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter((item) => {
        const inTitle = item.title.toLowerCase().includes(q);
        const inCaption = item.caption ? item.caption.toLowerCase().includes(q) : false;
        const inLocation = item.location ? item.location.toLowerCase().includes(q) : false;
        const inSeries = item.collectionTitle.toLowerCase().includes(q);
        const inNotes = item.notes ? item.notes.toLowerCase().includes(q) : false;
        const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const inCamera = item.metadata?.camera ? item.metadata.camera.toLowerCase().includes(q) : false;
        const inFilm = item.metadata?.filmStock ? item.metadata.filmStock.toLowerCase().includes(q) : false;

        return inTitle || inCaption || inLocation || inSeries || inNotes || inTags || inCamera || inFilm;
      });
    }

    return items;
  }, [selectedSeriesId, searchQuery]);

  // Active Series Title
  const activeSeriesTitle = useMemo(() => {
    if (!selectedSeriesId) return null;
    return mockSeries.find((s) => s.id === selectedSeriesId)?.title || null;
  }, [selectedSeriesId]);

  const handleSelectSeries = (seriesId: string) => {
    if (selectedSeriesId === seriesId) {
      setSelectedSeriesId(null);
    } else {
      setSelectedSeriesId(seriesId);
      // If we are in 'series' mode, switch to 'archive' to see filtered results
      if (activeView === 'series') {
        setActiveView('archive');
      }
    }
  };

  const handleClearFilter = () => {
    setSelectedSeriesId(null);
    setSearchQuery('');
  };

  const handleSelectItem = (item: ArchiveItem) => {
    setActiveFocalItem(item);
  };

  const handleOpenLightbox = (item: ArchiveItem) => {
    setActiveLightboxItem(item);
  };

  const handleSelectTag = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#AFAEA2] antialiased">
      {/* 01. Global Editorial Header */}
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeFilterTitle={activeSeriesTitle}
        onClearFilter={handleClearFilter}
      />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 02. Hero / Introduction — Shown on 'all' and 'archive' */}
        {(activeView === 'all' || activeView === 'archive') && (
          <HeroArchive
            featuredItem={defaultFeaturedItem}
            onSelectFeatured={(item) => handleSelectItem(item)}
            onExploreSeries={() => setActiveView('series')}
            totalEntriesCount={mockArchiveItems.length}
          />
        )}

        {/* 03. Single Entry Focus View (When an entry is inspected or chosen) */}
        {activeFocalItem && (
          <FeaturedEntryFocus
            item={activeFocalItem}
            onOpenLightbox={handleOpenLightbox}
            onClose={() => setActiveFocalItem(null)}
          />
        )}

        {/* 04. Primary Visual Archive Grid */}
        {(activeView === 'all' || activeView === 'archive') && (
          <VisualArchiveGrid
            items={filteredItems}
            onSelectItem={handleSelectItem}
            activeCollectionTitle={activeSeriesTitle}
          />
        )}

        {/* 05. Collection & Thematic Lenses */}
        {(activeView === 'all' || activeView === 'series') && (
          <CollectionLenses
            seriesList={mockSeries}
            activeSeriesId={selectedSeriesId}
            onSelectSeries={handleSelectSeries}
            onClearFilter={handleClearFilter}
          />
        )}

        {/* 06. Chronological Stream & Field Records */}
        {(activeView === 'all' || activeView === 'chronology') && (
          <ChronologicalStream
            items={filteredItems}
            onSelectItem={handleSelectItem}
          />
        )}
      </main>

      {/* 07. Minimal Colophon Footer */}
      <Footer />

      {/* Search Drawer Overlay */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredItems={filteredItems}
        onSelectItem={handleSelectItem}
        onSelectTag={handleSelectTag}
      />

      {/* High-Fidelity Lightbox Modal */}
      <LightboxModal
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}
