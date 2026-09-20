import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { blogPosts, type BlogBlock } from "@/data/blog";
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
      image: `https://cea.ng${post.cover}`,
      author: { "@type": "Organization", name: post.author },
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
        <img src={block.src} alt={block.alt} className="h-auto w-full object-cover" loading="lazy" />
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
  const later = blogPosts
    .filter((p) => p.order > post.order)
    .sort((a, b) => a.order - b.order);
  const earlier = blogPosts
    .filter((p) => p.order < post.order)
    .sort((a, b) => b.order - a.order);
  const related = [...later, ...earlier].slice(0, 3);

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
          <span className="mx-2">·</span>
          Lesson {post.order}
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

        <figure className="border-border mt-8 overflow-hidden rounded-lg border">
          <img src={post.cover} alt={post.coverAlt} className="aspect-[16/9] w-full object-cover" />
        </figure>

        <p className="text-muted-foreground mt-8 text-lg leading-relaxed">{post.excerpt}</p>

        <div className="mt-8 space-y-5">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </article>

      <section className="border-border bg-muted/40 border-y">
        <div className="container-page py-12 md:py-16">
          <h2 className="font-display text-xl font-semibold">Next in the series</h2>
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
