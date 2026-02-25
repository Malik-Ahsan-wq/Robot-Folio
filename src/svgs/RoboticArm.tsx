/**
 * ═══════════════════════════════════════════════════════════════
 * Glowing Globe with Orbiting Stars — Clean SVG Component
 * ═══════════════════════════════════════════════════════════════
 * A standalone, customizable glowing globe with orbiting particles/stars.
 * All robotic arm elements have been removed per request.
 * 
 * Features:
 * - Large glowing globe (customizable size)
 * - Dynamic orbiting stars (count, speed, variety)
 * - Neon glow effects and radial gradients
 * - Mounting platform and status LEDs retained for futuristic feel
 * - Fully typed props and refs for animation control if needed
 * 
 * Usage Example:
 * <GlowingGlobe
 *   globeSize={60}
 *   globeColor="#a5d8ff"
 *   accentColor="#00eaff"
 *   starCount={6}
 *   orbitSpeed={5}
 * />
 */

"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";

export interface RoboticArmRefs {
  globe: SVGCircleElement | null;
}

interface GlowingGlobeProps {
  /** Optional CSS class for the SVG */
  className?: string;
  /** SVG width */
  width?: number;
  /** SVG height */
  height?: number;
  /** Base globe color (center of gradient) */
  globeColor?: string;
  /** Accent/glow color */
  accentColor?: string;
  /** Globe radius (increased default) */
  globeSize?: number;
  /** Number of orbiting stars/particles */
  starCount?: number;
  /** Base orbit duration in seconds (lower = faster) */
  orbitSpeed?: number;
  /** Glow intensity (0–1) */
  glowOpacity?: number;
  /** Enable pulsing LED animations */
  enableLedAnimations?: boolean;
}

const GlowingGlobe = forwardRef<RoboticArmRefs, GlowingGlobeProps>(
  (
    {
      className = "",
      width = 600,
      height = 600,
      globeColor = "#041c1e",
      accentColor = "#009aa5",
      globeSize = 45,
      starCount = 5,
      orbitSpeed = 10,
      glowOpacity = 0.6,
      enableLedAnimations = true,
    },
    ref
  ) => {
    const globeRef = useRef<SVGCircleElement>(null);

    useImperativeHandle(ref, () => ({
      globe: globeRef.current,
    }));

    // Globe center position
    const centerX = 250;
    const centerY = 220;

    // Generate dynamic orbiting stars
    const stars = Array.from({ length: starCount }, (_, i) => {
      const startAngle = (i / starCount) * 360;
      const orbitRadius = globeSize + 12 + Math.random() * 18;
      const starSize = 1.8 + Math.random() * 0.8;
      const duration = orbitSpeed + Math.random() * 5;
      const color = i % 2 === 0 ? "#ffffff" : accentColor;
      const opacity = 0.75 + Math.random() * 0.25;

      return (
        <circle
          key={i}
          cx={centerX}
          cy={centerY - orbitRadius}
          r={starSize}
          fill={color}
          opacity={opacity}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`${startAngle} ${centerX} ${centerY}`}
            to={`${startAngle + 360} ${centerX} ${centerY}`}
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
        </circle>
      );
    });

    return (
      <svg
        viewBox="0 0 500 500"
        width={width}
        height={height}
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Glowing globe with orbiting stars"
      >
        <defs>
          {/* Neon glow filter */}
          <filter id="neonGlow" x="-50%" y="-50%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Globe radial glow */}
          <radialGradient id="globeGlow" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor={globeColor} stopOpacity={glowOpacity} />
            <stop offset="35%" stopColor={accentColor} stopOpacity={glowOpacity * 0.85} />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>

          {/* Joint/LED accent glow */}
          <radialGradient id="accentGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity={glowOpacity} />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Mounting Platform (kept for context) */}
        <rect x="170" y="420" width="160" height="20" rx="3" fill="#1a1f2e" stroke="#3a4055" strokeWidth="1" />
        <circle cx="185" cy="430" r="3" fill="#4a5568" />
        <circle cx="315" cy="430" r="3" fill="#4a5568" />
        <circle cx="250" cy="430" r="3" fill="#4a5568" />

        {/* Main Glowing Globe */}
        <g>
          <circle
            ref={globeRef}
            cx={centerX}
            cy={centerY}
            r={globeSize}
            fill="url(#globeGlow)"
            filter="url(#neonGlow)"
            stroke={accentColor}
            strokeWidth="2"
            opacity={glowOpacity}
          />

          {/* Subtle continent-like shading */}
          <ellipse
            cx={centerX + globeSize * 0.3}
            cy={centerY - globeSize * 0.15}
            rx={globeSize * 0.35}
            ry={globeSize * 0.25}
            fill="#ffffff"
            opacity="0.14"
          />
          <ellipse
            cx={centerX - globeSize * 0.45}
            cy={centerY + globeSize * 0.3}
            rx={globeSize * 0.3}
            ry={globeSize * 0.2}
            fill="#ffffff"
            opacity="0.11"
          />

          {/* Orbiting stars */}
          {stars}
        </g>

        {/* Status LEDs */}
        <circle cx="200" cy="428" r="2.5" fill="#00ff88" opacity="0.85">
          {enableLedAnimations && (
            <animate attributeName="opacity" values="0.85;0.35;0.85" dur="2.2s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="210" cy="428" r="2.5" fill={accentColor} opacity="0.7">
          {enableLedAnimations && (
            <animate attributeName="opacity" values="0.7;0.25;0.7" dur="1.8s" repeatCount="indefinite" />
          )}
        </circle>
      </svg>
    );
  }
);

GlowingGlobe.displayName = "RoboticArm";

export default GlowingGlobe;