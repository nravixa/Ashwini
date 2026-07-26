import React, { useMemo, useState, useEffect, useRef } from "react";
import { getWhatsAppUrl } from "../lib/whatsapp";
import Image from "../components/Image";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Mail, ArrowUpRight } from "lucide-react";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedCard from "@/components/animations/AnimatedCard";
import AnimatedButton from "@/components/animations/AnimatedButton";
import SmokyButton from "@/components/ui/SmokyButton";
import AnimatedImage from "@/components/animations/AnimatedImage";
import AnimatedIcon from "@/components/animations/AnimatedIcon";

import FloatingElement from "@/components/animations/FloatingElement";
import HeroGSAP from "@/components/animations/HeroGSAP";
import SEO from "../components/SEO";
import heroBgImage from "@/components/images/home_1.jpg?optimized";
import sanctuaryImg from "@/components/images/Sanctuary.jpg?optimized";
import hairArtistryImg from "@/components/images/Hair_Artistry.jpg?optimized";
import productRitualsImg from "@/components/images/Product_Rituals.jpg?optimized";
import luxuryMakeupImg from "@/components/images/luxury_makeup.jpg?optimized";
import bridalSuiteImg from "@/components/images/Bridal_Suite.jpg?optimized";
import skinSpaImg from "@/components/images/Skin&Spa.jpg?optimized";


const featuredServices = [
  {
    title: "Hair Artistry",
    description: "Precision cuts, bespoke coloring, and revolutionary treatments tailored to your unique identity.",
    imageUrl: hairArtistryImg,
    href: "/services#hair",
  },
  {
    title: "Luxury Makeup",
    description: "From ethereal bridal looks to bold editorial transformations using world-class luxury cosmetics.",
    imageUrl: luxuryMakeupImg,
    href: "/services#makeup",
  },
  {
    title: "Bridal Suite",
    description: "A comprehensive, tranquil preparation experience for the most significant day of your life.",
    imageUrl: bridalSuiteImg,
    href: "/services#bridal",
  },
  {
    title: "Skin & Spa",
    description: "Rejuvenating facials and holistic body treatments designed to restore your natural glow.",
    imageUrl: skinSpaImg,
    href: "/services#spa",
  },
];

const galleryPreview = [
  {
    imageUrl: hairArtistryImg,
    title: "Sculptural Tones",
    category: "Hair Artistry",
  },
  {
    imageUrl: sanctuaryImg,
    title: "The Sanctuary",
    category: "Interior Design",
  },
  {
    imageUrl: productRitualsImg,
    title: "Product Rituals",
    category: "Skin Treatments",
  },
];

const testimonials = [
  {
    quote: "Great service, friendly staff, and a clean salon. I’m very happy with my haircut and will definitely come back. Highly recommended!",
    author: "Priyanka Borhade",
    role: "Verified Client",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnjzEWmY4_ntv4yucZeOiWoM7_opTa-KzDgr7nI_1X_N5jKb0129Ka08FE6_OjoS0hDfLmi8UucOzoin43JBv5nDBqt3XG9Bjn-XCMrWA1JWgesdJJu8JnFdFVJoks76FIWLpHFmlyb4q2RKZ6LcBAxrdHvHhfpTawGu81wdMxZJDewsR5bgmDfWqf-MkKIUoc5CkTdfrSq663xO9KuMaD72gUp6ZaM4-vYkFTrWwXB9AMLbVPDyPpcAIqocf7K-51Jv_deYwe3N4",
    stars: 5,
  },
  {
    quote: "Thank you for the wonderful service. I really appreciate your professionalism, attention to detail, and the care you put into your work. You made me feel comfortable throughout the appointment, and I’m very happy with the results. Keep up the amazing work!",
    author: "Namrta Mune",
    role: "Verified Client",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM7PO1GdEzWDc7005fDGunw90Z_Nw4-stMRcGOaf_Q7BP345Kb5oVsYyfEXCZomuYVWB79hD5pWwMBFe2I3JIbS0r94voMTA-CdCs_LN2b0JUwjBPRYy3Ot-pWHBDzOMohJ08NLZinKva4Wp_B2Qp8S58tRJr3aR8eVBza3iFIazCH342porY97fnH9FlLNOEp4qn1cqrpbHMStGDGLHxthSoxMlJglSYPvWRVuuGOCnGapsf-wSABVP3MM9BAshC-H_Ox1jsKJL8",
    stars: 5,
  },
  {
    quote: "Best experience... all rounder beautician, nail artist, hairstylist, makeup artist 🙌💯💯",
    author: "Tejal Mene",
    role: "Verified Client",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO33pas_5pVfP--o08aTnhcn9I5wf_VLpM1eT6iEHO5B7WfwJswhTz_she4zCmVnx09aYrRTLzEkpQXKA5EEN69OGVKWPTxYRy6zeZrDaHm4OtuhAVKdURn6nuZFpjpXM2iyvpzPBdeDPxErM2qA6m6glbF90v6NpzgZT62v57k6LuoHZHJ0u6PB4fDZ_JZHJ-uUTxI7n64Iphlt3GtxmuNtCkakfPs19lpgMFiBdtsGd6pWq4u5gywlHMw8saqHMNvFXyEtsMpM4",
    stars: 5,
  },
  {
    quote: "So beautiful & clean salon. Service's is the best, full on mind & body relaxation for all treatments & services. Incredible experience all the time.",
    author: "Monika Sondkar",
    role: "Verified Client",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu-PjcPB8qkmcSnZ5RbM21gfqeIEf45rl7np9-Lh7DGljWG9iTD1JTqyko2I0U4Dt2Gq5zP4nNUv0uwks46iwIO-YGf_EANOzxFofpalmJOZiYF-8Hu7S9XXv4TB-PGN6yTn0pf22d8h1GzkSIBitn5h_7HIx4pdTPrQrduOF9mm9Xd7kZQ_2sLcilC1ogFr6QLQumRkyeppB7nwD8KUxPP0YAF9wtSHSDXV7X1xplA2jjU5Rcv-pFRszb1zi9JrTVhMB1vxpZI5Y",
    stars: 5,
  },
];

const HomePage = React.memo(function HomePage() {
  const [reviewsList, setReviewsList] = useState(testimonials);
  const [reviewForm, setReviewForm] = useState({ author: "", stars: 5, quote: "" });
  const [reviewSuccess, setReviewSuccess] = useState(false);
  
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = 0;
    let lastTime = performance.now();
    const speed = 40; // Pixels per second
    
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const track = trackRef.current;
      if (track && !isHoveredRef.current && track.firstElementChild) {
        currentX += speed * delta;

        // Get the exact width of one set of testimonials including its padding/gap
        const setWidth = (track.firstElementChild as HTMLElement).offsetWidth;

        if (currentX >= setWidth) {
          currentX -= setWidth;
        }

        track.style.transform = `translate3d(-${currentX}px, 0, 0)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [reviewsList]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.author.trim() || !reviewForm.quote.trim()) return;
    
    const newEntry = {
      ...reviewForm,
      role: "Guest Client",
      imageUrl: "https://ui-avatars.com/api/?name=" + encodeURIComponent(reviewForm.author) + "&background=F08CAE&color=fff",
    };
    
    setReviewsList([newEntry, ...reviewsList]);
    setReviewSuccess(true);
    setReviewForm({ author: "", stars: 5, quote: "" });
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email address is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const message = `Hello Ashwini Beauty & Salon Team,

I hope you're doing well.

I would like to subscribe to your salon updates. Please find my details below:

📧 Email: ${email.trim()}

I would appreciate it if you could add me to your updates and exclusive offers.

Thank you for your time.

Kind Regards,
Subscriber`;
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank');
    
    setSubscribeSuccess(true);
    setEmail("");
    setTimeout(() => setSubscribeSuccess(false), 4000);
  };

  const renderedFeaturedServices = useMemo(() => (
    featuredServices.map((service, index) => (
      <AnimatedCard
        key={index}
        index={index}
        className="glass-card rounded-[24px] overflow-hidden group shadow-sm flex flex-col justify-between"
      >
          <AnimatedImage className="h-64 relative">
            <Image
              src={service.imageUrl}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </AnimatedImage>
          <div className="p-8">
            <h3 className="card-title mb-3 transition-transform duration-300 group-hover:-translate-y-1">
              {service.title}
            </h3>
            <p className="card-body line-clamp-3">
              {service.description}
            </p>
          </div>
        <div className="p-8 pt-0 mt-auto">
          <Link to={service.href}
            className="card-label !text-tertiary flex items-center group/btn gap-2 hover:!text-white transition-colors"
          >
            Learn More
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </AnimatedCard>
    ))
  ), []);

  const renderedTestimonials = useMemo(() => (
    reviewsList.map((test, index) => (
      <div
        key={index}
        className="w-[calc(100vw-48px)] sm:w-[450px] md:w-[600px] glass-card p-8 md:p-12 shrink-0 whitespace-normal flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]"
      >
        <p className="card-subtitle italic text-white mb-8">
          &ldquo;{test.quote}&rdquo;
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border border-white/10">
              <Image
                src={test.imageUrl}
                alt={test.author}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="card-body font-bold text-white">
                {test.author}
              </h4>
              <p className="card-label mt-0.5 text-white/70">
                {test.role}
              </p>
            </div>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: test.stars }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
            ))}
          </div>
        </div>
      </div>
    ))
  ), []);

  return (
    <div className="w-full">
      <SEO 
        title="Ashwini Salon | Redefining Elegance"
        description="Experience unparalleled luxury at Ashwini Salon. We offer bespoke hair artistry, premium skin rituals, and exclusive bridal suites in a serene sanctuary."
        canonical="/"
        preloadImage={heroBgImage}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Ashwini Salon",
          "image": "https://ashwinisalon.com/images/home_1.jpg",
          "@id": "",
          "url": "https://ashwinisalon.com",
          "telephone": "+1234567890",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Luxury Ave",
            "addressLocality": "Beverly Hills",
            "addressRegion": "CA",
            "postalCode": "90210",
            "addressCountry": "US"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "09:00",
            "closes": "19:00"
          }
        }}
      />
      {/* Hero Section */}
      <section id="hero-section" className="relative h-screen min-h-[600px] w-full flex items-center overflow-hidden bg-black">
        <HeroGSAP>
          <div className="absolute inset-0 z-0 w-full h-full gsap-hero-image">
            <Image
              src={heroBgImage}
              alt="Luxury salon interior featuring marble flooring and gold accents"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto w-full pt-[clamp(6.5rem,12vh,8rem)] pb-12 flex flex-col justify-center h-full">
            <div className="max-w-3xl">
              <AnimatedHeading
                text="Redefining Elegance"
                className="font-display text-6xl sm:text-7xl md:text-[6.5rem] text-3d-acrylic mb-8 leading-[1.1] tracking-tight"
                delay={0.5}
              />

              <div className="flex flex-col sm:flex-row gap-6 gsap-hero-content">
                <Link to="/book">
                  <SmokyButton variant="primary" as="div" className="px-10 py-5 w-full sm:w-auto font-sans font-bold uppercase tracking-widest text-sm">
                    Book Appointment
                  </SmokyButton>
                </Link>
                <Link to="/services">
                  <AnimatedButton variant="secondary" as="div" className="px-10 py-5 w-full sm:w-auto font-sans font-bold uppercase tracking-widest text-sm border border-white/20">
                    Our Services
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </HeroGSAP>
      </section>


      {/* Signature Services */}
      <AnimatedSection className="py-32 max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="text-center mb-24">
          <span className="font-sans text-xs text-tertiary uppercase tracking-widest block mb-4 font-semibold">
            Curated Experiences
          </span>
          <AnimatedHeading
            text="Our Signature Services"
            className="font-display text-3xl md:text-5xl font-medium text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {renderedFeaturedServices}
        </div>
      </AnimatedSection>

      {/* Visual Masterpieces / Gallery Preview */}
      <AnimatedSection className="relative py-32 bg-luxury-gradient-alt text-white overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] glow-orb-secondary rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="font-sans text-xs text-white/60 uppercase tracking-widest block mb-4 font-semibold">
                The Aesthetic
              </span>
              <AnimatedHeading
                text="Visual Masterpieces"
                className="font-display text-3xl md:text-5xl font-medium text-white"
              />
            </div>
            <Link to="/gallery"
              className="font-sans text-xs uppercase tracking-widest border-b border-white/30 pb-2 hover:border-white transition-all flex items-center gap-1 group"
            >
              View Full Gallery
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            {/* Item 1 */}
            <AnimatedCard index={0} className="relative group overflow-hidden rounded-lg md:col-span-1 md:mt-10">
              <AnimatedImage className="h-[400px] w-full bg-neutral-900">
                <Image
                  src={galleryPreview[0].imageUrl}
                  alt={galleryPreview[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/70 block mb-2 font-sans">
                    {galleryPreview[0].category}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-white">
                    {galleryPreview[0].title}
                  </h3>
                </div>
              </AnimatedImage>
            </AnimatedCard>

            {/* Item 2 */}
            <AnimatedCard index={1} className="relative group overflow-hidden rounded-lg md:col-span-2">
              <AnimatedImage className="h-[440px] w-full bg-neutral-900">
                <Image
                  src={galleryPreview[1].imageUrl}
                  alt={galleryPreview[1].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/70 block mb-2 font-sans">
                    {galleryPreview[1].category}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-white">
                    {galleryPreview[1].title}
                  </h3>
                </div>
              </AnimatedImage>
            </AnimatedCard>

            {/* Item 3 */}
            <AnimatedCard index={2} className="relative group overflow-hidden rounded-lg md:col-span-1 md:mt-10">
              <AnimatedImage className="h-[400px] w-full bg-neutral-900">
                <Image
                  src={galleryPreview[2].imageUrl}
                  alt={galleryPreview[2].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/70 block mb-2 font-sans">
                    {galleryPreview[2].category}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-white">
                    {galleryPreview[2].title}
                  </h3>
                </div>
              </AnimatedImage>
            </AnimatedCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-32 overflow-hidden bg-background border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-24">
            <span className="font-sans text-xs text-tertiary uppercase tracking-widest block mb-4 font-semibold">
              Voices of Ashwini
            </span>
            <AnimatedHeading
              text="What Our Clients Say"
              className="font-display text-4xl md:text-5xl mb-6 text-3d-acrylic"
            />
          </div>

          {/* Testimonial slider / marquee */}
          <div 
            className="relative flex w-full overflow-hidden pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div 
              ref={trackRef}
              className="flex whitespace-nowrap will-change-transform hide-scrollbar"
              onMouseEnter={() => (isHoveredRef.current = true)}
              onMouseLeave={() => (isHoveredRef.current = false)}
            >
              {/* Double items for infinite marquee */}
              <div className="flex gap-8 pr-8 shrink-0">
                {renderedTestimonials}
              </div>
              <div className="flex gap-8 pr-8 shrink-0">
                {renderedTestimonials}
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          <div className="max-w-2xl mx-auto glass-card p-8 md:p-12 mt-12 text-left">
            <h3 className="font-display text-2xl mb-6 text-white text-center">Share Your Experience</h3>
            {reviewSuccess ? (
              <div className="bg-primary/20 border border-primary/50 text-white p-4 rounded-xl text-center font-sans text-sm transition-all">
                Thank you for your review! It has been published successfully.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-white/70 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={reviewForm.author}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Your Name"
                    className="w-full premium-glass border border-white/20 focus:border-primary focus:shadow-[0_0_15px_rgba(240,140,174,0.4)] bg-transparent text-white placeholder-white/40 rounded-xl px-5 py-3 font-sans text-sm outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-white/70 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewForm(prev => ({ ...prev, stars: star }))}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star className={`w-6 h-6 ${star <= reviewForm.stars ? 'fill-rose-gold text-rose-gold' : 'text-white/20 transition-colors duration-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-white/70 mb-2">Review</label>
                  <textarea
                    required
                    value={reviewForm.quote}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, quote: e.target.value }))}
                    placeholder="Tell us about your experience..."
                    maxLength={300}
                    rows={4}
                    className="w-full premium-glass border border-white/20 focus:border-primary focus:shadow-[0_0_15px_rgba(240,140,174,0.4)] bg-transparent text-white placeholder-white/40 rounded-xl px-5 py-3 font-sans text-sm outline-none transition-all duration-300 resize-none"
                  />
                  <div className="text-right text-xs text-white/50 mt-1 font-sans">{reviewForm.quote.length}/300</div>
                </div>
                <SmokyButton
                  variant="primary"
                  type="submit"
                  className="w-full py-4 font-sans text-xs uppercase tracking-widest font-bold mt-2"
                >
                  Submit Review
                </SmokyButton>
              </form>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Newsletter / Circle Section */}
      <AnimatedSection className="relative py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-orb-primary rounded-full pointer-events-none" />
        <FloatingElement duration={7} yOffset={8}>
          <div
            className="max-w-4xl mx-auto glass-card p-8 md:p-20 text-center"
          >
            <span className="font-sans text-xs text-tertiary uppercase tracking-widest block mb-4 font-semibold">
              Stay Inspired
            </span>
            <AnimatedHeading
              text="Join the Ashwini Circle"
              className="font-display text-4xl md:text-5xl mb-6 text-3d-acrylic"
            />
            <p className="font-sans text-base md:text-lg text-white/70 mb-12 max-w-xl mx-auto leading-relaxed">
              Subscribe to receive exclusive salon offers, seasonal styling guides, and VIP invitations to private events.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto w-full relative"
              onSubmit={handleSubscribeSubmit}
            >
              <div className="flex-grow relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="Your Email Address"
                  className={`w-full premium-glass border ${emailError ? 'border-primary/80 shadow-[0_0_15px_rgba(240,140,174,0.4)]' : 'border-white/20 focus:border-primary focus:shadow-[0_0_25px_rgba(240,140,174,0.6)]'} bg-transparent text-white placeholder-white/60 rounded-full px-8 py-4 font-sans text-sm outline-none transition-all duration-500 z-10 relative`}
                />
                {emailError && (
                  <div className="absolute -bottom-6 left-6 text-[10px] text-primary uppercase tracking-wider font-bold">
                    {emailError}
                  </div>
                )}
                {subscribeSuccess && (
                  <div className="absolute -bottom-6 left-6 text-[10px] text-green-400 uppercase tracking-wider font-bold">
                    Redirecting to WhatsApp...
                  </div>
                )}
              </div>
              <SmokyButton
                variant="primary"
                type="submit"
                className="px-10 py-4 font-sans text-xs uppercase tracking-widest flex items-center justify-center gap-2 shrink-0"
              >
                <AnimatedIcon>
                  <Mail className="w-4 h-4" />
                </AnimatedIcon>
                Subscribe
              </SmokyButton>
            </form>
          </div>
        </FloatingElement>
      </AnimatedSection>
    </div>
  );
}
);

export default HomePage;
