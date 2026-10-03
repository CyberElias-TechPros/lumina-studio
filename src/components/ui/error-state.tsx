"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/errors";

interface ErrorStateProps {
  title?: string;
  error?: unknown;
  onRetry?: () => void;
  className?: string;
}

/** Standard error state for query-driven screens (sits inside QueryState). */
export function ErrorState({
  title = "Couldn't load this",
  error,
  onRetry,
  className,
}: ErrorStateProps) {
  const message = error !== undefined ? getErrorMessage(error) : "Something went wrong on our end.";
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-12 text-center ${className ?? ""}`}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-5" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" className="mt-2" onClick={onRetry}>
          <RefreshCw className="size-3.5" />
          Try again
        </Button>
      ) : null}
    </div>
  );
}
