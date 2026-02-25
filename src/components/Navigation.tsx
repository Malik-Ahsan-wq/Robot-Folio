"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASES } from "@/utils/eases";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // assuming lucide-react is installed

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { id: "hero", label: "Home", icon: "⬡" },
  { id: "about", label: "About", icon: "◈" },
  { id: "skills", label: "Skills", icon: "⬢" },
  { id: "projects", label: "Projects", icon: "◉" },
  { id: "timeline", label: "Timeline", icon: "◎" },
  { id: "contact", label: "Contact", icon: "◆" },
] as const;

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Active section tracking ────────────────────────────────────────
  const setActiveSectionMemo = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const timeoutId = setTimeout(() => {
      NAV_ITEMS.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return;

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 65%",
          end: "bottom 65%",
          onEnter: () => setActiveSectionMemo(id),
          onEnterBack: () => setActiveSectionMemo(id),
        });

        triggers.push(trigger);
      });
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      triggers.forEach((t) => t.kill());
    };
  }, [setActiveSectionMemo]);



  // ── Entrance animation ─────────────────────────────────────────────
  useGSAP(
    () => {
      if (!navRef.current) return;

      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: EASES.mechanicalSnap,
          delay: 0.4,
        }
      );

      gsap.fromTo(
        ".nav-item",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.8,
        }
      );
    },
    { scope: navRef }
  );

  // Show nav after ~preloader
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3800);
    return () => clearTimeout(timer);
  }, []);

  // ── Mobile menu animation ──────────────────────────────────────────
  useGSAP(
    () => {
      if (!mobileMenuRef.current) return;

      gsap.set(mobileMenuRef.current, { x: "100%" });

      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          x: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          x: "100%",
          duration: 0.4,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [isMobileMenuOpen] }
  );

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      element.focus({ preventScroll: true });
    }
    setIsMobileMenuOpen(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollTo(id);
    }
  }, [scrollTo]);

  const navItems = useMemo(() => NAV_ITEMS, []);

  if (!isVisible) return null;

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-[999]" aria-label="Main navigation">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div
            className="
              flex items-center justify-between
              rounded-b-xl border border-cyan-950/40
              bg-black/40 backdrop-blur-xl shadow-2xl shadow-black/40
              px-5 py-3.5 sm:px-7
            "
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className="
                  flex h-10 w-10 items-center justify-center rounded-lg
                  border border-cyan-700/40 bg-gradient-to-br from-cyan-950/60 to-black/60
                  transition-all duration-300 group-hover:border-cyan-500/60 group-hover:shadow-cyan-500/20
                "
              >
                <span className="text-xl font-black text-cyan-400 tracking-tighter">R</span>
              </div>
              <span className="hidden font-mono text-sm font-semibold tracking-wider text-cyan-300/90 sm:block">
                ROBO.FOLIO
              </span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-2" role="menubar">
              {navItems.map(({ id, label, icon }) => (
                <li key={id} role="none">
                  <button
                    onClick={() => scrollTo(id)}
                    onKeyDown={(e) => handleKeyDown(e, id)}
                    className={`
                      nav-item relative px-4 py-2.5 rounded-lg text-xs font-medium tracking-wide uppercase
                      transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                      ${
                        activeSection === id
                          ? "text-cyan-300 bg-cyan-950/40 border border-cyan-700/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                          : "text-gray-400 hover:text-cyan-200 hover:bg-cyan-950/20"
                      }
                    `}
                    aria-current={activeSection === id ? "page" : undefined}
                    aria-label={`Navigate to ${label} section`}
                    role="menuitem"
                    tabIndex={0}
                  >
                    {label}
                    {activeSection === id && (
                      <span className="absolute -bottom-px left-1/2 h-0.5 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm" aria-hidden="true" />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 text-cyan-400 hover:text-cyan-200 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
            </button>

            {/* Online status pill (desktop only) */}
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(34,197,94,0.7)] animate-pulse-slow" />
              <span className="font-mono text-xs text-emerald-400/90 tracking-wider">ONLINE</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`
          fixed inset-y-0 right-0 z-[1000] w-80 bg-black/90 backdrop-blur-2xl border-l border-cyan-900/40
          lg:hidden transform transition-transform duration-500
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-hidden={!isMobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-12">
            <div id="mobile-menu-title" className="text-2xl font-black text-cyan-400">ROBO.FOLIO</div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-cyan-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded p-1"
              aria-label="Close navigation menu"
            >
              <X size={32} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-col gap-2" role="menu">
            {navItems.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                onKeyDown={(e) => handleKeyDown(e, id)}
                className={`
                  flex items-center gap-4 px-5 py-4 rounded-xl text-lg font-medium
                  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                  ${
                    activeSection === id
                      ? "bg-cyan-950/60 text-cyan-300 border border-cyan-700/50"
                      : "text-gray-300 hover:bg-cyan-950/40 hover:text-cyan-200"
                  }
                `}
                aria-current={activeSection === id ? "page" : undefined}
                aria-label={`Navigate to ${label} section`}
                role="menuitem"
                tabIndex={0}
              >
                <span className="text-2xl opacity-80" aria-hidden="true">{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-cyan-900/40">
            <p className="text-sm text-gray-500 font-mono">
              © 2025–2026 Ahsan Bashir
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}