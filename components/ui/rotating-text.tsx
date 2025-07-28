import React, { useState, useEffect, useRef } from "react";

const RotatingText = () => {
  const [rotation, setRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const animationFrame = useRef<number | null>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const text = "Available for new projects • Front End Mobile Developer/Full Stack Web Developer • ";

  // Measure the actual width of one text instance
  useEffect(() => {
    if (textRef.current) {
      // Create a temporary element to measure single text width
      const tempElement = document.createElement('span');
      tempElement.style.visibility = 'hidden';
      tempElement.style.position = 'absolute';
      tempElement.style.fontSize = window.innerWidth >= 768 ? '2.25rem' : '1.5rem'; // md:text-4xl : text-2xl
      tempElement.style.fontWeight = '500';
      tempElement.style.whiteSpace = 'nowrap';
      tempElement.textContent = text;
      
      document.body.appendChild(tempElement);
      const measuredWidth = tempElement.offsetWidth + 32; // +32 for mr-8 (2rem = 32px)
      setTextWidth(measuredWidth);
      document.body.removeChild(tempElement);
    }
  }, [text]);

  useEffect(() => {
    if (textWidth === 0) return; // Wait for text width to be measured

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 1 : -1;

      setScrollDirection(direction);
      setIsScrolling(true);
      lastScrollY.current = currentScrollY;

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set timeout to return to default rotation after scroll stops
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Default rotation animation
    const animate = () => {
      setRotation((prev) => {
        if (isScrolling) {
          // Scroll-controlled movement (reverse direction)
          const newPos = prev - scrollDirection * 3;
          // Ensure smooth wrapping for scroll-controlled movement
          if (newPos <= -textWidth) {
            return newPos + textWidth;
          } else if (newPos >= 0) {
            return newPos - textWidth;
          }
          return newPos;
        } else {
          // Default rightward movement (carousel effect)
          const newPos = prev - 1;
          // Reset position when one full text width has passed
          return newPos <= -textWidth ? 0 : newPos;
        }
      });
      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isScrolling, scrollDirection, textWidth]);

  return (
    <div className="absolute bottom-20 left-0 right-0 overflow-hidden pointer-events-none">
      <div
        ref={textRef}
        className="flex whitespace-nowrap text-2xl md:text-4xl text-white/40 font-medium"
        style={{
          transform: `translateX(${rotation}px)`,
          width: "max-content",
        }}
      >
        {/* Repeat the text multiple times to create seamless loop */}
        {Array(20)
          .fill(text)
          .map((_, repeatIndex) => (
            <span key={repeatIndex} className="mr-8">
              {text}
            </span>
          ))}
      </div>
    </div>
  );
};

export default RotatingText;