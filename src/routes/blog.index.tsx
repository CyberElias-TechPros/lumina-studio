import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { blogPosts } from "@/data/site";
import { readingTimeLabel } from "@/lib/blog-reading-time";

export const Route = createFileRoute("/blog/")({
  head: () =>
    getPageHead({
      title: "Notes",
      description:
        "Short writing from Cyber Elias Academy. Practical notes on computer skills and learning — not a magazine.",
      path: "/blog",
    }),
  component: Blog,
});

function Blog() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blogPosts;
    return blogPosts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Notes"
        title="Short writing from the academy"
        description="Practical notes on computer skills and learning. This is not a magazine and we do not run a newsletter."
      >
        <div className="relative mt-8 max-w-md">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes…"
            className="h-11 pl-10"
          />
        </div>
      </PageHero>

      <section className="container-page py-12 md:py-16">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-sm">No notes match that search.</p>
        ) : (
          <ul className="divide-border divide-y">
            {filtered.map((p) => (
              <li key={p.slug} className="py-6 first:pt-0">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                  <p className="text-muted-foreground text-xs">
                    {p.date}
                    <span className="mx-2">·</span>
                    {p.category}
                  </p>
                  <h2 className="font-display group-hover:text-primary mt-1.5 text-lg font-semibold tracking-tight">
                    {p.title}
                  </h2>
                  <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed">
                    {p.excerpt}
                  </p>
                  <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-xs">
                    <Clock className="size-3.5" /> {readingTimeLabel(p.body)}
                    <span className="mx-1">·</span>
                    {p.author}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <CTASection
        title="Want a course instead?"
        description="Fees and weeks are on each course page."
        primary={{ label: "View courses", to: "/classes" }}
        secondary={{ label: "Contact us", to: "/contact" }}
      />
    </PageShell>
  );
}
