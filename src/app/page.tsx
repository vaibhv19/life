'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Header, MainViewMode } from '@/components/Header';
import { HeroArchive } from '@/components/HeroArchive';
import { VisualArchiveGrid } from '@/components/VisualArchiveGrid';
import { CollectionLenses } from '@/components/CollectionLenses';
import { ChronologicalStream } from '@/components/ChronologicalStream';
import { FeaturedEntryFocus } from '@/components/FeaturedEntryFocus';
import { Footer } from '@/components/Footer';
import { ExtraaDiscovery } from '@/components/ExtraaDiscovery';
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

  // Support ?view= param when returning from other pages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view') as MainViewMode | null;
      if (viewParam && ['all', 'archive', 'series', 'chronology', 'hidden'].includes(viewParam)) {
        setActiveView(viewParam);
      }
    }
  }, []);

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
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#F8F4E7] antialiased">
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
          <HeroArchive />
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

        {/* 07. Hidden Space / Unlisted Marginalia View */}
        {activeView === 'hidden' && (
          <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24 text-[#F8F4E7]">
            <div 
              className="max-w-3xl mx-auto border border-[#F8F4E7]/25 bg-[#F8F4E7]/[0.04] backdrop-blur-sm p-8 sm:p-12 md:p-16 select-none"
              style={{ borderRadius: '24px 6px 20px 8px / 12px 22px 9px 18px' }}
            >
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-3">
                UNLISTED OBSERVATION // 00
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F8F4E7] mb-6">
                A quiet space away from the stream.
              </h2>
              <p className="text-sm sm:text-base text-[#F8F4E7]/80 leading-relaxed font-normal mb-8">
                Some moments are captured not for display, but to anchor memory. Unedited 35mm film negatives, margin notes from high passes, and quiet reflections kept intact.
              </p>
              <div className="pt-6 border-t border-[#F8F4E7]/15 flex items-center justify-between text-xs text-[#F8F4E7]/60">
                <span>NEW DELHI · 28°38&apos;N 77°13&apos;E</span>
                <button
                  onClick={() => setActiveView('all')}
                  className="text-[#D7A781] hover:text-[#FFFDF7] font-semibold transition-colors cursor-pointer"
                >
                  Back to main archive →
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 07. Discreet Extraa Archive Discovery */}
      <ExtraaDiscovery />

      {/* 08. Minimal Colophon Footer */}
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
