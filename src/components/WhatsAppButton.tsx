'use client';

import { useEffect, useRef } from 'react';

export default function RoboticsContactButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const phoneNumber = "03276227156";
  const message = "Hello! I'm interested in your robotics / automation services.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (!buttonRef.current) return;

    // Simple hover / active micro-animations (optional enhancement)
    const btn = buttonRef.current;

    const handleMouseEnter = () => {
      btn.style.transform = 'scale(1.15) rotate(8deg)';
      btn.style.boxShadow = '0 0 40px rgba(17, 36, 36, 0.7)';
    };

    const handleMouseLeave = () => {
      btn.style.transform = 'scale(1) rotate(0deg)';
      btn.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`
        fixed bottom-8 left-8 z-[9999]
        group flex h-16 w-16 items-center justify-center
        rounded-full bg-gradient-to-br from-cyan-1000 via-cyan-1000 to-blue-900
        shadow-2xl shadow-cyan-900/40
        transition-all duration-400
        hover:scale-110 hover:shadow-cyan-500/60 hover:rotate-6
        active:scale-95 active:shadow-cyan-400/80
        focus:outline-none focus:ring-4 focus:ring-cyan-400/50
      `}
      aria-label="Contact Robotics Engineer on WhatsApp"
      title="Let's build something advanced together"
    >
      {/* Outer glowing ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/10 animate-pulse-slow opacity-70" />

      {/* Inner robotic icon container */}
      <div className="relative z-10 flex items-center justify-center h-10 w-10">
        {/* Robotic arm icon - using clean SVG path (minimalist industrial style) */}
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400 transition-all duration-400 group-hover:text-cyan-100 group-hover:rotate-12 group-active:scale-90"
        >
          {/* Simplified robotic arm / mechanical gripper */}
          <path d="M3 17l2-2h4l2 2v-6h-4l-2-2" />
          <path d="M11 9h4l2 2v6h-4l-2-2z" />
          <circle cx="7" cy="7" r="2" />
          <circle cx="15" cy="7" r="2" />
          <line x1="7" y1="7" x2="15" y2="7" />
          <path d="M11 11v4" />
          {/* Hydraulic / energy line accent */}
          <path d="M4 4l16 16" strokeWidth="1.5" strokeDasharray="2 2" className="opacity-60" />
        </svg>

        {/* Optional secondary glow */}
        <div className="absolute inset-[-6px] rounded-full bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      {/* Very subtle continuous pulse (less aggressive than WhatsApp default) */}
      <div className="absolute inset-[-4px] rounded-full bg-cyan-500/30 animate-ping-slower opacity-0 group-hover:opacity-40 transition-opacity" />
        <span className="absolute bottom-full mb-2 hidden w-max rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
    Chat on whatsApp
  </span>
    </button>
    
  );
}

/* 
  Add these animations to your global CSS or tailwind.config (recommended)
  @keyframes ping-slower {
    75%, 100% { transform: scale(1.6); opacity: 0; }
  }
  .animate-ping-slow { animation: ping-slower 4s cubic-bezier(0, 0, 0.2, 1) infinite; }
  .animate-ping-slower { animation: ping-slower 5s cubic-bezier(0, 0, 0.2, 1) infinite; }
*/