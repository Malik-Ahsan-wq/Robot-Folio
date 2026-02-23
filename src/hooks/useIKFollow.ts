/**
 * ═══════════════════════════════════════════════════════════════
 * useIKFollow — Inverse-Kinematics-style Mouse Tracking
 * ═══════════════════════════════════════════════════════════════
 * Simulates a 2-link IK chain (shoulder + elbow) that makes a
 * robotic arm track the mouse cursor with damped, servo-like
 * motion — including micro-corrections (hunting).
 *
 * Uses analytical 2-link IK:
 *   Given target (tx, ty), link lengths L1, L2:
 *   cos(θ2) = (tx² + ty² - L1² - L2²) / (2·L1·L2)
 *   θ1 = atan2(ty, tx) - atan2(L2·sin(θ2), L1 + L2·cos(θ2))
 *
 * Applies results via GSAP quickTo() for 60fps butter-smooth updates.
 */
"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import type { RoboticArmRefs } from "@/svgs/RoboticArm";

interface IKFollowOptions {
  /** SVG container element for coordinate mapping */
  svgElement: SVGSVGElement | null;
  /** Arm joint refs from RoboticArm component */
  armRefs: RoboticArmRefs | null;
  /** Length of upper arm link (SVG units) */
upperArmLength?: number;
  /** Length of forearm link (SVG units) */
  forearmLength?: number;
  /** Damping factor (0-1, lower = more damping) */
  damping?: number;
  /** Whether tracking is enabled */
  enabled?: boolean;
  /** Origin point of shoulder joint in SVG coords */
  shoulderOrigin?: { x: number; y: number };
}

export function useIKFollow(options: IKFollowOptions) {
  const {
    svgElement,
    armRefs,
    upperArmLength = 125,
    forearmLength = 85,
    damping = 0.15,
    enabled = true,
    shoulderOrigin = { x: 250, y: 375 },
  } = options;

  const quickShoulderRef = useRef<gsap.QuickToFunc | null>(null);
  const quickElbowRef = useRef<gsap.QuickToFunc | null>(null);
  const frameRef = useRef<number>(0);

  /**
   * Convert mouse (clientX/Y) → SVG coordinate space
   */
  const clientToSVG = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } | null => {
      if (!svgElement) return null;
      const pt = svgElement.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svgElement.getScreenCTM();
      if (!ctm) return null;
      const svgPt = pt.matrixTransform(ctm.inverse());
      return { x: svgPt.x, y: svgPt.y };
    },
    [svgElement]
  );

  /**
   * Solve 2-link IK analytically → shoulder & elbow angles (degrees)
   */
  const solveIK = useCallback(
    (targetX: number, targetY: number): { shoulder: number; elbow: number } => {
      const dx = targetX - shoulderOrigin.x;
      const dy = targetY - shoulderOrigin.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const L1 = upperArmLength;
      const L2 = forearmLength;
      const maxReach = L1 + L2 - 5; // leave small margin

      /* Clamp target to reachable workspace */
      let clampedDist = Math.min(dist, maxReach);
      clampedDist = Math.max(clampedDist, Math.abs(L1 - L2) + 5);

      const angle = Math.atan2(dy, dx);
      const clampedX = shoulderOrigin.x + Math.cos(angle) * clampedDist;
      const clampedY = shoulderOrigin.y + Math.sin(angle) * clampedDist;

      const cdx = clampedX - shoulderOrigin.x;
      const cdy = clampedY - shoulderOrigin.y;
      const cDist = Math.sqrt(cdx * cdx + cdy * cdy);

      /* Elbow angle via law of cosines */
      let cosElbow = (cDist * cDist - L1 * L1 - L2 * L2) / (2 * L1 * L2);
      cosElbow = Math.max(-1, Math.min(1, cosElbow));
      const elbowAngle = Math.acos(cosElbow);

      /* Shoulder angle */
      const shoulderAngle =
        Math.atan2(cdy, cdx) -
        Math.atan2(L2 * Math.sin(elbowAngle), L1 + L2 * Math.cos(elbowAngle));

      /* Convert to degrees; adjust for SVG coordinate system (Y-down) */
      const shoulderDeg = (shoulderAngle * 180) / Math.PI + 90; // +90 because arm points up
      const elbowDeg = (elbowAngle * 180) / Math.PI;

      return {
        shoulder: Math.max(-60, Math.min(60, shoulderDeg)),
        elbow: Math.max(-120, Math.min(10, -elbowDeg)),
      };
    },
    [upperArmLength, forearmLength, shoulderOrigin]
  );

  useEffect(() => {
    if (!enabled || !armRefs?.shoulder || !armRefs?.elbow) return;

    /* Create GSAP quickTo for buttery smooth damped follow */
    quickShoulderRef.current = gsap.quickTo(armRefs.shoulder, "rotation", {
      duration: 0.6,
      ease: "power3.out",
    });
    quickElbowRef.current = gsap.quickTo(armRefs.elbow, "rotation", {
      duration: 0.5,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const svgPos = clientToSVG(e.clientX, e.clientY);
      if (!svgPos) return;

      const { shoulder, elbow } = solveIK(svgPos.x, svgPos.y);

      if (quickShoulderRef.current) quickShoulderRef.current(shoulder * damping);
      if (quickElbowRef.current) quickElbowRef.current(elbow * damping);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [enabled, armRefs, clientToSVG, solveIK, damping]);
}
