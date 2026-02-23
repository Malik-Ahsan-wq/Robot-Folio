/**
 * ═══════════════════════════════════════════════════════════════
 * CONTACT — Command Terminal Interface
 * ═══════════════════════════════════════════════════════════════
 * Full terminal aesthetic: blinking prompt, input echoes with
 * green phosphor glow. Submit → "TRANSMITTING" progress.
 * Success: micro robotic confetti (tiny SVG parts).
 */
"use client";

import { useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASES } from "@/utils/eases";

gsap.registerPlugin(ScrollTrigger);

type TerminalState = "idle" | "transmitting" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  const statusLineRef = useRef<HTMLDivElement>(null);
  const [terminalState, setTerminalState] = useState<TerminalState>("idle");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "ROBO.FOLIO Terminal v2.0.26",
    "Type your message. All fields required.",
    "─────────────────────────────────────",
  ]);

  /* ── Section entrance animation ── */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

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

      /* Terminal box entrance */
      if (terminalRef.current) {
        gsap.fromTo(
          terminalRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: EASES.mechanicalSnap,
            scrollTrigger: {
              trigger: terminalRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  /* ── Form submission handler ── */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (terminalState === "transmitting") return;

    const formData = new FormData(formRef.current!);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) return;

    setTerminalState("transmitting");
    setTerminalOutput((prev) => [
      ...prev,
      "",
      `> FROM: ${name} <${email}>`,
      `> MSG: "${message.slice(0, 50)}${message.length > 50 ? "..." : ""}"`,
      "",
      "> TRANSMITTING ████████░░░░░░░░░░",
    ]);

    /* Transmitting animation on status line */
    if (statusLineRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        statusLineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      /* Progress bar animation */
      const bar = statusLineRef.current.querySelector(".tx-bar");
      if (bar) {
        tl.fromTo(
          bar,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 2, ease: "power1.inOut" }
        );
      }
    }

    /* Simulate transmission delay */
    await new Promise<void>((resolve) => setTimeout(resolve, 2200));

    setTerminalState("success");
    setTerminalOutput((prev) => [
      ...prev,
      "> TRANSMISSION COMPLETE ✓",
      "> STATUS: MESSAGE RECEIVED",
      "> STAMPING APPROVAL...",
    ]);

    /* ── Confetti: tiny SVG parts flying outward ── */
    if (confettiRef.current) {
      const colors = ["#00f0ff", "#ff00d4", "#ff4d00", "#00ff88"];
      const shapes = ["●", "■", "▲", "⬡", "◆"];

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("span");
        particle.textContent = shapes[i % shapes.length];
        particle.style.position = "absolute";
        particle.style.left = "50%";
        particle.style.top = "50%";
        particle.style.color = colors[i % colors.length];
        particle.style.fontSize = `${8 + Math.random() * 8}px`;
        particle.style.pointerEvents = "none";
        confettiRef.current.appendChild(particle);

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 300 - 100,
          rotation: Math.random() * 720 - 360,
          opacity: 0,
          scale: 0,
          duration: 1.5 + Math.random(),
          ease: "power2.out",
          delay: Math.random() * 0.3,
          onComplete: () => particle.remove(),
        });
      }
    }

    /* Reset after a delay */
    setTimeout(() => {
      setTerminalState("idle");
      formRef.current?.reset();
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen overflow-hidden bg-cyber-bg py-32"
      aria-label="Contact section"
    >
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        {/* ── Section Header ── */}
        <div className="section-heading mb-16 text-center opacity-0">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-[2px] w-12 bg-neon-cyan" />
            <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan">
              05 — UPLINK
            </span>
            <span className="h-[2px] w-12 bg-neon-cyan" />
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
            COMMAND <span className="text-neon-cyan text-glow-cyan">TERMINAL</span>
          </h2>
          <p className="mt-4 font-body text-text-secondary">
            Establish a communication link. All transmissions are encrypted.
          </p>
        </div>

        {/* ── Terminal Window ── */}
        <div
          ref={terminalRef}
          className="relative overflow-hidden rounded-xl border border-metal-dark/50 bg-cyber-panel/80 opacity-0 backdrop-blur-xl"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-metal-dark/30 bg-cyber-bg/60 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-500/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <span className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-3 font-mono text-[10px] tracking-wider text-text-muted">
              SECURE_TERMINAL — /usr/bin/contact
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6">
            {/* Output log */}
            <div className="mb-6 max-h-40 overflow-y-auto font-mono text-xs leading-relaxed text-neon-cyan/70">
              {terminalOutput.map((line, i) => (
                <div key={i} className={line.includes("✓") ? "text-neon-green" : ""}>
                  {line}
                </div>
              ))}
            </div>

            {/* Transmitting status */}
            {terminalState === "transmitting" && (
              <div ref={statusLineRef} className="mb-4 opacity-0">
                <div className="h-1 w-full overflow-hidden rounded-full bg-metal-dark">
                  <div className="tx-bar h-full w-full rounded-full loading-bar" />
                </div>
              </div>
            )}

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div className="group">
                <label className="mb-1 block font-mono text-[10px] tracking-wider text-text-muted">
                  IDENTIFIER
                </label>
                <div className="flex items-center gap-2 rounded border border-metal-dark/50 bg-cyber-bg/40 px-3 py-2 transition-colors focus-within:border-neon-cyan/40">
                  <span className="font-mono text-xs text-neon-cyan/50">{">"}</span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter designation..."
                    className="flex-1 bg-transparent font-mono text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="mb-1 block font-mono text-[10px] tracking-wider text-text-muted">
                  COMM FREQUENCY
                </label>
                <div className="flex items-center gap-2 rounded border border-metal-dark/50 bg-cyber-bg/40 px-3 py-2 transition-colors focus-within:border-neon-cyan/40">
                  <span className="font-mono text-xs text-neon-cyan/50">{">"}</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@frequency.com"
                    className="flex-1 bg-transparent font-mono text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="group">
                <label className="mb-1 block font-mono text-[10px] tracking-wider text-text-muted">
                  PAYLOAD
                </label>
                <div className="rounded border border-metal-dark/50 bg-cyber-bg/40 px-3 py-2 transition-colors focus-within:border-neon-cyan/40">
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Compose transmission..."
                    className="w-full resize-none bg-transparent font-mono text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={terminalState === "transmitting"}
                className="group mt-2 flex items-center justify-center gap-3 rounded border border-neon-cyan/30 bg-neon-cyan/5
                  px-6 py-3 font-display text-xs tracking-[0.2em] text-neon-cyan
                  transition-all duration-300 hover:border-neon-cyan/60 hover:bg-neon-cyan/10
                  hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]
                  disabled:cursor-not-allowed disabled:opacity-50"
              >
                {terminalState === "transmitting"
                  ? "TRANSMITTING..."
                  : terminalState === "success"
                    ? "✓ TRANSMITTED"
                    : "TRANSMIT MESSAGE"}
                {terminalState === "idle" && (
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Confetti container */}
          <div ref={confettiRef} className="pointer-events-none absolute inset-0 overflow-hidden" />

          {/* Scanlines */}
          <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
        </div>

        {/* ── Footer info ── */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-6">
            {[
              { label: "EMAIL", value: "ahsanmalikking57@gmail.com" },
              { label: "LOCATION", value: "Pakistan, Punjab" },
              { label: "PHONE", value: "03276227156" },
              { label: "WEBSITE", value: "www.ahsanmalik.xyz" },
            ].map((info) => (
              <div key={info.label} className="flex flex-col items-center gap-1">
                <span className="font-mono text-[9px] tracking-wider text-text-muted">
                  {info.label}
                </span>
                <span className="font-mono text-xs text-neon-cyan">
                  {info.value}
                </span>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-text-muted">
            © 2025 AHSAN BASHIR — MERN + NEXT.js DEVELOPER
          </p>
        </div>
      </div>
    </section>
  );
}
