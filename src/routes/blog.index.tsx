import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { blogPosts } from "@/data/blog";
import { readingTimeLabel } from "@/lib/blog-reading-time";

export const Route = createFileRoute("/blog/")({
  head: () =>
    getPageHead({
      title: "Notes — computer skills from scratch",
      description:
        "A from-scratch series on using a computer: sitting down, files, typing, the internet and email. Written as class notes from Cyber Elias Academy, Port Harcourt.",
      path: "/blog",
    }),
  component: Blog,
});

function Blog() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...blogPosts].sort((a, b) => a.order - b.order);
    if (!q) return list;
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.series.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Notes"
        title="Computer skills from the first sitting"
        description="A series for people who have never used a computer, or who have used one without anyone explaining it. Each note is a lesson: what you will see, what to do with your hands, and what to try before you close the machine."
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
          <ul className="grid gap-8 md:grid-cols-2">
            {filtered.map((p) => (
              <li key={p.slug}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="border-border overflow-hidden rounded-lg border">
                    <img
                      src={p.cover}
                      alt={p.coverAlt}
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </div>
                  <p className="text-muted-foreground mt-4 text-xs">
                    Lesson {p.order}
                    <span className="mx-2">·</span>
                    {p.date}
                  </p>
                  <h2 className="font-display group-hover:text-primary mt-1.5 text-lg font-semibold tracking-tight">
                    {p.title}
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.excerpt}</p>
                  <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-xs">
                    <Clock className="size-3.5" /> {readingTimeLabel(p.body)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <CTASection
        title="Prefer a class?"
        description="The same basics are taught at the centre, two sessions a week, with a machine in front of you."
        primary={{ label: "View courses", to: "/classes" }}
        secondary={{ label: "Contact us", to: "/contact" }}
      />
    </PageShell>
  );
}
