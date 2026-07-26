
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Image from "../components/Image";
import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

import AnimatedSection from "@/components/animations/AnimatedSection";

import SmokyButton from "@/components/ui/SmokyButton";
import AnimatedIcon from "@/components/animations/AnimatedIcon";
import privacyImg from "@/components/images/Privacy.jpg?optimized";

export default function PrivacyPage() {
  return (
    <main className="pb-32 bg-background text-white">
      <SEO
        title="Privacy Policy"
        description="Learn how Elixir Luxury Salon protects your data and privacy. Review our detailed privacy policy and data handling practices."
        canonical="/privacy"
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] w-full flex items-center overflow-hidden bg-black mb-24">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={privacyImg}
            alt="Privacy Policy Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto w-full pt-[clamp(6.5rem,12vh,8rem)]">
          <div className="max-w-3xl">
            <span className="font-sans text-2xl md:text-4xl text-white/90 max-w-xl leading-relaxed">At Ashwini Beauty & Salon, we hold your personal privacy and client confidentiality to the highest standard of luxury care.</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <AnimatedSection className="px-6 md:px-16 max-w-[1200px] mx-auto space-y-16">
        {/* Key Guarantees Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl border border-white/60 shadow-sm space-y-3">
            <AnimatedIcon>
              <Shield className="w-6 h-6 text-primary" />
            </AnimatedIcon>
            <h3 className="font-display text-lg font-semibold text-primary">Confidential Care</h3>
            <p className="font-sans text-xs text-secondary leading-relaxed">
              Your consultations, treatment records, and personal preferences remain strictly private within our studio.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/60 shadow-sm space-y-3">
            <AnimatedIcon>
              <Lock className="w-6 h-6 text-primary" />
            </AnimatedIcon>
            <h3 className="font-display text-lg font-semibold text-primary">Secure Systems</h3>
            <p className="font-sans text-xs text-secondary leading-relaxed">
              All digital appointment records and payment processing utilize enterprise-grade encryption protocol.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/60 shadow-sm space-y-3">
            <AnimatedIcon>
              <Eye className="w-6 h-6 text-primary" />
            </AnimatedIcon>
            <h3 className="font-display text-lg font-semibold text-primary">Zero Third-Party Sharing</h3>
            <p className="font-sans text-xs text-secondary leading-relaxed">
              We never sell, rent, or distribute client personal details to third-party advertisers or brokers.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="glass-card p-8 md:p-14 rounded-2xl border border-white/60 shadow-md space-y-12">
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-primary flex items-center gap-3">
              <span className="font-sans text-xs text-rose-gold border border-rose-gold/40 px-2.5 py-1 rounded-full font-mono">01</span>
              Information We Collect
            </h2>
            <p className="font-sans text-sm text-secondary leading-relaxed">
              When you schedule a consultation or visit Ashwini Beauty & Salon in Kothrud, Pune, we collect personal information necessary to deliver tailored beauty and wellness services. This may include:
            </p>
            <ul className="space-y-2 font-sans text-sm text-secondary pt-2 pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Full Name, Contact Number, and Email Address for booking confirmations and concierge updates.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Hair and skin diagnostic records, allergy alerts, and customized formulation history.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Transaction details and preferred scheduling times.</span>
              </li>
            </ul>
          </div>

          <hr className="border-outline-variant/10" />

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-primary flex items-center gap-3">
              <span className="font-sans text-xs text-rose-gold border border-rose-gold/40 px-2.5 py-1 rounded-full font-mono">02</span>
              How We Use Your Information
            </h2>
            <p className="font-sans text-sm text-secondary leading-relaxed">
              Your details are exclusively used to elevate your studio experience and streamline concierge interactions. Specifically:
            </p>
            <ul className="space-y-2 font-sans text-sm text-secondary pt-2 pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Managing appointment schedules and sending automated SMS or WhatsApp reminders.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Tailoring organic formulations and hair care rituals to your individual profile.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Sharing exclusive invitations to private salon events, seasonal offers, and VIP passes (only upon opt-in).</span>
              </li>
            </ul>
          </div>

          <hr className="border-outline-variant/10" />

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-primary flex items-center gap-3">
              <span className="font-sans text-xs text-rose-gold border border-rose-gold/40 px-2.5 py-1 rounded-full font-mono">03</span>
              Cookie Policy & Web Analytics
            </h2>
            <p className="font-sans text-sm text-secondary leading-relaxed">
              Our website uses essential performance cookies to ensure seamless navigation, optimize loading times, and evaluate anonymous visitor interaction statistics. You can adjust your browser settings to decline cookies at any time without impacting essential site features.
            </p>
          </div>

          <hr className="border-outline-variant/10" />

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-primary flex items-center gap-3">
              <span className="font-sans text-xs text-rose-gold border border-rose-gold/40 px-2.5 py-1 rounded-full font-mono">04</span>
              Your Data Rights & Concierge Support
            </h2>
            <p className="font-sans text-sm text-secondary leading-relaxed">
              You retain full control over your personal data. You may request to review, modify, or permanently delete your client history or opt out of promotional communications at any time by contacting our concierge team.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <SmokyButton variant="primary" as="div" className="px-8 py-3.5 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Contact Privacy Team
                </SmokyButton>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
