"use client";

import { useState, useRef, useEffect } from "react";
import Project from "../components/ui/project-modal";
import gsap from "gsap";
import Image from "next/image";
import Rounded from "../components/ui/magic-button";

interface ProjectType {
  title: string;
  src: string;
  color: string;
  href: string;
  description: string;
}

const projects: ProjectType[] = [
  {
    title: "Zuna Tech",
    src: "zuna.png",
    color: "#6572fdff",
    href: "https://www.zunatech.org",
    description:
      "Logistics and product sourcing platform with custom backend for personalized messaging and tailored solution recommendations.",
  },
  {
    title: "Converso",
    src: "converso.png",
    color: "#6572fdff",
    href: "https://www.converso.vercel.app",
    description:
      "A personalized AI tutoring platform that uses customizable voice models to make learning any subject feel natural, engaging, and human.",
  },
  {
    title: "ATOM",
    src: "atom.png",
    color: "#1a1a1aff",
    href: "https://atom-ecommerce.vercel.app",
    description:
      "Luxurious and stylish e-commerce platform featuring modern design and seamless shopping experience.",
  },
  {
    title: "LearnYX",
    src: "learnyx.png",
    color: "#4f46e5ff",
    href: "https://learnyx.vercel.app",
    description:
      "Comprehensive school management dashboard for streamlined administration, student tracking, and educational workflows.",
  },
  {
    title: "Spark House",
    src: "arch.png",
    color: "#b7b7b7ff",
    href: "https://sparkhouse.vercel.app",
    description:
      "Elegant portfolio showcasing architectural excellence and innovative design projects for a leading architectural firm.",
  },
  {
    title: "Archademy LTD",
    src: "spark.png",
    color: "#000000ff",
    href: "https://archdemy.vercel.app",
    description:
      "Professional portfolio site highlighting architectural mastery and cutting-edge building designs.",
  },
  {
    title: "Remote Next",
    src: "rem.png",
    color: "#a3947dff",
    href: "https://remotenext.vercel.app",
    description:
      "Platform designed to connect professionals with remote job opportunities worldwide.",
  },
];

const TOP_PROJECTS_COUNT = 4;

export default function Home() {
  const [modal, setModal] = useState<{ active: boolean; index: number }>({
    active: false,
    index: 0,
  });
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const extraProjectsRef = useRef<HTMLDivElement>(null);

  const { active, index } = modal;

  const topProjects = projects.slice(0, TOP_PROJECTS_COUNT);
  const extraProjects = projects.slice(TOP_PROJECTS_COUNT);
  const displayedProjects = showAll ? projects : topProjects;

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth mouse tracking with GSAP (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const modal = modalRef.current;
      const cursor = cursorRef.current;

      if (modal) {
        gsap.to(modal, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Handle modal visibility with GSAP (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const modalEl = modalRef.current;
    const cursorEl = cursorRef.current;

    if (modalEl) {
      gsap.to(modalEl, {
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.8,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (cursorEl) {
      gsap.to(cursorEl, {
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [active, isMobile]);

  // Animate extra projects when showing
  useEffect(() => {
    const extraEl = extraProjectsRef.current;
    if (!extraEl) return;

    if (showAll) {
      const items = extraEl.querySelectorAll(".extra-project");
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [showAll]);

  const manageModal = (active: boolean, index: number) => {
    if (!isMobile) {
      setModal({ active, index });
    }
  };

  const handleSeeMore = () => {
    setShowAll(!showAll);
  };

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        {/* Header */}
        <div className="mb-16 sm:mb-32">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-light mb-6 sm:mb-8 tracking-tight">
            Projects
          </h1>
          <div className="max-w-2xl">
            <p className="text-base sm:text-xl text-white/60 font-light leading-relaxed mb-6 sm:mb-8">
              A collection of digital experiences crafted with precision and
              creativity. Each project represents a unique solution to complex
              challenges.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/40">
              <span>{projects.length} Projects</span>
              <span>•</span>
              <span>Full-Stack Development</span>
            </div>
          </div>
        </div>

        {/* Top Projects */}
        <div className="space-y-4 sm:space-y-8 mb-8 sm:mb-12">
          {topProjects.map((project, idx) => (
            <div
              key={idx}
              onClick={() => window.open(project.href, "_blank")}
              className="cursor-pointer"
            >
              <Project
                index={idx}
                title={project.title}
                description={project.description}
                manageModal={manageModal}
              />

              {/* Mobile Project Card - Shows on mobile instead of hover modal */}
              {isMobile && (
                <div className="mt-3 rounded-xl overflow-hidden border border-white/10">
                  <div
                    className="relative w-full aspect-video backdrop-blur-xl p-2"
                    style={{
                      backgroundColor: `${project.color}20`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" />
                    <Image
                      src={`/${project.src}`}
                      width={600}
                      height={400}
                      alt={project.title}
                      className="object-cover shadow-2xl relative z-10 rounded-lg w-full h-full"
                      priority={idx < 2}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Extra Projects (Collapsible) */}
        {extraProjects.length > 0 && (
          <div ref={extraProjectsRef}>
            {showAll && (
              <div className="space-y-4 sm:space-y-8 mb-8 sm:mb-12">
                {extraProjects.map((project, idx) => (
                  <div
                    key={idx + TOP_PROJECTS_COUNT}
                    onClick={() => window.open(project.href, "_blank")}
                    className="cursor-pointer extra-project"
                  >
                    <Project
                      index={idx + TOP_PROJECTS_COUNT}
                      title={project.title}
                      description={project.description}
                      manageModal={manageModal}
                    />

                    {/* Mobile Project Card */}
                    {isMobile && (
                      <div className="mt-3 rounded-xl overflow-hidden border border-white/10">
                        <div
                          className="relative w-full aspect-video backdrop-blur-xl p-2"
                          style={{
                            backgroundColor: `${project.color}20`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" />
                          <Image
                            src={`/${project.src}`}
                            width={600}
                            height={400}
                            alt={project.title}
                            className="object-cover shadow-2xl relative z-10 rounded-lg w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* See More / See Less Button */}
        <div className="text-center mb-12 sm:mb-16">
          <Rounded
            className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
            onClick={handleSeeMore}
          >
            {showAll ? "Show Less" : `See More Work (${extraProjects.length})`}
          </Rounded>
        </div>
      </div>

      {/* Desktop Hover Modal - Hidden on mobile */}
      {!isMobile && (
        <div
          ref={modalRef}
          className="hidden md:block fixed z-40 pointer-events-none"
          style={{
            left: 0,
            top: 0,
            width: 420,
            height: 280,
            transform: "translate(-50%, -50%)",
            opacity: 0,
            willChange: "transform",
          }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div
              className="w-full h-full relative"
              style={{
                transform: `translateY(${-index * 100}%)`,
                transition: "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
              }}
            >
              {projects.map((project, idx) => (
                <div
                  key={`modal_${idx}`}
                  className="w-full h-full flex items-center justify-center relative p-2"
                  style={{
                    height: "280px",
                  }}
                >
                  {/* Glassmorphic background with project color */}
                  <div
                    className="absolute inset-0 backdrop-blur-xl"
                    style={{
                      backgroundColor: `${project.color}20`,
                    }}
                  />
                  {/* Subtle gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" />

                  {/* Image takes most of the space */}
                  <Image
                    src={`/${project.src}`}
                    width={350}
                    height={264}
                    alt={project.title}
                    className="object-cover shadow-2xl relative z-10 rounded-xl w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Cursor Indicator - Hidden on mobile */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className="hidden md:block fixed pointer-events-none z-50"
          style={{
            left: 0,
            top: 0,
            width: 80,
            height: 80,
            transform: "translate(-50%, -50%)",
            opacity: 0,
            willChange: "transform",
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-white/40 backdrop-blur-sm bg-white/10" />
        </div>
      )}
    </main>
  );
}
