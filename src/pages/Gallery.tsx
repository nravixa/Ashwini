import React, { useState, useMemo, useCallback } from "react";
import SEO from "../components/SEO";
import Image from "../components/Image";
import { Link } from "react-router-dom";
import ImageSlider from "@/components/ImageSlider";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import AnimatedSection from "@/components/animations/AnimatedSection";
import SmokyButton from "@/components/ui/SmokyButton";
import MouseParallax from "@/components/animations/MouseParallax";

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

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
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
        className="relative group overflow-hidden glass-card rounded-[24px] break-inside-avoid shadow-sm mb-6 cursor-pointer"
      >
        <div className="relative w-full h-[400px]">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
            <span className="card-label mb-2 text-white/80">
              {item.category}
            </span>
            <h3 className="card-title">{item.title}</h3>
          </div>
        </div>
      </div>
    ))
  ), [filteredItems]);

  return (
    <main className="pt-32 pb-32 overflow-x-hidden bg-background">
      <SEO 
        title="Gallery"
        description="View our portfolio of aesthetic excellence. See the transformations and artistry created by the experts at Ashwini Salon."
        canonical="/gallery"
      />
      {/* Header Section */}
      <AnimatedSection id="hero-section" className="px-6 md:px-16 max-w-[1440px] mx-auto mb-16 text-center">
        <span className="font-sans text-xs text-tertiary uppercase tracking-[0.3em] block mb-4 font-semibold">
          Aesthetic Excellence
        </span>
        <AnimatedHeading
          text="Curated Artistry"
          as="h1"
          className="font-display text-4xl md:text-6xl mb-12 text-white"
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
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {renderedItems}
        </div>
      </section>

      {/* Before & After Transformation Section */}
      <AnimatedSection className="relative mt-32 bg-luxury-gradient py-24 border-y border-white/5">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] glow-orb-secondary rounded-full -translate-y-1/2 pointer-events-none" />
        <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto text-center mb-16">
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

      {/* CTA section */}
      <AnimatedSection className="mt-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <MouseParallax factor={10}>
          <div className="relative h-[400px] flex items-center justify-center text-center overflow-hidden rounded-3xl group border border-outline-variant/10 shadow-lg">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP-mGlnwoBWTrkcCTjRR8CrlNG93dEUIvNUc-QWT6G61qJWNkQ2Aqtoa3U4wN8q5Hj3k6ij2LKn7DkuaEsYBUdJB36jdzwACQIeH4WrgsOrX1Tz9hTUzp5u3g1cUYjddFFG1SN4FkPN-u0QSEG-kTelkUHoOvc-oAY6wdlM0PjeCGltwiljqIRkTNjljTy9LZh3J3vUNQiXjjYg8KuU5CVVNCZzua6PCEcW7KftaFAVLdOvgNDY70y_XLELpziXHeYXD7VI2-yywA"
              alt="Out of focus background of luxury salon"
              fill
              priority
              className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[2000ms]"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 px-6">
              <AnimatedHeading
                text="Ready to write your own story?"
                as="h2"
                className="font-display text-3xl md:text-5xl text-white mb-8"
              />
              <Link to="/book">
                <SmokyButton variant="primary" as="div" className="px-12 py-5 font-sans text-xs uppercase tracking-[0.2em]">
                  Book Your Session
                </SmokyButton>
              </Link>
            </div>
          </div>
        </MouseParallax>
      </AnimatedSection>
    </main>
  );
});

export default GalleryPage;
