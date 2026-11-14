import { beginnerLessonSlugs } from "@/data/practice/beginner-challenges";

export const PROGRESS_KEY = "cea-learning-trail-v1";
const CHANGE_EVENT = "cea-learning-trail-change";
const UNAVAILABLE = "__storage_unavailable__";

type LessonState = { completed: boolean; bookmarked: boolean };
export type LearningProgress = {
  version: 1;
  lessons: Record<string, LessonState>;
  labCompleted: boolean;
};

export function emptyProgress(): LearningProgress {
  return { version: 1, lessons: {}, labCompleted: false };
}

/** Fail closed on malformed or future data instead of silently overwriting it. */
export function parseProgress(raw: string | null): LearningProgress | null {
  if (raw === null) return emptyProgress();
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) return null;
    const record = data as Record<string, unknown>;
    if (
      record.version !== 1 ||
      typeof record.labCompleted !== "boolean" ||
      !record.lessons ||
      typeof record.lessons !== "object" ||
      Array.isArray(record.lessons)
    )
      return null;
    const storedLessons = record.lessons as Record<string, unknown>;
    const lessons: Record<string, LessonState> = {};
    for (const [slug, value] of Object.entries(storedLessons)) {
      if (
        !(beginnerLessonSlugs as readonly string[]).includes(slug) ||
        !value ||
        typeof value !== "object" ||
        Array.isArray(value)
      )
        return null;
      const entry = value as Record<string, unknown>;
      if (typeof entry.completed !== "boolean" || typeof entry.bookmarked !== "boolean")
        return null;
      lessons[slug] = { completed: entry.completed, bookmarked: entry.bookmarked };
    }
    return { version: 1, lessons, labCompleted: record.labCompleted };
  } catch {
    return null;
  }
}

/** Reading does not create storage; values are saved only after a learner acts. */
export function getProgressSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(PROGRESS_KEY);
  } catch {
    return UNAVAILABLE;
  }
}

export function subscribeToProgress(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === PROGRESS_KEY || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function progressState(snapshot: string | null): {
  progress: LearningProgress;
  error: string | null;
  hasSaved: boolean;
} {
  if (snapshot === UNAVAILABLE)
    return {
      progress: emptyProgress(),
      error:
        "This browser is blocking storage. You can still use every lesson and the lab without saving progress.",
      hasSaved: false,
    };
  const progress = parseProgress(snapshot);
  if (!progress)
    return {
      progress: emptyProgress(),
      error:
        "Saved progress could not be read. Clear it to start a new trail; lessons still work without it.",
      hasSaved: true,
    };
  return { progress, error: null, hasSaved: snapshot !== null };
}

export function updateProgress(update: (progress: LearningProgress) => LearningProgress): boolean {
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    const current = parseProgress(raw);
    if (!current) return false;
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(update(current)));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function clearProgress(): boolean {
  try {
    window.localStorage.removeItem(PROGRESS_KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}
