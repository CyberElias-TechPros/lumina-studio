import { allCourses, flyerCourses, rotatingCourses } from "./catalog";
import type { AcademyCourse, ClassSession, SessionLecture } from "./types";
import { microsoftOfficeLessons } from "./lessons/microsoft-office";
import { microsoftOfficeLessonsB } from "./lessons/microsoft-office-documents";
import { microsoftOfficeExcelLessons } from "./lessons/microsoft-office-excel";
import {
  computerBasicsTypingLessonsA,
} from "./lessons/computer-basics-typing-a";
import { computerBasicsTypingLessonsB } from "./lessons/computer-basics-typing";
import { dataEntryLessonsA } from "./lessons/data-entry";
import { dataEntryLessonsB } from "./lessons/data-entry-b";
import { graphicDesignLessonsA } from "./lessons/graphic-design";
import { graphicDesignLessonsB } from "./lessons/graphic-design-b";
import { graphicDesignLessonsC } from "./lessons/graphic-design-c";
import { socialMediaLessonsA } from "./lessons/social-media-management";
import { socialMediaLessonsB } from "./lessons/social-media-management-b";
import { webDesignLessonsA } from "./lessons/web-design";
import { webDesignLessonsB } from "./lessons/web-design-b";
import { webDesignLessonsC } from "./lessons/web-design-c";
import { computerRepairsLessonsA } from "./lessons/computer-repairs";
import { computerRepairsLessonsB } from "./lessons/computer-repairs-b";
import { computerRepairsLessonsC } from "./lessons/computer-repairs-c";
import { cybersecurityLessonsA } from "./lessons/cybersecurity";
import { cybersecurityLessonsB } from "./lessons/cybersecurity-b";
import { cybersecurityLessonsC } from "./lessons/cybersecurity-c";
import { digitalMarketingLessonsA } from "./lessons/digital-marketing";
import { digitalMarketingLessonsB } from "./lessons/digital-marketing-b";
import { digitalMarketingLessonsC } from "./lessons/digital-marketing-c";
import { businessFreelancingLessonsA } from "./lessons/business-freelancing";
import { businessFreelancingLessonsB } from "./lessons/business-freelancing-b";
import { contentCreationLessonsA } from "./lessons/content-creation";
import { contentCreationLessonsB } from "./lessons/content-creation-b";
import { onlineTeachingLessonsA } from "./lessons/online-teaching";
import { onlineTeachingLessonsB } from "./lessons/online-teaching-b";
import { webDevelopmentLessonsA } from "./lessons/web-development";
import { webDevelopmentLessonsB } from "./lessons/web-development-b";
import { webDevelopmentLessonsC } from "./lessons/web-development-c";

export * from "./types";
export { allCourses, flyerCourses, rotatingCourses };

/** Every published class lecture, keyed by "course/session". */
export const sessionLectures: Record<string, SessionLecture> = {
  ...withCoursePrefix("microsoft-office", {
    ...microsoftOfficeLessons,
    ...microsoftOfficeLessonsB,
    ...microsoftOfficeExcelLessons,
  }),
  ...withCoursePrefix("computer-basics-typing", {
    ...computerBasicsTypingLessonsA,
    ...computerBasicsTypingLessonsB,
  }),
  ...withCoursePrefix("data-entry", {
    ...dataEntryLessonsA,
    ...dataEntryLessonsB,
  }),
  ...withCoursePrefix("graphic-design", {
    ...graphicDesignLessonsA,
    ...graphicDesignLessonsB,
    ...graphicDesignLessonsC,
  }),
  ...withCoursePrefix("social-media-management", {
    ...socialMediaLessonsA,
    ...socialMediaLessonsB,
  }),
  ...withCoursePrefix("web-design", {
    ...webDesignLessonsA,
    ...webDesignLessonsB,
    ...webDesignLessonsC,
  }),
  ...withCoursePrefix("computer-repairs", {
    ...computerRepairsLessonsA,
    ...computerRepairsLessonsB,
    ...computerRepairsLessonsC,
  }),
  ...withCoursePrefix("cybersecurity", {
    ...cybersecurityLessonsA,
    ...cybersecurityLessonsB,
    ...cybersecurityLessonsC,
  }),
  ...withCoursePrefix("digital-marketing", {
    ...digitalMarketingLessonsA,
    ...digitalMarketingLessonsB,
    ...digitalMarketingLessonsC,
  }),
  ...withCoursePrefix("business-freelancing", {
    ...businessFreelancingLessonsA,
    ...businessFreelancingLessonsB,
  }),
  ...withCoursePrefix("content-creation", {
    ...contentCreationLessonsA,
    ...contentCreationLessonsB,
  }),
  ...withCoursePrefix("online-teaching", {
    ...onlineTeachingLessonsA,
    ...onlineTeachingLessonsB,
  }),
  ...withCoursePrefix("web-development", {
    ...webDevelopmentLessonsA,
    ...webDevelopmentLessonsB,
    ...webDevelopmentLessonsC,
  }),
};

function withCoursePrefix(
  courseSlug: string,
  lessons: Record<string, SessionLecture>,
): Record<string, SessionLecture> {
  return Object.fromEntries(
    Object.entries(lessons).map(([sessionSlug, lecture]) => [
      `${courseSlug}/${sessionSlug}`,
      lecture,
    ]),
  );
}

/** A session with its lecture resolved, ready to render. */
export interface ResolvedSession extends ClassSession {
  courseSlug: string;
  courseTitle: string;
  lecture?: SessionLecture;
}

/** A course with lectures attached to its sessions. */
export interface ResolvedCourse extends Omit<AcademyCourse, "sessions"> {
  sessions: ResolvedSession[];
  sessionCount: number;
  publishedCount: number;
  totalMinutes: number;
}

export function resolveCourse(course: AcademyCourse): ResolvedCourse {
  const sessions = course.sessions.map((session) => ({
    ...session,
    courseSlug: course.slug,
    courseTitle: course.title,
    lecture: sessionLectures[`${course.slug}/${session.slug}`],
  }));
  return {
    ...course,
    sessions,
    sessionCount: sessions.length,
    publishedCount: sessions.filter((s) => s.lecture).length,
    totalMinutes: sessions.reduce((sum, s) => sum + s.minutes, 0),
  };
}

export const resolvedCourses: ResolvedCourse[] = allCourses.map(resolveCourse);
export const resolvedFlyerCourses = flyerCourses.map(resolveCourse);
export const resolvedRotatingCourses = rotatingCourses.map(resolveCourse);

export function findCourse(slug: string): ResolvedCourse | undefined {
  return resolvedCourses.find((c) => c.slug === slug);
}

export function findSession(
  courseSlug: string,
  sessionSlug: string,
):
  | {
      course: ResolvedCourse;
      session: ResolvedSession;
      prev?: ResolvedSession;
      next?: ResolvedSession;
    }
  | undefined {
  const course = findCourse(courseSlug);
  if (!course) return undefined;
  const index = course.sessions.findIndex((s) => s.slug === sessionSlug);
  if (index === -1) return undefined;
  return {
    course,
    session: course.sessions[index],
    prev: course.sessions[index - 1],
    next: course.sessions[index + 1],
  };
}

/** Course slugs that have at least one published lecture. */
export function coursesWithLectures(): ResolvedCourse[] {
  return resolvedCourses.filter((c) => c.publishedCount > 0);
}

export function allPublishedSessions(): { course: ResolvedCourse; session: ResolvedSession }[] {
  return resolvedCourses.flatMap((course) =>
    course.sessions.filter((s) => s.lecture).map((session) => ({ course, session })),
  );
}

/** Honest reading time for a lecture, computed from its actual content. */
export function lectureReadingMinutes(lecture: SessionLecture): number {
  const words = [
    lecture.summary,
    ...lecture.objectives,
    ...lecture.blocks.flatMap((b) => [b.heading, ...b.body]),
    lecture.demonstration.intro,
    ...lecture.demonstration.steps.flatMap((s) => [s.step, s.detail]),
    lecture.practice.title,
    lecture.practice.brief,
    ...lecture.practice.steps,
    lecture.practice.standard,
    ...lecture.pitfalls.flatMap((p) => [p.problem, p.fix]),
    ...lecture.expertNotes,
    ...lecture.vocabulary.flatMap((v) => [v.term, v.meaning]),
    ...lecture.homework.flatMap((h) => [h.task, h.detail]),
    ...lecture.rubric.flatMap((r) => [r.criterion, r.passing, r.excellent]),
    ...lecture.faqs.flatMap((f) => [f.q, f.a]),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function lectureWordCount(lecture: SessionLecture): number {
  const words = [
    lecture.summary,
    ...lecture.blocks.flatMap((b) => b.body),
    ...lecture.demonstration.steps.flatMap((s) => [s.step, s.detail]),
    ...lecture.pitfalls.flatMap((p) => [p.problem, p.fix]),
    ...lecture.expertNotes,
    ...lecture.faqs.flatMap((f) => [f.q, f.a]),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return words;
}

export function formatFee(fee: number): string {
  return `₦${fee.toLocaleString("en-NG")}`;
}

export function formatDuration(course: ResolvedCourse | AcademyCourse): string {
  return `${course.weeks} week${course.weeks === 1 ? "" : "s"} · ${course.sessions.length} sessions`;
}

export const courseCategories = [
  "Office & Data",
  "Creative & Media",
  "Web & Code",
  "Hardware & Security",
  "Business & Teaching",
] as const;
