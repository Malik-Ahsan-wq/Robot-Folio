/**
 * ═══════════════════════════════════════════════════════════════
 * ROOT LAYOUT — GSAP Registration + Font Loading + Smooth Scroll
 * ═══════════════════════════════════════════════════════════════
 */
import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

/* ── Register GSAP plugins ONCE via side-effect import ── */
import "@/utils/gsapConfig";

import ClientShell from "@/components/ClientShell";

/* ── Fonts ── */
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/* ── Metadata ── */
export const metadata: Metadata = {
  title: "ATTARI — Robotics & Mechatronics Portfolio",
  description:
    "Ultra-advanced robotics, mechatronics, and cyber-physical systems portfolio. Precision-engineered digital experience with cinematic GSAP animations.",
  keywords: [
    "robotics",
    "mechatronics",
    "portfolio",
    "GSAP",
    "cyber-physical systems",
    "embedded systems",
    "control systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className="bg-cyber-bg text-text-primary antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
