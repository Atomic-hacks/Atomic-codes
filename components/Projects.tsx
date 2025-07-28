"use client";

import { useState } from "react";
import Project from "../components/ui/project-modal";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Rounded from "../components/ui/magic-button";

interface ProjectType {
  title: string;
  src: string;
  color: string;
  href: string;
}

const projects: ProjectType[] = [
  {
    title: "Zuna Tech",
    src: "zuna.png",
    color: "#6572fdff",
    href: "https://www.zunatech.org",
  },
  {
    title: "Spark House",
    src: "arch.png",
    color: "#b7b7b7ff",
    href: "https://sparkhouse.vercel.app",
  },
  {
    title: "Archademy LTD",
    src: "spark.png",
    color: "#000000ff",
    href: "https://archdemy.vercel.app",
  },
  {
    title: "Remote Next",
    src: "rem.png",
    color: "#a3947dff",
    href: "https://remotenext.vercel.app",
  },
];

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function Home() {
  const [modal, setModal] = useState<{ active: boolean; index: number }>({
    active: false,
    index: 0,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { active, index } = modal;

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const manageModal = (active: boolean, index: number) => {
    setModal({ active, index });
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="min-h-screen text-white relative overflow-hidden"
      style={{ cursor: "none" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <div className="mb-32">
          <h1 className="text-7xl md:text-9xl font-light mb-8 tracking-tight">
            Projects
          </h1>
          <div className="max-w-2xl">
            <p className="text-xl text-white/60 font-light leading-relaxed mb-8">
              A collection of digital experiences crafted with precision and
              creativity. Each project represents a unique solution to complex
              challenges.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <span>{projects.length} Projects</span>
              <span>•</span>
              <span>Full-Stack Development</span>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8 mb-32">
          {projects.map((project, idx) => (
            <Project
              key={idx}
              index={idx}
              title={project.title}
              manageModal={(active, index) => manageModal(active, index)}
            />
          ))}
        </div>

        {/* More Work Button */}
        <div className="text-center mb-16">
          <Rounded className="px-8 py-4">More work</Rounded>
        </div>
      </div>

      {/* Simplified Modal */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        className="fixed pointer-events-none z-40"
        style={{
          left: mousePosition.x - 160, // Half of modal width (320px)
          top: mousePosition.y - 160, // Half of modal height (320px)
          width: 320,
          height: 320,
        }}
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm bg-black/80">
          <motion.div
            className="w-full h-full"
            animate={{ y: -index * 100 + "%" }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {projects.map((project, idx) => (
              <div
                key={`modal_${idx}`}
                className="w-full h-full flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: project.color }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <Image
                  src={`/${project.src}`}
                  width={280}
                  height={180}
                  alt={project.title}
                  className="object-cover shadow-lg relative z-10 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* View Button - moved inside modal to prevent interference */}
        <motion.button
          className="absolute bottom-4 right-4 px-4 py-2 rounded-full text-sm font-medium text-white backdrop-blur-sm border border-white/20 bg-black/80 hover:bg-white/20 hover:scale-105 transition-all duration-300 pointer-events-auto"
          onClick={() => window.open(projects[index]?.href ?? "#", "_blank")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          View
        </motion.button>
      </motion.div>

      {/* Simplified Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 w-20 h-20 rounded-full border-2 border-white/40 backdrop-blur-sm bg-white/10"
        style={{
          left: mousePosition.x - 40, // Half of cursor width (80px)
          top: mousePosition.y - 40, // Half of cursor height (80px)
        }}
        variants={modalVariants}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      />
    </main>
  );
}
