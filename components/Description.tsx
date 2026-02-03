/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { gsap } from "gsap";
import Magnetic from "./common/Magnetic";
import RoundedButton from "./ui/magic-button";

// Register GSAP plugins at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin();
}

// Define types for better type safety
type StackCategory = "frontend" | "backend" | "mobile" | "tools";

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface StackData {
  frontend: string[];
  backend: string[];
  mobile: string[];
  tools: string[];
}

const PortfolioDescription = () => {
  const [activeCategory, setActiveCategory] =
    useState<StackCategory>("frontend");
  const techGridRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  // Streamlined, actually useful tech stack
  const stackData: StackData = {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "Docker",
    ],
    mobile: ["React Native", "Expo", "Flutter"],
    tools: ["Git", "Figma", "VS Code", "Postman"],
  };

  const experiences: Experience[] = [
    {
      title: "Front-End Developer",
      company: "Solnx Labs (Silicon Delta)",
      duration: "April 2025 - Present",
      description:
        "Building and maintaining interactive and performant front-end features for construction and infrastructure platforms. Collaborated closely with UI/UX teams to implement modern design systems using Next.js, TailwindCSS, and advanced animation techniques.",
    },
    {
      title: "Co-Founder",
      company: "ChatWazobia AI",
      duration: "October 2022 - Present",
      description:
        "Co-founded a conversational AI platform tailored for African languages and culture. Led the front-end architecture, building scalable interfaces with React and integrating AI models for multilingual support and voice recognition.",
    },
    {
      title: "Front-End Developer",
      company: "Zunatech",
      duration: "December 2024 - Jan 2025",
      description:
        "Developed modern user interfaces for SaaS and web-based tools. Focused on performance optimization, responsive design, and seamless API integrations.",
    },
    {
      title: "IT Engineer",
      company: "SLAB Group (Architectural Firm)",
      duration: "June 2024 - Present",
      description:
        "Managed IT infrastructure, ensured network security, and provided technical support for architectural design teams. Assisted with software configuration, hardware maintenance, and digital asset management as well building web solutions.",
    },
    {
      title: "Front-End Developer",
      company: "Silicon Delta",
      duration: "October 2024 - Present",
      description:
        "Contributed to multiple digital products as a front-end developer. Created reusable components, implemented state management, and ensured accessibility and cross-browser compatibility using modern JavaScript frameworks.",
    },
  ];

  // Simplified tech grid animation
  const animateTechGrid = (category: StackCategory) => {
    const grid = techGridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll(".tech-item");

    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.in",
        onComplete: () => {
          setActiveCategory(category);

          setTimeout(() => {
            const newItems = grid.querySelectorAll(".tech-item");
            gsap.fromTo(
              newItems,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.03,
                ease: "power2.out",
              }
            );
          }, 50);
        },
      });
    }, grid);

    return () => ctx.revert();
  };

  const handleCategoryChange = (category: StackCategory) => {
    if (category === activeCategory) return;
    animateTechGrid(category);
  };

  // Initialize animations on mount
  useEffect(() => {
    const grid = techGridRef.current;
    const experience = experienceRef.current;

    const ctx = gsap.context(() => {
      if (grid) {
        const items = grid.querySelectorAll(".tech-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }

      if (experience) {
        const items = experience.querySelectorAll(".experience-item");
        gsap.fromTo(
          items,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="mb-20 sm:mb-32">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 sm:mb-8 w-fit">
            <MapPin size={14} className="text-white/60" />
            <span className="text-xs sm:text-sm text-white/80">
              Based in Nigeria
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-9xl font-light mb-6 sm:mb-8 tracking-tight">
            About
          </h1>

          <div className="max-w-3xl">
            <p className="text-lg sm:text-xl text-white/60 font-light leading-relaxed mb-6 sm:mb-8">
              Hey, I&apos;m Atomic, a frontend developer with a strong design
              sense and a deep focus on crafting enjoyable user experiences. I
              specialize in building clean, intuitive, and high-performance
              interfaces with React and Next.js,thoughtful UX meets polished UI
              developments. While frontend is my core strength, I&apos;m
              comfortable collaborating across the stack and handling backend
              tasks when needed. With a solid Python background, exploring AI
              and ML wouldnt be too much of an issue, worst case scenario just a
              few docs and learning sessions away. I care deeply about how
              products feel to users and build interfaces that are both
              beautiful and purposeful.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/40">
              <span>3 Years Experience</span>
              <span>•</span>
              <span>Full-Stack Developer</span>
              <span>•</span>
              <span>Available for Projects</span>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20 sm:mb-32">
          <h2 className="text-3xl sm:text-4xl font-light mb-12 sm:mb-16 tracking-tight">
            Technology Stack
          </h2>

          {/* Category Navigation */}
          <div className="flex gap-2 sm:gap-4 mb-8 sm:mb-12 border-b border-white/10 overflow-x-auto scrollbar-hide">
            {(Object.keys(stackData) as StackCategory[]).map((category) => (
              <button
                key={category}
                data-category={category}
                onClick={() => handleCategoryChange(category)}
                className={`pb-3 sm:pb-4 px-2 sm:px-0 text-xs sm:text-sm font-medium transition-all duration-200 capitalize relative whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category
                    ? "text-white border-b-2 border-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tech Grid */}
          <div
            ref={techGridRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
          >
            {stackData[activeCategory].map((tech, index) => (
              <div
                key={`${tech}-${index}`}
                className="tech-item group p-3 sm:p-4 rounded-lg border border-white/10 
                  hover:border-white/30 hover:bg-white/5
                  transition-all duration-200 text-center relative overflow-hidden"
              >
                <span className="text-xs sm:text-sm text-white/80 group-hover:text-white relative z-10 block transition-colors duration-200">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-20 sm:mb-32">
          <h2 className="text-3xl sm:text-4xl font-light mb-12 sm:mb-16 tracking-tight">
            Experience
          </h2>

          <div ref={experienceRef} className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="experience-item border-b border-white/10 pb-8 sm:pb-12 last:border-b-0 
                  relative group hover:border-white/20 transition-colors duration-200"
              >
                <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-start md:gap-8 relative z-10">
                  <div className="md:w-1/3">
                    <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2 text-white/70 group-hover:text-white transition-colors duration-200">
                      {exp.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/60 mb-1 sm:mb-2 transition-colors duration-200">
                      {exp.company}
                    </p>
                    <p className="text-xs sm:text-sm text-white/40">
                      {exp.duration}
                    </p>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-sm sm:text-base text-white/70 group-hover:text-white/80 leading-relaxed transition-colors duration-200">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Magnetic>
            <RoundedButton
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              icon={<ArrowUpRight size={18} className="sm:w-5 sm:h-5" />}
            >
              Let&apos;s Work Together
            </RoundedButton>
          </Magnetic>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDescription;
