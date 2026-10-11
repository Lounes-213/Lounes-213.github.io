"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Modern splash screen featuring 4 dots moving along an inverted 8 (infinity / lemniscate ∞)
 * curved path, styled with the application's signature brand colors.
 */
type SplashScreenProps = {
  locale?: string;
};

export function SplashScreen({ locale: _locale }: SplashScreenProps = {}) {
  const [mounted, setMounted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show splash screen briefly on initial load then fade out smoothly
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 2100);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  // Path data for a horizontal figure-8 (infinity symbol ∞)
  const infinityPath = "M 100 50 C 125 15, 175 15, 175 50 C 175 85, 125 85, 100 50 C 75 15, 25 15, 25 50 C 25 85, 75 85, 100 50 Z";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg transition-opacity duration-500 ease-out",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      {/* Background radial glow */}
      <div className="absolute size-[340px] rounded-full bg-accent/15 blur-[90px] pointer-events-none" />

      {/* Infinity Loader Container */}
      <div className="relative flex items-center justify-center">
        {/* SVG Track & Glow */}
        <svg
          viewBox="0 0 200 100"
          className="h-28 w-56 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="infinityGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--brand-400, #7a85fb)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--accent-solid, #5462f0)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Faint track background */}
          <path
            d={infinityPath}
            stroke="currentColor"
            strokeWidth="2"
            className="text-border-subtle/40"
          />

          {/* Glowing track accent */}
          <path
            d={infinityPath}
            stroke="url(#infinityGlow)"
            strokeWidth="2.5"
            strokeDasharray="6 14"
            className="opacity-70 animate-pulse"
          />
        </svg>

        {/* 4 Animated Dots moving along the infinity curve */}
        {/* Dot 1: Brand Blue */}
        <div
          className="infinity-dot infinity-dot-1"
          style={{
            offsetPath: `path('${infinityPath}')`,
          }}
        />

        {/* Dot 2: Electric Cyan */}
        <div
          className="infinity-dot infinity-dot-2"
          style={{
            offsetPath: `path('${infinityPath}')`,
          }}
        />

        {/* Dot 3: Ultramarine Indigo */}
        <div
          className="infinity-dot infinity-dot-3"
          style={{
            offsetPath: `path('${infinityPath}')`,
          }}
        />

        {/* Dot 4: Accent Violet */}
        <div
          className="infinity-dot infinity-dot-4"
          style={{
            offsetPath: `path('${infinityPath}')`,
          }}
        />
      </div>

      {/* Monogram / Brand Name */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-fg-muted/80">
          Lounès Benseba
        </span>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent animate-ping" />
          <span className="text-[11px] font-mono text-fg-subtle">portfolio</span>
        </div>
      </div>

      <style jsx>{`
        .infinity-dot {
          position: absolute;
          width: 11px;
          height: 11px;
          border-radius: 9999px;
          offset-rotate: auto;
          animation: moveInfinity 2.8s linear infinite;
        }

        .infinity-dot-1 {
          background-color: #5462f0;
          box-shadow: 0 0 12px 3px rgba(84, 98, 240, 0.8), 0 0 4px #5462f0;
          animation-delay: 0s;
        }

        .infinity-dot-2 {
          background-color: #38bdf8;
          box-shadow: 0 0 12px 3px rgba(56, 189, 248, 0.8), 0 0 4px #38bdf8;
          animation-delay: -0.7s;
        }

        .infinity-dot-3 {
          background-color: #7a85fb;
          box-shadow: 0 0 12px 3px rgba(122, 133, 251, 0.8), 0 0 4px #7a85fb;
          animation-delay: -1.4s;
        }

        .infinity-dot-4 {
          background-color: #c084fc;
          box-shadow: 0 0 12px 3px rgba(192, 132, 252, 0.8), 0 0 4px #c084fc;
          animation-delay: -2.1s;
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
