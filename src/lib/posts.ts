import fs from 'fs';
import path from 'path';

export interface ArchivePost {
  id: string;
  filename: string;
  src: string;
  rawDate: string;
  year: number;
  month: number;
  day: number;
  formattedDate: string;
  monthYear: string;
  suffix?: string;
  title?: string;
  caption?: string;
}

const SUPPORTED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif']);

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Parses and validates an archive filename.
 * Canonical pattern: YYYY-MM-DD.ext or YYYY-MM-DD-suffix.ext
 */
export function parseArchiveFilename(filename: string): ArchivePost | null {
  const trimmed = filename.trim();
  const match = trimmed.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:-([a-zA-Z0-9_\-]+))?\.(jpe?g|png|webp|avif)$/i
  );

  if (!match) {
    return null;
  }

  const [, yearStr, monthStr, dayStr, suffix, ext] = match;

  if (!SUPPORTED_EXTENSIONS.has(ext.toLowerCase())) {
    return null;
  }

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > 2100) {
    return null;
  }

  // Validate actual calendar date (e.g. leap years, 30 vs 31 days)
  const dateObj = new Date(year, month - 1, day);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    return null;
  }

  const rawDate = `${yearStr}-${monthStr}-${dayStr}`;
  const monthName = MONTH_NAMES[month - 1];
  const formattedDate = `${day} ${monthName} ${year}`;
  const monthYear = `${monthName} ${year}`;
  const id = trimmed.replace(/\.[^/.]+$/, '');

  return {
    id,
    filename: trimmed,
    src: `/archive/${trimmed}`,
    rawDate,
    year,
    month,
    day,
    formattedDate,
    monthYear,
    suffix: suffix || undefined,
  };
}

/**
 * Automatically discovers all photographs in public/archive,
 * validates filename conventions, and returns them sorted newest to oldest.
 */
export function getArchivePosts(): ArchivePost[] {
  try {
    const archiveDir = path.join(process.cwd(), 'public', 'archive');
    if (!fs.existsSync(archiveDir)) {
      return [];
    }

    const entries = fs.readdirSync(archiveDir);
    const validPosts: ArchivePost[] = [];

    for (const entry of entries) {
      const parsed = parseArchiveFilename(entry);
      if (parsed) {
        validPosts.push(parsed);
      }
    }

    // Sort newest to oldest. Stable tie-breaking by filename descending.
    validPosts.sort((a, b) => {
      const dateComparison = b.rawDate.localeCompare(a.rawDate);
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return b.filename.localeCompare(a.filename);
    });

    return validPosts;
  } catch (error) {
    console.error('Error discovering archive posts:', error);
    return [];
  }
}
