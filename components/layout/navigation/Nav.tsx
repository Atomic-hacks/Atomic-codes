/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide, slide, scale } from './Animations';
import Footer from './Footer';

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

export default function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState("#home");

  // Smooth scroll function
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
      setSelectedIndicator(href);
      // Close mobile menu after navigation
      if (onNavigate) {
        setTimeout(() => onNavigate(), 300); // Small delay for smooth animation
      }
    }
  };

  // Custom Link component that works with your existing one
  const NavigationLink = ({ data, isActive, setSelectedIndicator }: any) => {
    const { title, href, index } = data;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      handleNavClick(href);
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
          className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-black/20 backdrop-blur-xl opacity-50 rounded-full shadow-lg shadow-cyan-400/50"
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
  };

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed top-0 right-0 h-screen w-96 z-[100]" // Higher z-index than button (z-30)
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
              data={{...data, index}}
              isActive={selectedIndicator === data.href}
              setSelectedIndicator={setSelectedIndicator}
            />
          ))}
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  );
}

// Curve component (since we removed the import)
const Curve = () => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const initialPath = `M100 0 L100 ${dimensions.height} Q-100 ${dimensions.height/2} 100 0`;
  const targetPath = `M100 0 L100 ${dimensions.height} Q100 ${dimensions.height/2} 100 0`;

  const curve:Variants = {
    initial: {
      d: initialPath
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <svg className="absolute top-0 left-0 w-24 h-full fill-none pointer-events-none">
      <defs>
        <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
        fill="url(#curveGradient)"
        className="drop-shadow-lg"
      />
    </svg>
  );
};