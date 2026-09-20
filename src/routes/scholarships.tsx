import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/scholarships")({
  beforeLoad: () => redirectPublic("/admissions"),
  component: () => null,
});
