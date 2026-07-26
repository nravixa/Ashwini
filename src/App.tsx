import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// Layout & Global Components
import Navbar from './components/Navbar';
import Providers from './components/Providers';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/animations/PageTransition';

// Simple, luxury-themed page loader fallback
const PageLoader = () => (
  <div className="min-h-screen bg-[#1D1A31] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-[#F08CAE]/20 border-t-[#F08CAE] animate-spin" />
      <span className="font-display text-[#F9F6F7]/50 tracking-[0.2em] text-xs uppercase">Loading...</span>
    </div>
  </div>
);

// Lazy-loaded Global Components (non-critical for initial paint)
const Footer = React.lazy(() => import('./components/Footer'));
const FloatingWhatsApp = React.lazy(() => import('./components/FloatingWhatsApp'));
const CartDrawer = React.lazy(() => import('./components/CartDrawer'));
const CartToast = React.lazy(() => import('./components/CartToast'));

// Lazy-loaded Pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Offers = React.lazy(() => import('./pages/Offers'));
const Book = React.lazy(() => import('./pages/Book'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Membership = React.lazy(() => import('./pages/Membership'));
const Faq = React.lazy(() => import('./pages/Faq'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Testimonials = React.lazy(() => import('./pages/Testimonials'));

export default function App() {
  const location = useLocation();

  return (
    <Providers>
      <ScrollToTop />
      <Navbar />
      <main className="relative">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
                <Route path="/offers" element={<PageTransition><Offers /></PageTransition>} />
                <Route path="/book" element={<PageTransition><Book /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/membership" element={<PageTransition><Membership /></PageTransition>} />
                <Route path="/faq" element={<PageTransition><Faq /></PageTransition>} />
                <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
                <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
          </Routes>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <FloatingWhatsApp />
        <CartDrawer />
        <CartToast />
      </Suspense>
    </Providers>
  );
}
