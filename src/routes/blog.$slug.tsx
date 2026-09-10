import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { ArticleBody } from "@/components/article-body";
import { Portrait, SiteImage } from "@/components/media/site-image";
import { RelatedContent } from "@/components/related-content";
import { ContentFreshness } from "@/components/content-freshness";
import { blogPosts } from "@/data/site";
import { getPageHead } from "@/lib/seo";
import { readingTimeLabel } from "@/lib/blog-reading-time";

/** Posts kept for readers but out of the index (off-mission / pending rewrite). */
const NOINDEX_SLUGS = new Set(["why-we-are-building-cea-os"]);

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug) ?? blogPosts[0];
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@type": "Person", name: post.author, jobTitle: post.role },
      publisher: {
        "@type": "Organization",
        name: "Cyber Elias Academy",
        logo: { "@type": "ImageObject", url: "https://cea.ng/icon.svg" },
      },
      mainEntityOfPage: `https://cea.ng/blog/${post.slug}`,
    };
    return getPageHead({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      type: "article",
      image: post.heroImage ? `https://cea.ng${post.heroImage}` : undefined,
      noIndex: NOINDEX_SLUGS.has(post.slug),
      structuredData: articleSchema,
    });
  },
  component: Article,
});

function Article() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const post = blogPosts.find((p) => p.slug === slug) ?? blogPosts[0];
  const related = blogPosts
    .filter((p) => p.slug !== post.slug && !NOINDEX_SLUGS.has(p.slug))
    .slice(0, 3);

  return (
    <PageShell>
      <article className="container-page max-w-3xl py-16 md:py-20">
        <Reveal>
          <Link
            to="/blog"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="size-4" /> All articles
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-semibold">
              {post.category}
            </Badge>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display mt-5 text-3xl leading-tight font-extrabold text-balance sm:text-4xl md:text-5xl md:leading-[1.1]">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-7 flex flex-wrap items-center gap-4 border-b pb-8">
            <Portrait src={post.authorPhoto} name={post.author} className="size-12 text-sm" />
            <div>
              <p className="text-sm font-bold">{post.author}</p>
              <p className="text-muted-foreground text-xs">{post.role}</p>
            </div>
            <div className="text-muted-foreground ml-auto flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5" /> {post.updated ?? post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" /> {readingTimeLabel(post.body)} read
              </span>
            </div>
          </div>
        </Reveal>

        {post.heroImage && (
          <Reveal delay={0.05} className="mt-8">
            <SiteImage
              src={post.heroImage}
              alt={post.title}
              ratio="aspect-[16/9]"
              eager
            />
          </Reveal>
        )}

        <div className="mt-8">
          <Reveal delay={0.05}>
            <p className="text-muted-foreground mb-8 border-l-2 pl-5 text-lg leading-relaxed font-medium text-pretty italic">
              {post.excerpt}
            </p>
          </Reveal>
          <ArticleBody paragraphs={post.body} />
          <ContentFreshness
            lastReviewed={post.updated ?? post.date}
            author={post.author}
            className="mt-10 border-t pt-6"
          />
        </div>

        <div className="mt-12">
          <RelatedContent currentSlug={post.slug} currentType="blog" maxItems={4} />
        </div>
      </article>

      <section className="bg-muted/40 border-y">
        <div className="container-page py-16 md:py-20">
          <h2 className="font-display text-2xl font-extrabold">Keep reading</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group bg-card shadow-soft hover:shadow-elevated flex flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-1"
              >
                {p.heroImage && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={p.heroImage}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <Badge variant="secondary" className="w-fit font-semibold">
                    {p.category}
                  </Badge>
                  <h3 className="font-display group-hover:text-primary mt-3 flex-1 text-base leading-snug font-bold">
                    {p.title}
                  </h3>
                  <span className="text-muted-foreground mt-4 flex items-center gap-1 text-xs font-medium">
                    {p.author} · {readingTimeLabel(p.body)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/blog">
                All articles <ArrowUpRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Learn this properly, with a teacher beside you"
        description="Reading helps. Building with guidance is faster. Come and see how our classes work — or just ask us where to start."
        primary={{ label: "Browse programs", to: "/programs" }}
        secondary={{ label: "Plan a visit", to: "/visit" }}
      />
    </PageShell>
  );
}
