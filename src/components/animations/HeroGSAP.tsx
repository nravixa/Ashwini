import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

interface HeroGSAPProps {
  children: React.ReactNode;
}

/**
 * HeroGSAP — wraps the hero section and animates its children on mount.
 * - `.gsap-hero-image` fades in + scales from 1.08 → 1
 * - `.gsap-hero-content` fades up with a stagger
 * Uses useLayoutEffect so the animation starts before the browser paints,
 * preventing a flash of un-animated content.
 */
export default function HeroGSAP({ children }: HeroGSAPProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Hero image: fade in + subtle de-scale (from slightly zoomed → normal)
      tl.fromTo(
        ".gsap-hero-image",
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.6 },
        0
      );

      // Hero content elements: staggered fade-up
      tl.fromTo(
        ".gsap-hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 },
        0.6
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {children}
    </div>
  );
}
