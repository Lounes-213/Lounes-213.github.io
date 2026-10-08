"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { springs } from "@/lib/motion/tokens";

/**
 * Reading progress for the whole document. It starts at the inline-start edge in
 * both directions (`origin-left` with the `rtl:` variant), and it is decorative:
 * screen readers get the section landmarks instead.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, springs.progress);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 h-[var(--scroll-progress-h)] origin-left bg-accent rtl:origin-right z-progress"
    />
  );
}
