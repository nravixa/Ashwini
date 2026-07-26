import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Menu, X, Calendar, ShoppingBag } from "lucide-react";
import { WHATSAPP_LINK, INSTAGRAM_LINK, FACEBOOK_LINK } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";
import AnimatedButton from "@/components/animations/AnimatedButton";
import SmokyButton from "@/components/ui/SmokyButton";
import WhatsAppIcon from "./WhatsAppIcon";

const TWITTER_LINK = "https://x.com/";
const LINKEDIN_LINK = "https://linkedin.com/";
const THREADS_LINK = "https://threads.net/";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Offers", href: "/offers" },
  { name: "Membership", href: "/membership" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const Navbar = React.memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = useLocation().pathname;
  const { totalCount, setIsCartOpen } = useCart();

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLinkClick = useCallback((href: string) => {
    setIsOpen(false);
    if (pathname === href) {
      const globalLenis = (window as any).lenis;
      if (globalLenis) {
        globalLenis.scrollTo(0, { immediate: false });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-[1440px] px-2 sm:px-8 md:px-16 flex justify-center transition-all duration-300 ${scrolled ? 'pt-3' : 'pt-4'}`}
      >
        <div 
          className={`flex justify-between items-center w-full border rounded-full px-5 md:px-8 py-2.5 transition-all duration-300 ${scrolled ? 'bg-[#1d1a31]/85 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'}`}
        >
          <Link to="/"
            onClick={() => handleLinkClick("/")}
            className="font-display text-base sm:text-lg font-medium tracking-[0.15em] text-white uppercase md:block hidden"
          >
            ASHWINI SALON
          </Link>
 
          {/* Desktop Nav Links */}
          <div
            className="hidden xl:flex items-center space-x-6"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");
              const isHovered = hoveredLink === link.href;
              const isSiblingHovered = hoveredLink !== null && !isHovered;
 
              return (
                <Link key={link.name}
                  to={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  className={`relative font-sans text-[11px] uppercase tracking-[0.18em] transition-all duration-300 pb-1.5 ${
                    isActive ? "text-primary font-medium" : "text-white/70 hover:text-white"
                  } ${isSiblingHovered ? "opacity-50 blur-[1px] scale-95" : "opacity-100 blur-none scale-100"}`}
                >
                  {link.name}
 
                  {/* Active Page Indicator */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-tertiary rounded-full shadow-[0_0_8px_rgba(193,165,169,0.8)]"
                    />
                  )}
 
                  {/* Hover Underline when not active */}
                  {!isActive && isHovered && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/40 origin-left rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>
 
          <div className="hidden xl:flex items-center gap-3">
            {/* Booking Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:shadow-sm transition-all duration-300 flex items-center justify-center cursor-pointer"
              aria-label="Open Booking Cart"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              {totalCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-xs"
                >
                  {totalCount}
                </span>
              )}
            </button>
 
            <Link to="/book">
              <SmokyButton variant="primary" as="div" className="px-6 py-2.5 font-sans text-[10px] uppercase tracking-widest flex items-center gap-2 group">
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Now</span>
              </SmokyButton>
            </Link>
          </div>
 
          {/* Mobile Actions: Cart Icon + Hamburger Toggle */}
          <div className="flex items-center gap-2 xl:hidden ml-auto">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl border border-white/10 bg-white/5 text-white flex items-center justify-center cursor-pointer"
              aria-label="Open Booking Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-white" />
              {totalCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                >
                  {totalCount}
                </span>
              )}
            </button>
 
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary p-2 focus:outline-none"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-5.5 h-5.5 text-white" />}
            </button>
          </div>
        </div>
 
          <div
            id="mobile-menu"
            aria-hidden={!isOpen}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
            className={`absolute top-[calc(100%+12px)] left-4 right-4 z-40 premium-glass border border-white/20 shadow-2xl xl:hidden flex flex-col px-8 py-8 space-y-6 rounded-3xl transition-all duration-300 ${
              isOpen
                ? "is-open opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            {/* Center Section: Centered Links Group */}
            <div className="mobile-menu-links flex flex-col items-center justify-center">
              {navLinks.map((link, index) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link key={link.name}
                    to={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    style={{
                      transitionDelay: isOpen ? `${index * 45}ms` : "0ms"
                    }}
                    className={`font-sans text-sm uppercase tracking-widest transition-colors duration-300 ${
                      isActive
                        ? "text-primary font-bold border-l-2 border-primary pl-3"
                        : "text-white/70 hover:text-white pl-3"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
      </nav>
    </>
  );
});

export default Navbar;
