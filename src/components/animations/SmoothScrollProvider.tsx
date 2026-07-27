import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isLowEndDevice } from "../../utils/hardwareDetection";

// Register ScrollTrigger once at module level — safe, no duplicate registrations
gsap.registerPlugin(ScrollTrigger);

// Context to expose Lenis for programmatic scrolling
interface SmoothScrollContextType {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null });

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isLowEndDevice || prefersReducedMotion) {
      // Even without Lenis, ScrollTrigger works natively — no extra setup needed
      return;
    }

    const lenisInstance = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);
    (window as any).lenis = lenisInstance;

    // Sync Lenis scroll position with ScrollTrigger so all
    // scroll-triggered GSAP animations use the smooth scroll value
    lenisInstance.on("scroll", ScrollTrigger.update);

    let rafId: number;
    const raf = (time: number) => {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Tell GSAP to use Lenis's scroll position for ScrollTrigger
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.off("scroll", ScrollTrigger.update);
      lenisInstance.destroy();
      // Kill all ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.killAll();
      setLenis(null);
      delete (window as any).lenis;
    };
  }, []);

  const contextValue = useMemo(() => ({ lenis }), [lenis]);

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
