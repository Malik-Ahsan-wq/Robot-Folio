/**
 * ═══════════════════════════════════════════════════════════════
 * HERO — Robotic Gaze / IK Greeting
 * ═══════════════════════════════════════════════════════════════
 * Layered SVG 6-DOF arm that tracks cursor with damped follow.
 * Name reveal via manual SplitText + per-letter mechanical unfold.
 * Background: electromagnetic field lines + micro-component orbits.
 */
"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RoboticArm, { type RoboticArmRefs } from "@/svgs/RoboticArm";
import { useIKFollow } from "@/hooks/useIKFollow";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { splitTextIntoSpans } from "@/utils/textSplitter";
import { EASES } from "@/utils/eases";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const armContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const armRefs = useRef<RoboticArmRefs | null>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const prefersReduced = useReducedMotion();

  useEffect(() => setIsMounted(true), []);

  /* ── IK Mouse Follow — arm tracks cursor ── */
  useIKFollow({
    svgElement: svgRef.current,
    armRefs: armRefs.current,
    enabled: isMounted && !prefersReduced,
    damping: 0.12,
  });

  /* ── Master entrance timeline ── */
  useGSAP(
    () => {
      if (!sectionRef.current || !nameRef.current || prefersReduced) return;

      /* Split the name into chars */
      const { chars } = splitTextIntoSpans(nameRef.current);

      const tl = gsap.timeline({
        delay: 4.2, // after preloader
        defaults: { ease: EASES.hydraulicDampen },
      });

      /* ── Name: per-letter mechanical unfold ── */
      tl.fromTo(
        chars,
        {
          opacity: 0,
          scaleY: 0,
          skewX: 25,
          transformOrigin: "bottom left",
          filter: "drop-shadow(0 0 0px rgba(0,240,255,0))",
        },
        {
          opacity: 1,
          scaleY: 1,
          skewX: 0,
          filter: "drop-shadow(0 0 12px rgba(0,240,255,0.6))",
          duration: 0.6,
          stagger: 0.04,
          ease: EASES.mechanicalSnap,
        },
        0
      );

      /* ── Glow pulse fade after reveal ── */
      tl.to(
        chars,
        {
          filter: "drop-shadow(0 0 4px rgba(0,240,255,0.2))",
          duration: 1,
          stagger: 0.02,
          ease: "power2.out",
        },
        ">-0.3"
      );

      /* ── Subtitle slides in ── */
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, x: -20 },
        { opacity: 1, y: 0, x: 0, duration: 0.8 },
        "-=1"
      );

      /* ── Tagline ── */
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );

      /* ── CTA button ── */
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: EASES.mechanicalSnap },
        "-=0.3"
      );

      /* ── Robotic arm entrance ── */
      tl.fromTo(
        armContainerRef.current,
        { opacity: 0, x: 100, rotation: 10 },
        { opacity: 1, x: 0, rotation: 0, duration: 1.2, ease: EASES.hydraulicDampen },
        0.2
      );

      /* ── Background particles orbit animation ── */
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll(".particle");
        particles.forEach((p, i) => {
          gsap.to(p, {
            rotation: 360,
            duration: 20 + i * 5,
            repeat: -1,
            ease: "none",
            transformOrigin: `${150 + i * 40}px ${150 + i * 30}px`,
          });
          gsap.fromTo(
            p,
            { opacity: 0 },
            {
              opacity: 0.4 + Math.random() * 0.3,
              duration: 2,
              delay: 4.5 + i * 0.3,
              ease: "power2.out",
            }
          );
        });
      }

      /* ── Parallax on scroll ── */
      gsap.to(nameRef.current, {
        yPercent: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef, dependencies: [prefersReduced] }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-cyber-bg"
      aria-label="Hero section"
    >
      {/* ── Grid + Scanlines background ── */}
      <div className="grid-bg scanlines absolute inset-0 opacity-50" />

      {/* ── Electromagnetic field lines (decorative) ── */}
      <div ref={particlesRef} className="pointer-events-none absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              top: `${20 + i * 8}%`,
              left: `${10 + i * 10}%`,
              background:
                i % 3 === 0
                  ? "#00f0ff"
                  : i % 3 === 1
                    ? "#ff00d4"
                    : "#ff4d00",
              boxShadow: `0 0 ${8 + i * 4}px currentColor`,
              opacity: 0,
            }}
          />
        ))}
        {/* Decorative orbit rings */}
        {[200, 300, 420].map((size, i) => (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full border border-neon-cyan/5"
            style={{
              width: size,
              height: size,
              right: `${-size / 4}px`,
              top: `calc(50% - ${size / 2}px)`,
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-12 px-6 py-20 lg:flex-row lg:gap-20">
        {/* Left: Text content */}
        <div className="flex flex-1 flex-col items-start gap-6">
          <div className="mb-2 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-neon-cyan" />
            <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan">
              ROBOTICS ENGINEER
            </span>
          </div>

          <h1
            ref={nameRef}
            className="font-display text-5xl font-bold leading-tight tracking-tight text-text-primary sm:text-6xl lg:text-7xl xl:text-8xl"
            aria-label="ATTARI"
          >
            ATTARI
          </h1>

          <p
            ref={subtitleRef}
            className="max-w-xl font-body text-lg leading-relaxed text-text-secondary opacity-0 sm:text-xl"
          >
            Designing & building <span className="text-neon-cyan">cyber-physical systems</span> that bridge
            the gap between digital intelligence and mechanical precision.
          </p>

          <p
            ref={taglineRef}
            className="font-mono text-xs tracking-widest text-text-muted opacity-0"
          >
            MECHATRONICS · CONTROL SYSTEMS · EMBEDDED AI · VISION
          </p>

          <button
            ref={ctaRef}
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group mt-4 flex items-center gap-3 rounded border border-neon-cyan/30 bg-neon-cyan/5
              px-6 py-3 font-display text-xs tracking-[0.2em] text-neon-cyan opacity-0
              transition-all duration-300 hover:border-neon-cyan/60 hover:bg-neon-cyan/10
              hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
          >
            VIEW PROJECTS
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Right: Robotic Arm */}
        <div
          ref={armContainerRef}
          className="flex flex-1 items-center justify-center opacity-0"
        >
          <div className="relative">
            {/* Glow backdrop */}
            <div
              className="absolute inset-0 -m-10 rounded-full opacity-20 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,240,255,0.3) 0%, transparent 70%)",
              }}
            />
            <RoboticArm
              ref={(refs) => {
                armRefs.current = refs;
                /* Grab SVG element for coordinate transforms */
                const svgEl = armContainerRef.current?.querySelector("svg");
                if (svgEl) svgRef.current = svgEl;
              }}
              width={400}
              height={400}
              className="drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]"
            />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-text-muted">
            SCROLL
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-neon-cyan/60 to-transparent">
            <div
              className="h-3 w-[1px] bg-neon-cyan"
              style={{
                animation: "scrollPulse 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
        <style jsx>{`
          @keyframes scrollPulse {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(12px); opacity: 0.3; }
          }
        `}</style>
      </div>
    </section>
  );
}
