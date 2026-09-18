import { redirect } from "@tanstack/react-router";

/**
 * Historic cinematic URLs (programs, engines, marketplace, fake campus
 * pages, etc.) 301 to the quiet school pages so old links and sitemap
 * entries keep resolving.
 */
export type SchoolDest = "/classes" | "/about" | "/contact" | "/visit" | "/admissions";

export function redirectPublic(to: SchoolDest): never {
  throw redirect({ to, replace: true, code: 301 });
}
