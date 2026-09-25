import {
  Banknote,
  CalendarDays,
  Gift,
  GraduationCap,
  MapPin,
  Package,
  Phone,
  ReceiptText,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FEE_NOTES, NEXT_COHORTS, WHAT_TO_BRING } from "@/data/academy";
import { cn } from "@/lib/utils";
import { depositFor, durationLabel, feeFor, formatFee, type ProgramMeta } from "./meta";

interface InfoPanelProps {
  meta: ProgramMeta | null;
  plan: string;
  timeSlot: string;
  mode: string;
  scheduleDays: string;
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Banknote;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border/70 border-t px-5 py-4 first:border-t-0">
      <p className="text-muted-foreground flex items-center gap-2 text-[11px] font-bold tracking-wide uppercase">
        <Icon className="size-3.5 text-primary" /> {title}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const SCHEDULE_LABELS: Record<string, string> = {
  standard: "Two sessions a week",
  mwf: "Mon · Wed · Fri",
  tss: "Tue · Thu · Sat",
  morning: "Morning (10:00–12:00)",
  afternoon: "Afternoon (14:00–16:00)",
  evening: "Evening (17:00–19:00)",
  any: "Flexible — where the timetable fits",
  onsite: "Onsite at 26 Ebony Road",
  online: "Online (live)",
  hybrid: "Hybrid (onsite + online)",
};

/**
 * The "what we tell the student" panel — always visible during the funnel:
 * fee & payment maths, start dates, schedule, what to bring, certificate,
 * policies and how to reach us.
 */
export function InfoPanel({ meta, plan, timeSlot, mode, scheduleDays }: InfoPanelProps) {
  const { due, discount } = meta ? feeFor(meta, plan) : { due: 0, discount: 0 };
  const deposit = meta ? depositFor(meta) : 0;
  const usesDeposit = plan === "50-50" || plan === "deposit-monthly";

  return (
    <aside className="border-card shadow-soft lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-2xl border">
        <div className="bg-primary/5 px-5 py-4">
          <p className="text-muted-foreground text-[11px] font-bold tracking-wide uppercase">
            Your enrollment at a glance
          </p>
          {meta ? (
            <>
              <p className="font-display mt-1 text-lg leading-tight font-extrabold">{meta.title}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge className="bg-primary/10 text-primary h-5 border-0 text-[10px] font-bold">
                  {meta.level}
                </Badge>
                <Badge className="bg-muted text-muted-foreground h-5 border-0 text-[10px] font-bold">
                  {meta.kind === "long" ? "Long-form training" : "Short course"}
                </Badge>
                <Badge className="bg-muted text-muted-foreground h-5 border-0 text-[10px] font-bold">
                  {meta.daysPerWeek} days/week
                </Badge>
              </div>
            </>
          ) : (
            <p className="font-display mt-1 text-lg font-extrabold">
              Choose a course to see the details
            </p>
          )}
        </div>

        {meta && (
          <Section icon={Banknote} title="Fee & payment">
            <div className="space-y-1.5 text-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Full fee</span>
                <span
                  className={cn(
                    "font-semibold",
                    discount > 0 && "text-muted-foreground line-through",
                  )}
                >
                  {formatFee(meta.fee)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-baseline justify-between">
                  <span className="text-success text-xs font-semibold">
                    Pay-in-full discount (10%)
                  </span>
                  <span className="text-success text-sm font-bold">−{formatFee(discount)}</span>
                </div>
              )}
              <div className="flex items-baseline justify-between border-border border-t pt-1.5">
                <span className="font-semibold">You pay</span>
                <span className="font-display text-base font-extrabold">{formatFee(due)}</span>
              </div>
              {usesDeposit && (
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {meta.kind === "short" ? "50%" : "30%"} deposit ({formatFee(deposit)}) holds your
                  seat now · balance{" "}
                  {meta.kind === "short" ? "at mid-course" : "in monthly instalments"}.
                </p>
              )}
              <ul className="text-muted-foreground mt-2 space-y-1 text-xs leading-relaxed">
                {FEE_NOTES.map((n) => (
                  <li key={n} className="flex gap-1.5">
                    <span className="text-primary mt-0.5">•</span> {n}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}

        <Section icon={CalendarDays} title="Start dates">
          <p className="text-muted-foreground text-xs leading-relaxed">
            {meta?.kind === "long" ? NEXT_COHORTS.long : NEXT_COHORTS.short}
          </p>
        </Section>

        <Section icon={Timer} title="Schedule">
          <ul className="space-y-1 text-xs leading-relaxed">
            <li className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                {meta
                  ? meta.daysPerWeek === 3
                    ? "3 practical days a week"
                    : "Two practical sessions a week"
                  : "Practical classes — nothing lecture-only"}
              </span>{" "}
              {scheduleDays !== "standard" && scheduleDays !== "mwf"
                ? `· ${SCHEDULE_LABELS[scheduleDays]}`
                : ""}
            </li>
            <li className="text-muted-foreground">
              {timeSlot !== "any" ? SCHEDULE_LABELS[timeSlot] : "Time slot flexible"} ·{" "}
              {mode ? SCHEDULE_LABELS[mode] : "Onsite by default"}
            </li>
            <li className="text-muted-foreground">1.5–2 hours at a machine, every session.</li>
          </ul>
        </Section>

        {meta && (
          <Section icon={Gift} title="What you leave with">
            <p className="text-xs font-semibold">{meta.deliverable}</p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              {meta.deliverableDetail}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <GraduationCap className="text-primary size-3.5" />
              Certificate awarded on the deliverable — verified at cea.ng/certificates/verify
            </p>
          </Section>
        )}

        <Section icon={Package} title="What to bring">
          <ul className="text-muted-foreground space-y-1 text-xs leading-relaxed">
            {WHAT_TO_BRING.map((w) => (
              <li key={w} className="flex gap-1.5">
                <span className="text-primary mt-0.5">•</span> {w}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={ShieldCheck} title="Guarantees">
          <ul className="text-muted-foreground space-y-1 text-xs leading-relaxed">
            <li className="flex gap-1.5">
              <ReceiptText className="text-primary mt-0.5 size-3.5 shrink-0" />
              Every class note is published online — you can read the whole curriculum before
              paying.
            </li>
            <li className="flex gap-1.5">
              <ShieldCheck className="text-primary mt-0.5 size-3.5 shrink-0" />
              Deposit refundable up to 7 days before start · transferable once.
            </li>
          </ul>
        </Section>

        <Section icon={MapPin} title="Visit or call">
          <div className="space-y-1.5 text-xs leading-relaxed">
            <p className="text-muted-foreground">
              26 Ebony Road, Off Rumuola Road, Port Harcourt, Rivers State
            </p>
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <Phone className="size-3.5" /> +234 905 862 8386 · Mon–Sat 8:00–20:00 WAT
            </p>
            <p className="text-muted-foreground">
              See the room before you enrol —{" "}
              <a
                href="https://www.cea.ng/visit"
                className="text-primary font-semibold underline-offset-2 hover:underline"
              >
                plan a visit
              </a>
              .
            </p>
          </div>
        </Section>
      </div>
    </aside>
  );
}
