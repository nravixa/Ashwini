import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { WHATSAPP_LINK } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

const FloatingWhatsApp = React.memo(function FloatingWhatsApp() {
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = useLocation().pathname;
  const isHome = pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Wait for initial layout to settle before showing
    const timer = setTimeout(() => setIsReady(true), 500);

    // Initial check for mobile menu state (from scroll lock style)
    setIsMenuOpen(document.body.style.position === "fixed");

    // MutationObserver to hide/show when mobile menu changes body scroll lock styles
    const observer = new MutationObserver(() => {
      setIsMenuOpen(document.body.style.position === "fixed");
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleScrollFallback = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollY = window.scrollY;

    const distanceToBottom = scrollHeight - clientHeight - scrollY;
    setIsVisible(distanceToBottom > 550);
  }, []);

  useEffect(() => {
    if (isHome) return;

    // Use IntersectionObserver on footer to hide the button dynamically on scroll
    const footerElement = document.getElementById("site-footer");

    if (footerElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Hide WhatsApp button if footer starts entering viewport
            if (entry.isIntersecting) {
              setIsVisible(false);
            } else {
              setIsVisible(true);
            }
          });
        },
        {
          root: null, // viewport
          rootMargin: "0px 0px 80px 0px", // Hide when footer is within 80px of entering viewport
          threshold: 0,
        }
      );

      observer.observe(footerElement);

      return () => {
        observer.disconnect();
      };
    } else {
      // Fallback scroll listener if footer element is not found immediately during hydration
      window.addEventListener("scroll", handleScrollFallback, { passive: true });
      handleScrollFallback();

      return () => {
        window.removeEventListener("scroll", handleScrollFallback);
      };
    }
  }, [pathname, isHome, handleScrollFallback]);

  return (
    <>
      {isReady && !isHome && isVisible && !isMenuOpen && (
        <div
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center"
        >
          {/* Floating Animated Button */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Ashwini Salon on WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {/* Subtle breathing ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

            {/* WhatsApp Official SVG Icon */}
            <WhatsAppIcon className="w-7 h-7 relative z-10" />
          </a>
        </div>
      )}
    </>
  );
});

export default FloatingWhatsApp;
