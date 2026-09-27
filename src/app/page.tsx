'use client';

import React, { useState, useMemo } from 'react';
import { SidebarNav, ActiveNavView } from '@/components/SidebarNav';
import { PersonalPostView } from '@/components/PersonalPostView';
import { BioHeader } from '@/components/BioHeader';
import { CollectionsPanel } from '@/components/CollectionsPanel';
import { TimelinePanel } from '@/components/TimelinePanel';
import { LightboxModal } from '@/components/LightboxModal';
import { mockCollections, mockPosts } from '@/data/mockData';
import { LightboxData } from '@/types';

export default function LifePage() {
  const [activeView, setActiveView] = useState<ActiveNavView>('home');
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
    if (selectedCollectionId === collectionId) {
      setSelectedCollectionId(null);
    } else {
      setSelectedCollectionId(collectionId);
    }
    // Switch to timeline or collections view to see filtered results
    if (activeView === 'home') {
      setActiveView('timeline');
    }
  };

  const handleClearFilter = () => {
    setSelectedCollectionId(null);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleToggleCollapse = () => {
    setIsCollectionsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased selection:bg-zinc-200 selection:text-zinc-900 dark:selection:bg-zinc-800 dark:selection:text-white transition-colors">
      {/* Persistent Left Vertical Sidebar Navigation Rail */}
      <SidebarNav
        activeView={activeView}
        onSelectView={setActiveView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearchOpen={isSearchOpen}
        onToggleSearch={setIsSearchOpen}
        filteredCount={filteredPosts.length}
      />

      {/* Main Content Area */}
      {activeView === 'home' ? (
        /* New Default Homepage: Single Personal Editorial Post */
        <PersonalPostView
          onExploreCollections={() => setActiveView('collections')}
          onExploreTimeline={() => setActiveView('timeline')}
        />
      ) : (
        /* Archive Views: Collections + Timeline */
        <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
          {/* Top Bio Zone */}
          <BioHeader
            activeFilterTitle={activeCollection ? activeCollection.title : null}
            onClearFilter={handleClearFilter}
          />

          {/* Main Dual-Panel Zone (Collections & Timeline) */}
          <div className="flex-1 flex flex-row overflow-hidden relative min-w-0">
            {/* Collections Panel (Left) */}
            <CollectionsPanel
              collections={filteredCollections}
              activeCollectionId={selectedCollectionId}
              onFilterCollection={handleFilterCollection}
              onOpenLightbox={(item) => setActiveLightboxItem(item)}
              isCollapsed={activeView === 'timeline' ? isCollectionsCollapsed : false}
              onToggleCollapse={handleToggleCollapse}
            />

            {/* Timeline Panel (Right) */}
            <TimelinePanel
              posts={filteredPosts}
              searchQuery={searchQuery}
              onClearSearch={handleClearSearch}
              activeCollectionTitle={activeCollection ? activeCollection.title : null}
              onClearFilter={handleClearFilter}
              onOpenLightbox={(item) => setActiveLightboxItem(item)}
              isCollectionsCollapsed={activeView === 'timeline' ? isCollectionsCollapsed : false}
              onExpandCollections={() => setIsCollectionsCollapsed(false)}
            />
          </div>
        </div>
      )}

      {/* Lightbox / Modal Overlay */}
      <LightboxModal
        data={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}
