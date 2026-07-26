
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Image from "../components/Image";
import { Clock, CalendarCheck, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

import AnimatedSection from "@/components/animations/AnimatedSection";

import SmokyButton from "@/components/ui/SmokyButton";
import AnimatedIcon from "@/components/animations/AnimatedIcon";
import termsImg from "@/components/images/Terms.jpg?optimized";

export default function TermsPage() {
  return (
    <main className="pb-32 bg-background text-white">
      <SEO
        title="Terms & Conditions"
        description="Read the terms and conditions for Ashwini Salon regarding appointments, cancellations, and service guarantees."
        canonical="/terms"
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] w-full flex items-center overflow-hidden bg-black mb-24">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={termsImg}
            alt="Terms of Service Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto w-full pt-[clamp(6.5rem,12vh,8rem)]">
          <div className="max-w-3xl">
            <span className="font-sans text-2xl md:text-4xl text-white/90 max-w-xl leading-relaxed">Welcome to Ashwini Beauty & Salon. Please review our studio policies designed to protect client tranquility, service precision, and scheduling commitments.</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <AnimatedSection className="px-6 md:px-16 max-w-[1200px] mx-auto space-y-16">
        {/* Core Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl border border-white/60 shadow-sm space-y-3">
            <AnimatedIcon>
              <CalendarCheck className="w-6 h-6 text-primary" />
            </AnimatedIcon>
            <h3 className="font-display text-lg font-semibold text-primary">48-Hour Scheduling</h3>
            <p className="font-sans text-xs text-secondary leading-relaxed">
              We recommend reserving consultations and major color transformations at least 48 hours in advance.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/60 shadow-sm space-y-3">
            <AnimatedIcon>
              <Clock className="w-6 h-6 text-primary" />
            </AnimatedIcon>
            <h3 className="font-display text-lg font-semibold text-primary">Punctuality Policy</h3>
            <p className="font-sans text-xs text-secondary leading-relaxed">
              To guarantee individual attention without rushing, please arrive 10 minutes prior to your reserved time slot.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/60 shadow-sm space-y-3">
            <AnimatedIcon>
              <Sparkles className="w-6 h-6 text-primary" />
            </AnimatedIcon>
            <h3 className="font-display text-lg font-semibold text-primary">Tranquil Sanctuary</h3>
            <p className="font-sans text-xs text-secondary leading-relaxed">
              Our studio maintains a serene, low-noise environment for the absolute relaxation of all guests.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="glass-card p-8 md:p-14 rounded-2xl border border-white/60 shadow-md space-y-12">
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-primary flex items-center gap-3">
              <span className="font-sans text-xs text-rose-gold border border-rose-gold/40 px-2.5 py-1 rounded-full font-mono">01</span>
              Appointment Reservations & Cancellations
            </h2>
            <p className="font-sans text-sm text-secondary leading-relaxed">
              Because our master stylists and estheticians reserve dedicated hours exclusively for each appointment:
            </p>
            <ul className="space-y-2 font-sans text-sm text-secondary pt-2 pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Cancellations or rescheduling requests must be submitted at least 24 hours prior to your appointment time.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Late cancellations or unexcused no-shows may incur a booking adjustment fee on subsequent appointments.</span>
              </li>
            </ul>
          </div>

          <hr className="border-outline-variant/10" />

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-primary flex items-center gap-3">
              <span className="font-sans text-xs text-rose-gold border border-rose-gold/40 px-2.5 py-1 rounded-full font-mono">02</span>
              Consultations & Service Modifications
            </h2>
            <p className="font-sans text-sm text-secondary leading-relaxed">
              Prior to color treatments, balayages, chemical smoothing, or dermal therapies, a diagnostic consultation is performed. If structural hair integrity or skin sensitivities require adjusting a service, our artisans will recommend suitable alternative treatments.
            </p>
          </div>

          <hr className="border-outline-variant/10" />

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-primary flex items-center gap-3">
              <span className="font-sans text-xs text-rose-gold border border-rose-gold/40 px-2.5 py-1 rounded-full font-mono">03</span>
              Pricing, Packages & Payments
            </h2>
            <p className="font-sans text-sm text-secondary leading-relaxed">
              All prices listed on our website are subject to consultation confirmation based on hair length, density, and treatment complexity. Payment is due upon completion of services. Promotional packages and gift vouchers must be redeemed prior to their expiration date.
            </p>
          </div>

          <hr className="border-outline-variant/10" />

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-primary flex items-center gap-3">
              <span className="font-sans text-xs text-rose-gold border border-rose-gold/40 px-2.5 py-1 rounded-full font-mono">04</span>
              Questions & Concierge Support
            </h2>
            <p className="font-sans text-sm text-secondary leading-relaxed">
              If you have any questions regarding our terms or require assistance with custom group/bridal bookings, please contact our team.
            </p>
            <div className="pt-4">
              <Link to="/book">
                <SmokyButton variant="primary" as="div" className="px-8 py-3.5 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Reserve an Appointment
                </SmokyButton>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
