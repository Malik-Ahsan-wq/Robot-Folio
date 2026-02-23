/**
 * ═══════════════════════════════════════════════════════════════
 * SMOOTH SCROLL PROVIDER — Lenis + GSAP ScrollTrigger Integration
 * ═══════════════════════════════════════════════════════════════
 * Wraps the app in Lenis smooth scroll, syncs with GSAP's ticker
 * so ScrollTrigger stays perfectly in phase. Disables smooth scroll
 * when user prefers-reduced-motion.
 */
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
  /** Disable smooth scroll (e.g. for reduced motion) */
  disabled?: boolean;
}

export default function SmoothScroll({
  children,
  disabled = false,
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (disabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    /* Sync Lenis scroll position → ScrollTrigger */
    lenis.on("scroll", ScrollTrigger.update);

    /* Drive Lenis from GSAP's high-perf ticker (requestAnimationFrame) */
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    /* Disable GSAP's built-in lag smoothing so Lenis handles it */
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [disabled]);

  return <>{children}</>;
}
