"use client";

import { useLocale, useTranslations } from "next-intl";
import { Compass, Layers, Mail, Smartphone } from "@/components/icons";
import { useActiveSection } from "@/components/layout/useActiveSection";
import { site } from "@/content/site";
import type { SectionId } from "@/content/schema";
import { cn } from "@/lib/utils/cn";

/** Key destinations visitors need on mobile, including Work. */
const TAB_IDS = ["work", "about", "skills", "contact"] as const satisfies readonly SectionId[];

const TAB_ICONS = {
  work: Smartphone,
  about: Compass,
  skills: Layers,
  contact: Mail,
} as const;

/**
 * Mobile navigation as a bottom tab bar rather than a hamburger drawer: the
 * destinations sit inside thumb reach, each target is at least 44×44 px, and
 * there is no overlay to dismiss. Hidden from `lg` up, where the header nav
 * takes over. The page reserves space for it with padding, so it never covers
 * the last line of a section.
 */
export function MobileTabBar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const active = useActiveSection(TAB_IDS);

  return (
    <nav
      aria-label={t("mobile")}
      className="glass fixed inset-x-0 bottom-0 z-tabbar pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto flex max-w-content items-stretch justify-between px-2">
        {TAB_IDS.map((id) => {
          const Icon = TAB_ICONS[id];
          const item = site.navigation.find((entry) => entry.id === id);
          if (!item) return null;
          const isActive = active === id;
          const destinationHref = id === "contact" ? `/${locale}/contact` : item.href;

          return (
            <li key={id} className="flex-1">
              <a
                href={destinationHref}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative flex min-h-tabbar flex-col items-center justify-center gap-0.5 px-2 text-[11px] font-medium",
                  "transition-all duration-200 active:scale-95",
                  isActive ? "text-accent font-semibold" : "text-fg-muted hover:text-fg",
                )}
              >
                <Icon size={18} className={cn("transition-transform duration-200", isActive && "scale-110 text-accent")} />
                <span>{t(id)}</span>
                {isActive && (
                  <span className="absolute bottom-1 h-0.5 w-3 rounded-full bg-accent animate-pulse" />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
