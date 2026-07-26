import { useEffect } from "react";
import { Sparkles, CheckCircle, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartToast() {
  const { toast, hideToast, setIsCartOpen } = useCart();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  return (
    <>
      {toast && (
        <div
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] max-w-sm w-full bg-primary/95 text-white p-4 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.3)] border border-white/20 backdrop-blur-md flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[var(--text-xs)] font-bold uppercase tracking-widest text-amber-300">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{toast.title}</span>
              </div>
              <p className="font-sans text-[var(--text-sm)] text-white/90 truncate mt-0.5 font-medium">
                {toast.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                hideToast();
                setIsCartOpen(true);
              }}
              className="px-3 py-1.5 bg-white text-primary text-[var(--text-xs)] uppercase font-bold tracking-widest rounded-lg hover:bg-white/90 transition-colors shadow-xs"
            >
              View Cart
            </button>
            <button
              onClick={hideToast}
              className="p-1 text-white/60 hover:text-white transition-colors"
              aria-label="Close Toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
