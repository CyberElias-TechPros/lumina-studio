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

/** Selectable source shown inside a taught block. Never an image of code. */
export interface LectureCode {
  /** File the learner should put this in, when that matters. */
  filename?: string;
  language: string;
  source: string;
  caption?: string;
}

/** One taught block inside the lecture body. */
export interface LectureBlock {
  heading: string;
  body: string[];
  /** A one-line rule to keep, rendered as a callout after the paragraphs. */
  remember?: string;
  /** Runnable or copyable samples. Rendered after the paragraphs. */
  code?: LectureCode[];
}

/**
 * Where a standalone tutorial sits on its roadmap. Optional so older
 * classroom lectures stay valid. Rendered when present.
 */
export interface LearningPath {
  fits: string;
  prerequisites: string[];
  unlocks: string;
  nextLesson: { label: string; href: string };
  practiceTime: string;
  definitionOfDone: string[];
  assumptions: string[];
}

/** An original diagram or illustration placed after a taught block. */
export interface LectureFigure {
  id: string;
  src: string;
  alt: string;
  caption: string;
  /** Render immediately after the taught-content block with this heading. */
  afterHeading: string;
}

/** Symptom-first diagnosis. One observable problem, not a vague category. */
export interface TroubleshootingItem {
  symptom: string;
  likelyCause: string;
  check: string;
  fix: string;
  prevention: string;
  whenToStop?: string;
}

export interface PracticeExercise {
  title: string;
  kind: "Recognition" | "Guided" | "Variation" | "Mini-task" | "Challenge";
  prompt: string;
  hint?: string;
  expected: string;
  solution: string;
}

export interface LectureSource {
  title: string;
  url: string;
  note: string;
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
  /** ISO date this lecture was last checked. Falls back to the page default. */
  reviewed?: string;
  /** "By the end of this session you will be able to…" */
  objectives: string[];
  /** Roadmap position. Present on standalone tutorials. */
  learningPath?: LearningPath;
  /** The taught content, in teaching order. */
  blocks: LectureBlock[];
  /** Diagrams placed after the block named in `afterHeading`. */
  figures?: LectureFigure[];
  /** Instructor demonstration the class watches before practising. */
  demonstration: Demonstration;
  practice: PracticeTask;
  pitfalls: Pitfall[];
  /** Symptom → likely cause → check → fix. Rendered when present. */
  troubleshooting?: TroubleshootingItem[];
  /** Permissions, power, privacy, shared machines. Only when relevant. */
  safetyNotes?: string[];
  expertNotes: string[];
  vocabulary: VocabularyEntry[];
  homework: HomeworkTask[];
  /** Independent practice with expected results and solutions. */
  exercises?: PracticeExercise[];
  /** Short "can you do this?" list. Not a repeat of the article. */
  mastery?: string[];
  rubric: RubricRow[];
  faqs: { q: string; a: string }[];
  sources?: LectureSource[];
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
