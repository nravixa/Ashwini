import SEO from "../components/SEO";
import Image from "../components/Image";
import { Link } from "react-router-dom";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedCard from "@/components/animations/AnimatedCard";

import SmokyButton from "@/components/ui/SmokyButton";
import AnimatedImage from "@/components/animations/AnimatedImage";
import aboutImg from "@/components/images/about.jpg?optimized";
import about2Img from "@/components/images/about_2.jpg?optimized";

const values = [
  {
    title: "Master Craftsmanship",
    desc: "Our practitioners are elite artisans trained in advanced technical cuts, biological dermal therapies, and bespoke color styling.",
  },
  {
    title: "Tranquil Luxury",
    desc: "We prioritize silence, breathing room, and minimalist interiors over high client density, ensuring your time is truly yours.",
  },
  {
    title: "Eco-Conscious Premium",
    desc: "We exclusively formulate and style using botanical extracts, organic essential oils, and zero-sulfate color agents.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background text-white">
      <SEO 
        title="About Us"
        description="Discover the story behind Ashwini Salon. We blend master craftsmanship with tranquil luxury to redefine elegance."
        canonical="/about"
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] w-full flex items-center overflow-hidden bg-black mb-24">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={aboutImg}
            alt="About Ashwini Salon"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto w-full pt-[clamp(6.5rem,12vh,8rem)]">
          <div className="max-w-3xl">
            <span className="font-sans text-xs text-rose-gold uppercase tracking-[0.3em] block mb-4 font-semibold">
              The Sanctuary
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight tracking-tight">
              Elegance Crafted by Hand
            </h1>
            <p className="font-sans text-base md:text-xl text-white/90 max-w-xl leading-relaxed">
              Located in Kothrud, Pune, Ashwini Beauty & Salon was built as an antidote to noisy, over-scheduled salons.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Image Split */}
      <AnimatedSection className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6">
            <AnimatedImage className="h-[500px] relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={about2Img}
                alt="Bespoke luxury workspace at Ashwini Salon"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </AnimatedImage>
          </div>
          <div className="lg:col-span-6 space-y-8">
            <span className="font-sans text-xs text-rose-gold uppercase tracking-widest block font-semibold">
              Our Vision
            </span>
            <AnimatedHeading
              text="Where Detail Becomes Art"
              as="h2"
              className="font-display text-3xl md:text-4xl font-medium text-white"
            />
            <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed">
              We believe that genuine beauty lies in the tension between organic texture and high-fashion structure. Our stylists do not copy trends; they build bespoke solutions based on your hair density, natural wave patterns, and skin tone values.
            </p>
            <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed">
              Each styling suite features custom-crafted glass partitions to allow ambient sun exposure while preserving your personal peace. At Ashwini Beauty & Salon, luxury is not a finish—it is our absolute standard of care.
            </p>
            <div className="pt-4 flex justify-center lg:justify-start">
              <Link to="/book" className="w-[85%] max-w-[290px] sm:w-auto flex justify-center">
                <SmokyButton variant="primary" as="div" className="w-full">
                  Schedule a Consultation
                </SmokyButton>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Core Values */}
      <AnimatedSection className="relative py-24 md:py-32 bg-luxury-gradient-alt border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] glow-orb-secondary rounded-full -translate-y-1/2 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-20">
            <span className="font-sans text-xs text-rose-gold uppercase tracking-[0.25em] block mb-4 font-semibold">
              Our Creed
            </span>
            <AnimatedHeading
              text="The Ashwini Salon Experience"
              as="h2"
              className="font-display text-3xl md:text-5xl font-medium text-white"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, index) => (
              <AnimatedCard
                key={index}
                index={index}
                className="glass-card p-10 border border-white/10 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="card-title mb-4 !text-rose-gold">
                    {val.title}
                  </h3>
                  <p className="card-body">
                    {val.desc}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
