import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Boxes, ShieldCheck } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { OpenLabsBrowser } from "@/components/tools/open-labs-browser";
import { CEA_LAB_VERIFIED_DATE } from "@/data/cea-lab-registry";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/open-labs")({
  head: () =>
    getPageHead({
      title: "CEA Open-Source Lab Registry & Sandboxed Embeds",
      description:
        "GitHub-verified feasibility assessment of open-source coding editors, SQL engines, diagrammers and simulators for Cyber Elias Academy — with safe opt-in LiveCodes and Mermaid sandboxes.",
      path: "/tools/open-labs",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "CEA Open-Source Lab Registry",
      },
    }),
  component: OpenLabsPage,
});

function OpenLabsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={`Open-source engineering · Verified ${CEA_LAB_VERIFIED_DATE}`}
        title={
          <>
            What we build, what we embed,{" "}
            <span className="font-serif text-primary font-normal italic">what we leave out.</span>
          </>
        }
        description="A licence-verified map of open-source coding, SQL, design and diagram engines evaluated against CEA's Next.js 15, React 19 and Cloudflare Workers stack — plus opt-in interactive sandboxes for Python, TypeScript and Mermaid."
        meta={["GitHub API verified", "Opt-in embeds", "Zero server exec risk"]}
      >
        <Link
          to="/tools"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> All tools
        </Link>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="Open-source lab registry">
        <OpenLabsBrowser />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="border-foreground/10 bg-card rounded-xl border p-6">
            <Eyebrow>
              <Boxes className="size-3.5" aria-hidden="true" /> Four architectural rules
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              Why CEA builds core labs natively and embeds selectively
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">1. Browser isolation first:</strong> CEA&apos;s
                backend runs on Cloudflare Workers and D1 SQLite, not a Docker cluster. Arbitrary
                student HTML/CSS/JS runs inside a restricted sandbox iframe, and SQL/Excel run
                deterministically in TypeScript without touching production servers.
              </p>
              <p>
                <strong className="text-foreground">2. Opt-in embeds protect speed:</strong>{" "}
                third-party sandboxes such as LiveCodes (MIT) and Mermaid Live (MIT) load only when
                a student clicks <em>Launch Opt-In Sandbox</em>, keeping initial page load fast on
                3G/4G Nigerian mobile connections.
              </p>
            </div>
          </div>

          <div className="border-foreground/10 bg-card rounded-xl border p-6">
            <Eyebrow>
              <ShieldCheck className="size-3.5" aria-hidden="true" /> Licence &amp; repo hygiene
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              What GitHub API verification caught
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                Not every popular repository is safe or even active. Checking each candidate against
                GitHub showed that <code>tldraw</code> uses a commercial watermarked licence,{" "}
                <code>codemirror/dev</code> is archived in favour of modular MIT packages such as{" "}
                <code>codemirror/view</code>, and some multi-service tools require dedicated Java or
                Docker hosts.
              </p>
              <p>
                Pair these open sandboxes with our structured{" "}
                <Link to="/open-curriculum" className="text-primary font-semibold hover:underline">
                  57-course Open Curriculum
                </Link>{" "}
                or start directly in{" "}
                <Link
                  to="/tools/code-studio"
                  className="text-primary font-semibold hover:underline"
                >
                  CEA Code Studio
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Free labs open the door. Structured cohorts finish the job."
        description="Join CEA classes in Port Harcourt or online with guided assignments, code reviews and real client-grade projects."
        primary={{ label: "Explore CEA courses", to: "/classes" }}
        secondary={{ label: "Browse Open Curriculum", to: "/open-curriculum" }}
      />
    </PageShell>
  );
}
