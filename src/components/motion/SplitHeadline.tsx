"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { JSX } from "react";
import { blurReveal, durations, easings, stagger, travel } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

type SplitHeadlineProps = {
  /** Plain text — screen readers get it whole through aria-label. */
  text: string;
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "p">;
  className?: string;
  delay?: number;
  /** Reveal immediately instead of on scroll — used by the hero. */
  immediate?: boolean;
};

/**
 * Headline reveal: the sentence rises word by word. Splitting is done here, not
 * in the markup, so the accessible name stays a single string and translation
 * files never need fragment markers. Word spacing uses a logical margin, which
 * keeps Arabic word order and spacing intact.
 */
export function SplitHeadline({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
  immediate = true,
}: SplitHeadlineProps) {
  const reduced = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  const hidden = reduced ? { opacity: 0 } : { opacity: 0, y: travel.lg * 0.6, filter: `blur(${blurReveal}px)` };
  const shown = reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <Tag className={cn("text-balance", className)} aria-label={text}>
      <span aria-hidden="true" className="inline">
        {words.map((word, index) => (
          <motion.span
            // Words can repeat, so the index is part of the identity.
            key={`${word}-${index}`}
            className="inline-block me-[0.26em] last:me-0"
            initial={hidden}
            animate={immediate ? shown : undefined}
            whileInView={immediate ? undefined : shown}
            viewport={immediate ? undefined : { once: true, margin: "-10% 0px" }}
            transition={{
              duration: durations.slow,
              ease: easings.outExpo,
              delay: delay + index * stagger.tight,
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
