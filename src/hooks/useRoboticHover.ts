/**
 * ═══════════════════════════════════════════════════════════════
 * useRoboticHover — Servo-like hover micro-animation
 * ═══════════════════════════════════════════════════════════════
 * Applies a subtle mechanical vibration + glow pulse on hover.
 * Uses GSAP for sub-frame precision.
 */
"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { EASES } from "@/utils/eases";

interface RoboticHoverOptions {
  /** Glow color (CSS color string) */
  glowColor?: string;
  /** Hover scale factor */
  scale?: number;
  /** Intensity of micro-vibration (px) */
  vibrationStrength?: number;
  /** Duration of the enter animation */
  duration?: number;
}

export function useRoboticHover(options: RoboticHoverOptions = {}) {
  const {
    glowColor = "rgba(0, 240, 255, 0.4)",
    scale = 1.02,
    vibrationStrength = 1,
    duration = 0.3,
  } = options;

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      if (tlRef.current) tlRef.current.kill();

      const tl = gsap.timeline();

      // Scale up with mechanical snap
      tl.to(el, {
        scale,
        duration,
        ease: EASES.mechanicalSnap,
      });

      // Glow pulse
      tl.to(
        el,
        {
          boxShadow: `0 0 20px ${glowColor}, 0 0 60px ${glowColor}`,
          duration: duration * 0.8,
          ease: "power2.out",
        },
        0
      );

      // Micro servo vibration
      tl.to(
        el,
        {
          x: `random(-${vibrationStrength}, ${vibrationStrength})`,
          y: `random(-${vibrationStrength * 0.5}, ${vibrationStrength * 0.5})`,
          duration: 0.05,
          repeat: 3,
          yoyo: true,
          ease: "none",
        },
        0
      );

      tlRef.current = tl;
    },
    [glowColor, scale, vibrationStrength, duration]
  );

  const onMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      if (tlRef.current) tlRef.current.kill();

      tlRef.current = gsap.timeline();
      tlRef.current.to(el, {
        scale: 1,
        x: 0,
        y: 0,
        boxShadow: "0 0 0px transparent",
        duration: duration * 1.5,
        ease: EASES.hydraulicDampen,
      });
    },
    [duration]
  );

  return { onMouseEnter, onMouseLeave };
}
