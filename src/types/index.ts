export interface ThumbnailItem {
  id: string;
  title: string;
  label: string;
  caption: string;
  date: string;
  aspectRatio: string;
  gridSpan: string; // e.g. 'col-span-2 row-span-2' for collage layouts
  collectionId: string;
  collectionTitle: string;
  location?: string;
}

export interface Collection {
  id: string;
  indexNumber: string;
  title: string;
  description: string;
  itemCount: number;
  dateRange: string;
  thumbnails: ThumbnailItem[];
}

export interface Post {
  id: string;
  date: string;
  collectionId: string;
  collectionTitle: string;
  location: string;
  caption: string;
  imageLabel: string;
  aspectRatio: string;
  tags: string[];
}

export interface LightboxData {
  id: string;
  title: string;
  label: string;
  caption: string;
  date: string;
  collectionTitle: string;
  location?: string;
  aspectRatio?: string;
}
