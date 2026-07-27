import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  yOffset?: number;
  delay?: number;
}

/**
 * FloatingElement — applies an infinite gentle floating animation to its children
 * using GSAP's yoyo tween. Supports `duration` (seconds per half-cycle),
 * `yOffset` (pixels of vertical travel), and `delay` (initial pause).
 */
export default function FloatingElement({
  children,
  className = "",
  duration = 5,
  yOffset = 12,
  delay = 0,
}: FloatingElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -yOffset,
        duration,
        delay,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1, // infinite
      });
    });

    return () => ctx.revert();
  }, [duration, yOffset, delay]);

  return (
    <div ref={containerRef} className={`${className}`}>
      {children}
    </div>
  );
}
