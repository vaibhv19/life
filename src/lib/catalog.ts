import {
  CATALOG_COLLECTIONS,
  CATALOG_ITEMS,
  TRAVEL_LOCATIONS,
  CatalogCollectionDef,
  CatalogImageEntry,
  TravelLocationNode,
} from '@/data/catalog';

export interface EnrichedCollection extends CatalogCollectionDef {
  itemCount: number;
}

/**
 * Returns all 7 curated collections with their current item counts.
 */
export function getAllCatalogCollections(): EnrichedCollection[] {
  return CATALOG_COLLECTIONS.map((col) => {
    const count = CATALOG_ITEMS.filter((item) =>
      item.collections.includes(col.id)
    ).length;

    return {
      ...col,
      itemCount: count,
    };
  });
}

/**
 * Returns collection metadata by id.
 */
export function getCatalogCollectionById(id: string): CatalogCollectionDef | null {
  const match = CATALOG_COLLECTIONS.find((c) => c.id === id);
  return match || null;
}

/**
 * Returns image items assigned to a collection, optionally filtered by travel path.
 */
export function getCollectionItems(
  collectionId: string,
  travelFilterPath?: string[]
): CatalogImageEntry[] {
  let items = CATALOG_ITEMS.filter((item) => item.collections.includes(collectionId));

  if (collectionId === 'travel' && travelFilterPath && travelFilterPath.length > 0) {
    items = items.filter((item) => {
      if (!item.travelPath) return false;
      // Match prefix path
      return travelFilterPath.every((segment, idx) => {
        return (
          item.travelPath &&
          item.travelPath[idx] &&
          item.travelPath[idx].toLowerCase() === segment.toLowerCase()
        );
      });
    });
  }

  return items;
}

/**
 * Returns travel locations configured in data.
 */
export function getTravelLocations(): TravelLocationNode[] {
  return TRAVEL_LOCATIONS;
}
