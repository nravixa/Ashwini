import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Menu, X, Calendar, ShoppingBag } from "lucide-react";
import { WHATSAPP_LINK, INSTAGRAM_LINK, FACEBOOK_LINK } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";
import SmokyButton from "@/components/ui/SmokyButton";
import WhatsAppIcon from "./WhatsAppIcon";


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

  // Handle browser back button: close menu first if open
  useEffect(() => {
    if (!isOpen) return;

    // Push a dummy state so the back button fires popstate before leaving the page
    window.history.pushState({ menuOpen: true }, "");

    const handlePopState = () => {
      setIsOpen(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

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

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Lock body scroll + touch when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-[1440px] px-2 sm:px-8 md:px-16 flex justify-center transition-all duration-300 ${scrolled ? "pt-3" : "pt-4"}`}
      >
        <div
          className={`flex justify-between items-center w-full border rounded-full px-5 md:px-8 py-2.5 transition-all duration-300 ${scrolled ? "bg-[#1d1a31]/85 backdrop-blur-md border-white/10" : "bg-transparent border-transparent"}`}
        >
          {/* Brand Name — visible on ALL screen sizes */}
          <Link
            to="/"
            onClick={() => handleLinkClick("/")}
            className="font-display text-sm sm:text-base md:text-lg font-extrabold tracking-[0.12em] sm:tracking-[0.15em] text-white uppercase shrink-0"
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
                <Link
                  key={link.name}
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
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-tertiary rounded-full shadow-[0_0_8px_rgba(193,165,169,0.8)]" />
                  )}

                  {/* Hover Underline when not active */}
                  {!isActive && isHovered && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/40 origin-left rounded-full" />
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
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-xs">
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
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl border border-white/10 bg-white/5 text-white flex items-center justify-center cursor-pointer"
              aria-label="Open Booking Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-white" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown — Fixed Full-Screen overlay */}
        <div
          id="mobile-menu"
          aria-hidden={!isOpen}
          className={`fixed inset-0 z-50 xl:hidden bg-background px-6 py-6 flex flex-col justify-between overflow-y-auto
            transition-all duration-300 ease-out
            ${isOpen
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 translate-x-4 pointer-events-none"
            }`}
        >
          {/* Header Row */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
            <span className="font-display text-sm sm:text-base font-extrabold tracking-[0.12em] sm:tracking-[0.15em] text-white uppercase">
              ASHWINI SALON
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2 focus:outline-none"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Centered Nav Links */}
          <div className="flex flex-col items-center justify-center gap-1.5 py-6 flex-grow">
            {navLinks.map((link, index) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  style={{
                    transitionDelay: isOpen ? `${index * 35}ms` : "0ms",
                  }}
                  className={`w-full text-center font-sans text-sm uppercase tracking-widest py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-primary font-bold bg-primary/10"
                      : "text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Book Now CTA */}
          <div className="py-4 border-t border-white/10 shrink-0">
            <Link to="/book" onClick={closeMenu} className="block w-full">
              <SmokyButton
                variant="primary"
                as="div"
                className="w-full py-4 font-sans text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </SmokyButton>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-5 py-4 border-t border-white/10 shrink-0">
            {/* WhatsApp */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10 active:scale-90 transition-all duration-200"
            >
              <WhatsAppIcon className="w-4.5 h-4.5" />
            </a>

            {/* Instagram */}
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              aria-label="Instagram"
              className="w-10 h-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/40 hover:bg-primary/10 active:scale-90 transition-all duration-200"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={FACEBOOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              aria-label="Facebook"
              className="w-10 h-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10 active:scale-90 transition-all duration-200"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
});

export default Navbar;
