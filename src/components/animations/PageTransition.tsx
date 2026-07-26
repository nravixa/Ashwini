import React, { useEffect } from "react";
import { useNavigationType } from "react-router-dom";
import { useSmoothScroll } from "./SmoothScrollProvider";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const navType = useNavigationType();
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    // Only scroll to top on PUSH or REPLACE navigation.
    // For POP navigation (back/forward), preserve browser's scroll restoration.
    if (navType !== "POP") {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [navType, lenis]);

  return (
    <div className="w-full">
      {children}
    </div>
  );
}
