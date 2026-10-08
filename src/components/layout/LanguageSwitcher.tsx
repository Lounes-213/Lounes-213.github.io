"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter as useNextRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Check, Globe } from "@/components/icons";
import { getPathname, usePathname } from "@/lib/i18n/navigation";
import { isLocale, localeNames, locales, type Locale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils/cn";

const COOKIE = "NEXT_LOCALE";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Switches locale without losing the visitor's place.
 *
 * Design notes: the label is always the language's own name (a language is never
 * called by a foreign name), the current locale is announced as checked, and the
 * switch preserves both the path *and* the anchor, so someone reading
 * `#services` in French lands on `#services` in Arabic. The preference is written
 * to the same cookie the middleware reads, which is what makes the choice stick
 * on the next visit.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useNextRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef(new Map<Locale, HTMLButtonElement>());
  const menuId = useId();

  const current: Locale = isLocale(locale) ? locale : "en";

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    // The first item receives focus so keyboard users continue from where they are.
    itemRefs.current.get(current)?.focus();

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, current]);

  const switchTo = (next: Locale) => {
    setOpen(false);
    if (next === current) return;
    document.cookie = `${COOKIE}=${next}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
    const hash = window.location.hash;
    // getPathname returns the fully localized path; the plain Next router keeps
    // the anchor, which the locale-aware router would drop.
    router.replace(`${getPathname({ href: pathname, locale: next })}${hash}`, { scroll: false });
  };

  const onMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const index = locales.indexOf(current);
    const offset = event.key === "ArrowDown" ? 1 : -1;
    const next = locales[(index + offset + locales.length) % locales.length];
    if (next) itemRefs.current.get(next)?.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={t("toggle")}
        title={t("toggle")}
        className={cn(
          "inline-flex size-11 items-center justify-center gap-1.5 rounded-control border border-border-subtle text-fg-muted",
          "transition-colors dur-2 hover:bg-bg-subtle hover:text-fg",
        )}
      >
        <Globe size={18} />
        <span className="text-caption font-medium" aria-hidden="true">
          {localeNames[current].tag}
        </span>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={t("label")}
          onKeyDown={onMenuKeyDown}
          className="glass-panel absolute end-0 top-[calc(100%+0.5rem)] z-modal w-48 overflow-hidden p-1"
        >
          {locales.map((value) => {
            const isCurrent = value === current;
            return (
              <button
                key={value}
                ref={(node) => {
                  if (node) itemRefs.current.set(value, node);
                  else itemRefs.current.delete(value);
                }}
                type="button"
                role="menuitemradio"
                aria-checked={isCurrent}
                onClick={() => switchTo(value)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-[calc(var(--radius-control)-3px)] px-3 py-2 text-start text-body",
                  "transition-colors dur-2 hover:bg-surface",
                  isCurrent ? "text-fg" : "text-fg-muted",
                )}
              >
                <span className="flex flex-col">
                  <span>{localeNames[value].native}</span>
                  <span className="text-caption text-fg-subtle ltr-island">{localeNames[value].english}</span>
                </span>
                {isCurrent && <Check size={16} className="text-accent-text" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
