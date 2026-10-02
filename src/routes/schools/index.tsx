import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpenCheck,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Loader2,
  MessageCircle,
  School,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { PageShell, Eyebrow } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion";
import { submitSchoolInquiry } from "@/lib/api/operations";
import { ApiError } from "@/lib/errors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/schools/")({
  head: () => ({
    meta: [
      { title: "Digital Skills Programme for Schools — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "A term-based practical digital skills programme for primary and secondary schools in Port Harcourt: one skill per term, taught in your school, with projects, termly reports, certificates and a Digital Skills Passport for every student.",
      },
    ],
  }),
  component: SchoolsPage,
});

const TERM_PLAN = [
  {
    term: "First term",
    primary: "Computer & Digital Literacy",
    secondary: "Digital Productivity (MS Office + Google Workspace)",
  },
  {
    term: "Second term",
    primary: "Microsoft Office for Kids",
    secondary: "Graphic Design",
  },
  {
    term: "Third term",
    primary: "Scratch & Coding",
    secondary: "Web Design & Coding Foundations",
  },
];

const DELIVERABLES = [
  {
    icon: GraduationCap,
    title: "A skill every term",
    detail:
      "One practical course per term, taught in your school by our instructors — 1–2 sessions a week, at a time that fits your timetable.",
  },
  {
    icon: ClipboardList,
    title: "Projects, not theory",
    detail:
      "Every student builds something real each term: a document, a design, a working web page. We assess Know → Do → Create, not attendance.",
  },
  {
    icon: BookOpenCheck,
    title: "Termly report for the school",
    detail:
      "Attendance, skills covered, project outcomes and next-term recommendations — the report you can show parents and your board.",
  },
  {
    icon: BadgeCheck,
    title: "Certificates + Digital Skills Passport",
    detail:
      "Certificates carry a code any employer can verify, and each student gets a Digital Skills Passport that grows term after term.",
  },
];

const NUMBERS = [
  { value: "1–2", label: "sessions a week" },
  { value: "45–90", label: "minutes per session" },
  { value: "1", label: "skill per term" },
  { value: "3", label: "terms per year" },
];

function SchoolsPage() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    schoolName: "",
    level: "secondary" as "primary" | "secondary" | "mixed",
    contactName: "",
    contactRole: "",
    phone: "",
    email: "",
    studentCount: "",
    message: "",
  });

  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    try {
      const res = await submitSchoolInquiry({
        schoolName: form.schoolName,
        level: form.level,
        contactName: form.contactName,
        contactRole: form.contactRole || undefined,
        phone: form.phone,
        email: form.email || undefined,
        studentCount: form.studentCount ? Number(form.studentCount) : undefined,
        message: form.message || undefined,
      });
      setState("done");
      setMessage(res.message);
    } catch (err) {
      setState("error");
      setMessage(
        err instanceof ApiError
          ? err.message
          : "We could not send that just now — please try again or WhatsApp us on 0905 862 8386.",
      );
    }
  }

  const inputClass =
    "border-input bg-background focus-visible:ring-ring w-full rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-1 focus-visible:outline-none";

  return (
    <PageShell>
      <section className="container-page pt-14 pb-10 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>For primary &amp; secondary schools</Eyebrow>
          <h1 className="font-display mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            A practical digital skills programme your students finish
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base leading-relaxed">
            One skill per term, taught in your school by Cyber Elias Academy instructors. Your
            students build real projects, you get a termly report, and every child leaves with a
            certificate and a Digital Skills Passport that grows each term.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-11 font-semibold">
              <a href="#proposal">
                <School className="size-4" /> Request a proposal
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 font-semibold">
              <a
                href={`https://wa.me/2349058628386?text=${encodeURIComponent(
                  "Hello Cyber Elias Academy! I'd like to discuss the Digital Skills Programme for our school.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" /> Ask on WhatsApp
              </a>
            </Button>
          </div>
          <p className="text-muted-foreground mt-3 text-xs">
            ₦15,000–₦20,000 per student per term · minimum 20 students · proposal within one working
            day
          </p>
        </div>
      </section>

      <section className="container-page pb-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {NUMBERS.map((n) => (
            <div key={n.label} className="rounded-xl border bg-card px-4 py-5 text-center">
              <p className="font-display text-2xl font-extrabold">{n.value}</p>
              <p className="text-muted-foreground mt-1 text-xs font-medium">{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {DELIVERABLES.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i}>
              <Card className="h-full border bg-card shadow-none">
                <CardContent className="p-6">
                  <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-lg">
                    <item.icon className="size-5" />
                  </span>
                  <h2 className="font-display mt-4 text-lg font-bold">{item.title}</h2>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.detail}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-center text-2xl font-extrabold tracking-tight">
            Three terms, one pathway
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-center text-sm">
            Each year builds on the last — and each term's work goes into the student's Digital
            Skills Passport.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Term</th>
                  <th className="px-4 py-3 text-left font-semibold">Primary school</th>
                  <th className="px-4 py-3 text-left font-semibold">Secondary school</th>
                </tr>
              </thead>
              <tbody>
                {TERM_PLAN.map((row) => (
                  <tr key={row.term} className="border-t">
                    <td className="px-4 py-3 font-semibold">{row.term}</td>
                    <td className="text-muted-foreground px-4 py-3">{row.primary}</td>
                    <td className="text-muted-foreground px-4 py-3">{row.secondary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Who teaches",
                text: "Our instructors, at your school. You provide the timetable window, a room and the class list — nothing else.",
              },
              {
                icon: ShieldCheck,
                title: "Safeguarding",
                text: "Teachers stay in the room, and every instructor is known to the academy and works to a written code of conduct.",
              },
              {
                icon: CalendarCheck2,
                title: "What it costs",
                text: "₦20,000 per student per term for 20–39 students, ₦17,500 for 40–79, ₦15,000 from 80. Minimum 20 students per term.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-card p-5">
                <span className="text-primary flex items-center gap-2 text-sm font-bold">
                  <item.icon className="size-4" /> {item.title}
                </span>
                <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proposal" className="container-page pb-20">
        <div className="mx-auto max-w-2xl">
          <Card className="border-primary/30">
            <CardContent className="p-6 sm:p-8">
              {state === "done" ? (
                <div className="text-center">
                  <span className="bg-success/10 text-success mx-auto grid size-12 place-items-center rounded-full">
                    <CheckCircle2 className="size-6" />
                  </span>
                  <h2 className="font-display mt-4 text-xl font-extrabold">Request received</h2>
                  <p className="text-muted-foreground mt-2 text-sm">{message}</p>
                  <p className="text-muted-foreground mt-2 text-xs">
                    If it is urgent, message us on WhatsApp at 0905 862 8386 (Mon–Sat, 8:00–20:00).
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-primary size-5" />
                    <h2 className="font-display text-xl font-extrabold">
                      Request a proposal for your school
                    </h2>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Tell us about your school and we will send a proposal within one working day —
                    the term plan, the fee for your student numbers, and exactly what we need from
                    you.
                  </p>
                  <form onSubmit={(e) => void submit(e)} className="mt-5 grid gap-3 sm:grid-cols-2">
                    <label className="text-xs font-medium sm:col-span-2">
                      School name
                      <input
                        required
                        value={form.schoolName}
                        onChange={(e) => set("schoolName", e.target.value)}
                        placeholder="e.g. Rumuola Model Secondary School"
                        className={cn(inputClass, "mt-1")}
                      />
                    </label>
                    <label className="text-xs font-medium">
                      School type
                      <select
                        value={form.level}
                        onChange={(e) => set("level", e.target.value)}
                        className={cn(inputClass, "mt-1")}
                      >
                        <option value="secondary">Secondary</option>
                        <option value="primary">Primary</option>
                        <option value="mixed">Primary &amp; secondary</option>
                      </select>
                    </label>
                    <label className="text-xs font-medium">
                      Students who would take part
                      <input
                        type="number"
                        min={1}
                        value={form.studentCount}
                        onChange={(e) => set("studentCount", e.target.value)}
                        placeholder="e.g. 60"
                        className={cn(inputClass, "mt-1")}
                      />
                    </label>
                    <label className="text-xs font-medium">
                      Your name
                      <input
                        required
                        value={form.contactName}
                        onChange={(e) => set("contactName", e.target.value)}
                        className={cn(inputClass, "mt-1")}
                      />
                    </label>
                    <label className="text-xs font-medium">
                      Your role
                      <input
                        value={form.contactRole}
                        onChange={(e) => set("contactRole", e.target.value)}
                        placeholder="Head teacher, proprietor…"
                        className={cn(inputClass, "mt-1")}
                      />
                    </label>
                    <label className="text-xs font-medium">
                      Phone / WhatsApp
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="0803 123 4567"
                        className={cn(inputClass, "mt-1")}
                      />
                    </label>
                    <label className="text-xs font-medium">
                      Email (optional)
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={cn(inputClass, "mt-1")}
                      />
                    </label>
                    <label className="text-xs font-medium sm:col-span-2">
                      Anything we should know?
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="Which term you have in mind, how many computer systems, preferred days…"
                        className={cn(inputClass, "mt-1 resize-y")}
                      />
                    </label>
                    {state === "error" && (
                      <p className="text-error text-xs sm:col-span-2">{message}</p>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={state === "sending"}
                      className="h-11 w-full font-semibold sm:col-span-2"
                    >
                      {state === "sending" ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <School className="size-4" />
                      )}
                      Send my request
                    </Button>
                    <p className="text-muted-foreground text-[11px] sm:col-span-2">
                      We use your details only to prepare and follow up this proposal. No
                      obligation, no fee to ask.
                    </p>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
