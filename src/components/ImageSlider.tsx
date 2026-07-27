import React, { useRef, useEffect } from "react";
import Image from "../components/Image";
import { ArrowLeftRight } from "lucide-react";
import { gsap } from "gsap";

interface ImageSliderProps {
  beforeImage: string | any;
  afterImage: string | any;
  beforeAlt?: string;
  afterAlt?: string;
}

export default React.memo(function ImageSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before treatment image",
  afterAlt = "After treatment image",
}: ImageSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  
  const position = useRef(50);
  const isDragging = useRef(false);
  const dragInfo = useRef({ startX: 0, hasDragged: false });

  useEffect(() => {
    // Initial setup
    setPosition(50);
  }, []);

  const setPosition = (p: number) => {
    p = Math.max(0, Math.min(100, p));
    position.current = p;
    if (clipRef.current) {
      clipRef.current.style.clipPath = `polygon(0% 0%, ${p}% 0%, ${p}% 100%, 0% 100%)`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${p}%`;
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragInfo.current = { startX: e.clientX, hasDragged: false };
    gsap.killTweensOf(position); // Stop any active GSAP animations
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    if (Math.abs(e.clientX - dragInfo.current.startX) > 4) {
      dragInfo.current.hasDragged = true;
    }
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const p = (x / rect.width) * 100;
    setPosition(p);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }

    // If it was a click (not dragged significantly), animate to opposite side
    if (!dragInfo.current.hasDragged) {
      const targetP = position.current < 50 ? 100 : 0;
      gsap.to(position, {
        current: targetP,
        duration: 0.8,
        ease: "power3.inOut",
        onUpdate: () => setPosition(position.current)
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Labels positioned above the image */}
      <div className="flex justify-between items-center px-4 pointer-events-none">
        <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-gold"></span>
          Before
        </span>
        <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
          After
          <span className="w-1.5 h-1.5 rounded-full bg-rose-gold"></span>
        </span>
      </div>

      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-2xl group border border-outline-variant/30 select-none bg-surface-dim cursor-ew-resize touch-none"
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0 z-0">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        {/* Before Image (Clipped Overlay) */}
        <div
          ref={clipRef}
          className="absolute inset-0 z-10 will-change-transform"
        >
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover grayscale-[0.2]"
            priority
          />
        </div>

        {/* Slider Line & Handle */}
        <div
          ref={handleRef}
          className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none will-change-transform"
        >
          <div className="w-[2px] h-full bg-white/80 relative flex items-center justify-center group-hover:bg-white transition-colors duration-300">
            <div className="absolute w-12 h-12 rounded-full bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center justify-center transform -translate-x-1/2 group-hover:scale-[1.08] group-hover:shadow-[0_0_20px_rgba(240,140,174,0.6)] transition-all duration-300 pointer-events-auto">
              <ArrowLeftRight className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
