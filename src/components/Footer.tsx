import React, { useRef, lazy, Suspense, useCallback } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const ThreeFooter = lazy(() => import("./animations/ThreeFooter"));

import {
  WHATSAPP_LINK,
  PHONE_DISPLAY,
  PHONE_LINK,
  EMAIL_ADDRESS,
  EMAIL_LINK,
  INSTAGRAM_LINK,
  FACEBOOK_LINK,
} from "@/lib/whatsapp";
import AnimatedIcon from "./animations/AnimatedIcon";
import WhatsAppIcon from "./WhatsAppIcon";

export default React.memo(function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isThreeFooterInView, setIsThreeFooterInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsThreeFooterInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" } // Load slightly before it scrolls into view
    );
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer ref={footerRef} id="site-footer" className="relative bg-background text-white pt-32 pb-8 overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[#1D1A31]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        <div className={`absolute inset-0 bg-luxury-gradient-alt opacity-40 pointer-events-none`} />
        <Suspense fallback={<div className="absolute inset-0 w-full h-full opacity-30 bg-white/5" />}>
          {isThreeFooterInView && <ThreeFooter />}
        </Suspense>
      </div>

      <div
        className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16"
      >
        <div className="glass-card p-10 md:p-16 rounded-[32px] grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Logo and About */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold tracking-tighter text-white uppercase">
              ASHWINI BEAUTY & SALON
            </h3>
            <p className="font-sans text-sm text-white/70 max-w-xs leading-relaxed">
              Crafting beauty through meticulous artistry and tranquil luxury in Pune. Dedicated to providing an unparalleled sanctuary for personal relaxation and styling.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
              {/* Official WhatsApp Icon */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300 text-white/90"
                aria-label="Official WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>

              {/* Instagram */}
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-white hover:text-primary hover:border-white transition-all duration-300 text-white/90"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={FACEBOOK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-300 text-white/90"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-rose-gold mb-6">
              Contact
            </h4>
            <ul className="space-y-4 font-sans text-sm text-white/70">
              <li className="flex items-start gap-3">
                <AnimatedIcon>
                  <MapPin className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                </AnimatedIcon>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Shop+no+10,+Dodke+Plazzo,+near+Wander+Futura,+Pramathesh+Housing+Society,+Mahatma+Society,+Kothrud,+Pune,+Maharashtra+411038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-300 leading-relaxed"
                >
                  Shop no 10, Dodke Plazzo, near Wander Futura, Kothrud, Pune, Maharashtra 411038
                </a>
              </li>
              <li className="flex items-center gap-3">
                <AnimatedIcon>
                  <Phone className="w-4 h-4 text-white/70 shrink-0" />
                </AnimatedIcon>
                <a href={PHONE_LINK} className="hover:text-white transition-colors duration-300">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <AnimatedIcon>
                  <Mail className="w-4 h-4 text-white/70 shrink-0" />
                </AnimatedIcon>
                <a href={EMAIL_LINK} className="hover:text-white transition-colors duration-300">
                  {EMAIL_ADDRESS}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-rose-gold mb-6">
              Studio Hours
            </h4>
            <div className="font-sans text-sm text-white/70 space-y-2">
              <p>Monday - Sunday: 10:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-white/70 gap-4">
          <p>
            © 2026 <a href="https://nravixa.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">NRAVIXA</a>. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6 font-sans">
            <Link to="/privacy"
              onClick={handleScrollToTop}
              className="hover:text-white transition-colors"
            >
              PRIVACY POLICY
            </Link>
            <Link to="/terms"
              onClick={handleScrollToTop}
              className="hover:text-white transition-colors"
            >
              TERMS OF SERVICE
            </Link>
            <Link to="/offers"
              onClick={handleScrollToTop}
              className="hover:text-white transition-colors"
            >
              OFFERS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});
