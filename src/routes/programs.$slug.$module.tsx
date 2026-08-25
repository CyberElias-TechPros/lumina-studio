import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, Hammer, ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { getPageHead } from "@/lib/seo";
import { formatNaira, programs } from "@/data/site";
import { getModuleKey, moduleDetails, slugifyModuleTitle } from "@/data/module-details";

export const Route = createFileRoute("/programs/$slug/$module")({
  head: ({ params }) => {
    const program = programs.find((p) => p.slug === params.slug);
    const idx = program?.modules.findIndex((m) => slugifyModuleTitle(m.title) === params.module) ?? -1;
    const key = program && idx >= 0 ? getModuleKey(program.slug, slugifyModuleTitle(program.modules[idx].title)) : "";
    const detail = moduleDetails[key];
    if (!program || idx < 0 || !detail) {
      return getPageHead({
        title: "Module not found",
        description: "The requested programme module does not exist.",
        path: `/programs/${params.slug}/${params.module}`,
      });
    }
    const title = program.modules[idx].title;
    return getPageHead({
      title: `${title} — ${program.title} at CEA`,
      description: `${title} module of the ${program.title} programme: ${detail.topics.slice(0, 4).join(", ")}, and more. ${formatNaira(program.price)} · ${program.duration}.`,
      path: `/programs/${params.slug}/${params.module}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Course",
        name: title,
        description: detail.overview[0],
        isPartOf: { "@type": "Course", name: program.title },
        provider: { "@type": "Organization", name: "Cyber Elias Academy" },
      },
    });
  },
  component: ModuleDetailPage,
});

function ModuleDetailPage() {
  const { slug, module: moduleSlug } = Route.useParams();
  const program = programs.find((p) => p.slug === slug);
  if (!program) return null;

  const idx = program.modules.findIndex((m) => slugifyModuleTitle(m.title) === moduleSlug);
  if (idx < 0) return null;

  const meta = program.modules[idx];
  const detail = moduleDetails[getModuleKey(program.slug, slugifyModuleTitle(meta.title))];
  if (!detail) return null;

  const prev = idx > 0 ? program.modules[idx - 1] : null;
  const next = idx < program.modules.length - 1 ? program.modules[idx + 1] : null;
  const prevSlug = prev ? slugifyModuleTitle(prev.title) : null;
  const nextSlug = next ? slugifyModuleTitle(next.title) : null;

  return (
    <PageShell>
      <PageHero
        eyebrow={`${program.title} · Module ${idx + 1} of ${program.modules.length}`}
        title={<>{meta.title}</>}
        description={detail.overview[0].slice(0, 220)}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold">
          <Badge variant="secondary" className="gap-1.5">
            <BookOpen className="size-3.5" /> {meta.lessons} lessons
          </Badge>
          <Badge variant="secondary" className="gap-1.5">
            <Clock className="size-3.5" /> {meta.hours} hours
          </Badge>
          <Badge variant="outline" className="border-white/30 text-white">
            {program.duration} · {formatNaira(program.price)}
          </Badge>
        </div>
      </PageHero>

      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl space-y-12">
          <Reveal>
            <Button variant="ghost" size="sm" className="-mx-2" asChild>
              <Link to="/programs/$slug" params={{ slug: program.slug }}>
                <ArrowLeft className="size-4" /> Back to programme
              </Link>
            </Button>
          </Reveal>

          <Reveal>
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-extrabold">Overview</h2>
              {detail.overview.map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <ListChecks className="text-primary size-5" />
                <h2 className="font-display text-2xl font-extrabold">What you'll learn</h2>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {detail.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="text-primary mt-0.5 size-4 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Hammer className="text-learning size-5" />
                <h2 className="font-display text-2xl font-extrabold">Hands-on projects</h2>
              </div>
              <div className="space-y-4">
                {detail.projects.map((project) => (
                  <Card key={project.name} className="shadow-soft">
                    <CardContent className="p-5">
                      <h3 className="font-display mb-1.5 font-extrabold">{project.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <Card className="bg-muted/30 border-muted/50 shadow-none">
              <CardContent className="p-5 space-y-3">
                <h2 className="font-display font-extrabold">How you'll be assessed</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{detail.assessment}</p>
              </CardContent>
            </Card>
          </Reveal>

          {(prevSlug || nextSlug) && (
            <Reveal>
              <nav aria-label="Module navigation" className="grid gap-3 sm:grid-cols-2">
                {prev && prevSlug && (
                  <Link
                    to="/programs/$slug/$module"
                    params={{ slug: program.slug, module: prevSlug }}
                    className="group bg-card shadow-soft rounded-xl border p-4 hover:border-primary/40 transition-colors"
                  >
                    <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
                      <ArrowLeft className="size-3.5" /> Previous module
                    </span>
                    <p className="group-hover:text-primary mt-1.5 text-sm font-extrabold transition-colors">{prev.title}</p>
                  </Link>
                )}
                {next && nextSlug && (
                  <Link
                    to="/programs/$slug/$module"
                    params={{ slug: program.slug, module: nextSlug }}
                    className="group bg-card shadow-soft rounded-xl border p-4 text-right hover:border-primary/40 transition-colors sm:col-start-2"
                  >
                    <span className="text-muted-foreground flex items-center justify-end gap-1.5 text-xs font-bold uppercase tracking-wide">
                      Next module <ArrowRight className="size-3.5" />
                    </span>
                    <p className="group-hover:text-primary mt-1.5 text-sm font-extrabold transition-colors">{next.title}</p>
                  </Link>
                )}
              </nav>
            </Reveal>
          )}
        </div>
      </section>

      <CTASection
        title="Start with this module"
        description={`This module is part of ${program.title}, a ${program.duration} programme taught ${program.mode.toLowerCase()}. Apply today or talk to an advisor about fit.`}
        primary={{ label: "Apply now", to: "/apply" }}
        secondary={{ label: "See full programme", to: `/programs/${program.slug}` }}
      />
    </PageShell>
  );
}
