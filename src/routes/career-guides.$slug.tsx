import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { getPageHead } from "@/lib/seo";
import { getCareerGuide, getCareerGuides } from "@/data/career-guides";

export const Route = createFileRoute("/career-guides/$slug")({
  head: ({ params }) => {
    const guide = getCareerGuide(params.slug);
    if (!guide) {
      return getPageHead({
        title: "Career guide not found",
        description: "The requested career guide does not exist.",
        path: `/career-guides/${params.slug}`,
      });
    }
    return getPageHead({
      title: `${guide.title} career guide — roadmap, salary and 90-day plan`,
      description: `Honest career roadmap for becoming a ${guide.title} in Nigeria. Salary range: ${guide.salaryRange}. ${guide.timeToJob} to first role. Practical skills, 90-day plan and common pitfalls.`,
      path: `/career-guides/${guide.slug}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${guide.title} Career Guide — Nigerian Tech`,
        description: guide.tagline,
        author: { "@type": "Organization", name: "Cyber Elias Academy" },
        publisher: { "@type": "Organization", name: "Cyber Elias Academy" },
      },
    });
  },
  component: CareerGuidePage,
});

function CareerGuidePage() {
  const { slug } = Route.useParams();
  const guide = getCareerGuide(slug);

  if (!guide) {
    return (
      <PageShell>
        <PageHero
          eyebrow="Career Guides"
          title={<>Guide <span className="text-gradient">not found</span></>}
          description="The career guide you're looking for does not exist yet."
        />
        <section className="container-page pb-20">
          <Button variant="ghost" size="sm" className="-mx-2 mb-6" asChild>
            <Link to="/career-guides"><ArrowLeft className="size-4" /> All career guides</Link>
          </Button>
        </section>
      </PageShell>
    );
  }

  const allGuides = getCareerGuides();
  const related = allGuides
    .filter((g) => g.slug !== guide.slug && g.difficulty === guide.difficulty)
    .slice(0, 3);

  return (
    <PageShell>
      <PageHero
        eyebrow={`${guide.difficulty} · ${guide.timeToJob} to first role`}
        title={<>{guide.title}</>}
        description={guide.tagline}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold">
          <Badge variant="secondary" className="gap-1.5">
            <TrendingUp className="size-3.5" /> {guide.salaryRange}
          </Badge>
          <Badge variant="secondary" className="gap-1.5">
            <Clock className="size-3.5" /> {guide.timeToJob}
          </Badge>
          <Badge variant="outline" className="border-white/30 text-white">
            {guide.difficulty}
          </Badge>
        </div>
      </PageHero>

      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl space-y-12">
          <Reveal>
            <Button variant="ghost" size="sm" className="-mx-2" asChild>
              <Link to="/career-guides"><ArrowLeft className="size-4" /> All career guides</Link>
            </Button>
          </Reveal>

          <Reveal>
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-extrabold">Overview</h2>
              {guide.overview.map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary size-5" />
                <h2 className="font-display text-2xl font-extrabold">Core skills</h2>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {guide.keySkills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="text-primary mt-0.5 size-4 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Target className="text-learning size-5" />
                <h2 className="font-display text-2xl font-extrabold">90-day action plan</h2>
              </div>
              <div className="space-y-4">
                {guide.ninetyDayPlan.map((phase) => (
                  <Card key={phase.phase} className="shadow-soft">
                    <CardContent className="p-5 space-y-3">
                      <h3 className="font-display font-extrabold text-base">{phase.phase}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{phase.focus}</p>
                      <div className="space-y-1.5">
                        <p className="text-xs font-bold uppercase tracking-wide">Deliverables</p>
                        <ul className="space-y-1">
                          {phase.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-sm">
                              <BadgeCheck className="text-learning mt-0.5 size-3.5 shrink-0" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <Card className="border-destructive/30 bg-destructive/5 shadow-none">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-destructive size-5" />
                  <h3 className="font-display font-extrabold">Common pitfalls</h3>
                </div>
                <ul className="space-y-2">
                  {guide.commonFailures.map((failure) => (
                    <li key={failure} className="flex items-start gap-2.5 text-sm">
                      <span className="text-destructive mt-0.5 shrink-0 font-bold">!</span>
                      <span className="text-muted-foreground">{failure}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          {guide.localResources.length > 0 && (
            <Reveal>
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-extrabold">Recommended resources</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {guide.localResources.map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-card shadow-soft flex items-center gap-3 rounded-xl border p-4 hover:border-primary/40 transition-colors"
                    >
                      <ExternalLink className="text-muted-foreground group-hover:text-primary size-4 shrink-0" />
                      <span className="group-hover:text-primary text-sm font-semibold transition-colors">{r.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {related.length > 0 && (
            <Reveal>
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-extrabold">Related roles</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {related.map((g) => (
                    <Link
                      key={g.slug}
                      to="/career-guides/$slug"
                      params={{ slug: g.slug }}
                      className="group bg-card shadow-soft rounded-xl border p-4 hover:border-primary/40 transition-colors"
                    >
                      <h3 className="group-hover:text-primary text-sm font-extrabold transition-colors">{g.title}</h3>
                      <p className="text-muted-foreground mt-1 text-xs line-clamp-2">{g.tagline}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CTASection
        title={`Start your ${guide.title.toLowerCase()} journey`}
        description={`CEA's programmes teach the skills listed in this guide — with real projects, mentor support and placement assistance. Apply today or talk to an advisor.`}
        primary={{ label: "Apply now", to: "/apply" }}
        secondary={{ label: "Talk to us", to: "/contact" }}
      />
    </PageShell>
  );
}
