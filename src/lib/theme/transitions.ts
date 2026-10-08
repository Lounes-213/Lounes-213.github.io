/**
 * Theme change animation.
 *
 * Three paths, in order of preference:
 *   1. View Transitions API — a circular reveal originating from the toggle that
 *      was pressed, so the change reads as caused by the user's action.
 *   2. Cross-fade fallback — a short, class-scoped transition on colour
 *      properties, used when the API is unavailable.
 *   3. No animation — when the visitor asked for reduced motion.
 *
 * The duration lives in the token layer, so this file never hardcodes timing.
 */

type ViewTransitionHandle = { finished: Promise<void> };

type ViewTransitionCapableDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionHandle;
};

export type TransitionOrigin = { x: number; y: number } | null;

const FALLBACK_WINDOW_MS = 420;

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function supportsViewTransitions(): boolean {
  if (typeof document === "undefined") return false;
  return typeof (document as ViewTransitionCapableDocument).startViewTransition === "function";
}

export function applyThemeChange(apply: () => void, origin: TransitionOrigin = null): void {
  if (typeof document === "undefined") {
    apply();
    return;
  }

  if (prefersReducedMotion()) {
    apply();
    return;
  }

  const root = document.documentElement;
  const startViewTransition = (document as ViewTransitionCapableDocument).startViewTransition;

  if (startViewTransition && origin) {
    root.style.setProperty("--theme-x", `${Math.round(origin.x)}px`);
    root.style.setProperty("--theme-y", `${Math.round(origin.y)}px`);
    const transition = startViewTransition.call(document, apply);
    void transition.finished.finally(() => {
      root.style.removeProperty("--theme-x");
      root.style.removeProperty("--theme-y");
    });
    return;
  }

  root.setAttribute("data-theme-transition", "fallback");
  apply();
  window.setTimeout(() => {
    root.removeAttribute("data-theme-transition");
  }, FALLBACK_WINDOW_MS);
}

/** Centre origin used when the change is triggered by the keyboard or a menu. */
export function originFromElement(element: Element | null): TransitionOrigin {
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}
