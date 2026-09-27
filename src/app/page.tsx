'use client';

import React, { useState, useMemo } from 'react';
import { BioHeader } from '@/components/BioHeader';
import { CollectionsPanel } from '@/components/CollectionsPanel';
import { TimelinePanel } from '@/components/TimelinePanel';
import { LightboxModal } from '@/components/LightboxModal';
import { mockCollections, mockPosts } from '@/data/mockData';
import { LightboxData } from '@/types';

export default function LifePage() {
  const [isCollectionsCollapsed, setIsCollectionsCollapsed] = useState<boolean>(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxData | null>(null);

  // Filter posts based on active collection selection
  const filteredPosts = useMemo(() => {
    if (!selectedCollectionId) {
      return mockPosts;
    }
    return mockPosts.filter((post) => post.collectionId === selectedCollectionId);
  }, [selectedCollectionId]);

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

  const handleToggleCollapse = () => {
    setIsCollectionsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
      {/* Zone 1: Top Bio Zone - Always visible full-width across top */}
      <BioHeader
        activeFilterTitle={activeCollection ? activeCollection.title : null}
        onClearFilter={handleClearFilter}
      />

      {/* Main Dual-Panel Zone (Zone 2 & Zone 3) */}
      <div className="flex-1 flex flex-row overflow-hidden relative">
        {/* Zone 2: Collections Panel (Left, Collapsible, Independent Scroll) */}
        <CollectionsPanel
          collections={mockCollections}
          activeCollectionId={selectedCollectionId}
          onFilterCollection={handleFilterCollection}
          onOpenLightbox={(item) => setActiveLightboxItem(item)}
          isCollapsed={isCollectionsCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />

        {/* Zone 3: Timeline Panel (Right, Always Present, Expands, Independent Scroll) */}
        <TimelinePanel
          posts={filteredPosts}
          activeCollectionTitle={activeCollection ? activeCollection.title : null}
          onClearFilter={handleClearFilter}
          onOpenLightbox={(item) => setActiveLightboxItem(item)}
          isCollectionsCollapsed={isCollectionsCollapsed}
          onExpandCollections={() => setIsCollectionsCollapsed(false)}
        />
      </div>

      {/* Lightbox / Modal Overlay */}
      <LightboxModal
        data={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}
