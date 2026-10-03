import { createFileRoute } from "@/lib/next-compat/route-definition";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/programs/compare")({
  beforeLoad: () => redirectPublic("/classes"),
  component: () => null,
});
