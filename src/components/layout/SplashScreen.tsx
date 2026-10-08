"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n/routing";

type SplashScreenProps = {
  locale?: Locale;
};

export function SplashScreen({ locale = "en" }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(false);
      return;
    }

    // Fast progress fill sequence (0% to 100% in ~900ms)
    const startTime = Date.now();
    const duration = 950;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        // Quick pause at 100% before triggering exit animation
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 220);
        return () => clearTimeout(timer);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Lock body scroll while splash screen is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  const roleText =
    locale === "ar"
      ? "مهندس برمجيات · مطور تطبيقات الموبايل وفولستاك"
      : locale === "fr"
      ? "Ingénieur Logiciel · Développeur Mobile & Full-Stack"
      : "Software Engineer · Mobile & Full-Stack";

  const statusText =
    progress >= 100
      ? locale === "ar"
        ? "جاهز"
        : locale === "fr"
        ? "Prêt"
        : "Ready"
      : locale === "ar"
      ? "جاري التحميل..."
      : locale === "fr"
      ? "Chargement..."
      : "Initializing...";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(12px)",
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={() => setIsVisible(false)}
          title="Click to skip"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg/95 backdrop-blur-2xl cursor-pointer select-none"
          role="status"
          aria-live="polite"
        >
          {/* Ambient luminous glow spots */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-gradient-to-tr from-accent/25 via-sky-400/20 to-indigo-500/15 blur-3xl"
            />
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          </div>

          <div className="relative z-10 flex flex-col items-center px-4 max-w-sm w-full text-center">
            {/* Center Monogram / Portrait with rotating neon glow border */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative mb-5"
            >
              {/* Outer pulsing halo */}
              <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-accent via-sky-400 to-indigo-500 blur-md opacity-40 animate-pulse" />

              {/* Glowing ring */}
              <div className="relative size-20 sm:size-24 rounded-full p-1 bg-gradient-to-tr from-accent via-sky-400 to-indigo-500 shadow-2xl flex items-center justify-center">
                <div className="relative size-full rounded-full overflow-hidden bg-surface flex items-center justify-center border-2 border-surface">
                  {profile.portrait.image ? (
                    <Image
                      src={profile.portrait.image}
                      alt={profile.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <span className="font-display font-black text-2xl sm:text-3xl bg-gradient-to-br from-fg via-fg to-accent bg-clip-text text-transparent">
                      {profile.initials}
                    </span>
                  )}
                </div>
              </div>

              {/* Fast active badge indicator */}
              <span className="absolute bottom-1 end-1 size-4 rounded-full bg-surface border-2 border-bg flex items-center justify-center shadow-sm">
                <span className="size-2 rounded-full bg-success animate-ping" />
              </span>
            </motion.div>

            {/* Engineer Name with stagger reveal */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-fg"
            >
              <span className="bg-gradient-to-r from-fg via-fg to-accent/90 bg-clip-text">
                {profile.name}
              </span>
            </motion.h2>

            {/* Subtitle / Role */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-1 font-mono text-xs sm:text-[13px] font-semibold text-accent tracking-wide"
            >
              {roleText}
            </motion.p>

            {/* Fast Tech Chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.35 }}
              className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] text-fg-subtle"
            >
              <span className="rounded-md border border-border-subtle bg-surface-sunken/80 px-2 py-0.5">Flutter</span>
              <span className="rounded-md border border-border-subtle bg-surface-sunken/80 px-2 py-0.5">Dart</span>
              <span className="rounded-md border border-border-subtle bg-surface-sunken/80 px-2 py-0.5">Next.js</span>
              <span className="rounded-md border border-border-subtle bg-surface-sunken/80 px-2 py-0.5">FastAPI</span>
            </motion.div>

            {/* Progress bar container */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.9 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-6 w-52 sm:w-60"
            >
              {/* Progress bar track */}
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-border-subtle/80 border border-border/40">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent via-sky-400 to-indigo-500 rounded-full transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress percentage & status */}
              <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-fg-subtle">
                <span className="flex items-center gap-1.5">
                  <span
                    className={`size-1.5 rounded-full ${
                      progress >= 100 ? "bg-success" : "bg-accent animate-pulse"
                    }`}
                  />
                  <span>{statusText}</span>
                </span>
                <span className="font-semibold text-fg/80 tabular-nums">{progress}%</span>
              </div>
            </motion.div>

            {/* Fast dismiss micro hint */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="mt-6 font-mono text-[9px] uppercase tracking-wider text-fg-subtle"
            >
              {locale === "ar" ? "اضغط للتخطي" : locale === "fr" ? "Cliquer pour passer" : "Click anywhere to enter"}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
