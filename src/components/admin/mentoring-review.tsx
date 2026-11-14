"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminAccounts } from "@/lib/query/admin";
import {
  approveMentoringProfile,
  getMentoringEligibility,
  getMentoringReview,
  setMentoringEligibility,
} from "@/lib/api/mentoring";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function MentoringReview() {
  const accounts = useAdminAccounts(),
    client = useQueryClient();
  const [userId, setUserId] = useState(""),
    [expiry, setExpiry] = useState(""),
    [reference, setReference] = useState(""),
    [adult, setAdult] = useState(false),
    [profileReference, setProfileReference] = useState(""),
    [reviewed, setReviewed] = useState(false);
  const eligibility = useQuery({
    queryKey: ["mentoring-eligibility", userId],
    queryFn: () => getMentoringEligibility(userId),
    enabled: !!userId,
  });
  const profile = useQuery({
    queryKey: ["mentoring-review", userId],
    queryFn: () => getMentoringReview(userId),
    enabled: !!userId,
  });
  const refresh = async () => {
    await Promise.all([
      client.invalidateQueries({ queryKey: ["mentoring-eligibility", userId] }),
      client.invalidateQueries({ queryKey: ["mentoring-review", userId] }),
    ]);
  };
  const grant = useMutation({
    mutationFn: setMentoringEligibility,
    retry: false,
    onSuccess: async () => {
      setAdult(false);
      await refresh();
    },
  });
  const approve = useMutation({
    mutationFn: approveMentoringProfile,
    retry: false,
    onSuccess: async () => {
      setReviewed(false);
      await refresh();
    },
  });
  const busy = grant.isPending || approve.isPending,
    people = accounts.data?.pages.flatMap((p) => p.items) ?? [],
    date = new Date(expiry),
    selected = profile.data?.profile;
  const reset = () => {
    setAdult(false);
    setReviewed(false);
    setReference("");
    setProfileReference("");
    setExpiry("");
    grant.reset();
    approve.reset();
  };
  return (
    <Card className="bg-card mt-5 border shadow-soft">
      <CardContent className="space-y-4 p-5">
        <div>
          <h2 className="font-display text-lg font-bold">Mentoring review</h2>
          <p className="text-muted-foreground text-sm">
            For this initial adult-only workflow, independently verify that each participant is at
            least 18 before granting access. Do not upload identification or sensitive personal
            details here. A reference records your review, not proof of age.
          </p>
        </div>
        {accounts.isError && (
          <p role="alert" className="text-destructive text-sm">
            Could not load accounts.
          </p>
        )}
        <label htmlFor="mentoring-review-account" className="block text-sm font-semibold">
          Mentoring participant account
        </label>
        <select
          id="mentoring-review-account"
          className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
          disabled={busy}
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
            reset();
          }}
        >
          <option value="">Select an account</option>
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} · {p.email} · {p.roleKey} · {p.status}
            </option>
          ))}
        </select>
        {accounts.hasNextPage && (
          <Button
            type="button"
            variant="outline"
            disabled={accounts.isFetchingNextPage}
            onClick={() => void accounts.fetchNextPage()}
          >
            Load more accounts
          </Button>
        )}
        {userId && (eligibility.isLoading || profile.isLoading) && (
          <p className="text-sm">Checking reviews…</p>
        )}
        {userId && (eligibility.isError || profile.isError) && (
          <p role="alert" className="text-destructive text-sm">
            Could not load review records.
          </p>
        )}
        {userId && eligibility.isSuccess && (
          <p className="text-sm">
            {eligibility.data.eligibility?.active
              ? `Eligibility active until ${new Date(eligibility.data.eligibility.expiresAt).toLocaleString()}.`
              : "No current adult eligibility."}
          </p>
        )}
        <label htmlFor="mentoring-age-reference" className="block text-sm font-semibold">
          Adult verification reference
        </label>
        <Input
          id="mentoring-age-reference"
          disabled={busy}
          value={reference}
          maxLength={240}
          onChange={(e) => setReference(e.target.value)}
        />
        <label htmlFor="mentoring-expiry" className="block text-sm font-semibold">
          Eligibility expiry (your local time; within one year)
        </label>
        <Input
          id="mentoring-expiry"
          type="datetime-local"
          disabled={busy}
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <label className="flex items-start gap-2 text-sm">
          <input
            className="mt-1"
            type="checkbox"
            disabled={busy}
            checked={adult}
            onChange={(e) => setAdult(e.target.checked)}
          />
          I independently verified that this account holder is an adult and recorded the reference.
        </label>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={
              !userId ||
              !eligibility.isSuccess ||
              busy ||
              !adult ||
              reference.trim().length < 3 ||
              Number.isNaN(date.getTime())
            }
            onClick={() =>
              grant.mutate({
                userId,
                active: true,
                adultVerified: true,
                reviewRef: reference.trim(),
                expiresAt: date.toISOString(),
              })
            }
          >
            Grant adult eligibility
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={!userId || !eligibility.isSuccess || !eligibility.data.eligibility || busy}
            onClick={() => grant.mutate({ userId, active: false })}
          >
            Revoke eligibility
          </Button>
        </div>
        {selected && (
          <div className="space-y-3 rounded-md border p-4">
            <p className="font-semibold text-sm">
              Mentor profile:{" "}
              {selected.visible
                ? selected.approvedAt
                  ? "approved"
                  : "awaiting review"
                : "withdrawn"}
            </p>
            <p className="text-sm">
              {selected.displayName} · {selected.focus}
            </p>
            <p className="text-muted-foreground whitespace-pre-wrap text-sm">{selected.bio}</p>
            <p className="text-muted-foreground text-xs">
              Consent: {selected.consentVersion}, {new Date(selected.consentAt).toLocaleString()}.
              Approval requires current adult eligibility.
            </p>
            {selected.visible && !selected.approvedAt && (
              <>
                <label
                  htmlFor="mentoring-profile-reference"
                  className="block text-sm font-semibold"
                >
                  Mentor screening reference
                </label>
                <Input
                  id="mentoring-profile-reference"
                  disabled={busy}
                  value={profileReference}
                  maxLength={240}
                  onChange={(e) => setProfileReference(e.target.value)}
                />
                <label className="flex items-start gap-2 text-sm">
                  <input
                    className="mt-1"
                    type="checkbox"
                    disabled={busy}
                    checked={reviewed}
                    onChange={(e) => setReviewed(e.target.checked)}
                  />
                  I independently reviewed this mentor’s identity, suitability and profile under the
                  academy’s safeguarding process.
                </label>
                <Button
                  type="button"
                  disabled={
                    busy ||
                    !reviewed ||
                    profileReference.trim().length < 3 ||
                    !eligibility.data?.eligibility?.active
                  }
                  onClick={() =>
                    approve.mutate({
                      userId,
                      revision: selected.revision,
                      reviewRef: profileReference.trim(),
                      confirmed: true,
                    })
                  }
                >
                  Approve mentor profile
                </Button>
              </>
            )}
          </div>
        )}
        {(grant.isError || approve.isError) && (
          <p role="alert" className="text-destructive text-sm">
            {(grant.error ?? approve.error) instanceof Error
              ? (grant.error ?? approve.error)?.message
              : "Review could not be saved."}{" "}
            If the response was interrupted, reload the record before retrying.
          </p>
        )}
        {(grant.isSuccess || approve.isSuccess) && (
          <p role="status" className="text-sm">
            Review change recorded.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
