import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * PageTransition — wraps each page route and animates it in on mount.
 * A quick fade-in + subtle upward translate gives a smooth page-change feel.
 * Uses useLayoutEffect to prevent a flash of invisible content.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          clearProps: "all", // remove inline styles after animation completes
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
}
