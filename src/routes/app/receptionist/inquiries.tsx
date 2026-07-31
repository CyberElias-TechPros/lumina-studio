import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, Inbox, PhoneCall, TrendingUp, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/receptionist/inquiries")({
  head: () => ({
    meta: [
      { title: "Inquiry Log — CEA-OS" },
      { name: "description", content: "Walk-in inquiries captured as CRM leads." },
    ],
  }),
  component: ReceptionistInquiries,
});

const inquiries = [
  {
    n: "Bola Johnson",
    t: "Full-Stack programme",
    d: "Aug 3 · 09:15",
    stage: "Follow-up booked",
    tone: "bg-primary/10 text-primary",
  },
  {
    n: "Femi Alabi",
    t: "Scholarship eligibility",
    d: "Aug 2 · 14:40",
    stage: "Sent to admissions",
    tone: "bg-learning/10 text-learning",
  },
  {
    n: "Chiamaka Obi",
    t: "Campus tour + brochure",
    d: "Aug 1 · 11:05",
    stage: "Tour booked",
    tone: "bg-success/10 text-success",
  },
];

function ReceptionistInquiries() {
  return (
    <AppShell
      roleKey="student"
      title="Inquiry log"
      subtitle="Walk-ins → CRM leads · 4 this week"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            4 leads to CRM
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/receptionist">
              <ArrowLeft className="size-4" /> Front desk
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "This week",
            value: "4",
            delta: "3 walk-ins · 1 call",
            icon: Inbox,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Converted to apply",
            value: "61%",
            delta: "trailing 30 days",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Follow-ups booked",
            value: "2",
            delta: "by admissions",
            icon: PhoneCall,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Top topic",
            value: "Tuition",
            delta: "12 of 21 asks",
            icon: FileText,
            tone: "bg-warning/10 text-warning",
          },
        ].map((k) => (
          <Card key={k.label} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  {k.label}
                </p>
                <span className={cn("grid size-8 place-items-center rounded-lg", k.tone)}>
                  <k.icon className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-2xl font-extrabold">{k.value}</p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <UserRound className="text-primary size-4" /> Recent inquiries
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {inquiries.map((i) => (
            <div key={i.n} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <UserRound className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{i.n}</p>
                <p className="text-muted-foreground text-xs">
                  {i.t} · {i.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", i.tone)}>{i.stage}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
