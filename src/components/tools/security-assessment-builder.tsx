"use client";

import { useMemo, useState } from "react";
import { Copy, Check, ShieldCheck, ShieldAlert, ShieldQuestion, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Security assessment builder.
 *
 * Answers the second- and fourth-largest query clusters in CEA's Search Console
 * export — "vulnerability assessment" (172 impressions, position 2.04) and
 * "what is zero trust security" (189 impressions, position 4.13) — which
 * currently land on glossary entries that 301 to /classes. The ranking is real;
 * the destination is not.
 *
 * The hard part of a vulnerability assessment is not the scanning tool, it is
 * deciding what you are looking at and what to say about it. This tool gives a
 * reader a defensible shape for that, with the two scales that actually matter
 * in a first assessment: how bad is it, and how easy is it for someone to do.
 *
 * **What this deliberately is not.** It is not a scanner, and it does not
 * pretend to find anything. A checklist that tells you what to look at and how
 * to score what you find is honest; a "scanner" that shells out to a word list
 * and reports fake findings would be theatre, and would put a reader's actual
 * security decisions on top of invented output.
 *
 * Severity uses CVSS v3.1 vocabulary (none 0.0 / low 0.1–3.9 / medium 4.0–6.9
 * / high 7.0–8.9 / critical 9.0–10.0) because that is the language a reader will
 * meet in any real ticketing system, and because the bands are stable enough to
 * be worth teaching.
 */

type Severity = "critical" | "high" | "medium" | "low" | "info";

type Finding = {
  id: string;
  label: string;
  /** What the reader is actually looking for — no tool names, no vendor jargon. */
  what: string;
  /** How it is exploited, in one line a non-specialist can follow. */
  why: string;
  severity: Severity;
  /** Which Zero Trust principle this violates, if any. */
  zeroTrust?: string;
  checked: boolean;
};

const SEVERITY_BANDS: Record<Severity, { range: string; score: number; colour: string }> = {
  critical: { range: "9.0 – 10.0", score: 10, colour: "bg-red-600" },
  high: { range: "7.0 – 8.9", score: 8, colour: "bg-orange-500" },
  medium: { range: "4.0 – 6.9", score: 6, colour: "bg-amber-500" },
  low: { range: "0.1 – 3.9", score: 3, colour: "bg-sky-500" },
  info: { range: "0.0", score: 0, colour: "bg-slate-400" },
};

const DEFAULT_FINDINGS: Omit<Finding, "checked">[] = [
  {
    id: "mfa",
    label: "Staff accounts can sign in without a second step",
    what: "Open the login page for email, banking and the admin dashboard. Is there a code, an authenticator app or a hardware key after the password?",
    why: "A password alone is one leaked database away from total access. Most real breaches start exactly here.",
    severity: "critical",
    zeroTrust: "Verify explicitly",
  },
  {
    id: "admin-sharing",
    label: "One admin account is shared across several people",
    what: "Ask each department how they log in to the shared systems. If the answer is a single username taped somewhere, it is shared.",
    why: "When everyone is 'admin', nobody can be held to an action, and removing one person means changing the password for all.",
    severity: "high",
    zeroTrust: "Use least-privilege access",
  },
  {
    id: "backups",
    label: "Backups exist but have never been restored",
    what: "Ask when a backup was last restored, not when it was last taken. If nobody knows, it has never been tested.",
    why: "An untested backup is a guess. Ransomware is survivable if a restore actually works and fatal if it does not.",
    severity: "critical",
  },
  {
    id: "public-admin",
    label: "Admin or database ports are reachable from the internet",
    what: "From outside the office network, try the admin URL and any database port. Anything that answers is exposed.",
    why: "Exposed management interfaces are found by automated scanning within hours of going live.",
    severity: "critical",
    zeroTrust: "Assume breach",
  },
  {
    id: "patching",
    label: "Security updates are applied on a schedule nobody owns",
    what: "Pick three machines at random and check their last update date. If it differs wildly, nobody owns patching.",
    why: "Most exploited vulnerabilities have had a fix available for months. The gap is process, not knowledge.",
    severity: "high",
  },
  {
    id: "offboarding",
    label: "Leavers keep access after their last day",
    what: "List everyone who left in the last year, then check whether their account is still active anywhere.",
    why: "Former staff accounts are a favourite entry point precisely because nobody watches them.",
    severity: "high",
    zeroTrust: "Use least-privilege access",
  },
  {
    id: "logging",
    label: "Nobody reads the logs",
    what: "Ask who looks at sign-in failures, and how often. 'We keep logs' is not the same as 'someone reads them'.",
    why: "Detection without review is storage. You cannot respond to what nobody noticed.",
    severity: "medium",
    zeroTrust: "Assume breach",
  },
  {
    id: "pii",
    label: "Customer data is stored without knowing where all of it lives",
    what: "Ask for a list of every system holding customer names, phone numbers or bank details. If it takes days, it is unknown.",
    why: "You cannot protect, delete or report on data you cannot locate — and Nigerian data-protection rules expect you to.",
    severity: "high",
  },
  {
    id: "supplier",
    label: "Third-party suppliers have more access than the job needs",
    what: "List every vendor with an account. For each, ask what they would still be able to reach if they stopped working for you tomorrow.",
    why: "A supplier breach becomes your breach when their account reaches your systems.",
    severity: "medium",
    zeroTrust: "Use least-privilege access",
  },
  {
    id: "training",
    label: "Nobody has been shown a phishing message",
    what: "Ask three staff members to point at the sender address on their last suspicious email.",
    why: "Phishing remains the most common way in, and it is cheap to reduce with one honest hour of practice.",
    severity: "low",
  },
];

export function SecurityAssessmentBuilder() {
  const [org, setOrg] = useState("");
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().slice(0, 10));
  // Everything starts unchecked: the reader ticks what they actually found by
  // looking. Pre-ticking would be the tool asserting findings on their behalf.
  const [findings, setFindings] = useState<Finding[]>(
    DEFAULT_FINDINGS.map((finding) => ({ ...finding, checked: false })),
  );
  const [copied, setCopied] = useState(false);

  const found = findings.filter((f) => f.checked);

  const score = useMemo(() => {
    if (found.length === 0) return 0;
    const weights = found.map((f) => SEVERITY_BANDS[f.severity].score);
    // The worst finding dominates, as it should: ten lows do not offset one
    // critical, and an average would let them try.
    const worst = Math.max(...weights);
    const supporting = weights.reduce((a, b) => a + b, 0) / weights.length;
    return Math.min(10, Math.round((worst * 0.7 + supporting * 0.3) * 10) / 10);
  }, [found]);

  const verdict: Severity =
    score >= 9
      ? "critical"
      : score >= 7
        ? "high"
        : score >= 4
          ? "medium"
          : score > 0
            ? "low"
            : "info";

  const report = useMemo(() => {
    const lines: string[] = [];
    lines.push(`Security self-assessment${org ? ` — ${org}` : ""}`);
    lines.push(`Assessed: ${assessmentDate}`);
    lines.push("");
    lines.push(
      "Method: checklist self-assessment. Severity banding follows CVSS v3.1 vocabulary. " +
        "This is not a penetration test and does not verify anything technically.",
    );
    lines.push("");
    if (found.length === 0) {
      lines.push(
        "No findings selected. Either the assessment is remarkably clean, or it has not been done.",
      );
    } else {
      lines.push(`Aggregate score: ${score.toFixed(1)} / 10 (${verdict})`);
      lines.push("");
      const order: Severity[] = ["critical", "high", "medium", "low", "info"];
      for (const sev of order) {
        const group = found.filter((f) => f.severity === sev);
        if (group.length === 0) continue;
        lines.push(`${sev.toUpperCase()} (${SEVERITY_BANDS[sev].range})`);
        for (const f of group) {
          lines.push(`  - ${f.label}`);
          lines.push(`    Impact: ${f.why}`);
          if (f.zeroTrust) lines.push(`    Zero Trust principle: ${f.zeroTrust}`);
        }
        lines.push("");
      }
    }
    lines.push("Next step: fix the top two findings before adding any new tooling.");
    return lines.join("\n");
  }, [org, assessmentDate, found, score, verdict]);

  const toggle = (id: string) =>
    setFindings((prev) => prev.map((f) => (f.id === id ? { ...f, checked: !f.checked } : f)));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-muted-foreground mb-1.5 block text-sm font-medium">
            Organisation (optional)
          </span>
          <input
            type="text"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder="e.g. Adeyemi & Sons Ltd"
            className="border-input bg-background focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-muted-foreground mb-1.5 block text-sm font-medium">
            Assessment date
          </span>
          <input
            type="date"
            value={assessmentDate}
            onChange={(e) => setAssessmentDate(e.target.value)}
            className="border-input bg-background focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
          />
        </label>
      </div>

      <div className="rounded-xl border p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Aggregate score
            </p>
            <p className="font-display mt-1 text-4xl font-semibold tabular-nums">
              {score.toFixed(1)}
              <span className="text-muted-foreground text-lg font-normal"> / 10</span>
            </p>
          </div>
          <div className="text-right">
            <span
              className={cn(
                "inline-block rounded-full px-3 py-1 text-xs font-semibold text-white uppercase",
                SEVERITY_BANDS[verdict].colour,
              )}
            >
              {verdict}
            </span>
            <p className="text-muted-foreground mt-2 text-xs">
              {found.length} of {findings.length} findings present
            </p>
          </div>
        </div>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          The score is weighted towards the worst finding, not the average. One critical issue is
          still critical when ten small ones are tidied up — averaging would hide that.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="font-display text-lg font-semibold">What to check</h2>
        {findings.map((f) => (
          <label
            key={f.id}
            className={cn(
              "flex cursor-pointer gap-3 rounded-lg border p-4 transition-colors",
              f.checked ? "border-orange-300 bg-orange-50/50" : "hover:bg-muted/40",
            )}
          >
            <input
              type="checkbox"
              checked={f.checked}
              onChange={() => toggle(f.id)}
              className="mt-1 size-4 shrink-0"
            />
            <span className="min-w-0">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">{f.label}</span>
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[10px] font-bold text-white uppercase",
                    SEVERITY_BANDS[f.severity].colour,
                  )}
                >
                  {f.severity}
                </span>
              </span>
              <span className="text-muted-foreground mt-1 block text-sm leading-relaxed">
                <strong className="text-foreground font-medium">Look for:</strong> {f.what}
              </span>
              <span className="text-muted-foreground mt-1 block text-sm leading-relaxed">
                <strong className="text-foreground font-medium">Why it matters:</strong> {f.why}
              </span>
              {f.zeroTrust && (
                <span className="text-muted-foreground mt-1.5 flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
                  Zero Trust: {f.zeroTrust}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>

      <div className="rounded-xl border p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold">Your report</h3>
          <button
            type="button"
            onClick={copy}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy report"}
          </button>
        </div>
        <pre className="bg-muted mt-4 max-h-80 overflow-auto rounded-lg p-4 text-xs leading-relaxed whitespace-pre-wrap">
          {report}
        </pre>
      </div>

      <div className="text-muted-foreground flex gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-sm leading-relaxed">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden="true" />
        <p>
          This is a self-assessment checklist, not a vulnerability scan. It cannot see your network,
          your changes are not saved anywhere, and nothing here proves a system is secure. Use it to
          decide what to look at first, then verify each finding by hand or with a qualified
          professional.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Secondary export: the Zero Trust principle matcher
 * ------------------------------------------------------------------ */

const ZERO_TRUST_PRINCIPLES = [
  {
    principle: "Verify explicitly",
    plain:
      "Every request is checked on its own merits — who, what device, where, is the device healthy — not trusted because it came from inside the office.",
    looksLike:
      "A second factor on every privileged sign-in, and re-checking when the network changes.",
    breaksDown:
      "Shared passwords, standing admin rights, and 'it is on our network so it is fine'.",
  },
  {
    principle: "Use least-privilege access",
    plain: "People get the access their job needs for as long as they need it, and no more.",
    looksLike:
      "Just-in-time admin, separate finance accounts, access removed the day someone leaves.",
    breaksDown:
      "One shared admin account, permanent permissions, and vendors who can reach everything.",
  },
  {
    principle: "Assume breach",
    plain:
      "Design as though someone is already inside: limit how far an attacker can move, and make sure you would notice.",
    looksLike:
      "Network segmentation, tested backups, and somebody actually reading the sign-in logs.",
    breaksDown: "Flat networks, unmonitored logs, and backups nobody has restored.",
  },
] as const;

export function ZeroTrustPrincipleMatcher() {
  return (
    <div className="space-y-4">
      {ZERO_TRUST_PRINCIPLES.map((p) => (
        <div key={p.principle} className="rounded-xl border p-5">
          <div className="flex items-center gap-2">
            <Building2 className="text-primary size-4" aria-hidden="true" />
            <h3 className="font-display text-base font-semibold">{p.principle}</h3>
          </div>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.plain}</p>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-foreground flex shrink-0 items-center gap-1.5 font-medium">
                <ShieldCheck className="size-3.5 text-emerald-600" aria-hidden="true" />
                Looks like
              </dt>
              <dd className="text-muted-foreground">{p.looksLike}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-foreground flex shrink-0 items-center gap-1.5 font-medium">
                <ShieldQuestion className="size-3.5 text-amber-600" aria-hidden="true" />
                Breaks when
              </dt>
              <dd className="text-muted-foreground">{p.breaksDown}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}
