import { PersonId } from './access';

export type ContentBlockType =
  | 'personal-intro'
  | 'memory-collection'
  | 'letter'
  | 'shared-memory'
  | 'timeline'
  | 'custom-section';

export interface BaseContentBlock {
  id: string;
  type: ContentBlockType;
  title: string;
  subtitle?: string;
}

export interface PersonalIntroBlock extends BaseContentBlock {
  type: 'personal-intro';
  greeting: string;
  message: string;
  dateStamp?: string;
}

export interface MemoryCollectionBlock extends BaseContentBlock {
  type: 'memory-collection';
  description: string;
  memories: Array<{
    id: string;
    title: string;
    date?: string;
    note?: string;
    location?: string;
  }>;
}

export interface LetterBlock extends BaseContentBlock {
  type: 'letter';
  recipient: string;
  dateWritten?: string;
  bodyParagraphs: string[];
  signoff?: string;
}

export interface SharedMemoryBlock extends BaseContentBlock {
  type: 'shared-memory';
  momentTitle: string;
  narrative: string;
  coordinates?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface TimelineBlock extends BaseContentBlock {
  type: 'timeline';
  events: TimelineEvent[];
}

export interface CustomSectionBlock extends BaseContentBlock {
  type: 'custom-section';
  heading: string;
  content: string;
  tag?: string;
}

export type ContentBlock =
  | PersonalIntroBlock
  | MemoryCollectionBlock
  | LetterBlock
  | SharedMemoryBlock
  | TimelineBlock
  | CustomSectionBlock;

export interface PersonSpaceConfig {
  person: PersonId;
  displayName: string;
  spaceTitle: string;
  tagline: string;
  blocks: ContentBlock[];
}
