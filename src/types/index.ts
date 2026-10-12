export type ArchiveMedium = 'photo' | 'note' | 'moment' | 'artifact' | 'book';
export type VisualScale = 'standard' | 'prominent' | 'panoramic' | 'tall' | 'intimate';

export interface ArchiveItem {
  id: string;
  title: string;
  date: string;
  year: string;
  month: string;
  medium: ArchiveMedium;
  collectionId: string;
  collectionTitle: string;
  location?: string;
  coordinates?: string;
  caption?: string;
  notes?: string;
  metadata?: {
    camera?: string;
    filmStock?: string;
    focalLength?: string;
    format?: string;
    author?: string;
  };
  imageSrc?: string;
  aspectRatio: string;
  scale: VisualScale;
  tags: string[];
  featured?: boolean;
}

export interface CollectionSeries {
  id: string;
  indexNumber: string;
  title: string;
  subtitle?: string;
  description: string;
  itemCount: number;
  dateRange: string;
  tags: string[];
}

export interface ThumbnailItem {
  id: string;
  title: string;
  label?: string;
  caption: string;
  date: string;
  aspectRatio: string;
  gridSpan: string;
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
  imageLabel?: string;
  aspectRatio: string;
  tags: string[];
}

export interface LightboxData {
  id: string;
  title: string;
  date: string;
  medium?: ArchiveMedium;
  label?: string;
  collectionTitle: string;
  location?: string;
  coordinates?: string;
  caption?: string;
  notes?: string;
  metadata?: {
    camera?: string;
    filmStock?: string;
    focalLength?: string;
    format?: string;
    author?: string;
  };
  imageSrc?: string;
  aspectRatio?: string;
}
