import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { GlossaryLinkedText } from "@/components/glossary-linked-text";
import { RelatedContent } from "@/components/related-content";
import { ContentFreshness } from "@/components/content-freshness";
import { blogPosts, engineMap } from "@/data/site";
import { getPageHead } from "@/lib/seo";
import { readingTimeLabel } from "@/lib/blog-reading-time";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug) ?? blogPosts[0];
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { "@type": "Person", name: post.author },
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
      structuredData: articleSchema,
    });
  },
  component: Article,
});

function Article() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const post = blogPosts.find((p) => p.slug === slug) ?? blogPosts[0];
  const engine = engineMap[post.engine];
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell>
      <article className="container-page max-w-3xl pt-32 pb-16 md:pt-36 md:pb-20">
        <Reveal>
          <Link
            to="/blog"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="size-4" /> All insights
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-semibold">
              {post.category}
            </Badge>
            {engine && (
              <span className={`${engine.text} text-xs font-bold tracking-wide uppercase`}>
                {engine.name.split(" ")[0]} Engine
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display mt-5 text-3xl leading-tight font-extrabold text-balance sm:text-4xl md:text-5xl md:leading-[1.1]">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-7 flex flex-wrap items-center gap-4 border-b pb-8">
            <span className="bg-gradient-brand text-primary-foreground font-display grid size-12 place-items-center rounded-full text-sm font-bold">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <div>
              <p className="text-sm font-bold">{post.author}</p>
              <p className="text-muted-foreground text-xs">{post.role}</p>
            </div>
            <div className="text-muted-foreground ml-auto flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" /> {readingTimeLabel(post.body)} read
              </span>
            </div>
          </div>
        </Reveal>

        {post.imageUrl && (
          <Reveal>
            <a
              href={post.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full rounded-2xl overflow-hidden mb-6"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105 motion-reduce:transition-none motion-reduce:scale-100"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none">
                <span className="text-white text-2xl">📖</span>
              </div>
            </a>
          </Reveal>
        )}
        <div className="mt-8 space-y-6">
          <Reveal delay={0.05}>
            <p className="text-muted-foreground border-l-2 pl-5 text-lg leading-relaxed font-medium text-pretty italic">
              {post.excerpt}
            </p>
          </Reveal>
          <GlossaryLinkedText
            paragraphs={post.body}
            className="space-y-6"
            maxLinksPerParagraph={3}
          />
          <ContentFreshness
            lastReviewed={post.date}
            author={post.author}
            className="mt-8 pt-6 border-t"
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
                className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1"
              >
                <Badge variant="secondary" className="w-fit font-semibold">
                  {p.category}
                </Badge>
                <h3 className="font-display group-hover:text-primary mt-3 flex-1 text-base leading-snug font-bold">
                  {p.title}
                </h3>
                <span className="text-muted-foreground mt-4 flex items-center gap-1 text-xs font-medium">
                  {p.author} · {readingTimeLabel(p.body)}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/blog">
                All insights <ArrowUpRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
