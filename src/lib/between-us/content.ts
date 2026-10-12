import { PersonId } from './access';
import { PersonSpaceConfig } from './types';

/**
 * Person-specific content configurations for Between Us.
 * Zoya's page serves as the reference implementation for future personal spaces.
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
};

/**
 * Returns the person-specific configuration for the authenticated person.
 * Zoya's configuration serves as the primary reference implementation.
 */
export function getPersonSpaceConfig(person: PersonId): PersonSpaceConfig {
  return PERSON_CONFIGS[person] || PERSON_CONFIGS.zoya;
}
