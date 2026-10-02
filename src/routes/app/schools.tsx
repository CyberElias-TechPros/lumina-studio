import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCopy,
  Inbox,
  Loader2,
  School,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import {
  createProposal,
  createSchool,
  fetchProposals,
  fetchSchoolInquiries,
  fetchSchools,
  markProposalSent,
  updateSchoolInquiry,
  type SchoolInquiry,
  type SchoolProposalSummary,
} from "@/lib/api/operations";
import { ApiError } from "@/lib/errors";
import { cn, formatNaira } from "@/lib/utils";

export const Route = createFileRoute("/app/schools")({
  head: () => ({
    meta: [
      { title: "Schools programme — CEA-OS" },
      {
        name: "description",
        content:
          "School enquiries, records and proposals for the term-based Digital Skills Programme.",
      },
    ],
  }),
  component: SchoolsWorkspace,
});

const proposalTone: Record<SchoolProposalSummary["status"], string> = {
  draft: "bg-muted text-muted-foreground",
  sent: "bg-primary/10 text-primary",
  viewed: "bg-learning/10 text-learning",
  accepted: "bg-success/10 text-success",
  declined: "bg-error/10 text-error",
  expired: "bg-warning/10 text-warning",
};

/** Same tiers as the backend — shown so the fee is never a surprise. */
function tierFor(students: number): number {
  if (students >= 80) return 15_000;
  if (students >= 40) return 17_500;
  return 20_000;
}

function SchoolsWorkspace() {
  const queryClient = useQueryClient();
  const inquiries = useQuery({
    queryKey: ["school-inquiries"],
    queryFn: () => fetchSchoolInquiries("all"),
  });
  const schools = useQuery({ queryKey: ["schools"], queryFn: fetchSchools });
  const proposals = useQuery({ queryKey: ["school-proposals"], queryFn: () => fetchProposals() });

  const [schoolId, setSchoolId] = useState("");
  const [students, setStudents] = useState("40");
  const [term, setTerm] = useState("First term, 2026/2027");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["schools"] });
    void queryClient.invalidateQueries({ queryKey: ["school-proposals"] });
    void queryClient.invalidateQueries({ queryKey: ["school-inquiries"] });
  };

  const convert = useMutation({
    mutationFn: async (inquiry: SchoolInquiry) => {
      const created = await createSchool({
        name: inquiry.schoolName,
        level: inquiry.level,
        contactName: inquiry.contactName,
        contactRole: inquiry.contactRole ?? undefined,
        contactPhone: inquiry.phone,
        contactEmail: inquiry.email ?? undefined,
        studentCount: inquiry.studentCount ?? undefined,
        status: "contacted",
        notes: inquiry.message ?? undefined,
      });
      await updateSchoolInquiry(inquiry.id, "converted", created.id);
      return created;
    },
    onSuccess: invalidate,
    onError: (err) =>
      setError(err instanceof ApiError ? err.message : "Could not create the school."),
  });

  const propose = useMutation({
    mutationFn: () => createProposal(schoolId, { term, students: Number(students) }),
    onSuccess: () => {
      setError("");
      invalidate();
    },
    onError: (err) =>
      setError(err instanceof ApiError ? err.message : "Could not generate the proposal."),
  });

  const markSent = useMutation({
    mutationFn: (ref: string) => markProposalSent(ref),
    onSuccess: invalidate,
  });

  const schoolItems = schools.data?.items ?? [];
  const proposalItems = proposals.data?.items ?? [];
  const inquiryItems = inquiries.data?.items ?? [];
  const newInquiries = inquiryItems.filter((i) => i.status === "new").length;
  const accepted = proposalItems.filter((p) => p.status === "accepted");
  const pipelineValue = proposalItems
    .filter((p) => p.status !== "declined" && p.status !== "expired")
    .reduce((sum, p) => sum + p.total, 0);

  const inputClass =
    "border-input bg-background focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none";

  async function copyLink(ref: string) {
    const url = `${window.location.origin}/schools/proposal/${ref}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(ref);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <AppShell
      roleKey="admin"
      title="Schools programme"
      subtitle={
        schoolItems.length > 0 || inquiryItems.length > 0
          ? `${newInquiries} new enquiries · ${schoolItems.length} schools · ${proposalItems.length} proposals`
          : "Term-based digital skills for primary and secondary schools"
      }
      actions={
        <Badge className="bg-primary/10 text-primary border-0 font-semibold">
          Pipeline {formatNaira(pipelineValue)}
        </Badge>
      }
    >
      <div className="space-y-6">
        {accepted.length > 0 && (
          <Card className="border-success/30 bg-success/5">
            <CardContent className="flex flex-wrap items-center gap-3 p-5">
              <CheckCircle2 className="text-success size-5" />
              <p className="text-sm font-semibold">
                {accepted.length} proposal{accepted.length === 1 ? "" : "s"} accepted —{" "}
                {formatNaira(accepted.reduce((sum, p) => sum + p.total, 0))} for the term.
              </p>
              <p className="text-muted-foreground text-xs">
                Next: agree the start date and add it as a cohort in Admissions → Cohorts.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Inbox className="text-primary size-4" /> Enquiries from the website
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <QueryState
                query={inquiries}
                isEmpty={(data: { items: SchoolInquiry[] }) => data.items.length === 0}
                empty={{
                  icon: "inbox",
                  title: "No school enquiries yet",
                  description:
                    "Share cea.ng/schools with schools in Port Harcourt — enquiries land here.",
                }}
              >
                {(data: { items: SchoolInquiry[] }) =>
                  data.items.map((inquiry) => (
                    <div key={inquiry.id} className="rounded-lg border p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold">{inquiry.schoolName}</p>
                        <Badge variant="secondary" className="text-[11px]">
                          {inquiry.level}
                        </Badge>
                        <Badge
                          className={cn(
                            "border-0 text-[11px] font-semibold",
                            inquiry.status === "new"
                              ? "bg-warning/10 text-warning"
                              : inquiry.status === "converted"
                                ? "bg-success/10 text-success"
                                : "bg-muted text-muted-foreground",
                          )}
                        >
                          {inquiry.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {inquiry.contactName}
                        {inquiry.contactRole ? ` · ${inquiry.contactRole}` : ""} · {inquiry.phone}
                        {inquiry.email ? ` · ${inquiry.email}` : ""}
                      </p>
                      {inquiry.studentCount && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          {inquiry.studentCount} students → tier{" "}
                          <strong className="text-foreground">
                            {formatNaira(tierFor(inquiry.studentCount))}
                          </strong>{" "}
                          per student/term
                        </p>
                      )}
                      {inquiry.message && (
                        <p className="text-muted-foreground mt-1 text-xs italic">
                          “{inquiry.message}”
                        </p>
                      )}
                      {inquiry.status !== "converted" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-3 font-semibold"
                          disabled={convert.isPending}
                          onClick={() => convert.mutate(inquiry)}
                        >
                          {convert.isPending ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <Building2 className="size-3.5" />
                          )}
                          Add as a school
                        </Button>
                      )}
                    </div>
                  ))
                }
              </QueryState>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="text-primary size-4" /> Generate a proposal
              </CardTitle>
            </CardHeader>
            <CardContent>
              {schoolItems.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Add a school first (from an enquiry or with the button below) to generate a
                  proposal.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!schoolId) {
                      setError("Choose a school.");
                      return;
                    }
                    propose.mutate();
                  }}
                  className="space-y-3"
                >
                  <label className="text-xs font-medium">
                    School
                    <select
                      value={schoolId}
                      onChange={(e) => setSchoolId(e.target.value)}
                      className={cn(inputClass, "mt-1")}
                    >
                      <option value="">Choose a school…</option>
                      {schoolItems.map((school) => (
                        <option key={school.id} value={school.id}>
                          {school.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="text-xs font-medium">
                      Students
                      <input
                        type="number"
                        min={20}
                        value={students}
                        onChange={(e) => setStudents(e.target.value)}
                        className={cn(inputClass, "mt-1")}
                      />
                    </label>
                    <label className="text-xs font-medium">
                      Term
                      <input
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        className={cn(inputClass, "mt-1")}
                      />
                    </label>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Tier for {students || 0} students:{" "}
                    <strong className="text-foreground">
                      {formatNaira(tierFor(Number(students) || 0))}
                    </strong>{" "}
                    each · total{" "}
                    <strong className="text-foreground">
                      {formatNaira(tierFor(Number(students) || 0) * (Number(students) || 0))}
                    </strong>
                  </p>
                  {error && <p className="text-error text-xs">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full font-semibold"
                    disabled={propose.isPending}
                  >
                    {propose.isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Sparkles className="size-4" />
                    )}
                    Generate proposal
                  </Button>
                </form>
              )}

              <div className="mt-4 border-t pt-4">
                <p className="text-xs font-semibold">Add a school manually</p>
                <form
                  className="mt-2 grid gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget as HTMLFormElement;
                    const nameInput = form.elements.namedItem("schoolName") as HTMLInputElement;
                    const countInput = form.elements.namedItem("studentCount") as HTMLInputElement;
                    createSchool({
                      name: nameInput.value,
                      studentCount: countInput.value ? Number(countInput.value) : undefined,
                    })
                      .then(() => {
                        nameInput.value = "";
                        countInput.value = "";
                        setError("");
                        invalidate();
                      })
                      .catch(() => setError("Could not add that school."));
                  }}
                >
                  <input
                    name="schoolName"
                    required
                    placeholder="School name"
                    className={inputClass}
                  />
                  <input
                    name="studentCount"
                    type="number"
                    min={1}
                    placeholder="Students (optional)"
                    className={inputClass}
                  />
                  <Button type="submit" variant="outline" className="font-semibold">
                    <School className="size-4" /> Add school
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarClock className="text-primary size-4" /> Proposals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState
              query={proposals}
              isEmpty={(data: { items: SchoolProposalSummary[] }) => data.items.length === 0}
              empty={{
                icon: "document",
                title: "No proposals yet",
                description:
                  "Generate one above — the school gets a link they can accept in place.",
              }}
            >
              {(data: { items: SchoolProposalSummary[] }) =>
                data.items.map((proposal) => (
                  <div
                    key={proposal.ref}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold">{proposal.schoolName}</p>
                        <Badge
                          className={cn(
                            "border-0 text-[11px] font-semibold",
                            proposalTone[proposal.status],
                          )}
                        >
                          {proposal.status}
                        </Badge>
                        <Badge variant="secondary" className="font-mono text-[10px]">
                          {proposal.ref}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {proposal.term} · {proposal.students} students ·{" "}
                        {formatNaira(proposal.ratePerStudent)} each ·{" "}
                        <strong className="text-foreground">{formatNaira(proposal.total)}</strong>
                      </p>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        Valid until {proposal.validUntil}
                        {proposal.viewedAt
                          ? ` · opened ${proposal.viewedAt.slice(0, 10)}`
                          : " · not opened yet"}
                        {proposal.acceptedBy ? ` · accepted by ${proposal.acceptedBy}` : ""}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="font-semibold"
                        onClick={() => void copyLink(proposal.ref)}
                      >
                        {copied === proposal.ref ? (
                          <CheckCircle2 className="size-3.5" />
                        ) : (
                          <ClipboardCopy className="size-3.5" />
                        )}
                        {copied === proposal.ref ? "Copied" : "Copy link"}
                      </Button>
                      {proposal.status === "draft" && (
                        <Button
                          size="sm"
                          className="font-semibold"
                          disabled={markSent.isPending}
                          onClick={() => markSent.mutate(proposal.ref)}
                        >
                          <Send className="size-3.5" /> Mark sent
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              }
            </QueryState>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="text-primary size-4" /> Schools
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {schoolItems.map((school) => (
              <div key={school.id} className="rounded-lg border p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{school.name}</p>
                  <Badge variant="secondary" className="text-[11px]">
                    {school.level}
                  </Badge>
                  <Badge
                    className={cn(
                      "border-0 text-[11px] font-semibold",
                      school.status === "won"
                        ? "bg-success/10 text-success"
                        : school.status === "lost"
                          ? "bg-error/10 text-error"
                          : "bg-primary/10 text-primary",
                    )}
                  >
                    {school.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  {school.contactName ?? "No contact yet"}
                  {school.contactPhone ? ` · ${school.contactPhone}` : ""}
                  {school.studentCount ? ` · ${school.studentCount} students` : ""}
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {school.proposalCount} proposal{school.proposalCount === 1 ? "" : "s"}
                  {school.lastProposalAt ? ` · last ${school.lastProposalAt.slice(0, 10)}` : ""}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
