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
import Link from "next/link";

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
    {/* ── Enhanced Electromagnetic Field + Orbiting Elements ── */}
<div 
  ref={particlesRef} 
  className="pointer-events-none absolute inset-0 isolate"
  aria-hidden="true"
>
  {/* Subtle animated field gradient background */}
  <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-purple-500/3 to-transparent opacity-60" />

  {/* Animated electromagnetic field lines (SVG – lightweight & smooth) */}
  <svg 
    className="absolute inset-0 w-full h-full opacity-[0.12] md:opacity-[0.18]"
    viewBox="0 0 1400 900"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="emf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#00f0ff" stopOpacity="0.35" />
        <stop offset="50%"  stopColor="#a100ff" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#ff2d95" stopOpacity="0.18" />
      </linearGradient>
    </defs>

    {/* Field lines – curved & flowing */}
    {[...Array(7)].map((_, i) => (
      <path
        key={`emf-${i}`}
        d={`M ${-200 + i*220} ${200 + i*40} 
           Q ${300 + i*180} ${300 + i*90} ${700 + i*120} ${450 + i*60} 
           T ${1400 + i*100} ${750 + i*30}`}
        fill="none"
        stroke="url(#emf-grad)"
        strokeWidth={0.8 + i*0.3}
        strokeLinecap="round"
        className="field-line"
      />
    ))}
  </svg>

  {/* Orbiting particles – cleaner, more elegant distribution */}
  {[...Array(10)].map((_, i) => {
    const size = 2.5 + Math.pow(i, 0.7) * 1.8; // subtle size progression
    const color = i % 4 === 0 ? '#00f0ff' :
                  i % 4 === 1 ? '#ff00d4' :
                  i % 4 === 2 ? '#ff4d00' : '#7cff00';

    return (
      <div
        key={i}
        className="particle absolute rounded-full will-change-transform"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${18 + i * 7.2}%`,
          left: `${8 + i * 8.5 + (i % 3) * 4}%`,
          background: color,
          boxShadow: `0 0 ${size*2.8}px ${color}`,
          opacity: 0,
          filter: 'blur(0.5px)',
        }}
      />
    );
  })}

  {/* Premium orbit rings – subtle, breathing, responsive */}
  {[220, 340, 480, 640].map((baseSize, i) => {
    // Scale rings down noticeably on mobile
    const size = baseSize * (typeof window !== 'undefined' && window.innerWidth < 768 ? 0.65 : 0.92);

    return (
      <div
        key={`orbit-${i}`}
        className="absolute rounded-full border border-cyan-400/6 will-change-transform"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          right: `${-size * 0.28}px`,
          top: `calc(50% - ${size / 2}px)`,
          opacity: 0.08 + i * 0.04,
          animation: `orbitBreath ${14 + i * 5}s ease-in-out infinite ${i * 2.2}s`,
        }}
      />
    );
  })}

  {/* Breathing animation for rings */}
  <style jsx global>{`
    @keyframes orbitBreath {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        opacity: 0.07;
        border-color: rgba(0, 240, 255, 0.06);
      }
      50% {
        transform: scale(1.04) rotate(1.5deg);
        opacity: 0.28;
        border-color: rgba(0, 240, 255, 0.18);
      }
    }

    /* Very subtle field line flow – added in GSAP below */
    .field-line {
      stroke-dasharray: 18 36;
    }
  `}</style>
  
</div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-12 px-6 py-20 lg:flex-row lg:gap-20">
        {/* Left: Text content */}
        <div className="flex flex-1 flex-col items-start md:mt-5 gap-6">
          <div className="mb-2 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-neon-cyan" />
            <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan">
             MERN + NEXT.js DEVELOPER
            </span>
          </div>

        
           <h1
  ref={nameRef}
  className="font-display text-5xl font-extrabold tracking-tighter text-white sm:text-7xl xl:text-8xl"
>
  AHSAN{" "}
  <span className="relative inline-block px-2">
    {/* The Glowing Text Surface */}
    {/* <span className="relative z-10 bg-gradient-to-b from-white via-neon-cyan to-[#008291] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
      BASHIR
    </span> */}

    {/* The "Backlight" Glow - creating the atmospheric depth */}
    <span 
      className="absolute inset-0 z-0 blur-2xl opacity-40 bg-neon-cyan mix-blend-screen"
      aria-hidden="true"
    >
      BASHIR
    </span>

    {/* The Underline Highlight */}
    <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50 shadow-[0_0_20px_#00f0ff]" />
  </span>
</h1>
         

          <p
            ref={subtitleRef}
            className="max-w-xl font-body text-lg leading-relaxed text-text-secondary opacity-0 sm:text-xl"
          >
            MERN + NEXT.js Developer skilled in building <span className="text-neon-cyan">dynamic, responsive, and scalable</span> web applications using MongoDB, Supabase SQL, Express.js, React.js, and Node.js.
          </p>

          <p
            ref={taglineRef}
            className="font-mono text-xs tracking-widest text-text-muted opacity-0"
          >
            REACT.js · NEXT.js · NODE.js · EXPRESS.js · MONGODB · SUPABASE SQL
          </p>
<div className="md:flex gap-4">
         <a
  href="/Ahsan-resume-black-theme.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
  className="group mt-4 flex items-center gap-3 rounded border border-neon-cyan/30 bg-neon-cyan/5
             px-6 py-3 font-display text-xs tracking-[0.2em] text-neon-cyan 
             transition-all duration-300 hover:border-neon-cyan/60 hover:bg-neon-cyan/10
             hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
>
  Download Resume
  <span className="transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</a>
<Link
  href="/ProjectsPage"
 
  rel="noopener noreferrer"
  className="group mt-4 flex items-center gap-3 rounded border border-neon-cyan/30 bg-neon-cyan/5
             px-6 py-3 font-display text-xs tracking-[0.2em] text-neon-cyan 
             transition-all duration-300 hover:border-neon-cyan/60 hover:bg-neon-cyan/10
             hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
>
  View Projects
  <span className="transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</Link>

</div>



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
              globeSize={80}
              globeColor="#00f0ff"
              accentColor="#00f0ff"
              starCount={8}
              width={500}
              height={500}
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
