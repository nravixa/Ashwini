import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger is registered once in SmoothScrollProvider

interface AnimatedImageProps {
  children: React.ReactNode;
  className?: string;
  enableHoverEffect?: boolean;
}

/**
 * AnimatedImage — wraps an image in a container with a scroll-triggered
 * reveal animation: subtle scale-up + fade-in as it enters the viewport.
 */
export default function AnimatedImage({
  children,
  className = "",
}: AnimatedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 1.04, y: 16 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
