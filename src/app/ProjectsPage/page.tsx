'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';

gsap.registerPlugin(ScrollTrigger);

const ProjectsPage: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridLineRefs = useRef<HTMLDivElement[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Master timeline
    const masterTL = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Scanline animation
    if (scanlineRef.current) {
      gsap.to(scanlineRef.current, {
        y: '100vh',
        duration: 1.4,
        ease: 'power2.inOut',
        onComplete: () => {
          if (scanlineRef.current) scanlineRef.current.style.display = 'none';
        }
      });
    }

    // Grid lines entrance
    gridLineRefs.current.forEach((line, i) => {
      if (line) {
        masterTL.fromTo(line,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, delay: i * 0.05 },
          0.3
        );
      }
    });

    // Title animation - character split effect
    masterTL.fromTo(
      titleRef.current,
      { opacity: 0, y: 80, skewY: 5 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: 'expo.out' },
      0.8
    );

    masterTL.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30, letterSpacing: '0.5em' },
      { opacity: 1, y: 0, letterSpacing: '0.15em', duration: 1, ease: 'expo.out' },
      1.1
    );

    // Stats counter animation
    if (statsRef.current) {
      masterTL.fromTo(statsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.3
      );
    }

    // Cards with ScrollTrigger
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 100, scale: 0.85, rotationX: 15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.15,
        }
      );
    });

    // Floating orbs animation
    gsap.to('.orb-1', {
      x: 40,
      y: -30,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    gsap.to('.orb-2', {
      x: -35,
      y: 50,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2,
    });
    gsap.to('.orb-3', {
      x: 20,
      y: 40,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1,
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const projects = [
    {
      title: 'Full Stack Rental Car System',
      description: 'rental car system with real-time tracking and autonomous features.',
      tech: ['NEXT.js', 'Tailwind CSS', 'typeScript', 'MongoDB'],
      image: '/carrr.PNG',
      category: 'Aerial Systems',
      status: 'ACTIVE',
      year: '2024',
      metric: '99.2% uptime',
      accent: '#00f5d4',
    },
    {
      title: 'Full Stack School Management System',
      description: 'Precision robotic arm for automated manufacturing tasks.',
      tech: ['NEXT.js', 'Tailwind CSS', 'typeScript', 'MongoDB'],
      image: '/dkflsf000.PNG',
      category: 'Industrial',
      status: 'DEPLOYED',
      year: '2024',
      metric: '0.01mm precision',
      accent: '#f72585',
    },
    {
      title: 'Full Stack Portfolio Website',
      description: 'portfolio website with interactive project showcases and dynamic content.',
      tech: ['NEXT.js', 'Tailwind CSS', 'typeScript', 'MongoDB'],
      image: '/Captureccccccc.PNG',
      category: 'HRI',
      status: 'BETA',
      year: '2025',
      metric: '340+ interactions',
      accent: '#7209b7',
    },


    {
      title: 'Full Stack E-Commerce Website',
      description: 'e-commerce website with interactive project showcases and dynamic content.',
      tech: ['NEXT.js', 'Tailwind CSS', 'typeScript', 'supabase SQL'],
      image: '/post1.PNG',
      category: 'HRI',
      status: 'BETA',
      year: '2025',
      metric: '340+ interactions',
      accent: '#7209b7',
    },


     {
      title: 'Full Stack Restaurent Website',
      description: 'restaurent website with interactive project showcases and dynamic content.',
      tech: ['NEXT.js', 'Tailwind CSS', 'typeScript', 'MongoDB'],
      image: '/kkmmjjnngg.PNG',
      category: 'HRI',
      status: 'BETA',
      year: '2025',
      metric: '340+ interactions',
      accent: '#7209b7',
    },


     {
      title: 'Full Stack Portfolio Website',
      description: 'portfolio website with interactive project showcases and dynamic content.',
      tech: ['NEXT.js', 'Tailwind CSS', 'typeScript', 'MongoDB'],
      image: '/xxxxxx.PNG',
      category: 'HRI',
      status: 'BETA',
      year: '2025',
      metric: '340+ interactions',
      accent: '#7209b7',
    },

     {
      title: 'Full Stack Coffee Website',
      description: 'coffee website with interactive project showcases and dynamic content.',
      tech: ['NEXT.js', 'Tailwind CSS', 'typeScript', 'MongoDB'],
      image: '/cxcxxcxcxc.PNG',
      category: 'HRI',
      status: 'BETA',
      year: '2025',
      metric: '340+ interactions',
      accent: '#7209b7',
    },



    {
      title: 'Full Stack client Website',
      description: 'client website with interactive project showcases and dynamic content.',
      tech: ['NEXT.js', 'Tailwind CSS', 'typeScript', 'MongoDB'],
      image: '/dbbvcyr.PNG',
      category: 'HRI',
      status: 'BETA',
      year: '2025',
      metric: '340+ interactions',
      accent: '#7209b7',
    },
  ];

  const stats = [
    { value: '6+', label: 'Projects' },
    { value: '98%', label: 'Uptime' },
    { value: '4', label: 'Labs' },
    { value: '2023 - 2025', label: 'Latest Build' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Chakra+Petch:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap');

        * { box-sizing: border-box; }

        body { background: #020408; }

        .projects-root {
          font-family: 'Chakra Petch', monospace;
          background: #020408;
          min-height: 100vh;
          color: #e2e8f0;
          overflow-x: hidden;
          position: relative;
        }

        /* Scanline intro */
        .scanline-intro {
          position: fixed;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, #00f5d4 50%, transparent 100%);
          height: 4px;
          width: 100%;
          z-index: 9999;
          box-shadow: 0 0 40px #00f5d4, 0 0 80px #00f5d4;
          pointer-events: none;
          top: -4px;
        }

        /* Grid background */
        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 245, 212, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 212, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* Floating orbs */
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .orb-1 { width: 500px; height: 500px; background: rgba(0,245,212,0.06); top: -100px; right: -100px; }
        .orb-2 { width: 400px; height: 400px; background: rgba(247,37,133,0.05); bottom: 100px; left: -100px; }
        .orb-3 { width: 300px; height: 300px; background: rgba(114,9,183,0.07); top: 40%; right: 20%; }

        /* Hero section */
        .hero-section {
          position: relative;
          z-index: 1;
          padding: 160px 40px 80px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .hero-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.4em;
          color: #00f5d4;
          text-transform: uppercase;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hero-label::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #00f5d4;
        }

        .hero-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(52px, 8vw, 110px);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
          background: linear-gradient(135deg, #ffffff 0%, #b0bec5 60%, #00f5d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-title .accent {
          display: block;
          background: linear-gradient(135deg, #00f5d4, #7209b7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.15em;
          color: #64748b;
          margin: 0 0 60px;
          text-transform: uppercase;
        }

        /* Stats bar */
        .stats-bar {
          display: flex;
          gap: 0;
          border: 1px solid rgba(0,245,212,0.15);
          border-radius: 2px;
          overflow: hidden;
          max-width: 600px;
          margin-bottom: 0;
        }

        .stat-item {
          flex: 1;
          padding: 20px 24px;
          border-right: 1px solid rgba(0,245,212,0.1);
          position: relative;
          overflow: hidden;
        }

        .stat-item:last-child { border-right: none; }

        .stat-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,245,212,0.03);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .stat-item:hover::before { opacity: 1; }

        .stat-value {
          font-family: 'Rajdhani', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #00f5d4;
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: #475569;
          text-transform: uppercase;
        }

        /* Horizontal rule */
        .section-divider {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto 80px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(0,245,212,0.5), transparent);
          transform-origin: left;
        }

        .divider-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.4em;
          color: #334155;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* Projects grid */
        .projects-section {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px 120px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        /* Project card */
        .project-card {
          position: relative;
          background: rgba(8, 15, 26, 0.8);
          border: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
          cursor: pointer;
          transform-style: preserve-3d;
          perspective: 1000px;
          transition: border-color 0.3s;
          backdrop-filter: blur(10px);
        }

        .project-card:hover {
          border-color: rgba(0,245,212,0.2);
          z-index: 2;
        }

        .card-border {
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          pointer-events: none;
          z-index: 10;
          opacity: 0;
          background: linear-gradient(#020408, #020408) padding-box,
                      linear-gradient(135deg, #00f5d4, transparent 60%) border-box;
        }

        .card-noise {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* Image container */
        .card-image-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .card-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(40%) contrast(1.1);
          transition: filter 0.5s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        .project-card:hover .card-image-wrap img {
          filter: grayscale(0%) contrast(1.05);
          transform: scale(1.08);
        }

        /* Image overlay */
        .img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 30%,
            rgba(2,4,8,0.9) 100%
          );
        }

        .img-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.05) 2px,
            rgba(0,0,0,0.05) 4px
          );
          pointer-events: none;
        }

        /* Category badge */
        .card-category {
          position: absolute;
          top: 16px;
          left: 16px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.35em;
          padding: 5px 10px;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          background: rgba(0,0,0,0.4);
          z-index: 2;
        }

        /* Status badge */
        .card-status {
          position: absolute;
          top: 16px;
          right: 16px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          padding: 5px 10px;
          text-transform: uppercase;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00f5d4;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* Card body */
        .card-body {
          padding: 28px 28px 32px;
          position: relative;
        }

        .card-year {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: #334155;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .card-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 24px;
          font-weight: 600;
          color: #f1f5f9;
          line-height: 1.15;
          margin: 0 0 12px;
          letter-spacing: 0.02em;
          transition: color 0.3s;
        }

        .project-card:hover .card-title {
          color: #ffffff;
        }

        .card-desc {
          font-family: 'Chakra Petch', monospace;
          font-size: 13px;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 20px;
          font-weight: 300;
        }

        /* Metric */
        .card-metric {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          padding: 12px 16px;
          background: rgba(0,245,212,0.04);
          border-left: 2px solid #00f5d4;
        }

        .metric-icon {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: #00f5d4;
          letter-spacing: 0.2em;
        }

        .metric-value {
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #00f5d4;
          letter-spacing: 0.05em;
        }

        /* Tech tags */
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          padding: 5px 10px;
          border: 1px solid rgba(255,255,255,0.08);
          color: #64748b;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }

        .project-card:hover .tech-tag {
          border-color: rgba(0,245,212,0.2);
          color: #94a3b8;
        }

        /* Corner decoration */
        .card-corner {
          position: absolute;
          bottom: 28px;
          right: 28px;
          width: 20px;
          height: 20px;
          border-right: 1px solid rgba(0,245,212,0.3);
          border-bottom: 1px solid rgba(0,245,212,0.3);
          transition: all 0.3s;
        }

        .project-card:hover .card-corner {
          width: 28px;
          height: 28px;
          border-color: #00f5d4;
        }

        /* Section header */
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
        }

        .section-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.4em;
          color: #00f5d4;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .section-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          color: #f1f5f9;
          margin: 0;
          letter-spacing: 0.02em;
          line-height: 1;
        }

        .section-count {
          font-family: 'Rajdhani', sans-serif;
          font-size: 64px;
          font-weight: 700;
          color: rgba(255,255,255,0.04);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        /* Footer */
        .projects-footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          color: #1e293b;
          text-transform: uppercase;
        }

        .footer-logo {
          font-family: 'Rajdhani', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: 0.1em;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr; }
          .hero-section { padding: 120px 20px 60px; }
          .projects-section { padding: 0 20px 80px; }
          .stats-bar { flex-wrap: wrap; }
          .stat-item { min-width: 50%; border-bottom: 1px solid rgba(0,245,212,0.1); }
          .section-divider { padding: 0 20px; }
          .section-header { flex-direction: column; align-items: flex-start; gap: 0; }
          .section-count { display: none; }
          .projects-footer { flex-direction: column; gap: 16px; padding: 32px 20px; }
        }

        @media (max-width: 480px) {
          .hero-section { padding: 100px 16px 50px; }
          .projects-section { padding: 0 16px 60px; }
          .card-body { padding: 20px 20px 24px; }
        }
      `}</style>

      <Navigation />

      <div className="projects-root">
        {/* Scanline intro */}
        <div className="scanline-intro" ref={scanlineRef} />

        {/* Background elements */}
        <div className="grid-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Hero Section */}
        <section className="hero-section" ref={heroRef}>
          <div className="hero-label">NEXUS ROBOTICS LAB // 2025</div>
          <h1 className="hero-title" ref={titleRef}>
           MY All
            <span className="accent">Projects.</span>
          </h1>
          <p className="hero-subtitle" ref={subtitleRef}>
            Autonomous Systems & Intelligent Machines
          </p>

          <div className="stats-bar" ref={statsRef}>
            {stats.map((s, i) => (
              <div className="stat-item" key={i}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div
            className="divider-line"
            ref={(el) => { if (el) gridLineRefs.current[0] = el; }}
          />
          <div className="divider-text">Active Deployments</div>
          <div
            className="divider-line"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.3))' }}
            ref={(el) => { if (el) gridLineRefs.current[1] = el; }}
          />
        </div>

        {/* Projects Section */}
        <section className="projects-section">
          <div className="section-header">
            <div>
              <div className="section-label">// Project Registry</div>
              <h2 className="section-title">Featured Systems</h2>
            </div>
            <div className="section-count">03</div>
          </div>

          <div className="projects-grid ">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card m-3"
                ref={(el) => { if (el) cardRefs.current[index] = el; }}
              >
                <div className="card-noise" />
                <div className="card-border" />

                {/* Image */}
                <div className="card-image-wrap">
                  <img src={project.image} alt={project.title} />
                  <div className="img-overlay" />
                  <div className="card-category">{project.category}</div>
                  <div className="card-status">
                    <div className="status-dot" style={{ background: project.accent }} />
                    <span style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '9px',
                      letterSpacing: '0.3em',
                      color: project.accent,
                    }}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="card-body">
                  <div className="card-year">// {project.year}</div>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-desc">{project.description}</p>

                  <div className="card-metric">
                    <span className="metric-icon">▸ SYS</span>
                    <span className="metric-value">{project.metric}</span>
                  </div>

                  <div className="tech-tags">
                    {project.tech.map((tech, i) => (
                      <span className="tech-tag" key={i}>{tech}</span>
                    ))}
                  </div>

                  <div className="card-corner" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="projects-footer">
          <div className="footer-text">
            Built with Next.js · TypeScript · GSAP · Tailwind CSS
          </div>
          <div className="footer-text">
            Customize with your own projects and styles.
          </div>
          <div className="footer-logo">NEXUS_LAB</div>
        </footer>
      </div>
    </>
  );
};

export default ProjectsPage;