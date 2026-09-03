import { Link } from "react-router-dom";
import { Button, EmptyState } from "../components/ui.tsx";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <EmptyState
        title="Page not found"
        description="That address does not exist in this workspace."
        action={<Link to="/"><Button size="sm">Back to dashboard</Button></Link>}
      />
    </div>
  );
}
