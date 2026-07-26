# Ashwini Beauty & Salon - Project Context for Performance Optimization

## Project Overview
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion & GSAP
- **Design Aesthetic**: "Premium Luxury Glassmorphism" with dark themes (`#1D1A31` background), rose gold accents, and extensive use of frosted glass (`backdrop-filter`) and glowing orbs.

## The Problem: Website Lagging
The website suffers from significant frame drops, scroll lag, and overall sluggishness, especially on lower-end devices and mobile phones. The lag is most prominent on pages with long lists of cards (e.g., `Offers` page, `Services` page).

### What has already been removed to try and fix it:
1. Removed an SVG `<feTurbulence>` fractal noise texture that was overlaying every single glass card.
2. Stripped out continuous physics loops (`useSpring`, `useMotionValue`) from the `AnimatedButton` that tracked mouse coordinates continuously.
3. Removed heavy WebGL shaders inside buttons.
4. Removed a heavy background `.mp4` video from the Footer.

### What is currently left that might still be causing lag:
1. **Heavy Backdrop Filters**: We extensively use `.glass-card` which applies `backdrop-filter: blur(12px) saturate(140%)` on dozens of overlapping cards per page.
2. **Massive CSS Blurs**: Every page renders large background glowing orbs using `blur-3xl` (64px blur) on elements sized `500x500px`.
3. **Framer Motion Intersections**: Almost every element is wrapped in an `AnimatedSection` which uses `whileInView` intersection observers.
4. **Text Shadows**: Heavy multi-layered text shadows (`.text-3d-acrylic`) on large typography.

---

## Code Snippets for Context

### 1. `globals.css` (The Global Styling & Glassmorphism)
```css
html, body {
  max-width: 100vw;
  overflow-x: clip;
  position: relative;
  width: 100%;
}

@theme {
  --color-primary: #F08CAE;
  --color-secondary: #9A4C95;
  --color-background: #1D1A31;
}

/* Next Generation 3D Glassmorphism - Suspected Lag Culprit */
.glass-card, .premium-glass {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  box-shadow: 
    0 20px 40px -15px rgba(0, 0, 0, 0.4), 
    inset 0 1px 0 rgba(255, 255, 255, 0.1), 
    inset 0 -1px 0 rgba(255, 255, 255, 0.02);
  transform-style: preserve-3d;
  will-change: transform;
}

/* Heavy Text Shadows */
.text-3d-acrylic {
  color: #F9F6F7;
  text-shadow: 
    0px 1px 0px rgba(255, 255, 255, 0.3),
    0px 2px 0px rgba(193, 165, 169, 0.4),
    0px 6px 12px rgba(0, 0, 0, 0.5),
    0px 0px 15px rgba(240, 140, 174, 0.3);
}
```

### 2. Massive CSS Blurs (Found across all pages like `app/page.tsx`)
```tsx
// These background orbs exist multiple times on every page, sitting behind the .glass-card elements.
<div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl opacity-60 pointer-events-none" />
<div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-60 pointer-events-none" />
```

### 3. `components/animations/AnimatedButton.tsx` (Current State)
```tsx
"use client";
import React from "react";
import { m } from "framer-motion";

export default function AnimatedButton({ children, variant = "none" }) {
  const Component = m.button;
  let baseClass = "";
  if (variant === "primary") {
    baseClass = "bg-gradient-to-br from-rose-gold via-[#d96791] to-[#b34971] text-white shadow-[0_10px_30px_-5px_rgba(240,140,174,0.4)]";
  } else if (variant === "secondary") {
    baseClass = "premium-glass text-white hover:bg-white/10";
  }

  return (
    <Component
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`relative rounded-full ${baseClass}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
}
```

### 4. Structure Example (`app/layout.tsx`)
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#1D1A31] text-on-background relative">
        <Providers> {/* Wraps with LazyMotion for framer-motion */}
          <Navbar />
          <main className="relative">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
```

### 5. Goal for the Prompt
Please provide an expert-level architecture and optimization strategy for this Next.js codebase. We want to preserve the luxury "Glassmorphism" aesthetic without melting the user's GPU. What specific CSS changes, React/Next.js optimizations, or Framer Motion tricks can completely resolve this lag?
