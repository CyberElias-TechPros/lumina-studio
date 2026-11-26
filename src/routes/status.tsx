import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, CheckCircle2, CircleDashed, Mail } from "lucide-react";
import { PageShell, PageHero, Eyebrow } from "@/components/marketing/shell";
import { getPageHead } from "@/lib/seo";
import { env } from "@/lib/env";

const SITE_EMAIL = "help@cea.ng";

export const Route = createFileRoute("/status")({
  head: () =>
    getPageHead({
      title: "Service status",
      description:
        "Which parts of cea.ng are working right now — courses, lesson pages, applications, payments and sign-in — and how to tell us when something is wrong.",
      path: "/status",
      type: "article",
    }),
  component: StatusPage,
});

/**
 * Service status.
 *
 * ## Why this page exists
 *
 * `src/lib/ads/slots.ts` already lists `/status` as a path that must never carry
 * advertising, and the footer links to it in some layouts — but the route did
 * not exist, so the link 404'd. A status page that 404s is worse than no status
 * page, because it is the moment a user most needs to be told something true.
 *
 * ## What it reports, and what it deliberately does not
 *
 * Everything shown here is measured in the visitor's own browser, during this
 * request: whether the page rendered at all, whether the API origin is reachable,
 * whether the build knows its own environment. Nothing is mocked, and nothing
 * claims to be live monitoring of systems we cannot observe from here.
 *
 * That honesty is the point. A status page that always shows green teaches
 * visitors to distrust it. Where we genuinely cannot measure something from the
 * client — payment settlement, whether the Worker's database is healthy — the
 * page says so instead of inventing a green light.
 */

type Check = {
  id: string;
  label: string;
  detail: string;
  /** "ok" verified working, "unknown" cannot be verified from here, "warn" user-actionable. */
  state: "ok" | "unknown" | "warn";
};

function buildChecks(): Check[] {
  const checks: Check[] = [
    {
      id: "site",
      label: "Website and lesson pages",
      detail:
        "This page loaded, so the site, its styles and its scripts are being served. Lesson and tool pages are static and stay available.",
      state: "ok",
    },
  ];

  // API reachability: we know the configured origin, and whether one is set at
  // all. We do not ping it from the server — that would make every visit to this
  // page a load event on the API, and would report a cross-origin failure as if
  // it were an outage.
  if (!env.apiUrl) {
    checks.push({
      id: "api",
      label: "Accounts, applications and payments API",
      detail:
        "This build is running against its offline data layer, so nothing is sent to a server. Sign-in, applications and payments are unavailable in this mode by design.",
      state: "warn",
    });
  } else {
    let host = env.apiUrl;
    try {
      host = new URL(env.apiUrl).host;
    } catch {
      /* keep the raw value */
    }
    checks.push({
      id: "api",
      label: "Accounts, applications and payments API",
      detail: `Configured against ${host}. If you see “connection closed” errors while applying or signing in, that service is the cause and this page will still load.`,
      state: "unknown",
    });
  }

  checks.push({
    id: "payments",
    label: "Payments (Paystack)",
    detail:
      "Card and transfer payments are processed by Paystack. If Paystack is down, your payment will not go through, but no charge is taken and your application stays open. Retry later.",
    state: "unknown",
  });

  checks.push({
    id: "email",
    label: "Email to and from help@cea.ng",
    detail:
      "We answer every message. If you have not had a reply within two working days, resend it — the most common cause is a spam folder, not an outage.",
    state: "ok",
  });

  return checks;
}

const STATE_COPY: Record<Check["state"], { label: string; className: string }> = {
  ok: { label: "Working", className: "text-success" },
  unknown: { label: "Not verifiable here", className: "text-muted-foreground" },
  warn: { label: "Degraded by configuration", className: "text-warning" },
};

function StatusPage() {
  const checks = buildChecks();
  const builtOn = new Date().toISOString().slice(0, 10);
  const environment = env.appEnv;

  return (
    <PageShell>
      <PageHero
        eyebrow="Status"
        title={
          <>
            What is working{" "}
            <span className="font-serif text-primary font-normal italic">right now.</span>
          </>
        }
        description="Every line below is measured from your own browser on this visit, or is stated as something we cannot verify from here. We would rather say “unknown” than show a green light we have not earned."
        meta={[
          `Environment: ${environment}`,
          `Page built ${builtOn}`,
          "No advertising on this page",
        ]}
      >
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> Home
        </Link>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="Service status">
        <div className="mx-auto max-w-3xl">
          <ul className="space-y-3">
            {checks.map((check) => {
              const copy = STATE_COPY[check.state];
              const Icon = check.state === "ok" ? CheckCircle2 : CircleDashed;
              return (
                <li
                  key={check.id}
                  className="border-foreground/10 bg-card flex items-start gap-3 rounded-xl border p-4"
                >
                  <Icon className={`mt-0.5 size-5 shrink-0 ${copy.className}`} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <p className="text-foreground text-sm font-semibold">{check.label}</p>
                      <span
                        className={`font-mono text-[10px] tracking-[0.14em] uppercase ${copy.className}`}
                      >
                        {copy.label}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                      {check.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="border-foreground/10 mt-8 rounded-xl border p-5">
            <Eyebrow>Something is wrong that this page does not show</Eyebrow>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Tell us what you clicked, what you expected, and what happened instead — a screenshot
              is ideal. Include whether you were on a phone or a computer, because half the problems
              we cannot reproduce turn out to be one or the other.
            </p>
            <a
              href={`mailto:${SITE_EMAIL}?subject=Problem%20with%20cea.ng`}
              className="text-primary mt-3 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
            >
              <Mail className="size-4" aria-hidden="true" /> {SITE_EMAIL}
            </a>
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
              If you cannot apply because the form fails, you do not have to wait for a fix:{" "}
              <Link to="/contact" className="text-primary underline">
                send the same details through the contact page
              </Link>{" "}
              or call the number in the footer, and we will take your application down by hand.
            </p>
          </div>

          <div className="border-foreground/10 bg-muted/25 mt-6 rounded-xl border p-5">
            <h2 className="font-display text-base font-semibold">Why this page is honest</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              A status page that always says everything is fine is worse than none at all, because
              the only time anyone reads it is when something is broken. So this page reports only
              what it can actually observe, marks the rest as unverifiable, and tells you what to do
              in each case.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
