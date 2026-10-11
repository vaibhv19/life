import fs from 'fs';
import path from 'path';

export interface NoteEntry {
  slug: string;
  title: string;
  date?: string;
  formattedDate?: string;
  summary?: string;
  content: string;
}

/**
 * Basic lightweight frontmatter parser for markdown files.
 */
function parseNoteFile(rawContent: string, slug: string): NoteEntry {
  let title = slug.replace(/[-_]/g, ' ');
  let date: string | undefined = undefined;
  let formattedDate: string | undefined = undefined;
  let summary: string | undefined = undefined;
  let content = rawContent;

  const frontmatterMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (frontmatterMatch) {
    const yamlBlock = frontmatterMatch[1];
    content = frontmatterMatch[2].trim();

    const lines = yamlBlock.split('\n');
    for (const line of lines) {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim().toLowerCase();
        const value = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');

        if (key === 'title' && value) {
          title = value;
        } else if (key === 'date' && value) {
          date = value;
          try {
            const dateObj = new Date(value);
            if (!isNaN(dateObj.getTime())) {
              formattedDate = dateObj.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });
            } else {
              formattedDate = value;
            }
          } catch {
            formattedDate = value;
          }
        } else if (key === 'summary' && value) {
          summary = value;
        }
      }
    }
  }

  // Capitalize title fallback if no frontmatter title
  if (title === slug.replace(/[-_]/g, ' ')) {
    title = title
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  return {
    slug,
    title,
    date,
    formattedDate,
    summary,
    content,
  };
}

/**
 * Retrieves all notes from content/notes/, sorted newest to oldest.
 */
export function getAllNotes(): NoteEntry[] {
  try {
    const notesDir = path.join(process.cwd(), 'content', 'notes');
    if (!fs.existsSync(notesDir)) {
      return [];
    }

    const files = fs.readdirSync(notesDir);
    const notes: NoteEntry[] = [];

    for (const file of files) {
      if (file.endsWith('.md') || file.endsWith('.markdown')) {
        const filePath = path.join(notesDir, file);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const slug = file.replace(/\.(md|markdown)$/i, '');
        notes.push(parseNoteFile(raw, slug));
      }
    }

    // Sort by date descending if dates exist, otherwise slug
    notes.sort((a, b) => {
      if (a.date && b.date) {
        return b.date.localeCompare(a.date);
      }
      if (a.date) return -1;
      if (b.date) return 1;
      return a.slug.localeCompare(b.slug);
    });

    return notes;
  } catch (error) {
    console.error('Error reading notes:', error);
    return [];
  }
}

/**
 * Retrieves a single note by slug.
 */
export function getNoteBySlug(slug: string): NoteEntry | null {
  try {
    const notesDir = path.join(process.cwd(), 'content', 'notes');
    const mdPath = path.join(notesDir, `${slug}.md`);
    const markdownPath = path.join(notesDir, `${slug}.markdown`);

    let targetPath: string | null = null;
    if (fs.existsSync(mdPath)) {
      targetPath = mdPath;
    } else if (fs.existsSync(markdownPath)) {
      targetPath = markdownPath;
    }

    if (!targetPath) {
      return null;
    }

    const raw = fs.readFileSync(targetPath, 'utf-8');
    return parseNoteFile(raw, slug);
  } catch (error) {
    console.error(`Error reading note ${slug}:`, error);
    return null;
  }
}
