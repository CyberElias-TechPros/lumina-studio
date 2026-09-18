import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { blogPosts } from "@/data/site";
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
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

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
          {post.category}
          <span className="mx-2">·</span>
          {post.date}
        </p>

        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {post.title}
        </h1>

        <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-4 border-b pb-6 text-sm">
          <span>{post.author}</span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" /> {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" /> {readingTimeLabel(post.body)}
          </span>
        </div>

        <p className="text-muted-foreground mt-8 text-base leading-relaxed">{post.excerpt}</p>

        <div className="mt-8 space-y-5">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-foreground/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <section className="border-border bg-muted/40 border-y">
        <div className="container-page py-12 md:py-16">
          <h2 className="font-display text-xl font-semibold">More notes</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="border-border bg-card hover:border-primary/40 block h-full rounded-lg border p-5"
                >
                  <p className="text-muted-foreground text-xs">{p.category}</p>
                  <h3 className="font-display mt-2 text-base font-semibold leading-snug">
                    {p.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/blog">All notes</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        primary={{ label: "View courses", to: "/classes" }}
        secondary={{ label: "Contact us", to: "/contact" }}
      />
    </PageShell>
  );
}
