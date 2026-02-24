/**
 * ═══════════════════════════════════════════════════════════════
 * CONTACT — Secure Robotics Terminal Interface v2.1
 * ═══════════════════════════════════════════════════════════════
 * Professional cyber-industrial aesthetic:
 * • Blinking command prompt
 * • Typed input echo simulation
 * • Gradient transmitting progress
 * • Subtle circuit-spark success particles
 * • Clean status messaging
 */
"use client";

import { useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASES } from "@/utils/eases";

gsap.registerPlugin(ScrollTrigger);

type TerminalState = "idle" | "typing" | "transmitting" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<TerminalState>("idle");
  const [output, setOutput] = useState<string[]>([
    "ROBO.FOLIO SECURE TERMINAL v2.1",
    "Establish encrypted uplink — all fields mandatory",
    "───────────────────────────────────────────────",
  ]);

  // Entrance animations
  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".section-heading",
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: EASES.hydraulicDampen,
        scrollTrigger: {
          trigger: ".section-heading",
          start: "top 82%",
        },
      }
    );

    gsap.fromTo(
      terminalRef.current,
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: EASES.mechanicalSnap,
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (state !== "idle") return;

    const formData = new FormData(formRef.current!);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) return;

    // Step 1: Show typing simulation
    setState("typing");
    setOutput((prev) => [
      ...prev,
      "",
      `> INITIATING TRANSMISSION FROM: ${name}`,
      `> COMM ID: ${email}`,
      `> PAYLOAD LENGTH: ${message.length} chars`,
      "> AUTHENTICATING... OK",
      "",
    ]);

    await new Promise((r) => setTimeout(r, 1200));

    // Step 2: Transmitting
    setState("transmitting");
    setOutput((prev) => [
      ...prev,
      "> ESTABLISHING SECURE CHANNEL...",
      "> TRANSMITTING [          ]",
    ]);

    // Progress simulation + real send
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error();

      // Success path
      setOutput((prev) => [
        ...prev.slice(0, -1),
        "> TRANSMISSION COMPLETE ✓",
        "> SERVER RESPONSE: 200 OK",
        "> MESSAGE LOGGED IN SECURE ARCHIVE",
      ]);

      setState("success");
      triggerSuccessParticles();

      setTimeout(() => {
        setState("idle");
        formRef.current?.reset();
      }, 3400);
    } catch {
      setOutput((prev) => [
        ...prev.slice(0, -1),
        "> ERROR: TRANSMISSION INTERRUPTED",
        "> CHECK CONNECTION / TRY AGAIN LATER",
      ]);
      setState("error");
      setTimeout(() => setState("idle"), 4000);
    }
  };

  const triggerSuccessParticles = () => {
    if (!particlesRef.current) return;

    const colors = ["#22d3ee", "#67e8f9", "#a5f3fc", "#06b6d4"];
    const symbols = ["⚙", "⌬", "⟡", "⟁", "◆"];

    for (let i = 0; i < 24; i++) {
      const el = document.createElement("div");
      el.textContent = symbols[i % symbols.length];
      el.style.position = "absolute";
      el.style.left = "50%";
      el.style.top = "50%";
      el.style.color = colors[i % colors.length];
      el.style.fontSize = `${10 + Math.random() * 10}px`;
      el.style.opacity = "0.9";
      el.style.pointerEvents = "none";
      particlesRef.current.appendChild(el);

      gsap.to(el, {
        x: (Math.random() - 0.5) * 480,
        y: (Math.random() - 0.5) * 360 - 120,
        rotation: Math.random() * 600 - 300,
        opacity: 0,
        scale: 0.2,
        duration: 1.4 + Math.random() * 0.8,
        ease: "power3.out",
        delay: Math.random() * 0.4,
        onComplete: () => el.remove(),
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 md:py-36 bg-gradient-to-b from-[#0a0e17] to-[#000306]"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
        {/* Header */}
        <div className="section-heading mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
            <span className="font-mono text-xs tracking-[0.35em] text-cyan-400/80 uppercase">
              UPLINK / CONTACT
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-cyan-500/60 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            COMMAND <span className="text-cyan-400 text-glow">TERMINAL</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Secure channel established. Transmit your inquiry.
          </p>
        </div>

        {/* Terminal */}
        <div
          ref={terminalRef}
          className="relative rounded-xl overflow-hidden border border-cyan-900/40 bg-gradient-to-b from-[#0f1625] to-[#0a0f1c] shadow-2xl shadow-black/60 backdrop-blur-sm"
        >
          {/* Title bar */}
          <div className="flex items-center px-4 py-3 bg-black/40 border-b border-cyan-950/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
            </div>
            <span className="ml-4 font-mono text-xs text-gray-500">
              secure-terminal@robo-folio — contact.protocol
            </span>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Output log */}
            <div
              ref={outputRef}
              className="mb-8 max-h-56 overflow-y-auto font-mono text-sm leading-relaxed text-cyan-300/80 scrollbar-thin scrollbar-thumb-cyan-800/40"
            >
              {output.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap ${
                    line.includes("✓") || line.includes("200 OK")
                      ? "text-emerald-400"
                      : line.includes("ERROR")
                      ? "text-rose-400"
                      : ""
                  }`}
                >
                  {line}
                </div>
              ))}

              {/* Blinking cursor during idle */}
              {state === "idle" && (
                <span className="inline-block w-2 h-4 bg-cyan-400/70 animate-blink ml-1" />
              )}
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1.5 font-mono text-xs tracking-wide text-gray-500">
                  DESIGNATION / NAME
                </label>
                <div className="flex items-center border border-cyan-900/50 rounded-lg bg-black/30 px-4 py-3 focus-within:border-cyan-600/60 transition-colors">
                  <span className="text-cyan-500/60 mr-2 font-mono">{">"}</span>
                  <input
                    name="name"
                    required
                    disabled={state !== "idle"}
                    placeholder="Enter your name / alias"
                    className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-600 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-mono text-xs tracking-wide text-gray-500">
                  COMM NODE / EMAIL
                </label>
                <div className="flex items-center border border-cyan-900/50 rounded-lg bg-black/30 px-4 py-3 focus-within:border-cyan-600/60 transition-colors">
                  <span className="text-cyan-500/60 mr-2 font-mono">{">"}</span>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={state !== "idle"}
                    placeholder="your@email.frequency"
                    className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-600 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-mono text-xs tracking-wide text-gray-500">
                  TRANSMISSION PAYLOAD
                </label>
                <div className="border border-cyan-900/50 rounded-lg bg-black/30 px-4 py-3 focus-within:border-cyan-600/60 transition-colors">
                  <textarea
                    name="message"
                    required
                    rows={4}
                    disabled={state !== "idle"}
                    placeholder="Describe your project / inquiry..."
                    className="w-full bg-transparent outline-none resize-none text-gray-200 placeholder-gray-600 disabled:opacity-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={state !== "idle"}
                className={`
                  mt-3 w-full sm:w-auto px-8 py-3.5 rounded-lg font-mono tracking-wide text-sm
                  border border-cyan-600/50 bg-cyan-950/40 text-cyan-300
                  hover:bg-cyan-900/50 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all duration-300 flex items-center justify-center gap-3
                `}
              >
                {state === "typing" && "AUTHENTICATING..."}
                {state === "transmitting" && "TRANSMITTING..."}
                {state === "success" && "✓ TRANSMISSION ACCEPTED"}
                {state === "error" && "RETRY TRANSMISSION"}
                {state === "idle" && (
                  <>
                    INITIATE TRANSMISSION
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Particles container */}
          <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

          {/* Scanlines overlay */}
          <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-20" />
        </div>

        {/* Footer contact strip */}
        <div className="mt-12 text-center text-sm text-gray-500 font-mono">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            <div>
              <span className="text-gray-600">EMAIL:</span>{" "}
              <a href="mailto:ahsanmalikking57@gmail.com" className="text-cyan-400 hover:underline">
                ahsanmalikking57@gmail.com
              </a>
            </div>
            <div>
              <span className="text-gray-600">PHONE:</span>{" "}
              <a href="tel:+923276227156" className="text-cyan-400 hover:underline">
                +92 327 6227156
              </a>
            </div>
            <div>
              <span className="text-gray-600">LOCATION:</span> Punjab, Pakistan
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            © 2025–2026 Ahsan Bashir — Robotics • Automation • Software Engineering
          </p>
        </div>
      </div>
    </section>
  );
}