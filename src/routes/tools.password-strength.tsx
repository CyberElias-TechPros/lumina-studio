import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { PasswordStrength } from "@/components/tools/password-strength";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/password-strength")({
  head: () =>
    getPageHead({
      title: "Password Strength Checker — Entropy & Crack Time",
      description:
        "Free password strength checker: entropy in bits, offline crack-time estimate, common-leak detection, hardened generator. Checked locally — your password never leaves the page.",
      path: "/tools/password-strength",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA Password Strength Checker",
        applicationCategory: "SecurityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      },
    }),
  component: PasswordStrengthPage,
});

function PasswordStrengthPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free tool · Security"
        title={
          <>
            Strong passwords,{" "}
            <span className="font-serif text-primary font-normal italic">no guessing.</span>
          </>
        }
        description="Test a password the way a breach analyst would — entropy, crack time, leaked-list check — then generate a hardened one. Everything happens on this page."
        meta={["Bits of entropy", "Crack-time estimate", "Leaked-list check"]}
      >
        <Link
          to="/tools"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> All tools
        </Link>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="Password strength checker">
        <PasswordStrength />

        <div className="mx-auto mt-12 max-w-3xl">
          <Eyebrow>
            <ShieldCheck className="size-3.5" aria-hidden="true" /> The rules that actually matter
          </Eyebrow>
          <ol className="text-muted-foreground mt-4 list-none space-y-2 text-sm leading-relaxed">
            <li>
              <strong className="text-foreground">1. Length beats cleverness.</strong> 16 lazy
              characters beat 8 heroic ones — every extra character multiplies the search space.
            </li>
            <li>
              <strong className="text-foreground">2. One password, one account.</strong> Credential
              stuffing is the #1 way Nigerian SMEs get breached — one leak replays everywhere.
            </li>
            <li>
              <strong className="text-foreground">3. Use a manager.</strong> Your brain is for
              passphrases you need daily; the vault holds the rest.
            </li>
            <li>
              <strong className="text-foreground">4. Turn on 2FA</strong> — especially for email,
              banking, Paystack/Stripe dashboards and the school portal.
            </li>
          </ol>
          <div className="border-foreground/10 bg-card mt-8 grid gap-6 rounded-2xl border p-6 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-semibold">
                Why four random words beat one &ldquo;clever&rdquo; substitution
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Replacing <code>a</code> with <code>@</code> and <code>i</code> with <code>1</code>{" "}
                in a single dictionary word (like <code>P@ssw0rd1!</code>) is the very first pattern
                automated cracking tools test. Four unrelated everyday words joined together — such
                as <code>mango-kettle-bridge-49</code> — are far easier to type on a phone and
                orders of magnitude harder to guess.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">
                Protecting your primary email first
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Your Gmail or Outlook inbox is the master key to bank alerts, NIN portals, cloud
                backups and social accounts. Give your primary email a unique 16+ character
                passphrase and authenticator-app 2FA before securing anything else.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Want the full security picture?"
        description="CEA's cybersecurity modules teach phishing defence, safe wallets, account recovery and device hygiene for work and business — in plain English."
        primary={{ label: "See CEA courses", to: "/classes" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
