import { useState, useEffect } from "react";
import SEO from "../components/SEO";
import Image from "../components/Image";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedButton from "@/components/animations/AnimatedButton";
import SmokyButton from "@/components/ui/SmokyButton";
import { WHATSAPP_LINK } from "@/lib/whatsapp";
import serviceHeroImg from "@/components/images/service_page.jpeg?optimized";
import transformationImg from "@/components/images/transformation_image.jpg?optimized";

// Local image imports for services
import signatureCutImg from "@/components/images/Signature.jpg?optimized";
import highlightsImg from "@/components/images/Highlights.jpg?optimized";
import keratinTreatmentImg from "@/components/images/kertain.jpg?optimized";
import glowFacialImg from "@/components/images/Skin&Spa.jpg?optimized"; // Kept default for #1 since user specified #2 and #3
import oxygenImg from "@/components/images/oxygen.jpg?optimized";
import hydrafacialImg from "@/components/images/hydra.jpg?optimized";
import manicureImg from "@/components/images/nail_1.jpg?optimized";
import gelOverlaysImg from "@/components/images/nail_2.jpg?optimized";
import signatureEditorialImg from "@/components/images/makeover.jpg?optimized";
import bridalImg from "@/components/images/bride.jpg?optimized";
import hotStoneImg from "@/components/images/stone.jpg?optimized";
import detoxImg from "@/components/images/detox.jpg?optimized";


const servicesData = {
  hair: {
    title: "Hair Artistry",
    indexLabel: "01",
    items: [
      {
        title: "The Signature Cut",
        description: "A precision dry-cut followed by an organic botanical infusion wash and expert blowout styling.",
        duration: "75 Min",
        price: "120",
        imageUrl: signatureCutImg,
      },
      {
        title: "Artisan Balayage",
        description: "Hand-painted dimension using low-ammonia pigments to create a sun-kissed, natural finish.",
        duration: "180 Min",
        price: "280",
        imageUrl: highlightsImg,
      },
      {
        title: "Keratin Elixir",
        description: "A revolutionary smoothing treatment that eliminates frizz and restores structural integrity for up to 4 months.",
        duration: "120 Min",
        price: "350",
        imageUrl: keratinTreatmentImg,
      },
    ],
  },
  skin: {
    title: "Dermal Therapy",
    indexLabel: "02",
    items: [
      {
        title: "The Glow Facial",
        description: "Advanced exfoliation combined with deep hydration using pure hyaluronic acid and collagen peptides.",
        duration: "60 Min",
        price: "145",
        imageUrl: glowFacialImg,
      },
      {
        title: "Oxygen Infusion",
        description: "A pressurized stream of therapeutic-grade oxygen to deliver vitamins and minerals directly into the skin.",
        duration: "90 Min",
        price: "210",
        imageUrl: oxygenImg,
      },
      {
        title: "Hydrafacial Luxe",
        description: "Multi-step resurfacing treatment utilizing custom serums to extract impurities and deeply infuse hydration.",
        duration: "60 Min",
        price: "190",
        imageUrl: hydrafacialImg,
      },
    ],
  },
  nails: {
    title: "Nail Couture",
    indexLabel: "03",
    items: [
      {
        title: "Luxe Manicure",
        description: "A holistic hand ritual including a sea-salt scrub, paraffin soak, and artisan lacquer application.",
        duration: "45 Min",
        price: "65",
        imageUrl: manicureImg,
      },
      {
        title: "Gel Overlays",
        description: "Advanced restructuring gel base with non-toxic colors, cured under premium LED lamps for durable gloss.",
        duration: "75 Min",
        price: "95",
        imageUrl: gelOverlaysImg,
      },
    ],
  },
  makeup: {
    title: "Luxury Makeup",
    indexLabel: "04",
    items: [
      {
        title: "Signature Editorial",
        description: "High-contrast customized makeup application for events, photographic shoots, or editorial events.",
        duration: "60 Min",
        price: "160",
        imageUrl: signatureEditorialImg,
      },
      {
        title: "Bridal Consultation",
        description: "Full service color match and cosmetic trial trial in our private suite to align with your dress and lighting.",
        duration: "90 Min",
        price: "250",
        imageUrl: bridalImg,
      },
    ],
  },
  spa: {
    title: "Holistic Spa",
    indexLabel: "05",
    items: [
      {
        title: "Hot Stone Massage",
        description: "Smooth heated volcanic basalt stones aligned with organic herbal essential oils for profound physical relaxation.",
        duration: "90 Min",
        price: "180",
        imageUrl: hotStoneImg,
      },
      {
        title: "Detox Body Scrub",
        description: "Deep exfoliation using crushed sea-salts and essential oils, followed by a botanical hydration rinse.",
        duration: "60 Min",
        price: "140",
        imageUrl: detoxImg,
      },
    ],
  },
};

type SectionKey = keyof typeof servicesData;

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("hair");
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [isMobile, setIsMobile] = useState(false);

  // Resize listener to track mobile breakpoint for sticky offsets
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamically measure navbar height to set exact offsets for sticky and scroll behavior
  useEffect(() => {
    const navElement = document.querySelector("nav");
    if (!navElement) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const updateHeight = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setNavbarHeight(navElement.getBoundingClientRect().height);
      }, 100);
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(navElement);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Scroll-Spy observer to highlight active category in real time while scrolling (Desktop/Tablet only)
  useEffect(() => {
    if (isMobile) return;

    const sectionKeys = Object.keys(servicesData) as SectionKey[];
    const topMargin = navbarHeight + 40;
    const observerOptions = {
      root: null,
      rootMargin: `-${topMargin}px 0px -55% 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionKey);
        }
      });
    }, observerOptions);

    sectionKeys.forEach((key) => {
      const el = document.getElementById(key);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navbarHeight, isMobile]);

  // Mobile scroll-based automatic category transition observer
  useEffect(() => {
    if (!isMobile) return;

    const sectionKeys = Object.keys(servicesData) as SectionKey[];
    const currentIndex = sectionKeys.indexOf(activeSection);

    const observerOptions = {
      root: null,
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "mobile-next-trigger") {
            if (currentIndex < sectionKeys.length - 1) {
              const nextKey = sectionKeys[currentIndex + 1];
              setActiveSection(nextKey);
              // Instantly snap to the top of services container for continuity
              const anchor = document.getElementById("services-content-anchor");
              if (anchor) {
                const offset = navbarHeight + 85;
                window.scrollTo({
                  top: anchor.getBoundingClientRect().top + window.scrollY - offset,
                  behavior: "instant" as any,
                });
              }
            }
          } else if (entry.target.id === "mobile-prev-trigger") {
            if (currentIndex > 0) {
              const prevKey = sectionKeys[currentIndex - 1];
              setActiveSection(prevKey);
              // Instantly snap to the top of services container
              const anchor = document.getElementById("services-content-anchor");
              if (anchor) {
                const offset = navbarHeight + 85;
                window.scrollTo({
                  top: anchor.getBoundingClientRect().top + window.scrollY - offset,
                  behavior: "instant" as any,
                });
              }
            }
          }
        }
      });
    }, observerOptions);

    const nextTrigger = document.getElementById("mobile-next-trigger");
    const prevTrigger = document.getElementById("mobile-prev-trigger");

    if (nextTrigger) observer.observe(nextTrigger);
    if (prevTrigger) observer.observe(prevTrigger);

    return () => observer.disconnect();
  }, [activeSection, isMobile, navbarHeight]);

  // Auto-scroll the active category pill into view on mobile/tablet
  useEffect(() => {
    const activeChip = document.getElementById(`chip-${activeSection}`);
    const container = document.getElementById("mobile-chips-container");
    if (activeChip && container) {
      const containerRect = container.getBoundingClientRect();
      const chipRect = activeChip.getBoundingClientRect();

      const isCollapsedLeft = chipRect.left < containerRect.left;
      const isCollapsedRight = chipRect.right > containerRect.right;

      if (isCollapsedLeft || isCollapsedRight) {
        container.scrollTo({
          left: activeChip.offsetLeft - container.offsetWidth / 2 + activeChip.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeSection]);

  const scrollToSection = (id: SectionKey) => {
    setActiveSection(id);
    if (isMobile) {
      setTimeout(() => {
        const anchor = document.getElementById("services-content-anchor");
        if (anchor) {
          const offset = navbarHeight + 85;
          window.scrollTo({
            top: anchor.getBoundingClientRect().top + window.scrollY - offset,
            behavior: "smooth",
          });
        }
      }, 50);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - (navbarHeight + 40);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <main className="pb-16 md:pb-24 xl:pb-32 bg-background">
      <SEO 
        title="Our Services"
        description="Explore our bespoke luxury services including precision hair artistry, advanced dermal therapies, and exclusive bridal suites."
        canonical="/services"
      />
      {/* Hero Section with background image */}
      <section id="hero-section" className="relative h-[65vh] md:h-[75vh] min-h-[450px] w-full flex items-center overflow-hidden bg-black mb-8 md:mb-12 xl:mb-16">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={serviceHeroImg}
            alt="Ashwini Salon luxury service experience"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto w-full mt-16">
          <div
            className="max-w-3xl"
          >
            <span className="font-sans text-xs text-white/80 uppercase tracking-widest block mb-4 font-semibold">
              Curated Experiences
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight tracking-tight">
              Our Services
            </h1>
            <p className="font-sans text-base md:text-xl text-white/90 max-w-xl leading-relaxed">
              Discover a realm of bespoke beauty and wellness. Each treatment is tailored to your unique essence, delivered by master artisans in a sanctuary of tranquility.
            </p>
          </div>
        </div>
      </section>

      {/* Services Main Container */}
      <div className="px-6 md:px-16 max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 mt-6 lg:mt-10">
        {/* Mobile/Tablet Category Chips (<1024px) - STICKY OVERLAY CONTAINER */}
        <div 
          className="w-full lg:hidden sticky z-30 bg-background/90 backdrop-blur-md py-3 -mx-6 px-6 border-b border-white/10 mb-6"
          style={{ top: `${navbarHeight}px` }}
        >
          <div
            id="mobile-chips-container"
            className="glass-card p-1.5 flex flex-row overflow-x-auto gap-1.5 no-scrollbar w-full scroll-smooth"
          >
            {(Object.keys(servicesData) as SectionKey[]).map((key) => {
              const active = activeSection === key;
              const section = servicesData[key];
              return (
                <button
                  key={key}
                  id={`chip-${key}`}
                  onClick={() => scrollToSection(key)}
                  className={`group relative flex-shrink-0 flex items-center justify-center px-4 py-2 text-[10px] sm:px-5 sm:py-2.5 sm:text-xs rounded-full font-sans uppercase tracking-widest transition-all duration-300 ${
                    active
                      ? "text-rose-gold font-bold bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      : "text-white/70 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  {active && (
                    <span
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/20 -z-10"
                    />
                  )}
                  <span className="truncate text-center">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop/Laptop Categories Sidebar (>=1024px) */}
        <aside className="hidden lg:block lg:w-[260px] xl:w-[300px] shrink-0">
          <div className="sticky z-30" style={{ top: `${navbarHeight + 40}px` }}>
            <div className="glass-card p-6 flex flex-col gap-1 w-full">
              <div className="pb-3 mb-2 border-b border-white/10">
                <p className="font-sans text-[10px] uppercase tracking-widest text-white/70 font-bold px-1">
                  Categories
                </p>
              </div>
              {(Object.keys(servicesData) as SectionKey[]).map((key) => {
                const active = activeSection === key;
                const section = servicesData[key];
                return (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`group relative flex-shrink-0 w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-sans text-xs uppercase tracking-widest transition-all duration-300 ${
                      active
                        ? "text-rose-gold font-bold bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        : "text-white/70 hover:text-white hover:bg-white/5 font-medium"
                    }`}
                  >
                    {/* Slim active category indicator (vertical left bar on desktop) */}
                    {active && (
                      <span
                        className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-rose-gold rounded-full"
                      />
                    )}
                    <span className="truncate text-left pl-2">{section.title}</span>
                    <span
                      className={`text-[10px] transition-colors ${
                        active ? "text-rose-gold font-bold" : "text-white/30 group-hover:text-white/70"
                      }`}
                    >
                      {section.indexLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Services Content Area (Right Side - Mobile, Tablet, Desktop) */}
        <div id="services-content-anchor" className="flex-1 min-w-0 space-y-10 sm:space-y-16 lg:space-y-24">
          {isMobile ? (
            // Mobile view: Render ONLY the active category
            (() => {
              const section = servicesData[activeSection];
              const sectionKeys = Object.keys(servicesData) as SectionKey[];
              const currentIndex = sectionKeys.indexOf(activeSection);
              return (
                <div className="space-y-6">
                  {/* Top trigger for scrolling up */}
                  {currentIndex > 0 && (
                    <div id="mobile-prev-trigger" className="h-2 w-full bg-transparent pointer-events-none" />
                  )}

                  <AnimatedSection
                    key={activeSection}
                    id={activeSection}
                    style={{ scrollMarginTop: `${navbarHeight + 75}px` }}
                  >
                    <div className="flex items-baseline gap-4 mb-6 sm:mb-8 border-b border-outline-variant/10 pb-2 sm:pb-3">
                      <AnimatedHeading
                        text={section.title}
                        as="h2"
                        className="font-display text-xl sm:text-2xl md:text-4xl font-medium text-white"
                      />
                      <span className="text-white/70 font-sans text-xs md:text-sm tracking-wider font-semibold">
                        {section.indexLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 content-auto contain-strict">
                      {section.items.map((item, idx) => (
                        <ServiceCard
                          key={idx}
                          title={item.title}
                          description={item.description}
                          imageUrl={item.imageUrl}
                          duration={item.duration}
                          price={item.price}
                          category={section.title}
                          index={idx}
                        />
                      ))}
                    </div>
                  </AnimatedSection>

                  {/* Bottom trigger for scrolling down */}
                  {currentIndex < sectionKeys.length - 1 && (
                    <div id="mobile-next-trigger" className="h-6 w-full bg-transparent pointer-events-none" />
                  )}
                </div>
              );
            })()
          ) : (
            // Desktop/Tablet view: Render all categories
            (Object.keys(servicesData) as SectionKey[]).map((key) => {
              const section = servicesData[key];
              return (
                <AnimatedSection
                  key={key}
                  id={key}
                  style={{ scrollMarginTop: `${navbarHeight + 40}px` }}
                >
                  <div className="flex items-baseline gap-4 mb-6 sm:mb-8 border-b border-outline-variant/10 pb-2 sm:pb-3">
                    <AnimatedHeading
                      text={section.title}
                      as="h2"
                      className="font-display text-xl sm:text-2xl md:text-4xl font-medium text-white"
                    />
                    <span className="text-white/70 font-sans text-xs md:text-sm tracking-wider font-semibold">
                      {section.indexLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 content-auto contain-strict">
                    {section.items.map((item, idx) => (
                      <ServiceCard
                        key={idx}
                        title={item.title}
                        description={item.description}
                        imageUrl={item.imageUrl}
                        duration={item.duration}
                        price={item.price}
                        category={section.title}
                        index={idx}
                      />
                    ))}
                  </div>
                </AnimatedSection>
              );
            })
          )}
        </div>
      </div>

      {/* Ready Booking Callout */}
      <AnimatedSection className="relative py-16 sm:py-24 md:py-32 mt-16 sm:mt-24 md:mt-32 overflow-hidden text-center text-white bg-black">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={transformationImg}
            alt="Ready for your transformation background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-luxury-gradient-alt opacity-90 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto">
          <AnimatedHeading
            text="Ready for your Transformation?"
            as="h2"
            className="font-display text-3xl sm:text-4xl md:text-6xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-tight"
          />
          <p className="font-sans text-sm sm:text-base md:text-lg text-white/70 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Secure your consultation with our master stylists and therapists. Exceptional beauty awaits those who seek it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-md mx-auto">
            <Link to="/book" className="flex-1">
              <SmokyButton variant="primary" as="div" className="w-full px-8 sm:px-12 py-4 sm:py-5 font-sans text-xs uppercase tracking-widest">
                Reserve Your Session
              </SmokyButton>
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <AnimatedButton variant="secondary" as="div" className="w-full px-8 sm:px-12 py-4 sm:py-5 font-sans text-xs uppercase tracking-widest">
                WhatsApp
              </AnimatedButton>
            </a>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
