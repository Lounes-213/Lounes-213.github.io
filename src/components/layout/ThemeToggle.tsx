"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Moon, Monitor, Sun } from "@/components/icons";
import { useTheme, useMounted } from "@/lib/theme/provider";
import { originFromElement } from "@/lib/theme/transitions";
import { THEME_MODES, type ThemeMode } from "@/lib/theme/script";
import { cn } from "@/lib/utils/cn";

/**
 * Icon-only toggle for the header: one press flips to the opposite of what is on
 * screen. Both icons are always rendered and swapped by CSS attribute selectors,
 * so the correct one is painted before hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("theme");
  const { toggle } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => toggle(originFromElement(ref.current))}
      title={t("toggle")}
      aria-label={t("toggle")}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-control border border-border-subtle text-fg-muted",
        "transition-colors dur-2 hover:bg-bg-subtle hover:text-fg",
        className,
      )}
    >
      <span className="theme-light">
        <Moon size={18} />
      </span>
      <span className="theme-dark">
        <Sun size={18} />
      </span>
    </button>
  );
}

const MODE_ICONS: Record<ThemeMode, typeof Sun> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

/**
 * Three-way control for the footer: System / Light / Dark.
 *
 * The active state is applied by CSS from `data-theme-mode`, so it is correct
 * before hydration. `aria-checked` is only added after mount to keep the server
 * and first client render identical.
 */
export function ThemeModeControl() {
  const t = useTranslations("theme");
  const { mode, setMode } = useTheme();
  const mounted = useMounted();
  const groupRef = useRef<HTMLDivElement>(null);

  const activeClassName: Record<ThemeMode, string> = {
    system: "mode-active-system",
    light: "mode-active-light",
    dark: "mode-active-dark",
  };

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label={t("label")}
      className="inline-flex items-center gap-1 rounded-control border border-border-subtle bg-surface-sunken p-1"
    >
      {THEME_MODES.map((value) => {
        const Icon = MODE_ICONS[value];
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={mounted ? mode === value : undefined}
            onClick={(event) => setMode(value, originFromElement(event.currentTarget))}
            className={cn(
              "inline-flex min-h-9 items-center gap-1.5 rounded-[calc(var(--radius-control)-3px)] px-2.5 text-caption text-fg-muted",
              "transition-colors dur-2 hover:text-fg",
              activeClassName[value],
            )}
          >
            <Icon size={14} />
            <span>{t(value)}</span>
          </button>
        );
      })}
    </div>
  );
}
