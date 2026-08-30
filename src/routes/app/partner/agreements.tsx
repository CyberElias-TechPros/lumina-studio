import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, CalendarClock, FileSignature, Handshake, ScrollText } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import {
  useCreatePtnAgreement,
  usePtnAgreementItems,
  usePtnAgreements,
} from "@/lib/query/supplierPartner";
import type { PtnAgreement } from "@/lib/api/supplierPartner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/partner/agreements")({
  head: () => ({
    meta: [
      { title: "Agreements — CEA-OS" },
      { name: "description", content: "MOUs, contracts and partnership terms." },
    ],
  }),
  component: PartnerAgreements,
});

const statusMeta: Record<string, { label: string; tone: string }> = {
  active: { label: "Active", tone: "bg-success/10 text-success" },
  draft: { label: "Draft", tone: "bg-warning/10 text-warning" },
  expired: { label: "Expired", tone: "bg-muted text-muted-foreground" },
};

function PartnerAgreements() {
  const agreementsQuery = usePtnAgreements();
  const agreements = usePtnAgreementItems();
  const create = useCreatePtnAgreement();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || create.isPending) return;
    create.mutate(
      { title: title.trim(), detail: detail.trim() || undefined },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setTitle("");
          setDetail("");
          toast.success("MOU request submitted");
        },
      },
    );
  };

  const active = agreements.filter((a) => a.status === "active");
  const drafts = agreements.filter((a) => a.status === "draft");
  const renewals = agreements.filter((a) => a.renewLabel);
  const shares = agreements
    .map((a) => /(\d+(?:\.\d+)?)\s*%/.exec(`${a.title} ${a.detail}`)?.[1])
    .filter(Boolean);
  const revenueShare = shares[0] ? `${shares[0]}%` : "—";

  return (
    <AppShell
      roleKey="partner"
      title="Agreements"
      subtitle={
        agreements.length > 0
          ? `${active.length} active · ${drafts.length} draft${drafts.length === 1 ? "" : "s"}${renewals[0] ? ` · 1 renewal due ${renewals[0].renewLabel.replace("renews ", "")}` : ""}`
          : "Agreements with CEA"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {agreements.length > 0 ? `${active.length} in force` : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/partner/hub">
              <ArrowLeft className="size-4" /> Partner hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active",
            value: agreements.length > 0 ? String(active.length) : "—",
            delta: "in force",
            icon: FileSignature,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Drafts",
            value: agreements.length > 0 ? String(drafts.length) : "—",
            delta: drafts[0]?.title ?? "none",
            icon: ScrollText,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Renewals (12m)",
            value: agreements.length > 0 ? String(renewals.length) : "—",
            delta: renewals[0]?.renewLabel ?? "none",
            icon: CalendarClock,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Revenue share",
            value: revenueShare,
            delta: "per signed terms",
            icon: Handshake,
            tone: "bg-learning/10 text-learning",
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request an MOU</DialogTitle>
            <DialogDescription>
              Submit a partnership agreement request for the CEA team to review.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitRequest} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="mou-title" className="text-sm font-semibold">
                Agreement title
              </label>
              <Input
                id="mou-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Community scholarship partnership"
                maxLength={160}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="mou-detail" className="text-sm font-semibold">
                Notes
              </label>
              <Input
                id="mou-detail"
                value={detail}
                onChange={(event) => setDetail(event.target.value)}
                placeholder="Scope, dates or proposed terms"
                maxLength={240}
              />
            </div>
            {create.error && (
              <p role="alert" className="text-destructive text-sm">
                {create.error.message}
              </p>
            )}
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={create.isPending || !title.trim()}>
                {create.isPending ? "Submitting…" : "Submit request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileSignature className="text-primary size-4" /> Your agreements
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="font-semibold"
            onClick={() => setDialogOpen(true)}
          >
            Request MOU
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<PtnAgreement[]>
            query={agreementsQuery}
            error={{ title: "Agreements unavailable" }}
            empty={{ title: "No agreements", description: "Signed agreements will appear here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((a) => {
                  const meta = statusMeta[a.status] ?? {
                    label: a.status,
                    tone: "bg-muted text-muted-foreground",
                  };
                  return (
                    <div
                      key={a.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{a.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {a.detail}
                          {a.renewLabel ? ` · ${a.renewLabel}` : ""}
                        </p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", meta.tone)}>
                        {meta.label}
                      </Badge>
                      <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                        View
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
