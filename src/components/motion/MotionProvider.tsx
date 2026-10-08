"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { easings, durations } from "@/lib/motion/tokens";

/**
 * Global motion defaults. `reducedMotion="user"` makes Framer Motion drop
 * transform and layout animations when the visitor asked for less motion —
 * the same preference that collapses the CSS token vocabulary, so both layers
 * stop at the same moment instead of fighting each other.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: durations.slow, ease: easings.outExpo }}
    >
      {children}
    </MotionConfig>
  );
}
