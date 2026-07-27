import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import Image from "../components/Image";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { CURRENCY_SYMBOL } from "@/lib/currency";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import AnimatedSection from "@/components/animations/AnimatedSection";

import SmokyButton from "@/components/ui/SmokyButton";
import AnimatedIcon from "@/components/animations/AnimatedIcon";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import { useCart } from "@/context/CartContext";
import sanctuaryImg from "@/components/images/Sanctuary.jpg?optimized";

const fallbackServices = [
  { name: "Signature Haircut", price: 120, duration: "75 Min" },
  { name: "Balayage & Toning", price: 280, duration: "180 Min" },
  { name: "Hydrafacial Luxe", price: 190, duration: "60 Min" },
  { name: "Bridal Styling", price: 350, duration: "90 Min" },
];

const timeSlots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

function BookingFormContent() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") || "";

  const { items: cartItems, removeFromCart, updateQuantity, totalPrice: cartTotalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: initialService,
    date: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD
    time: "",
  });

  const [selectedServiceObj, setSelectedServiceObj] = useState<typeof fallbackServices[0] | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    id: string;
    title: string;
    price: number;
    originalPrice: number;
    savings: number;
    discount: string;
    duration: string;
    category: string;
    inclusions: string[];
  } | null>(null);

  useEffect(() => {
    const isPackage = searchParams.get("package") === "true";
    if (isPackage) {
      const id = searchParams.get("id") || "";
      const title = searchParams.get("title") || "";
      const price = parseFloat(searchParams.get("price") || "0");
      const originalPrice = parseFloat(searchParams.get("originalPrice") || "0");
      const savings = parseFloat(searchParams.get("savings") || "0");
      const discount = searchParams.get("discount") || "";
      const duration = searchParams.get("duration") || "";
      const category = searchParams.get("category") || "";
      const inclusionsStr = searchParams.get("inclusions") || "";
      const inclusions = inclusionsStr ? inclusionsStr.split("|") : [];

      setSelectedPackage({
        id,
        title,
        price,
        originalPrice,
        savings,
        discount,
        duration,
        category,
        inclusions,
      });

      setFormData((prev) => ({
        ...prev,
        service: title,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (cartItems.length === 0 && formData.service && !selectedPackage) {
      const s = fallbackServices.find((srv) => srv.name === formData.service);
      setSelectedServiceObj(s || null);
    }
  }, [formData.service, cartItems, selectedPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.date || !formData.time) {
      alert("Please fill in all required fields (Name, Phone, Date, Time).");
      return;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert("Please select a future date.");
      return;
    }

    const dateText = getFormattedDate();
    const timeText = formData.time;

    let servicesText = "";
    let totalServicesCount = 0;

    if (hasCartItems) {
      servicesText = cartItems.map((item) => {
        const itemPrice = typeof item.price === "number" ? item.price : parseFloat(item.price as string) || 0;
        const itemQty = item.quantity || 1;
        const suffix = itemQty > 1 ? ` (${itemQty} People)` : "";
        return `• ${item.title}${suffix} — ${CURRENCY_SYMBOL}${(itemPrice * itemQty).toFixed(2)}`;
      }).join("\n");
      totalServicesCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
    } else if (selectedPackage) {
      servicesText = `• ${selectedPackage.title} — ${CURRENCY_SYMBOL}${selectedPackage.price}\n` + selectedPackage.inclusions.map((inc) => `  - ${inc}`).join("\n");
      totalServicesCount = 1;
    } else {
      servicesText = `• ${formData.service || "Standard Consultation"} — TBD`;
      totalServicesCount = 1;
    }

    const details = [
      formData.name.trim() ? `👤 Name: ${formData.name.trim()}` : null,
      formData.phone.trim() ? `📞 Phone: ${formData.phone.trim()}` : null,
      `💬 Subject: Booking Confirmation`,
      `📅 Date: ${dateText}`,
      `🕒 Time: ${timeText}`,
      `💇 Selected Services:\n${servicesText}`,
      `💰 Total Services: ${totalServicesCount}`,
      `💳 Estimated Total: ${CURRENCY_SYMBOL}${total.toFixed(2)}`,
    ].filter(Boolean).join("\n");

    const message = `Hello Ashwini Beauty & Salon Team,

I hope you're doing well.

I would like to confirm my salon booking. Please find my details below:

${details}

I would appreciate it if you could confirm my appointment at your earliest convenience.

Thank you for your time, and I look forward to hearing from you.

Kind Regards,
${formData.name.trim() || "Customer"}`;

    const whatsappUrl = getWhatsAppUrl(message);
    
    try {
      const newWindow = window.open(whatsappUrl, "_blank");
      if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
        alert("We couldn't open WhatsApp automatically. Please disable your pop-up blocker or check your connection and try again.");
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      alert("An error occurred while trying to open WhatsApp. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const key = e.target.name as keyof typeof formData;
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const getFormattedDate = () => {
    if (!formData.date) return "TBD";
    const dateObj = new Date(formData.date);
    return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const hasCartItems = cartItems.length > 0;
  const subtotal = hasCartItems
    ? cartTotalPrice
    : selectedPackage
      ? selectedPackage.price
      : selectedServiceObj
        ? selectedServiceObj.price
        : 0;
  const bookingFee = subtotal > 0 ? 15 : 0;
  const total = subtotal + bookingFee;

  return (
    <div className="px-6 md:px-16 max-w-[1440px] mx-auto flex justify-center items-start relative z-10">
      <SEO
        title="Book Appointment"
        description="Reserve your session at Ashwini Salon. Book hair styling, coloring, skin rituals, and bridal services online."
        canonical="/book"
      />
      {/* Booking Form Section */}
      <AnimatedSection className="w-full max-w-[650px] space-y-6 sm:space-y-8 xl:space-y-10">
        <div className="glass-card p-6 sm:p-10 md:p-12 border border-white/10 shadow-2xl rounded-3xl bg-white/[0.02] backdrop-blur-xl">
          <div className="mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-medium text-white mb-2">
              Reserve your Session
            </h3>
            <p className="font-sans text-xs md:text-sm text-white/60">
              Complete your reservation details below. Our contact team will confirm your appointment via SMS shortly after booking.
            </p>
          </div>

          {/* Cart Items Banner if services are in cart */}
          {hasCartItems && (
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm space-y-4 mb-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-white font-display font-medium text-lg">
                  <ShoppingBag className="w-5 h-5 text-rose-gold" />
                  <h3>Selected Services ({cartItems.length})</h3>
                </div>
                <Link to="/services" className="font-sans text-xs text-rose-gold font-bold uppercase tracking-wider hover:text-white transition-colors">
                  + Add More
                </Link>
              </div>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-sans text-[10px] text-white/70 uppercase font-bold tracking-widest">{item.category || "Service"}</p>
                      <p className="font-display font-medium text-white text-base truncate">{item.title}</p>
                      {item.duration && <p className="font-sans text-xs text-white/70">{item.duration}</p>}
                      
                      {/* Guest Selector in Book page inline cart banner */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-sans text-[10px] uppercase tracking-wider text-white/60 font-semibold">Guests:</span>
                        {item.quantity < 5 ? (
                          <select
                            value={item.quantity.toString()}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === "5+") {
                                updateQuantity(item.id, 5);
                              } else {
                                updateQuantity(item.id, parseInt(val, 10));
                              }
                            }}
                            className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-0.5 text-xs font-sans font-medium text-white focus:outline-none cursor-pointer [color-scheme:dark]"
                          >
                            <option value="1" className="bg-background">1 Person</option>
                            <option value="2" className="bg-background">2 People</option>
                            <option value="3" className="bg-background">3 People</option>
                            <option value="4" className="bg-background">4 People</option>
                            <option value="5+" className="bg-background">5+ People...</option>
                          </select>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="5"
                              value={item.quantity}
                              onChange={(e) => {
                                const parsed = parseInt(e.target.value, 10);
                                updateQuantity(item.id, isNaN(parsed) ? 5 : parsed);
                              }}
                              className="w-12 bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-xs font-sans font-medium text-white focus:outline-none text-center"
                            />
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-[10px] text-rose-gold uppercase font-bold tracking-wider hover:underline ml-1"
                            >
                              Reset
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                      <div className="text-right">
                        <p className="font-sans font-bold text-white text-sm">
                          {CURRENCY_SYMBOL}{(typeof item.price === "number" ? item.price : parseFloat(item.price as string) || 0)} <span className="text-[10px] text-white/50 font-normal">/ person</span>
                        </p>
                        {item.quantity > 1 && (
                          <p className="font-sans text-xs text-rose-gold font-semibold mt-0.5">
                            Subtotal: {CURRENCY_SYMBOL}{(parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/70 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Full Name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Elena Gilbert"
              />
              <FormInput
                label="Phone Number"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 90000 00000"
              />
            </div>

            {!hasCartItems && (
              <div className="grid grid-cols-1 gap-6">
                {selectedPackage ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs uppercase tracking-widest text-white/70 font-semibold">
                      Selected Package
                    </label>
                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl font-sans text-sm text-rose-gold select-none cursor-default font-medium">
                      {selectedPackage.title} ({CURRENCY_SYMBOL}{selectedPackage.price})
                    </div>
                  </div>
                ) : (
                  <FormSelect
                    label="Service Type"
                    name="service"
                    required={!hasCartItems}
                    value={formData.service}
                    onChange={handleChange}
                    options={fallbackServices.map((srv) => ({
                      value: srv.name,
                      label: `${srv.name} - ${CURRENCY_SYMBOL}${srv.price}`,
                    }))}
                    placeholder="Select a Service"
                  />
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Preferred Date"
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="cursor-pointer [color-scheme:dark]"
              />
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
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <SmokyButton
                type="submit"
                variant="primary"
                className="flex-1 py-4.5"
              >
                Confirm Appointment
              </SmokyButton>
            </div>
          </form>
        </div>
      </AnimatedSection>

      {/* WhatsApp Sent Confirmation Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={() => setIsSubmitted(false)}
          />
          <div
            className="glass-card relative max-w-lg w-full p-8 md:p-12 text-center shadow-2xl border border-white/60 z-10 rounded-3xl bg-white"
          >
            <div className="w-20 h-20 bg-[#25D366] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <AnimatedIcon>
                <WhatsAppIcon className="w-10 h-10 text-white" />
              </AnimatedIcon>
            </div>
            <h2 className="font-display text-3xl font-bold text-primary mb-3">
              WhatsApp Opened
            </h2>
            <p className="font-sans text-sm md:text-base text-secondary mb-8 leading-relaxed">
              We've generated your booking details. Please send the pre-filled message in WhatsApp to complete your reservation.
            </p>
            <div className="flex flex-col gap-4">
              <SmokyButton
                variant="primary"
                onClick={() => {
                  clearCart();
                  setIsSubmitted(false);
                  window.location.href = "/";
                }}
                className="w-full py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold shadow-md transition-colors"
              >
                Yes, I sent the message
              </SmokyButton>
              <SmokyButton
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="w-full py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold"
              >
                Not yet, return to booking
              </SmokyButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <main className="pb-32 bg-background text-white relative overflow-hidden min-h-screen">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] glow-orb-secondary rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] glow-orb-primary rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] w-full flex items-center overflow-hidden bg-black mb-24">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={sanctuaryImg}
            alt="Luxurious styling chairs at Ashwini Salon"
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
              Reserve a Session
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight tracking-tight">
              Book Appointment
            </h1>
            <p className="font-sans text-base md:text-xl text-white/90 max-w-xl leading-relaxed">
              Secure your personalized experience. Please fill out the form below and our team will confirm your session.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="text-center py-20 font-sans text-white/70 uppercase tracking-widest text-xs font-bold">Loading booking environment...</div>}>
        <BookingFormContent />
      </Suspense>
    </main>
  );
}
