"use client";

import { useEffect, useRef } from "react";

/**
 * A soft accent light that follows the pointer across the hero.
 *
 * Deliberately not a canvas or a particle system: it is one background gradient
 * whose centre is updated from a single rAF-coalesced CSS variable, so it costs
 * no layout, no paint beyond the composited layer, and no JavaScript on touch
 * devices or for visitors who asked for reduced motion (the glow simply stays
 * centred).
 */
export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const apply = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--glow-x", `${pointerX - rect.left}px`);
      node.style.setProperty("--glow-y", `${pointerY - rect.top}px`);
      node.dataset.active = "on";
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity dur-5 ease-standard data-[active=on]:opacity-100"
      style={{
        backgroundImage:
          "radial-gradient(560px circle at var(--glow-x, 62%) var(--glow-y, 18%), var(--accent-glow), transparent 68%)",
      }}
    />
  );
}
