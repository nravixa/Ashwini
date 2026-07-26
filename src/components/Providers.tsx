import React, { useEffect } from "react";
import SmoothScrollProvider from "./animations/SmoothScrollProvider";
import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Helper to determine if target element is editable (input, textarea, or contenteditable)
    const isEditable = (target: EventTarget | null): boolean => {
      if (!target) return false;
      const el = target as HTMLElement;
      const tagName = el.tagName.toLowerCase();
      return (
        tagName === "input" ||
        tagName === "textarea" ||
        el.isContentEditable
      );
    };

    // 1. Disable right-click context menu (except on inputs/textareas)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName.toLowerCase() === "input" ||
          target.tagName.toLowerCase() === "textarea")
      ) {
        return;
      }
      e.preventDefault();
    };

    // 2. Disable dragging images
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName.toLowerCase() === "img") {
        e.preventDefault();
      }
    };

    // 3. Disable copy (except in inputs/textareas)
    const handleCopy = (e: ClipboardEvent) => {
      if (!isEditable(e.target)) {
        e.preventDefault();
      }
    };

    // 4. Disable cut (except in inputs/textareas)
    const handleCut = (e: ClipboardEvent) => {
      if (!isEditable(e.target)) {
        e.preventDefault();
      }
    };

    // 5. Disable selectstart (except in inputs/textareas)
    const handleSelectStart = (e: Event) => {
      if (!isEditable(e.target)) {
        e.preventDefault();
      }
    };

    // 6. Prevent common keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const editable = isEditable(target);

      // F12 key
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return;
      }

      // Check for Ctrl/Cmd shortcuts
      const ctrlOrMeta = e.ctrlKey || e.metaKey;
      if (ctrlOrMeta) {
        const key = e.key.toLowerCase();

        // Ctrl+C, Ctrl+X, Ctrl+A (only block outside editable form fields)
        if ((key === "c" || key === "x" || key === "a") && !editable) {
          e.preventDefault();
          return;
        }

        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
        if (e.shiftKey && (key === "i" || key === "j" || key === "c")) {
          e.preventDefault();
          return;
        }

        // Ctrl+S (Save), Ctrl+U (View Source), Ctrl+P (Print)
        if (key === "s" || key === "u" || key === "p") {
          e.preventDefault();
          return;
        }
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <SmoothScrollProvider>
      <CartProvider>
          {children}
      </CartProvider>
    </SmoothScrollProvider>
  );
}
