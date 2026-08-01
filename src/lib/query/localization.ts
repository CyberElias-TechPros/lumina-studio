import { usePaginatedQuery, flattenPages, useApiQuery } from "@/lib/query/hooks";
import type { Paginated } from "@/lib/api/types";
import {
  fetchLocalizationProjects,
  fetchGlossaryTerms,
  fetchStyleGuides,
  fetchTranslationMemory,
  fetchDialects,
  fetchVariants,
  fetchLocalizationMarkets,
  fetchPreviewBlocks,
  fetchLocalizationStats,
  type LocalizationProject,
  type GlossaryTerm,
  type StyleGuide,
  type TranslationMemoryPair,
  type DialectGroup,
  type CopyVariant,
  type MarketAnalyticsRow,
  type PreviewBlock,
  type LocalizationStat,
} from "@/lib/api/localization";

export const localizationKeys = {
  projects: ["localization", "projects"] as const,
  glossary: ["localization", "glossary"] as const,
  styleGuides: ["localization", "style-guides"] as const,
  translationMemory: ["localization", "translation-memory"] as const,
  dialects: ["localization", "dialects"] as const,
  variants: ["localization", "variants"] as const,
  analytics: ["localization", "analytics"] as const,
  preview: ["localization", "preview"] as const,
  kpis: ["localization", "kpis"] as const,
};

export function useLocalizationProjects() {
  return usePaginatedQuery<LocalizationProject>(
    localizationKeys.projects,
    fetchLocalizationProjects,
  );
}

export function useLocalizationProjectItems(): LocalizationProject[] {
  return flattenPages(useLocalizationProjects().data?.pages);
}

export function useGlossaryTerms() {
  return usePaginatedQuery<GlossaryTerm>(localizationKeys.glossary, fetchGlossaryTerms);
}

export function useGlossaryTermItems(): GlossaryTerm[] {
  return flattenPages(useGlossaryTerms().data?.pages);
}

export function useStyleGuides() {
  return usePaginatedQuery<StyleGuide>(localizationKeys.styleGuides, fetchStyleGuides);
}

export function useStyleGuideItems(): StyleGuide[] {
  return flattenPages(useStyleGuides().data?.pages);
}

export function useTranslationMemory() {
  return usePaginatedQuery<TranslationMemoryPair>(
    localizationKeys.translationMemory,
    fetchTranslationMemory,
  );
}

export function useTranslationMemoryItems(): TranslationMemoryPair[] {
  return flattenPages(useTranslationMemory().data?.pages);
}

export function useDialects() {
  return usePaginatedQuery<DialectGroup>(localizationKeys.dialects, fetchDialects);
}

export function useDialectItems(): DialectGroup[] {
  return flattenPages(useDialects().data?.pages);
}

export function useVariants() {
  return usePaginatedQuery<CopyVariant>(localizationKeys.variants, fetchVariants);
}

export function useVariantItems(): CopyVariant[] {
  return flattenPages(useVariants().data?.pages);
}

export function useLocalizationMarkets() {
  return usePaginatedQuery<MarketAnalyticsRow>(
    localizationKeys.analytics,
    fetchLocalizationMarkets,
  );
}

export function useLocalizationMarketItems(): MarketAnalyticsRow[] {
  return flattenPages(useLocalizationMarkets().data?.pages);
}

export function usePreviewBlocks() {
  return usePaginatedQuery<PreviewBlock>(localizationKeys.preview, fetchPreviewBlocks);
}

export function usePreviewBlockItems(): PreviewBlock[] {
  return flattenPages(usePreviewBlocks().data?.pages);
}

export function useLocalizationStats() {
  return useApiQuery<Paginated<LocalizationStat>>(localizationKeys.kpis, fetchLocalizationStats);
}
