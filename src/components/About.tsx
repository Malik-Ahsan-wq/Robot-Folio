/**
 * ═══════════════════════════════════════════════════════════════
 * ABOUT — Assembly Line Narrative
 * ═══════════════════════════════════════════════════════════════
 * Blueprint-grid parallax layers, text assembles like parts on
 * a conveyor belt, interactive self-portrait robot that highlights
 * "upgrades" on scroll with piston easing.
 */
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASES } from "@/utils/eases";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_PARAGRAPHS = [
  {
    title: "ORIGIN SEQUENCE",
    text: "MERN + NEXT.js Developer skilled in building dynamic, responsive, and scalable web applications. Experienced in creating RESTful APIs, secure authentication, and clean UI with React. Strong problem-solving mindset and passion for writing efficient, maintainable code.",
  },
  {
    title: "CORE DIRECTIVE",
    text: "Developed and maintained full-stack web applications using MongoDB, Supabase SQL, Express.js, React.js, and Node.js, improving performance and scalability. Built and integrated RESTful APIs for data exchange between frontend and backend.",
  },
  {
    title: "OPERATIONAL PARAMETERS",
    text: "Implemented authentication & authorization (JWT/OAuth) for secure user access. Collaborated with UI/UX designers to create responsive, user-friendly interfaces using React, Redux, and TailwindCSS. Optimized database queries and schema in MongoDB.",
  },
];

const UPGRADES = [
  { label: "NEURAL CORE", y: "12%", color: "#ff00d4" },
  { label: "VISION ARRAY", y: "22%", color: "#00f0ff" },
  { label: "COMM MODULE", y: "35%", color: "#ff4d00" },
  { label: "ACTUATOR BUS", y: "55%", color: "#00ff88" },
  { label: "POWER CELL", y: "72%", color: "#00f0ff" },
  { label: "LOCOMOTION", y: "88%", color: "#ff00d4" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      /* ── Blueprint grid subtle distortion on scroll ── */
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          backgroundPosition: "20px 40px",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      /* ── Section heading ── */
      const heading = sectionRef.current.querySelector(".section-heading");
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: EASES.hydraulicDampen,
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      /* ── Paragraphs: conveyor belt "pick & place" entrance ── */
      const cards = sectionRef.current.querySelectorAll(".about-card");
      cards.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        /* Slide in from right (like placed by gripper) */
        tl.fromTo(
          card,
          {
            opacity: 0,
            x: 120,
            rotation: 3,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 0.9,
            ease: EASES.hydraulicDampen,
            delay: i * 0.1,
          }
        );

        /* Mechanical "clank" snap */
        tl.to(card, {
          y: -3,
          duration: 0.08,
          ease: "power1.in",
        });
        tl.to(card, {
          y: 0,
          duration: 0.15,
          ease: EASES.mechanicalSnap,
        });
      });

      /* ── Self-portrait robot: scroll-driven upgrade highlights ── */
      const upgrades = sectionRef.current.querySelectorAll(".upgrade-node");
      upgrades.forEach((node, i) => {
        gsap.fromTo(
          node,
          { opacity: 0.2, scale: 0.8, x: -10 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.6,
            ease: EASES.mechanicalSnap,
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.05,
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen overflow-hidden bg-cyber-bg py-32"
      aria-label="About section"
    >
      {/* ── Blueprint Grid Background ── */}
      <div
        ref={gridRef}
        className="grid-bg absolute inset-0 opacity-40"
      />

      {/* ── Decorative horizontal rule ── */}
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Section Header ── */}
        <div className="section-heading mb-20 opacity-0">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-neon-cyan" />
            <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan">
              01 — ABOUT
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
            SYSTEM <span className="text-neon-cyan text-glow-cyan">PROFILE</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          {/* ── Left: About Cards (Conveyor) ── */}
          <div className="flex flex-1 flex-col gap-8">
            {ABOUT_PARAGRAPHS.map((para, i) => (
              <div
                key={i}
                className="about-card rounded-lg border border-metal-dark/50 bg-cyber-panel/60 p-8 opacity-0 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-neon-cyan/10 font-mono text-xs text-neon-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-sm tracking-[0.2em] text-neon-cyan">
                    {para.title}
                  </h3>
                </div>
                <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg">
                  {para.text}
                </p>
              </div>
            ))}
          </div>

          {/* ── Right: Self-Portrait Robot Blueprint ── */}
          <div className="flex flex-1 items-center justify-center lg:justify-end">
            <div
              ref={robotRef}
              className="relative h-[500px] w-[280px] rounded-lg border border-metal-dark/30 bg-cyber-panel/30 p-4"
            >
              {/* Robot silhouette (simplified) */}
              <svg
                viewBox="0 0 200 400"
                className="h-full w-full opacity-20"
                aria-hidden="true"
              >
                {/* Head */}
                <rect x="65" y="10" width="70" height="50" rx="12" stroke="#4a5568" fill="none" strokeWidth="1" />
                {/* Eyes */}
                <circle cx="85" cy="35" r="6" stroke="#00f0ff" fill="none" strokeWidth="1" />
                <circle cx="115" cy="35" r="6" stroke="#00f0ff" fill="none" strokeWidth="1" />
                {/* Neck */}
                <rect x="90" y="60" width="20" height="20" stroke="#4a5568" fill="none" strokeWidth="1" />
                {/* Torso */}
                <rect x="55" y="80" width="90" height="120" rx="8" stroke="#4a5568" fill="none" strokeWidth="1" />
                {/* Core */}
                <circle cx="100" cy="140" r="15" stroke="#00f0ff" fill="none" strokeWidth="0.5" opacity="0.5" />
                {/* Arms */}
                <rect x="20" y="90" width="30" height="80" rx="6" stroke="#4a5568" fill="none" strokeWidth="1" />
                <rect x="150" y="90" width="30" height="80" rx="6" stroke="#4a5568" fill="none" strokeWidth="1" />
                {/* Legs */}
                <rect x="60" y="205" width="35" height="100" rx="6" stroke="#4a5568" fill="none" strokeWidth="1" />
                <rect x="105" y="205" width="35" height="100" rx="6" stroke="#4a5568" fill="none" strokeWidth="1" />
                {/* Feet */}
                <rect x="55" y="305" width="45" height="20" rx="4" stroke="#4a5568" fill="none" strokeWidth="1" />
                <rect x="100" y="305" width="45" height="20" rx="4" stroke="#4a5568" fill="none" strokeWidth="1" />
              </svg>

              {/* Upgrade nodes overlaid on robot */}
              {UPGRADES.map((upgrade, i) => (
                <div
                  key={i}
                  className="upgrade-node absolute left-4 right-4 flex items-center gap-3 opacity-20"
                  style={{ top: upgrade.y }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: upgrade.color,
                      boxShadow: `0 0 10px ${upgrade.color}`,
                    }}
                  />
                  <span className="h-[1px] flex-1" style={{ backgroundColor: `${upgrade.color}40` }} />
                  <span
                    className="rounded border px-2 py-0.5 font-mono text-[10px] tracking-wider"
                    style={{
                      borderColor: `${upgrade.color}40`,
                      color: upgrade.color,
                    }}
                  >
                    {upgrade.label}
                  </span>
                </div>
              ))}

              {/* Corner brackets */}
              <div className="hud-bracket absolute inset-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
