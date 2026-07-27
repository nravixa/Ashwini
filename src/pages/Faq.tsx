import SEO from "../components/SEO";
import Image from "../components/Image";
import FAQAccordion from "@/components/FAQAccordion";
import { HelpCircle, Phone } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedButton from "@/components/animations/AnimatedButton";
import SmokyButton from "@/components/ui/SmokyButton";
import AnimatedIcon from "@/components/animations/AnimatedIcon";
import { WHATSAPP_LINK, PHONE_LINK, PHONE_DISPLAY } from "@/lib/whatsapp";
import gallery3Img from "@/components/images/Gallery_3.jpg?optimized";

const faqData = [
  {
    question: "What is your cancellation policy?",
    answer: "We require at least 24 hours notice for any cancellations or changes to your appointment. Cancellations made within 24 hours of the scheduled time will be subject to a cancellation fee equal to 50% of the scheduled service value.",
  },
  {
    question: "How do I choose the right stylist for my color?",
    answer: "Every stylist at Ashwini Beauty & Salon is trained in technical color and styling artistry. Julianne Rossi specializes in multi-dimensional bespoke balayage and corrections, while Marcus Thorne focuses on precision haircuts and editorial color. We offer complimentary consultations to match you with the best stylist.",
  },
  {
    question: "Do you use organic or clean beauty formulations?",
    answer: "Yes, we exclusively formulate and style using organic botanical extracts, plant-based essential oils, and zero-sulfate color agents. Our skincare line features pure hyaluronic acids, marine collagen peptides, and biocompatible nutrients to ensure absolute dermal health without harsh chemical ingredients.",
  },
  {
    question: "What is the difference between a standard highlight and Artisan Balayage?",
    answer: "Standard highlights use foil grids to isolate hair from roots to ends in structured patterns. Artisan Balayage is a custom, hand-painted technique where color is swept onto the hair surface to create soft, sun-kissed gradients that grow out naturally without a harsh root line.",
  },
  {
    question: "Do you offer private suites for bridal preparations?",
    answer: "Yes, our Kothrud location features a dedicated, glassmorphic Bridal Suite. It provides a quiet, private preparation environment with natural lighting, refreshments, and dedicated stylists for the bride and her wedding party.",
  },
  {
    question: "Is parking available at the salon?",
    answer: "Yes, we provide convenient parking options for all our guests including a Free parking garage, Free parking lot, Free street parking, and direct On-site parking.",
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <main className="pb-16 md:pb-24 xl:pb-32 bg-background text-white relative overflow-hidden">
      <SEO 
        title="FAQ"
        description="Frequently asked questions about Ashwini Salon services, policies, and premium treatments."
        canonical="/faq"
        structuredData={faqSchema}
      />
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] glow-orb-secondary rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] glow-orb-primary rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] w-full flex items-center overflow-hidden bg-black mb-12 md:mb-16 xl:mb-24">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={gallery3Img}
            alt="Customer service experience at Ashwini Salon"
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
              Information Hub
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight tracking-tight">
              Frequently Asked
            </h1>
            <p className="font-sans text-base md:text-xl text-white/90 max-w-xl leading-relaxed">
              Find quick answers on booking, cancellation rules, luxury treatment details, and salon formulations.
            </p>
          </div>
        </div>
      </section>

      {/* Accordions */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-12 md:mb-16 xl:mb-24 relative z-10">
        <FAQAccordion items={faqData} />
      </section>

      {/* Help Banner */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto relative z-10">
        <AnimatedSection>
          <div className="glass-card p-6 sm:p-10 md:p-16 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl">
            <div className="flex gap-6 items-center flex-col md:flex-row text-center md:text-left">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <AnimatedIcon>
                  <HelpCircle className="w-7 h-7 text-rose-gold" />
                </AnimatedIcon>
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium text-white">Still have questions?</h3>
                <p className="font-sans text-sm text-white/70 mt-1 leading-relaxed">
                  Our contact team is here to assist with any special requests or formulations.
                </p>
              </div>
            </div>
            <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <a
                href={PHONE_LINK}
                className="flex-grow md:flex-none"
              >
                <AnimatedButton variant="secondary" className="w-full md:w-auto border border-white/20 text-white px-8 py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-rose-gold" />
                  <span>Call ({PHONE_DISPLAY})</span>
                </AnimatedButton>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow md:flex-none"
              >
                <SmokyButton variant="primary" className="w-full md:w-auto px-8 py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                  WhatsApp Contact
                </SmokyButton>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
