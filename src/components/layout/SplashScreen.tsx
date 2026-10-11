"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Modern minimalist splash screen:
 * - Clean solid background (no extra background glow/blobs)
 * - 4 luminous dots smoothly dancing along the lemniscate/infinity path in the center of the screen
 * - No background 8-shape outline or SVG track
 * - Clean developer typography underneath
 */
type SplashScreenProps = {
  locale?: string;
};

export function SplashScreen({ locale: _locale }: SplashScreenProps = {}) {
  const [mounted, setMounted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show splash animation on initial load then fade out smoothly
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1400);

    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 1950);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  // Path data for a centered horizontal figure-8 (infinity symbol ∞)
  const infinityPath = "M 100 50 C 125 15, 175 15, 175 50 C 175 85, 125 85, 100 50 C 75 15, 25 15, 25 50 C 25 85, 75 85, 100 50 Z";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg transition-opacity duration-500 ease-out select-none",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <div className="flex flex-col items-center justify-center -translate-y-2">
        {/* Animated Dots Container - 200x100 box centered on screen */}
        <div className="relative h-[100px] w-[200px]">
          {/* Dot 1: Brand Blue */}
          <div
            className="infinity-dot infinity-dot-1"
            style={{ offsetPath: `path('${infinityPath}')` }}
          />

          {/* Dot 2: Electric Cyan */}
          <div
            className="infinity-dot infinity-dot-2"
            style={{ offsetPath: `path('${infinityPath}')` }}
          />

          {/* Dot 3: Ultramarine Indigo */}
          <div
            className="infinity-dot infinity-dot-3"
            style={{ offsetPath: `path('${infinityPath}')` }}
          />

          {/* Dot 4: Neon Violet */}
          <div
            className="infinity-dot infinity-dot-4"
            style={{ offsetPath: `path('${infinityPath}')` }}
          />
        </div>

        {/* Clean Developer Typography (Only text kept) */}
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-fg-muted/90">
            Lounès Benseba
          </span>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent animate-ping" />
            <span className="text-[11px] font-mono text-fg-subtle">portfolio</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .infinity-dot {
          position: absolute;
          top: 0;
          left: 0;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          offset-rotate: auto;
          animation: moveInfinity 2.6s linear infinite;
        }

        .infinity-dot-1 {
          background-color: #5462f0;
          box-shadow: 0 0 14px 4px rgba(84, 98, 240, 0.85);
          animation-delay: 0s;
        }

        .infinity-dot-2 {
          background-color: #38bdf8;
          box-shadow: 0 0 14px 4px rgba(56, 189, 248, 0.85);
          animation-delay: -0.65s;
        }

        .infinity-dot-3 {
          background-color: #7a85fb;
          box-shadow: 0 0 14px 4px rgba(122, 133, 251, 0.85);
          animation-delay: -1.3s;
        }

        .infinity-dot-4 {
          background-color: #c084fc;
          box-shadow: 0 0 14px 4px rgba(192, 132, 252, 0.85);
          animation-delay: -1.95s;
        }

        @keyframes moveInfinity {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }
      `}</style>
    </div>
  );
}
