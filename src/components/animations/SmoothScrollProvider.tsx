import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from "react";
import Lenis from "lenis";
import { isLowEndDevice } from "../../utils/hardwareDetection";

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

    let rafId: number;
    const raf = (time: number) => {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
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
