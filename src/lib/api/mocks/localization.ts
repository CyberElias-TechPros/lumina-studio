import { registerMock } from "@/lib/api/client";
import {
  localizationProjects,
  glossaryTerms,
  styleGuides,
  translationMemory,
  dialects,
  variants,
  localizationMarkets,
  previewBlocks,
  localizationStats,
} from "@/data/localization";

function delay(milliseconds = 120): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function registerLocalizationMocks(): void {
  registerMock("GET", "/v1/localization/projects", async () => {
    await delay();
    return { items: localizationProjects, total: localizationProjects.length };
  });
  registerMock("GET", "/v1/localization/glossary", async () => {
    await delay();
    return { items: glossaryTerms, total: glossaryTerms.length };
  });
  registerMock("GET", "/v1/localization/style-guides", async () => {
    await delay();
    return { items: styleGuides, total: styleGuides.length };
  });
  registerMock("GET", "/v1/localization/translation-memory", async () => {
    await delay();
    return { items: translationMemory, total: translationMemory.length };
  });
  registerMock("GET", "/v1/localization/dialects", async () => {
    await delay();
    return { items: dialects, total: dialects.length };
  });
  registerMock("GET", "/v1/localization/variants", async () => {
    await delay();
    return { items: variants, total: variants.length };
  });
  registerMock("GET", "/v1/localization/analytics", async () => {
    await delay();
    return { items: localizationMarkets, total: localizationMarkets.length };
  });
  registerMock("GET", "/v1/localization/preview", async () => {
    await delay();
    return { items: previewBlocks, total: previewBlocks.length };
  });
  registerMock("GET", "/v1/localization/kpis", async () => {
    await delay();
    return { items: localizationStats, total: localizationStats.length };
  });
}
