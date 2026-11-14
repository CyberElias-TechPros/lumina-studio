import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { PageShell } from "@/components/marketing/shell";
import { LearningTrail } from "@/components/practice/learning-trail";
import { beginnerLessonSlugs } from "@/data/practice/beginner-challenges";
import { blogPosts } from "@/data/blog";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/learning-trail")({
  head: () =>
    getPageHead({
      title: "Your beginner learning trail — Cyber Elias Academy",
      description:
        "Explore five free beginner computer lessons and a practice lab, with optional bookmarks and progress on your device.",
      path: "/learning-trail",
    }),
  component: LearningTrailPage,
});

function LearningTrailPage() {
  const lessons = beginnerLessonSlugs
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter((post): post is (typeof blogPosts)[number] => Boolean(post))
    .map(({ slug, title }) => ({ slug, title }));
  return (
    <PageShell>
      <header className="border-border bg-muted/30 border-b">
        <div className="container-page max-w-6xl py-12 md:py-16">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase">
            Free learning / Your trail
          </p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Learn a little. Come back anytime.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
            Follow five beginner lessons and try the Computer Basics Lab. Choose whether to bookmark
            or mark lessons complete; no account is required.
          </p>
          <p className="text-muted-foreground mt-4 text-sm">
            Saving and displaying your trail needs JavaScript. You can always{" "}
            <Link to="/blog" className="text-primary underline">
              browse the free lessons
            </Link>{" "}
            instead.
          </p>
        </div>
      </header>
      <div className="container-page max-w-6xl py-12 md:py-16">
        <LearningTrail lessons={lessons} />
      </div>
    </PageShell>
  );
}
