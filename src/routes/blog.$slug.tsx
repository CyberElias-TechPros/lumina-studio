"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, notFound, useParams, redirect } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { NoteCard } from "@/components/marketing/note-card";
import { blogPosts, NOTES_AUTHOR, type BlogBlock } from "@/data/blog";
import { FounderPhoto } from "@/components/marketing/founder-photo";
import { adjacentNotes, chapterForOrder, relatedNotes } from "@/data/note-chapters";
import { getPageHead } from "@/lib/seo";
import { readingTimeLabel } from "@/lib/blog-reading-time";
import { resolveBlogSlugRedirect } from "@/lib/legacy-redirects";
import { SITE_URL } from "@/lib/site-url";

export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    const legacyTarget = resolveBlogSlugRedirect(params.slug);
    if (legacyTarget) {
      throw redirect({ to: legacyTarget, replace: true, code: 301 });
    }
    const exists = blogPosts.some((p) => p.slug === params.slug);
    if (!exists) throw notFound();
  },
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug) ?? blogPosts[0];
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: `${SITE_URL}${post.cover}`,
      author: {
        "@type": "Person",
        name: post.author,
        jobTitle: NOTES_AUTHOR.role,
        image: `${SITE_URL}${NOTES_AUTHOR.photo}`,
      },
      publisher: {
        "@type": "Organization",
        name: "Cyber Elias Academy",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
      },
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      isPartOf: {
        "@type": "CreativeWorkSeries",
        name: post.series,
        url: `${SITE_URL}/blog`,
      },
    };
    return getPageHead({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      type: "article",
      image: `${SITE_URL}${post.cover}`,
      structuredData: articleSchema,
    });
  },
  component: Article,
});

function Block({ block }: { block: BlogBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="font-display mt-10 text-2xl font-semibold tracking-tight">{block.text}</h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="text-foreground/80 my-4 list-disc space-y-2 pl-5 leading-relaxed">
        {block.items.map((item) => (
          <li key={item.slice(0, 48)}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "figure") {
    return (
      <figure className="border-border my-8 overflow-hidden rounded-lg border">
        <img
          src={block.src}
          alt={block.alt}
          className="h-auto w-full object-cover"
          loading="lazy"
        />
        <figcaption className="text-muted-foreground px-4 py-3 text-sm leading-relaxed">
          {block.caption}
        </figcaption>
      </figure>
    );
  }
  return <p className="text-foreground/80 text-[17px] leading-[1.75]">{block.text}</p>;
}

function Article() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const post = blogPosts.find((p) => p.slug === slug) ?? blogPosts[0];
  const { prev, next } = adjacentNotes(post);
  const chapter = chapterForOrder(post.order);
  const related = relatedNotes(post, 3);

  return (
    <PageShell>
      <header className="border-border bg-muted/30 border-b pt-10 pb-10 md:pt-14 md:pb-14">
        <div className="container-page max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/blog" className="hover:text-foreground">
                  Notes
                </Link>
              </li>
              {chapter && (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link to={`/blog?chapter=${chapter.slug}`} className="hover:text-foreground">
                      {chapter.title}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
              Lesson {post.order} of {blogPosts.length}
            </span>
            {chapter && (
              <span className="border-border bg-background text-muted-foreground rounded-full border px-3 py-1 text-xs">
                {chapter.courseLabel} in class
              </span>
            )}
          </div>

          <h1 className="font-display mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.75rem] md:leading-tight">
            {post.title}
          </h1>
          <p className="text-muted-foreground mt-5 text-lg leading-relaxed text-pretty">
            {post.excerpt}
          </p>

          <div className="border-border text-muted-foreground mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t pt-6 text-sm">
            <span className="text-foreground flex items-center gap-3">
              <FounderPhoto className="size-11 shrink-0 rounded-full" alt={NOTES_AUTHOR.name} />
              <span>
                <span className="block font-semibold">{post.author}</span>
                <span className="text-muted-foreground block text-xs">{NOTES_AUTHOR.role}</span>
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {readingTimeLabel(post.body)} read
            </span>
            {chapter && (
              <span className="hidden sm:inline">
                Chapter: <span className="text-foreground font-medium">{chapter.title}</span>
              </span>
            )}
          </div>
        </div>
      </header>

      <article className="container-page max-w-3xl py-12 md:py-16">
        <figure className="border-border overflow-hidden rounded-xl border shadow-sm">
          <img src={post.cover} alt={post.coverAlt} className="aspect-[16/9] w-full object-cover" />
        </figure>

        <div className="mt-10 space-y-6">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <aside className="border-primary/30 bg-primary/5 mt-12 rounded-xl border p-6">
          <p className="font-semibold">A note about examples</p>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Learner stories in these lessons illustrate a teaching point; they are not offered as
            testimonials, placement records or evidence of measured employment or income outcomes.
            Software screens and online processes can change; check official instructions before
            acting on sensitive matters.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            <Link to="/editorial" className="text-primary hover:underline">
              How we maintain these notes
            </Link>
            <a
              href={`mailto:help@cea.ng?subject=${encodeURIComponent(`Correction: ${post.title}`)}`}
              className="text-primary hover:underline"
            >
              Report a correction
            </a>
          </div>
        </aside>

        <nav
          aria-label="Lesson navigation"
          className="border-border mt-14 grid gap-4 border-t pt-10 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              to="/blog/$slug"
              params={{ slug: prev.slug }}
              className="group border-border bg-card hover:border-primary/40 flex flex-col rounded-xl border p-5 transition-colors"
            >
              <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
                <ArrowLeft className="size-3.5" /> Previous lesson
              </span>
              <span className="font-display group-hover:text-primary mt-2 text-base leading-snug font-semibold">
                Lesson {prev.order}: {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/blog/$slug"
              params={{ slug: next.slug }}
              className="group border-border bg-card hover:border-primary/40 flex flex-col rounded-xl border p-5 text-left transition-colors sm:text-right"
            >
              <span className="text-primary flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase sm:justify-end">
                Next lesson <ArrowRight className="size-3.5" />
              </span>
              <span className="font-display group-hover:text-primary mt-2 text-base leading-snug font-semibold">
                Lesson {next.order}: {next.title}
              </span>
            </Link>
          ) : (
            <Link
              to="/blog"
              className="group border-border bg-card hover:border-primary/40 flex flex-col rounded-xl border p-5 text-left transition-colors sm:text-right"
            >
              <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                End of the series
              </span>
              <span className="font-display group-hover:text-primary mt-2 text-base font-semibold">
                Back to all notes
              </span>
            </Link>
          )}
        </nav>
      </article>

      {(related.length > 0 || chapter) && (
        <section className="border-border bg-muted/40 border-t">
          <div className="container-page py-14 md:py-16">
            {related.length > 0 && (
              <>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-primary text-xs font-semibold tracking-[0.12em] uppercase">
                      Keep going
                    </p>
                    <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {chapter ? `More from ${chapter.title}` : "Related notes"}
                    </h2>
                  </div>
                  {chapter && (
                    <Link
                      to={`/blog?chapter=${chapter.slug}`}
                      className="text-primary text-sm font-semibold hover:underline"
                    >
                      Browse the whole chapter →
                    </Link>
                  )}
                </div>
                <ul className="mt-8 grid gap-6 md:grid-cols-3">
                  {related.map((p) => (
                    <li key={p.slug} className="flex">
                      <NoteCard post={p} />
                    </li>
                  ))}
                </ul>
              </>
            )}
            {chapter && (
              <div className="border-border bg-card mt-12 flex flex-col gap-5 rounded-xl border p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    Taught in the room
                  </p>
                  <p className="font-display mt-1 text-lg font-semibold">{chapter.courseLabel}</p>
                  <p className="text-muted-foreground mt-1 max-w-xl text-sm leading-relaxed">
                    Prefer to learn this with a tutor and a machine in front of you? The course
                    covers these lessons, two sessions a week.
                  </p>
                </div>
                <Button asChild className="shrink-0">
                  <Link to="/classes/$courseSlug" params={{ courseSlug: chapter.courseSlug }}>
                    View {chapter.courseLabel}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      <CTASection
        primary={{ label: "View courses", to: "/classes" }}
        secondary={{ label: "Contact us", to: "/contact" }}
      />
    </PageShell>
  );
}
