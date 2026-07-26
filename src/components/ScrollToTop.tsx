import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSmoothScroll } from "./animations/SmoothScrollProvider";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { lenis } = useSmoothScroll();

  // Set scroll restoration to manual to prevent browser from restoring previous scroll state
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}
