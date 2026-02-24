/**
 * ═══════════════════════════════════════════════════════════════
 * PRELOADER — Sci-Fi Robotic Door Opening Sequence
 * ═══════════════════════════════════════════════════════════════
 * Full-screen cinematic door opening with:
 * 1. Two sliding metallic panels with hydraulic damping
 * 2. Glow lines, scanline, subtle sparks/glitch
 * 3. Progress bar + percentage during opening
 * 4. "SYSTEM ACCESS GRANTED" finale + bloom flash
 *
 * Uses a master GSAP timeline for precise sequencing.
 */
"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASES } from "@/utils/eases"; // assuming you still have this

interface PreloaderProps {
  /** Called when door opening sequence completes */
  onComplete: () => void;
}

/* ── Status messages ── */
const STATUS_LINES = [
  "AUTHENTICATING BIOMETRICS...",
  "DECRYPTING ACCESS PROTOCOL...",
  "PRESSURE EQUALIZATION... 47%",
  "HYDRAULIC SYSTEMS PRIMED",
  "SECURITY GRID OFFLINE",
  "CORE LOCKS DISENGAGED",
  "ITS ONLY FOR AHSAN BASHIR'S PORTFOLIO, BUT IT LOOKS EPIC!"
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const glowLineLeftRef = useRef<HTMLDivElement>(null);
  const glowLineRightRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
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

      // ── PHASE 1: Status text typing ──
      const statusLines = statusRef.current?.querySelectorAll(".status-line") ?? [];

      statusLines.forEach((line, i) => {
        master.fromTo(
          line,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.09,
            ease: "power1.out",
          },
          i * 0.22
        );

        // occasional glitch flicker
        if (i % 3 === 1) {
          master.to(
            line,
            {
              opacity: 0.4,
              x: 4,
              duration: 0.05,
              yoyo: true,
              repeat: 2,
              ease: "none",
            },
            ">-0.08"
          );
        }
      });

      // ── PHASE 2: Doors start to unlock / glow ──
      master.fromTo(
        [glowLineLeftRef.current, glowLineRightRef.current],
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 0.7,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.inOut",
        },
        "-=0.6"
      );

      // Pulse glow
      master.to(
        [glowLineLeftRef.current, glowLineRightRef.current],
        {
          opacity: 0.9,
          repeat: 1,
          yoyo: true,
          duration: 0.6,
          ease: "sine.inOut",
        },
        "-=0.4"
      );

      // ── PHASE 3: Doors slide open ──
      master.to(
        leftDoorRef.current,
        {
          x: "-100%",
          duration: 2.2,
          ease: EASES.hydraulicDampen, // ← slow start, powerful middle, smooth stop
        },
        "-=0.7"
      );

      master.to(
        rightDoorRef.current,
        {
          x: "100%",
          duration: 2.2,
          ease: EASES.hydraulicDampen,
        },
        "<" // same time as left door
      );

      // Slight overshoot + settle (mechanical feel)
      master.to(
        leftDoorRef.current,
        {
          x: "-96%",
          duration: 0.4,
          ease: "back.out(1.6)",
        },
        ">-0.3"
      );

      master.to(
        rightDoorRef.current,
        {
          x: "96%",
          duration: 0.4,
          ease: "back.out(1.6)",
        },
        "<"
      );

      // ── PHASE 4: Progress bar + percentage ──
      master.fromTo(
        progressRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 2.2,
          ease: EASES.hydraulicDampen,
        },
        "-=2.0" // start ~same time as doors
      );

      const counter = { val: 0 };
      master.to(
        counter,
        {
          val: 100,
          duration: 2.2,
          ease: EASES.hydraulicDampen,
          onUpdate: () => {
            if (statusRef.current) {
              // override last line with percentage during opening
              const lastLine = statusLines[statusLines.length - 1];
              if (lastLine) lastLine.textContent = `${Math.round(counter.val)}%`;
            }
          },
        },
        "<"
      );

      // ── PHASE 5: Final status + bloom flash ──
      master.to(statusRef.current, {
        opacity: 0,
        duration: 0.12,
        onComplete: () => {
          if (statusRef.current) {
            statusRef.current.innerHTML = '<div class="text-glow-cyan font-bold tracking-widest">SYSTEM ACCESS GRANTED</div>';
            setForceRender((v) => v + 1);
          }
        },
      });

      master.to(statusRef.current, {
        opacity: 1,
        scale: 1.12,
        duration: 0.4,
        ease: EASES.mechanicalSnap,
      });

      master.to(statusRef.current, {
        scale: 1,
        duration: 0.25,
      });

      // Bloom flash
      master.fromTo(
        flashRef.current,
        { opacity: 0 },
        {
          opacity: 0.85,
          duration: 0.18,
          ease: "power2.in",
        },
        "-=0.3"
      );

      master.to(flashRef.current, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      // ── PHASE 6: Fade out whole preloader ──
      master.to(
        containerRef.current,
        {
          opacity: 0,
          scale: 1.015,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.4,
        },
        "+=0.2"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cyber-bg overflow-hidden"
      role="status"
      aria-label="Loading application"
      aria-live="polite"
    >
      {/* Scanlines overlay */}
      <div className="scanlines pointer-events-none absolute inset-0" />

      {/* Bloom flash layer */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 bg-neon-cyan opacity-0"
        style={{ mixBlendMode: "screen" }}
      />

      {/* ── Left Door Panel ── */}
      <div
        ref={leftDoorRef}
        className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-metal-dark to-[#1a202c] border-r border-neon-cyan/30 shadow-2xl"
        style={{ transform: "translateX(0%)" }}
      >
        <div
          ref={glowLineLeftRef}
          className="absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b from-transparent via-neon-cyan to-transparent opacity-0"
        />
      </div>

      {/* ── Right Door Panel ── */}
      <div
        ref={rightDoorRef}
        className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-metal-dark to-[#1a202c] border-l border-neon-cyan/30 shadow-2xl"
        style={{ transform: "translateX(0%)" }}
      >
        <div
          ref={glowLineRightRef}
          className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-transparent via-neon-cyan to-transparent opacity-0"
        />
      </div>

      {/* ── Center Content (status + progress) ── */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-10 px-8">
        {/* Status messages */}
        <div ref={statusRef} className="font-mono text-cyan-300 text-lg md:text-xl tracking-wider text-center leading-relaxed">
          {STATUS_LINES.map((line, i) => (
            <div key={i} className="status-line opacity-0">
              {line}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-metal-dark/70 border border-neon-cyan/20">
            <div
              ref={progressRef}
              className="h-full w-full rounded-full bg-gradient-to-r from-neon-cyan via-cyan-400 to-neon-cyan"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />
          </div>
        </div>

        <p className="font-mono text-xs tracking-widest text-text-muted/70">
          ROBO.FOLIO GATEWAY v2.1.8 — ACCESS SEQUENCE
        </p>
      </div>
    </div>
  );
}