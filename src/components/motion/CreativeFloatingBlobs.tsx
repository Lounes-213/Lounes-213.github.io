"use client";

/**
 * Creative floating artistic shapes & glowing color gradients.
 * Designed to provide a vibrant, modern aesthetic on both mobile and desktop.
 */
export function CreativeFloatingBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Floating Vibrant Orb 1 - Violet/Indigo */}
      <div className="absolute -top-12 start-1/4 size-72 sm:size-96 rounded-full bg-gradient-to-tr from-indigo-500/15 to-violet-500/10 blur-3xl animate-float-slow" />

      {/* Floating Vibrant Orb 2 - Sky/Teal */}
      <div className="absolute top-1/3 -end-16 size-64 sm:size-80 rounded-full bg-gradient-to-bl from-sky-400/15 via-teal-400/10 to-transparent blur-3xl animate-pulse-glow" />

      {/* Floating Vibrant Orb 3 - Amber/Rose on Mobile */}
      <div className="absolute bottom-10 start-4 size-56 sm:size-72 rounded-full bg-gradient-to-r from-amber-400/10 to-rose-400/10 blur-2xl animate-float-slow" />

      {/* Creative Geometric Ticks & Subtle Circuit Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
    </div>
  );
}
