import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger is registered once in SmoothScrollProvider — no re-registration needed here

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * AnimatedSection — wraps a <section> and animates it into view on scroll.
 * Uses ScrollTrigger so the reveal fires when the section enters the viewport.
 */
export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  id,
  style,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      style={style}
    >
      {children}
    </section>
  );
}
