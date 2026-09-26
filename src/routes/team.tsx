import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { Mail, MapPin } from "lucide-react";
import { NOTES_AUTHOR } from "@/data/blog";
import { TEAM } from "@/data/team";

export const Route = createFileRoute("/team")({
  head: () =>
    getPageHead({
      title: "Team",
      description:
        "Cyber Elias Academy was founded by Ellis Dennis Graham in Port Harcourt. Meet the founder and trainers: Ellis Dennis Graham, Peter Jonathan-Hart and Rapheal Allison.",
      path: "/team",
      image: `https://cea.ng${NOTES_AUTHOR.photo}`,
    }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Team"
        title="Who runs the academy"
        description="A small training centre in Port Harcourt. These are the people who actually teach here — practitioners who do the work they train you for."
      />

      <section className="container-page py-12 md:py-16">
        <div className="mx-auto grid max-w-3xl gap-6">
          {TEAM.map((m) => (
            <article
              key={m.slug}
              id={m.slug}
              className="border-border scroll-mt-24 rounded-lg border p-6 sm:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <img
                  src={m.photo}
                  alt={`${m.name}, ${m.role} at Cyber Elias Academy`}
                  loading={m.slug === TEAM[0].slug ? "eager" : "lazy"}
                  className="size-28 shrink-0 rounded-lg object-cover sm:size-36"
                  style={{ objectPosition: m.photoPosition ?? "center" }}
                />
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-semibold">{m.name}</h2>
                  <p className="text-primary mt-1 text-sm font-medium">{m.role}</p>
                  <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{m.summary}</p>

                  <p className="mt-5 text-xs font-medium tracking-wide uppercase">Teaches</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {m.teaches.map((t) => (
                      <li key={t} className="bg-muted rounded-full px-3 py-1 text-xs">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-xs font-medium tracking-wide uppercase">Experience</p>
                  <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                    {m.experience.map((e) => (
                      <li key={e.title + e.org}>
                        <span className="text-foreground">{e.title}</span> · {e.org}{" "}
                        <span className="text-xs">({e.period})</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-xs font-medium tracking-wide uppercase">Education</p>
                  <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                    {m.education.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>

                  <p className="text-muted-foreground mt-5 text-xs">{m.skills.join(" · ")}</p>

                  {m.links && (
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      {m.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-muted-foreground mx-auto mt-6 flex max-w-3xl flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-2">
            <MapPin className="size-4" /> 26 Ebony Road, Port Harcourt
          </span>
          <a href="mailto:hello@cea.ng" className="hover:text-foreground flex items-center gap-2">
            <Mail className="size-4" /> hello@cea.ng
          </a>
        </p>

        <dl className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {[
            { label: "Company", value: "Cyber Elias Academy Ltd · RC 8413776" },
            { label: "Based in", value: "26 Ebony Road, Port Harcourt" },
            {
              label: "What we teach",
              value: "Short practical computer and digital-skills courses",
            },
            { label: "Contact", value: "hello@cea.ng · +234 905 862 8386" },
          ].map((fact) => (
            <div key={fact.label} className="border-border rounded-lg border p-4">
              <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1 text-sm">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <p className="text-muted-foreground mx-auto mt-10 max-w-3xl text-sm">
          Questions:{" "}
          <Link to="/contact" className="text-primary underline">
            contact us
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
