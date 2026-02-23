/**
 * ═══════════════════════════════════════════════════════════════
 * PROJECTS — Continuous Auto-Sliding Carousel
 * ═══════════════════════════════════════════════════════════════
 * Cards as "machined parts" ejected from central forge.
 * Continuous infinite marquee slider — pauses on hover.
 * Fully responsive across all screen sizes.
 */
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { EASES } from "@/utils/eases";

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
    title: "MP4 TO GIF CONVERTER",
    subtitle: "Online Conversion Tool",
    description:
      "Designed and implemented mp4togif.org, an online MP4-to-GIF conversion tool. Built with Next.js and integrated with on4t.com platform for seamless media processing.",
    tech: ["Next.js", "React", "Node.js", "API Integration", "Media Processing"],
    metrics: [
      { label: "USERS", value: "10K+" },
      { label: "UPTIME", value: "99.8%" },
      { label: "SPEED", value: "<3s" },
    ],
    accentColor: "#00f0ff",
    year: "2024",
  },
  {
    id: "proj-2",
    title: "WEBSOLAVE TOOLS",
    subtitle: "Social Media Tools Platform",
    description:
      "Contributed to development of social media tools and web applications at tools.websolave.com. Built responsive interfaces and integrated multiple APIs for enhanced functionality.",
    tech: ["React", "Express.js", "MongoDB", "REST APIs", "TailwindCSS"],
    metrics: [
      { label: "TOOLS", value: "15+" },
      { label: "PERF", value: "+20%" },
      { label: "USERS", value: "5K+" },
    ],
    accentColor: "#ff00d4",
    year: "2023-24",
  },
  {
    id: "proj-3",
    title: "FULL-STACK WEB APPS",
    subtitle: "MERN Stack Applications",
    description:
      "Developed and maintained full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Implemented JWT/OAuth authentication and optimized database queries reducing response time by 20%.",
    tech: ["MERN Stack", "JWT", "OAuth", "Redux", "Supabase"],
    metrics: [
      { label: "APPS", value: "10+" },
      { label: "PERF", value: "-20%" },
      { label: "AUTH", value: "Secure" },
    ],
    accentColor: "#ff4d00",
    year: "2023-25",
  },
  {
    id: "proj-4",
    title: "RESPONSIVE WEBSITES",
    subtitle: "Next.js & React Projects",
    description:
      "Designed many responsive websites with Next.js and React.js technologies. Collaborated with UI/UX designers to create user-friendly interfaces. Deployed applications on Vercel with CI/CD.",
    tech: ["Next.js", "React", "TailwindCSS", "Vercel", "Git/GitHub"],
    metrics: [
      { label: "SITES", value: "20+" },
      { label: "MOBILE", value: "100%" },
      { label: "DEPLOY", value: "Auto" },
    ],
    accentColor: "#00ff88",
    year: "2023-25",
  },
  {
    id: "proj-5",
    title: "ESCASA PLATFORM",
    subtitle: "IT Company Projects",
    description:
      "Front End Developer at ESCASA IT Company. Contributed to development of social media tools and web applications. Worked in Agile environment with version control using Git/GitHub.",
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Agile"],
    metrics: [
      { label: "TEAM", value: "5+" },
      { label: "SPRINT", value: "2wk" },
      { label: "DEPLOY", value: "Weekly" },
    ],
    accentColor: "#00f0ff",
    year: "2024-25",
  },
];

// Duplicate for seamless infinite loop
const LOOPED_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="project-card-wrapper flex-shrink-0 px-3 sm:px-4"
      style={{ width: "clamp(300px, 85vw, 480px)" }}
    >
      <div
        className="card-inner relative h-full overflow-hidden rounded-xl border border-metal-dark/40 bg-cyber-panel/60 p-5 sm:p-8 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] group"
        style={{ minHeight: "420px" }}
      >
        {/* ── HUD Overlay ── */}
        <div className="hud-overlay pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
          className="mb-2 font-display text-xl sm:text-2xl font-bold tracking-wide"
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
        <div className="flex gap-2 sm:gap-4 flex-wrap">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="metric flex flex-col items-center rounded border border-metal-dark/30 bg-cyber-bg/30 px-2 sm:px-3 py-2 min-w-[60px]"
            >
              <span
                className="font-display text-base sm:text-lg font-bold"
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
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  /* ── Section heading entrance ── */
  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: EASES?.hydraulicDampen ?? "power3.out",
          delay: 0.2,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  /* ── Continuous infinite marquee ── */
  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;

    // Each "set" is 1/3 of total duplicated items
    // We animate one full set width then loop
    const totalWidth = track.scrollWidth;
    const oneSetWidth = totalWidth / 3; // because we have 3 copies

    // Start from the middle set so we can loop in both directions
    gsap.set(track, { x: -oneSetWidth });

    tweenRef.current = gsap.to(track, {
      x: `-=${oneSetWidth}`,
      duration: PROJECTS.length * 6, // speed: ~6s per card
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const val = parseFloat(x);
          // When we've gone through one full set, wrap back
          if (val <= -oneSetWidth * 2) return `${-oneSetWidth}px`;
          return `${val}px`;
        },
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  /* ── Pause on hover ── */
  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.resume();

  /* ── Touch swipe to nudge speed ── */
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 30) {
      // nudge the animation position
      const tween = tweenRef.current;
      if (tween) {
        gsap.to(trackRef.current, {
          x: `+=${-delta * 2}`,
          duration: 0.4,
          ease: "power2.out",
      onComplete: () => {
  tween.resume(); // just call it, don’t return it
},
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen overflow-hidden bg-cyber-bg py-24"
      aria-label="Projects section"
    >
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-orange/20 to-transparent" />

      {/* ── Header ── */}
      <div className="relative z-10 px-6 mb-16">
        <div
          ref={headingRef}
          className="section-heading mx-auto max-w-7xl opacity-0"
        >
          <div className="mb-4 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-neon-orange" />
            <span className="font-mono text-xs tracking-[0.3em] text-neon-orange">
              03 — PROJECTS
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
            FOUNDRY{" "}
            <span className="text-neon-orange text-glow-orange">OUTPUT</span>
          </h2>
          <p className="mt-4 max-w-lg font-body text-text-secondary">
            Precision-engineered systems, from concept to deployed hardware.
          </p>
        </div>
      </div>

      {/* ── Edge fade masks ── */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40"
        style={{
          background:
            "linear-gradient(to right, var(--color-cyber-bg, #0a0a0f), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40"
        style={{
          background:
            "linear-gradient(to left, var(--color-cyber-bg, #0a0a0f), transparent)",
        }}
      />

      {/* ── Continuous Slider Track ── */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex items-stretch"
          style={{
            width: "max-content",
            willChange: "transform",
          }}
        >
          {LOOPED_PROJECTS.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${index}`}
              project={project}
            />
          ))}
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="mt-10 flex justify-center gap-2">
        {PROJECTS.map((_, i) => (
          <span
            key={i}
            className="block h-[2px] w-6 rounded-full bg-metal-dark/60"
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes scanVertical {
          0% {
            top: 1rem;
          }
          100% {
            top: calc(100% - 1rem);
          }
        }
      `}</style>
    </section>
  );
}