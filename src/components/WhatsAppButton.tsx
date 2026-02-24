'use client';

import { useEffect, useRef } from 'react';

export default function RoboticsContactButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const phoneNumber = "03276227156";
  const message = "Hello Ahsan! I'm interested in your robotics & automation engineering services.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (!buttonRef.current) return;
    const btn = buttonRef.current;

    const onEnter = () => {
      btn.style.transform = 'translateY(-4px) scale(1.08)';
      btn.style.boxShadow = '0 20px 50px -10px rgba(34, 211, 238, 0.5)';
    };

    const onLeave = () => {
      btn.style.transform = 'translateY(0) scale(1)';
      btn.style.boxShadow = '0 10px 30px -5px rgba(0, 0, 0, 0.4)';
    };

    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);
    btn.addEventListener('focus', onEnter);
    btn.addEventListener('blur', onLeave);

    return () => {
      btn.removeEventListener('mouseenter', onEnter);
      btn.removeEventListener('mouseleave', onLeave);
      btn.removeEventListener('focus', onEnter);
      btn.removeEventListener('blur', onLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`
        fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[999]
        group flex h-16 w-16 items-center justify-center
        rounded-full 
        bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-950
        border border-cyan-800/30
        shadow-xl shadow-cyan-950/40
        transition-all duration-500 ease-out
        hover:shadow-cyan-500/50 hover:border-cyan-400/40
        active:scale-95 active:shadow-cyan-600/60
        focus:outline-none focus:ring-4 focus:ring-cyan-500/40 focus:ring-offset-2 focus:ring-offset-slate-950
      `}
      aria-label="Contact robotics & automation engineer via WhatsApp"
      title="Discuss your robotics project"
    >
      {/* Subtle outer metallic ring / energy field */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 via-teal-400/5 to-cyan-500/10 animate-pulse opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

      {/* Core robotic icon container */}
      <div className="relative z-10 flex items-center justify-center h-11 w-11">
        {/* Professional minimalist robotic arm SVG */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400 group-hover:text-cyan-200 transition-colors duration-400 group-hover:scale-110"
        >
          {/* Base joint */}
          <circle cx="12" cy="18" r="3" strokeWidth="2" className="opacity-80" />
          {/* Lower arm segment */}
          <path d="M12 15 L12 10" strokeWidth="3" />
          {/* Upper arm with joint */}
          <circle cx="12" cy="8" r="2.5" fill="none" />
          {/* Gripper / end effector - clean industrial style */}
          <path d="M10 6 L8 3 M14 6 L16 3" strokeWidth="2.8" />
          <path d="M9 4 L15 4" strokeWidth="2" className="opacity-70" />
          {/* Hydraulic/energy accent line */}
          <path
            d="M5 19 L19 5"
            strokeWidth="1.4"
            strokeDasharray="2 3"
            className="opacity-50 group-hover:opacity-80 transition-opacity"
          />
        </svg>

        {/* Inner focused glow */}
        <div className="absolute inset-[-10px] rounded-full bg-cyan-400/15 blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-600" />
      </div>

      {/* Tooltip - professional, always attempts to show on hover */}
      <span
        className={`
          absolute left-full ml-4 top-1/2 -translate-y-1/2
          hidden md:group-hover:block
          whitespace-nowrap rounded-md bg-slate-900/95 
          border border-cyan-800/50 px-4 py-2 text-sm font-medium text-cyan-100
          shadow-lg shadow-cyan-950/30
          backdrop-blur-sm
          transition-all duration-300
        `}
      >
        Chat on WhatsApp – Robotics Services
      </span>

      {/* Very subtle persistent pulse for visibility */}
      <div className="absolute inset-[-6px] rounded-full bg-cyan-600/20 animate-ping-slow opacity-30 pointer-events-none" />
    </button>
  );
}

/* Add to your global CSS or tailwind.config extend animations */
