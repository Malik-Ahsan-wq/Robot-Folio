/**
 * ═══════════════════════════════════════════════════════════════
 * CUSTOM MECHANICAL EASES
 * ═══════════════════════════════════════════════════════════════
 * Pre-defined ease strings for the cyber-industrial portfolio.
 * These reference GSAP's built-in + EasePack eases.
 *
 * Usage:
 *   import { EASES } from "@/utils/eases";
 *   gsap.to(el, { x: 100, ease: EASES.mechanicalSnap });
 */

export const EASES = {
  /**
   * Mechanical Snap — aggressive overshoot like a pneumatic latch
   * back.out(1.8) gives a satisfying clunk past the target then settles.
   */
  mechanicalSnap: "back.out(1.8)",

  /**
   * Hydraulic Dampen — heavy deceleration like a hydraulic actuator
   * power4.out = very fast start, long cushioned stop.
   */
  hydraulicDampen: "power4.out",

  /**
   * Servo Jitter — imprecise oscillation mimicking a cheap servo hunting
   * RoughEase with power2.inOut template for underlying curve shape.
   */
  servoJitter:
    "rough({ template: power2.inOut, strength: 0.4, points: 12, taper: none, randomize: true, clamp: false })",

  /**
   * Electromagnetic Pulse — exponential scale ramp
   * Starts extremely slow, then explodes. Good for energy bursts.
   */
  electromagneticPulse: "expoScale(0.5, 7, power1.inOut)",

  /**
   * Precision Linear — no easing, constant velocity (conveyor belts)
   */
  linear: "none",

  /**
   * Heavy Drop — power3.in for gravity-like acceleration
   */
  heavyDrop: "power3.in",

  /**
   * Bounce Landing — elastic snap on arrival
   */
  bounceLanding: "elastic.out(1, 0.4)",

  /**
   * Micro Vibration — very tight rough ease for idle servo vibration
   */
  microVibration:
    "rough({ template: none.out, strength: 0.15, points: 30, taper: none, randomize: true, clamp: true })",
} as const;

/** Type for any of the custom ease keys */
export type EaseKey = keyof typeof EASES;
