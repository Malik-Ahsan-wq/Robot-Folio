/**
 * ═══════════════════════════════════════════════════════════════
 * HOME PAGE — Optimized with Lazy Loading & Code Splitting
 * ═══════════════════════════════════════════════════════════════
 */
"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

// Lazy load heavy components below the fold
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="min-h-screen bg-cyber-bg" />,
});

const Skills = dynamic(() => import("@/components/Skills"), {
  loading: () => <div className="min-h-screen bg-cyber-bg" />,
});

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="min-h-screen bg-cyber-bg" />,
});

const Timeline = dynamic(() => import("@/components/Timeline"), {
  loading: () => <div className="min-h-screen bg-cyber-bg" />,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="min-h-screen bg-cyber-bg" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-20 bg-black" />,
});

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
      <Navigation />
      <main
        className="relative"
        style={{
          overflow: isLoaded ? "visible" : "hidden",
        }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
