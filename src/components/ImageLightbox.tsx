import React, { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "./Image";

interface ImageLightboxProps {
  isOpen: boolean;
  images: { url: any; title: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageLightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  const currentImage = images[currentIndex];
  const overlayRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation & Esc key support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onPrev, onNext, onClose]);

  // Touch swiping gestures on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      onNext();
    } else if (diff < -50) {
      onPrev();
    }
    touchStartX.current = null;
  };

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md transition-all duration-300">
      {/* Tap outside overlay */}
      <div
        ref={overlayRef}
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="absolute inset-0 flex items-center justify-center cursor-default p-4 sm:p-10 select-none"
      >
        <div className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex flex-col justify-center items-center pointer-events-none">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 sm:top-4 right-0 sm:right-4 text-white hover:text-rose-gold p-2 cursor-pointer z-50 pointer-events-auto rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          {images.length > 1 && (
            <button
              onClick={onPrev}
              className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-rose-gold p-3 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer pointer-events-auto z-50 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow */}
          {images.length > 1 && (
            <button
              onClick={onNext}
              className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-rose-gold p-3 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer pointer-events-auto z-50 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Image Wrapper */}
          <div className="w-full h-[65vh] sm:h-[70vh] relative pointer-events-auto flex items-center justify-center">
            <Image
              src={currentImage.url}
              alt={currentImage.title}
              fill
              sizes="90vw"
              className="!object-contain w-full h-full rounded-2xl"
              priority
            />
          </div>

          {/* Info Details */}
          <div className="mt-4 text-center pointer-events-auto text-white">
            <h4 className="font-display text-lg sm:text-2xl font-bold tracking-wide">
              {currentImage.title}
            </h4>
            {images.length > 1 && (
              <p className="text-white/60 font-sans text-xs uppercase tracking-widest mt-1">
                {currentIndex + 1} of {images.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
