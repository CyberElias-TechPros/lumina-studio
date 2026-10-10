import { notFound, permanentRedirect } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { getDigitalProduct } from "@/data/digital-products";
import { findSession } from "@/data/academy";
import { resolveBlogSlugRedirect } from "@/lib/legacy-redirects";

/** Handle route guards that must run before rendering the page on the server. */
export function checkServerRoute(pathname: string, params: Record<string, string>): void {
  if (pathname.startsWith("/blog/") && params.slug) {
    const legacyTarget = resolveBlogSlugRedirect(params.slug);
    if (legacyTarget) permanentRedirect(legacyTarget);
    // Unknown slugs are a real 404. Redirecting them to /blog is a "soft 404"
    // to Google and shows up as "Page with redirect" in Search Console.
    if (!blogPosts.some((post) => post.slug === params.slug)) notFound();
  }

  if (pathname.startsWith("/classes/") && params.courseSlug && params.sessionSlug) {
    if (!findSession(params.courseSlug, params.sessionSlug)) notFound();
  }

  if (pathname.startsWith("/shop/") && params.slug && !getDigitalProduct(params.slug)) {
    notFound();
  }
}
