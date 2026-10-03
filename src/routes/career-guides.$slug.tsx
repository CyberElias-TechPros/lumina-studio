import { createFileRoute } from "@/lib/next-compat/route-definition";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/career-guides/$slug")({
  beforeLoad: () => redirectPublic("/classes"),
  component: () => null,
});
