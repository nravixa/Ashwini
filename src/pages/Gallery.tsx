import React, { useState, useMemo, useCallback } from "react";
import SEO from "../components/SEO";
import Image from "../components/Image";
import { Link } from "react-router-dom";
import ImageSlider from "@/components/ImageSlider";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import AnimatedSection from "@/components/animations/AnimatedSection";
import SmokyButton from "@/components/ui/SmokyButton";


// Import local gallery images
import Gallery1 from "@/components/images/Gallery_1.jpg?optimized";
import Gallery2 from "@/components/images/Gallery_2.jpg?optimized";
import Gallery3 from "@/components/images/Gallery_3.jpg?optimized";
import Sanctuary from "@/components/images/Sanctuary.jpg?optimized";
import Gallery4 from "@/components/images/Gallery_4.jpg?optimized";
import Gallery5 from "@/components/images/Gallery_5.jpg?optimized";
import BeforeImage from "@/components/images/before_image.jpg?optimized";
import AfterImage from "@/components/images/after_image.jpg?optimized";

const categories = ["All Projects", "Hair Artistry", "Bridal Couture", "Editorial Nails", "The Studio"];

const galleryItems = [
  {
    category: "Hair Artistry",
    title: "Sculptural Tones",
    imageUrl: Gallery1,
  },
  {
    category: "The Studio",
    title: "The Sanctuary",
    imageUrl: Sanctuary,
  },
  {
    category: "Bridal Couture",
    title: "Ethereal Morning",
    imageUrl: Gallery2,
  },
  {
    category: "Editorial Nails",
    title: "Precision Gilded",
    imageUrl: Gallery3,
  },
  {
    category: "Hair Artistry",
    title: "Rose Luminescence",
    imageUrl: Gallery4,
  },
  {
    category: "The Studio",
    title: "Product Rituals",
    imageUrl: Gallery5,
  },
];

const GalleryPage = React.memo(function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setActiveItem(null); // Reset active state when switching categories
  }, []);

  const filteredItems = useMemo(() => (
    selectedCategory === "All Projects"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)
  ), [selectedCategory]);

  const renderedItems = useMemo(() => (
    filteredItems.map((item) => (
      <div
        key={item.title}
        onClick={() => setActiveItem(activeItem === item.title ? null : item.title)}
        className="relative group overflow-hidden glass-card rounded-[24px] break-inside-avoid shadow-sm mb-6 cursor-pointer"
      >
        <div className="relative w-full h-[400px]">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ease-out ${
              activeItem === item.title ? "scale-105" : "group-hover:scale-105"
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent transition-opacity duration-300 flex flex-col justify-end p-8 text-white ${
              activeItem === item.title ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <span className="card-label mb-2 text-white/80">
              {item.category}
            </span>
            <h3 className="card-title">{item.title}</h3>
          </div>
        </div>
      </div>
    ))
  ), [filteredItems, activeItem]);

  return (
    <main className="pt-20 sm:pt-28 md:pt-32 pb-16 md:pb-24 xl:pb-32 overflow-x-hidden bg-background">
      <SEO 
        title="Gallery"
        description="View our portfolio of aesthetic excellence. See the transformations and artistry created by the experts at Ashwini Salon."
        canonical="/gallery"
      />
      {/* Header Section */}
      <AnimatedSection id="hero-section" className="px-6 md:px-16 max-w-[1440px] mx-auto mb-10 md:mb-12 xl:mb-16 text-center">
        <span className="font-sans text-xs text-tertiary uppercase tracking-[0.3em] block mb-4 font-semibold">
          Aesthetic Excellence
        </span>
        <AnimatedHeading
          text="Curated Artistry"
          as="h1"
          className="font-display text-4xl md:text-6xl mb-8 md:mb-10 xl:mb-12 text-white"
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`relative px-6 py-2 font-sans text-xs md:text-sm uppercase tracking-widest transition-colors font-medium ${
                  active
                    ? "text-tertiary font-bold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {category}
                {active && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-tertiary"
                  />
                )}
              </button>
            );
          })}
        </div>
      </AnimatedSection>

      {/* Gallery Grid */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto min-h-[500px]">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
            {renderedItems}
        </div>
      </section>

      {/* Before & After Transformation Section */}
      <AnimatedSection className="relative mt-16 sm:mt-24 md:mt-32 bg-luxury-gradient py-16 md:py-24 border-y border-white/5">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] glow-orb-secondary rounded-full -translate-y-1/2 pointer-events-none" />
        <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto text-center mb-10 md:mb-12 xl:mb-16">
          <AnimatedHeading
            text="The Transformation"
            as="h2"
            className="font-display text-3xl md:text-5xl font-medium mb-4 text-white"
          />
          <p className="text-white/70 font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Experience the magic of technical expertise. Drag the slider to reveal the transition from raw canvas to refined beauty.
          </p>
        </div>
        <div className="px-6 md:px-16 max-w-4xl mx-auto">
          <ImageSlider
            beforeImage={BeforeImage}
            afterImage={AfterImage}
            beforeAlt="Unstyled hair before ritual"
            afterAlt="Multi-dimensional styled balayage waves"
          />
        </div>
      </AnimatedSection>

      {/* CTA Hero Banner — full page width, image as background, text centred overlay */}
      <AnimatedSection className="mt-12 md:mt-24 xl:mt-32 w-full">
        <div className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] lg:h-[640px] overflow-hidden group">

          {/* ── Background image ────────────────────────────────────────── */}
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP-mGlnwoBWTrkcCTjRR8CrlNG93dEUIvNUc-QWT6G61qJWNkQ2Aqtoa3U4wN8q5Hj3k6ij2LKn7DkuaEsYBUdJB36jdzwACQIeH4WrgsOrX1Tz9hTUzp5u3g1cUYjddFFG1SN4FkPN-u0QSEG-kTelkUHoOvc-oAY6wdlM0PjeCGltwiljqIRkTNjljTy9LZh3J3vUNQiXjjYg8KuU5CVVNCZzua6PCEcW7KftaFAVLdOvgNDY70y_XLELpziXHeYXD7VI2-yywA"
            alt="Luxury salon atmosphere"
            fill
            priority
            className="object-cover object-center scale-[1.06] group-hover:scale-100 transition-transform duration-[3000ms] ease-out"
          />

          {/* ── Layered gradient for rich, premium readability ───────────── */}
          {/* Top vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-transparent" />
          {/* Bottom rich dark */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          {/* Centre radial scrim — keeps mid text crisp */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.25)_0%,_transparent_70%)]" />

          {/* ── Decorative rose-gold glow behind text ────────────────────── */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.07] rounded-full blur-3xl pointer-events-none" />

          {/* ── Centred text content ─────────────────────────────────────── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-8">

            {/* Decorative rule */}
            <div className="w-8 h-[1px] bg-primary/70 mb-6" />

            {/* Eyebrow */}
            <span className="font-sans text-[10px] sm:text-xs text-primary uppercase tracking-[0.35em] block mb-5 font-semibold">
              Your Story Begins Here
            </span>

            {/* Main heading */}
            <h2 className="font-display text-[clamp(28px,5.5vw,60px)] text-white mb-5 leading-[1.1] tracking-tight max-w-3xl">
              Ready to write your own story?
            </h2>

            {/* Supporting paragraph */}
            <p className="font-sans text-[clamp(13px,1.5vw,16px)] text-white/70 mb-10 max-w-sm sm:max-w-md leading-relaxed">
              Let our master artisans craft a look that is entirely, beautifully yours.
            </p>

            {/* CTA button */}
            <Link to="/book" className="w-[80%] max-w-[240px] sm:w-auto">
              <SmokyButton
                variant="primary"
                as="div"
                className="w-full px-10 py-4 font-sans text-[10px] sm:text-xs uppercase tracking-[0.22em] flex items-center justify-center"
              >
                Book Your Session
              </SmokyButton>
            </Link>

            {/* Decorative rule */}
            <div className="w-8 h-[1px] bg-white/20 mt-10" />

          </div>

        </div>
      </AnimatedSection>


    </main>
  );
});

export default GalleryPage;
