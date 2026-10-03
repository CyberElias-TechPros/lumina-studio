"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileText,
  Handshake,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  Save,
  Search,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QueryState } from "@/components/ui/query-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useAdmitPartner,
  usePartnerApplications,
  useProjectInquiries,
  useUpdatePartnerApplication,
  useUpdateProjectInquiry,
} from "@/lib/query/businessIntake";
import type {
  PartnerApplication,
  PartnerStatus,
  ProjectInquiry,
  ProjectStatus,
} from "@/lib/api/businessIntake";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/intake")({
  head: () => ({
    meta: [
      { title: "Business intake — CEA-OS" },
      {
        name: "description",
        content: "Review digital project enquiries and partner applications.",
      },
    ],
  }),
  component: BusinessIntakePage,
});

type QueueView = "projects" | "partners";

const projectStatuses: { key: ProjectStatus; label: string }[] = [
  { key: "new", label: "New" },
  { key: "reviewing", label: "Reviewing" },
  { key: "scoping", label: "Scoping" },
  { key: "proposal_sent", label: "Proposal sent" },
  { key: "won", label: "Won" },
  { key: "declined", label: "Declined" },
];

const partnerStatuses: { key: PartnerStatus; label: string }[] = [
  { key: "new", label: "New" },
  { key: "reviewing", label: "Reviewing" },
  { key: "interview", label: "Conversation" },
  { key: "approved", label: "Approved" },
  { key: "declined", label: "Declined" },
];

const statusTone: Record<string, string> = {
  new: "bg-primary/10 text-primary",
  reviewing: "bg-warning/10 text-warning",
  scoping: "bg-learning/10 text-learning",
  proposal_sent: "bg-career/10 text-career",
  interview: "bg-learning/10 text-learning",
  approved: "bg-success/10 text-success",
  admitted: "bg-success/10 text-success",
  won: "bg-success/10 text-success",
  declined: "bg-muted text-muted-foreground",
};

function statusLabel(status: string): string {
  return (
    {
      new: "New",
      reviewing: "Reviewing",
      scoping: "Scoping",
      proposal_sent: "Proposal sent",
      interview: "Conversation",
      approved: "Approved — ready to admit",
      admitted: "Admitted",
      won: "Won",
      declined: "Declined",
    }[status] ?? status
  );
}

function formatDate(date: string): string {
  return new Date(date).toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function BusinessIntakePage() {
  const [view, setView] = useState<QueueView>("projects");
  const [search, setSearch] = useState("");
  const projects = useProjectInquiries();
  const partners = usePartnerApplications();
  const projectItems = projects.data?.pages.flatMap((page) => page.items) ?? [];
  const partnerItems = partners.data?.pages.flatMap((page) => page.items) ?? [];
  const projectTotal = projects.data?.pages[0]?.total ?? 0;
  const partnerTotal = partners.data?.pages[0]?.total ?? 0;
  const projectMatch = (item: ProjectInquiry) =>
    `${item.ref} ${item.fullName} ${item.email} ${item.organization ?? ""} ${item.brief}`
      .toLowerCase()
      .includes(search.toLowerCase());
  const partnerMatch = (item: PartnerApplication) =>
    `${item.ref} ${item.contactName} ${item.email} ${item.organization} ${item.region} ${item.proposal}`
      .toLowerCase()
      .includes(search.toLowerCase());
  const loadedCount = view === "projects" ? projectItems.length : partnerItems.length;
  const totalCount = view === "projects" ? projectTotal : partnerTotal;
  const activeQuery = view === "projects" ? projects : partners;
  const counts = { projects: projectTotal, partners: partnerTotal };

  return (
    <AppShell
      roleKey="admin"
      title="Business intake"
      subtitle="Project requests · partner applications · review and admission"
      actions={
        <Button asChild variant="outline" size="sm" className="font-semibold">
          <Link to="/app/admin">
            <ArrowLeft className="size-4" />
            Admin hub
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
              <BriefcaseBusiness className="size-5" />
            </span>
            <div>
              <p className="text-muted-foreground text-xs font-bold uppercase">Project enquiries</p>
              <p className="font-display mt-1 text-2xl font-bold">{projectTotal}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <span className="bg-success/10 text-success grid size-10 place-items-center rounded-xl">
              <Handshake className="size-5" />
            </span>
            <div>
              <p className="text-muted-foreground text-xs font-bold uppercase">
                Partner applications
              </p>
              <p className="font-display mt-1 text-2xl font-bold">{partnerTotal}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl border bg-card p-3">
        <div className="flex rounded-xl bg-muted p-1" role="tablist" aria-label="Intake queues">
          <button
            type="button"
            role="tab"
            aria-selected={view === "projects"}
            onClick={() => {
              setView("projects");
              setSearch("");
            }}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
              view === "projects"
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Projects <span className="ml-1.5 text-xs opacity-70">{counts.projects}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "partners"}
            onClick={() => {
              setView("partners");
              setSearch("");
            }}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
              view === "partners"
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Partners <span className="ml-1.5 text-xs opacity-70">{counts.partners}</span>
          </button>
        </div>
        <div className="flex min-w-[12rem] flex-1 items-center gap-2 rounded-xl bg-muted px-3 py-2">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={
              view === "projects"
                ? "Search name, reference or brief…"
                : "Search organisation, reference or proposal…"
            }
            className="h-7 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void activeQuery.refetch()}
          disabled={activeQuery.isFetching}
        >
          <RefreshCw className={cn("size-3.5", activeQuery.isFetching && "animate-spin")} /> Refresh
        </Button>
        <span className="text-muted-foreground px-1 text-xs">
          Showing {loadedCount} of {totalCount}
        </span>
      </div>

      {view === "projects" ? (
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="text-primary size-4" />
              Project requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <QueryState<ProjectInquiry[]>
              query={projects}
              error={{ title: "Project queue unavailable" }}
              empty={{
                title: "No project enquiries yet",
                description: "New app, website and digital-project requests will appear here.",
              }}
            >
              {(items) => {
                const matches = items.filter(projectMatch);
                return matches.length ? (
                  matches.map((item) => <ProjectReviewCard key={item.id} item={item} />)
                ) : (
                  <p className="text-muted-foreground py-8 text-center text-sm">
                    No loaded project requests match this search. Load more records or try another
                    term.
                  </p>
                );
              }}
            </QueryState>
            {projects.hasNextPage && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => void projects.fetchNextPage()}
                disabled={projects.isFetchingNextPage}
              >
                {projects.isFetchingNextPage && <Loader2 className="size-4 animate-spin" />}Load
                more project requests <ArrowRight className="size-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Handshake className="text-primary size-4" />
              Partner applications and admission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <QueryState<PartnerApplication[]>
              query={partners}
              error={{ title: "Partner queue unavailable" }}
              empty={{
                title: "No partner applications yet",
                description: "Public partnership proposals will appear here for screening.",
              }}
            >
              {(items) => {
                const matches = items.filter(partnerMatch);
                return matches.length ? (
                  matches.map((item) => <PartnerReviewCard key={item.id} item={item} />)
                ) : (
                  <p className="text-muted-foreground py-8 text-center text-sm">
                    No loaded partner applications match this search. Load more records or try
                    another term.
                  </p>
                );
              }}
            </QueryState>
            {partners.hasNextPage && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => void partners.fetchNextPage()}
                disabled={partners.isFetchingNextPage}
              >
                {partners.isFetchingNextPage && <Loader2 className="size-4 animate-spin" />}Load
                more partner applications <ArrowRight className="size-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}

function ProjectReviewCard({ item }: { item: ProjectInquiry }) {
  const [status, setStatus] = useState<ProjectStatus>(item.status);
  const [note, setNote] = useState(item.note);
  const update = useUpdateProjectInquiry();
  useEffect(() => {
    setStatus(item.status);
    setNote(item.note);
  }, [item.status, item.note]);

  const save = () =>
    update.mutate(
      { id: item.id, status, note },
      {
        onSuccess: () => toast.success(`Project ${item.ref} updated`),
        onError: (error) =>
          toast.error("Could not update project enquiry", { description: error.message }),
      },
    );

  return (
    <article className="rounded-xl border p-4 sm:p-5">
      <div className="flex flex-wrap items-start gap-3">
        <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-lg">
          <UserRound className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display font-semibold">
              {item.fullName}
              {item.organization ? ` · ${item.organization}` : ""}
            </h3>
            <Badge className={cn("border-0", statusTone[item.status])}>
              {statusLabel(item.status)}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            {item.ref} · received {formatDate(item.createdAt)} · {item.source.replaceAll("_", " ")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant="outline">
            <a href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.ref}`)}`}>
              <Mail className="size-3.5" />
              Email
            </a>
          </Button>
          {item.phone && (
            <Button asChild size="sm" variant="outline">
              <a href={`tel:${item.phone}`}>
                <Phone className="size-3.5" />
                Call
              </a>
            </Button>
          )}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Detail label="Project type" value={item.projectTypeLabel} />
        <Detail label="Budget" value={item.budgetLabel} />
        <Detail label="Target" value={item.timelineLabel} />
      </div>
      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{item.brief}</p>
      <div className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-[12rem_minmax(0,1fr)_auto] sm:items-end">
        <div className="space-y-1.5">
          <label
            className="text-muted-foreground text-xs font-semibold"
            htmlFor={`project-status-${item.id}`}
          >
            Pipeline stage
          </label>
          <Select value={status} onValueChange={(value) => setStatus(value as ProjectStatus)}>
            <SelectTrigger id={`project-status-${item.id}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projectStatuses.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label
            className="text-muted-foreground text-xs font-semibold"
            htmlFor={`project-note-${item.id}`}
          >
            Private staff note
          </label>
          <Textarea
            id={`project-note-${item.id}`}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            maxLength={3000}
            rows={2}
            placeholder="Next action, owner or context for the next handover…"
            className="min-h-10 resize-y"
          />
        </div>
        <Button
          onClick={save}
          disabled={update.isPending || (status === item.status && note === item.note)}
        >
          {update.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          Save review
        </Button>
      </div>
    </article>
  );
}

function PartnerReviewCard({ item }: { item: PartnerApplication }) {
  const [status, setStatus] = useState<PartnerStatus>(
    item.status === "admitted" ? "approved" : item.status,
  );
  const [note, setNote] = useState(item.note);
  const update = useUpdatePartnerApplication();
  const admit = useAdmitPartner();
  useEffect(() => {
    setStatus(item.status === "admitted" ? "approved" : item.status);
    setNote(item.note);
  }, [item.status, item.note]);

  const save = () =>
    update.mutate(
      { id: item.id, status, note },
      {
        onSuccess: () => toast.success(`Partner application ${item.ref} updated`),
        onError: (error) =>
          toast.error("Could not update partner application", { description: error.message }),
      },
    );
  const admitApproved = () =>
    admit.mutate(item.id, {
      onSuccess: (result) => {
        if (result.emailSent) {
          toast.success(
            item.status === "admitted"
              ? "Sign-in instructions resent"
              : "Partner admitted and sign-in instructions sent",
          );
        } else {
          toast.error(
            item.status === "admitted"
              ? "Sign-in instructions could not be sent"
              : "Partner account created, but the email was not sent",
            {
              description:
                "Check the transactional email provider settings and contact the applicant directly.",
            },
          );
        }
      },
      onError: (error) =>
        toast.error(
          item.status === "admitted"
            ? "Could not resend sign-in instructions"
            : "Partner could not be admitted",
          { description: error.message },
        ),
    });

  return (
    <article className="rounded-xl border p-4 sm:p-5">
      <div className="flex flex-wrap items-start gap-3">
        <span className="bg-success/10 text-success grid size-9 shrink-0 place-items-center rounded-lg">
          <Building2 className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display font-semibold">{item.organization}</h3>
            <Badge className={cn("border-0", statusTone[item.status])}>
              {statusLabel(item.status)}
            </Badge>
            {item.hasPortalAccount && <Badge variant="outline">Partner workspace ready</Badge>}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            {item.contactName} · {item.ref} · received {formatDate(item.createdAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant="outline">
            <a href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.ref}`)}`}>
              <Mail className="size-3.5" />
              Email
            </a>
          </Button>
          {item.phone && (
            <Button asChild size="sm" variant="outline">
              <a href={`tel:${item.phone}`}>
                <Phone className="size-3.5" />
                Call
              </a>
            </Button>
          )}
          {item.website && (
            <Button asChild size="sm" variant="outline">
              <a href={item.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-3.5" />
                Website
              </a>
            </Button>
          )}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Detail label="Partnership focus" value={item.partnershipTypeLabel} />
        <Detail label="Region" value={item.region} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-muted-foreground text-xs font-bold uppercase">Relevant capability</p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{item.capabilities}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs font-bold uppercase">
            Proposed collaboration
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{item.proposal}</p>
        </div>
      </div>
      {item.status !== "admitted" ? (
        <div className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-[12rem_minmax(0,1fr)_auto] sm:items-end">
          <div className="space-y-1.5">
            <label
              className="text-muted-foreground text-xs font-semibold"
              htmlFor={`partner-status-${item.id}`}
            >
              Review stage
            </label>
            <Select value={status} onValueChange={(value) => setStatus(value as PartnerStatus)}>
              <SelectTrigger id={`partner-status-${item.id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {partnerStatuses.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label
              className="text-muted-foreground text-xs font-semibold"
              htmlFor={`partner-note-${item.id}`}
            >
              Private review note
            </label>
            <Textarea
              id={`partner-note-${item.id}`}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={3000}
              rows={2}
              placeholder="Screening outcome, due diligence or next step…"
              className="min-h-10 resize-y"
            />
          </div>
          <Button
            onClick={save}
            disabled={update.isPending || (status === item.status && note === item.note)}
          >
            {update.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Save review
          </Button>
        </div>
      ) : (
        <div className="text-muted-foreground mt-4 flex flex-wrap items-start justify-between gap-3 border-t pt-4 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="text-success mt-0.5 size-4 shrink-0" />
            <div>
              <p>Partner admission completed. Sign-in is available to this email as a partner.</p>
              {item.note && (
                <p className="mt-2 whitespace-pre-wrap">
                  <span className="font-semibold">Last private review note:</span> {item.note}
                </p>
              )}
            </div>
          </div>
          {item.hasPortalAccount && (
            <Button size="sm" variant="outline" onClick={admitApproved} disabled={admit.isPending}>
              {admit.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Mail className="size-4" />
              )}
              Resend sign-in instructions
            </Button>
          )}
        </div>
      )}
      {item.status === "approved" && !item.hasPortalAccount && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-success/5 p-4">
          <div>
            <p className="text-sm font-semibold">Ready to admit</p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Creates a partner-role account and emails the applicant a secure sign-in path.
              Existing non-partner accounts are never overwritten.
            </p>
          </div>
          <Button onClick={admitApproved} disabled={admit.isPending}>
            {admit.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CheckCircle2 className="size-4" />
            )}
            Admit and provision account
          </Button>
        </div>
      )}
      {item.status === "approved" && item.hasPortalAccount && (
        <p className="text-success mt-3 flex items-center gap-2 text-sm">
          <CheckCircle2 className="size-4" />
          Partner account already exists.
        </p>
      )}
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/40 px-3 py-2">
      <p className="text-muted-foreground text-[11px] font-semibold uppercase">{label}</p>
      <p className="mt-0.5 text-sm font-medium">{value}</p>
    </div>
  );
}
