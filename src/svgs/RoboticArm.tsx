/**
 * ═══════════════════════════════════════════════════════════════
 * ROBOTIC ARM — Multi-Joint SVG Component
 * ═══════════════════════════════════════════════════════════════
 * A 6-DOF industrial robot arm rendered as nested SVG <g> groups.
 * Each joint's transform cascades to children (forward kinematics).
 *
 * Joint hierarchy:
 *   Base (rotate Y) → Shoulder (rotate Z) → UpperArm →
 *     Elbow (rotate Z) → Forearm → Wrist (rotate Z) →
 *       Gripper (open/close)
 *
 * Exposes refs via forwardRef so parent can animate joints with GSAP.
 */
"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";

export interface RoboticArmRefs {
  base: SVGGElement | null;
  shoulder: SVGGElement | null;
  upperArm: SVGGElement | null;
  elbow: SVGGElement | null;
  forearm: SVGGElement | null;
  wrist: SVGGElement | null;
  gripperLeft: SVGGElement | null;
  gripperRight: SVGGElement | null;
  endEffector: SVGCircleElement | null;
}

interface RoboticArmProps {
  className?: string;
  width?: number;
  height?: number;
  /** Base color of arm structure */
  armColor?: string;
  /** Accent / joint highlight color */
  accentColor?: string;
}

const RoboticArm = forwardRef<RoboticArmRefs, RoboticArmProps>(
  (
    {
      className = "",
      width = 500,
      height = 500,
      armColor = "#2a2f3f",
      accentColor = "#00f0ff",
    },
    ref
  ) => {
    const baseRef = useRef<SVGGElement>(null);
    const shoulderRef = useRef<SVGGElement>(null);
    const upperArmRef = useRef<SVGGElement>(null);
    const elbowRef = useRef<SVGGElement>(null);
    const forearmRef = useRef<SVGGElement>(null);
    const wristRef = useRef<SVGGElement>(null);
    const gripperLeftRef = useRef<SVGGElement>(null);
    const gripperRightRef = useRef<SVGGElement>(null);
    const endEffectorRef = useRef<SVGCircleElement>(null);

    useImperativeHandle(ref, () => ({
      base: baseRef.current,
      shoulder: shoulderRef.current,
      upperArm: upperArmRef.current,
      elbow: elbowRef.current,
      forearm: forearmRef.current,
      wrist: wristRef.current,
      gripperLeft: gripperLeftRef.current,
      gripperRight: gripperRightRef.current,
      endEffector: endEffectorRef.current,
    }));

    return (
      <svg
        viewBox="0 0 500 500"
        width={width}
        height={height}
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="6-DOF industrial robotic arm illustration"
      >
        <defs>
          {/* Metallic gradient for arm segments */}
          <linearGradient id="armGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a4055" />
            <stop offset="50%" stopColor={armColor} />
            <stop offset="100%" stopColor="#1a1f2e" />
          </linearGradient>

          {/* Neon glow filter */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Joint indicator glow */}
          <radialGradient id="jointGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ═══ MOUNTING PLATFORM ═══ */}
        <rect
          x="170"
          y="420"
          width="160"
          height="20"
          rx="3"
          fill="#1a1f2e"
          stroke="#3a4055"
          strokeWidth="1"
        />
        {/* Platform bolts */}
        <circle cx="185" cy="430" r="3" fill="#4a5568" />
        <circle cx="315" cy="430" r="3" fill="#4a5568" />
        <circle cx="250" cy="430" r="3" fill="#4a5568" />

        {/* ═══ BASE — rotates around center bottom ═══ */}
        <g ref={baseRef} style={{ transformOrigin: "250px 410px" }}>
          {/* Base cylinder */}
          <rect
            x="215"
            y="380"
            width="70"
            height="40"
            rx="8"
            fill="url(#armGrad)"
            stroke="#4a5568"
            strokeWidth="1.5"
          />
          {/* Base joint indicator ring */}
          <ellipse
            cx="250"
            cy="400"
            rx="38"
            ry="6"
            fill="none"
            stroke={accentColor}
            strokeWidth="1"
            opacity="0.5"
          />
          {/* Base rotation indicator */}
          <circle
            cx="250"
            cy="400"
            r="8"
            fill="url(#jointGlow)"
            filter="url(#neonGlow)"
          />

          {/* ═══ SHOULDER — rotates at top of base ═══ */}
          <g ref={shoulderRef} style={{ transformOrigin: "250px 375px" }}>
            {/* Shoulder joint housing */}
            <circle
              cx="250"
              cy="375"
              r="14"
              fill="#1a1f2e"
              stroke="#4a5568"
              strokeWidth="2"
            />
            <circle
              cx="250"
              cy="375"
              r="6"
              fill={accentColor}
              opacity="0.7"
              filter="url(#neonGlow)"
            />

            {/* ═══ UPPER ARM ═══ */}
            <g ref={upperArmRef}>
              {/* Main upper arm segment */}
              <rect
                x="240"
                y="255"
                width="20"
                height="120"
                rx="4"
                fill="url(#armGrad)"
                stroke="#4a5568"
                strokeWidth="1.5"
              />
              {/* Hydraulic piston detail (left) */}
              <rect
                x="233"
                y="280"
                width="5"
                height="70"
                rx="2"
                fill="#1a1f2e"
                stroke="#3a4055"
                strokeWidth="0.5"
              />
              {/* Hydraulic piston detail (right) */}
              <rect
                x="262"
                y="280"
                width="5"
                height="70"
                rx="2"
                fill="#1a1f2e"
                stroke="#3a4055"
                strokeWidth="0.5"
              />
              {/* Cable routing groove */}
              <line
                x1="250"
                y1="260"
                x2="250"
                y2="365"
                stroke={accentColor}
                strokeWidth="0.5"
                opacity="0.3"
              />

              {/* ═══ ELBOW — rotates at top of upper arm ═══ */}
              <g ref={elbowRef} style={{ transformOrigin: "250px 250px" }}>
                {/* Elbow joint housing */}
                <circle
                  cx="250"
                  cy="250"
                  r="12"
                  fill="#1a1f2e"
                  stroke="#4a5568"
                  strokeWidth="2"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="5"
                  fill={accentColor}
                  opacity="0.7"
                  filter="url(#neonGlow)"
                />

                {/* ═══ FOREARM ═══ */}
                <g ref={forearmRef}>
                  {/* Main forearm segment — thinner */}
                  <rect
                    x="243"
                    y="165"
                    width="14"
                    height="85"
                    rx="3"
                    fill="url(#armGrad)"
                    stroke="#4a5568"
                    strokeWidth="1"
                  />
                  {/* Forearm detail lines */}
                  <line
                    x1="246"
                    y1="175"
                    x2="246"
                    y2="240"
                    stroke="#4a5568"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="254"
                    y1="175"
                    x2="254"
                    y2="240"
                    stroke="#4a5568"
                    strokeWidth="0.5"
                  />

                  {/* ═══ WRIST — rotates at top of forearm ═══ */}
                  <g ref={wristRef} style={{ transformOrigin: "250px 160px" }}>
                    {/* Wrist joint */}
                    <circle
                      cx="250"
                      cy="160"
                      r="9"
                      fill="#1a1f2e"
                      stroke="#4a5568"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="250"
                      cy="160"
                      r="4"
                      fill={accentColor}
                      opacity="0.6"
                      filter="url(#neonGlow)"
                    />

                    {/* ═══ GRIPPER ASSEMBLY ═══ */}
                    {/* Gripper mount */}
                    <rect
                      x="244"
                      y="140"
                      width="12"
                      height="20"
                      rx="2"
                      fill="#2a2f3f"
                      stroke="#4a5568"
                      strokeWidth="1"
                    />

                    {/* Left gripper finger */}
                    <g
                      ref={gripperLeftRef}
                      style={{ transformOrigin: "244px 138px" }}
                    >
                      <path
                        d="M244 138 L230 118 L234 115 L246 135 Z"
                        fill="url(#armGrad)"
                        stroke="#4a5568"
                        strokeWidth="1"
                      />
                      {/* Finger tip */}
                      <circle cx="232" cy="116" r="3" fill={accentColor} opacity="0.4" />
                    </g>

                    {/* Right gripper finger */}
                    <g
                      ref={gripperRightRef}
                      style={{ transformOrigin: "256px 138px" }}
                    >
                      <path
                        d="M256 138 L270 118 L266 115 L254 135 Z"
                        fill="url(#armGrad)"
                        stroke="#4a5568"
                        strokeWidth="1"
                      />
                      {/* Finger tip */}
                      <circle cx="268" cy="116" r="3" fill={accentColor} opacity="0.4" />
                    </g>

                    {/* ═══ END EFFECTOR — target point for IK ═══ */}
                    <circle
                      ref={endEffectorRef}
                      cx="250"
                      cy="115"
                      r="3"
                      fill={accentColor}
                      filter="url(#neonGlow)"
                      opacity="0.9"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>

        {/* ═══ STATUS INDICATOR LEDs ═══ */}
        <circle cx="200" cy="428" r="2" fill="#00ff88" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.8;0.3;0.8"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="210" cy="428" r="2" fill={accentColor} opacity="0.6">
          <animate
            attributeName="opacity"
            values="0.6;0.2;0.6"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    );
  }
);

RoboticArm.displayName = "RoboticArm";

export default RoboticArm;
