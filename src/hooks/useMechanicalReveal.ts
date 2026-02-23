/**
 * ═══════════════════════════════════════════════════════════════
 * useMechanicalReveal — ScrollTrigger Mechanical Entrance
 * ═══════════════════════════════════════════════════════════════
 * Applies a hydraulic-eased reveal animation to an element
 * when it enters the viewport. Supports multiple entrance styles.
 */
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASES } from "@/utils/eases";

gsap.registerPlugin(ScrollTrigger);

type RevealStyle =
  | "hydraulic-up"
  | "hydraulic-left"
  | "mechanical-scale"
  | "piston-drop"
  | "conveyor-slide";

interface MechanicalRevealOptions {
  /** Animation style preset */
  style?: RevealStyle;
  /** Delay before animation starts */
  delay?: number;
  /** Animation duration */
  duration?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** Stagger if multiple children */
  stagger?: number;
  /** Only animate children matching this selector */
  childSelector?: string;
}

export function useMechanicalReveal(options: MechanicalRevealOptions = {}) {
  const {
    style = "hydraulic-up",
    delay = 0,
    duration = 1,
    start = "top 85%",
    stagger = 0.1,
    childSelector,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const targets = childSelector
        ? containerRef.current.querySelectorAll(childSelector)
        : [containerRef.current];

      if (targets.length === 0) return;

      const fromVars: gsap.TweenVars = { opacity: 0 };
      const toVars: gsap.TweenVars = {
        opacity: 1,
        duration,
        delay,
        stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: "play none none reverse",
        },
      };

      switch (style) {
        case "hydraulic-up":
          fromVars.y = 80;
          toVars.y = 0;
          toVars.ease = EASES.hydraulicDampen;
          break;
        case "hydraulic-left":
          fromVars.x = -100;
          toVars.x = 0;
          toVars.ease = EASES.hydraulicDampen;
          break;
        case "mechanical-scale":
          fromVars.scale = 0.8;
          fromVars.rotation = -2;
          toVars.scale = 1;
          toVars.rotation = 0;
          toVars.ease = EASES.mechanicalSnap;
          break;
        case "piston-drop":
          fromVars.y = -60;
          fromVars.scaleY = 0.7;
          toVars.y = 0;
          toVars.scaleY = 1;
          toVars.ease = EASES.mechanicalSnap;
          break;
        case "conveyor-slide":
          fromVars.x = 200;
          fromVars.rotation = 5;
          toVars.x = 0;
          toVars.rotation = 0;
          toVars.ease = EASES.hydraulicDampen;
          break;
      }

      gsap.fromTo(targets, fromVars, toVars);
    },
    { scope: containerRef, dependencies: [style, delay, duration, start, stagger] }
  );

  return containerRef;
}
