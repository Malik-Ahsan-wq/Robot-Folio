/**
 * ═══════════════════════════════════════════════════════════════
 * CLIENT SHELL — Smooth Scroll + Reduced Motion Provider
 * ═══════════════════════════════════════════════════════════════
 * Client component wrapper that provides:
 *  • Lenis smooth scroll (disabled if prefers-reduced-motion)
 *  • GSAP context boundary
 */
"use client";

import { type ReactNode } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ClientShell({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <SmoothScroll disabled={prefersReduced}>
      {children}
    </SmoothScroll>
  );
}
