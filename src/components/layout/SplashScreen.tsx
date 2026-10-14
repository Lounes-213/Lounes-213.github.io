"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils/cn";

type SplashScreenProps = {
  locale?: string;
};

/**
 * Clean developer splash screen:
 * - Small profile picture (pdp)
 * - Subtle name & "Software Engineer" role
 * - 3 small soft loading dots placed lower down
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
        {/* Small Profile Picture (PDP) */}
        {profile.portrait.image && (
          <div className="relative size-11 sm:size-12 rounded-full overflow-hidden ring-2 ring-accent/30 ring-offset-2 ring-offset-bg shadow-sm mb-3">
            <Image
              src={profile.portrait.image}
              alt={profile.name}
              fill
              priority
              sizes="48px"
              className="object-cover"
            />
          </div>
        )}

        {/* Clean Engineer Branding */}
        <h1 className="font-display text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-fg">
          Lounès Benseba
        </h1>
        <p className="mt-1 font-mono text-[10px] text-fg-subtle tracking-wider uppercase">
          Software Engineer
        </p>

        {/* 3 Staggered Loading Dots placed lower down, smaller and softer color */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="splash-dot splash-dot-1" />
          <span className="splash-dot splash-dot-2" />
          <span className="splash-dot splash-dot-3" />
        </div>
      </div>

      <style jsx>{`
        .splash-dot {
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background-color: var(--accent-solid, #38bdf8);
          opacity: 0.7;
          box-shadow: 0 0 6px 1px rgba(var(--accent-rgb, 56, 189, 248), 0.35);
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
            transform: scale(0.65);
            opacity: 0.2;
            box-shadow: 0 0 2px 0px rgba(var(--accent-rgb, 56, 189, 248), 0.15);
          }
          40% {
            transform: scale(1.15);
            opacity: 0.85;
            box-shadow: 0 0 8px 1.5px rgba(var(--accent-rgb, 56, 189, 248), 0.5);
          }
        }
      `}</style>
    </div>
  );
}
