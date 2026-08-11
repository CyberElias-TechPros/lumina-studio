import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/stories")({
  head: () =>
    getPageHead({
      title: "Alumni Stories",
      description:
        "Real stories from CEA alumni — how they found their tracks, survived the capstone and built careers that weren't on their radar.",
      path: "/stories",
    }),
  component: StoriesPage,
});

function StoriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Alumni stories"
        art="community"
        title={
          <>
            They started where you <span className="text-gradient">are now</span>
          </>
        }
        description="No fairy tales — just people who show up, do the work, and let the process carry them. The first stories land here as our first cohorts graduate."
      />

      <section className="container-page pb-20">
        <div className="border-dashed bg-card/50 flex flex-col items-center rounded-3xl border p-12 text-center md:p-16">
          <Quote className="text-muted-foreground size-9" />
          <h3 className="font-display mt-5 text-2xl font-extrabold">
            The first stories are still being written
          </h3>
          <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
            We would rather publish nothing than publish fiction. As our first cohorts complete
            their capstones and land their first roles, their real stories — with their permission —
            will be told here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-gradient-brand shadow-glow border-0">
              <Link to="/apply">
                Start your application <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/blog">
                Read our insights <ArrowUpRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 border-y">
        <div className="container-page py-16">
          <div className="mx-auto max-w-3xl text-center">
            <Quote className="text-primary/30 mx-auto size-8" />
            <blockquote className="font-display mt-4 text-xl leading-relaxed font-extrabold text-balance sm:text-2xl">
              “CEA-OS is being built to track more than grades — every artifact, every skill, every
              leap from applicant to hired.”
            </blockquote>
            <p className="text-muted-foreground mt-5 text-sm font-semibold">Founder & Director</p>
          </div>
        </div>
      </section>

      <CTASection
        title="Your story starts with an application"
        description="The next cohort is two months out. Be one of the stories we tell next year."
        primary={{ label: "Start your application", to: "/apply" }}
      />
    </PageShell>
  );
}
