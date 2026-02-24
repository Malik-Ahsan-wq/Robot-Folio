/**
 * ═══════════════════════════════════════════════════════════════
 * NAVIGATION — Floating Robotic Command Bar
 * ═══════════════════════════════════════════════════════════════
 * Fixed-position HUD nav with glow accents, section indicators,
 * and GSAP-animated entrance + active state tracking.
 */
"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASES } from "@/utils/eases";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { id: "hero", label: "HOME", icon: "⬡" },
  { id: "about", label: "ABOUT", icon: "◈" },
  { id: "skills", label: "SKILLS", icon: "⬢" },
  { id: "projects", label: "PROJECTS", icon: "◉" },
  { id: "timeline", label: "TIMELINE", icon: "◎" },
  { id: "contact", label: "CONTACT", icon: "◆" },
] as const;

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  /* ── Track active section via ScrollTrigger ── */
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Small delay to let sections mount
    const timer = setTimeout(() => {
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });

        triggers.push(st);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      triggers.forEach((st) => st.kill());
    };
  }, []);

  /* ── Nav entrance animation ── */
  useGSAP(
    () => {
      if (!navRef.current || !isVisible) return;

      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: EASES.mechanicalSnap,
        }
      );

      /* Stagger nav items */
      gsap.fromTo(
        navRef.current.querySelectorAll(".nav-item"),
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: EASES.hydraulicDampen,
          delay: 0.3,
        }
      );
    },
    { scope: navRef, dependencies: [isVisible] }
  );

  /* Show nav after preloader completes */
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 opacity-0"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between rounded-lg border border-metal-dark/50 bg-cyber-bg/80 px-6 py-2 backdrop-blur-xl">
          {/* ── Logo / Brand ── */}
          <div className="flex items-center gap-3">
            <Link href="/">
            <div className="flex h-12 w-12 items-center justify-center rounded border border-neon-cyan/30">
              <span className="text-sm font-bold text-neon-cyan font-display text-glow-cyan">
                ◈
              </span>
            </div>
            </Link>
            <span className="hidden font-display text-xs tracking-[0.3em] text-text-secondary sm:block">
              ROBO.FOLIO
            </span>
          </div>

          {/* ── Nav Links ── */}
          <ul className="flex items-center gap-1" role="menubar">
            {NAV_ITEMS.map(({ id, label, icon }) => (
              <li key={id} role="none">
                <button
                  role="menuitem"
                  onClick={() => scrollTo(id)}
                  className={`nav-item   group relative flex items-center gap-1.5 rounded px-3 py-1.5
                    font-display text-[10px] tracking-[0.2em]  transition-colors duration-200
                    ${
                      activeSection === id
                        ? "text-neon-cyan text-glow-cyan"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  <span className="text-xs opacity-60">{icon}</span>
                  <span className="hidden lg:inline">{label}</span>

                  {/* Active indicator bar */}
                  {activeSection === id && (
                    <span className="absolute bottom-0 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* ── Status Indicator ── */}
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-neon-green shadow-[0_0_8px_rgba(0,255,136,0.6)]" />
            <span className="font-mono text-[10px] text-neon-green">
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
