/**
 * ═══════════════════════════════════════════════════════════════
 * HOME PAGE — Production-Ready with Lazy Loading & Code Splitting
 * ═══════════════════════════════════════════════════════════════
 * ✓ Hero section loads immediately (above the fold)
 * ✓ All other sections lazy-loaded with dynamic imports
 * ✓ Professional loading skeletons
 * ✓ SEO-friendly (no SSR blocking)
 * ✓ Optimized bundle size
 */
"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import {
  SectionSkeleton,
  ProjectsSkeleton,
  TimelineSkeleton,
  ContactSkeleton,
} from "@/components/LoadingSkeletons";

// Lazy load all components below the fold with loading states
const About = dynamic(() => import("@/components/About"), {
  loading: () => <SectionSkeleton />,
  ssr: true, // Keep SSR for SEO
});

const Skills = dynamic(() => import("@/components/Skills"), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <ProjectsSkeleton />,
  ssr: true,
});

const Timeline = dynamic(() => import("@/components/Timeline"), {
  loading: () => <TimelineSkeleton />,
  ssr: true,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <ContactSkeleton />,
  ssr: true,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-20 bg-black animate-pulse" />,
  ssr: true,
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
        {/* Hero loads immediately - critical for FCP/LCP */}
        <Hero />
        
        {/* All sections below lazy-loaded */}
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
