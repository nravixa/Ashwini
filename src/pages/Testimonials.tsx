import React, { useState } from "react";
import SEO from "../components/SEO";
import Image from "../components/Image";
import { Star, PenTool } from "lucide-react";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedCard from "@/components/animations/AnimatedCard";
import AnimatedButton from "@/components/animations/AnimatedButton";
import SmokyButton from "@/components/ui/SmokyButton";
import AnimatedIcon from "@/components/animations/AnimatedIcon";

const initialReviews = [
  {
    author: "Priyanka Borhade",
    role: "Verified Client",
    quote: "Great service, friendly staff, and a clean salon. I’m very happy with my haircut and will definitely come back. Highly recommended!",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnjzEWmY4_ntv4yucZeOiWoM7_opTa-KzDgr7nI_1X_N5jKb0129Ka08FE6_OjoS0hDfLmi8UucOzoin43JBv5nDBqt3XG9Bjn-XCMrWA1JWgesdJJu8JnFdFVJoks76FIWLpHFmlyb4q2RKZ6LcBAxrdHvHhfpTawGu81wdMxZJDewsR5bgmDfWqf-MkKIUoc5CkTdfrSq663xO9KuMaD72gUp6ZaM4-vYkFTrWwXB9AMLbVPDyPpcAIqocf7K-51Jv_deYwe3N4",
    stylist: "Julianne Rossi",
    rating: 5,
  },
  {
    author: "Namrta Mune",
    role: "Verified Client",
    quote: "Thank you for the wonderful service. I really appreciate your professionalism, attention to detail, and the care you put into your work. You made me feel comfortable throughout the appointment, and I’m very happy with the results. Keep up the amazing work!",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM7PO1GdEzWDc7005fDGunw90Z_Nw4-stMRcGOaf_Q7BP345Kb5oVsYyfEXCZomuYVWB79hD5pWwMBFe2I3JIbS0r94voMTA-CdCs_LN2b0JUwjBPRYy3Ot-pWHBDzOMohJ08NLZinKva4Wp_B2Qp8S58tRJr3aR8eVBza3iFIazCH342porY97fnH9FlLNOEp4qn1cqrpbHMStGDGLHxthSoxMlJglSYPvWRVuuGOCnGapsf-wSABVP3MM9BAshC-H_Ox1jsKJL8",
    stylist: "Marcus Thorne",
    rating: 5,
  },
  {
    author: "Tejal Mene",
    role: "Verified Client",
    quote: "Best experience... all rounder beautician, nail artist, hairstylist, makeup artist 🙌💯💯",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO33pas_5pVfP--o08aTnhcn9I5wf_VLpM1eT6iEHO5B7WfwJswhTz_she4zCmVnx09aYrRTLzEkpQXKA5EEN69OGVKWPTxYRy6zeZrDaHm4OtuhAVKdURn6nuZFpjpXM2iyvpzPBdeDPxErM2qA6m6glbF90v6NpzgZT62v57k6LuoHZHJ0u6PB4fDZ_JZHJ-uUTxI7n64Iphlt3GtxmuNtCkakfPs19lpgMFiBdtsGd6pWq4u5gywlHMw8saqHMNvFXyEtsMpM4",
    stylist: "Julianne Rossi",
    rating: 5,
  },
  {
    author: "Monika Sondkar",
    role: "Verified Client",
    quote: "So beautiful & clean salon. Service's is the best, full on mind & body relaxation for all treatments & services. Incredible experience all the time.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu-PjcPB8qkmcSnZ5RbM21gfqeIEf45rl7np9-Lh7DGljWG9iTD1JTqyko2I0U4Dt2Gq5zP4nNUv0uwks46iwIO-YGf_EANOzxFofpalmJOZiYF-8Hu7S9XXv4TB-PGN6yTn0pf22d8h1GzkSIBitn5h_7HIx4pdTPrQrduOF9mm9Xd7kZQ_2sLcilC1ogFr6QLQumRkyeppB7nwD8KUxPP0YAF9wtSHSDXV7X1xplA2jjU5Rcv-pFRszb1zi9JrTVhMB1vxpZI5Y",
    stylist: "Elena Vance",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [formOpen, setFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: "",
    role: "",
    quote: "",
    stylist: "Julianne Rossi",
    rating: 5,
  });

  const handleRatingChange = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const key = e.target.name as keyof typeof newReview;
    setNewReview({
      ...newReview,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission = {
      ...newReview,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO33pas_5pVfP--o08aTnhcn9I5wf_VLpM1eT6iEHO5B7WfwJswhTz_she4zCmVnx09aYrRTLzEkpQXKA5EEN69OGVKWPTxYRy6zeZrDaHm4OtuhAVKdURn6nuZFpjpXM2iyvpzPBdeDPxErM2qA6m6glbF90v6NpzgZT62v57k6LuoHZHJ0u6PB4fDZ_JZHJ-uUTxI7n64Iphlt3GtxmuNtCkakfPs19lpgMFiBdtsGd6pWq4u5gywlHMw8saqHMNvFXyEtsMpM4",
    };
    setReviews([submission, ...reviews]);
    setFormOpen(false);
    setNewReview({
      author: "",
      role: "",
      quote: "",
      stylist: "Julianne Rossi",
      rating: 5,
    });
    alert("Thank you for sharing your feedback!");
  };

  return (
    <main className="pt-32 pb-32">
      <SEO 
        title="Client Testimonials"
        description="Read what our clients say about their luxury experiences at Ashwini Salon. Unmatched artistry and dedication."
        canonical="/testimonials"
      />
      {/* Header */}
      <AnimatedSection className="px-6 md:px-16 max-w-[1440px] mx-auto mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-sans text-xs text-secondary uppercase tracking-[0.3em] block mb-4 font-semibold">
              Client Logs
            </span>
            <AnimatedHeading
              text="Client Testimonials"
              as="h1"
              className="font-display text-4xl md:text-6xl font-medium mb-6 text-primary"
            />
            <p className="font-sans text-base md:text-lg text-secondary leading-relaxed">
              We are proud of our 4.9/5 star average rating across over 450 verified bookings. Read reviews from our executive clients.
            </p>
          </div>
          <SmokyButton
            variant="primary"
            onClick={() => setFormOpen(true)}
            className="px-10 py-5 rounded-full font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-sm"
          >
            <AnimatedIcon>
              <PenTool className="w-4 h-4" />
            </AnimatedIcon>
            Share Feedback
          </SmokyButton>
        </div>
      </AnimatedSection>

      {/* Reviews Grid */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((test, index) => (
            <AnimatedCard
              key={index}
              index={index}
              className="glass-card p-10 border border-white/60 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <AnimatedIcon key={i}>
                      <Star className="w-4 h-4 fill-rose-gold text-rose-gold" />
                    </AnimatedIcon>
                  ))}
                </div>
                <p className="card-subtitle italic text-primary mb-8">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-6 mt-auto">
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-surface-dim">
                    <Image
                      src={test.imageUrl}
                      alt={test.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="card-body font-bold text-primary">
                      {test.author}
                    </h4>
                    <p className="card-label text-secondary mt-0.5">
                      {test.role}
                    </p>
                  </div>
                </div>
                <span className="card-label bg-surface-container px-4 py-1.5 text-secondary rounded-full">
                  With {test.stylist.split(" ")[0]}
                </span>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Feedback Overlay Form */}

        {formOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-primary/30 backdrop-blur-sm"
              onClick={() => setFormOpen(false)}
            />
            <div
              className="glass-card relative max-w-xl w-full p-8 md:p-12 shadow-2xl border border-white/60 z-10"
            >
              <h3 className="font-display text-2xl font-medium text-primary mb-6 text-center">
                Submit Your Review
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs uppercase tracking-widest text-outline">Name</label>
                    <input
                      type="text"
                      name="author"
                      required
                      value={newReview.author}
                      onChange={handleInputChange}
                      placeholder="Victoria Sterling"
                      className="bg-transparent border-b border-black/10 focus:border-primary outline-none py-2 font-sans text-sm transition-colors duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs uppercase tracking-widest text-outline">Role / Bio</label>
                    <input
                      type="text"
                      name="role"
                      required
                      value={newReview.role}
                      onChange={handleInputChange}
                      placeholder="Executive Director"
                      className="bg-transparent border-b border-black/10 focus:border-primary outline-none py-2 font-sans text-sm transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs uppercase tracking-widest text-outline">Stylist</label>
                    <select
                      name="stylist"
                      value={newReview.stylist}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-black/10 focus:border-primary outline-none py-2 font-sans text-sm cursor-pointer"
                    >
                      <option value="Julianne Rossi">Julianne Rossi - Master Stylist</option>
                      <option value="Marcus Thorne">Marcus Thorne - Creative Director</option>
                      <option value="Elena Vance">Elena Vance - Senior Esthetician</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs uppercase tracking-widest text-outline">Rating</label>
                    <div className="flex gap-2 py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="focus:outline-none"
                        >
                          <AnimatedIcon>
                            <Star
                              className={`w-5 h-5 ${
                                star <= newReview.rating
                                  ? "fill-rose-gold text-rose-gold"
                                  : "text-black/10"
                              }`}
                            />
                          </AnimatedIcon>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-outline">Your Review</label>
                  <textarea
                    name="quote"
                    required
                    value={newReview.quote}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe your styling experience..."
                    className="bg-transparent border border-black/10 focus:border-primary outline-none p-3 font-sans text-sm transition-colors duration-300"
                  />
                </div>

                <div className="flex gap-4 justify-end pt-4">
                  <AnimatedButton
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="border border-primary text-primary px-8 py-3 rounded-full font-sans text-xs uppercase tracking-widest hover:bg-surface-container-low transition-colors"
                  >
                    Cancel
                  </AnimatedButton>
                  <SmokyButton
                    variant="primary"
                    type="submit"
                    className="px-8 py-3 rounded-full font-sans text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                  >
                    Submit Review
                  </SmokyButton>
                </div>
              </form>
            </div>
          </div>
        )}

    </main>
  );
}
