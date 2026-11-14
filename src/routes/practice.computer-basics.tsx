import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/marketing/shell";
import { ComputerBasicsLab } from "@/components/practice/computer-basics-lab";
import { blogPosts } from "@/data/blog";
import { beginnerLessonSlugs } from "@/data/practice/beginner-challenges";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/practice/computer-basics")({
  head: () =>
    getPageHead({
      title: "Computer Basics Lab — free beginner practice",
      description:
        "Practise pointing, typing and naming a file with three gentle browser activities, then explore free computer skills lessons.",
      path: "/practice/computer-basics",
    }),
  component: ComputerBasicsPage,
});

function ComputerBasicsPage() {
  const lessons = beginnerLessonSlugs
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter((post): post is (typeof blogPosts)[number] => Boolean(post));
  return (
    <PageShell>
      <header className="border-border border-b bg-muted/30">
        <div className="container-page max-w-4xl py-12 md:py-16">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase">
            Free learning / Practice lab
          </p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Computer Basics Lab
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
            Practise pointing, typing and naming a file in a safe browser simulation. No account,
            download or previous experience needed.
          </p>
          <p className="text-muted-foreground mt-4 text-sm">
            The activities need JavaScript. You can still{" "}
            <Link to="/blog" className="text-primary underline">
              read the free lessons
            </Link>{" "}
            without using the lab.
          </p>
        </div>
      </header>
      <div className="container-page grid max-w-6xl gap-10 py-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)] lg:items-start">
        <ComputerBasicsLab />
        <aside
          className="border-border bg-card rounded-2xl border p-6"
          aria-labelledby="lab-lessons"
        >
          <p className="text-primary text-xs font-semibold tracking-widest uppercase">
            Keep learning
          </p>
          <h2 id="lab-lessons" className="font-display mt-3 text-2xl font-semibold">
            Read, then practise
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            These five free lessons cover the basics and each includes a short practice check.
          </p>
          <ol className="mt-5 space-y-1">
            {lessons.map((lesson, index) => (
              <li key={lesson.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: lesson.slug }}
                  className="border-border hover:text-primary flex min-h-11 items-start gap-3 border-b py-3 text-sm font-medium"
                >
                  <span className="text-primary shrink-0 text-xs">0{index + 1}</span>
                  <span>{lesson.title}</span>
                  <ArrowRight aria-hidden="true" className="ml-auto size-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ol>
          <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
            Want classroom guidance? See the{" "}
            <Link
              to="/classes/computer-basics-typing"
              className="text-primary font-semibold underline"
            >
              Typing &amp; Computer Basics course
            </Link>{" "}
            for fees, requirements and availability.
          </p>
        </aside>
      </div>
    </PageShell>
  );
}
