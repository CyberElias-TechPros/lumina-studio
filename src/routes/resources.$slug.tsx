import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Lightbulb,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { getPageHead } from "@/lib/seo";
import { getResource, getResources } from "@/data/resources";

export const Route = createFileRoute("/resources/$slug")({
  head: ({ params }) => {
    const resource = getResource(params.slug);
    if (!resource) {
      return getPageHead({
        title: "Resource not found",
        description: "The requested resource does not exist.",
        path: `/resources/${params.slug}`,
      });
    }
    return getPageHead({
      title: `${resource.title} — free template/guide`,
      description: `${resource.tagline} Download or use immediately — no sign-up required. ${resource.whatYouGet.length} items included.`,
      path: `/resources/${resource.slug}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: resource.title,
        description: resource.tagline,
        totalTime: resource.timeToComplete,
        step: resource.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.description,
        })),
      },
    });
  },
  component: ResourcePage,
});

function ResourcePage() {
  const { slug } = Route.useParams();
  const resource = getResource(slug);

  if (!resource) {
    return (
      <PageShell>
        <PageHero
          eyebrow="Resources"
          title={
            <>
              Resource <span className="text-gradient">not found</span>
            </>
          }
          description="The resource you're looking for does not exist yet."
        />
        <section className="container-page pb-20">
          <Button variant="ghost" size="sm" className="-mx-2" asChild>
            <Link to="/resources">
              <ArrowLeft className="size-4" /> All resources
            </Link>
          </Button>
        </section>
      </PageShell>
    );
  }

  const allResources = getResources()
    .filter((r) => r.slug !== slug)
    .slice(0, 4);

  return (
    <PageShell>
      <PageHero
        eyebrow={`${resource.category} · ${resource.difficulty}`}
        title={<>{resource.title}</>}
        description={resource.tagline}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold">
          <Badge variant="secondary" className="gap-1.5">
            <Clock className="size-3.5" /> {resource.timeToComplete}
          </Badge>
          <Badge variant="secondary" className="gap-1.5">
            <Target className="size-3.5" /> {resource.steps.length} steps
          </Badge>
          <Badge variant="outline" className="border-white/30 text-white">
            {resource.whatYouGet.length} items included
          </Badge>
        </div>
      </PageHero>

      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl space-y-12">
          <Reveal>
            <Button variant="ghost" size="sm" className="-mx-2" asChild>
              <Link to="/resources">
                <ArrowLeft className="size-4" /> All resources
              </Link>
            </Button>
          </Reveal>

          <Reveal>
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-extrabold">Overview</h2>
              {resource.overview.map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <Card className="bg-primary/5 border-primary/20 shadow-soft">
              <CardContent className="p-5 space-y-3">
                <h3 className="font-display font-extrabold text-base">What you get</h3>
                <ul className="space-y-2">
                  {resource.whatYouGet.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="text-primary mt-0.5 size-4 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal>
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-extrabold">Step-by-step guide</h2>
              <div className="space-y-4">
                {resource.steps.map((step, i) => (
                  <Card key={i} className="shadow-soft">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="bg-primary text-primary-foreground grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display font-extrabold text-base">{step.title}</h3>
                          <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                            {step.description}
                          </p>
                          {step.tips && step.tips.length > 0 && (
                            <div className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <Lightbulb className="text-amber-600 dark:text-amber-400 size-3.5" />
                                <span className="text-xs font-bold uppercase tracking-wide">
                                  Tips
                                </span>
                              </div>
                              <ul className="space-y-1">
                                {step.tips.map((tip) => (
                                  <li key={tip} className="text-xs leading-relaxed">
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Reveal>

          {allResources.length > 0 && (
            <Reveal>
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-extrabold">More resources</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {allResources.map((r) => (
                    <Link
                      key={r.slug}
                      to="/resources/$slug"
                      params={{ slug: r.slug }}
                      className="group bg-card shadow-soft rounded-xl border p-4 hover:border-primary/40 transition-colors"
                    >
                      <Badge variant="outline" className="text-[10px] mb-1.5">
                        {r.category}
                      </Badge>
                      <h3 className="group-hover:text-primary text-sm font-extrabold transition-colors">
                        {r.title}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-xs line-clamp-2">{r.tagline}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CTASection
        title="Ready to apply what you've learned?"
        description="CEA programmes combine resources like these with hands-on projects, mentor support and placement assistance. Apply today."
        primary={{ label: "Apply now", to: "/apply" }}
        secondary={{ label: "Browse programmes", to: "/programs" }}
      />
    </PageShell>
  );
}
