import { allPublishedSessions, coursesWithLectures } from "@/data/academy";
import { blogPosts } from "@/data/blog";
import { digitalProducts } from "@/data/digital-products";

/** Static slugs for public catalog routes; other dynamic routes remain on-demand. */
export function getStaticParamsForRoute(file: string): Record<string, string>[] {
  if (file === "blog.$slug.tsx") {
    return blogPosts.map((post) => ({ slug: post.slug }));
  }

  if (file === "classes.$courseSlug.index.tsx") {
    return coursesWithLectures().map((course) => ({ courseSlug: course.slug }));
  }

  if (file === "classes.$courseSlug.$sessionSlug.tsx") {
    return allPublishedSessions().map(({ course, session }) => ({
      courseSlug: course.slug,
      sessionSlug: session.slug,
    }));
  }

  if (
    file === "shop.$slug.index.tsx" ||
    file === "shop.$slug.checkout.tsx" ||
    file === "shop.$slug.return.tsx"
  ) {
    return digitalProducts.map((product) => ({ slug: product.slug }));
  }

  return [];
}
