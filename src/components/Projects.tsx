/**
 * ═══════════════════════════════════════════════════════════════
 * PROJECTS — Horizontal Foundry Carousel (Pinned + Scrub)
 * ═══════════════════════════════════════════════════════════════
 * Cards as "machined parts" ejected from central forge.
 * Iris diaphragm opens via clip-path, content hydraulically extends.
 * Active project: HUD overlay with scanning brackets + data readout.
 */
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASES } from "@/utils/eases";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  year: string;
}

const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "AUTONOMOUS ROVER",
    subtitle: "Mobile Robotics Platform",
    description:
      "6-wheel differential-drive rover with LiDAR SLAM, stereo vision, and autonomous navigation through unstructured terrain. Real-time path planning with D* Lite.",
    tech: ["ROS2", "C++", "SLAM", "LiDAR", "Stereo Vision"],
    metrics: [
      { label: "DOF", value: "6" },
      { label: "UPTIME", value: "99.2%" },
      { label: "NAV ACC", value: "±2cm" },
    ],
    accentColor: "#00f0ff",
    year: "2025",
  },
  {
    id: "proj-2",
    title: "DELTA PICK & PLACE",
    subtitle: "High-Speed Manipulator",
    description:
      "Delta parallel robot for 200+ picks/min in manufacturing. Custom FPGA-based real-time controller running at 10kHz servo loop. Vision-guided bin picking.",
    tech: ["FPGA", "VHDL", "EtherCAT", "OpenCV", "Python"],
    metrics: [
      { label: "SPEED", value: "200+/min" },
      { label: "PRECISION", value: "±0.1mm" },
      { label: "LATENCY", value: "<1ms" },
    ],
    accentColor: "#ff00d4",
    year: "2024",
  },
  {
    id: "proj-3",
    title: "EXOSKELETON ARM",
    subtitle: "Human-Robot Interaction",
    description:
      "Force-feedback upper-limb exoskeleton for rehabilitation. Impedance control with adaptive stiffness, EMG-based intent detection, and gamified therapy interface.",
    tech: ["Control Theory", "EMG", "Sensors", "React", "BLE"],
    metrics: [
      { label: "TORQUE", value: "15Nm" },
      { label: "DOF", value: "4" },
      { label: "WEIGHT", value: "1.2kg" },
    ],
    accentColor: "#ff4d00",
    year: "2024",
  },
  {
    id: "proj-4",
    title: "SWARM DRONES",
    subtitle: "Multi-Agent Coordination",
    description:
      "Fleet of 12 autonomous quadrotors with decentralized consensus-based formation control. Custom flight controller, UWB-based relative positioning, and collision avoidance.",
    tech: ["PX4", "C", "UWB", "Python", "Multi-Agent"],
    metrics: [
      { label: "AGENTS", value: "12" },
      { label: "RANGE", value: "500m" },
      { label: "SYNC", value: "<5ms" },
    ],
    accentColor: "#00ff88",
    year: "2023",
  },
  {
    id: "proj-5",
    title: "NEURAL GRIPPER",
    subtitle: "AI-Powered Grasping",
    description:
      "Soft pneumatic gripper with tactile sensing and deep-RL-trained grasp policy. Handles deformable and irregular objects with 97% success rate across 50+ object categories.",
    tech: ["PyTorch", "RL", "Soft Robotics", "Tactile", "ROS2"],
    metrics: [
      { label: "SUCCESS", value: "97%" },
      { label: "OBJECTS", value: "50+" },
      { label: "INFERENCE", value: "12ms" },
    ],
    accentColor: "#00f0ff",
    year: "2023",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const cards = track.querySelectorAll(".project-card-wrapper");

      /* ── Section heading entrance ── */
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

      /* ── Pinned horizontal scroll ── */
      const scrollDistance = track.scrollWidth - window.innerWidth + 100;

      gsap.to(track, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      /* ── Iris diaphragm reveal for each card ── */
      cards.forEach((card, i) => {
        const inner = card.querySelector(".card-inner");
        const hud = card.querySelector(".hud-overlay");
        const metrics = card.querySelectorAll(".metric");

        /* Iris open via clip-path */
        gsap.fromTo(
          inner,
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(85% at 50% 50%)",
            duration: 1,
            ease: EASES.hydraulicDampen,
            scrollTrigger: {
              trigger: card,
              start: "left 80%",
              end: "left 30%",
              scrub: 1,
              containerAnimation: gsap.getById?.("horizontal") || undefined,
              horizontal: true,
            },
          }
        );

        /* HUD overlay fade in when card is centered */
        if (hud) {
          gsap.fromTo(
            hud,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              scrollTrigger: {
                trigger: card,
                start: "left 50%",
                end: "left 20%",
                scrub: 1,
              },
            }
          );
        }

        /* Metrics counter animation */
        metrics.forEach((m, j) => {
          gsap.fromTo(
            m,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              delay: j * 0.1,
              ease: EASES.mechanicalSnap,
              scrollTrigger: {
                trigger: card,
                start: "left 60%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen overflow-hidden bg-cyber-bg"
      aria-label="Projects section"
    >
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-orange/20 to-transparent" />

      {/* ── Header (scrolls away) ── */}
      <div className="relative z-10 px-6 pt-32">
        <div className="section-heading mx-auto max-w-7xl opacity-0">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-neon-orange" />
            <span className="font-mono text-xs tracking-[0.3em] text-neon-orange">
              03 — PROJECTS
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
            FOUNDRY <span className="text-neon-orange text-glow-orange">OUTPUT</span>
          </h2>
          <p className="mt-4 max-w-lg font-body text-text-secondary">
            Precision-engineered systems, from concept to deployed hardware.
          </p>
        </div>
      </div>

      {/* ── Horizontal Track ── */}
      <div className="mt-16 pl-6">
        <div
          ref={trackRef}
          className="flex items-stretch gap-8"
          style={{ width: `${PROJECTS.length * 520 + 200}px` }}
        >
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="project-card-wrapper flex-shrink-0"
              style={{ width: "480px" }}
            >
              <div className="card-inner relative h-full overflow-hidden rounded-xl border border-metal-dark/40 bg-cyber-panel/60 p-8 backdrop-blur-sm iris-clip">
                {/* ── HUD Overlay ── */}
                <div className="hud-overlay pointer-events-none absolute inset-0 opacity-0">
                  <div className="hud-bracket absolute inset-4" />
                  {/* Scanning line */}
                  <div
                    className="absolute inset-x-4 h-[1px] opacity-30"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
                      animation: "scanVertical 3s linear infinite",
                    }}
                  />
                </div>

                {/* ── Year + Category ── */}
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className="rounded px-3 py-1 font-mono text-[10px] tracking-wider"
                    style={{
                      backgroundColor: project.accentColor + "15",
                      color: project.accentColor,
                      border: `1px solid ${project.accentColor}30`,
                    }}
                  >
                    {project.year}
                  </span>
                  <span className="font-mono text-[10px] text-text-muted">
                    {project.id.toUpperCase()}
                  </span>
                </div>

                {/* ── Title ── */}
                <h3
                  className="mb-2 font-display text-2xl font-bold tracking-wide"
                  style={{ color: project.accentColor }}
                >
                  {project.title}
                </h3>
                <p className="mb-4 font-display text-xs tracking-[0.15em] text-text-muted">
                  {project.subtitle}
                </p>

                {/* ── Description ── */}
                <p className="mb-6 font-body text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>

                {/* ── Tech Stack ── */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-metal-dark/60 bg-cyber-bg/40 px-2 py-0.5 font-mono text-[10px] text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* ── Metrics ── */}
                <div className="flex gap-4">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="metric flex flex-col items-center rounded border border-metal-dark/30 bg-cyber-bg/30 px-3 py-2"
                    >
                      <span
                        className="font-display text-lg font-bold"
                        style={{ color: project.accentColor }}
                      >
                        {m.value}
                      </span>
                      <span className="font-mono text-[8px] tracking-wider text-text-muted">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ── Bottom accent line ── */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scanVertical {
          0% { top: 1rem; }
          100% { top: calc(100% - 1rem); }
        }
      `}</style>
    </section>
  );
}
