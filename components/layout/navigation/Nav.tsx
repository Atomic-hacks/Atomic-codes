/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Footer from "./Footer";

const navItems = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Work",
    href: "#work",
  },
  {
    title: "Approach",
    href: "#approach",
  },
];

export default function Navigation({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState("#home");
  const menuRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<SVGPathElement>(null);

  // Animate menu entrance
  useEffect(() => {
    const menu = menuRef.current;
    const curve = curveRef.current;

    if (!menu) return;

    const ctx = gsap.context(() => {
      // Menu slide in
      gsap.fromTo(
        menu,
        { x: "100%" },
        {
          x: "0%",
          duration: 0.8,
          ease: "power3.out",
        }
      );

     
      // Stagger nav items
      const items = menu.querySelectorAll(".nav-item");
      gsap.fromTo(
        items,
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }, menu);

    return () => ctx.revert();
  }, []);

  // Smooth scroll function
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setSelectedIndicator(href);

      if (onNavigate) {
        setTimeout(() => onNavigate(), 300);
      }
    }
  };

  // Navigation Link component
  const NavigationLink = ({ data, isActive }: any) => {
    const { title, href } = data;
    const indicatorRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      handleNavClick(href);
    };

    // Animate indicator
    useEffect(() => {
      const indicator = indicatorRef.current;
      if (!indicator) return;

      gsap.to(indicator, {
        scale: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }, [isActive]);

    return (
      <div
        className="nav-item relative mb-3 group"
        onMouseEnter={() => setSelectedIndicator(href)}
      >
        <div
          ref={indicatorRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 backdrop-blur-xl rounded-full shadow-lg"
          style={{ scale: 0 }}
        />

        <div className="relative pl-6 py-4">
          <button
            onClick={handleClick}
            className="text-white text-2xl font-light tracking-wide text-left w-full 
              hover:text-white/80 transition-colors duration-300"
          >
            {title}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={menuRef}
      className="fixed top-0 right-0 h-screen w-96 z-[100]"
      data-navigation
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5" />
      </div>

      <div className="relative h-full flex flex-col justify-between p-8">
        <div
          onMouseLeave={() => setSelectedIndicator(selectedIndicator)}
          className="flex-1 pt-20"
        >
          <div className="mb-10">
            <p className="text-white/60 text-sm font-light tracking-wider uppercase">
              Navigation
            </p>
          </div>
          {navItems.map((data, index) => (
            <NavigationLink
              key={index}
              data={data}
              isActive={selectedIndicator === data.href}
            />
          ))}
        </div>
        <Footer />
      </div>

    </div>
  );
}
