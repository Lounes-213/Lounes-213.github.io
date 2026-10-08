/**
 * The JavaScript mirror of the CSS motion vocabulary.
 *
 * Every value here exists for the same reason in src/styles/tokens.css, which is
 * why the two are kept adjacent and reviewed together: CSS and JS timelines must
 * not disagree about what "reveal" feels like. Seconds, because Framer Motion
 * takes seconds while CSS takes milliseconds.
 */

export const durations = {
  /** Micro feedback: hover, press. */
  instant: 0.09,
  /** Small state change: colour, border, icon swap. */
  fast: 0.16,
  /** Component state: tabs, accordion, chip selection. */
  base: 0.24,
  /** Entering content: reveals, count-ups. */
  slow: 0.38,
  /** Overlays and panels: drawer, palette, assistant. */
  panel: 0.6,
  /** Scroll storytelling beats. */
  scene: 0.9,
} as const;

export type EasingName = "standard" | "outExpo" | "inOutQuart" | "overshoot" | "swift";

export const easings: Record<EasingName, [number, number, number, number]> = {
  standard: [0.2, 0, 0, 1],
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
  overshoot: [0.34, 1.56, 0.64, 1],
  swift: [0.4, 0, 0.2, 1],
};

/** Delay between siblings in a staggered group (--stagger-* in CSS). */
export const stagger = {
  tight: 0.045,
  base: 0.08,
  loose: 0.12,
} as const;

/** Travel distances (--distance-* in CSS). */
export const travel = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 32,
} as const;

/** Headline blur reveal (--blur-reveal in CSS). */
export const blurReveal = 8;

/** Ceiling for parallax displacement, as a fraction of viewport (--parallax-max). */
export const parallaxMax = 0.18;

/** The viewport trigger shared by every reveal, so they fire in the same band. */
export const viewportOnce = { once: true, margin: "-12% 0px -8% 0px" } as const;

/** Springs used by scroll-linked effects. */
export const springs = {
  progress: { stiffness: 120, damping: 24, restDelta: 0.001 },
  magnetic: { stiffness: 220, damping: 18, mass: 0.4 },
} as const;
