import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Clock, Target, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { getPageHead } from "@/lib/seo";
import { getCareerGuides, type CareerGuide } from "@/data/career-guides";

export const Route = createFileRoute("/career-guides")({
  head: () =>
    getPageHead({
      title: "Career Guides — honest roadmaps for Nigerian tech careers",
      description: "Practical career roadmaps for frontend, backend, cloud, cybersecurity, data, marketing and design roles in Nigeria. Salary ranges, 90-day plans and common pitfalls.",
      path: "/career-guides",
      image: "https://cea.ng/og-career-guides.svg",
    }),
  component: CareerGuidesPage,
});

function CareerGuidesPage() {
  const guides = getCareerGuides();
  const byDifficulty = {
    Beginner: guides.filter((g) => g.difficulty === "Beginner"),
    Intermediate: guides.filter((g) => g.difficulty === "Intermediate"),
    Advanced: guides.filter((g) => g.difficulty === "Advanced"),
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Nigerian Tech <span className="text-gradient">Career Guides</span>
          </>
        }
        description={`${guides.length} roles mapped with salary ranges, 90-day plans and honest pitfalls. No fluff — just what it actually takes to get hired in the Nigerian tech market.`}
      />

      <section className="container-page pb-20">
        <div className="space-y-16">
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Career paths",
                  value: String(guides.length),
                  icon: Briefcase,
                  tone: "bg-primary/10 text-primary",
                },
                {
                  label: "Beginner-friendly",
                  value: String(byDifficulty.Beginner.length),
                  icon: Target,
                  tone: "bg-learning/10 text-learning",
                },
                {
                  label: "Intermediate",
                  value: String(byDifficulty.Intermediate.length),
                  icon: TrendingUp,
                  tone: "bg-community/10 text-community",
                },
                {
                  label: "Advanced",
                  value: String(byDifficulty.Advanced.length),
                  icon: Clock,
                  tone: "bg-career/10 text-career",
                },
              ].map((k) => (
                <Card key={k.label} className="bg-card shadow-soft border">
                  <CardContent className="flex items-center gap-3 p-4">
                    <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${k.tone}`}>
                      <k.icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display truncate text-lg font-extrabold">{k.value}</p>
                      <p className="text-muted-foreground text-xs font-semibold">{k.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>

          {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
            <Reveal key={level}>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Browse"
                  title={`${level} roles`}
                  description={`${byDifficulty[level].length} guides at the ${level.toLowerCase()} level`}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {byDifficulty[level].map((guide) => (
                    <GuideCard key={guide.slug} guide={guide} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function GuideCard({ guide }: { guide: CareerGuide }) {
  return (
    <Link
      to="/career-guides/$slug"
      params={{ slug: guide.slug }}
      className="group bg-card shadow-soft hover:shadow-elevated flex flex-col gap-3 rounded-xl border p-5 transition-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display group-hover:text-primary text-base font-extrabold transition-colors">
            {guide.title}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed line-clamp-2">
            {guide.tagline}
          </p>
        </div>
        <ArrowRight className="text-muted-foreground group-hover:text-primary mt-1 size-4 shrink-0 transition-colors" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-xs">
          {guide.salaryRange}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {guide.difficulty}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {guide.timeToJob}
        </Badge>
      </div>
    </Link>
  );
}
