import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { AlertTriangle, CheckCircle2, Info, Loader2, X, XCircle } from "lucide-react";
import { ApiError } from "../api/client.ts";

/* ------------------------------------------------------------------- button */

type Variant = "primary" | "secondary" | "ghost" | "danger" | "subtle";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-700 text-white hover:bg-brand-800 disabled:bg-brand-300",
  secondary: "border border-ink-300 bg-white text-ink-800 hover:bg-ink-50 disabled:text-ink-400",
  ghost: "text-ink-700 hover:bg-ink-100 disabled:text-ink-400",
  danger: "bg-red-700 text-white hover:bg-red-800 disabled:bg-red-300",
  subtle: "bg-brand-50 text-brand-800 hover:bg-brand-100 disabled:text-brand-300",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  disabled,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; loading?: boolean }) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------- cards */

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function CardHeader({ title, subtitle, action }: { title: ReactNode; subtitle?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-200 px-4 py-3 sm:px-5">
      <div>
        <h2 className="text-base font-semibold text-ink-900">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-ink-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* ------------------------------------------------------------------- inputs */

export function Field({
  label,
  error,
  hint,
  required,
  children,
  htmlFor,
}: {
  label: string;
  error?: string | null;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-0.5 text-red-700">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const CONTROL =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 disabled:bg-ink-100 disabled:text-ink-500";

export function Input({
  invalid,
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return <input {...rest} className={`${CONTROL} ${invalid ? "border-red-500" : "border-ink-300"} ${className}`} />;
}

export function Textarea({
  invalid,
  className = "",
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      {...rest}
      className={`${CONTROL} ${invalid ? "border-red-500" : "border-ink-300"} min-h-20 ${className}`}
    />
  );
}

export function Select({
  invalid,
  className = "",
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select
      {...rest}
      className={`${CONTROL} ${invalid ? "border-red-500" : "border-ink-300"} ${className}`}
    >
      {children}
    </select>
  );
}

/** Money input: accepts "45,000.50", right-aligned and tabular. */
export function MoneyInput({
  invalid,
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      {...rest}
      inputMode="decimal"
      className={`${CONTROL} tnum text-right ${invalid ? "border-red-500" : "border-ink-300"} ${className}`}
    />
  );
}

/* ------------------------------------------------------------------- badges */

const TONES = {
  neutral: "bg-ink-100 text-ink-700 border-ink-200",
  green: "bg-brand-50 text-brand-800 border-brand-200",
  amber: "bg-amber-50 text-amber-900 border-amber-200",
  red: "bg-red-50 text-red-800 border-red-200",
  blue: "bg-blue-50 text-blue-900 border-blue-200",
  purple: "bg-purple-50 text-purple-900 border-purple-200",
} as const;

export type Tone = keyof typeof TONES;

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string): Tone {
  switch (status) {
    case "paid":
    case "delivered":
    case "received":
      return "green";
    case "partial":
    case "in_transit":
    case "ordered":
      return "blue";
    case "overdue":
    case "exception":
    case "cancelled":
      return "red";
    case "void":
      return "neutral";
    case "draft":
    case "pending":
      return "amber";
    default:
      return "neutral";
  }
}

/* -------------------------------------------------------------------- table */

export function Table({ head, children }: { head: ReactNode[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink-200 bg-ink-50 text-left text-xs font-semibold tracking-wide text-ink-600 uppercase">
            {head.map((cell, i) => (
              <th key={i} className="px-4 py-2.5 font-semibold whitespace-nowrap">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-2.5 align-middle ${className}`}>{children}</td>;
}

/* ------------------------------------------------------- loading and states */

export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-sm text-ink-500" role="status">
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      {label}…
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <div className="rounded-full bg-ink-100 p-3">
        <Info className="h-5 w-5 text-ink-500" aria-hidden />
      </div>
      <p className="text-sm font-semibold text-ink-800">{title}</p>
      {description && <p className="max-w-sm text-sm text-ink-500">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const message =
    error instanceof ApiError
      ? error.message
      : error instanceof Error
        ? error.message
        : "Something went wrong.";
  const requestId = error instanceof ApiError ? error.requestId : undefined;

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center" role="alert">
      <div className="rounded-full bg-red-50 p-3">
        <XCircle className="h-5 w-5 text-red-700" aria-hidden />
      </div>
      <p className="text-sm font-semibold text-ink-900">{message}</p>
      {requestId && <p className="font-mono text-xs text-ink-400">ref {requestId}</p>}
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="mt-2">
          Try again
        </Button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------- modal */

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  // Escape closes, and focus is trapped for the lifetime of the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/50 p-0 sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-xl bg-white shadow-xl sm:rounded-xl"
      >
        <div className="flex items-center justify-between border-b border-ink-200 px-5 py-3">
          <h2 className="text-base font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-md p-1 text-ink-500 hover:bg-ink-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-ink-200 px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- toasts */

interface Toast {
  id: number;
  tone: "success" | "error" | "info";
  message: string;
}

const ToastContext = createContext<{ push: (tone: Toast["tone"], message: string) => void }>({ push: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((tone: Toast["tone"], message: string) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, tone, message }]);
    window.setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 5000);
  }, []);

  const value = useMemo(() => ({ push }), [push]);
  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-brand-700" aria-hidden />,
    error: <AlertTriangle className="h-4 w-4 text-red-700" aria-hidden />,
    info: <Info className="h-4 w-4 text-blue-700" aria-hidden />,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="no-print pointer-events-none fixed right-4 bottom-4 z-[60] flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-start gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm shadow-lg"
          >
            {icons[toast.tone]}
            <span className="flex-1 text-ink-800">{toast.message}</span>
            <button
              type="button"
              aria-label="Dismiss"
              className="text-ink-400 hover:text-ink-700"
              onClick={() => setToasts((current) => current.filter((t) => t.id !== toast.id))}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* --------------------------------------------------------------- utilities */

/** Turns an ApiError's field map into something `<Field error={...}>` can use. */
export function fieldErrors(error: unknown): Record<string, string> {
  return error instanceof ApiError ? error.fields : {};
}

export function errorMessage(error: unknown): string | null {
  if (!error) return null;
  return error instanceof Error ? error.message : "Something went wrong.";
}
