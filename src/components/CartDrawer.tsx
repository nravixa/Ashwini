import React, { useCallback } from "react";
import Image from "../components/Image";
import { useNavigate } from "react-router-dom";
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import AnimatedButton from "./animations/AnimatedButton";
import { CURRENCY_SYMBOL } from "@/lib/currency";
import SmokyButton from "@/components/ui/SmokyButton";

const CartDrawer = React.memo(function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    totalCount,
    totalPrice,
  } = useCart();
  const router = useNavigate();

  const handleProceedToBooking = useCallback(() => {
    setIsCartOpen(false);
    router("/book");
  }, [setIsCartOpen, router]);

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          {/* Backdrop Blur */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Slide-out Drawer Panel */}
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-black/10 shadow-2xl flex flex-col justify-between transition-transform duration-300 translate-x-0"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between bg-white/70 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold uppercase tracking-tight text-primary">
                    Booking Cart
                  </h2>
                  <p className="font-sans text-xs text-secondary">
                    {totalCount} {totalCount === 1 ? "service selected" : "services selected"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-secondary hover:text-primary transition-colors rounded-full hover:bg-black/5"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body: Cart Item List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                  <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-outline/50 border border-outline-variant/20">
                    <Sparkles className="w-10 h-10 text-rose-gold/60" />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-primary">
                    Your Cart is Empty
                  </h3>
                  <p className="font-sans text-sm text-secondary max-w-xs leading-relaxed">
                    Explore our curated beauty rituals and add your preferred treatments to reserve your appointment.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      router("/services");
                    }}
                    className="mt-4 px-6 py-3 bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold rounded-xl shadow-sm hover:bg-neutral-800 transition-colors"
                  >
                    Explore Services
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-2xl border border-black/5 shadow-xs flex gap-4 items-center group relative"
                  >
                    {/* Item Image */}
                    {item.imageUrl && (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-dim">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      {item.category && (
                        <span className="font-sans text-[var(--text-xs)] uppercase tracking-widest text-outline font-semibold block">
                          {item.category}
                        </span>
                      )}
                      <h4 className="font-display text-[var(--text-lg)] font-bold text-primary truncate">
                        {item.title}
                      </h4>
                      {item.duration && (
                        <span className="font-sans text-[var(--text-sm)] text-secondary flex items-center gap-1 mt-0.5">
                          <Clock className="w-4 h-4 text-outline" />
                          {item.duration}
                        </span>
                      )}
                      <p className="font-sans text-[var(--text-xl)] font-bold text-primary mt-1">
                        {CURRENCY_SYMBOL}{item.price}
                      </p>
                    </div>

                    {/* Delete Controls */}
                    <div className="flex flex-col items-end gap-2 shrink-0 h-full justify-start">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-outline/60 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-black/10 bg-white space-y-4">
                <div className="space-y-2 font-sans text-sm">
                  <div className="flex justify-between text-secondary">
                    <span>Selected Services ({totalCount})</span>
                    <span>{CURRENCY_SYMBOL}{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-primary font-bold text-[var(--text-lg)] pt-2 border-t border-black/5">
                    <span>Estimated Total</span>
                    <span>{CURRENCY_SYMBOL}{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-2">
                  <SmokyButton
                    variant="primary"
                    onClick={handleProceedToBooking}
                    className="w-full py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-md hover:bg-neutral-900 transition-colors border-none"
                  >
                    <span>Proceed to Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </SmokyButton>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full border border-black/10 py-3 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold text-secondary hover:text-primary hover:border-black/20 transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
);

export default CartDrawer;
