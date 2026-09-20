import { blogPosts, type BlogPost } from "@/data/blog";

export type NoteChapter = {
  slug: string;
  title: string;
  blurb: string;
  from: number;
  to: number;
  /** Course a reader can take if they want this taught in the room. */
  courseSlug: string;
  courseLabel: string;
};

/** Ten chapters of ten. The series is one line; the chapters are how a person finds their place. */
export const noteChapters: NoteChapter[] = [
  {
    slug: "the-first-sitting",
    title: "The first sitting",
    blurb: "The machine, files, the keyboard, the internet, email, and the first traps.",
    from: 1,
    to: 10,
    courseSlug: "computer-basics-typing",
    courseLabel: "Computer Basics",
  },
  {
    slug: "keeping-the-machine",
    title: "Keeping the machine",
    blurb: "Letters, photographs, updates, backup, Wi‑Fi, power, forms, and a slow computer.",
    from: 11,
    to: 20,
    courseSlug: "computer-basics-typing",
    courseLabel: "Computer Basics",
  },
  {
    slug: "files-that-travel",
    title: "Files that travel",
    blurb: "Install, uninstall, copy, screenshots, zip, Bluetooth, and what a PDF is for.",
    from: 21,
    to: 30,
    courseSlug: "computer-basics-typing",
    courseLabel: "Computer Basics",
  },
  {
    slug: "finding-your-way",
    title: "Finding your way",
    blurb: "Folders, names, search, the taskbar, sound, brightness, and extra devices.",
    from: 31,
    to: 40,
    courseSlug: "computer-basics-typing",
    courseLabel: "Computer Basics",
  },
  {
    slug: "other-peoples-computers",
    title: "Other people’s computers",
    blurb: "Battery, heat, the webcam, cookies, a shared machine, bookmarks, and signing out.",
    from: 41,
    to: 50,
    courseSlug: "computer-basics-typing",
    courseLabel: "Computer Basics",
  },
  {
    slug: "everyday-office",
    title: "Everyday office",
    blurb: "Tables, calendar, contacts, QR codes, WhatsApp Web, maps, a poster, and “virus” scares.",
    from: 51,
    to: 60,
    courseSlug: "microsoft-office",
    courseLabel: "Microsoft Office",
  },
  {
    slug: "writing-on-the-page",
    title: "Writing on the page",
    blurb: "Two windows, lists, spell check, find and replace, undo, page numbers, Cc, and a signature.",
    from: 61,
    to: 70,
    courseSlug: "microsoft-office",
    courseLabel: "Microsoft Office",
  },
  {
    slug: "spreadsheets-and-sharing",
    title: "Spreadsheets and sharing",
    blurb: "Open with, file size, drag and drop, a CV, Google Docs, comments, sort, and print.",
    from: 71,
    to: 80,
    courseSlug: "microsoft-office",
    courseLabel: "Microsoft Office",
  },
  {
    slug: "the-phone",
    title: "The phone",
    blurb: "Money on a grid, video, captions, airplane mode, storage, permissions, and a hotspot.",
    from: 81,
    to: 90,
    courseSlug: "computer-basics-typing",
    courseLabel: "Computer Basics",
  },
  {
    slug: "stay-safe",
    title: "Stay safe",
    blurb: "Locks, a stolen phone, OTPs, public Wi‑Fi, scanning a page, and the prize that wants a fee.",
    from: 91,
    to: 100,
    courseSlug: "cybersecurity",
    courseLabel: "Cybersecurity",
  },
];

const byOrder = [...blogPosts].sort((a, b) => a.order - b.order);

export function notesInOrder(): BlogPost[] {
  return byOrder;
}

export function chapterForOrder(order: number): NoteChapter | undefined {
  return noteChapters.find((c) => order >= c.from && order <= c.to);
}

export function notesInChapter(chapter: NoteChapter): BlogPost[] {
  return byOrder.filter((p) => p.order >= chapter.from && p.order <= chapter.to);
}

export function adjacentNotes(post: BlogPost): { prev?: BlogPost; next?: BlogPost } {
  const i = byOrder.findIndex((p) => p.slug === post.slug);
  if (i < 0) return {};
  return { prev: byOrder[i - 1], next: byOrder[i + 1] };
}

export function relatedNotes(post: BlogPost, count = 3): BlogPost[] {
  const chapter = chapterForOrder(post.order);
  const pool = chapter
    ? notesInChapter(chapter).filter((p) => p.slug !== post.slug)
    : byOrder.filter((p) => p.slug !== post.slug);
  const later = pool.filter((p) => p.order > post.order);
  const earlier = pool.filter((p) => p.order < post.order).reverse();
  return [...later, ...earlier].slice(0, count);
}
