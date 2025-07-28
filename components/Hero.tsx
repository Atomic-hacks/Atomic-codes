"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
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

// Types
interface LocationBadgeProps {
  className?: string;
}

interface HeaderProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

// Location Badge Component
const LocationBadge: React.FC<LocationBadgeProps> = ({ className = "" }) => (
  <div
    className={`hidden md:flex items-center gap-2 px-4 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 ${className}`}
  >
    <MapPin size={14} className="text-white/60" />
    <span className="text-sm text-white/80 font-medium">
      Located in Nigeria
    </span>
  </div>
);

// Header Component
const Header: React.FC<HeaderProps> = ({ isActive, setIsActive }) => {
  const header = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only close menu when pathname changes, not when isActive changes
    setIsActive(false);
  }, [pathname, setIsActive]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (button.current) {
      gsap.set(button.current, { scale: 0 }); // Set initial scale

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "100px top",
        end: "bottom bottom",
        onEnter: () => {
          if (button.current) {
            gsap.to(button.current, {
              scale: 1,
              duration: 0.25,
              ease: "power1.out",
            });
          }
        },
        onLeaveBack: () => {
          if (button.current) {
            gsap.to(button.current, {
              scale: 0,
              duration: 0.25,
              ease: "power1.out",
            });
          }
          setIsActive(false);
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setIsActive]);

  const handleMenuToggle = () => {
    console.log("Menu button clicked, current state:", isActive); // Debug log
    setIsActive(!isActive);
  };

  return (
    <>
      {/* Main Header */}
      <div
        ref={header}
        className="absolute top-0 left-0 right-0 z-20 p-4 md:p-8"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            {/* Logo Section */}
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
            <Magnetic>
              <div className="group ">
                <button
                  onClick={() =>
                    document
                      .querySelector("#work")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm text-white/80 hover:text-white transition-colors duration-300"
                >
                  Work
                </button>
                <div className="w-0 h-px bg-white/80 group-hover:w-full transition-all duration-300" />
              </div>
            </Magnetic>

            <Magnetic>
              <div className="group ">
                <button
                  onClick={() =>
                    document
                      .querySelector("#about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm text-white/80 hover:text-white transition-colors duration-300"
                >
                  About
                </button>
                <div className="w-0 h-px bg-white/80 group-hover:w-full transition-all duration-300" />
              </div>
            </Magnetic>

            <Magnetic>
              <div className="group ">
                <button
                  onClick={() =>
                    document
                      .querySelector("#approach")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm text-white/80 hover:text-white transition-colors duration-300"
                >
                  Approach
                </button>
                <div className="w-0 h-px bg-white/80 group-hover:w-full transition-all duration-300" />
              </div>
            </Magnetic>
          </div>

          {/* Mobile Designation */}
          <div className="md:hidden text-white/60 text-sm font-medium">
            Freelance Developer
          </div>
        </div>
      </div>

      {/* Mobile Menu Button - Shows only after scrolling */}
      <div ref={button} className="fixed top-6 right-6 z-50 scale-0">
        <Rounded
          onClick={handleMenuToggle}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 "
          data-menu-button="true"
        >
          <div
            className={`w-5 h-3 relative transition-all duration-300 ${isActive ? "burger-active" : ""}`}
          >
            <span
              className={`absolute w-full h-px bg-white/80 transition-all duration-300 ${
                isActive ? "top-1/2 rotate-45 -translate-y-1/2" : "top-0"
              }`}
            />
            <span
              className={`absolute w-full h-px bg-white/80 top-1/2 -translate-y-1/2 transition-all duration-300 ${
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

      {/* Mobile Navigation - Higher z-index */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
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
export const Hero: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  // Debug effect
  useEffect(() => {
    console.log("Hero isActive state changed:", isActive);
  }, [isActive]);

  // Click outside to close menu
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Don't close if clicking on the menu button or inside the navigation
      if (
        target.closest("[data-menu-button]") ||
        target.closest("[data-navigation]")
      ) {
        return;
      }

      setIsActive(false);
    };

    // Add event listener with a small delay to prevent immediate closing
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, setIsActive]);

  return (
    <div className="h-screen relative flex flex-col overflow-hidden">
      {/* Integrated Header */}
      <Header isActive={isActive} setIsActive={setIsActive} />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-8">
        <div className="text-center">
          <TextHoverEffect text="Atomic" />

          {/* Subtitle */}
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
              Crafting digital experiences with
              <span className="text-white/90"> precision</span> and
              <span className="text-white/90"> creativity</span>
            </p>
          </div>

          <RoundedButton
            className="rounded-full px-4 md:px-12 md:py-6 py-4"
            data-scroll
            data-scroll-speed={0.1}
            icon={<ArrowUpRight />}
          >
            Contact
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

      {/* Rotating Text */}
      <RotatingText />

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent">
          <div className="w-1 h-8 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
