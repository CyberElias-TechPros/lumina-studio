const TOUR_STORAGE_KEY = "cea:onboarding:tour:v1";

export function hasSeenTour(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(TOUR_STORAGE_KEY) !== null;
}

export function markTourSeen(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOUR_STORAGE_KEY, new Date().toISOString());
}

export interface TourStep {
  id: string;
  title: string;
  description: string;
  /** Optional CSS selector for the element to spotlight (falls back to centered). */
  target?: string;
}
