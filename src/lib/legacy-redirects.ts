/**
 * Maps legacy pre-restyle blog slugs to their closest active Note or school page.
 * Keeps external inbound links and Google Search Console historical index
 * entries resolving via 301 rather than falling back or 404ing.
 */
export const LEGACY_BLOG_REDIRECTS: Record<string, string> = {
  "api-development-nodejs": "/classes",
  "nigeria-tech-talent-2026": "/about",
  "starting-tech-career-nigeria-2026": "/blog/choosing-a-school-or-bootcamp",
  "tech-community-nigeria": "/about",
  "networking-for-tech-career": "/blog/learning-in-public",
  "data-analytics-nigeria-career": "/blog/careers-in-data-analytics",
  "portfolio-that-gets-you-hired": "/blog/the-portfolio-that-proves-it",
  "cybersecurity-for-small-business-nigeria": "/classes/cybersecurity",
  "react-hooks-explained": "/blog/the-frontend-developer",
  "python-for-beginners-nigeria": "/classes/data-analytics",
  "devops-for-small-teams": "/blog/the-teams-that-build",
  "writing-a-tech-resume-nigeria": "/blog/the-cv-that-gets-read",
  "digital-marketing-nigerian-business": "/blog/running-social-media-for-a-business",
  "mobile-app-development-nigeria": "/blog/how-to-build-a-mobile-app-in-nigeria",
  "why-we-are-building-cea-os": "/about",
  "ui-ux-design-african-users": "/blog/design-that-works-on-cheap-phones",
  "cloud-computing-for-nigerian-businesses": "/blog/the-cloud-in-ordinary-words",
  "version-control-with-git": "/classes",
  "building-first-web-portfolio": "/blog/the-portfolio-that-proves-it",
  "freelancing-in-tech-from-nigeria": "/blog/remote-work-from-nigeria",
  "choosing-between-bootcamp-and-university": "/blog/choosing-a-school-or-bootcamp",
  "building-a-soc-on-a-budget": "/blog/the-soc-in-plain-words",
  "cohort-vs-self-paced": "/admissions",
  "hiring-junior-engineers": "/contact",
  "tech-imposter-syndrome": "/blog/on-your-own",
  "product-management-nigeria": "/classes",
};

export function resolveBlogSlugRedirect(slug: string): string | null {
  // Catch literal route parameters ($slug, %24slug) that leaked into crawlers
  if (!slug || slug === "$slug" || slug === "%24slug" || slug.includes("$")) {
    return "/blog";
  }
  return LEGACY_BLOG_REDIRECTS[slug] ?? null;
}
