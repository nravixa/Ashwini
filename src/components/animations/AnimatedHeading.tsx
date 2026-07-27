import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger is registered once in SmoothScrollProvider

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
}

/**
 * AnimatedHeading — renders a heading with a GSAP scroll-triggered reveal.
 * Each word fades up individually for a premium staggered text effect.
 * Supports `delay` (seconds) and `stagger` (seconds per word) props.
 */
export default function AnimatedHeading({
  text,
  className = "",
  as = "h2",
  delay = 0,
  stagger = 0.06,
}: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLElement>(null);
  const Component = as as any;

  useLayoutEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    // Split text into word spans for stagger effect
    const words = text.split(" ");
    el.innerHTML = words
      .map((word) => `<span class="gsap-word-wrap" style="display:inline-block;overflow:hidden;"><span class="gsap-word" style="display:inline-block;">${word}</span></span>`)
      .join(" ");

    const wordEls = el.querySelectorAll(".gsap-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { opacity: 0, y: "100%" },
        {
          opacity: 1,
          y: "0%",
          duration: 0.7,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ctx.revert();
      // Restore original text on cleanup to prevent Strict Mode duplication
      if (el) el.innerHTML = text;
    };
  }, [text, delay, stagger]);

  return (
    <Component ref={headingRef} className={className}>
      {text}
    </Component>
  );
}
