"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import {
  IconDart,
  IconFastAPI,
  IconFlutter,
  IconJava,
  IconNextjs,
  IconOpenCV,
  IconPandas,
  IconPython,
  IconR,
  IconStreamlit,
  IconTensorFlow,
  IconWeb,
  type TechIconProps,
} from "@/components/icons/TechIcons";

export interface CvLanguageItem {
  name: string;
  category: string;
  icon: ComponentType<TechIconProps>;
  accentColor: string;
  glowColor: string;
  levelBadge?: string;
}

const CV_LANGUAGES: CvLanguageItem[] = [
  {
    name: "Flutter",
    category: "Mobile Architecture",
    icon: IconFlutter,
    accentColor: "border-s-[#02569B]",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(2,86,155,0.3)]",
    levelBadge: "Expert",
  },
  {
    name: "Dart",
    category: "Client Engineering",
    icon: IconDart,
    accentColor: "border-s-[#00B4AB]",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(0,180,171,0.3)]",
    levelBadge: "Core",
  },
  {
    name: "Python",
    category: "Backend & ML",
    icon: IconPython,
    accentColor: "border-s-[#387EB8]",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(56,126,184,0.3)]",
    levelBadge: "Core",
  },
  {
    name: "Next.js",
    category: "Web Platform",
    icon: IconNextjs,
    accentColor: "border-s-indigo-500",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(99,102,241,0.3)]",
    levelBadge: "Core",
  },
  {
    name: "FastAPI",
    category: "High-Perf APIs",
    icon: IconFastAPI,
    accentColor: "border-s-[#059669]",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(5,150,105,0.3)]",
    levelBadge: "Primary",
  },
  {
    name: "Java",
    category: "Android & Systems",
    icon: IconJava,
    accentColor: "border-s-[#EA2D2E]",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(234,45,46,0.3)]",
  },
  {
    name: "R",
    category: "Bioinformatics & Stats",
    icon: IconR,
    accentColor: "border-s-[#276DC3]",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(39,109,195,0.3)]",
  },
  {
    name: "HTML / CSS / JS",
    category: "Frontend Core",
    icon: IconWeb,
    accentColor: "border-s-[#E44D26]",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(228,77,38,0.3)]",
  },
  {
    name: "TensorFlow",
    category: "Deep Learning",
    icon: IconTensorFlow,
    accentColor: "border-s-[#FF6F00]",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(255,111,0,0.3)]",
  },
  {
    name: "OpenCV",
    category: "Computer Vision",
    icon: IconOpenCV,
    accentColor: "border-s-[#EE2C2C]",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(238,44,44,0.3)]",
  },
  {
    name: "Streamlit",
    category: "Data Platforms",
    icon: IconStreamlit,
    accentColor: "border-s-[#FF4B4B]",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(255,75,75,0.3)]",
  },
  {
    name: "Pandas & Plotly",
    category: "Data Pipelines",
    icon: IconPandas,
    accentColor: "border-s-[#E70488]",
    glowColor: "hover:shadow-[0_8px_24px_-6px_rgba(231,4,136,0.3)]",
  },
];

/**
 * Pro 3D Card for Core Languages & Technologies:
 * Displays official 3D-styled logos, clean engineering tags,
 * and tactile 3D hover interactions.
 */
export function CvLanguagesCard() {
  return (
    <div className="w-full rounded-2xl border border-border bg-surface/95 p-5 sm:p-6 shadow-2 backdrop-blur-md">
      {/* Card Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-3.5">
        <div>
          <h3 className="font-display text-sm sm:text-base font-bold text-fg tracking-tight">
            Core Languages &amp; Engineering Stack
          </h3>
          <p className="mt-0.5 text-xs text-fg-muted">
            Mobile, full-stack &amp; bioinformatics production toolchain
          </p>
        </div>

        <span className="rounded-lg border border-border-subtle bg-surface-sunken px-2.5 py-1 font-mono text-[11px] font-semibold text-accent">
          12 Technologies
        </span>
      </div>

      {/* 3D Rectangular Tiles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {CV_LANGUAGES.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.4,
                delay: 0.05 + idx * 0.025,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -3, scale: 1.02 }}
              className={`group relative flex flex-col justify-between rounded-xl border border-border-subtle bg-surface-sunken/70 p-3 transition-all duration-200 hover:border-accent/40 hover:bg-surface-elevated border-s-4 ${item.accentColor} ${item.glowColor}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-surface border border-border-subtle shadow-xs transition-transform duration-200 group-hover:scale-110">
                    <IconComponent size={16} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-fg tracking-tight group-hover:text-accent transition-colors">
                    {item.name}
                  </span>
                </div>

                {item.levelBadge && (
                  <span className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-accent shrink-0">
                    {item.levelBadge}
                  </span>
                )}
              </div>

              <span className="mt-2 font-mono text-[10px] text-fg-subtle truncate">
                {item.category}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
