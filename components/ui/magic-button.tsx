/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import Magnetic from "../common/Magnetic";

interface RoundedButtonProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  [key: string]: any; // for spread attributes
}

export default function RoundedButton({
  children,
  className = "",
  icon,
  ...attributes
}: RoundedButtonProps) {
  const circle = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (!circle.current) return;

    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        {
          top: "-25%",
          width: "150%",
          duration: 0.4,
          ease: "power3.in",
        },
        "enter"
      )
      .to(
        circle.current,
        {
          top: "-150%",
          width: "125%",
          duration: 0.25,
        },
        "exit"
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current?.tweenFromTo("enter", "exit");

    // Enhanced hover animations
    const button = buttonRef.current;
    const shine = shineRef.current;
    const ripple = rippleRef.current;

    if (button && shine && ripple) {
      // Create ripple effect
      gsap.set(ripple, { scale: 0, opacity: 0.5 });
      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animate main button
      gsap.to(button, {
        scale: 1.05,
        rotationY: 5,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });

      // Shine effect
      gsap.fromTo(
        shine,
        { x: "-100%", opacity: 0 },
        { x: "100%", opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current?.play();
    }, 300);

    // Reset button animations
    const button = buttonRef.current;

    if (button) {
      gsap.to(button, {
        scale: 1,
        rotationY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  return (
    <Magnetic>
      <div
        ref={buttonRef}
        className={`
          inline-flex items-center justify-center overflow-hidden group rounded-full border border-white/20 bg-white/10
          backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-colors duration-500 ease-in-out hover:bg-white/20 hover:border-white/30 hover:opacity-70
          ${className}
        `}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        <div className="z-10 flex items-center gap-2 transition-colors duration-300 relative">
          {children}
          {icon && <span className="flex-shrink-0">{icon}</span>}
        </div>

        <div
          ref={circle}
          style={{
            width: "100%",
            height: "150%",
            top: "100%",
          }}
          className="absolute rounded-full bg-white/20"
        />

        {/* Shine effect */}
        <div
          ref={shineRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 rounded-full"
        />

        {/* Ripple effect */}
        <div
          ref={rippleRef}
          className="absolute inset-0 bg-white/15 rounded-full scale-0"
        />

        {/* Additional glow effect */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/20 to-white/10 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
        />
      </div>
    </Magnetic>
  );
}
