"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
  duration,
  className = "",
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  // Calculate approximate viewBox based on text length
  const textLength = text.length;
  const baseWidth = Math.max(textLength * 60, 300); // Adjust multiplier as needed
  const baseHeight = 120; // Fixed height that works well for large text

  return (
    <div className={`w-full ${className}`}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${baseWidth} ${baseHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="select-none relative z-10"
        style={{ minHeight: "120px" }} // Ensure minimum height
      >
        <defs>
          <linearGradient
            id="textGradient"
            gradientUnits="userSpaceOnUse"
            cx="50%"
            cy="50%"
            r="30%"
          >
            {hovered ? (
              <>
                <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.6" />
                <stop offset="25%" stopColor="#cbd5e1" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.4" />
                <stop offset="75%" stopColor="#64748b" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#475569" stopOpacity="0.6" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#f1f5f9" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.15" />
              </>
            )}
          </linearGradient>

          <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
            <feOffset dx="0" dy="0.2" result="softBlur" />
            <feMerge>
              <feMergeNode in="softBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="subtleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="softGlow" />
            <feOffset dx="0" dy="0" result="offsetGlow" />
            <feMerge>
              <feMergeNode in="offsetGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="refinedGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="refinedBlur" />
            <feMerge>
              <feMergeNode in="refinedBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <motion.radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="20%"
            initial={{ cx: "50%", cy: "50%" }}
            animate={maskPosition}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 50,
            }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>
          <mask id="textMask">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#revealMask)"
            />
          </mask>
        </defs>

        {/* Base visible text layer */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="1.5"
          className="fill-neutral-300 stroke-neutral-400 font-bold dark:fill-neutral-600 dark:stroke-neutral-500"
          style={{
            fontSize: "6rem",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          {text}
        </text>

        {/* Animated stroke outline */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="2"
          className="fill-transparent stroke-neutral-600 font-bold dark:stroke-neutral-300"
          initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
          animate={{
            strokeDashoffset: 0,
            strokeDasharray: 1000,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
          }}
          style={{
            fontSize: "6rem",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          {text}
        </motion.text>

        {/* Hover gradient effect layer */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="url(#textGradient)"
          strokeWidth="2"
          mask="url(#textMask)"
          className="fill-transparent font-bold"
          style={{
            opacity: hovered ? 1 : 0,
            fontSize: "6rem",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
};
