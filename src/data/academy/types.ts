/**
 * Cyber Elias Academy — practical digital skills curriculum.
 *
 * The curriculum is published on the public site as a full class lecture per
 * session (see src/routes/classes.*.tsx). Everything a learner would receive in
 * the classroom is rendered on the page: objectives, the taught theory, the
 * instructor demonstration script, guided practice, common mistakes, expert
 * notes, vocabulary, homework, the assessment rubric and session FAQs.
 */

export type CourseLevel = "Absolute beginner" | "Beginner" | "Intermediate";

export type CourseCategory =
  | "Office & Data"
  | "Creative & Media"
  | "Web & Code"
  | "Hardware & Security"
  | "Business & Teaching";

/** One taught block inside the lecture body. */
export interface LectureBlock {
  heading: string;
  body: string[];
}

/** A scripted instructor demonstration, step by step. */
export interface Demonstration {
  intro: string;
  steps: { step: string; detail: string }[];
}

/** The guided/individual practice the student performs in class. */
export interface PracticeTask {
  title: string;
  brief: string;
  steps: string[];
  /** What "done properly" looks like — the standard the instructor holds. */
  standard: string;
}

export interface Pitfall {
  problem: string;
  fix: string;
}

export interface VocabularyEntry {
  term: string;
  meaning: string;
}

export interface HomeworkTask {
  task: string;
  detail: string;
}

export interface RubricRow {
  criterion: string;
  passing: string;
  excellent: string;
}

export interface SessionLecture {
  /** Two-to-three sentence framing shown under the title. */
  summary: string;
  /** "By the end of this session you will be able to…" */
  objectives: string[];
  /** The taught content, in teaching order. */
  blocks: LectureBlock[];
  /** Instructor demonstration the class watches before practising. */
  demonstration: Demonstration;
  practice: PracticeTask;
  pitfalls: Pitfall[];
  expertNotes: string[];
  vocabulary: VocabularyEntry[];
  homework: HomeworkTask[];
  rubric: RubricRow[];
  faqs: { q: string; a: string }[];
}

export interface ClassSession {
  /** Session number within the course, 1-based. */
  number: number;
  /** Week number within the course, 1-based. */
  week: number;
  title: string;
  /** Topic list exactly as published on the course flyer. */
  topics: string[];
  /** Nominal contact time in minutes (1.5–2h sessions). */
  minutes: number;
  slug: string;
  lecture?: SessionLecture;
}

export interface CourseWeek {
  week: number;
  theme: string;
  summary: string;
}

export interface AcademyCourse {
  slug: string;
  title: string;
  /** Tuition in Naira, as advertised on the flyer. */
  fee: number;
  weeks: number;
  sessionsPerWeek: number;
  level: CourseLevel;
  category: CourseCategory;
  /** Short courses that rotate through the timetable rather than run weekly. */
  rotating?: boolean;
  /** One-sentence hook used on cards and in the meta description. */
  hook: string;
  /** The fuller "what this course is and why it exists" paragraph(s). */
  goal: string[];
  audience: string[];
  requirements: string[];
  outcomes: string[];
  deliverable: { title: string; detail: string };
  weekOutline: CourseWeek[];
  sessions: ClassSession[];
  faqs: { q: string; a: string }[];
}

/** The three levels of achievement every CEA course is assessed against. */
export const achievementLevels = [
  {
    level: 1,
    name: "Know",
    description:
      "You can explain the concept, name the tools involved and recognise the difference between doing it well and doing it carelessly.",
  },
  {
    level: 2,
    name: "Do",
    description:
      "You can perform the task independently, without the instructor repeating the steps, and fix the obvious problems when they appear.",
  },
  {
    level: 3,
    name: "Create",
    description:
      "You can use the skill to produce something a real person would pay for — a document, a design, a website, a report, a repaired machine.",
  },
];

/** The delivery method used across every course. */
export const teachingLoop = [
  "Learn",
  "Practice",
  "Create",
  "Correct",
  "Repeat",
  "Demonstrate",
] as const;
