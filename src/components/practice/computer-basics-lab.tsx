"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FolderOpen, Keyboard, MousePointer2, RotateCcw } from "lucide-react";
import { LabProgressControl } from "@/components/practice/learning-progress";
import { trackLearningEvent } from "@/lib/learning/measurement";

const practiceSentence = "I can practise.";

export function ComputerBasicsLab() {
  const [targetPressed, setTargetPressed] = useState(false);
  const [typed, setTyped] = useState("");
  const [typingChecked, setTypingChecked] = useState(false);
  const [fileName, setFileName] = useState("");
  const [folder, setFolder] = useState("");
  const [saved, setSaved] = useState(false);
  const typingCorrect = typed.trim() === practiceSentence;
  const completed = [targetPressed, typingChecked && typingCorrect, saved].filter(Boolean).length;
  const startReported = useRef(false);
  const completionReported = useRef(false);
  function reportStart() {
    if (!startReported.current) startReported.current = trackLearningEvent("cea_lab_started");
  }
  useEffect(() => {
    if (completed === 3 && !completionReported.current) {
      completionReported.current = trackLearningEvent("cea_lab_completed");
    }
  }, [completed]);

  function reset() {
    setTargetPressed(false);
    setTyped("");
    setTypingChecked(false);
    setFileName("");
    setFolder("");
    setSaved(false);
  }

  return (
    <section aria-label="Computer basics activities" className="space-y-6">
      <div className="rounded-2xl bg-[#101f34] p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#a4dce7] uppercase">
              Your practice trail
            </p>
            <p className="font-display mt-2 text-xl font-semibold">
              Try each activity at your own pace.
            </p>
          </div>
          <span className="rounded-full border border-white/30 px-3 py-1 text-sm">
            {completed} of 3 practised
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Activities practised"
          aria-valuemin={0}
          aria-valuemax={3}
          aria-valuenow={completed}
          aria-valuetext={`${completed} of 3 activities practised`}
          className="mt-5 h-2 overflow-hidden rounded-full bg-white/20"
        >
          <div
            className="h-full rounded-full bg-[#8ed9e4] transition-[width] motion-reduce:transition-none"
            style={{ width: `${(completed / 3) * 100}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-slate-200">
          No timer or score. Try again as often as you like.
        </p>
      </div>

      <section
        aria-labelledby="pointer-title"
        className="border-border bg-card rounded-2xl border p-5 sm:p-7"
      >
        <p className="text-primary flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
          <MousePointer2 aria-hidden="true" className="size-4" /> Activity 01 · Point
        </p>
        <h2 id="pointer-title" className="font-display mt-3 text-2xl font-semibold">
          Choose a target
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Move your pointer to the circle and click it once. On a phone, tap it. You can also use
          Tab to focus it and press Enter or Space.
        </p>
        <div className="mt-5 grid min-h-40 place-items-center rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4">
          <button
            type="button"
            onClick={() => {
              reportStart();
              setTargetPressed(true);
            }}
            className="bg-primary text-primary-foreground grid size-24 place-items-center rounded-full text-sm font-semibold shadow-sm transition-transform hover:scale-105 motion-reduce:transition-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            <span>
              Click or
              <br />
              tap here
            </span>
          </button>
        </div>
        <p aria-live="polite" className="text-primary mt-3 min-h-6 text-sm font-semibold">
          {targetPressed ? "You selected the target. Nice work." : " "}
        </p>
      </section>

      <section
        aria-labelledby="typing-title"
        className="border-border bg-card rounded-2xl border p-5 sm:p-7"
      >
        <p className="text-primary flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
          <Keyboard aria-hidden="true" className="size-4" /> Activity 02 · Type
        </p>
        <h2 id="typing-title" className="font-display mt-3 text-2xl font-semibold">
          Type a short sentence
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Click or tap the box, then type the sentence below exactly, including the full stop. Take
          your time. Please don't enter personal information.
        </p>
        <p className="border-border bg-muted/40 mt-4 rounded-lg border px-4 py-3 font-medium">
          {practiceSentence}
        </p>
        <label htmlFor="lab-typing" className="mt-4 block text-sm font-semibold">
          Your practice sentence
        </label>
        <textarea
          id="lab-typing"
          rows={3}
          maxLength={100}
          value={typed}
          onChange={(event) => {
            reportStart();
            setTyped(event.target.value);
            setTypingChecked(false);
          }}
          className="border-input bg-background focus-visible:ring-ring mt-2 w-full rounded-lg border p-3 text-base focus-visible:ring-2 focus-visible:outline-none"
        />
        <button
          type="button"
          disabled={!typed.trim()}
          onClick={() => setTypingChecked(true)}
          className="bg-primary text-primary-foreground mt-3 min-h-11 rounded-lg px-5 text-sm font-semibold disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Check my sentence
        </button>
        <p aria-live="polite" className="mt-3 text-sm leading-relaxed">
          {typingChecked &&
            (typingCorrect
              ? "That matches. You typed the sentence!"
              : "Not quite the same yet. Compare the letters, spaces and full stop, then try again.")}
        </p>
      </section>

      <section
        aria-labelledby="saving-title"
        className="border-border bg-card rounded-2xl border p-5 sm:p-7"
      >
        <p className="text-primary flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
          <FolderOpen aria-hidden="true" className="size-4" /> Activity 03 · Save
        </p>
        <h2 id="saving-title" className="font-display mt-3 text-2xl font-semibold">
          Practise naming a file
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Choose a clear practice name and a folder. This is a simulation: it does not create or
          save a real file. Do not enter personal information.
        </p>
        <div className="bg-muted/40 mt-4 grid gap-4 rounded-xl p-4">
          <div>
            <label htmlFor="lab-file-name" className="block text-sm font-semibold">
              Practice file name
            </label>
            <input
              id="lab-file-name"
              value={fileName}
              maxLength={40}
              onChange={(event) => {
                reportStart();
                setFileName(event.target.value);
                setSaved(false);
              }}
              placeholder="e.g. My practice"
              className="border-input bg-background focus-visible:ring-ring mt-2 min-h-11 w-full rounded-lg border px-3 text-base focus-visible:ring-2 focus-visible:outline-none"
            />
          </div>
          <div>
            <label htmlFor="lab-folder" className="block text-sm font-semibold">
              Choose a practice folder
            </label>
            <select
              id="lab-folder"
              value={folder}
              onChange={(event) => {
                reportStart();
                setFolder(event.target.value);
                setSaved(false);
              }}
              className="border-input bg-background focus-visible:ring-ring mt-2 min-h-11 w-full rounded-lg border px-3 text-base focus-visible:ring-2 focus-visible:outline-none"
            >
              <option value="">Choose a folder</option>
              <option value="Documents">Documents</option>
              <option value="Desktop">Desktop</option>
            </select>
          </div>
          <button
            type="button"
            disabled={!fileName.trim() || !folder}
            onClick={() => setSaved(true)}
            className="bg-primary text-primary-foreground min-h-11 justify-self-start rounded-lg px-5 text-sm font-semibold disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Practise saving
          </button>
        </div>
        <div aria-live="polite">
          {saved && (
            <p className="text-primary mt-4 text-sm font-medium">
              In this example, “{fileName.trim()}” is named in {folder}. No real file was saved. A
              clear name and remembered location help you find work later.
            </p>
          )}
        </div>
      </section>
      {completed === 3 && (
        <div
          role="status"
          className="border-primary/25 bg-primary/5 flex gap-3 rounded-xl border p-5"
        >
          <Check aria-hidden="true" className="text-primary size-5 shrink-0" />
          <p className="text-sm leading-relaxed">
            <strong>You've tried all three activities.</strong> This is a starting point, not a
            certificate or a measure of everything you can do. Explore the lessons below or repeat
            an activity.
          </p>
        </div>
      )}
      <LabProgressControl activitiesComplete={completed === 3} />
      <button
        type="button"
        onClick={reset}
        className="text-primary inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:ring-ring"
      >
        <RotateCcw aria-hidden="true" className="size-4" /> Clear and start again
      </button>
      <p className="text-muted-foreground text-xs leading-relaxed">
        Inputs stay in this page while it is open; they are not submitted or saved by this lab and
        will be cleared on refresh. “Clear and start again” only clears these inputs, not an
        optional saved completion mark; clear that from your learning trail. On a shared device,
        clear your work when finished.
      </p>
    </section>
  );
}
