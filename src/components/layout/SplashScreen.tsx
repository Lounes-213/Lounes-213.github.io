"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

type SplashScreenProps = {
  locale?: string;
};

/**
 * Clean developer splash screen:
 * - Centered engineer brand typography
 * - 3 sleek dots underneath that animate one by one (staggered pulse/wave)
 * - Smooth entrance into the portfolio
 */
export function SplashScreen({ locale: _locale }: SplashScreenProps = {}) {
  const [mounted, setMounted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show 3-dot staggered animation, then smoothly fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1250);

    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 1750);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg transition-opacity duration-500 ease-out select-none",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <div className="flex flex-col items-center justify-center text-center px-4">
        {/* Clean Engineer Branding */}
        <h1 className="font-display text-base sm:text-lg font-bold tracking-[0.3em] uppercase text-fg">
          Lounès Benseba
        </h1>
        <p className="mt-1 font-mono text-[11px] sm:text-xs text-fg-subtle tracking-wider uppercase">
          Software &amp; Mobile Engineer
        </p>

        {/* 3 Staggered Loading Dots that animate one by one */}
        <div className="mt-6 flex items-center justify-center gap-2.5">
          <span className="splash-dot splash-dot-1" />
          <span className="splash-dot splash-dot-2" />
          <span className="splash-dot splash-dot-3" />
        </div>
      </div>

      <style jsx>{`
        .splash-dot {
          width: 9px;
          height: 9px;
          border-radius: 9999px;
          background-color: var(--accent-solid, #0ea5e9);
          box-shadow: 0 0 10px 1px rgba(var(--accent-rgb, 14, 165, 233), 0.4);
          animation: dotPulse 1.2s infinite ease-in-out;
        }

        .splash-dot-1 {
          animation-delay: 0s;
        }

        .splash-dot-2 {
          animation-delay: 0.2s;
        }

        .splash-dot-3 {
          animation-delay: 0.4s;
        }

        @keyframes dotPulse {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.25;
            box-shadow: 0 0 4px 0px rgba(var(--accent-rgb, 14, 165, 233), 0.2);
          }
          40% {
            transform: scale(1.3);
            opacity: 1;
            box-shadow: 0 0 14px 3px rgba(var(--accent-rgb, 14, 165, 233), 0.85);
          }
        }
      `}</style>
    </div>
  );
}
