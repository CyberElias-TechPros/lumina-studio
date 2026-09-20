import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/events")({
  beforeLoad: () => redirectPublic("/visit"),
  component: () => null,
});
