export type CourseFamilyId =
  "office-data" | "creative-media" | "web-code" | "hardware-security" | "business-freelance";

export type CourseFamilyTheme = {
  id: CourseFamilyId;
  label: string;
  accentBar: string;
  pill: string;
  dot: string;
};

const FAMILY_THEMES: Record<CourseFamilyId, CourseFamilyTheme> = {
  "office-data": {
    id: "office-data",
    label: "Office & Data",
    accentBar: "border-t-[3px] border-t-amber-600 dark:border-t-amber-400",
    pill: "border-amber-700/25 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-950/50 dark:text-amber-200",
    dot: "bg-amber-600 dark:bg-amber-400",
  },
  "creative-media": {
    id: "creative-media",
    label: "Creative & Media",
    accentBar: "border-t-[3px] border-t-rose-600 dark:border-t-rose-400",
    pill: "border-rose-700/25 bg-rose-50 text-rose-900 dark:border-rose-400/30 dark:bg-rose-950/50 dark:text-rose-200",
    dot: "bg-rose-600 dark:bg-rose-400",
  },
  "web-code": {
    id: "web-code",
    label: "Web & Code",
    accentBar: "border-t-[3px] border-t-teal-700 dark:border-t-teal-400",
    pill: "border-teal-700/25 bg-teal-50 text-teal-900 dark:border-teal-400/30 dark:bg-teal-950/50 dark:text-teal-200",
    dot: "bg-teal-700 dark:bg-teal-400",
  },
  "hardware-security": {
    id: "hardware-security",
    label: "Hardware & Security",
    accentBar: "border-t-[3px] border-t-slate-700 dark:border-t-slate-300",
    pill: "border-slate-700/25 bg-slate-100 text-slate-900 dark:border-slate-400/30 dark:bg-slate-800/70 dark:text-slate-200",
    dot: "bg-slate-700 dark:bg-slate-300",
  },
  "business-freelance": {
    id: "business-freelance",
    label: "Business & Freelance",
    accentBar: "border-t-[3px] border-t-emerald-700 dark:border-t-emerald-400",
    pill: "border-emerald-700/25 bg-emerald-50 text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-950/50 dark:text-emerald-200",
    dot: "bg-emerald-700 dark:bg-emerald-400",
  },
};

export function courseFamilyTheme(category: string, slug?: string): CourseFamilyTheme {
  const key = `${category} ${slug ?? ""}`.toLowerCase();
  if (
    key.includes("web") ||
    key.includes("code") ||
    key.includes("programming") ||
    key.includes("software")
  ) {
    return FAMILY_THEMES["web-code"];
  }
  if (
    key.includes("design") ||
    key.includes("creative") ||
    key.includes("content") ||
    key.includes("social-media") ||
    key.includes("photo") ||
    key.includes("video")
  ) {
    return FAMILY_THEMES["creative-media"];
  }
  if (
    key.includes("hardware") ||
    key.includes("repair") ||
    key.includes("security") ||
    key.includes("cyber") ||
    key.includes("network") ||
    key.includes("support")
  ) {
    return FAMILY_THEMES["hardware-security"];
  }
  if (
    key.includes("business") ||
    key.includes("freelanc") ||
    key.includes("marketing") ||
    key.includes("teaching")
  ) {
    return FAMILY_THEMES["business-freelance"];
  }
  return FAMILY_THEMES["office-data"];
}

export function toolTrackTheme(track: string): CourseFamilyTheme {
  switch (track) {
    case "code-web":
      return FAMILY_THEMES["web-code"];
    case "data-office":
      return FAMILY_THEMES["office-data"];
    case "assessment-ai":
      return FAMILY_THEMES["hardware-security"];
    case "design-writing":
    default:
      return FAMILY_THEMES["creative-media"];
  }
}
