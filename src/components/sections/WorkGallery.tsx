"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { ArrowRight, External, Sparkle } from "@/components/icons";
import type { LinkyProject } from "@/lib/linky";
import { cn } from "@/lib/utils/cn";

type WorkGalleryProps = {
  projects: LinkyProject[];
};

export function WorkGallery({ projects }: WorkGalleryProps) {
  const t = useTranslations("work");
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Modern category filters tailored to user's real projects
  const categories = [
    { id: "all", label: t("allFilter") },
    { id: "flutter", label: "Flutter & Mobile" },
    { id: "web", label: "Web & Full-Stack" },
    { id: "qr", label: "QR & Enterprise" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "flutter") {
      return (
        project.keywords.some((k) => k.toLowerCase().includes("flutter")) ||
        project.category.toLowerCase().includes("mobile") ||
        project.category.toLowerCase().includes("flutter") ||
        project.category.toLowerCase().includes("apps")
      );
    }
    if (selectedCategory === "web") {
      return (
        project.title.toLowerCase().includes("linky") ||
        project.category.toLowerCase().includes("full-stack") ||
        project.category.toLowerCase().includes("web") ||
        project.keywords.some((k) => k.toLowerCase().includes("e-commerce") || k.toLowerCase().includes("bio"))
      );
    }
    if (selectedCategory === "qr") {
      return (
        project.title.toLowerCase().includes("gym") ||
        project.title.toLowerCase().includes("restaurant") ||
        project.title.toLowerCase().includes("library") ||
        project.keywords.some((k) => k.toLowerCase().includes("qr"))
      );
    }
    return true;
  });

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="mb-stack-lg flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project categories">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "rounded-pill px-3.5 py-1.5 text-caption font-medium transition-all duration-200",
                  isSelected
                    ? "bg-accent text-accent-fg shadow-1 scale-102"
                    : "bg-surface text-fg-muted hover:bg-surface-elevated hover:text-fg border border-border-subtle",
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-caption text-fg-subtle">
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {/* Projects Grid — Compact, proportional and mobile-optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredProjects.map((project, idx) => {
          const projectUrl = `/${locale}/projects/${project.slug}`;

          return (
            <article
              key={project.id}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-card border border-border bg-surface shadow-1",
                "transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2",
              )}
            >
              <div>
                {/* Visual Preview / Screenshot Frame linking to dedicated page */}
                <Link
                  href={projectUrl}
                  className="relative aspect-16/9 w-full block overflow-hidden bg-surface-sunken cursor-pointer"
                  aria-label={`View dedicated page for ${project.title}`}
                >
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading={idx < 3 ? "eager" : "lazy"}
                    />
                  ) : (
                    <div className="blueprint absolute inset-0 flex items-center justify-center text-fg-subtle">
                      <span className="font-mono text-xs">[ Preview ]</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                  {/* Corner Badge */}
                  <div className="absolute top-2 start-2 flex flex-wrap gap-1">
                    <span className="rounded-pill bg-bg/90 backdrop-blur-md border border-border-subtle px-2 py-0.5 font-mono text-[10px] text-fg font-medium">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="rounded-pill bg-accent text-accent-fg px-1.5 py-0.5 text-[10px] font-semibold flex items-center gap-0.5 shadow-sm">
                        <Sparkle size={10} />
                        {t("featured")}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Card Content - Linking to dedicated page */}
                <div className="p-3.5 sm:p-4">
                  <Link href={projectUrl} className="block group-hover:text-accent transition-colors">
                    <h3 className="text-sm sm:text-base font-semibold text-fg line-clamp-1">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="mt-1 text-xs text-fg-muted line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Keyword / Tech Pills */}
                  {project.keywords.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {project.keywords.slice(0, 4).map((kw, i) => (
                        <span
                          key={i}
                          className="rounded border border-border-subtle bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-fg-muted"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons - Dedicated View */}
              <div className="border-t border-border-subtle px-3 py-2 sm:px-3.5 sm:py-2.5 flex items-center justify-between gap-2 bg-surface-sunken/40">
                <Link
                  href={projectUrl}
                  className="inline-flex items-center gap-1.5 rounded-pill bg-accent/10 border border-accent/30 px-3 py-1 text-[11px] sm:text-xs font-semibold text-accent hover:bg-accent hover:text-accent-fg transition-all"
                >
                  <span>
                    {locale === "ar"
                      ? "فتح صفحة المشروع"
                      : locale === "fr"
                      ? "Voir le projet complet"
                      : "Open Project Page"}
                  </span>
                  <ArrowRight size={12} />
                </Link>

                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-fg-subtle hover:text-fg transition-colors"
                  >
                    <span>{project.projectUrl.includes("linkedin") ? "LinkedIn" : "Live"}</span>
                    <External size={11} />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
