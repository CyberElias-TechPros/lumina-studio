"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMentoringRequest, getMentoringDirectory } from "@/lib/api/mentoring";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MentoringRequests } from "./requests";

export function MentoringDirectory() {
  const [search, setSearch] = useState(""),
    [mentorId, setMentorId] = useState(""),
    [goal, setGoal] = useState("");
  const client = useQueryClient(),
    directory = useQuery({
      queryKey: ["mentoring", "directory", search],
      queryFn: () => getMentoringDirectory(search),
    });
  const send = useMutation({
    mutationFn: createMentoringRequest,
    retry: false,
    onSuccess: async () => {
      setGoal("");
      setMentorId("");
      await client.invalidateQueries({ queryKey: ["mentoring", "requests"] });
    },
  });
  const selected = directory.data?.items.find((p) => p.id === mentorId);
  return (
    <div className="space-y-5">
      <Card className="bg-card border shadow-soft">
        <CardContent className="space-y-4 p-5">
          <div>
            <h2 className="font-display text-lg font-bold">Find a mentor</h2>
            <p className="text-muted-foreground text-sm">
              Profiles are submitted by mentors and reviewed by an administrator. Search uses text
              matches, not compatibility scores. The initial workflow is for adults whose
              eligibility has been confirmed by the Academy.
            </p>
          </div>
          <label htmlFor="mentoring-search" className="block text-sm font-semibold">
            Search profiles
          </label>
          <Input
            id="mentoring-search"
            maxLength={100}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setMentorId("");
            }}
          />
          {directory.isLoading && <p className="text-sm">Loading mentors…</p>}
          {directory.isError && (
            <p role="alert" className="text-destructive text-sm">
              Could not load the directory.
            </p>
          )}
          {directory.data?.items.length === 0 && (
            <p className="text-muted-foreground text-sm">No reviewed profiles match this search.</p>
          )}
          {directory.data?.truncated && (
            <p className="text-sm">Showing the first 100 profiles; refine your search for more.</p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {directory.data?.items.map((p) => (
              <div key={p.id} className="space-y-2 rounded-md border p-4">
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm">{p.focus}</p>
                <p className="text-muted-foreground whitespace-pre-wrap text-sm">{p.bio}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={send.isPending}
                  onClick={() => {
                    setMentorId(p.id);
                    send.reset();
                  }}
                >
                  Request mentorship
                </Button>
              </div>
            ))}
          </div>
          {selected && (
            <form
              className="space-y-3 rounded-md border p-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (goal.trim().length >= 3)
                  send.mutate({ mentorId: selected.id, goal: goal.trim() });
              }}
            >
              <h3 className="font-semibold">Request {selected.name}</h3>
              <p className="text-muted-foreground text-sm">
                Your account name and the goal below will be shared with this mentor. Do not include
                contact details or sensitive personal information. The Academy coordinates any
                meeting after acceptance; cancellation does not erase the request record.
              </p>
              <label htmlFor="mentoring-goal" className="block text-sm font-semibold">
                What would you like help with?
              </label>
              <textarea
                id="mentoring-goal"
                required
                minLength={3}
                maxLength={600}
                disabled={send.isPending}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="border-input bg-background min-h-24 w-full rounded-md border px-3 py-2 text-sm"
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={send.isPending}>
                  Send request
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={send.isPending}
                  onClick={() => setMentorId("")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
          {send.isError && (
            <p role="alert" className="text-destructive text-sm">
              {send.error instanceof Error ? send.error.message : "Could not send the request."} Ask
              the Academy to confirm your eligibility if needed.
            </p>
          )}
          {send.isSuccess && (
            <p role="status" className="text-sm">
              Request sent for the mentor to review.
            </p>
          )}
        </CardContent>
      </Card>
      <MentoringRequests direction="outgoing" />
    </div>
  );
}
