"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { skills } from "@/content/skills";
import type { SkillItem } from "@/content/schema";
import { pick } from "@/content/schema";
import { isLocale, type Locale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils/cn";

const LEVELS = [1, 2, 3, 4, 5] as const;

/** Message keys are static so the catalogue stays type-checked. */
const LEVEL_KEYS = {
  1: "levels.1",
  2: "levels.2",
  3: "levels.3",
  4: "levels.4",
  5: "levels.5",
} as const;

function ProficiencyMeter({ level, label }: { level: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden="true" className="inline-flex items-end gap-0.5">
        {LEVELS.map((step) => (
          <span
            key={step}
            className={cn(
              "w-1 rounded-[2px]",
              step <= level ? "bg-accent" : "bg-border-strong",
              step === 5 ? "h-3.5" : step === 4 ? "h-3" : step === 3 ? "h-2.5" : step === 2 ? "h-2" : "h-1.5",
            )}
          />
        ))}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

function SkillCard({ item, locale }: { item: SkillItem; locale: Locale }) {
  const t = useTranslations("skills");

  return (
    <li className="panel flex flex-col gap-2 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-body text-fg ltr-island">{item.name}</p>
        {item.highlight && <Badge variant="accent">{t("highlighted")}</Badge>}
      </div>

      <div className="flex items-center gap-3">
        <ProficiencyMeter level={item.level} label={t("proficiencyScaleLabel", { level: item.level })} />
        <span className="text-caption text-fg-subtle">
          {t(LEVEL_KEYS[item.level as (typeof LEVELS)[number]] ?? "levels.3")}
          {item.years ? ` · ${t("experience", { count: item.years })}` : ""}
        </span>
      </div>

      {item.note && <p className="text-caption text-fg-muted">{pick(item.note, locale)}</p>}
    </li>
  );
}

type SkillsProps = { locale: Locale };

/**
 * The stack map.
 *
 * It is a real ARIA tablist — roving tabindex, arrow keys that respect writing
 * direction, Home/End — over panels that are all present in the DOM. That means
 * every skill is server-rendered and reachable by search engines and assistive
 * technology even before JavaScript runs, and the left column doubles as the
 * accessible alternative to a canvas-style diagram.
 */
export function Skills({ locale }: SkillsProps) {
  const t = useTranslations("skills");
  const resolvedLocale: Locale = isLocale(locale) ? locale : "en";
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  const firstCategory = skills[0];
  const [selected, setSelected] = useState<string>(firstCategory?.id ?? "frontend");

  const move = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    const isRtl = document.documentElement.getAttribute("dir") === "rtl";
    const isForward =
      event.key === "ArrowDown" ||
      (event.key === "ArrowRight" && !isRtl) ||
      (event.key === "ArrowLeft" && isRtl);
    const isBackward =
      event.key === "ArrowUp" ||
      (event.key === "ArrowLeft" && !isRtl) ||
      (event.key === "ArrowRight" && isRtl);
    const isEdge = event.key === "Home" || event.key === "End";

    if (!isForward && !isBackward && !isEdge) return;
    event.preventDefault();

    const nextIndex = isEdge
      ? event.key === "Home"
        ? 0
        : skills.length - 1
      : (index + (isForward ? 1 : -1) + skills.length) % skills.length;

    const nextCategory = skills[nextIndex];
    if (!nextCategory) return;
    setSelected(nextCategory.id);
    tabRefs.current.get(nextCategory.id)?.focus();
  };

  return (
    <Section id="skills" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} blueprint>
      <div className="grid gap-stack-md lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <div
          role="tablist"
          aria-label={t("tablistLabel")}
          aria-orientation="vertical"
          className="flex gap-1 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible"
        >
          {skills.map((category, index) => {
            const isSelected = category.id === selected;
            return (
              <button
                key={category.id}
                ref={(node) => {
                  if (node) tabRefs.current.set(category.id, node);
                  else tabRefs.current.delete(category.id);
                }}
                type="button"
                role="tab"
                id={`skills-tab-${category.id}`}
                aria-selected={isSelected}
                aria-controls={`skills-panel-${category.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelected(category.id)}
                onKeyDown={(event) => move(event, index)}
                className={cn(
                  "flex shrink-0 items-center justify-between gap-3 rounded-control border px-3.5 py-2.5 text-start",
                  "transition-[background-color,border-color,color] dur-2",
                  isSelected
                    ? "border-accent-soft-border bg-accent-soft text-accent-soft-text"
                    : "border-transparent text-fg-muted hover:bg-bg-subtle hover:text-fg",
                )}
              >
                <span className="text-body">{pick(category.label, resolvedLocale)}</span>
                <span className="font-mono text-caption tabular">{category.items.length}</span>
              </button>
            );
          })}
        </div>

        <div className="min-w-0">
          {skills.map((category) => {
            const isSelected = category.id === selected;
            return (
              <div
                key={category.id}
                role="tabpanel"
                id={`skills-panel-${category.id}`}
                aria-labelledby={`skills-tab-${category.id}`}
                hidden={!isSelected}
                tabIndex={0}
                className="focus-visible:outline-focus"
              >
                <p className="mb-stack-md max-w-prose text-body text-fg-muted">
                  {pick(category.summary, resolvedLocale)}
                </p>
                <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {category.items.map((item) => (
                    <SkillCard key={item.name} item={item} locale={resolvedLocale} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
