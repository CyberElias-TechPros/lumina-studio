"use client";

import { useSyncExternalStore } from "react";
import { getProgressSnapshot, progressState, subscribeToProgress } from "@/lib/learning/progress";

export function useProgress() {
  const snapshot = useSyncExternalStore(subscribeToProgress, getProgressSnapshot, () => null);
  return progressState(snapshot);
}
