/**
 * ═══════════════════════════════════════════════════════════════
 * HOME PAGE — Section Composition + Preloader Management
 * ═══════════════════════════════════════════════════════════════
 * Composes all portfolio sections in order. Manages preloader
 * state and controls when the main content becomes interactive.
 */
"use client";

import { useState, useCallback } from "react";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
    /* Unlock scrolling after preloader */
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      {/* ── Preloader (covers everything until boot completes) ── */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* ── Navigation ── */}
      <Navigation />

      {/* ── Main Content Sections ── */}
      <main
        className="relative"
        style={{
          /* Prevent scroll during preloader */
          overflow: isLoaded ? "visible" : "hidden",
        }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
        <Footer/>
      </main>
    </>
  );
}
