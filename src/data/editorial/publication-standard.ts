import type { BlogBlock, BlogPost } from "../blog";
import type { LessonEditorial } from "./index";

export type CeaCategoryId =
  | "computer-basics"
  | "microsoft-office"
  | "web-development"
  | "graphic-ui-design"
  | "data-analytics"
  | "networking-hardware"
  | "cybersecurity"
  | "digital-marketing"
  | "business-freelancing"
  | "ai-productivity"
  | "it-support"
  | "career-workplace";

export type CeaCategory = {
  id: CeaCategoryId;
  label: string;
  summary: string;
};

export const CEA_CATEGORIES: readonly CeaCategory[] = [
  {
    id: "computer-basics",
    label: "Computer Basics",
    summary: "Computer literacy, operating systems, file management, and everyday computer use.",
  },
  {
    id: "microsoft-office",
    label: "Microsoft Office",
    summary: "Word, Excel, PowerPoint, office productivity, and document workflows.",
  },
  {
    id: "web-development",
    label: "Web Development",
    summary: "HTML, CSS, JavaScript, websites for businesses, and frontend foundations.",
  },
  {
    id: "graphic-ui-design",
    label: "Graphic & UI/UX Design",
    summary: "Visual hierarchy, colour contrast, accessible design, and clear layouts.",
  },
  {
    id: "data-analytics",
    label: "Data & Analytics",
    summary: "Spreadsheets, pivot tables, SQL querying, data entry, and reporting.",
  },
  {
    id: "networking-hardware",
    label: "Networking & Hardware",
    summary: "Computer hardware, Wi-Fi, routers, cables, printers, and maintenance.",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    summary: "Digital safety, passwords, Zero Trust, SOC/SIEM concepts, and risk protection.",
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    summary: "SEO, content, social media operations, and online visibility for small businesses.",
  },
  {
    id: "business-freelancing",
    label: "Business & Freelancing",
    summary: "Client communication, pricing, invoicing, portfolios, and independent work.",
  },
  {
    id: "ai-productivity",
    label: "AI & Productivity",
    summary: "AI assistants, clear prompting, verification habits, and responsible automation.",
  },
  {
    id: "it-support",
    label: "IT Support",
    summary: "Diagnostics, troubleshooting, backups, clean resets, and service manners.",
  },
  {
    id: "career-workplace",
    label: "Career & Workplace Skills",
    summary: "CVs, workplace emails, interviews, online payments, and job readiness.",
  },
] as const;

export type CeaArticleTypeId =
  | "tutorial"
  | "explainer"
  | "reference"
  | "troubleshooting"
  | "comparison"
  | "workshop"
  | "news"
  | "editorial"
  | "checklist"
  | "practice"
  | "career-guide"
  | "resource-collection";

export type CeaArticleType = {
  id: CeaArticleTypeId;
  label: string;
  description: string;
};

export const CEA_ARTICLE_TYPES: readonly CeaArticleType[] = [
  {
    id: "tutorial",
    label: "Practical Tutorial",
    description: "Teaches the reader how to complete a real task from start to finish.",
  },
  {
    id: "explainer",
    label: "Explainer",
    description: "Explains a concept, system, protocol, or term in ordinary language.",
  },
  {
    id: "reference",
    label: "Reference / Cheat Sheet",
    description: "Quick facts, shortcuts, formulas, size tables, and structured lookups.",
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting Guide",
    description: "Diagnoses symptoms, root causes, safe fixes, and when to escalate.",
  },
  {
    id: "comparison",
    label: "Comparison / Evaluation",
    description: "Compares tools, choices, or approaches using clear, fair criteria.",
  },
  {
    id: "workshop",
    label: "Project / Workshop",
    description: "Guides the learner through building a small, tangible output.",
  },
  {
    id: "news",
    label: "News / Industry Update",
    description: "Explains a programme update, release, or policy change with sources.",
  },
  {
    id: "editorial",
    label: "Opinion / Editorial",
    description: "Presents a reasoned perspective distinct from pure factual reference.",
  },
  {
    id: "checklist",
    label: "Checklist",
    description: "Actionable verification steps before buying, submitting, or shipping.",
  },
  {
    id: "practice",
    label: "Exercises / Practice",
    description: "Applies skills with self-check drills or browser-based exercises.",
  },
  {
    id: "career-guide",
    label: "Career / Industry Guide",
    description: "Maps job roles, real expectations, portfolios, and entry paths.",
  },
  {
    id: "resource-collection",
    label: "Resource Collection",
    description: "Curated tools, courses, and open materials with honest context.",
  },
] as const;

export type CeaDifficulty = "Beginner" | "Basic" | "Intermediate" | "Advanced" | "Expert";

export const CEA_DIFFICULTY_LEVELS: readonly { level: CeaDifficulty; meaning: string }[] = [
  { level: "Beginner", meaning: "Assumes little or no previous knowledge." },
  { level: "Basic", meaning: "Familiarity with everyday computer use is helpful." },
  { level: "Intermediate", meaning: "Requires foundational office, web, or IT skills." },
  { level: "Advanced", meaning: "Requires substantial prior technical practice." },
  { level: "Expert", meaning: "Specialised or professional-level engineering topic." },
] as const;

export type CeaEditorialStatus =
  | "draft"
  | "in-review"
  | "revision-required"
  | "approved"
  | "published"
  | "under-update"
  | "needs-review"
  | "archived";

export type CeaPracticeToolLink = {
  to:
    | "/tools/typing-test"
    | "/tools/word-counter"
    | "/tools/password-strength"
    | "/tools/color-contrast"
    | "/tools/code-studio"
    | "/tools/css-layout-lab"
    | "/tools/sql-datalab"
    | "/tools/excel-formula-lab"
    | "/tools/assess";
  label: string;
  description: string;
};

export type ResolvedLessonStandard = {
  category: CeaCategory;
  articleType: CeaArticleType;
  difficulty: CeaDifficulty;
  internalStatus: CeaEditorialStatus;
  publicStatusLabel: "Published" | "Updated & Reviewed" | "Active · Periodic Review";
  practiceTool: CeaPracticeToolLink | null;
};

const CHAPTER_SLUGS_IN_ORDER = [
  "the-first-sitting",
  "keeping-the-machine",
  "files-that-travel",
  "finding-your-way",
  "other-peoples-computers",
  "everyday-office",
  "writing-on-the-page",
  "spreadsheets-and-sharing",
  "the-phone",
  "stay-safe",
  "on-your-own",
  "the-wider-street",
  "where-this-leads",
  "making-a-living",
  "the-working-life",
  "standing-taller",
  "the-pocket-and-the-purse",
  "the-workshop-and-the-bench",
  "the-wire-and-the-wave",
  "the-person-people-call",
  "the-road-ahead",
] as const;

const CHAPTER_TO_CATEGORY: Record<string, CeaCategoryId> = {
  "the-first-sitting": "computer-basics",
  "keeping-the-machine": "computer-basics",
  "files-that-travel": "computer-basics",
  "finding-your-way": "computer-basics",
  "other-peoples-computers": "computer-basics",
  "everyday-office": "microsoft-office",
  "writing-on-the-page": "microsoft-office",
  "spreadsheets-and-sharing": "microsoft-office",
  "the-phone": "computer-basics",
  "stay-safe": "cybersecurity",
  "on-your-own": "computer-basics",
  "the-wider-street": "career-workplace",
  "where-this-leads": "cybersecurity",
  "making-a-living": "business-freelancing",
  "the-working-life": "business-freelancing",
  "standing-taller": "career-workplace",
  "the-pocket-and-the-purse": "career-workplace",
  "the-workshop-and-the-bench": "networking-hardware",
  "the-wire-and-the-wave": "networking-hardware",
  "the-person-people-call": "it-support",
  "the-road-ahead": "ai-productivity",
};

const CATEGORY_OVERRIDES: Partial<Record<string, CeaCategoryId>> = {
  "frontend-developer-explained": "web-development",
  "websites-for-small-businesses": "web-development",
  "agile-and-devops": "web-development",
  "machine-learning-engineer-work": "ai-productivity",
  "careers-in-data-analytics": "data-analytics",
  "spreadsheets-the-grid-that-counts": "data-analytics",
  "the-pivot-table-in-plain-english": "data-analytics",
  "making-numbers-look-like-money": "data-analytics",
  "graphic-designer-table": "graphic-ui-design",
  "a-poster-on-canva": "graphic-ui-design",
  "social-media-manager-behind-posts": "digital-marketing",
  "booking-a-flight-online": "career-workplace",
  "a-cv-that-gets-read": "career-workplace",
  "a-letter-that-looks-like-one": "microsoft-office",
  "tables-in-a-letter": "microsoft-office",
  "naira-and-accents": "microsoft-office",
  "the-cloud-in-ordinary-words": "computer-basics",
  "cookies-and-accept-all": "cybersecurity",
  "the-vpn-explained": "cybersecurity",
  "kilobytes-and-megabytes": "computer-basics",
  "what-a-megabyte-is": "networking-hardware",
};

const TYPE_OVERRIDES: Partial<Record<string, CeaArticleTypeId>> = {
  "zero-trust-gate": "explainer",
  "vulnerability-assessment-fence": "tutorial",
  "the-soc-room": "explainer",
  "siem-in-ordinary-words": "explainer",
  "digital-signature-meaning": "explainer",
  "tcp-ip-road": "explainer",
  "agile-and-devops": "explainer",
  "kilobytes-and-megabytes": "reference",
  "what-a-megabyte-is": "explainer",
  "the-cloud-in-ordinary-words": "explainer",
  "cookies-and-accept-all": "explainer",
  "naira-and-accents": "reference",
  "undo-and-redo": "tutorial",
  "an-email-signature": "tutorial",
  "booking-a-flight-online": "tutorial",
  "the-cybersecurity-analyst-at-work": "career-guide",
  "careers-in-data-analytics": "career-guide",
  "frontend-developer-explained": "career-guide",
  "machine-learning-engineer-work": "career-guide",
  "graphic-designer-table": "career-guide",
  "social-media-manager-behind-posts": "career-guide",
  "choosing-a-school-or-bootcamp": "checklist",
  "used-laptop-inspection": "checklist",
  "wifi-or-mobile-data": "comparison",
};

function findCategory(id: CeaCategoryId): CeaCategory {
  return CEA_CATEGORIES.find((c) => c.id === id) ?? CEA_CATEGORIES[0]!;
}

function findArticleType(id: CeaArticleTypeId): CeaArticleType {
  return CEA_ARTICLE_TYPES.find((t) => t.id === id) ?? CEA_ARTICLE_TYPES[0]!;
}

function inferArticleType(post: BlogPost): CeaArticleTypeId {
  if (post.articleType) return post.articleType;
  const override = TYPE_OVERRIDES[post.slug];
  if (override) return override;
  const slugTitle = `${post.slug} ${post.title}`.toLowerCase();
  if (/career|analyst|developer|engineer|designer|manager|salary/.test(slugTitle)) {
    return "career-guide";
  }
  if (/slow|wrong|dark|fan|spill|click|sick|blue-screen|reset|fix/.test(slugTitle)) {
    return "troubleshooting";
  }
  if (/vs|versus|or-/.test(slugTitle)) return "comparison";
  if (/inspect|check|before-paying|checklist/.test(slugTitle)) return "checklist";
  if (/what-|meaning|explained|ordinary-words/.test(slugTitle)) return "explainer";
  return "tutorial";
}

function inferDifficulty(post: BlogPost, categoryId: CeaCategoryId): CeaDifficulty {
  if (post.difficulty) return post.difficulty;
  if (post.order <= 40) return "Beginner";
  if (
    categoryId === "cybersecurity" ||
    categoryId === "networking-hardware" ||
    categoryId === "web-development" ||
    categoryId === "ai-productivity" ||
    post.order >= 121
  ) {
    return post.order >= 171 ? "Intermediate" : "Basic";
  }
  return post.order <= 80 ? "Beginner" : "Basic";
}

function inferPracticeTool(post: BlogPost, categoryId: CeaCategoryId): CeaPracticeToolLink | null {
  const s = `${post.slug} ${post.title}`.toLowerCase();
  if (/keyboard|typing|hands-on|shortcuts/.test(s)) {
    return {
      to: "/tools/typing-test",
      label: "Practise in the Typing Test",
      description: "Build steady accuracy and WPM in your browser — no sign-in needed.",
    };
  }
  if (/password|lock|stolen|otp|two-factor|second-lock/.test(s)) {
    return {
      to: "/tools/password-strength",
      label: "Test passphrases in the Password Strength Checker",
      description: "Check how length and word diversity protect real accounts locally.",
    };
  }
  if (/spreadsheet|excel|pivot|table|money|budget|numbers-look-like-money/.test(s)) {
    return {
      to: "/tools/excel-formula-lab",
      label: "Practise formulas in Spreadsheet Lab",
      description: "Run live SUM, IF, SUMIF, and VLOOKUP drills right in your browser.",
    };
  }
  if (/data-analytics|sql|database|where-the-data-goes/.test(s)) {
    return {
      to: "/tools/sql-datalab",
      label: "Query datasets in SQL DataLab",
      description: "Run SELECT, JOIN, and GROUP BY queries on Nigerian orders and payments.",
    };
  }
  if (/frontend|website|html|css|browser|web/.test(s) && categoryId === "web-development") {
    return {
      to: "/tools/code-studio",
      label: "Build in Code Studio",
      description: "Write HTML, CSS, and JavaScript with instant live preview.",
    };
  }
  if (/poster|canva|graphic|design|colour|color/.test(s)) {
    return {
      to: "/tools/color-contrast",
      label: "Check readability in Colour Contrast Checker",
      description: "Verify WCAG AA/AAA text contrast ratios before publishing flyers or sites.",
    };
  }
  if (/letter|cv|spell|find-and-replace|word/.test(s)) {
    return {
      to: "/tools/word-counter",
      label: "Check length in Word Counter",
      description: "Check word count, reading time, and paragraph clarity before sending.",
    };
  }
  if (categoryId === "cybersecurity" || categoryId === "it-support") {
    return {
      to: "/tools/assess",
      label: "Check readiness in Self-Assessment Studio",
      description: "Take a quick browser diagnostic and get instant feedback.",
    };
  }
  return null;
}

export function resolveLessonStandard(
  post: BlogPost,
  editorial: Pick<LessonEditorial, "isReviewed" | "isOverdue">,
): ResolvedLessonStandard {
  const chapterIndex = Math.floor((Math.max(1, post.order) - 1) / 10);
  const chapterSlug = CHAPTER_SLUGS_IN_ORDER[chapterIndex];
  const categoryId: CeaCategoryId =
    post.category ??
    CATEGORY_OVERRIDES[post.slug] ??
    (chapterSlug ? CHAPTER_TO_CATEGORY[chapterSlug] : undefined) ??
    "computer-basics";

  const internalStatus: CeaEditorialStatus = editorial.isReviewed
    ? "published"
    : editorial.isOverdue
      ? "needs-review"
      : "published";

  const publicStatusLabel = editorial.isReviewed
    ? "Updated & Reviewed"
    : editorial.isOverdue
      ? "Active · Periodic Review"
      : "Published";

  return {
    category: findCategory(categoryId),
    articleType: findArticleType(inferArticleType(post)),
    difficulty: inferDifficulty(post, categoryId),
    internalStatus,
    publicStatusLabel,
    practiceTool: inferPracticeTool(post, categoryId),
  };
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64);
}

function blockPlainText(block: BlogBlock): string {
  if (block.type === "p" || block.type === "h2") return block.text;
  if (block.type === "ul") return block.items.join(" ");
  if (block.type === "table") {
    return [
      block.caption ?? "",
      block.headers.join(" "),
      ...block.rows.map((r) => r.join(" ")),
    ].join(" ");
  }
  return `${block.alt} ${block.caption}`;
}

export type LessonQualityBreakdown = {
  accuracy: number;
  educationalValue: number;
  practicalUsefulness: number;
  structure: number;
  originality: number;
  seo: number;
  uxAccessibility: number;
  trust: number;
  total: number;
  criticalErrors: string[];
  decision:
    "exceptional" | "publish" | "approved-minor" | "revision-required" | "rework" | "blocked";
};

/**
 * Evaluates a published lesson against the 100-point CEA-LPS rubric.
 * Automated scoring reflects structural & metadata signals; human editorial
 * verification (reviewedAt) awards full accuracy & trust points.
 */
export function scoreLessonQuality(
  post: BlogPost,
  record: { reviewedAt?: string | null; publishedAt?: string | null } | undefined,
): LessonQualityBreakdown {
  const criticalErrors: string[] = [];
  const plain = post.body.map(blockPlainText).join(" ");
  const wordTotal = plain.split(/\s+/).filter(Boolean).length;
  const h2Count = post.body.filter((b) => b.type === "h2").length;
  const figures = post.body.filter((b) => b.type === "figure");
  const lists = post.body.filter((b) => b.type === "ul");
  const lower = plain.toLowerCase();

  if (wordTotal < 600) criticalErrors.push("Body under 600 words");
  if (figures.length === 0) criticalErrors.push("Missing visual figure");
  if (!post.excerpt || post.excerpt.length < 40) criticalErrors.push("Missing excerpt");

  // 1. Accuracy & verification (/20)
  const hasSafetyOrLimits =
    /check|verify|warning|do not|permission|privacy|official|mistake|wrong|troubleshoot/.test(
      lower,
    );
  const accuracy = (record?.reviewedAt ? 14 : 9) + (hasSafetyOrLimits ? 6 : 3);

  // 2. Educational value & clarity (/20)
  const hasObjectives = Boolean(post.learningObjectives?.length) || h2Count >= 4;
  const hasIntro = (post.body[0]?.type === "p" ? post.body[0].text.length : 0) >= 80;
  const educationalValue =
    (wordTotal >= 900 ? 10 : wordTotal >= 700 ? 8 : 6) +
    (hasObjectives ? 5 : 3) +
    (hasIntro ? 5 : 3);

  // 3. Practical usefulness (/15)
  const hasSteps = lists.length >= 2;
  const hasTroubleshooting = /if this went wrong|if it goes wrong|if nothing|troubleshoot/.test(
    lower,
  );
  const hasPractice = /your turn|try it|practice|exercise|challenge/.test(lower);
  const practicalUsefulness =
    (hasSteps ? 6 : 3) + (hasTroubleshooting ? 5 : 2) + (hasPractice ? 4 : 1);

  // 4. Structure & completeness (/10)
  const structure = (h2Count >= 4 ? 6 : h2Count >= 2 ? 4 : 2) + (lists.length >= 1 ? 4 : 1);

  // 5. Originality & Nigerian/practical context (/10)
  const hasLocalOrConcreteExample =
    /naira|₦|lagos|port harcourt|nigeria|whatsapp|pos|nepa|phcn|bank|shop|school|office/.test(
      lower,
    );
  const originality = (hasLocalOrConcreteExample ? 6 : 3) + (wordTotal >= 800 ? 4 : 2);

  // 6. SEO & discoverability (/10)
  const seoTitleLen = (post.seoTitle ?? post.title).length;
  const seoDescLen = (post.seoDescription ?? post.excerpt).length;
  const seo =
    (seoTitleLen >= 25 && seoTitleLen <= 75 ? 4 : 2) +
    (seoDescLen >= 70 && seoDescLen <= 210 ? 4 : 2) +
    (post.slug.length >= 4 && !post.slug.includes("_") ? 2 : 1);

  // 7. UX, readability & accessibility (/10)
  const allFiguresAltOk = figures.every(
    (f) => f.type === "figure" && f.alt.trim().length >= 8 && f.caption.trim().length >= 12,
  );
  const uxAccessibility = (allFiguresAltOk ? 6 : 2) + (figures.length >= 2 ? 4 : 2);

  // 8. Trust, attribution & compliance (/5)
  const trust = (post.author ? 2 : 0) + (record?.reviewedAt ? 3 : 1);

  const total =
    accuracy +
    educationalValue +
    practicalUsefulness +
    structure +
    originality +
    seo +
    uxAccessibility +
    trust;

  const decision =
    criticalErrors.length > 0
      ? "blocked"
      : total >= 95
        ? "exceptional"
        : total >= 85
          ? "publish"
          : total >= 75
            ? "approved-minor"
            : total >= 60
              ? "revision-required"
              : "rework";

  return {
    accuracy,
    educationalValue,
    practicalUsefulness,
    structure,
    originality,
    seo,
    uxAccessibility,
    trust,
    total,
    criticalErrors,
    decision,
  };
}
