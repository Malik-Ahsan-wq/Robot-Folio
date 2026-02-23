/**
 * ═══════════════════════════════════════════════════════════════
 * TIMELINE — Conveyor Belt Assembly
 * ═══════════════════════════════════════════════════════════════
 * Central rail track where robotic "crane" places each milestone.
 * Scroll drives conveyor motion + arm picking/placing via
 * MotionPath master timeline controlling sub-timelines.
 * Each entry locks with clank (scale overshoot + jitter).
 */
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASES } from "@/utils/eases";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  description: string;
  type: "education" | "work" | "achievement";
  accentColor: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2018",
    title: "FIRST ROBOT BUILD",
    description:
      "Built an autonomous line-following robot for national competition. First taste of PID control and sensor fusion.",
    type: "achievement",
    accentColor: "#00ff88",
  },
  {
    year: "2019",
    title: "B.Sc. MECHATRONICS",
    description:
      "Enrolled in Mechatronics Engineering. Deep dive into dynamics, control systems, and embedded programming.",
    type: "education",
    accentColor: "#00f0ff",
  },
  {
    year: "2020",
    title: "ROBOTICS LAB INTERN",
    description:
      "Joined university robotics lab. Developed ROS-based navigation stack for an indoor mobile robot with LiDAR mapping.",
    type: "work",
    accentColor: "#ff00d4",
  },
  {
    year: "2021",
    title: "FPGA CONTROLLER PROJECT",
    description:
      "Designed a real-time motor controller on FPGA achieving 10kHz control loop. Published findings at IEEE conference.",
    type: "achievement",
    accentColor: "#ff4d00",
  },
  {
    year: "2022",
    title: "ROBOTICS ENGINEER",
    description:
      "Joined an industrial automation company. Worked on delta robots, conveyor systems, and vision-guided pick-and-place.",
    type: "work",
    accentColor: "#ff00d4",
  },
  {
    year: "2023",
    title: "SWARM ROBOTICS LEAD",
    description:
      "Led development of multi-agent drone swarm with decentralized coordination. Deployed fleet of 12 autonomous UAVs.",
    type: "work",
    accentColor: "#ff00d4",
  },
  {
    year: "2024",
    title: "M.Sc. COMPLETED",
    description:
      "Master's in Robotics & AI. Thesis on learned grasp planning for deformable objects using deep reinforcement learning.",
    type: "education",
    accentColor: "#00f0ff",
  },
  {
    year: "2025",
    title: "AUTONOMOUS SYSTEMS LEAD",
    description:
      "Leading development of next-gen autonomous mobile robots with advanced perception and manipulation capabilities.",
    type: "work",
    accentColor: "#ff00d4",
  },
];

const TYPE_ICONS: Record<string, string> = {
  education: "◈",
  work: "⬢",
  achievement: "★",
};

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackLineRef = useRef<HTMLDivElement>(null);

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

      /* ── Central track line grows as you scroll ── */
      if (trackLineRef.current) {
        gsap.fromTo(
          trackLineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }

      /* ── Milestone cards: crane drop + clank ── */
      const entries = sectionRef.current.querySelectorAll(".timeline-entry");
      entries.forEach((entry, i) => {
        const isLeft = i % 2 === 0;
        const card = entry.querySelector(".timeline-card");
        const node = entry.querySelector(".year-node");
        const pulse = entry.querySelector(".pulse-ring");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        /* Year node magnetic snap */
        if (node) {
          tl.fromTo(
            node,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: EASES.mechanicalSnap,
            },
            0
          );
        }

        /* Pulse ring emission */
        if (pulse) {
          tl.fromTo(
            pulse,
            { scale: 0.5, opacity: 0.8 },
            {
              scale: 2.5,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            0.1
          );
        }

        /* Card: crane drop from above */
        if (card) {
          tl.fromTo(
            card,
            {
              opacity: 0,
              y: -50,
              x: isLeft ? -40 : 40,
              rotation: isLeft ? -3 : 3,
              scale: 0.92,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              rotation: 0,
              scale: 1,
              duration: 0.7,
              ease: EASES.hydraulicDampen,
            },
            0.15
          );

          /* Clank: micro overshoot + jitter */
          tl.to(card, {
            y: -4,
            duration: 0.06,
            ease: "power1.in",
          });
          tl.to(card, {
            y: 0,
            duration: 0.12,
            ease: EASES.mechanicalSnap,
          });
          /* Micro-jitter */
          tl.to(card, {
            x: 1.5,
            duration: 0.03,
            yoyo: true,
            repeat: 2,
            ease: "none",
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative min-h-screen overflow-hidden bg-cyber-bg py-32"
      aria-label="Timeline section"
    >
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* ── Section Header ── */}
        <div className="section-heading mb-20 text-center opacity-0">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-[2px] w-12 bg-neon-green" />
            <span className="font-mono text-xs tracking-[0.3em] text-neon-green">
              04 — TRAJECTORY
            </span>
            <span className="h-[2px] w-12 bg-neon-green" />
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
            ASSEMBLY <span className="text-neon-green" style={{ textShadow: "0 0 10px rgba(0,255,136,0.4)" }}>LOG</span>
          </h2>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Central track line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2">
            <div
              ref={trackLineRef}
              className="h-full w-full bg-gradient-to-b from-neon-cyan/60 via-neon-magenta/40 to-neon-green/60"
            />
          </div>

          {/* Entries */}
          <div className="flex flex-col gap-16">
            {MILESTONES.map((milestone, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={milestone.year + milestone.title}
                  className={`timeline-entry relative flex items-center gap-8 ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`timeline-card flex-1 rounded-lg border border-metal-dark/40 bg-cyber-panel/50 p-6 opacity-0 backdrop-blur-sm ${
                      isLeft ? "text-right" : "text-left"
                    }`}
                    style={{ borderColor: milestone.accentColor + "25" }}
                  >
                    <div className={`mb-3 flex items-center gap-2 ${isLeft ? "justify-end" : "justify-start"}`}>
                      <span
                        className="rounded px-2 py-0.5 font-mono text-[9px] tracking-wider"
                        style={{
                          backgroundColor: milestone.accentColor + "15",
                          color: milestone.accentColor,
                        }}
                      >
                        {TYPE_ICONS[milestone.type]} {milestone.type.toUpperCase()}
                      </span>
                    </div>
                    <h3
                      className="mb-2 font-display text-sm font-bold tracking-wide"
                      style={{ color: milestone.accentColor }}
                    >
                      {milestone.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-text-secondary">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Year Node (centered on track) */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Pulse ring */}
                    <div
                      className="pulse-ring absolute h-10 w-10 rounded-full opacity-0"
                      style={{ border: `1px solid ${milestone.accentColor}` }}
                    />
                    <div
                      className="year-node flex h-10 w-10 items-center justify-center rounded-full border-2 bg-cyber-bg opacity-0"
                      style={{
                        borderColor: milestone.accentColor,
                        boxShadow: `0 0 15px ${milestone.accentColor}40`,
                      }}
                    >
                      <span
                        className="font-mono text-[9px] font-bold"
                        style={{ color: milestone.accentColor }}
                      >
                        {milestone.year.slice(-2)}
                      </span>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
