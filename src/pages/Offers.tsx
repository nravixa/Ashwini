import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Image from "../components/Image";
import { Sparkles, Calendar, Gift, Tag, Crown, CheckCircle2 } from "lucide-react";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedCard from "@/components/animations/AnimatedCard";
import AnimatedButton from "@/components/animations/AnimatedButton";
import SmokyButton from "@/components/ui/SmokyButton";
import AnimatedIcon from "@/components/animations/AnimatedIcon";
import FloatingElement from "@/components/animations/FloatingElement";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import productRitualsImg from "@/components/images/Product_Rituals.jpg?optimized";
import { CURRENCY_SYMBOL } from "@/lib/currency";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const packages = [
  {
    id: "signature-ritual",
    title: "The Signature Ritual",
    price: "350",
    originalPrice: "400",
    savings: "50",
    discountPercentage: "12.5%",
    duration: "75 Min",
    category: "Hair Artistry",
    description: "Our comprehensive hair experience. Includes a Signature Dry-Cut, Artisan Balayage, and restorative botanical wash styling.",
    inclusions: [
      "Signature Precision Dry-Cut & Style",
      "Hand-painted Low-Ammonia Balayage",
      "Botanical Infusion wash & blowout",
      "Complimentary organic herbal beverage",
    ],
    serviceParam: "Signature Haircut",
  },
  {
    id: "bridal-wellness",
    title: "Bridal Wellness Suite",
    price: "450",
    originalPrice: "565",
    savings: "115",
    discountPercentage: "20.3%",
    duration: "90 Min",
    category: "Bridal Consultation",
    description: "The ultimate preparation suite for your big day. Combines full styling consultation, skincare treatments, and nails.",
    inclusions: [
      "Bridal styling consultation & trial",
      "The Glow Facial deep treatment",
      "Luxe Manicure hand ritual",
      "Exclusive private suite access",
    ],
    serviceParam: "Bridal Styling",
  },
  {
    id: "dermal-rejuvenation",
    title: "Dermal Rejuvenation Pack",
    price: "270",
    originalPrice: "355",
    savings: "85",
    discountPercentage: "23.9%",
    duration: "60 Min",
    category: "Dermal Therapy",
    description: "Complete skin renewal package utilizing therapeutic oxygen treatments and biological extract hydration.",
    inclusions: [
      "The Glow Facial (deep exfoliation)",
      "Pressurized Oxygen Infusion (vitamins)",
      "Collagen peptide skin boost treatment",
      "Take-home botanical hydration serum",
    ],
    serviceParam: "Hydrafacial Luxe",
  },
];

const membershipTier = {
  title: "Ashwini Circle Membership",
  tagline: "Privileged Access & VIP Treatment",
  benefits: [
    "15% discount on all standalone hair & dermal treatments",
    "Priority weekend scheduling and private suite access",
    "Complimentary birthday hair treatment & blowout",
    "Quarterly seasonal style guide & VIP event invitations",
  ],
};

const OffersPage = React.memo(function OffersPage() {
  const getPackageWhatsAppUrl = useCallback((pkg: typeof packages[0]) => {
    const servicesText = pkg.inclusions.map((inc) => `• ${inc}`).join("\n");
    const message = `Hello Ashwini Beauty & Salon Team,

I hope you're doing well.

I would like to enquire about your salon services. Please find my details below:

💬 Subject: Package Inquiry
📦 Package: ${pkg.title}
💰 Offer Price: ₹${pkg.price}
💸 Original Price: ₹${pkg.originalPrice}
🎁 Savings: ₹${pkg.savings}
📋 Included Services:
${servicesText}

I would appreciate it if you could get back to me at your earliest convenience with available appointment slots.

Thank you for your time.

Kind Regards,
Customer`;

    return getWhatsAppUrl(message);
  }, []);

  const renderedPackages = useMemo(() => (
    packages.map((pkg, idx) => (
      <AnimatedCard
        key={idx}
        index={idx}
        className="glass-card rounded-3xl border border-white/10 shadow-xl relative overflow-hidden group h-full"
        innerClassName="p-8 md:p-10 flex flex-col justify-between h-full w-full"
      >
        <div className="space-y-6 pt-2">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-primary/10 rounded-xl text-rose-gold shrink-0">
              <AnimatedIcon>
                <Sparkles className="w-5 h-5" />
              </AnimatedIcon>
            </span>
            <div>
              <h3 className="card-title transition-colors duration-300 group-hover:text-rose-gold">
                {pkg.title}
              </h3>
            </div>
          </div>

          <div className="flex items-baseline gap-3 border-b border-white/10 pb-6">
            <span className="card-price">
              {CURRENCY_SYMBOL}{pkg.price}
            </span>
            <span className="card-subtitle line-through opacity-70">
              {CURRENCY_SYMBOL}{pkg.originalPrice}
            </span>
            <span className="ml-auto card-label !text-rose-gold">
              Save {CURRENCY_SYMBOL}{pkg.savings}
            </span>
          </div>

          <p className="card-body">
            {pkg.description}
          </p>

          <div className="space-y-3 pt-2">
            <p className="card-label mb-2">
              Package Inclusions
            </p>
            <ul className="space-y-2.5">
              {pkg.inclusions.map((inc, i) => (
                <li key={i} className="flex items-center gap-3 card-body">
                  <AnimatedIcon>
                    <Tag className="w-4 h-4 text-rose-gold shrink-0" />
                  </AnimatedIcon>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 sm:gap-5 w-full items-stretch shrink-0">
          <Link to={`/book?package=true&id=${encodeURIComponent(pkg.id)}&title=${encodeURIComponent(pkg.title)}&price=${encodeURIComponent(pkg.price)}&originalPrice=${encodeURIComponent(pkg.originalPrice)}&savings=${encodeURIComponent(pkg.savings)}&discount=${encodeURIComponent(pkg.discountPercentage)}&duration=${encodeURIComponent(pkg.duration)}&category=${encodeURIComponent(pkg.category)}&inclusions=${encodeURIComponent(pkg.inclusions.join("|"))}&service=${encodeURIComponent(pkg.serviceParam)}`}
            className="flex-1"
          >
            <SmokyButton
              variant="primary"
              as="div"
              className="w-full h-12 rounded-xl font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-md !rounded-xl whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              Book
            </SmokyButton>
          </Link>
          <a
            href={getPackageWhatsAppUrl(pkg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <AnimatedButton
              variant="secondary"
              as="div"
              className="w-full h-12 rounded-xl font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-md !rounded-xl text-white/90 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              WhatsApp
            </AnimatedButton>
          </a>
        </div>
      </AnimatedCard>
    ))
  ), [getPackageWhatsAppUrl]);

  return (
    <main className="pb-16 md:pb-24 xl:pb-32 bg-background text-white relative overflow-hidden">
      <SEO 
        title="Exclusive Offers"
        description="Discover our premium seasonal packages and exclusive luxury treatments curated for our discerning clients."
        canonical="/offers"
      />
      {/* Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] glow-orb-secondary rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] glow-orb-primary rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] w-full flex items-center overflow-hidden bg-black mb-12 md:mb-16 xl:mb-24">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={productRitualsImg}
            alt="Premium products and tools at Ashwini Salon"
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
              Exclusive Privileges
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight tracking-tight">
              Offers Packages
            </h1>
            <p className="font-sans text-base md:text-xl text-white/90 max-w-xl leading-relaxed">
              Discover hand-crafted wellness bundles and seasonal promotions curated to deliver complete aesthetic transformation with extraordinary value.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-16 md:mb-24 xl:mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 content-auto contain-strict">
          {renderedPackages}
        </div>
      </section>

      {/* Membership Perks Section */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-16 md:mb-24 xl:mb-32 relative z-10">
        <AnimatedSection>
          <div className="glass-card p-10 md:p-16 rounded-3xl border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-primary/10 text-rose-gold rounded-xl">
                  <Crown className="w-6 h-6" />
                </span>
                <div>
                  <span className="font-sans text-xs text-rose-gold uppercase tracking-widest block font-semibold">
                    VIP Privileges
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">
                    {membershipTier.title}
                  </h2>
                </div>
              </div>

              <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed">
                Designed for clients who prioritize regular, uncompromised self-care. Become part of our inner circle for exclusive seasonal discounts and priority scheduling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {membershipTier.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-rose-gold shrink-0 mt-0.5" />
                    <span className="font-sans text-xs text-white/80 leading-normal">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 text-center lg:text-right">
              <div className="inline-block p-8 bg-white/5 rounded-2xl border border-white/10 text-center space-y-4 w-full">
                <span className="font-sans text-xs uppercase tracking-widest text-white/70 font-bold block">
                  Annual Circle Access
                </span>
                <div className="font-display text-4xl font-bold text-white">
                  {CURRENCY_SYMBOL}599 <span className="text-sm font-sans font-normal text-white/70">/ Year</span>
                </div>
                <p className="font-sans text-xs text-white/60 leading-relaxed">
                  Includes {CURRENCY_SYMBOL}800+ in complimentary treatments & annual voucher
                </p>
                <Link to="/contact" className="block pt-2">
                  <SmokyButton variant="primary" as="div" className="w-full py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold">
                    Inquire Membership
                  </SmokyButton>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Gift Vouchers Callout */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto relative z-10">
        <FloatingElement duration={8} yOffset={6}>
          <div className="glass-card p-10 md:p-16 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-12 rounded-3xl">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <AnimatedIcon>
                <Gift className="w-8 h-8 text-rose-gold" />
              </AnimatedIcon>
            </div>
            <div className="space-y-4 flex-grow text-center md:text-left">
              <AnimatedHeading
                text="Ashwini Beauty & Salon Gift Vouchers"
                as="h2"
                className="font-display text-2xl md:text-3xl font-medium text-white"
              />
              <p className="font-sans text-sm md:text-base text-white/70 max-w-xl leading-relaxed">
                Share the gift of absolute tranquility. We offer heavy-stock letterpress physical gift cards and instant electronic vouchers for any customization.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <Link to="/contact">
                <AnimatedButton variant="secondary" as="div" className="w-full md:w-auto px-10 py-5 rounded-xl font-sans text-xs uppercase tracking-widest font-bold border border-white/20">
                  Inquire Gift Cards
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </FloatingElement>
      </section>
    </main>
  );
});

export default OffersPage;
