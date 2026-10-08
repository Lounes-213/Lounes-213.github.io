"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/i18n/format";
import { isLocale } from "@/lib/i18n/routing";
import { useNumerals } from "@/lib/theme/provider";
import { durations } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

type CountUpProps = {
  value: number;
  suffix?: string;
  className?: string;
  /** Seconds; the reveal should feel tied to the section, not to the number. */
  duration?: number;
};

/**
 * Counts up once, when the number scrolls into view.
 *
 * Two details that matter: the first paint shows the *final* value, so the
 * server and client renders agree and nothing flashes on load; and the digits
 * are formatted through the Intl layer, so the optional Arabic-Indic numeral
 * preference applies to animated numbers too.
 */
export function CountUp({ value, suffix, className, duration = durations.scene }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const locale = useLocale();
  const numerals = useNumerals();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const started = performance.now();
    const total = duration * 1000;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / total);
      // Cubic ease-out: fast arrival, calm finish.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {formatNumber(display, isLocale(locale) ? locale : "en", numerals)}
      {suffix}
    </span>
  );
}
