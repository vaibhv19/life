import { PersonId, getPersonProfileById } from './access';
import { PersonSpaceConfig } from './types';

/**
 * Person-specific content configurations for Between Us.
 * The architecture separates reusable components from individualized data.
 */
const PERSON_CONFIGS: Record<PersonId, PersonSpaceConfig> = {
  zoya: {
    person: 'zoya',
    displayName: 'Zoya',
    spaceTitle: 'Between Us // Zoya',
    tagline: 'A private vault of dedicated thoughts, shared milestones, and unsaid things.',
    blocks: [
      {
        id: 'intro-zoya',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'For Zoya',
        message: 'This space exists apart from the public archive—a dedicated place for memories and quiet words.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-zoya',
        type: 'memory-collection',
        title: 'Collected Moments',
        description: 'Chronicles, shared observations and analog frames.',
        memories: [],
      },
      {
        id: 'letter-zoya',
        type: 'letter',
        title: 'Letter',
        recipient: 'Zoya',
        bodyParagraphs: [],
      },
      {
        id: 'timeline-zoya',
        type: 'timeline',
        title: 'Milestones & Coordinates',
        events: [],
      },
    ],
  },
  somya: {
    person: 'somya',
    displayName: 'Somya',
    spaceTitle: 'Between Us // Somya',
    tagline: 'A private space for shared memories, quiet reflections, and unwritten notes.',
    blocks: [
      {
        id: 'intro-somya',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'For Somya',
        message: 'A dedicated repository for thoughts, shared chapters, and quiet observations.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-somya',
        type: 'memory-collection',
        title: 'Memories & Observations',
        description: 'Moments and notes gathered across time.',
        memories: [],
      },
      {
        id: 'letter-somya',
        type: 'letter',
        title: 'Letter',
        recipient: 'Somya',
        bodyParagraphs: [],
      },
    ],
  },
  stuti: {
    person: 'stuti',
    displayName: 'Stuti',
    spaceTitle: 'Between Us // Stuti',
    tagline: 'A quiet vault of conversations, shared moments, and lasting notes.',
    blocks: [
      {
        id: 'intro-stuti',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'For Stuti',
        message: 'A personal corner preserved away from the stream.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-stuti',
        type: 'memory-collection',
        title: 'Shared Chapters',
        description: 'Recorded moments and shared markers.',
        memories: [],
      },
      {
        id: 'letter-stuti',
        type: 'letter',
        title: 'Letter',
        recipient: 'Stuti',
        bodyParagraphs: [],
      },
    ],
  },
  madhu: {
    person: 'madhu',
    displayName: 'Madhu',
    spaceTitle: 'Between Us // Madhu',
    tagline: 'A dedicated space of deep gratitude, memories, and unhurried reflections.',
    blocks: [
      {
        id: 'intro-madhu',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'For Ma',
        message: 'A dedicated corner honoring unconditional warmth, memories, and quiet gratitude.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-madhu',
        type: 'memory-collection',
        title: 'Family Milestones & Moments',
        description: 'Memories, photographs, and preserved frames.',
        memories: [],
      },
      {
        id: 'letter-madhu',
        type: 'letter',
        title: 'Letter',
        recipient: 'Ma',
        bodyParagraphs: [],
      },
    ],
  },
  priyam: {
    person: 'priyam',
    displayName: 'Priyam',
    spaceTitle: 'Between Us // Priyam',
    tagline: 'A personal archive of shared milestones, childhood memories, and unspoken bonds.',
    blocks: [
      {
        id: 'intro-priyam',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'For Didi',
        message: 'A dedicated space for memories, laughter, and lifelong anchors.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-priyam',
        type: 'memory-collection',
        title: 'Moments Across Years',
        description: 'Snapshots, milestones, and family memories.',
        memories: [],
      },
      {
        id: 'letter-priyam',
        type: 'letter',
        title: 'Letter',
        recipient: 'Priyam Didi',
        bodyParagraphs: [],
      },
    ],
  },
  shristi: {
    person: 'shristi',
    displayName: 'Shristi',
    spaceTitle: 'Between Us // Shristi',
    tagline: 'A private corner for memories, shared conversations, and unhurried thoughts.',
    blocks: [
      {
        id: 'intro-shristi',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'For Shristi',
        message: 'A quiet archive kept intact for words and memories.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-shristi',
        type: 'memory-collection',
        title: 'Collected Moments',
        description: 'Preserved notes and shared observations.',
        memories: [],
      },
      {
        id: 'letter-shristi',
        type: 'letter',
        title: 'Letter',
        recipient: 'Shristi',
        bodyParagraphs: [],
      },
    ],
  },
  anushka: {
    person: 'anushka',
    displayName: 'Anushka',
    spaceTitle: 'Between Us // Anushka',
    tagline: 'A dedicated space for memories, quiet observations, and shared chapters.',
    blocks: [
      {
        id: 'intro-anushka',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'For Anushka',
        message: 'A quiet repository dedicated to shared conversations and memories.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-anushka',
        type: 'memory-collection',
        title: 'Chronicles & Notes',
        description: 'Moments and recollections.',
        memories: [],
      },
      {
        id: 'letter-anushka',
        type: 'letter',
        title: 'Letter',
        recipient: 'Anushka',
        bodyParagraphs: [],
      },
    ],
  },
  prakhar: {
    person: 'prakhar',
    displayName: 'Prakhar',
    spaceTitle: 'Between Us // Prakhar',
    tagline: 'A personal archive of shared projects, long conversations, and quiet camaraderie.',
    blocks: [
      {
        id: 'intro-prakhar',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'For Prakhar',
        message: 'A dedicated corner for shared pursuits, memories, and ideas.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-prakhar',
        type: 'memory-collection',
        title: 'Shared Milestones',
        description: 'Expeditions, milestones, and discussions.',
        memories: [],
      },
      {
        id: 'letter-prakhar',
        type: 'letter',
        title: 'Letter',
        recipient: 'Prakhar',
        bodyParagraphs: [],
      },
    ],
  },
  sarthak: {
    person: 'sarthak',
    displayName: 'Sarthak',
    spaceTitle: 'Between Us // Sarthak',
    tagline: 'A private vault of memories, shared adventures, and honest reflections.',
    blocks: [
      {
        id: 'intro-sarthak',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'For Sarthak',
        message: 'A personal space for shared paths and lasting camaraderie.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-sarthak',
        type: 'memory-collection',
        title: 'Field Notes & Milestones',
        description: 'Captured moments and shared memories.',
        memories: [],
      },
      {
        id: 'letter-sarthak',
        type: 'letter',
        title: 'Letter',
        recipient: 'Sarthak',
        bodyParagraphs: [],
      },
    ],
  },
  utsav: {
    person: 'utsav',
    displayName: 'Utsav',
    spaceTitle: 'Between Us // Utsav',
    tagline: 'A dedicated space for shared memories, deep conversations, and brotherly bonds.',
    blocks: [
      {
        id: 'intro-utsav',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'For Utsav',
        message: 'A quiet vault dedicated to shared conversations and long-standing friendship.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-utsav',
        type: 'memory-collection',
        title: 'Shared Moments',
        description: 'Preserved memories and shared markers.',
        memories: [],
      },
      {
        id: 'letter-utsav',
        type: 'letter',
        title: 'Letter',
        recipient: 'Utsav',
        bodyParagraphs: [],
      },
    ],
  },
  yash: {
    person: 'yash',
    displayName: 'Yash',
    spaceTitle: 'Between Us // Yash',
    tagline: 'A personal archive of shared laughs, late night talks, and mutual memories.',
    blocks: [
      {
        id: 'intro-yash',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'For Yash',
        message: 'A dedicated space for shared stories, memories, and quiet thoughts.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-yash',
        type: 'memory-collection',
        title: 'Chronicles & Moments',
        description: 'Recollections and shared milestones.',
        memories: [],
      },
      {
        id: 'letter-yash',
        type: 'letter',
        title: 'Letter',
        recipient: 'Yash',
        bodyParagraphs: [],
      },
    ],
  },
};

/**
 * Returns the person-specific configuration for the authenticated person.
 */
export function getPersonSpaceConfig(person: PersonId): PersonSpaceConfig {
  if (PERSON_CONFIGS[person]) {
    return PERSON_CONFIGS[person];
  }

  const profile = getPersonProfileById(person);
  const displayName = profile?.displayName || 'Friend';

  return {
    person,
    displayName,
    spaceTitle: `Between Us // ${displayName}`,
    tagline: 'A dedicated private space for shared memories and reflections.',
    blocks: [
      {
        id: `intro-${person}`,
        type: 'personal-intro',
        title: 'Introduction',
        greeting: `For ${displayName}`,
        message: 'A dedicated corner preserved away from the stream.',
        dateStamp: 'EST. 2026',
      },
    ],
  };
}
