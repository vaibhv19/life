export interface ExtraaSectionMeta {
  id: string;
  numeral: string;
  title: string;
  subtitle: string;
  count: number;
}

export const EXTRAA_SECTIONS: ExtraaSectionMeta[] = [
  {
    id: 'bucket-list',
    numeral: '01',
    title: 'Bucket List',
    subtitle: 'Lifelong pursuits, mountaineering objectives & personal milestones',
    count: 0,
  },
  {
    id: 'places',
    numeral: '02',
    title: 'Places I Want To Visit',
    subtitle: 'Remote high altitude passes, brutalist sanctuaries & unmapped coordinates',
    count: 0,
  },
  {
    id: 'unpublished-books',
    numeral: '03',
    title: 'Unpublished Books',
    subtitle: 'Draft manuscripts, essay fragments & unedited volumes',
    count: 0,
  },
  {
    id: 'notes-to-self',
    numeral: '04',
    title: 'Notes To Myself',
    subtitle: 'Unfiltered reminders, operating principles & internal checkpoints',
    count: 0,
  },
  {
    id: 'things-to-remember',
    numeral: '05',
    title: 'Things I Want To Remember',
    subtitle: 'Quiet conversations, ephemeral realizations & pivotal turns',
    count: 0,
  },
  {
    id: 'letters-never-sent',
    numeral: '06',
    title: 'Letters Never Sent',
    subtitle: 'Unsent correspondence, unsent drafts & sealed words',
    count: 0,
  },
];
