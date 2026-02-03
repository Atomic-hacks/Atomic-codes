"use client";
import React, { useEffect, useRef, useState } from "react";
import { DownloadIcon, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import your existing components
import { TextHoverEffect } from "./ui/text-hover";
import RoundedButton from "./ui/magic-button";
import RotatingText from "./ui/rotating-text";
import Nav from "../components/layout/navigation/Nav";
import Rounded from "../components/ui/magic-button";
import Magnetic from "../components/common/Magnetic";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Location Badge Component
const LocationBadge = () => (
  <div className="hidden md:flex items-center gap-2 px-4 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
    <MapPin size={14} className="text-white/60" />
    <span className="text-sm text-white/80 font-medium">
      Located in Nigeria
    </span>
  </div>
);

const handleDownload = () => {
  const link = document.createElement("a");
  link.href = "Atomic-codes-CV.pdf";
  link.download = "Atomic-codes-CV.pdf";
  link.click();
};

// Navigation Link Component
const NavLink = ({ href, children }: { href: string; children: string }) => (
  <Magnetic>
    <div className="group">
      <button
        onClick={() =>
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
        }
        className="text-sm text-white/80 hover:text-white transition-colors duration-300"
      >
        {children}
      </button>
      <div className="w-0 h-px bg-white/80 group-hover:w-full transition-all duration-300" />
    </div>
  </Magnetic>
);

// Header Component
const Header = ({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsActive(false);
  }, [pathname, setIsActive]);

  // Simple scroll-triggered menu button animation
  useEffect(() => {
    if (!buttonRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(buttonRef.current, { scale: 0 });

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "100px top",
        onEnter: () => gsap.to(buttonRef.current, { scale: 1, duration: 0.25 }),
        onLeaveBack: () => {
          gsap.to(buttonRef.current, { scale: 0, duration: 0.25 });
          setIsActive(false);
        },
      });
    });

    return () => ctx.revert();
  }, [setIsActive]);

  return (
    <>
      {/* Main Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 md:p-8">
        <div className="flex justify-between items-center">
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <p className="text-white/60 text-sm">©</p>
              <div className="flex flex-col">
                <p className="text-xs text-white/40">Code by</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm text-white/90 font-medium">Victor</p>
                  <p className="text-sm text-white/90 font-medium">Atomic</p>
                </div>
              </div>
            </div>
            <LocationBadge />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#work">Work</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#approach">Approach</NavLink>
          </div>

          {/* Mobile Designation */}
          <div className="md:hidden text-white/60 text-sm font-medium">
            Freelance Developer
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div ref={buttonRef} className="fixed top-6 right-6 z-50">
        <Rounded
          onClick={() => setIsActive(!isActive)}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20"
          data-menu-button
        >
          <div className="w-5 h-3 relative">
            <span
              className={`absolute w-full h-px bg-white/80 transition-all duration-300 ${
                isActive ? "top-1/2 rotate-45 -translate-y-1/2" : "top-0"
              }`}
            />
            <span
              className={`absolute w-full h-px bg-white/80 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                isActive ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute w-full h-px bg-white/80 transition-all duration-300 ${
                isActive ? "top-1/2 -rotate-45 -translate-y-1/2" : "bottom-0"
              }`}
            />
          </div>
        </Rounded>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        <AnimatePresence mode="wait">
          {isActive && (
            <div className="pointer-events-auto">
              <Nav onNavigate={() => setIsActive(false)} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Main Hero Component
export const Hero = () => {
  const [isActive, setIsActive] = useState(false);

  // Click outside to close menu
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (
        target.closest("[data-menu-button]") ||
        target.closest("[data-navigation]")
      ) {
        return;
      }
      setIsActive(false);
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  return (
    <div className="h-screen relative flex flex-col overflow-hidden">
      <Header isActive={isActive} setIsActive={setIsActive} />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-8">
        <div className="text-center">
          <TextHoverEffect text="Atomic" />

          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
              Crafting digital experiences with
              <span className="text-white/90"> precision</span> and
              <span className="text-white/90"> creativity</span>
            </p>
          </div>

          <RoundedButton
            className="rounded-full px-4 md:px-12 md:py-6 py-4"
            icon={<DownloadIcon />}
            onClick={handleDownload}
          >
            Download Resume
          </RoundedButton>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
        <div className="flex justify-between items-center text-sm text-white/40">
          <div>Available for new projects</div>
          <div className="hidden md:block">© 2025</div>
          <div>Scroll to explore</div>
        </div>
      </div>

      <RotatingText />
    </div>
  );
};

export default Hero;
