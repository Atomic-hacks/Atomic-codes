"use client";
import React from "react";
import { motion } from "framer-motion";
import { slide, scale } from "./Animations";

interface LinkData {
  title: string;
  href: string;
  index: number;
}

interface LinkProps {
  data: LinkData;
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
  onNavigate?: (href: string) => void;
}

export default function Link({
  data,
  isActive,
  setSelectedIndicator,
  onNavigate,
}: LinkProps) {
  const { title, href, index } = data;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <motion.div
      className="relative mb-3 group"
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-black/20 backdrop-blur-lg opacity-50 rounded-full shadow-lg shadow-cyan-400/50"
      />

      <div className="relative pl-6 py-4">
        <button
          onClick={handleClick}
          className="text-white text-2xl font-light tracking-wide text-left w-full"
        >
          {title}
        </button>
      </div>
    </motion.div>
  );
}
