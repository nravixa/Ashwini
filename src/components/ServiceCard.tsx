import React, { useState, useCallback } from "react";
import Image from "../components/Image";
import { Clock, IndianRupee, ShoppingBag, Check } from "lucide-react";
import AnimatedButton from "@/components/animations/AnimatedButton";
import SmokyButton from "@/components/ui/SmokyButton";
import AnimatedIcon from "./animations/AnimatedIcon";
import { useCart } from "@/context/CartContext";

interface ServiceCardProps {
  id?: string;
  title: string;
  description: string;
  imageUrl: any;
  duration?: string;
  price?: string;
  category?: string;
  index: number;
}

function ServiceCard({
  id,
  title,
  description,
  imageUrl,
  duration,
  price,
  category,
  index,
}: ServiceCardProps) {
  const { items, addToCart } = useCart();
  const serviceId = id || title.toLowerCase().replace(/\s+/g, "-");
  const isAdded = items.some((i) => i.id === serviceId);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdded) return;

    addToCart({
      id: serviceId,
      title,
      description,
      imageUrl,
      duration,
      price: price || "0",
      category,
    });
  }, [serviceId, title, description, imageUrl, duration, price, category, addToCart, isAdded]);

  return (
    <div
      className="group glass-card rounded-[24px] overflow-hidden flex flex-col justify-between relative"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-gold/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-surface-dim">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        </div>

        <div className="p-6 sm:p-8">
          <h3
            className="card-title mb-3 transition-transform duration-300 group-hover:-translate-y-1"
          >
            {title}
          </h3>
          <p
            className="card-body mb-6 line-clamp-3 transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            {description}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 pt-0 relative z-10">
        {(duration || price) && (
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            {duration && (
              <div>
                <span className="block card-label mb-1">
                  Duration
                </span>
                <span className="card-subtitle flex items-center gap-1.5">
                  <AnimatedIcon>
                    <Clock className="w-4 h-4 text-tertiary" />
                  </AnimatedIcon>
                  {duration}
                </span>
              </div>
            )}
            {price && (
              <div className="text-right">
                <span className="block card-label mb-1">
                  Starting from
                </span>
                <span className="card-price flex items-center justify-end gap-1">
                  <AnimatedIcon>
                    <IndianRupee className="w-8 h-8 md:w-10 md:h-10 text-tertiary" />
                  </AnimatedIcon>
                  {price}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Add to Cart Button replacing Book Now */}
        <SmokyButton
          variant="primary"
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full mt-6 py-3.5 sm:py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm border-none ${
            isAdded
              ? "!bg-[#25D366] !text-white opacity-90"
              : ""
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Added ✓</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </SmokyButton>
      </div>
    </div>
  );
}

export default React.memo(ServiceCard);
