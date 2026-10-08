import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";

/**
 * One shape, four intents, three sizes. The classes are exported too, so an
 * anchor that must stay a server component can borrow them without importing a
 * client component.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-on-accent border border-transparent shadow-1 hover:bg-accent-hover hover:shadow-2 active:translate-y-px",
  secondary:
    "bg-surface text-fg border border-border-interactive hover:bg-bg-subtle hover:border-border-strong active:translate-y-px",
  ghost:
    "bg-transparent text-fg-muted border border-transparent hover:bg-bg-subtle hover:text-fg active:translate-y-px",
  danger:
    "bg-danger text-on-danger border border-transparent hover:brightness-110 active:translate-y-px",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-caption gap-1.5",
  md: "min-h-11 px-4 text-body gap-2",
  lg: "min-h-13 px-6 text-lead gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-control font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] dur-2 ease-standard " +
  "focus-visible:outline-focus select-none whitespace-nowrap";

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  iconStart,
  iconEnd,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...props}>
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
};

/** Locale-aware link that looks like a button. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  iconStart,
  iconEnd,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {iconStart}
      {children}
      {iconEnd}
    </Link>
  );
}
