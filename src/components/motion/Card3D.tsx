"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Card3DProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  glareMaxOpacity?: number;
  depth?: boolean;
};

/**
 * Card3D:
 * - Desktop: Tactile 3D tilt perspective with mouse tracking and dynamic glare sheen.
 * - Mobile: 3D tilt is disabled; cards levitate gently up and down in the air
 *   with an ultra-smooth, tranquil float (like an airplane hovering softly).
 */
export function Card3D({
  children,
  className,
  containerClassName,
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  glareMaxOpacity = 0.16,
  depth = true,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [style, setStyle] = useState<CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1)",
  });

  const [glareStyle, setGlareStyle] = useState<CSSProperties>({
    opacity: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)",
  });

  // Detect mobile view / touch-only devices
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px), (hover: none)");
    const updateMode = () => setIsMobile(media.matches);
    updateMode();
    media.addEventListener("change", updateMode);
    return () => media.removeEventListener("change", updateMode);
  }, []);

  const applyTilt = useCallback(
    (clientX: number, clientY: number) => {
      if (isMobile) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles based on position relative to center
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      // Realistic 3D shadow shifting in opposite direction of tilt
      const shadowX = -rotateY * 1.5;
      const shadowY = Math.max(rotateX * 1.5, 5);

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
        boxShadow: `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 30px -10px rgba(0, 0, 0, 0.35), 0 0 20px -5px rgba(var(--accent-rgb, 14, 165, 233), 0.18)`,
        transition: "transform 80ms ease-out, box-shadow 80ms ease-out",
      });

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setGlareStyle({
          opacity: glareMaxOpacity,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)`,
          transition: "opacity 120ms ease-out",
        });
      }
    },
    [isMobile, maxTilt, perspective, scale, glare, glareMaxOpacity],
  );

  const resetTilt = useCallback(() => {
    if (isMobile) return;
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      boxShadow: "none",
      transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)",
    });
    if (glare) {
      setGlareStyle((prev) => ({
        ...prev,
        opacity: 0,
        transition: "opacity 350ms ease-out",
      }));
    }
  }, [isMobile, perspective, glare]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    applyTilt(e.clientX, e.clientY);
  };

  return (
    <div
      className={cn(
        "relative select-none",
        !isMobile && "perspective-[1000px]",
        isMobile && "animate-levitate-soft",
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div
        ref={cardRef}
        style={!isMobile ? style : undefined}
        className={cn(
          "relative h-full w-full transform-gpu",
          !isMobile && depth && "transform-style-3d",
          className,
        )}
      >
        {children}

        {/* 3D Dynamic Glare Sheen Reflection (Desktop only) */}
        {!isMobile && glare && (
          <div
            aria-hidden="true"
            style={glareStyle}
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-overlay"
          />
        )}
      </div>
    </div>
  );
}
