"use client";

import { useCallback, useRef, useState, type CSSProperties, type MouseEvent, type TouchEvent, type ReactNode } from "react";
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
 * Card3D: High-performance 3D tilt component with physical depth,
 * dynamic glare lighting sheen, realistic 3D elevation shadows,
 * and full touch-screen mobile 3D interaction.
 *
 * Inner elements can use:
 * - `translate-z-10` (+10px 3D depth)
 * - `translate-z-20` (+20px 3D depth)
 * - `translate-z-30` (+30px 3D depth)
 * to physically pop out of the card surface in true 3D perspective!
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
  const [style, setStyle] = useState<CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1)",
  });
  const [glareStyle, setGlareStyle] = useState<CSSProperties>({
    opacity: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)",
  });

  const applyTilt = useCallback(
    (clientX: number, clientY: number) => {
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
    [maxTilt, perspective, scale, glare, glareMaxOpacity],
  );

  const resetTilt = useCallback(() => {
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
  }, [perspective, glare]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    applyTilt(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      applyTilt(touch.clientX, touch.clientY);
    }
  };

  return (
    <div
      className={cn("relative perspective-[1000px] select-none", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTilt}
      onTouchCancel={resetTilt}
    >
      <div
        ref={cardRef}
        style={style}
        className={cn(
          "relative h-full w-full transform-gpu",
          depth && "transform-style-3d",
          className,
        )}
      >
        {children}

        {/* 3D Dynamic Glare Sheen Reflection */}
        {glare && (
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
