import React, { useState } from "react";
import SEO from "../components/SEO";
import Image from "../components/Image";
import { Mail, Phone, MapPin, Clock, MessageCircle, ExternalLink, Loader2 } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_LINK, PHONE_DISPLAY, PHONE_LINK, EMAIL_ADDRESS, EMAIL_LINK } from "@/lib/whatsapp";


import SmokyButton from "@/components/ui/SmokyButton";
import AnimatedIcon from "@/components/animations/AnimatedIcon";
import gallery4Img from "@/components/images/Gallery_4.jpg?optimized";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";

const serviceOptions = [
  "General Inquiry",
  "Hair Artistry",
  "Dermal Therapy",
  "Nail Couture",
  "Luxury Makeup",
  "Holistic Spa",
  "Bridal Consultation",
];

const timeSlots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

const MapComponent = React.lazy(() => import("@/registry/map").then(m => ({ default: m.Map })));
const MapMarkerComponent = React.lazy(() => import("@/registry/map").then(m => ({ default: m.MapMarker })));
const MarkerContentComponent = React.lazy(() => import("@/registry/map").then(m => ({ default: m.MarkerContent })));
const MapPopupComponent = React.lazy(() => import("@/registry/map").then(m => ({ default: m.MapPopup })));

export default function ContactPage() {
  const [mapInView, setMapInView] = useState(false);
  const mapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "General Inquiry",
    date: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD
    time: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const key = e.target.name;
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
    // Clear field error on change
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.date.trim()) {
      newErrors.date = "Please select a preferred date.";
    }

    if (!formData.time.trim()) {
      newErrors.time = "Please select a preferred time.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your inquiry message.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formattedDate = new Date(formData.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const details = [
      formData.name.trim() ? `👤 Name: ${formData.name.trim()}` : null,
      formData.phone.trim() ? `📞 Phone: ${formData.phone.trim()}` : null,
      formData.service ? `💇 Service: ${formData.service}` : null,
      formData.date ? `📅 Date: ${formattedDate}` : null,
      formData.time ? `🕒 Time: ${formData.time}` : null,
      formData.message.trim() ? `📝 Message:\n${formData.message.trim()}` : null,
    ].filter(Boolean).join("\n");

    const whatsappText = `Hello Ashwini Beauty & Salon Team,

I hope you're doing well.

I would like to enquire about your salon services. Please find my details below:

${details}

I would appreciate it if you could get back to me at your earliest convenience.

Thank you for your time, and I look forward to hearing from you.

Kind Regards,
${formData.name.trim() || "Customer"}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappText
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, "_blank");
    }, 600);
  };

  return (
    <main className="pb-32 bg-background text-white relative overflow-hidden">
      <SEO 
        title="Contact Us"
        description="Get in touch with Ashwini Salon. Find our location, hours of operation, and contact details to schedule your next premium salon experience."
        canonical="/contact"
      />
      {/* Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] glow-orb-secondary rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] glow-orb-primary rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] w-full flex items-center overflow-hidden bg-black mb-24">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={gallery4Img}
            alt="Customer service desk at Ashwini Salon"
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
              Get In Touch
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight tracking-tight">
              Contact Us
            </h1>
            <p className="font-sans text-base md:text-xl text-white/90 max-w-xl leading-relaxed">
              Contact our Pune studio for booking inquiries, customized VIP services, or bespoke beauty consultations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* Info Columns */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white">
              Studio Details
            </h2>
            <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed">
              We welcome walk-in consultations based on availability, but strongly encourage reserving appointments in advance.
            </p>
          </div>

          <div className="space-y-6">
            {/* Location */}
            <div className="flex gap-4">
              <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl shrink-0 text-rose-gold flex items-center justify-center">
                <AnimatedIcon>
                  <MapPin className="w-5 h-5" />
                </AnimatedIcon>
              </div>
              <div className="space-y-1">
                <h4 className="card-label !text-white/70 mb-1">Address</h4>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Shop+no+10,+Dodke+Plazzo,+near+Wander+Futura,+Pramathesh+Housing+Society,+Mahatma+Society,+Kothrud,+Pune,+Maharashtra+411038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-body !text-white hover:!text-rose-gold transition-colors duration-300 block"
                >
                  Shop no 10, Dodke Plazzo, near Wander Futura, Kothrud, Pune, Maharashtra 411038
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl shrink-0 text-rose-gold flex items-center justify-center">
                <AnimatedIcon>
                  <Phone className="w-5 h-5" />
                </AnimatedIcon>
              </div>
              <div className="space-y-1">
                <h4 className="card-label !text-white/70 mb-1">Phone</h4>
                <a
                  href={PHONE_LINK}
                  className="card-body !text-white hover:!text-rose-gold transition-colors duration-300 block"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* WhatsApp Contact */}
            <div className="flex gap-4">
              <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl shrink-0 text-rose-gold flex items-center justify-center">
                <AnimatedIcon>
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                </AnimatedIcon>
              </div>
              <div className="space-y-1">
                <h4 className="card-label !text-white/70 mb-1">WhatsApp Contact</h4>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-body !text-white hover:!text-[#25D366] transition-colors duration-300 block"
                >
                  Chat on WhatsApp ({PHONE_DISPLAY})
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl shrink-0 text-rose-gold flex items-center justify-center">
                <AnimatedIcon>
                  <Mail className="w-5 h-5" />
                </AnimatedIcon>
              </div>
              <div className="space-y-1">
                <h4 className="card-label !text-white/70 mb-1">Email</h4>
                <a
                  href={EMAIL_LINK}
                  className="card-body !text-white hover:!text-rose-gold transition-colors duration-300 block"
                >
                  {EMAIL_ADDRESS}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl shrink-0 text-rose-gold flex items-center justify-center">
                <AnimatedIcon>
                  <Clock className="w-5 h-5" />
                </AnimatedIcon>
              </div>
              <div className="space-y-1">
                <h4 className="card-label !text-white/70 mb-1">Studio Hours</h4>
                <div className="card-body !text-white/80">
                  <p>Monday - Sunday: 10:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form Column (WhatsApp Redirection) */}
        <div className="lg:col-span-7">
          <div className="glass-card p-8 md:p-12 border border-white/10 shadow-2xl rounded-3xl bg-white/[0.02] backdrop-blur-xl">
            <div className="mb-8">
              <h3 className="card-title text-white mb-2">
                Send an Inquiry
              </h3>
              <p className="card-body">
                Submit your inquiry below to instantly connect with our WhatsApp team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <FormInput
                  label="Full Name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Elena Gilbert"
                  error={errors.name}
                />

                {/* Phone Number */}
                <FormInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 97307 03886"
                  error={errors.phone}
                />
              </div>

              {/* Service Select */}
              <FormSelect
                label="Service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                options={serviceOptions.map((opt) => ({
                  value: opt,
                  label: opt,
                }))}
              />

              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preferred Date */}
                <FormInput
                  label="Preferred Date"
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  error={errors.date}
                  className="cursor-pointer [color-scheme:dark]"
                />

                {/* Preferred Time */}
                <FormSelect
                  label="Time Slot"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  options={timeSlots.map((time) => ({
                    value: time,
                    label: time,
                  }))}
                  placeholder="Choose a Time"
                  error={errors.time}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs uppercase tracking-widest text-white/70 font-semibold">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your desired service or specific questions..."
                  className={`bg-white/5 border ${
                    errors.message ? "border-red-500" : "border-white/10 focus:border-rose-gold focus:shadow-[0_0_15px_rgba(240,140,174,0.3)]"
                  } outline-none p-4 rounded-xl font-sans text-sm text-white placeholder-white/30 transition-all duration-300 w-full`}
                />
                {errors.message && (
                  <span className="text-xs text-red-500 font-sans">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <SmokyButton
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Formatting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4.5 h-4.5 fill-current" />
                      <span>Send Inquiry on WhatsApp</span>
                    </>
                  )}
                </SmokyButton>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Embedded Google Map Section */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto relative z-10">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-sans text-xs text-white/70 uppercase tracking-widest block mb-2 font-bold">
                Interactive Map
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-white">
                Visit Ashwini Salon
              </h3>
            </div>
            <a
              href="https://maps.app.goo.gl/E9bVYJWumFyUvrwW7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-rose-gold hover:text-white transition-colors"
            >
              <span>Get Directions in Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div
            ref={mapRef}
            className="relative block w-full h-[350px] sm:h-[450px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0814] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(240,140,174,0.15)]"
          >
            {mapInView ? (
              <React.Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-white/50 font-sans text-xs">
                    <Loader2 className="w-5 h-5 animate-spin mr-2 text-rose-gold" />
                    <span>Loading Premium Map...</span>
                  </div>
                }
              >
                <MapComponent
                  center={[73.7897774, 18.4978166]}
                  zoom={15}
                  theme="dark"
                  dragRotate={false}
                  pitchWithRotate={false}
                  maxPitch={0}
                  className="w-full h-full"
                >
                  <MapMarkerComponent
                    longitude={73.7897774}
                    latitude={18.4978166}
                    onClick={() => window.open("https://maps.app.goo.gl/E9bVYJWumFyUvrwW7", "_blank", "noopener,noreferrer")}
                  >
                    <MarkerContentComponent>
                      <div className="relative group flex items-center justify-center cursor-pointer">
                        {/* Outer glowing ripple ring */}
                        <span className="absolute inline-flex h-8 w-8 rounded-full bg-[#F08CAE]/30 animate-ping opacity-75"></span>
                        
                        {/* Inner glowing pulse ring */}
                        <span className="absolute inline-flex h-6 w-6 rounded-full bg-[#F08CAE]/20 animate-pulse"></span>
                        
                        {/* Solid center dot */}
                        <div className="relative h-4.5 w-4.5 rounded-full border-2 border-white bg-[#F08CAE] shadow-lg transition-transform duration-300 group-hover:scale-125 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        </div>
                      </div>
                    </MarkerContentComponent>
                  </MapMarkerComponent>
                  
                  <MapPopupComponent
                    longitude={73.7897774}
                    latitude={18.4978166}
                    closeButton={false}
                    offset={25}
                    className="glass-card border border-white/10 p-5 rounded-2xl shadow-xl bg-background/80 backdrop-blur-md max-w-[280px]"
                  >
                    <div className="space-y-3 text-white">
                      <div className="border-b border-white/10 pb-2">
                        <h4 className="font-display text-lg font-bold tracking-wide text-rose-gold">Ashwini Salon</h4>
                        <p className="font-sans text-[10px] text-white/50 uppercase tracking-wider font-semibold">Premium Beauty & Salon</p>
                      </div>
                      
                      <div className="space-y-1.5 font-sans text-xs">
                        <p className="flex items-start gap-1.5 text-white/90">
                          <span className="shrink-0 mt-0.5">📍</span>
                          <span>Kothrud, Pune</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-white/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1ebd59] animate-pulse mr-1" />
                          <span>Open Daily: 10:00 AM – 8:00 PM</span>
                        </p>
                      </div>

                      <a
                        href="https://maps.app.goo.gl/E9bVYJWumFyUvrwW7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-rose-gold hover:text-white transition-colors mt-2"
                      >
                        <span>Get Directions</span>
                        <span>→</span>
                      </a>
                    </div>
                  </MapPopupComponent>
                </MapComponent>
              </React.Suspense>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/50 font-sans text-xs">
                <Loader2 className="w-5 h-5 animate-spin mr-2 text-rose-gold" />
                <span>Loading Premium Map...</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
