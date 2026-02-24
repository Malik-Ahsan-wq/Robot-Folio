"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Cpu, Github, Linkedin, Mail, Terminal, Zap, Code2, ExternalLink } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", target: "hero", code: "01" },
  { name: "About", target: "about", code: "02" },
  { name: "Skills", target: "skills", code: "03" },
  { name: "Projects", target: "projects", code: "04" },
  { name: "Timeline", target: "timeline", code: "05" },
  { name: "Contact", target: "contact", code: "06" },
];

const STATS = [
  { value: "99.9%", label: "Uptime" },
  { value: "< 50ms", label: "Response" },
  { value: "∞", label: "Iterations" },
];

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "loading" | "done">("idle");
  const [emailError, setEmailError] = useState("");
  const ref = useRef<HTMLElement>(null);

  /* Intersection observer for reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Live clock */
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC");
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email.");
      return;
    }
    setEmailError("");
    setEmailState("loading");
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');
      
      setEmailState("done");
    } catch (error) {
      setEmailError("Failed to subscribe. Try again.");
      setEmailState("idle");
    }
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-cyan-500/20 bg-[#050b14] text-white"
    >
      {/* ── Decorative layers ── */}
      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 110%,rgba(0,220,255,0.12),transparent)",
        }}
      />
      {/* Top scan-line edge */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent 0%,#00c8ff 25%,#00ffcc 50%,#00c8ff 75%,transparent 100%)",
          boxShadow: "0 0 24px 2px rgba(0,200,255,0.5)",
        }}
      />
      {/* Corner brackets */}
      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />

      {/* ── Status bar ── */}
      <div className="relative border-b border-cyan-500/10 bg-black/30 px-4 py-2 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-emerald-400/70 uppercase">
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
          <div className="flex items-center gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] font-bold text-cyan-300">{s.value}</span>
                <span className="font-mono text-[9px] text-slate-600 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
          <span
            className="font-mono text-[10px] tabular-nums text-slate-600"
            aria-live="polite"
            aria-label="Current UTC time"
          >
            {time}
          </span>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div
          className={`grid grid-cols-1 gap-10 transition-all duration-1000 sm:grid-cols-2 lg:grid-cols-12 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >

          {/* ── Brand (lg: 4 cols) ── */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo */}
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 transition-all duration-300 group-hover:border-cyan-400/60 group-hover:bg-cyan-950/70">
                <Cpu size={22} className="text-cyan-400" />
                <span
                  className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 18px rgba(0,200,255,0.3)" }}
                />
              </div>
              <div>
                <p
                  className="text-xl font-black tracking-[0.18em] text-cyan-300"
                  style={{ fontFamily: "'Rajdhani', 'Exo 2', sans-serif" }}
                >
                  AHSAN<span className="text-white">.DEV</span>
                </p>
                <p className="font-mono text-[9px] tracking-[0.35em] text-cyan-500/50 uppercase">
                  Full-Stack Engineer
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Building intelligent, high-performance web systems with futuristic UI, AI
              integrations, and modern full-stack architecture.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Code2 size={13} />, val: "50+", sub: "Projects" },
                { icon: <Zap size={13} />, val: "3+", sub: "Yrs Exp." },
                { icon: <Terminal size={13} />, val: "∞", sub: "Commits" },
              ].map((s) => (
                <div
                  key={s.sub}
                  className="rounded border border-cyan-500/10 bg-slate-900/40 px-2 py-2 text-center"
                >
                  <div className="flex justify-center text-cyan-500/60 mb-1">{s.icon}</div>
                  <p className="font-mono text-sm font-bold text-cyan-300">{s.val}</p>
                  <p className="font-mono text-[9px] tracking-wider text-slate-600 uppercase">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-2 pt-1">
              {[
                { label: "GitHub", href: "https://github.com/", icon: <Github size={17} /> },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/m-ahsan-bashir/", icon: <Linkedin size={17} /> },
                { label: "Email", href: "mailto:ahsanmalikking57@gmail.com", icon: <Mail size={17} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group relative flex h-9 w-9 items-center justify-center rounded border border-slate-700/60 bg-slate-800/40 text-slate-400 transition-all duration-200 hover:border-cyan-500/50 hover:text-cyan-300"
                >
                  {s.icon}
                  <span
                    className="absolute inset-0 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ boxShadow: "inset 0 0 10px rgba(0,200,255,0.1)" }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation (lg: 3 cols) ── */}
          <nav aria-label="Footer navigation" className="lg:col-span-3">
            <h3 className="mb-5 flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">
              <span className="h-3 w-0.5 rounded bg-cyan-400" />
              Navigation
            </h3>
            <ul className="space-y-2.5" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.target);
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                    className="group flex items-center gap-3 text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-300 w-full text-left"
                  >
                    <span className="font-mono text-[10px] text-slate-700 group-hover:text-cyan-600 transition-colors">
                      {link.code}
                    </span>
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan-500/60 transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ExternalLink
                      size={10}
                      className="ml-auto text-slate-700 opacity-0 transition-opacity group-hover:opacity-60"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Tech stack (lg: 2 cols) ── */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">
              <span className="h-3 w-0.5 rounded bg-cyan-400" />
              Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind", "Node", "Python", "AI/ML", "Postgres"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded border border-slate-700/50 bg-slate-800/30 px-2.5 py-1 font-mono text-[10px] tracking-wide text-slate-500 hover:border-cyan-500/30 hover:text-cyan-400/80 transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* ── Contact form (lg: 3 cols) ── */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">
              <span className="h-3 w-0.5 rounded bg-orange-400" />
              Get in Touch
            </h3>

            {emailState === "done" ? (
              <div className="rounded border border-cyan-500/20 bg-cyan-950/30 p-5 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9L7 13L15 5" stroke="#00c8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-mono text-xs font-bold tracking-widest text-cyan-300 uppercase">Message Received</p>
                <p className="mt-1 font-mono text-[10px] text-slate-500">I'll be in touch soon.</p>
                <button
                  onClick={() => { setEmailState("idle"); setEmail(""); }}
                  className="mt-3 font-mono text-[10px] text-slate-600 underline hover:text-cyan-400 transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                <div>
                  <label className="mb-1.5 block font-mono text-[9px] tracking-[0.3em] text-slate-600 uppercase">
                    // Your Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                      placeholder="you@domain.com"
                      disabled={emailState === "loading"}
                      aria-invalid={!!emailError}
                      className="w-full rounded border border-slate-700/60 bg-slate-900/50 px-4 py-2.5 font-mono text-xs text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:border-cyan-500/50 disabled:opacity-50"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 rounded opacity-0 transition-opacity duration-300 focus-within:opacity-100"
                      style={{ boxShadow: "0 0 12px rgba(0,200,255,0.12)" }}
                    />
                  </div>
                  {emailError && (
                    <p role="alert" className="mt-1 font-mono text-[10px] text-red-400">
                      ⚠ {emailError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={emailState === "loading"}
                  className="group relative w-full overflow-hidden rounded border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 font-mono text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase transition-all duration-200 hover:border-cyan-400/60 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  {emailState === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-3 w-3 animate-spin" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 16" />
                      </svg>
                      Transmitting…
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </button>

                <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-800/50">
                  <a
                    href="mailto:your@email.com"
                    className="flex items-center gap-2 font-mono text-[10px] text-slate-600 hover:text-cyan-400 transition-colors"
                  >
                    <Mail size={11} />
                   ahsanmalikking57@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/m-ahsan-bashir/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-[10px] text-slate-600 hover:text-cyan-400 transition-colors"
                  >
                    <Linkedin size={11} />
                    https://www.linkedin.com/in/m-ahsan-bashir/
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ── Circuit divider ── */}
        <div aria-hidden className="my-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <svg width="72" height="14" viewBox="0 0 72 14" fill="none">
            <path d="M0 7H16V3H28V11H44V7H72" stroke="rgba(0,200,255,0.3)" strokeWidth="1" fill="none" />
            <circle cx="16" cy="7" r="2" fill="#00c8ff" fillOpacity="0.5" />
            <circle cx="44" cy="7" r="2" fill="#ff6b00" fillOpacity="0.5" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* ── Bottom bar ── */}
        <div
          className={`flex flex-col items-center justify-between gap-4 sm:flex-row transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-mono text-[10px] text-slate-600">
            © {new Date().getFullYear()} Ahsan Malik · All rights reserved
          </p>

          <div className="flex items-center gap-3">
            {["Privacy", "Terms", "Sitemap"].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-3">
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="font-mono text-[10px] text-slate-600 hover:text-cyan-400 transition-colors"
                >
                  {item}
                </Link>
                {i < arr.length - 1 && <span className="text-slate-800 text-[10px]">·</span>}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] text-slate-600">Built with Next.js 15</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Corner bracket decorator ── */
function CornerBracket({ pos }: { pos: "tl" | "tr" }) {
  const isLeft = pos === "tl";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-0 ${isLeft ? "left-0" : "right-0"} w-24 h-24`}
    >
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        fill="none"
        className={isLeft ? "" : "-scale-x-100"}
      >
        <path d="M0 0 L36 0 L36 6 L6 6 L6 36 L0 36 Z" fill="rgba(0,200,255,0.35)" />
        <path d="M0 0 L18 0 L18 3 L3 3 L3 18 L0 18 Z" fill="rgba(0,200,255,0.7)" />
        <circle cx="36" cy="36" r="2.5" fill="#00c8ff" opacity="0.4" />
      </svg>
    </div>
  );
}