"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";

interface ProjectProps {
  index: number;
  title: string;
  manageModal: (active: boolean, index: number) => void;
  description: string;
}

export default function Project({
  index,
  title,
  manageModal,
  description,
}: ProjectProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    const content = contentRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const glow = glowRef.current;
    const bg = bgRef.current;
    const number = numberRef.current;

    if (content && title && subtitle && glow && bg && number) {
      gsap.killTweensOf([content, bg, glow, title, subtitle, number]);

      // Ultra-fast, snappy animations
      gsap.to(content, {
        x: 25,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(bg, {
        opacity: 1,
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });

      gsap.to(glow, {
        opacity: 0.3,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(title, {
        x: 5,
        color: "#ffffff",
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });

      gsap.to(subtitle, {
        x: 8,
        color: "rgba(255, 255, 255, 0.8)",
        duration: 0.2,
        ease: "power2.out",
      });

      gsap.to(number, {
        x: 10,
        color: "rgba(255, 255, 255, 0.9)",
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
    }

    manageModal(true, index);
  };

  const handleMouseLeave = () => {
    const content = contentRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const glow = glowRef.current;
    const bg = bgRef.current;
    const number = numberRef.current;

    if (content && title && subtitle && glow && bg && number) {
      gsap.killTweensOf([content, bg, glow, title, subtitle, number]);

      // Ultra-fast reset
      gsap.to(content, {
        x: 0,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(bg, {
        opacity: 0,
        scale: 0.98,
        duration: 0.2,
        ease: "power2.out",
      });

      gsap.to(glow, {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to([title, subtitle, number], {
        x: 0,
        color: "rgba(255, 255, 255, 0.7)",
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }

    manageModal(false, index);
  };

  return (
    <div
      className="w-full border-b border-white/10 pb-12 last:border-b-0 relative overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        paddingLeft: "40px",
        marginLeft: "-40px",
        pointerEvents: "auto",
        cursor: "pointer",
      }}
    >
      {/* Background effects */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/8 to-white/5 
        opacity-0 scale-98 rounded-lg"
      />

      <div
        ref={glowRef}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 
        w-1 h-3/4 bg-gradient-to-b from-white/20 via-white/40 to-white/20
        opacity-0 scale-95 rounded-full blur-sm"
      />

      {/* Content wrapper */}
      <div
        ref={contentRef}
        className="flex items-center justify-between relative z-10 py-8"
      >
        <div className="flex items-center gap-8">
          {/* Project Number */}
          <span
            ref={numberRef}
            className="text-6xl font-light text-white/70 tabular-nums"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Project Info */}
          <div>
            <h2
              ref={titleRef}
              className="text-4xl font-light mb-2 text-white/70 tracking-tight"
            >
              {title}
            </h2>
            <p ref={subtitleRef} className="text-lg text-white/60 font-light">
              Design & Development
            </p>
            <p className="text-sm text-white/60 font-light">{description}</p>
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="text-white/40 transition-colors duration-200 group-hover:text-white/70">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform transition-transform duration-200 ease-out group-hover:translate-x-2 group-hover:-translate-y-2"
          >
            <path
              d="M7 17L17 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 7H17V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Subtle border animation */}
      <div className="absolute bottom-0 left-10 w-0 h-px bg-gradient-to-r from-white/40 to-transparent transition-all duration-300 ease-out group-hover:w-full" />
    </div>
  );
}
