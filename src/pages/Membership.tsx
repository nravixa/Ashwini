import SEO from "../components/SEO";
import Image from "../components/Image";
import { Sparkles, Calendar, Gift, Percent, Crown, CheckCircle2, ShoppingBag } from "lucide-react";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import AnimatedCard from "@/components/animations/AnimatedCard";
import SmokyButton from "@/components/ui/SmokyButton";
import FAQAccordion from "@/components/FAQAccordion";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import gallery2Img from "@/components/images/Gallery_2.jpg?optimized";

const plans = [
  {
    name: "Silver Membership",
    price: "₹99",
    billing: "Month",
    description: "Essential wellness and premium styling care for regular salon goers.",
    features: [
      "10% off all standalone hair, skin, and nail treatments",
      "Priority online scheduling with your preferred master stylist",
      "Complimentary styling consultation on every visit",
      "Annual ₹50 salon voucher towards premium products",
    ],
    whatsappMsg: `Hello Ashwini Beauty & Salon Team,

I hope you're doing well.

I would like to enquire about your salon services. Please find my details below:

💬 Subject: Silver Membership Inquiry

I am interested in joining the Silver Membership at Ashwini Salon. Could you please share the details?

I would appreciate it if you could get back to me at your earliest convenience.

Thank you for your time.

Kind Regards,
Customer`,
  },
  {
    name: "Gold Membership",
    price: "₹199",
    billing: "Month",
    description: "Expanded luxury privileges, complimentary monthly care, and birthday rewards.",
    features: [
      "15% off all standalone hair, skin, and nail treatments",
      "1 complimentary Signature Blow-out & Wash per month",
      "Priority scheduling with direct access to private suites",
      "Complimentary luxurious hair/skin treatment on your birthday month",
      "Special invites to seasonal style launch VIP events",
    ],
    whatsappMsg: `Hello Ashwini Beauty & Salon Team,

I hope you're doing well.

I would like to enquire about your salon services. Please find my details below:

💬 Subject: Gold Membership Inquiry

I am interested in joining the Gold Membership at Ashwini Salon. Could you please share the details?

I would appreciate it if you could get back to me at your earliest convenience.

Thank you for your time.

Kind Regards,
Customer`,
    popular: true,
  },
  {
    name: "Platinum Membership",
    price: "₹399",
    billing: "Month",
    description: "The ultimate salon sanctuary experience with unlimited styling and VIP services.",
    features: [
      "20% off all standalone hair, skin, and nail treatments",
      "Unlimited blow-outs & botanical wash rituals",
      "24/7 priority booking VIP hotline to master stylists",
      "Complimentary premium spa treatment + blowout on your birthday",
      "Quarterly VIP gift boxes containing imported haircare products",
      "Exclusive guest passes (2 per year) to treat friends/family",
    ],
    whatsappMsg: `Hello Ashwini Beauty & Salon Team,

I hope you're doing well.

I would like to enquire about your salon services. Please find my details below:

💬 Subject: Platinum Membership Inquiry

I am interested in joining the Platinum Membership at Ashwini Salon. Could you please share the details?

I would appreciate it if you could get back to me at your earliest convenience.

Thank you for your time.

Kind Regards,
Customer`,
  },
];

const benefitsList = [
  {
    title: "Priority Appointments",
    desc: "Skip the queue. Gain access to prime weekend slots and same-day booking reservations.",
    icon: Calendar,
  },
  {
    title: "Exclusive Discounts",
    desc: "Save up to 20% on all standalone hair artistry, nails, spa therapies, and cosmetics.",
    icon: Percent,
  },
  {
    title: "Complimentary Consultations",
    desc: "Receive bespoke style planning based on your hair density, waves, and skin undertones.",
    icon: Sparkles,
  },
  {
    title: "Birthday Rewards",
    desc: "Celebrate your special day with complimentary styling treatments, blowouts, and gifts.",
    icon: Gift,
  },
  {
    title: "VIP Suite Access",
    desc: "Prepare in quiet, glassmorphic private suites with complimentary organic beverages.",
    icon: Crown,
  },
  {
    title: "Premium Product Offers",
    desc: "Receive complimentary seasonal product vouchers and imported VIP gift packages.",
    icon: ShoppingBag,
  },
];

const faqData = [
  {
    question: "How do I activate my membership?",
    answer: "You can sign up online via our contact form, inquire directly on WhatsApp, or speak with our receptionist. Once subscribed, your benefits are active immediately and linked directly to your profile.",
  },
  {
    question: "Can I share my membership benefits with family?",
    answer: "Memberships are individual. However, Gold and Platinum members receive special guest passes that allow them to treat friends or family members to exclusive discounted services.",
  },
  {
    question: "Is there a long-term contract commitment?",
    answer: "No. Our monthly memberships are built on flexibility. You can pause or cancel your subscription at any time with a 14-day notice prior to your next billing cycle.",
  },
  {
    question: "How do I redeem my birthday reward?",
    answer: "Your birthday reward is loaded into your profile automatically on the first day of your birthday month. You can redeem it anytime during that month by styling your appointment.",
  },
];

export default function MembershipPage() {
  return (
    <main className="pb-16 md:pb-24 xl:pb-32 bg-background text-white relative overflow-hidden">
      <SEO 
        title="Membership"
        description="Join the Ashwini Salon membership program for exclusive benefits, complimentary treatments, and priority booking."
        canonical="/membership"
      />
      {/* Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] glow-orb-secondary rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] glow-orb-primary rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] w-full flex items-center overflow-hidden bg-black mb-12 md:mb-16 xl:mb-24">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={gallery2Img}
            alt="VIP experience at Ashwini Salon"
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
              The Ashwini Circle
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight tracking-tight">
              Bespoke Membership Plans
            </h1>
            <p className="font-sans text-base md:text-xl text-white/90 max-w-xl leading-relaxed">
              Enter a realm of continuous rejuvenation, priority access, and bespoke beauty treatments curated for our most valued guests.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Plans Grid */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-16 md:mb-24 xl:mb-32 relative z-10">
        <div className="text-center mb-12 md:mb-16 xl:mb-20">
          <span className="font-sans text-xs text-rose-gold uppercase tracking-widest block mb-4 font-semibold">
            Choose Your Tier
          </span>
          <AnimatedHeading
            text="Privileged Access Plans"
            as="h2"
            className="font-display text-3xl md:text-5xl font-medium text-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <AnimatedCard
              key={idx}
              index={idx}
              className={`glass-card rounded-3xl border h-full relative overflow-hidden group ${
                plan.popular 
                  ? "border-rose-gold/45 shadow-[0_15px_40px_-10px_rgba(240,140,174,0.15)] bg-white/[0.04]" 
                  : "border-white/10 shadow-xl"
              }`}
              innerClassName="p-6 sm:p-8 xl:p-10 flex flex-col h-full"
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-rose-gold text-white card-label !text-[10px] px-4 py-1.5 rounded-full shadow-md z-20">
                  Most Popular
                </div>
              )}
              
              <div className="space-y-6 pt-4">
                <div>
                  <h3 className="card-title group-hover:text-rose-gold transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <p className="card-body mt-2">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 border-b border-white/10 pb-6">
                  <span className="card-price">
                    {plan.price}
                  </span>
                  <span className="card-subtitle opacity-70">
                    / {plan.billing}
                  </span>
                </div>

                <div className="space-y-4 pt-2">
                  <p className="card-label mb-3">
                    Plan Privileges
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 card-body">
                        <CheckCircle2 className="w-5 h-5 text-rose-gold shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-auto">
                <a
                  href={getWhatsAppUrl(plan.whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <SmokyButton 
                    variant="primary" 
                    as="div" 
                    className="w-full py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    Join This Tier
                  </SmokyButton>
                </a>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-32 bg-luxury-gradient-alt border-y border-white/5 mb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] glow-orb-secondary rounded-full -translate-y-1/2 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-20">
            <span className="font-sans text-xs text-rose-gold uppercase tracking-[0.25em] block mb-4 font-semibold">
              Membership Advantages
            </span>
            <AnimatedHeading
              text="Why Join the Ashwini Circle"
              as="h2"
              className="font-display text-3xl md:text-5xl font-medium text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefitsList.map((b, index) => (
              <AnimatedCard
                key={index}
                index={index}
                className="glass-card p-8 border border-white/10 shadow-xl flex flex-col items-center text-center justify-between"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-full text-rose-gold">
                    <b.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-white">
                    {b.title}
                  </h3>
                  <p className="font-sans text-xs text-white/70 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32 relative z-10">
        <div className="text-center mb-16">
          <span className="font-sans text-xs text-rose-gold uppercase tracking-widest block mb-4 font-semibold">
            Got Questions?
          </span>
          <AnimatedHeading
            text="Membership FAQ"
            as="h2"
            className="font-display text-3xl md:text-5xl font-medium text-white"
          />
        </div>
        <FAQAccordion items={faqData} />
      </section>

      {/* CTA section */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto relative z-10">
        <div className="glass-card p-10 md:p-16 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 rounded-3xl">
          <div className="space-y-4 text-center md:text-left flex-grow">
            <span className="font-sans text-xs text-rose-gold uppercase tracking-widest block font-semibold">
              Begin Your Sanctuary Experience
            </span>
            <AnimatedHeading
              text="Become a Member Today"
              as="h2"
              className="font-display text-2xl md:text-4xl font-medium text-white"
            />
            <p className="font-sans text-sm md:text-base text-white/70 max-w-xl leading-relaxed">
              Have questions or want a custom corporate package? Connect with our dedicated VIP coordinator via WhatsApp.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <a
              href={getWhatsAppUrl(`Hello Ashwini Beauty & Salon Team,

I hope you're doing well.

I would like to enquire about your salon services. Please find my details below:

💬 Subject: General Membership Inquiry

I have some questions and would like to inquire about your custom corporate packages and salon memberships.

I would appreciate it if you could get back to me at your earliest convenience.

Thank you for your time.

Kind Regards,
Customer`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <SmokyButton variant="primary" as="div" className="w-full md:w-auto px-10 py-5 rounded-xl font-sans text-xs uppercase tracking-widest font-bold">
                Inquire on WhatsApp
              </SmokyButton>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
