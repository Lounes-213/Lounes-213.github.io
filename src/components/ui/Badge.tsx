import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "outline";

const VARIANTS: Record<BadgeVariant, string> = {
  neutral: "bg-bg-subtle text-fg-muted border-border-subtle",
  accent: "bg-accent-soft text-accent-soft-text border-accent-soft-border",
  success: "bg-success-soft text-success-soft-text border-transparent",
  warning: "bg-warning-soft text-warning-soft-text border-transparent",
  outline: "bg-transparent text-fg-muted border-border-interactive",
};

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  /** Pulsing status dot — only meaningful for availability-style badges. */
  dot?: boolean;
  icon?: ReactNode;
  className?: string;
};

export function Badge({ children, variant = "neutral", dot = false, icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border px-3 py-1 text-caption font-medium",
        VARIANTS[variant],
        className,
      )}
    >
      {dot && (
        <span aria-hidden className="relative inline-flex size-2 items-center justify-center">
          <span className="absolute inline-flex size-2 rounded-pill bg-current opacity-70 motion-safe:animate-ping" />
          <span className="relative inline-flex size-1.5 rounded-pill bg-current" />
        </span>
      )}
      {icon}
      {children}
    </span>
  );
}
