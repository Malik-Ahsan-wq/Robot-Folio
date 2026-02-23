/**
 * ═══════════════════════════════════════════════════════════════
 * GSAP Plugin Registration — single entry-point
 * Import this module ONCE in the root client layout to register
 * all free-tier GSAP plugins used throughout the portfolio.
 * ═══════════════════════════════════════════════════════════════
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

/**
 * EasePack ships with the gsap npm package and exposes:
 *  • RoughEase   — servo jitter / imprecision
 *  • ExpoScaleEase — electromagnetic pulse scaling
 *  • SlowMo      — cinematic slow-in/slow-out
 *
 * After registration these are available as string eases:
 *   "rough({ template: power2.inOut, strength: 0.4, points: 12 })"
 *   "expoScale(0.5, 7, power1.inOut)"
 *   "slow(0.7, 0.7, false)"
 */
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

/* ── Register all plugins once ────────────────────────────── */
gsap.registerPlugin(
  ScrollTrigger,
  MotionPathPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo
);

/* ── Sensible global defaults ─────────────────────────────── */
gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

/* Re-export for convenience so components can import from one place */
export { gsap, ScrollTrigger, MotionPathPlugin };

/**
 * ══════════════════════════════════════════════════════
 * EXTENDING WITH CLUB GSAP (CustomEase, SplitText, etc.)
 * ══════════════════════════════════════════════════════
 *
 * If you have a GSAP Club membership, install the plugins:
 *
 *   npm install gsap@npm:@gsap/shockingly
 *
 * Then add here:
 *
 *   import { CustomEase } from "gsap/CustomEase";
 *   import { SplitText } from "gsap/SplitText";
 *   import { ScrollSmoother } from "gsap/ScrollSmoother";
 *   gsap.registerPlugin(CustomEase, SplitText, ScrollSmoother);
 *
 * CustomEase lets you define ultra-precise mechanical curves:
 *
 *   CustomEase.create("hydraulicSnap",
 *     "M0,0 C0.126,0.382 0.091,1.15 0.372,1.083 0.559,1.044 0.718,1.012 1,1");
 *
 * SplitText replaces the manual splitText() utility with
 * GPU-optimised, measurable splits.
 */
