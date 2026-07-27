import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger is registered once in SmoothScrollProvider

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  index?: number;
  delay?: number;
  onClick?: () => void;
}

/**
 * AnimatedCard — wraps content in a card with a GSAP scroll-triggered entrance.
 * Uses the `index` prop to stagger sibling cards in a grid.
 * Each card fades up + scales from 0.95 → 1 when it enters the viewport.
 */
export default React.memo(function AnimatedCard({
  children,
  className = "",
  innerClassName = "",
  index = 0,
  delay = 0,
  onClick,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Stagger delay based on index within the grid
    const staggerDelay = delay + index * 0.1;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 32, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          delay: staggerDelay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index, delay]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`relative group ${className} overflow-visible`}
    >
      <div
        className={`h-full w-full relative z-10 rounded-[inherit] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
});
