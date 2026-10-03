"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, useParams, redirect } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { blogPosts, NOTES_AUTHOR, type BlogBlock } from "@/data/blog";
import { FounderPhoto } from "@/components/marketing/founder-photo";
import { adjacentNotes, chapterForOrder, relatedNotes } from "@/data/note-chapters";
import { getPageHead } from "@/lib/seo";
import { readingTimeLabel } from "@/lib/blog-reading-time";
import { resolveBlogSlugRedirect } from "@/lib/legacy-redirects";

export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    const legacyTarget = resolveBlogSlugRedirect(params.slug);
    if (legacyTarget) {
      throw redirect({ to: legacyTarget, replace: true, code: 301 });
    }
    const exists = blogPosts.some((p) => p.slug === params.slug);
    if (!exists) {
      throw redirect({ to: "/blog", replace: true, code: 301 });
    }
  },
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug) ?? blogPosts[0];
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: `https://cea.ng${post.cover}`,
      author: {
        "@type": "Person",
        name: post.author,
        jobTitle: NOTES_AUTHOR.role,
        image: `https://cea.ng${NOTES_AUTHOR.photo}`,
      },
      publisher: {
        "@type": "Organization",
        name: "Cyber Elias Academy",
        logo: { "@type": "ImageObject", url: "https://cea.ng/icon.svg" },
      },
      mainEntityOfPage: `https://cea.ng/blog/${post.slug}`,
      isPartOf: {
        "@type": "CreativeWorkSeries",
        name: post.series,
        url: "https://cea.ng/blog",
      },
    };
    return getPageHead({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      type: "article",
      image: `https://cea.ng${post.cover}`,
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
      <article className="container-page max-w-3xl pt-28 pb-16 md:pt-32 md:pb-20">
        <Link
          to="/blog"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="size-4" /> All notes
        </Link>

        <p className="text-muted-foreground mt-8 text-xs">
          {post.series}
          {chapter && (
            <>
              <span className="mx-2">·</span>
              {chapter.title}
            </>
          )}
          <span className="mx-2">·</span>
          Lesson {post.order} of {blogPosts.length}
        </p>

        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {post.title}
        </h1>

        <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-4 border-b pb-6 text-sm">
          <span className="text-foreground flex items-center gap-2.5">
            <FounderPhoto className="size-10 shrink-0 rounded-full" alt={NOTES_AUTHOR.name} />
            <span>
              <span className="block font-medium">{post.author}</span>
              <span className="text-muted-foreground block text-xs">{NOTES_AUTHOR.role}</span>
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" /> {readingTimeLabel(post.body)}
          </span>
        </div>

        <figure className="border-border mt-8 overflow-hidden rounded-lg border">
          <img src={post.cover} alt={post.coverAlt} className="aspect-[16/9] w-full object-cover" />
        </figure>

        <p className="text-muted-foreground mt-8 text-lg leading-relaxed">{post.excerpt}</p>

        <div className="mt-8 space-y-5">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <aside className="border-border bg-muted/35 mt-10 rounded-lg border p-5">
          <p className="font-medium">A note about examples</p>
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
          aria-label="Next lesson"
          className="border-border mt-14 grid gap-3 border-t pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              to="/blog/$slug"
              params={{ slug: prev.slug }}
              className="border-border hover:border-primary/40 rounded-lg border p-4"
            >
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <ArrowLeft className="size-3.5" /> Previous
              </p>
              <p className="font-display mt-2 text-sm font-semibold leading-snug">
                Lesson {prev.order}: {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/blog/$slug"
              params={{ slug: next.slug }}
              className="border-border hover:border-primary/40 rounded-lg border p-4 sm:text-right"
            >
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs sm:justify-end">
                Next <ArrowRight className="size-3.5" />
              </p>
              <p className="font-display mt-2 text-sm font-semibold leading-snug">
                Lesson {next.order}: {next.title}
              </p>
            </Link>
          ) : (
            <Link
              to="/blog"
              className="border-border hover:border-primary/40 rounded-lg border p-4 sm:text-right"
            >
              <p className="text-muted-foreground text-xs">End of the series</p>
              <p className="font-display mt-2 text-sm font-semibold">All notes</p>
            </Link>
          )}
        </nav>
      </article>

      {(related.length > 0 || chapter) && (
        <section className="border-border bg-muted/40 border-y">
          <div className="container-page py-12 md:py-16">
            {related.length > 0 && (
              <>
                <h2 className="font-display text-xl font-semibold">
                  {chapter ? `Also in ${chapter.title}` : "Related notes"}
                </h2>
                <ul className="mt-6 grid gap-4 md:grid-cols-3">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: p.slug }}
                        className="border-border bg-card hover:border-primary/40 block h-full overflow-hidden rounded-lg border"
                      >
                        <img src={p.cover} alt="" className="aspect-[16/9] w-full object-cover" />
                        <div className="p-5">
                          <p className="text-muted-foreground text-xs">Lesson {p.order}</p>
                          <h3 className="font-display mt-2 text-base font-semibold leading-snug">
                            {p.title}
                          </h3>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {chapter && (
              <div className="border-border bg-card mt-8 rounded-lg border p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
                <div>
                  <p className="text-muted-foreground text-xs">Taught in the room</p>
                  <p className="font-display mt-1 text-lg font-semibold">{chapter.courseLabel}</p>
                  <p className="text-muted-foreground mt-1 max-w-xl text-sm leading-relaxed">
                    Same ground, with an instructor and a machine in front of you. Two sessions a
                    week.
                  </p>
                </div>
                <Button asChild className="mt-4 sm:mt-0">
                  <Link to="/classes/$courseSlug" params={{ courseSlug: chapter.courseSlug }}>
                    View {chapter.courseLabel}
                  </Link>
                </Button>
              </div>
            )}
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link to="/blog">All notes</Link>
              </Button>
            </div>
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
