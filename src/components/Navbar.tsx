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
          className={`flex justify-between items-center w-full border rounded-full px-4 md:px-10 py-3.5 transition-all duration-300 ${scrolled ? 'bg-[#1d1a31]/85 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'}`}
        >
          <Link to="/"
            onClick={() => handleLinkClick("/")}
            className="font-display text-xl sm:text-2xl font-bold tracking-tighter text-white uppercase"
          >
            ASHWINI SALON
          </Link>

          {/* Desktop Nav Links */}
          <div
            className="hidden lg:flex items-center space-x-8"
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
                  className={`relative font-sans text-xs uppercase tracking-widest transition-all duration-300 pb-1.5 ${
                    isActive ? "text-primary font-semibold" : "text-white/70 hover:text-white"
                  } ${isSiblingHovered ? "opacity-50 blur-[2px] scale-95" : "opacity-100 blur-none scale-100"}`}
                >
                  {link.name}

                  {/* Active Page Indicator */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-tertiary rounded-full shadow-[0_0_8px_rgba(193,165,169,0.8)]"
                    />
                  )}

                  {/* Hover Underline when not active */}
                  {!isActive && isHovered && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/40 origin-left rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* Booking Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:shadow-sm transition-all duration-300 flex items-center justify-center cursor-pointer"
              aria-label="Open Booking Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-white" />
              {totalCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs"
                >
                  {totalCount}
                </span>
              )}
            </button>

            <Link to="/book">
              <SmokyButton variant="primary" as="div" className="px-7 py-3 font-sans text-xs uppercase tracking-widest flex items-center gap-2.5 group">
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Now</span>
              </SmokyButton>
            </Link>
          </div>

          {/* Mobile Actions: Cart Icon + Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-white/10 bg-white/5 text-white flex items-center justify-center cursor-pointer"
              aria-label="Open Booking Cart"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {totalCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
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
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className={`absolute top-[calc(100%+12px)] left-4 right-4 z-40 premium-glass border border-white/20 shadow-2xl lg:hidden flex flex-col px-8 py-8 space-y-6 rounded-3xl transition-all duration-300 ${
              isOpen
                ? "is-open opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            {/* Top Section: Centered Logo */}
            <div className="mobile-menu-logo">
              <Link to="/" onClick={() => setIsOpen(false)} className="font-display text-2xl font-bold tracking-widest text-white uppercase">
                ASHWINI SALON
              </Link>
            </div>

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

            {/* Bottom Section: CTA & Social Icons */}
            <div 
              style={{
                transitionDelay: isOpen ? "360ms" : "0ms"
              }}
              className={`pt-4 border-t border-white/10 space-y-4 transition-all duration-300 ${
                isOpen 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <Link to="/book" onClick={() => setIsOpen(false)} className="block w-full">
                <SmokyButton variant="primary" as="div" className="w-full py-3.5 font-sans text-xs uppercase tracking-widest flex items-center justify-center gap-2.5">
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </SmokyButton>
              </Link>

              {/* Mobile Drawer Social Icons Bar */}
              <div className="flex items-center justify-center space-x-6 pt-2">
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center text-primary hover:bg-black hover:text-white transition-colors duration-300 shadow-sm"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={FACEBOOK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-colors duration-300 shadow-sm"
                  aria-label="Facebook Page"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={TWITTER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white transition-colors duration-300 shadow-sm"
                  aria-label="X Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={LINKEDIN_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-colors duration-300 shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href={THREADS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:bg-black hover:text-white transition-colors duration-300 shadow-sm"
                  aria-label="Threads Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.184 14.86c-.579.529-1.282.784-2.11.764-1.077-.024-1.954-.429-2.585-1.206-.467-.577-.7-1.298-.7-2.164.004-.847.234-1.543.693-2.091.564-.672 1.344-1.008 2.339-.982 1.258.033 2.061.642 2.408 1.826.046.158.07.319.072.483.003.585-.145 1.134-.442 1.649-.247.428-.59.739-1.03.931-.19.083-.393.136-.607.16-.145.016-.291.02-.437.013-.263-.013-.483-.119-.66-.319-.115-.13-.178-.291-.189-.483-.008-.139.022-.267.091-.384a.65.65 0 0 1 .306-.273c.189-.089.395-.125.617-.107.201.016.388.081.561.196.164.109.288.254.372.436.044.095.068.196.071.303l.001.042c-.001.008-.002.016-.003.023-.002.015-.008.026-.017.034-.035.031-.086.035-.152.012-.132-.047-.238-.134-.316-.263-.09-.15-.119-.319-.089-.508.053-.332.18-.585.381-.758.172-.149.378-.224.618-.224h.024c.264.015.485.121.663.319.117.13.181.291.191.483.008.139-.022.267-.091.384a.656.656 0 0 1-.306.273c-.189.089-.395.125-.617.107-.201-.016-.388-.081-.561-.196-.164-.109-.288-.254-.372-.436-.044-.095-.068-.196-.071-.303v-.065c.01-.84.24-1.52.693-2.042.485-.56 1.157-.84 2.017-.84.757 0 1.353.216 1.787.649.467.467.7 1.099.7 1.896s-.233 1.429-.7 1.896c-.434.433-1.03.649-1.787.649z"/>
                  </svg>
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center text-primary hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-colors duration-300 shadow-sm"
                  aria-label="WhatsApp Contact"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
      </nav>
    </>
  );
});

export default Navbar;
