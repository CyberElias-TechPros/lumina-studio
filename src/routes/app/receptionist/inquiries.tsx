import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, FileText, Inbox, PhoneCall, TrendingUp, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useRecInquiries, useRecInquiryItems } from "@/lib/query/volunteerReceptionist";
import type { RecInquiry } from "@/lib/api/volunteerReceptionist";
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

const tones = [
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
  "bg-success/10 text-success",
];

function ReceptionistInquiries() {
  const inquiriesQuery = useRecInquiries();
  const inquiries = useRecInquiryItems();
  const [selectedInquiry, setSelectedInquiry] = useState<RecInquiry | null>(null);

  return (
    <AppShell
      roleKey="receptionist"
      title="Inquiry log"
      subtitle={`Walk-ins → CRM leads · ${inquiries.length > 0 ? `${inquiries.length} this week` : "4 this week"}`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {inquiries.length > 0 ? `${inquiries.length} leads to CRM` : "4 leads to CRM"}
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
          <QueryState<RecInquiry[]>
            query={inquiriesQuery}
            error={{ title: "Inquiries unavailable" }}
            empty={{ title: "No inquiries", description: "Walk-in leads will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((i, idx) => (
                  <div
                    key={i.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <UserRound className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{i.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {i.topic} · {i.timeLabel}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", tones[idx % tones.length])}>
                      {i.stage}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 font-semibold"
                      onClick={() => setSelectedInquiry(i)}
                    >
                      Open
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
      <Dialog
        open={selectedInquiry !== null}
        onOpenChange={(open) => !open && setSelectedInquiry(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedInquiry?.name ?? "Inquiry details"}</DialogTitle>
            <DialogDescription>Inquiry captured at the front desk.</DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <dl className="grid gap-3 rounded-xl border p-4 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">Topic</dt>
                <dd className="mt-1 font-semibold">{selectedInquiry.topic}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">Received</dt>
                <dd className="mt-1 font-semibold">{selectedInquiry.timeLabel}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">CRM stage</dt>
                <dd className="mt-1 font-semibold">{selectedInquiry.stage}</dd>
              </div>
            </dl>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
