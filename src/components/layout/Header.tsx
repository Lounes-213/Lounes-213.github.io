"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Download } from "@/components/icons";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useActiveSection } from "@/components/layout/useActiveSection";
import { ButtonLink } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";

const NAV_IDS = site.navigation.map((item) => item.id);

/**
 * Sticky header with small profile picture (pdp) and mobile-optimized layout.
 */
export function Header() {
  const t = useTranslations("nav");
  const [lifted, setLifted] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-header transition-all dur-3",
        lifted ? "glass shadow-xs" : "bg-transparent",
      )}
    >
      <div className="container-page flex h-header items-center justify-between gap-3 px-3 sm:px-6">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-2.5 rounded-control py-1 transition-all duration-300",
            lifted
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none",
          )}
          aria-label={profile.name}
        >
          {profile.portrait.image ? (
            <div className="relative size-8 sm:size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/30 shadow-sm transition-transform hover:scale-105">
              <Image
                src={profile.portrait.image}
                alt={profile.name}
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <span
              className="grid size-8 sm:size-9 place-items-center rounded-full bg-accent font-display text-body font-semibold text-on-accent"
              aria-hidden="true"
            >
              {profile.initials}
            </span>
          )}
          <span className="font-display text-body sm:text-lead font-semibold tracking-tight text-fg">
            {profile.name}
          </span>
        </Link>

        <nav aria-label={t("main")} className="hidden items-center gap-0.5 lg:flex">
          {site.navigation.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-control px-3 py-2 text-body transition-colors dur-2",
                  isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                {t(item.id)}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-px origin-center bg-accent transition-transform dur-2 ease-out-expo",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/cv-lounes-benseba.pdf"
            download="CV_Lounes_Benseba.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-control border border-border-interactive/60 bg-surface/80 px-2.5 py-1.5 text-xs font-semibold text-fg hover:bg-surface-elevated hover:border-accent/40 transition-all shadow-xs"
            title="Download Resume / CV (PDF)"
          >
            <Download size={13} />
            <span className="hidden sm:inline">CV</span>
          </a>
          <LanguageSwitcher />
          <ThemeToggle />
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            {t("contact")}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
