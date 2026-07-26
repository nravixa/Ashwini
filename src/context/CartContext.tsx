import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface CartItem {
  id: string;
  title: string;
  description: string;
  imageUrl: any;
  duration?: string;
  price: string;
  category?: string;
  quantity: number;
}

interface ToastState {
  title: string;
  message: string;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, "quantity" | "price"> & { price: string | number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  toast: ToastState | null;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ashwini_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items from localStorage", e);
      }
    }
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, "quantity" | "price"> & { price: string | number }) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      
      if (existingItem) {
        setToast({
          title: "Already in Cart",
          message: "This service has already been added to your cart.",
        });
        return prevItems; // Do not modify state
      }

      const priceStr = typeof item.price === "number" ? item.price.toString() : item.price;
      const updatedItems = [...prevItems, { ...item, price: priceStr, quantity: 1 }];
      
      localStorage.setItem("ashwini_cart", JSON.stringify(updatedItems));
      
      setToast({
        title: "Added to Cart",
        message: `${item.title} has been added to your selection.`,
      });
      
      return updatedItems;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((i) => i.id !== id);
      localStorage.setItem("ashwini_cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      localStorage.setItem("ashwini_cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("ashwini_cart");
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const totalCount = items.length;
  const totalPrice = items.reduce((acc, item) => {
    const numPrice = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return acc + (numPrice * (item.quantity || 1));
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        toast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

