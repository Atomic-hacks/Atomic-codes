'use client';
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

export default function Curve() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
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
}