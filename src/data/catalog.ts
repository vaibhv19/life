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
export const TRAVEL_LOCATIONS: TravelLocationNode[] = [
  {
    name: 'India',
    slug: 'india',
    children: [
      { name: 'Delhi', slug: 'delhi' },
      { name: 'Himachal', slug: 'himachal' },
    ],
  },
];

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
 */
export const CATALOG_ITEMS: CatalogImageEntry[] = [
  {
    id: 'fav-01',
    src: '/archive/2026-09-28-01.jpeg',
    date: '28 Sep 2026',
    title: 'Morning Sun & Shadows',
    caption: 'Low autumn sun slicing through dust above the crosswalk.',
    collections: ['fav-moments', 'travel', 'art'],
    travelPath: ['India', 'Delhi'],
  },
  {
    id: 'fav-02',
    src: '/archive/2026-09-28-03.jpeg',
    date: '15 Aug 2026',
    title: 'Exhibition Forms',
    caption: 'Quiet reflections inside the gallery space.',
    collections: ['fav-moments', 'art'],
  },
  {
    id: 'fav-03',
    src: '/archive/2026-09-28-04.jpeg',
    date: '02 Jul 2026',
    title: 'Shared Laughter',
    caption: 'Unscripted afternoon with the people who matter most.',
    collections: ['fav-moments', 'people-i-love'],
  },
  {
    id: 'fitness-01',
    src: '/archive/2026-09-28-02.jpeg',
    date: '20 Sep 2026',
    title: 'Morning Conditioning',
    caption: 'Discipline, breath, and early movement.',
    collections: ['fitness'],
  },
  {
    id: 'art-01',
    src: '/archive/2026-09-28-03.jpeg',
    date: '15 Aug 2026',
    title: 'Visual Compositions',
    caption: 'Exploring symmetry and textured paper mediums.',
    collections: ['art'],
  },
  {
    id: 'art-02',
    src: '/archive/Warm Acoustic Guitar Portrait.png',
    date: '04 Jun 2026',
    title: 'Acoustic Resonance',
    caption: 'Studies in warmth and wood grain tones.',
    collections: ['art', 'other-hobbies'],
  },
  {
    id: 'people-01',
    src: '/archive/2026-09-28-04.jpeg',
    date: '02 Jul 2026',
    title: 'Familiar Constellations',
    caption: 'Grateful for every conversation and shared meal.',
    collections: ['people-i-love'],
  },
  {
    id: 'hobbies-01',
    src: '/archive/Warm Acoustic Guitar Portrait.png',
    date: '12 May 2026',
    title: 'Warm Acoustic Guitar',
    caption: 'Chords learned slowly in the quiet hours of evening.',
    collections: ['other-hobbies'],
  },
  {
    id: 'portrait-01',
    src: '/cutout.png',
    date: '10 Oct 2026',
    title: 'Editorial Silhouette',
    caption: 'Self-portrait experiment with clean contour lighting.',
    collections: ['i-think-i-look-good-in-these-pics'],
  },
  {
    id: 'portrait-02',
    src: '/vaibhav-profile-cutout.png',
    date: '24 Sep 2026',
    title: 'Profile Study',
    caption: 'Monochrome profile cut.',
    collections: ['i-think-i-look-good-in-these-pics'],
  },
  {
    id: 'travel-01',
    src: '/archive/2026-09-28-05.jpeg',
    date: '18 Sep 2026',
    title: 'Distant Ridgelines',
    caption: 'Watching mountain layers dissolve into morning haze.',
    collections: ['travel'],
    travelPath: ['India', 'Himachal'],
  },
  {
    id: 'travel-02',
    src: '/archive/2026-09-28-01.jpeg',
    date: '28 Sep 2026',
    title: 'Old Quarter Crossing',
    caption: 'Walking unfamiliar streets with a camera.',
    collections: ['travel'],
    travelPath: ['India', 'Delhi'],
  },
];
