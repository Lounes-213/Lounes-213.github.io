"use client";

import { motion } from "framer-motion";

export interface CvLanguageItem {
  name: string;
  category: string;
  accentBorder: string;
  levelBadge?: string;
}

const CV_LANGUAGES: CvLanguageItem[] = [
  { name: "Flutter", category: "Mobile Framework", accentBorder: "border-s-sky-500", levelBadge: "Primary" },
  { name: "Dart", category: "Client Language", accentBorder: "border-s-teal-500", levelBadge: "Core" },
  { name: "Python", category: "Backend & AI", accentBorder: "border-s-amber-500", levelBadge: "Core" },
  { name: "Next.js", category: "Web Platform", accentBorder: "border-s-indigo-500", levelBadge: "Core" },
  { name: "FastAPI", category: "RESTful APIs", accentBorder: "border-s-emerald-500", levelBadge: "Primary" },
  { name: "Java", category: "Android & Systems", accentBorder: "border-s-red-500" },
  { name: "R", category: "Bioinformatics", accentBorder: "border-s-blue-600" },
  { name: "HTML / CSS / JS", category: "Frontend Core", accentBorder: "border-s-orange-500" },
  { name: "TensorFlow & Keras", category: "Deep Learning", accentBorder: "border-s-purple-500" },
  { name: "OpenCV", category: "Computer Vision", accentBorder: "border-s-violet-500" },
  { name: "Streamlit", category: "Data Web Apps", accentBorder: "border-s-rose-500" },
  { name: "Pandas & Plotly", category: "Data Analytics", accentBorder: "border-s-cyan-500" },
];

/**
 * Pro Rectangular Card for CV Languages and Technologies:
 * Clean, structured architectural card with rectangular tiles (mustatil),
 * no animated dots, with smooth entrance and micro-hover interactions.
 */
export function CvLanguagesCard() {
  return (
    <div className="w-full rounded-2xl border border-border bg-surface/90 p-5 sm:p-6 shadow-2 backdrop-blur-md">
      {/* Card Header - No animated dots */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-3.5">
        <div>
          <h3 className="font-display text-sm sm:text-base font-bold text-fg tracking-tight">
            Core Languages &amp; Production Technologies
          </h3>
          <p className="mt-0.5 text-xs text-fg-muted">
            Software &amp; Bioinformatics engineering stack
          </p>
        </div>

        <span className="rounded-lg border border-border-subtle bg-surface-sunken px-2.5 py-1 font-mono text-[11px] font-semibold text-fg-subtle">
          12 Technologies
        </span>
      </div>

      {/* Rectangular Tiles Grid (Mustatil) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {CV_LANGUAGES.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.45,
              delay: 0.1 + idx * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -2 }}
            className={`group relative flex flex-col justify-between rounded-xl border border-border-subtle bg-surface-sunken/60 p-3 transition-all duration-200 hover:border-accent/40 hover:bg-surface-elevated hover:shadow-1 border-s-4 ${item.accentBorder}`}
          >
            <div className="flex items-start justify-between gap-1">
              <span className="text-xs sm:text-sm font-bold text-fg tracking-tight group-hover:text-accent transition-colors">
                {item.name}
              </span>

              {item.levelBadge && (
                <span className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-accent">
                  {item.levelBadge}
                </span>
              )}
            </div>

            <span className="mt-1.5 font-mono text-[10px] text-fg-subtle truncate">
              {item.category}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
