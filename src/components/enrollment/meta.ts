import { flyerCourses, longformPrograms, formatFee } from "@/data/academy";
import type { AcademyCourse, LongformProgram } from "@/data/academy";

export interface ProgramMeta {
  slug: string;
  title: string;
  kind: "short" | "long";
  category: string;
  fee: number;
  weeks: number;
  months: number | null;
  daysPerWeek: number;
  level: string;
  blurb: string;
  deliverable: string;
  deliverableDetail: string;
}

/** Unified lookup across short courses (flyer catalog) and long-form trainings. */
export function getProgramMeta(slug: string): ProgramMeta | null {
  const short: AcademyCourse | undefined = flyerCourses.find((c) => c.slug === slug);
  if (short) {
    return {
      slug: short.slug,
      title: short.title,
      kind: "short",
      category: short.category,
      fee: short.fee,
      weeks: short.weeks,
      months: null,
      daysPerWeek: short.sessionsPerWeek,
      level: short.level,
      blurb: short.hook,
      deliverable: short.deliverable.title,
      deliverableDetail: short.deliverable.detail,
    };
  }
  const long: LongformProgram | undefined = longformPrograms.find((p) => p.slug === slug);
  if (long) {
    return {
      slug: long.slug,
      title: long.title,
      kind: "long",
      category: long.category,
      fee: long.fee,
      weeks: long.weeks,
      months: long.months,
      daysPerWeek: long.daysPerWeek,
      level: long.level,
      blurb: long.tagline,
      deliverable: long.whatYouGet,
      deliverableDetail: long.whatYouGetDetail,
    };
  }
  return null;
}

export function feeFor(meta: ProgramMeta, plan: string): { due: number; discount: number } {
  if (meta.kind === "long" && plan === "full-10-off") {
    const due = Math.round(meta.fee * 0.9);
    return { due, discount: meta.fee - due };
  }
  return { due: meta.fee, discount: 0 };
}

export function depositFor(meta: ProgramMeta): number {
  return meta.kind === "short" ? Math.round(meta.fee / 2) : Math.round(meta.fee * 0.3);
}

export function durationLabel(meta: ProgramMeta): string {
  return meta.months ? `${meta.months} months` : `${meta.weeks} weeks`;
}

export { formatFee };
