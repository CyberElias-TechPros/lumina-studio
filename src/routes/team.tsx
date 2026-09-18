import { createFileRoute } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () =>
    getPageHead({
      title: "Team",
      description:
        "Cyber Elias Academy was founded by Ellis Dennis Graham in Port Harcourt. The centre is small; we will name people as they join.",
      path: "/team",
    }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Team"
        title="Who runs the academy"
        description="A small training centre. We list the people who actually work here — not a directory of roles we hope to fill."
      />

      <section className="container-page py-12 md:py-16">
        <div className="border-border mx-auto max-w-2xl rounded-lg border p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="bg-muted text-foreground font-display grid size-16 shrink-0 place-items-center rounded-lg text-lg font-semibold">
              EDG
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">Ellis Dennis Graham</h2>
              <p className="text-muted-foreground mt-1 text-sm">Founder</p>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Ellis founded Cyber Elias Academy in Port Harcourt. He runs the centre and the
                courses. We do not list a wider staff, advisory board, or employer network we do
                not have.
              </p>
              <div className="text-muted-foreground mt-5 flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="size-4" /> Port Harcourt, Nigeria
                </span>
                <a href="mailto:hello@cea.ng" className="hover:text-foreground flex items-center gap-2">
                  <Mail className="size-4" /> hello@cea.ng
                </a>
              </div>
            </div>
          </div>
        </div>

        <dl className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
          {[
            { label: "Company", value: "Cyber Elias Academy Ltd · RC 8413776" },
            { label: "Based in", value: "26 Ebony Road, Port Harcourt" },
            { label: "What we teach", value: "Short practical computer and digital-skills courses" },
            { label: "Contact", value: "hello@cea.ng · +234 905 862 8386" },
          ].map((fact) => (
            <div key={fact.label} className="border-border rounded-lg border p-4">
              <dt className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                {fact.label}
              </dt>
              <dd className="mt-1 text-sm">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </PageShell>
  );
}
