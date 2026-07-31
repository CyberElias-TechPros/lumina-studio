type TrackEvent = {
  name: string;
  props?: Record<string, string | number | boolean>;
};

const queue: TrackEvent[] = [];

export function track(name: string, props?: TrackEvent["props"]) {
  queue.push({ name, props });
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("cea:analytics", { detail: { name, props, ts: Date.now() } }),
    );
  }
}

export function flushAnalytics() {
  const batch = queue.splice(0, queue.length);
  console.debug("[analytics] flush", batch.length, batch);
}

if (typeof window !== "undefined") {
  window.addEventListener("cea:analytics", (e) => {
    console.debug("[analytics]", (e as CustomEvent).detail);
  });
}
