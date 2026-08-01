import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface LocalizationProject {
  id: string;
  name: string;
  desc: string;
  path: string;
  tone: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  usage: string;
  culturalNotes: string;
  status: string;
}

export interface StyleGuide {
  id: string;
  market: string;
  dos: string[];
  donts: string[];
  status: string;
}

export interface TranslationMemoryPair {
  id: string;
  source: string;
  target: string;
  locale: string;
  match: number;
  status: string;
}

export interface DialectGroup {
  id: string;
  group: string;
  variants: string[];
  coverage: number;
  status: string;
}

export interface CopyVariant {
  id: string;
  name: string;
  code: string;
  toneNotes: string;
  status: string;
}

export interface MarketAnalyticsRow {
  id: string;
  name: string;
  conversion: string;
  engagement: string;
  pct: number;
  trend: string;
  tone: string;
}

export interface PreviewBlock {
  id: string;
  en: string;
  yo: string;
  enSub: string;
  yoSub: string;
}

export interface LocalizationStat {
  id: string;
  page: string;
  label: string;
  value: string;
  delta: string;
}

export function fetchLocalizationProjects(): Promise<Paginated<LocalizationProject>> {
  return apiFetch<Paginated<LocalizationProject>>("/v1/localization/projects");
}

export function fetchGlossaryTerms(): Promise<Paginated<GlossaryTerm>> {
  return apiFetch<Paginated<GlossaryTerm>>("/v1/localization/glossary");
}

export function fetchStyleGuides(): Promise<Paginated<StyleGuide>> {
  return apiFetch<Paginated<StyleGuide>>("/v1/localization/style-guides");
}

export function fetchTranslationMemory(): Promise<Paginated<TranslationMemoryPair>> {
  return apiFetch<Paginated<TranslationMemoryPair>>("/v1/localization/translation-memory");
}

export function fetchDialects(): Promise<Paginated<DialectGroup>> {
  return apiFetch<Paginated<DialectGroup>>("/v1/localization/dialects");
}

export function fetchVariants(): Promise<Paginated<CopyVariant>> {
  return apiFetch<Paginated<CopyVariant>>("/v1/localization/variants");
}

export function fetchLocalizationMarkets(): Promise<Paginated<MarketAnalyticsRow>> {
  return apiFetch<Paginated<MarketAnalyticsRow>>("/v1/localization/analytics");
}

export function fetchPreviewBlocks(): Promise<Paginated<PreviewBlock>> {
  return apiFetch<Paginated<PreviewBlock>>("/v1/localization/preview");
}

export function fetchLocalizationStats(): Promise<Paginated<LocalizationStat>> {
  return apiFetch<Paginated<LocalizationStat>>("/v1/localization/kpis");
}
