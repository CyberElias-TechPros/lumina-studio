"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMentoringProfile,
  saveMentoringProfile,
  withdrawMentoringProfile,
} from "@/lib/api/mentoring";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function MentoringProfileEditor() {
  const client = useQueryClient(),
    query = useQuery({ queryKey: ["mentoring", "my-profile"], queryFn: getMentoringProfile });
  const [name, setName] = useState(""),
    [focus, setFocus] = useState(""),
    [bio, setBio] = useState(""),
    [consent, setConsent] = useState(false);
  useEffect(() => {
    const p = query.data?.profile;
    if (p) {
      setName(p.displayName);
      setFocus(p.focus);
      setBio(p.bio);
    }
  }, [query.data]);
  const refresh = async () => {
    await Promise.all([
      client.invalidateQueries({ queryKey: ["mentoring", "my-profile"] }),
      client.invalidateQueries({ queryKey: ["mentoring", "directory"] }),
    ]);
  };
  const save = useMutation({
    mutationFn: saveMentoringProfile,
    retry: false,
    onSuccess: async () => {
      setConsent(false);
      await refresh();
    },
  });
  const withdraw = useMutation({
    mutationFn: withdrawMentoringProfile,
    retry: false,
    onSuccess: refresh,
  });
  const busy = save.isPending || withdraw.isPending,
    p = query.data?.profile;
  return (
    <Card className="bg-card border shadow-soft">
      <CardContent className="space-y-4 p-5">
        <div>
          <h2 className="font-display text-lg font-bold">Your mentor profile</h2>
          <p className="text-muted-foreground text-sm">
            After administrator review, signed-in students, alumni and mentors can see your display
            name, focus and bio. Do not include phone numbers, addresses or sensitive information.
          </p>
        </div>
        <p className="text-muted-foreground text-sm">
          Saving submits this profile for review. Editing requires a new review. You can withdraw it
          here; withdrawal hides it from the directory and prevents new requests, but existing
          request records are retained for follow-up and administration.
        </p>
        {query.isError && (
          <p role="alert" className="text-destructive text-sm">
            Could not load your profile.
          </p>
        )}
        {query.isSuccess && (
          <p className="text-sm">
            {!p
              ? "No profile submitted."
              : !p.visible
                ? "Profile withdrawn."
                : p.approved
                  ? "Profile reviewed; listing also requires current eligibility."
                  : "Profile submitted; awaiting review."}
          </p>
        )}
        <label htmlFor="mentor-display-name" className="block text-sm font-semibold">
          Display name
        </label>
        <Input
          id="mentor-display-name"
          maxLength={100}
          disabled={busy}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="mentor-focus" className="block text-sm font-semibold">
          Mentoring focus
        </label>
        <Input
          id="mentor-focus"
          maxLength={120}
          disabled={busy}
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
        />
        <label htmlFor="mentor-bio" className="block text-sm font-semibold">
          Short bio
        </label>
        <textarea
          id="mentor-bio"
          className="border-input bg-background min-h-24 w-full rounded-md border px-3 py-2 text-sm"
          maxLength={1000}
          disabled={busy}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <label className="flex items-start gap-2 text-sm">
          <input
            className="mt-1"
            type="checkbox"
            disabled={busy}
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          I agree to share these profile details with signed-in directory users after review, and
          understand I can withdraw this listing here.
        </label>
        {(save.isError || withdraw.isError) && (
          <p role="alert" className="text-destructive text-sm">
            {(save.error ?? withdraw.error) instanceof Error
              ? (save.error ?? withdraw.error)?.message
              : "Could not update your profile."}
          </p>
        )}
        {save.isSuccess && (
          <p role="status" className="text-sm">
            Profile submitted for review.
          </p>
        )}
        {withdraw.isSuccess && (
          <p role="status" className="text-sm">
            Profile withdrawn from the directory.
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={
              !query.isSuccess ||
              busy ||
              !consent ||
              name.trim().length < 2 ||
              focus.trim().length < 2 ||
              bio.trim().length < 10
            }
            onClick={() =>
              save.mutate({
                displayName: name.trim(),
                focus: focus.trim(),
                bio: bio.trim(),
                consent: true,
              })
            }
          >
            Submit for review
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={busy || !p?.visible}
            onClick={() => withdraw.mutate()}
          >
            Withdraw listing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
