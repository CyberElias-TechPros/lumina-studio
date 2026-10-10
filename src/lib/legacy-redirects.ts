/**
 * Maps legacy pre-restyle blog slugs to their closest active Note or school page.
 * Keeps external inbound links and Google Search Console historical index
 * entries resolving via 301 rather than falling back or 404ing.
 */
export const LEGACY_BLOG_REDIRECTS: Record<string, string> = {
  "api-development-nodejs": "/classes",
  "nigeria-tech-talent-2026": "/about",
  "starting-tech-career-nigeria-2026": "/blog/choosing-where-to-learn-bootcamp",
  "tech-community-nigeria": "/about",
  "networking-for-tech-career": "/blog/learning-in-public",
  "data-analytics-nigeria-career": "/blog/careers-in-data-analytics",
  "portfolio-that-gets-you-hired": "/blog/the-portfolio-proof",
  "cybersecurity-for-small-business-nigeria": "/classes/cybersecurity",
  "react-hooks-explained": "/blog/frontend-developer-explained",
  "python-for-beginners-nigeria": "/classes/data-analytics",
  "devops-for-small-teams": "/blog/agile-and-devops",
  "writing-a-tech-resume-nigeria": "/blog/the-cv-that-gets-read",
  "digital-marketing-nigerian-business": "/blog/social-media-manager-behind-posts",
  "mobile-app-development-nigeria": "/blog/how-to-build-mobile-app-nigeria",
  "why-we-are-building-cea-os": "/about",
  "ui-ux-design-african-users": "/blog/frontend-developer-explained",
  "cloud-computing-for-nigerian-businesses": "/blog/the-cloud-in-ordinary-words",
  "version-control-with-git": "/classes",
  "building-first-web-portfolio": "/blog/the-portfolio-proof",
  "freelancing-in-tech-from-nigeria": "/blog/your-first-paid-client",
  "choosing-between-bootcamp-and-university": "/blog/choosing-where-to-learn-bootcamp",
  "building-a-soc-on-a-budget": "/blog/the-soc-room",
  "cohort-vs-self-paced": "/admissions",
  "hiring-junior-engineers": "/contact",
  "tech-imposter-syndrome": "/blog/learning-in-public",
  "product-management-nigeria": "/classes",
  // Former redirect targets that were later renamed; Google crawled these too.
  "the-portfolio-that-proves-it": "/blog/the-portfolio-proof",
  "the-frontend-developer": "/blog/frontend-developer-explained",
  "the-teams-that-build": "/blog/agile-and-devops",
  "running-social-media-for-a-business": "/blog/social-media-manager-behind-posts",
  "how-to-build-a-mobile-app-in-nigeria": "/blog/how-to-build-mobile-app-nigeria",
  "design-that-works-on-cheap-phones": "/blog/frontend-developer-explained",
  "remote-work-from-nigeria": "/blog/working-remote-from-here",
  "choosing-a-school-or-bootcamp": "/blog/choosing-where-to-learn-bootcamp",
  "the-soc-in-plain-words": "/blog/the-soc-room",
  "on-your-own": "/blog/learning-in-public",
};

export function resolveBlogSlugRedirect(slug: string): string | null {
  // Literal route patterns ($slug, %24slug) are not pages: return null so the
  // caller serves a 404 instead of a soft-404 redirect to the index.
  if (!slug || slug.includes("$") || slug.includes("%24")) return null;
  return Object.hasOwn(LEGACY_BLOG_REDIRECTS, slug) ? LEGACY_BLOG_REDIRECTS[slug] : null;
}
