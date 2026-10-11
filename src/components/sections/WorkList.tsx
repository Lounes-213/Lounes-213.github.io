"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { ReelProject } from "@/content/reels";
import type { Locale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils/cn";
import { ReelCard } from "./ReelCard";

type WorkListProps = {
  projects: ReelProject[];
  locale: Locale;
  tWatch: string;
  tMute: string;
  tUnmute: string;
  tPlay: string;
  tPause: string;
  tAll: string;
  tMobile: string;
  tWeb: string;
};

export function WorkList({
  projects,
  locale,
  tWatch,
  tMute,
  tUnmute,
  tPlay,
  tPause,
  tAll,
  tMobile,
  tWeb,
}: WorkListProps) {
  const [filter, setFilter] = useState<"all" | "mobile" | "web">("all");

  const filteredProjects = useMemo(() => {
    if (filter === "mobile") {
      return projects.filter(
        (p) =>
          p.languages.includes("Flutter") ||
          p.tags.includes("Mobile") ||
          p.category.en.toLowerCase().includes("mobile"),
      );
    }
    if (filter === "web") {
      return projects.filter(
        (p) =>
          p.languages.includes("Next.js") ||
          p.tags.includes("Web") ||
          p.category.en.toLowerCase().includes("web"),
      );
    }
    return projects;
  }, [filter, projects]);

  return (
    <div className="flex flex-col gap-5 sm:gap-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-pill px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium transition-all duration-200",
            filter === "all"
              ? "bg-accent text-accent-fg shadow-1"
              : "border border-border-subtle bg-surface text-fg-muted hover:border-border hover:text-fg",
          )}
        >
          {tAll} ({projects.length})
        </button>

        <button
          type="button"
          onClick={() => setFilter("mobile")}
          className={cn(
            "rounded-pill px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium transition-all duration-200",
            filter === "mobile"
              ? "bg-accent text-accent-fg shadow-1"
              : "border border-border-subtle bg-surface text-fg-muted hover:border-border hover:text-fg",
          )}
        >
          {tMobile}
        </button>

        <button
          type="button"
          onClick={() => setFilter("web")}
          className={cn(
            "rounded-pill px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium transition-all duration-200",
            filter === "web"
              ? "bg-accent text-accent-fg shadow-1"
              : "border border-border-subtle bg-surface text-fg-muted hover:border-border hover:text-fg",
          )}
        >
          {tWeb}
        </button>
      </div>

      {/* Grid of Reel Cards - Compact on mobile */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
        {filteredProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.05} className="h-full">
            <ReelCard
              project={project}
              locale={locale}
              tWatch={tWatch}
              tMute={tMute}
              tUnmute={tUnmute}
              tPlay={tPlay}
              tPause={tPause}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
