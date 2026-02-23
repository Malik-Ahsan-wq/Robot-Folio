/**
 * ═══════════════════════════════════════════════════════════════
 * PRELOADER — Cinematic Boot Sequence
 * ═══════════════════════════════════════════════════════════════
 * Full-screen terminal boot with:
 * 1. Line-by-line terminal typing with glitch flicker
 * 2. Robotic arm stub assembling itself (SVG)
 * 3. Loading progress bar with plasma glow
 * 4. "SYSTEM ONLINE" finale with bloom flash
 *
 * Uses a master GSAP timeline for precise sequencing.
 */
"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASES } from "@/utils/eases";

interface PreloaderProps {
  /** Called when boot sequence completes */
  onComplete: () => void;
}

/* ── Terminal boot log lines ── */
const BOOT_LINES = [
  "> BIOS v4.2.1 ... OK",
  "> Initializing servo controllers ...",
  "> Loading kinematic chain ... 6-DOF",
  "> Calibrating joint encoders ........ OK",
  "> Motor drivers [OK] Torque sensors [OK]",
  "> Vision pipeline ... CUDA 14.2 loaded",
  "> Neural inference engine ... READY",
  "> Establishing comm link ... 2.4GHz",
  "> Safety systems ... ARMED",
  "> ALL SYSTEMS NOMINAL",
  "> Its only for Ahsan Bashir's Portfolio, but it looks so cool!"
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const armSvgRef = useRef<SVGSVGElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [, setForceRender] = useState(0);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const master = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      /* ─────────────────────────────
         PHASE 1: Terminal Boot Text
         ───────────────────────────── */
      const terminalLines =
        terminalRef.current?.querySelectorAll(".boot-line") ?? [];

      terminalLines.forEach((line, i) => {
        master.fromTo(
          line,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.08,
            ease: "power1.out",
          },
          i * 0.18
        );

        /* Glitch flicker on every 3rd line */
        if (i % 3 === 2) {
          master.to(
            line,
            {
              opacity: 0.3,
              x: 3,
              duration: 0.04,
              yoyo: true,
              repeat: 2,
              ease: "none",
            },
            `>-0.05`
          );
        }
      });

      /* ─────────────────────────────
         PHASE 2: Mini Arm Assembly
         ───────────────────────────── */
      const armParts = armSvgRef.current?.querySelectorAll(".arm-segment") ?? [];

      master.fromTo(
        armParts,
        { opacity: 0, scaleY: 0, transformOrigin: "bottom center" },
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.4,
          stagger: 0.15,
          ease: EASES.mechanicalSnap,
        },
        "-=0.5"
      );

      /* Joint glow pulse after assembly */
      const joints = armSvgRef.current?.querySelectorAll(".joint-glow") ?? [];
      master.fromTo(
        joints,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: EASES.bounceLanding,
        },
        "-=0.3"
      );

      /* ─────────────────────────────
         PHASE 3: Progress Bar Fill
         ───────────────────────────── */
      master.fromTo(
        progressRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: EASES.hydraulicDampen,
        },
        "-=0.2"
      );

      /* Progress percentage counter */
      const counter = { val: 0 };
      master.to(
        counter,
        {
          val: 100,
          duration: 1.2,
          ease: EASES.hydraulicDampen,
          onUpdate: () => {
            if (statusRef.current) {
              statusRef.current.textContent = `${Math.round(counter.val)}%`;
            }
          },
        },
        "<"
      );

      /* ─────────────────────────────
         PHASE 4: SYSTEM ONLINE Flash
         ───────────────────────────── */
      /* Status text swap */
      master.to(statusRef.current, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          if (statusRef.current) {
            statusRef.current.textContent = "SYSTEM ONLINE";
            statusRef.current.classList.add("text-glow-cyan");
          }
          setForceRender((v) => v + 1);
        },
      });

      master.to(statusRef.current, {
        opacity: 1,
        scale: 1.1,
        duration: 0.3,
        ease: EASES.mechanicalSnap,
      });

      master.to(statusRef.current, {
        scale: 1,
        duration: 0.2,
      });

      /* Full-screen bloom flash */
      master.fromTo(
        flashRef.current,
        { opacity: 0 },
        {
          opacity: 0.8,
          duration: 0.15,
          ease: "power2.in",
        },
        "-=0.2"
      );

      master.to(flashRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      /* ─────────────────────────────
         PHASE 5: Fade Out Preloader
         ───────────────────────────── */
      master.to(containerRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 0.6,
        ease: "power2.inOut",
        delay: 0.3,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed mt-20 md:mt-0 inset-0 z-[100] flex flex-col items-center justify-center bg-cyber-bg"
      role="status"
      aria-label="Loading application"
      aria-live="polite"
    >
      {/* ── Scanline overlay ── */}
      <div className="scanlines pointer-events-none absolute inset-0" />

      {/* ── Bloom flash layer ── */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 bg-neon-cyan opacity-0"
        style={{ mixBlendMode: "screen" }}
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center gap-8 px-8">
        {/* ── Terminal Output ── */}
        <div
          ref={terminalRef}
          className="preloader-terminal w-full rounded border border-metal-dark/50 bg-cyber-panel/80 p-6 backdrop-blur-sm"
        >
          {BOOT_LINES.map((line, i) => (
            <div key={i} className="boot-line opacity-0">
              {line}
            </div>
          ))}
          <span className="terminal-cursor" />
        </div>

        {/* ── Mini Robotic Arm Assembly ── */}
        <svg
          ref={armSvgRef}
          viewBox="0 0 200 160"
          width="200"
          height="160"
          className="drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          aria-hidden="true"
        >
          {/* Base */}
          <rect
            className="arm-segment"
            x="80"
            y="130"
            width="40"
            height="20"
            rx="4"
            fill="#2a2f3f"
            stroke="#4a5568"
            strokeWidth="1"
          />
          {/* Lower arm */}
          <rect
            className="arm-segment"
            x="92"
            y="80"
            width="16"
            height="55"
            rx="3"
            fill="#2a2f3f"
            stroke="#4a5568"
            strokeWidth="1"
          />
          {/* Upper arm */}
          <rect
            className="arm-segment"
            x="94"
            y="35"
            width="12"
            height="50"
            rx="3"
            fill="#2a2f3f"
            stroke="#4a5568"
            strokeWidth="1"
          />
          {/* Gripper */}
          <path
            className="arm-segment"
            d="M93 35 L85 15 M107 35 L115 15"
            stroke="#2a2f3f"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Joint glows */}
          <circle className="joint-glow" cx="100" cy="130" r="4" fill="#00f0ff" opacity="0" />
          <circle className="joint-glow" cx="100" cy="80" r="4" fill="#00f0ff" opacity="0" />
          <circle className="joint-glow" cx="100" cy="35" r="3" fill="#00f0ff" opacity="0" />
        </svg>

        {/* ── Progress Bar ── */}
        <div className="w-full">
          <div className="mb-2 flex items-center justify-between font-mono text-xs text-text-muted">
            <span>BOOT SEQUENCE</span>
            <span ref={statusRef}>0%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-metal-dark">
            <div ref={progressRef} className="loading-bar h-full w-full rounded-full" />
          </div>
        </div>

        {/* ── Version / Footer ── */}
        <p className="font-mono text-[10px] tracking-widest text-text-muted">
          ROBO.FOLIO OS v2.0.26 — KERNEL LOADED
        </p>
      </div>
    </div>
  );
}
