import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { SiteSearch } from "@/components/marketing/site-search";
import { getPageHead } from "@/lib/seo";
import { blogPosts } from "@/data/blog";
import { CEA_BUILT_IN_LABS } from "@/data/cea-lab-registry";

export const Route = createFileRoute("/search")({
  head: () =>
    getPageHead({
      title: "Search every lesson and tool",
      description:
        "Search inside the full text of 210 free lessons and 13 practice tools — file sizes, the naira sign, the cloud, passwords, Excel, typing speed and more.",
      path: "/search",
      // Results are client-side, so there is no set of indexable result pages
      // here. The page is a utility; the lessons it surfaces are already
      // indexed individually.
      noIndex: true,
    }),
  component: SearchPage,
});

function SearchPage() {
  const lessonCount = blogPosts.length;
  const toolCount = CEA_BUILT_IN_LABS.length;

  return (
    <PageShell>
      <PageHero
        eyebrow="Search"
        title={
          <>
            Find the <span className="font-serif text-primary font-normal italic">one page</span>{" "}
            you need.
          </>
        }
        description={`Searches the full text of ${lessonCount} lessons and ${toolCount} practice tools — not just their titles — by the thing you are trying to do.`}
        meta={[`${lessonCount} lessons`, `${toolCount} tools`, "Full-text, not titles"]}
      >
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> Home
        </Link>
      </PageHero>

      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <SiteSearch limit={12} autoFocus />

          <div className="mt-12">
            <Eyebrow>
              <Search className="size-3.5" aria-hidden="true" /> Or browse by shape
            </Eyebrow>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  to: "/blog",
                  title: `All ${lessonCount} lessons`,
                  blurb:
                    "The field notes, grouped into 21 chapters from first switch-on to AI productivity.",
                },
                {
                  to: "/tools",
                  title: `All ${toolCount} practice tools`,
                  blurb:
                    "Typing, Excel, SQL, code, colour contrast, passwords, file sizes and the naira sign.",
                },
                {
                  to: "/classes",
                  title: "Courses and fees",
                  blurb: "22 courses with dates, fees and what you leave able to do.",
                },
                {
                  to: "/faq",
                  title: "Questions people ask",
                  blurb: "Fees, payment plans, certificates, and what happens if you miss a class.",
                },
              ].map((card) => (
                <Link
                  key={card.to}
                  to={card.to}
                  className="border-foreground/10 bg-card hover:border-foreground/25 group rounded-xl border p-4 transition-colors"
                >
                  <span className="text-foreground flex items-center justify-between gap-2 text-sm font-semibold">
                    {card.title}
                    <ArrowRight className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">
                    {card.blurb}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Prefer to be taught than to search?"
        description="Short, practical courses in a room in Port Harcourt, with a tutor who answers questions and a certificate employers recognise."
        primary={{ label: "See courses & fees", to: "/classes" }}
        secondary={{ label: "Talk to us", to: "/contact" }}
      />
    </PageShell>
  );
}
