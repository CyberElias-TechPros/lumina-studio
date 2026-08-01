/**
 * Generates api/seeds/lms-data.sql + api/seeds/lms.ts from the canonical
 * collections in ../../src/data/learning.ts (learningCourses, gradebook).
 * Run: npm run gen:seed (from api/).
 *
 * The seed models a demo student (student@cea.ng) + demo instructor
 * (instructor@cea.ng). Course templates carry lesson status 'preview' or
 * 'locked'; the demo student's per-user state lives in lesson_progress rows,
 * which is exactly how the API computes statuses for any user.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  learningCourses,
  gradebook,
  assignments,
  assessments,
  calendarEvents,
  threads,
} from "../../src/data/learning";

const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "seeds");

const DEMO_STUDENT_ID = "00000000-0000-4000-8000-000000000001";
const DEMO_INSTRUCTOR_ID = "00000000-0000-4000-8000-000000000002";

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''").replace(/\\/g, "\\\\")}'`;
}

function jsonString(value: unknown): string {
  return sqlString(JSON.stringify(value));
}

const statements: string[] = [];

statements.push(
  `INSERT OR IGNORE INTO users (id, name, email, role_key, status) ` +
    `VALUES (${sqlString(DEMO_STUDENT_ID)}, 'Chiamaka Obi', 'student@cea.ng', 'student', 'active');`,
);
statements.push(
  `INSERT OR IGNORE INTO users (id, name, email, role_key, status) ` +
    `VALUES (${sqlString(DEMO_INSTRUCTOR_ID)}, 'Ifeanyi Duru', 'instructor@cea.ng', 'instructor', 'active');`,
);

for (const course of learningCourses) {
  const modules = course.modules.map((m) => ({
    ...m,
    lessons: m.lessons.map((l) => ({
      ...l,
      status: l.status === "preview" ? "preview" : "locked",
    })),
  }));
  statements.push(
    `INSERT OR IGNORE INTO courses (slug, title, subtitle, cohort, instructor, tone, modules, sort_order) ` +
      `VALUES (${sqlString(course.slug)}, ${sqlString(course.title)}, ${sqlString(course.subtitle)}, ` +
      `${sqlString(course.cohort)}, ${sqlString(course.instructor)}, ${sqlString(course.tone)}, ` +
      `${jsonString(modules)}, ${learningCourses.indexOf(course)});`,
  );
  statements.push(
    `INSERT OR IGNORE INTO enrollments (id, user_id, course_slug, pct) ` +
      `VALUES (${sqlString(`enr-${course.slug}`)}, ${sqlString(DEMO_STUDENT_ID)}, ` +
      `${sqlString(course.slug)}, ${course.pct});`,
  );
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (lesson.status === "done" || lesson.status === "in-progress") {
        statements.push(
          `INSERT OR IGNORE INTO lesson_progress (id, user_id, course_slug, lesson_id, status) ` +
            `VALUES (${sqlString(`${course.slug}:${lesson.id}`)}, ${sqlString(DEMO_STUDENT_ID)}, ` +
            `${sqlString(course.slug)}, ${sqlString(lesson.id)}, ${sqlString(lesson.status)});`,
        );
      }
    }
  }
}

for (const entry of gradebook) {
  statements.push(
    `INSERT OR IGNORE INTO gradebook (id, user_id, course_name, units, letter, pct, trend, items, sort_order) ` +
      `VALUES (${sqlString(`gb-${entry.name}`)}, ${sqlString(DEMO_STUDENT_ID)}, ` +
      `${sqlString(entry.name)}, ${entry.units}, ${sqlString(entry.letter)}, ${entry.pct}, ` +
      `${sqlString(entry.trend)}, ${jsonString(entry.items)}, ${gradebook.indexOf(entry)});`,
  );
}

statements.push(
  `INSERT OR IGNORE INTO student_stats (user_id, lessons_this_week, lessons_goal, study_hours, streak_days, ` +
    `next_deadline_due, next_deadline_title) ` +
    `VALUES (${sqlString(DEMO_STUDENT_ID)}, 5, 8, '18.5h', 9, 'Today 23:59', 'Build: REST API assignment');`,
);

for (const assignment of assignments) {
  statements.push(
    `INSERT OR IGNORE INTO assignments (id, user_id, title, course, description, due, status, ` +
      `score, max, weight, submissions, rubric) ` +
      `VALUES (${sqlString(assignment.id)}, ${sqlString(DEMO_STUDENT_ID)}, ` +
      `${sqlString(assignment.title)}, ${sqlString(assignment.course)}, ` +
      `${sqlString(assignment.description)}, ${sqlString(assignment.due)}, ` +
      `${sqlString(assignment.status)}, ${assignment.score ?? "NULL"}, ${assignment.max}, ` +
      `${assignment.weight}, ${jsonString(assignment.submissions ?? [])}, ` +
      `${jsonString(assignment.rubric)});`,
  );
}

for (const assessment of assessments) {
  statements.push(
    `INSERT OR IGNORE INTO assessments (id, user_id, title, course, kind, questions, duration, ` +
      `due, status, score, max, attempts, attempts_left, window) ` +
      `VALUES (${sqlString(assessment.id)}, ${sqlString(DEMO_STUDENT_ID)}, ` +
      `${sqlString(assessment.title)}, ${sqlString(assessment.course)}, ` +
      `${sqlString(assessment.kind)}, ${assessment.questions}, ${sqlString(assessment.duration)}, ` +
      `${sqlString(assessment.due)}, ${sqlString(assessment.status)}, ` +
      `${assessment.score ?? "NULL"}, ${assessment.max ?? "NULL"}, ${assessment.attempts}, ` +
      `${assessment.attemptsLeft}, ${sqlString(assessment.window)});`,
  );
}

for (const event of calendarEvents) {
  statements.push(
    `INSERT OR IGNORE INTO calendar_events (id, date, day, title, kind, time, location, sort_order) ` +
      `VALUES (${sqlString(event.id)}, ${sqlString(event.date)}, ${sqlString(event.day)}, ` +
      `${sqlString(event.title)}, ${sqlString(event.kind)}, ${sqlString(event.time)}, ` +
      `${sqlString(event.location)}, ${calendarEvents.indexOf(event)});`,
  );
}

for (const thread of threads) {
  statements.push(
    `INSERT OR IGNORE INTO message_threads (id, user_id, name, role, unread, last_text, ` +
      `last_time, last_mine, messages) ` +
      `VALUES (${sqlString(thread.id)}, ${sqlString(DEMO_STUDENT_ID)}, ${sqlString(thread.name)}, ` +
      `${sqlString(thread.role)}, ${thread.unread}, ${sqlString(thread.last.text)}, ` +
      `${sqlString(thread.last.time)}, ${thread.last.mine ? 1 : 0}, ` +
      `${jsonString(thread.messages)});`,
  );
}

const sql = statements.join("\n") + "\n";

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(resolve(OUT_DIR, "lms-data.sql"), sql, "utf8");

const tsModule = `/* GENERATED by scripts/gen-lms-seed.ts — do not edit. Re-run: npm run gen:seed */
export const seedLmsSql = String.raw\`${sql.replace(/`/g, "\\`").replace(/\$\{/g, "\\${")}\`;
`;

writeFileSync(resolve(OUT_DIR, "lms.ts"), tsModule, "utf8");

console.log(`Wrote seeds/lms-data.sql and seeds/lms.ts (${statements.length} statements).`);
