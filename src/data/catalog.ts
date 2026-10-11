export interface CatalogCollectionDef {
  id: string;
  title: string;
  numeral: string;
  description: string;
}

export const CATALOG_COLLECTIONS: CatalogCollectionDef[] = [
  {
    id: 'fav-moments',
    title: 'Fav Moments',
    numeral: '01',
    description: 'Cherished memories, unscripted happiness, and landmark personal frames.',
  },
  {
    id: 'fitness',
    title: 'Fitness',
    numeral: '02',
    description: 'Physical discipline, training sessions, strength, and movement.',
  },
  {
    id: 'art',
    title: 'Art',
    numeral: '03',
    description: 'Visual work, creative expressions, exhibitions, and aesthetics.',
  },
  {
    id: 'people-i-love',
    title: 'People I Love',
    numeral: '04',
    description: 'Faces, bonds, family, friends, and those who anchor my world.',
  },
  {
    id: 'other-hobbies',
    title: 'Other Hobbies',
    numeral: '05',
    description: 'Explorations outside routine, crafts, music, books, and pastimes.',
  },
  {
    id: 'i-think-i-look-good-in-these-pics',
    title: 'I Think I Look Good in These Pics',
    numeral: '06',
    description: 'Self-portraits, candid photographs, and personal favorites.',
  },
  {
    id: 'travel',
    title: 'Travel',
    numeral: '07',
    description: 'Journeys, coordinates, landscapes, and geographic explorations.',
  },
];

export interface TravelLocationNode {
  name: string;
  slug: string;
  children?: TravelLocationNode[];
}

/**
 * Data-driven Travel hierarchy.
 * Countries, states, cities, or regions can be nested at arbitrary depths.
 * Do not require every location to have the same number of hierarchy levels.
 *
 * Example structure:
 * [
 *   {
 *     name: 'India',
 *     slug: 'india',
 *     children: [
 *       { name: 'Delhi', slug: 'delhi' },
 *       { name: 'Uttar Pradesh', slug: 'uttar-pradesh' },
 *       { name: 'Rajasthan', slug: 'rajasthan' }
 *     ]
 *   },
 *   {
 *     name: 'Nepal',
 *     slug: 'nepal',
 *     children: [{ name: 'Kathmandu', slug: 'kathmandu' }]
 *   },
 *   {
 *     name: 'Japan',
 *     slug: 'japan',
 *     children: [{ name: 'Tokyo', slug: 'tokyo' }]
 *   }
 * ]
 */
export const TRAVEL_LOCATIONS: TravelLocationNode[] = [];

export interface CatalogImageEntry {
  id: string;
  src: string;
  date?: string;
  title?: string;
  caption?: string;
  collections: string[]; // E.g. ['fav-moments', 'travel']
  travelPath?: string[]; // E.g. ['India', 'Rajasthan'] or ['India', 'Delhi']
}

/**
 * Curated catalog assignments referencing underlying images.
 * A single photograph can belong to multiple collections without file duplication.
 *
 * Example:
 * [
 *   {
 *     id: '2026-09-28-01',
 *     src: '/archive/2026-09-28-01.jpeg',
 *     date: '28 September 2026',
 *     title: 'Morning Sun',
 *     collections: ['fav-moments', 'travel'],
 *     travelPath: ['India', 'Delhi'],
 *   }
 * ]
 */
export const CATALOG_ITEMS: CatalogImageEntry[] = [];
