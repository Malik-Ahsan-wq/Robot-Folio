/**
 * ═══════════════════════════════════════════════════════════════
 * SKILLS — Radial Servo Matrix
 * ═══════════════════════════════════════════════════════════════
 * Hexagonal node grid resembling a circuit board / servo hub array.
 * Nodes boot sequentially with ring expand + servo vibration.
 * Hover: probe arm deploys, data terminal popup, plasma fill bars.
 */
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASES } from "@/utils/eases";
import { useRoboticHover } from "@/hooks/useRoboticHover";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number; // 0–100
  category: string;
  icon: string;
  color: string;
}

const SKILLS: Skill[] = [
  { name: "React.js", level: 95, category: "LANG", icon: "⟨/⟩", color: "#00f0ff" },
  { name: "Next.js", level: 92, category: "LANG", icon: "⟨/⟩", color: "#00f0ff" },
  { name: "Node.js", level: 90, category: "FW", icon: "◎", color: "#00ff88" },
  { name: "Express.js", level: 88, category: "CORE", icon: "∿", color: "#ff00d4" },
  { name: "MongoDB", level: 85, category: "DB", icon: "◉", color: "#ff4d00" },
  { name: "Supabase SQL", level: 82, category: "DB", icon: "◈", color: "#ff4d00" },
  { name: "JavaScript", level: 93, category: "LANG", icon: "⬢", color: "#00f0ff" },
  { name: "TypeScript", level: 88, category: "LANG", icon: "⬡", color: "#00f0ff" },
  { name: "Tailwind CSS", level: 90, category: "CORE", icon: "⤳", color: "#ff00d4" },
  { name: "Bootstrap", level: 85, category: "FW", icon: "⊞", color: "#00ff88" },
  { name: "RESTful APIs", level: 87, category: "CORE", icon: "◎", color: "#ff00d4" },
  { name: "Git/GitHub", level: 88, category: "TOOL", icon: "⬡", color: "#00f0ff" },
];

function SkillNode({ skill, index }: { skill: Skill; index: number }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { onMouseEnter, onMouseLeave } = useRoboticHover({
    glowColor: skill.color + "66",
    scale: 1.05,
    vibrationStrength: 0.8,
  });

  useGSAP(() => {
    if (!nodeRef.current || !barRef.current) return;

    /* Proficiency bar fills with plasma flow on scroll */
    gsap.fromTo(
      barRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1.2,
        ease: EASES.hydraulicDampen,
        scrollTrigger: {
          trigger: nodeRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.05,
      }
    );
  }, { scope: nodeRef });

  return (
    <div
      ref={nodeRef}
      className="skill-node group relative flex flex-col gap-3 rounded-lg border border-metal-dark/40
        bg-cyber-panel/50 p-5 backdrop-blur-sm transition-colors duration-300
        hover:border-opacity-60"
      style={{ borderColor: skill.color + "30" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="listitem"
      aria-label={`${skill.name}: ${skill.level}% proficiency`}
    >
      {/* ── Category tag ── */}
      <div className="flex items-center justify-between">
        <span
          className="rounded px-2 py-0.5 font-mono text-[9px] tracking-wider"
          style={{
            backgroundColor: skill.color + "15",
            color: skill.color,
            border: `1px solid ${skill.color}30`,
          }}
        >
          {skill.category}
        </span>
        <span className="text-lg opacity-50" style={{ color: skill.color }}>
          {skill.icon}
        </span>
      </div>

      {/* ── Skill name ── */}
      <h3 className="font-display text-sm tracking-wide text-text-primary">
        {skill.name}
      </h3>

      {/* ── Proficiency bar ── */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-metal-dark/60">
        <div
          ref={barRef}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${skill.level}%`,
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
            boxShadow: `0 0 12px ${skill.color}40`,
          }}
        />
      </div>

      {/* ── Level percentage ── */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-text-muted">LEVEL</span>
        <span
          className="font-mono text-xs font-bold"
          style={{ color: skill.color }}
        >
          {skill.level}%
        </span>
      </div>

      {/* ── Hover: scan line effect ── */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${skill.color}08 50%, transparent 100%)`,
        }}
      />
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

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

      /* ── Nodes boot sequentially ── */
      const nodes = sectionRef.current.querySelectorAll(".skill-node");
      gsap.fromTo(
        nodes,
        {
          opacity: 0,
          scale: 0.85,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: EASES.mechanicalSnap,
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".skills-grid"),
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── Servo vibration micro-animation on entry ── */
      nodes.forEach((node, i) => {
        gsap.to(node, {
          skewX: 0.5,
          scaleX: 1.005,
          duration: 0.06,
          repeat: 3,
          yoyo: true,
          ease: "none",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.06 + 0.4,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen overflow-hidden bg-cyber-bg py-32"
      aria-label="Skills section"
    >
      {/* ── Grid background ── */}
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-magenta/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Section Header ── */}
        <div className="section-heading mb-20 opacity-0">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-neon-magenta" />
            <span className="font-mono text-xs tracking-[0.3em] text-neon-magenta">
              02 — CAPABILITIES
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
            SERVO <span className="text-neon-magenta text-glow-magenta">MATRIX</span>
          </h2>
          <p className="mt-4 max-w-lg font-body text-text-secondary">
            Core competencies calibrated through years of building intelligent machines.
          </p>
        </div>

        {/* ── Skills Grid ── */}
        <div
          className="skills-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
          aria-label="Skills list"
        >
          {SKILLS.map((skill, i) => (
            <SkillNode key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* ── Legend ── */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {[
            { label: "LANGUAGES", color: "#00f0ff" },
            { label: "WEB CORE", color: "#ff00d4" },
            { label: "DATABASES", color: "#ff4d00" },
            { label: "FRAMEWORKS", color: "#00ff88" },
            { label: "TOOLS", color: "#00f0ff" },
          ].map((cat) => (
            <div key={cat.label} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="font-mono text-[10px] tracking-wider text-text-muted">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
