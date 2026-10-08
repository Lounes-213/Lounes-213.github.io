"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easings, viewportOnce } from "@/lib/motion/tokens";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before element starts */
  delay?: number;
  /** Direction from which the element slides into view */
  direction?: Direction;
  /** Travel distance in pixels */
  distance?: number;
  /** Custom x offset (overrides direction) */
  x?: number;
  /** Custom y offset (overrides direction) */
  y?: number;
  className?: string;
  /** Duration in seconds */
  duration?: number;
  /** Set false for content that must be visible immediately */
  animateOnView?: boolean;
};

/**
 * Professional entrance animation:
 * Appears smoothly from below or sides, transitioning from transparent to fully visible,
 * with subtle blur release and spring-like cubic bezier curve.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 32,
  x,
  y,
  className,
  duration = 0.55,
  animateOnView = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  let initialX = x ?? 0;
  let initialY = y ?? 0;

  if (x === undefined && y === undefined) {
    switch (direction) {
      case "up":
        initialY = distance;
        initialX = 0;
        break;
      case "down":
        initialY = -distance;
        initialX = 0;
        break;
      case "left":
        initialX = -distance;
        initialY = 0;
        break;
      case "right":
        initialX = distance;
        initialY = 0;
        break;
      case "none":
        initialX = 0;
        initialY = 0;
        break;
    }
  }

  const hidden = reduced
    ? { opacity: 0 }
    : {
        opacity: 0,
        x: initialX,
        y: initialY,
        filter: "blur(6px)",
      };

  const shown = reduced
    ? { opacity: 1 }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      };

  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(animateOnView ? { whileInView: shown, viewport: viewportOnce } : { animate: shown })}
      transition={{
        duration,
        ease: easings.outExpo,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
