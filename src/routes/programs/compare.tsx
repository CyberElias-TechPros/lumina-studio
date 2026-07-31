import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Minus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero, CTASection, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { programs, formatNaira, engineMap } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/programs/compare")({
  head: () => ({
    meta: [
      { title: "Compare Programs — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Compare CEA programs side by side: duration, cost, outcomes, delivery and career support. Pick the track that fits your goals.",
      },
    ],
  }),
  component: ComparePage,
});

const rows: { label: string; key: (p: (typeof programs)[number]) => string | boolean }[] = [
  { label: "Engine", key: (p) => engineMap[p.engine].name },
  { label: "Level", key: (p) => p.level },
  { label: "Duration", key: (p) => p.duration },
  { label: "Live classes", key: () => true },
  { label: "Project labs", key: () => true },
  { label: "Internship placement", key: (p) => p.category !== "Marketing" },
  { label: "Job guarantee", key: (p) => p.price >= 800000 },
  { label: "Mentor pairing", key: () => true },
  { label: "Certificates + OSKM", key: () => true },
  { label: "Alumni network", key: () => true },
];

function ComparePage() {
  const [selected, setSelected] = useState<string[]>([
    "full-stack-software-development",
    "cybersecurity-analyst",
    "product-ui-ux-design",
  ]);

  const shown = programs.filter((p) => selected.includes(p.slug));
  const notShown = programs.filter((p) => !selected.includes(p.slug));

  return (
    <PageShell>
      <PageHero
        eyebrow="Program comparison"
        title={
          <>
            Find the program that <span className="text-gradient">fits you</span>
          </>
        }
        description="Pick up to four tracks to compare side by side. Every program is built the same way: skills-first, project-based, mentor-led."
      />

      <section className="container-page pb-20">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground mr-1 text-sm font-semibold">Compare:</span>
          {programs.map((p) => {
            const on = selected.includes(p.slug);
            const disabled = selected.length >= 4 && !on;
            return (
              <button
                key={p.slug}
                disabled={disabled}
                onClick={() =>
                  setSelected((s) => (on ? s.filter((x) => x !== p.slug) : [...s, p.slug]))
                }
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all",
                  on
                    ? "border-primary bg-primary/10 text-primary"
                    : "bg-card text-muted-foreground hover:border-primary/40",
                  disabled && "cursor-not-allowed opacity-40",
                )}
              >
                {p.category}
              </button>
            );
          })}
        </div>

        <Reveal>
          <div className="overflow-x-auto rounded-2xl border bg-card">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b">
                  <th className="w-44 p-4 align-bottom">
                    <p className="text-muted-foreground text-[11px] font-bold tracking-[0.14em] uppercase">
                      {shown.length} of {programs.length} programs
                    </p>
                  </th>
                  {shown.map((p) => (
                    <th key={p.slug} className="p-4 align-bottom">
                      <div className="flex h-full flex-col justify-between">
                        <Badge variant="secondary" className="w-fit font-semibold">
                          {p.category}
                        </Badge>
                        <p className="font-display mt-2 text-sm leading-snug font-extrabold">
                          {p.title}
                        </p>
                        <div className="mt-3 flex items-baseline gap-1">
                          <span className="font-display text-lg font-extrabold">
                            {formatNaira(p.price)}
                          </span>
                          <span className="text-muted-foreground text-[10px]">{p.duration}</span>
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className="bg-gradient-brand shadow-glow mt-3 w-full border-0 text-xs"
                        >
                          <Link to="/apply" search={{ program: p.slug }}>
                            Apply now
                          </Link>
                        </Button>
                      </div>
                    </th>
                  ))}
                  {shown.length < 4 &&
                    notShown.slice(0, 4 - shown.length).map((p) => (
                      <th key={p.slug} className="bg-muted/30 p-4 align-bottom opacity-50">
                        <p className="font-display text-xs font-bold">{p.category}</p>
                        <Button asChild variant="ghost" size="sm" className="mt-4 text-xs">
                          <Link to="/programs/$slug" params={{ slug: p.slug }}>
                            View instead
                          </Link>
                        </Button>
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn("border-b last:border-0", i % 2 === 0 && "bg-muted/20")}
                  >
                    <td className="p-4 text-sm font-bold">{row.label}</td>
                    {shown.map((p) => {
                      const v = row.key(p);
                      return (
                        <td key={p.slug} className="p-4">
                          {typeof v === "boolean" ? (
                            v ? (
                              <span className="text-success inline-grid size-5 place-items-center rounded-full bg-success/10">
                                <Check className="size-3.5" />
                              </span>
                            ) : (
                              <span className="text-muted-foreground inline-grid size-5 place-items-center rounded-full bg-muted">
                                <Minus className="size-3.5" />
                              </span>
                            )
                          ) : (
                            <span className="text-sm font-medium">{v}</span>
                          )}
                        </td>
                      );
                    })}
                    {shown.length < 4 &&
                      notShown
                        .slice(0, 4 - shown.length)
                        .map((p) => <td key={p.slug} className="bg-muted/30 p-4" />)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <SectionHeading
              eyebrow="Still unsure?"
              title="Ask an advisor"
              description="A 15-minute call to match your goals, experience and schedule to the right program."
            />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-gradient-brand shadow-glow border-0">
                <Link to="/contact">
                  Book a free call <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/admissions">See the admissions process</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Ready when you are"
        description="Applications close two weeks before each cohort starts. Secure your seat today."
        primary={{ label: "Start your application", to: "/apply" }}
      />
    </PageShell>
  );
}
