/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, MapPin, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import Magnetic from "./common/Magnetic";
import RoundedButton from "./ui/magic-button";

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

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/tablet
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        window.innerWidth <= 768 ||
        "ontouchstart" in window;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // If mobile, don't initialize cursor
    if (isMobile) {
      return () => window.removeEventListener("resize", checkMobile);
    }

    const cursor = cursorRef.current;
    const cursorInner = cursorInnerRef.current;
    const cursorTextEl = cursorTextRef.current;

    if (!cursor || !cursorInner || !cursorTextEl) return;

    const updateMousePosition = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as Element;

      if (target?.closest(".tech-item")) {
        const techName = target.textContent?.trim() || "";
        setCursorText(techName);

        gsap.to(cursorInner, {
          scale: 3.5,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.8)",
          duration: 0.4,
          ease: "elastic.out(1, 0.3)",
        });

        gsap.to(cursorTextEl, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)",
        });
      } else if (target?.closest(".experience-item")) {
        gsap.to(cursorInner, {
          scale: 2.5,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.6)",
          duration: 0.4,
          ease: "elastic.out(1, 0.4)",
        });
      } else if (target?.closest("button")) {
        gsap.to(cursorInner, {
          scale: 1.8,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target?.closest(".tech-item, .experience-item, button")) {
        setCursorText("");

        gsap.to(cursorInner, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.4)",
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });

        gsap.to(cursorTextEl, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  // Don't render cursor on mobile
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
    >
      <div
        ref={cursorInnerRef}
        className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center"
      />
      <div
        ref={cursorTextRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          text-xs font-medium text-white whitespace-nowrap opacity-0 scale-75"
      >
        {cursorText}
      </div>
    </div>
  );
};

const PortfolioDescription = () => {
  const [activeCategory, setActiveCategory] =
    useState<StackCategory>("frontend");
  const [isMobile, setIsMobile] = useState(false);
  const techGridRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stackData: StackData = {
    frontend: [
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
      "Angular",
      "Svelte",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Styled Components",
      "Framer Motion",
      "GSAP",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "Nest.js",
      "Python",
      "Django",
      "FastAPI",
      "GraphQL",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "AWS",
      "Vercel",
      "Firebase",
    ],
    mobile: [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "Expo",
      "iOS Development",
      "Android Development",
    ],
    tools: [
      "Git",
      "Webpack",
      "Vite",
      "ESLint",
      "Prettier",
      "Jest",
      "Cypress",
      "Figma",
      "Adobe Creative Suite",
      "Postman",
    ],
  };

  const experiences: Experience[] = [
    {
      title: "Front-End Developer",
      company: "BuildCore (Silicon Delta)",
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

  // Animation functions - simplified for mobile
  const animateTechGrid = (category: StackCategory) => {
    const grid = techGridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll(".tech-item");

    // Simplified animation for mobile
    if (isMobile) {
      gsap.to(items, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setActiveCategory(category);
          setTimeout(() => {
            const newItems = grid.querySelectorAll(".tech-item");
            gsap.fromTo(
              newItems,
              { opacity: 0 },
              { opacity: 1, duration: 0.3, stagger: 0.05 }
            );
          }, 50);
        },
      });
      return;
    }

    // Full animation for desktop
    gsap.to(items, {
      opacity: 0,
      y: -30,
      rotationX: 90,
      scale: 0.8,
      duration: 0.4,
      stagger: {
        amount: 0.2,
        from: "random",
      },
      ease: "power3.in",
      onComplete: () => {
        setActiveCategory(category);

        setTimeout(() => {
          const newItems = grid.querySelectorAll(".tech-item");
          gsap.fromTo(
            newItems,
            {
              opacity: 0,
              y: 40,
              scale: 0.7,
              rotationX: -90,
              rotationY: 45,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              duration: 0.8,
              stagger: {
                amount: 0.4,
                from: "start",
                ease: "power2.out",
              },
              ease: "elastic.out(1, 0.4)",
            }
          );
        }, 100);
      },
    });
  };

  const animateTabSwitch = (category: StackCategory) => {
    if (isMobile) return; // Skip complex animations on mobile

    const tabs = tabsRef.current;
    if (!tabs) return;

    const activeTab = tabs.querySelector(`[data-category="${category}"]`);
    if (activeTab) {
      gsap.fromTo(
        activeTab,
        { scale: 0.95, rotationY: -10 },
        {
          scale: 1.08,
          rotationY: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
          yoyo: true,
          repeat: 1,
        }
      );
    }
  };

  const handleCategoryChange = (category: StackCategory) => {
    if (category === activeCategory) return;

    animateTabSwitch(category);
    animateTechGrid(category);
  };

  // Enhanced tech item hover - disabled on mobile
  const handleTechHover = (
    e: React.MouseEvent<HTMLDivElement>,
    isEntering: boolean
  ) => {
    if (isMobile) return; // Disable hover effects on mobile

    const item = e.currentTarget;
    const text = item.querySelector(".tech-text");
    const shine = item.querySelector(".tech-shine");
    const ripple = item.querySelector(".tech-ripple");

    if (isEntering) {
      // Create ripple effect
      gsap.set(ripple, { scale: 0, opacity: 0.5 });
      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animate main item
      gsap.to(item, {
        y: -8,
        rotationY: 8,
        rotationX: 5,
        scale: 1.08,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });

      // Animate text
      gsap.to(text, {
        scale: 1.1,
        color: "#ffffff",
        duration: 0.4,
        ease: "power2.out",
      });

      // Shine effect
      gsap.fromTo(
        shine,
        { x: "-100%", opacity: 0 },
        { x: "100%", opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    } else {
      gsap.to(item, {
        y: 0,
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });

      gsap.to(text, {
        scale: 1,
        color: "rgba(255, 255, 255, 0.8)",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  // Enhanced experience hover - disabled on mobile
  const handleExperienceHover = (
    e: React.MouseEvent<HTMLDivElement>,
    isEntering: boolean
  ) => {
    if (isMobile) return; // Disable hover effects on mobile

    const item = e.currentTarget;
    const bg = item.querySelector(".experience-bg");
    const title = item.querySelector(".exp-title");
    const company = item.querySelector(".exp-company");
    const description = item.querySelector(".exp-description");
    const glow = item.querySelector(".experience-glow");

    if (isEntering) {
      // Main container animation
      gsap.to(item, {
        x: 25,
        duration: 0.6,
        ease: "power3.out",
      });

      // Background effects
      gsap.to(bg, {
        opacity: 1,
        scale: 1.02,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(glow, {
        opacity: 0.3,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // Content animations
      gsap.to(title, {
        x: 10,
        color: "#ffffff",
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(company, {
        x: 15,
        color: "rgba(255, 255, 255, 0.8)",
        duration: 0.4,
        delay: 0.1,
        ease: "power2.out",
      });

      gsap.to(description, {
        x: 20,
        color: "rgba(255, 255, 255, 0.9)",
        duration: 0.4,
        delay: 0.2,
        ease: "power2.out",
      });
    } else {
      // Reset animations
      gsap.to(item, {
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.to(bg, {
        opacity: 0,
        scale: 0.98,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(glow, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to([title, company, description], {
        x: 0,
        color: "rgba(255, 255, 255, 0.7)",
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  // Initialize animations on mount - simplified for mobile
  useEffect(() => {
    const grid = techGridRef.current;
    const experience = experienceRef.current;

    if (grid) {
      const items = grid.querySelectorAll(".tech-item");

      if (isMobile) {
        // Simple fade-in for mobile
        gsap.fromTo(
          items,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.2 }
        );
      } else {
        // Full animation for desktop
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 50,
            scale: 0.7,
            rotationX: -45,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1,
            stagger: {
              amount: 0.6,
              from: "start",
              ease: "power2.out",
            },
            ease: "elastic.out(1, 0.4)",
            delay: 0.3,
          }
        );
      }
    }

    if (experience) {
      const items = experience.querySelectorAll(".experience-item");

      if (isMobile) {
        // Simple fade-in for mobile
        gsap.fromTo(
          items,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
        );
      } else {
        // Full animation for desktop
        gsap.fromTo(
          items,
          {
            opacity: 0,
            x: -80,
            rotationY: -15,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }
    }
  }, [isMobile]);

  return (
    <>
      <CustomCursor />
      <div
        className={`min-h-screen text-white relative ${!isMobile ? "cursor-none" : ""}`}
      >
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

            <div className="max-w-2xl">
              <p className="text-lg sm:text-xl text-white/60 font-light leading-relaxed mb-6 sm:mb-8">
                A passionate full-stack developer crafting digital experiences
                with precision and creativity. Specialized in modern web
                technologies, mobile development, and AI-powered solutions.
              </p>

              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/40">
                <span>3+ Years Experience</span>
                <span>•</span>
                <span>Available for projects</span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-20 sm:mb-32">
            <h2 className="text-3xl sm:text-4xl font-light mb-12 sm:mb-16 tracking-tight">
              Technology Stack
            </h2>

            {/* Category Navigation */}
            <div
              ref={tabsRef}
              className="flex gap-2 sm:gap-4 mb-8 sm:mb-12 border-b border-white/10 overflow-x-auto scrollbar-hide"
            >
              {(Object.keys(stackData) as StackCategory[]).map((category) => (
                <button
                  key={category}
                  data-category={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`pb-3 sm:pb-4 px-2 sm:px-0 text-xs sm:text-sm font-medium transition-all duration-500 capitalize relative overflow-hidden whitespace-nowrap flex-shrink-0 ${
                    activeCategory === category
                      ? "text-white border-b-2 border-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                  onMouseEnter={(e) => {
                    if (activeCategory !== category && !isMobile) {
                      gsap.to(e.currentTarget, {
                        y: -3,
                        scale: 1.05,
                        duration: 0.4,
                        ease: "elastic.out(1, 0.5)",
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== category && !isMobile) {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: "elastic.out(1, 0.3)",
                      });
                    }
                  }}
                >
                  {category}
                  {activeCategory === category && (
                    <div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                      style={{
                        animation: "slideIn 0.5s ease-out",
                      }}
                    />
                  )}
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
                  className="tech-item group p-3 sm:p-4 rounded-lg border border-white/10 hover:border-white/30 
                    transition-all duration-500 text-center relative overflow-hidden"
                  onMouseEnter={(e) => handleTechHover(e, true)}
                  onMouseLeave={(e) => handleTechHover(e, false)}
                >
                  <span className="tech-text text-xs sm:text-sm text-white/80 relative z-10 block transition-all duration-300">
                    {tech}
                  </span>

                  {/* Shine effect */}
                  <div className="tech-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0" />

                  {/* Ripple effect */}
                  <div className="tech-ripple absolute inset-0 bg-white/10 rounded-lg scale-0" />

                  {/* Background gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                  />
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
                    relative overflow-hidden group"
                  onMouseEnter={(e) => handleExperienceHover(e, true)}
                  onMouseLeave={(e) => handleExperienceHover(e, false)}
                >
                  {/* Background effects */}
                  <div
                    className="experience-bg absolute inset-0 
                    opacity-0 scale-98 rounded-lg transition-all duration-500"
                  />

                  <div
                    className="experience-glow absolute -left-4 top-1/2 transform -translate-y-1/2 
                    w-1 h-3/4 
                    opacity-0 scale-95 rounded-full blur-sm"
                  />

                  <div className="experience-content flex flex-col gap-4 sm:gap-6 md:flex-row md:items-start md:gap-8 relative z-10">
                    <div className="md:w-1/3">
                      <h3 className="exp-title text-lg sm:text-xl font-medium mb-1 sm:mb-2 text-white/70 transition-all duration-400">
                        {exp.title}
                      </h3>
                      <p className="exp-company text-sm sm:text-base text-white/60 mb-1 sm:mb-2 transition-all duration-400">
                        {exp.company}
                      </p>
                      <p className="text-xs sm:text-sm text-white/40 transition-all duration-400">
                        {exp.duration}
                      </p>
                    </div>
                    <div className="md:w-2/3">
                      <p className="exp-description text-sm sm:text-base text-white/70 leading-relaxed transition-all duration-400">
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
    </>
  );
};

export default PortfolioDescription;
