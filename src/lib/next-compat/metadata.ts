import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import { findCourse, findSession, formatFee } from "@/data/academy";
import { getDigitalProduct } from "@/data/digital-products";
import { routeManifest, normalizeRoutePath, type RouteManifestEntry } from "./routes.gen";

const SITE_NAME = "Cyber Elias Academy";
const SITE_ORIGIN = "https://cea.ng";
const DEFAULT_DESCRIPTION =
  "A digital skills training centre in Port Harcourt. Short, practical computer and workplace-digital courses.";

type RouteSeo = {
  title: string;
  description: string;
  image?: string;
  type?: string;
};

function humanizeRoute(entry: RouteManifestEntry): string {
  const parts = normalizeRoutePath(entry.path)
    .split("/")
    .filter(Boolean)
    .map((part) => part.replace(/^\$/, "").replace(/[-_]/g, " "));
  const label = parts.length
    ? parts.map((part) => part.replace(/\b\w/g, (char) => char.toUpperCase())).join(" · ")
    : SITE_NAME;
  return `${label} — ${SITE_NAME}`;
}

function routeSeo(
  pathname: string,
  entry: RouteManifestEntry,
  params: Record<string, string>,
): RouteSeo {
  const seo: RouteSeo = {
    title: entry.title ?? humanizeRoute(entry),
    description: entry.description ?? DEFAULT_DESCRIPTION,
    type: entry.type ?? "website",
    image: entry.image ?? undefined,
  };

  if (pathname.startsWith("/blog/") && params.slug) {
    const post = blogPosts.find((candidate) => candidate.slug === params.slug);
    if (post) {
      seo.title = `${post.title} — ${SITE_NAME}`;
      seo.description = post.excerpt;
      seo.image = post.cover;
      seo.type = "article";
    }
  }

  if (pathname.startsWith("/classes/") && params.courseSlug) {
    const match = params.sessionSlug
      ? findSession(params.courseSlug, params.sessionSlug)
      : undefined;
    const course = match?.course ?? findCourse(params.courseSlug);
    if (course) {
      if (match) {
        const lecture = match.session.lecture;
        seo.title = `${course.title} — Session ${match.session.number}: ${match.session.title} — ${SITE_NAME}`;
        seo.description =
          lecture?.summary ??
          `Full class notes for ${course.title} session ${match.session.number}: ${match.session.topics.slice(0, 6).join(", ")}.`;
        seo.type = "article";
      } else {
        seo.title = `${course.title} — ${course.weeks}-Week Practical Course at ${SITE_NAME}`;
        seo.description = `${course.hook} ${formatFee(course.fee)}, ${course.weeks} weeks, ${course.sessions.length} practical sessions with full class notes published for every session.`;
      }
    }
  }

  if (pathname.startsWith("/shop/") && params.slug) {
    const product = getDigitalProduct(params.slug);
    if (product) {
      seo.title = `${product.title} — ${SITE_NAME} shop`;
      seo.description = product.shortDescription;
      seo.image = product.image;
      seo.type = "product";
      if (pathname.endsWith("/checkout") || pathname.endsWith("/return")) {
        seo.title = `${pathname.endsWith("/checkout") ? "Checkout" : "Order status"} — ${product.title} — ${SITE_NAME}`;
      }
    }
  }

  return seo;
}

function isPrivatePath(pathname: string): boolean {
  return (
    pathname === "/app" ||
    pathname.startsWith("/app/") ||
    pathname === "/auth" ||
    pathname.startsWith("/auth/") ||
    pathname === "/portal" ||
    pathname.startsWith("/portal/") ||
    pathname === "/apply/status" ||
    pathname.startsWith("/apply/status/") ||
    /^\/shop\/[^/]+\/(checkout|return)$/.test(pathname)
  );
}

export function getNextRouteMetadata(
  file: string,
  pathname: string,
  params: Record<string, string>,
): Metadata {
  const entry = routeManifest.find((route) => route.file === file);
  if (!entry) {
    return { title: `Page not found — ${SITE_NAME}`, robots: { index: false, follow: false } };
  }

  const seo = routeSeo(pathname, entry, params);
  const canonical = `${SITE_ORIGIN}${pathname}`;
  const image = seo.image
    ? seo.image.startsWith("http")
      ? seo.image
      : `${SITE_ORIGIN}${seo.image.startsWith("/") ? "" : "/"}${seo.image}`
    : `${SITE_ORIGIN}/og-default.png`;
  const noIndex = isPrivatePath(pathname);

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_NG",
      type: seo.type === "article" ? "article" : "website",
      images: [{ url: image, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}
