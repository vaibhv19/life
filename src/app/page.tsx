'use client';

import React, { useState, useMemo } from 'react';
import { SidebarNav } from '@/components/SidebarNav';
import { BioHeader } from '@/components/BioHeader';
import { CollectionsPanel } from '@/components/CollectionsPanel';
import { TimelinePanel } from '@/components/TimelinePanel';
import { LightboxModal } from '@/components/LightboxModal';
import { mockCollections, mockPosts } from '@/data/mockData';
import { LightboxData } from '@/types';

export default function LifePage() {
  const [isCollectionsCollapsed, setIsCollectionsCollapsed] = useState<boolean>(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxData | null>(null);

  // Filter posts based on active collection selection AND search query
  const filteredPosts = useMemo(() => {
    let posts = mockPosts;
    if (selectedCollectionId) {
      posts = posts.filter((post) => post.collectionId === selectedCollectionId);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      posts = posts.filter((post) => {
        const inCaption = post.caption.toLowerCase().includes(q);
        const inLocation = post.location.toLowerCase().includes(q);
        const inDate = post.date.toLowerCase().includes(q);
        const inCollection = post.collectionTitle.toLowerCase().includes(q);
        const inTags = post.tags && post.tags.some((t) => t.toLowerCase().includes(q));
        return inCaption || inLocation || inDate || inCollection || inTags;
      });
    }
    return posts;
  }, [selectedCollectionId, searchQuery]);

  // Filter collections based on search query
  const filteredCollections = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockCollections;
    }
    const q = searchQuery.trim().toLowerCase();
    return mockCollections.filter((col) => {
      const inTitle = col.title.toLowerCase().includes(q);
      const inDesc = col.description.toLowerCase().includes(q);
      const inDate = col.dateRange.toLowerCase().includes(q);
      const inIndex = col.indexNumber.toLowerCase().includes(q);
      const inThumbnails = col.thumbnails.some(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.caption.toLowerCase().includes(q) ||
          (t.location && t.location.toLowerCase().includes(q))
      );
      return inTitle || inDesc || inDate || inIndex || inThumbnails;
    });
  }, [searchQuery]);

  // Find active collection title
  const activeCollection = useMemo(() => {
    if (!selectedCollectionId) return null;
    return mockCollections.find((c) => c.id === selectedCollectionId) || null;
  }, [selectedCollectionId]);

  const handleFilterCollection = (collectionId: string) => {
    // If already selected, toggle off or keep it selected
    if (selectedCollectionId === collectionId) {
      setSelectedCollectionId(null);
    } else {
      setSelectedCollectionId(collectionId);
    }
  };

  const handleClearFilter = () => {
    setSelectedCollectionId(null);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleResetAll = () => {
    setSelectedCollectionId(null);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleToggleCollapse = () => {
    setIsCollectionsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased selection:bg-zinc-200 selection:text-zinc-900 dark:selection:bg-zinc-800 dark:selection:text-white transition-colors">
      {/* Persistent Left Vertical Sidebar Navigation Rail */}
      <SidebarNav
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onResetAll={handleResetAll}
        isCollectionsCollapsed={isCollectionsCollapsed}
        onToggleCollections={handleToggleCollapse}
        isSearchOpen={isSearchOpen}
        onToggleSearch={setIsSearchOpen}
        filteredCount={filteredPosts.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Zone 1: Top Bio Zone */}
        <BioHeader
          activeFilterTitle={activeCollection ? activeCollection.title : null}
          onClearFilter={handleClearFilter}
        />

        {/* Main Dual-Panel Zone (Zone 2 & Zone 3) */}
        <div className="flex-1 flex flex-row overflow-hidden relative min-w-0">
          {/* Zone 2: Collections Panel (Left, Collapsible, Independent Scroll) */}
          <CollectionsPanel
            collections={filteredCollections}
            activeCollectionId={selectedCollectionId}
            onFilterCollection={handleFilterCollection}
            onOpenLightbox={(item) => setActiveLightboxItem(item)}
            isCollapsed={isCollectionsCollapsed}
            onToggleCollapse={handleToggleCollapse}
          />

          {/* Zone 3: Timeline Panel (Right, Always Present, Expands, Independent Scroll) */}
          <TimelinePanel
            posts={filteredPosts}
            searchQuery={searchQuery}
            onClearSearch={handleClearSearch}
            activeCollectionTitle={activeCollection ? activeCollection.title : null}
            onClearFilter={handleClearFilter}
            onOpenLightbox={(item) => setActiveLightboxItem(item)}
            isCollectionsCollapsed={isCollectionsCollapsed}
            onExpandCollections={() => setIsCollectionsCollapsed(false)}
          />
        </div>
      </div>

      {/* Lightbox / Modal Overlay */}
      <LightboxModal
        data={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}
