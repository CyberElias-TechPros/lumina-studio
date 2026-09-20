import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { blogPosts } from "@/data/blog";
import { noteChapters, notesInChapter } from "@/data/note-chapters";
import { readingTimeLabel } from "@/lib/blog-reading-time";

export const Route = createFileRoute("/blog/")({
  head: () =>
    getPageHead({
      title: "Notes — computer skills from scratch",
      description:
        "A from-scratch series on using a computer: files, email, Word, spreadsheets, the phone, and staying safe online. Class notes from Cyber Elias Academy, Port Harcourt.",
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

  const searching = query.trim().length > 0;

  return (
    <PageShell>
      <PageHero
        eyebrow="Notes"
        title="Computer skills from the first sitting"
        description="A series for people who have never used a computer, or who have used one without anyone explaining it. Written by Ellis Dennis Graham at Cyber Elias Academy, Port Harcourt. One hundred lessons, in order. Read them like a magazine: finish one, turn the page."
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

      {!searching && (
        <nav className="container-page border-border border-b py-6" aria-label="Chapters">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Ten chapters
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {noteChapters.map((ch) => (
              <li key={ch.slug}>
                <a
                  href={`#${ch.slug}`}
                  className="border-border hover:border-primary/40 hover:bg-muted inline-flex rounded-full border px-3 py-1 text-sm"
                >
                  {ch.from}–{ch.to} · {ch.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <section className="container-page py-12 md:py-16">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-sm">No notes match that search.</p>
        ) : searching ? (
          <ul className="divide-border divide-y">
            {filtered.map((p) => (
              <LessonRow key={p.slug} post={p} />
            ))}
          </ul>
        ) : (
          <div className="space-y-16">
            {noteChapters.map((ch) => {
              const lessons = notesInChapter(ch);
              return (
                <section key={ch.slug} id={ch.slug} className="scroll-mt-24">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-muted-foreground text-xs">
                        Lessons {ch.from}–{ch.to}
                      </p>
                      <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight">
                        {ch.title}
                      </h2>
                      <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed">
                        {ch.blurb}
                      </p>
                    </div>
                    <Link
                      to="/classes/$courseSlug"
                      params={{ courseSlug: ch.courseSlug }}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      {ch.courseLabel} in class
                    </Link>
                  </div>
                  <ul className="divide-border mt-6 divide-y border-t">
                    {lessons.map((p) => (
                      <LessonRow key={p.slug} post={p} />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
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

function LessonRow({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <li>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group hover:bg-muted/40 -mx-3 flex gap-4 rounded-md px-3 py-4"
      >
        <img
          src={post.cover}
          alt=""
          className="border-border hidden size-20 shrink-0 rounded-md border object-cover sm:block"
        />
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground text-xs">
            Lesson {post.order}
            <span className="mx-2">·</span>
            {readingTimeLabel(post.body)}
          </p>
          <h3 className="font-display group-hover:text-primary mt-1 text-base font-semibold tracking-tight">
            {post.title}
          </h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-relaxed">
            {post.excerpt}
          </p>
        </div>
        <Clock className="text-muted-foreground mt-1 hidden size-3.5 shrink-0 sm:block" />
      </Link>
    </li>
  );
}
