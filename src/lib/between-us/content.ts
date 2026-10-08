import { PersonId } from './access';
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
  vaibhav: {
    person: 'vaibhav',
    displayName: 'Vaibhav',
    spaceTitle: 'Between Us // Vaibhav',
    tagline: 'A personal archive of unreleased notebooks, field thoughts, and internal observations.',
    blocks: [
      {
        id: 'intro-vaibhav',
        type: 'personal-intro',
        title: 'Introduction',
        greeting: 'Vaibhav',
        message: 'Vault of unshared observations and ongoing notes.',
        dateStamp: 'EST. 2026',
      },
      {
        id: 'memories-vaibhav',
        type: 'memory-collection',
        title: 'Field Notes & Observations',
        description: 'Personal marginalia, negative scans and unwritten drafts.',
        memories: [],
      },
      {
        id: 'custom-vaibhav',
        type: 'custom-section',
        title: 'Unpublished Reflections',
        heading: 'Notebook Margins',
        content: '',
        tag: 'DRAFT // 01',
      },
    ],
  },
};

/**
 * Returns the person-specific configuration for the authenticated person.
 */
export function getPersonSpaceConfig(person: PersonId): PersonSpaceConfig {
  return PERSON_CONFIGS[person] || PERSON_CONFIGS.vaibhav;
}
