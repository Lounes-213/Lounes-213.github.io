"use client";

import { useEffect, useState } from "react";

/**
 * Which section is the visitor reading right now?
 *
 * Used by the header nav and the mobile tab bar to mark the current section. The
 * root margin squeezes the observation band to the middle of the viewport, so a
 * section becomes "current" when it occupies the reading area rather than when a
 * pixel of it appears. Decorative only: `aria-current` is a hint, never the only
 * way to know where you are.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const elements = key
      .split("|")
      .map((id) => (id ? document.getElementById(id) : null))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const first = visible[0];
        if (first?.target.id) setActive(first.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [key]);

  return active;
}
