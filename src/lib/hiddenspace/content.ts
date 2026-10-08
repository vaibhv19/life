import { PersonId } from './access';

export interface SharedContentSection {
  id: 'bucket-list' | 'places-to-visit' | 'unpublished-books' | 'notes-to-myself';
  title: string;
  subtitle: string;
  entriesCount: number;
}

export const SHARED_CONTENT_SECTIONS: SharedContentSection[] = [
  {
    id: 'bucket-list',
    title: 'Bucket List',
    subtitle: 'Unfinished pursuits, quiet ambitions & lifelong milestones',
    entriesCount: 0,
  },
  {
    id: 'places-to-visit',
    title: 'Places I Want To Visit',
    subtitle: 'High ridges, remote passes, brutalist architectures & nocturnal alleys',
    entriesCount: 0,
  },
  {
    id: 'unpublished-books',
    title: 'Unpublished Books',
    subtitle: 'Draft manuscripts, essay fragments & unreleased writings',
    entriesCount: 0,
  },
  {
    id: 'notes-to-myself',
    title: 'Notes To Myself',
    subtitle: 'Unfiltered reminders, mental checkpoints & private aphorisms',
    entriesCount: 0,
  },
];

export interface PersonalSpaceMeta {
  person: PersonId;
  sectionTitle: string;
  description: string;
}

export function getPersonalSpaceMeta(person: PersonId): PersonalSpaceMeta {
  if (person === 'zoya') {
    return {
      person: 'zoya',
      sectionTitle: 'Dedicated Space // Zoya',
      description: 'Private reflections, mutual field notes and dedicated correspondence.',
    };
  }

  return {
    person: 'vaibhav',
    sectionTitle: 'Dedicated Space // Vaibhav',
    description: 'Personal sketchbook logs, vault drafts and private marginalia.',
  };
}
