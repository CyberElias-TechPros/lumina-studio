import type { ArtVariant } from "./scene-art";

const VARIANT_BY_SLUG: Record<string, ArtVariant> = {
  "full-stack-software-development": "code",
  "cybersecurity-analyst": "shield",
  "cloud-engineering-devops": "cloud",
  "data-science-ai": "data",
  "product-ui-ux-design": "design",
  "digital-marketing-growth": "market",
  "networking-it-support": "network",
  "mobile-app-development": "mobile",
};

export function programVariant(slug: string): ArtVariant {
  return VARIANT_BY_SLUG[slug] ?? "code";
}
