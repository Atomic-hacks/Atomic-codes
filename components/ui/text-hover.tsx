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

  const textLength = text.length;
  const baseWidth = Math.max(textLength * 60, 300);
  const baseHeight = 120;

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
        style={{ minHeight: "120px" }}
      >
        <defs>
          {/* Glassmorphic gradient for fill */}
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
          </linearGradient>

          {/* Refined border gradient */}
          <linearGradient
            id="borderGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.3)" />
          </linearGradient>

          {/* Hover gradient */}
          <linearGradient
            id="hoverGradient"
            gradientUnits="userSpaceOnUse"
            cx="50%"
            cy="50%"
            r="30%"
          >
            {hovered ? (
              <>
                <stop offset="0%" stopColor="rgba(248, 250, 252, 0.9)" />
                <stop offset="25%" stopColor="rgba(203, 213, 225, 0.7)" />
                <stop offset="50%" stopColor="rgba(148, 163, 184, 0.5)" />
                <stop offset="75%" stopColor="rgba(100, 116, 139, 0.6)" />
                <stop offset="100%" stopColor="rgba(71, 85, 105, 0.8)" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="50%" stopColor="rgba(241, 245, 249, 0.25)" />
                <stop offset="100%" stopColor="rgba(226, 232, 240, 0.15)" />
              </>
            )}
          </linearGradient>

          {/* Glass blur effect */}
          <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.2" />
            </feComponentTransfer>
          </filter>

          {/* Subtle glow for depth */}
          <filter id="subtleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feFlood floodColor="rgba(255, 255, 255, 0.2)" />
            <feComposite in2="coloredBlur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient mask for hover effect */}
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

        {/* Base glassmorphic text layer */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#glassGradient)"
          filter="url(#glassBlur)"
          className="font-bold"
          style={{
            fontSize: "6rem",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          {text}
        </text>

        {/* Refined border/stroke layer */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="none"
          stroke="url(#borderGradient)"
          strokeWidth="0.5"
          className="font-bold"
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
          strokeWidth="1"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          className="font-bold"
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

        {/* Hover gradient effect layer with glow */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="url(#hoverGradient)"
          strokeWidth="1.5"
          fill="none"
          mask="url(#textMask)"
          filter="url(#subtleGlow)"
          className="font-bold"
          style={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
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
